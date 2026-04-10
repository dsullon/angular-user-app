import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import { add, addSuccess, findAllPageable, load, remove, removeSuccess, setErrors, update, updateSuccess } from "./users.actions";
import { catchError, EMPTY, exhaustMap, map, of, tap } from "rxjs";
import { User } from "../models/user";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable()
export class UsersEffects {
    private actions$ = inject(Actions);
    private service = inject(UserService);
    private router = inject(Router);

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(load),
            exhaustMap(action => this.service.findAllPageable(action.page)
                .pipe(
                    map(pageable => {                        
                        const users = pageable.content as User[];
                        const paginator = pageable;
                        return findAllPageable({ users, paginator });
                    }),
                    catchError((error) => of(setErrors({errors: error.error})))
                )
            )
        )
    );
    
    addUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(add),
            exhaustMap(action => this.service.create(action.userNew)
                .pipe(
                    map(userNew => addSuccess({userNew})
                    ),
                    catchError((error) => error.status == 400 ? of(setErrors({errors: error.error})): EMPTY)
                )
            )
        )
    )

    addSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addSuccess),
            tap(() => {
                this.router.navigate(['/users'])
                Swal.fire({
                    title: "Saved!",
                    text: "The user has been added",
                    icon: "success"
                });
            })
        ), 
        {dispatch: false}
    )

    updateUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(update),
            exhaustMap(action => this.service.update(action.userUpdated)
                .pipe(
                    map(userUpdated => updateSuccess({userUpdated})
                    ),
                    catchError((error) => error.status == 400 ? of(setErrors({errors: error.error})): EMPTY)
                )
            )
        )
    )

    updateSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateSuccess),
            tap(() => {
                this.router.navigate(['/users'])
                Swal.fire({
                    title: "Saved!",
                    text: "The user has been updated",
                    icon: "success"
                });
            })
        ), 
        {dispatch: false}
    )

    removeUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(remove),
            exhaustMap(action => this.service.delete(action.id)
                .pipe(
                    map(id => removeSuccess({id})
                    ),
                    catchError((error) => error.status == 400 ? of(setErrors({errors: error.error})): EMPTY)
                )
            )
        )
    )

    removeSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(removeSuccess),
            tap(() => {
                this.router.navigate(['/users'])
                Swal.fire({
                    title: "Deleted!",
                    text: "The user has been deleted.",
                    icon: "success"
                });
            })
        ), 
        {dispatch: false}
    )
}