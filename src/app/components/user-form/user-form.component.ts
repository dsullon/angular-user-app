import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { usersSelector } from '../../store/users/users.selector';
import { add, find, resetUser, update } from '../../store/users/users.actions';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit{
  user: User;
  errors: any = {};

  constructor(
    private store: Store<{users: any}>,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ){
    this.user = new User();
    this.store.select(usersSelector).subscribe(state => {
      this.errors = state.errors;
      this.user = {...state.user};
      this.cd.markForCheck();
    })
  }

  ngOnInit(): void {
    this.store.dispatch(resetUser());
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if( id > 0){
        this.store.dispatch(find({id}));        
      }
    })
  }

  onSubmit(): void {
    if(this.user.id > 0){
      this.store.dispatch(update({userUpdated: this.user}));
    } else {
      this.store.dispatch(add({userNew: this.user}));
    }
  }

  onClear(userForm: NgForm): void {
    this.store.dispatch(resetUser());
    userForm.reset();
    userForm.resetForm();
  }
}
