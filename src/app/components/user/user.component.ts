import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { usersSelector } from '../../store/users.selector';
import { load, remove } from '../../store/users.actions';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user',
  imports: [RouterLink, PaginatorComponent],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  title: string = 'Listado de usuarios'
  users: User[] = [];
  paginator: any = {};

  constructor(
    private store: Store<{users: any}>,
    private router: Router,
    private authService: AuthService,
    private service: UserService,
    private sharingData: SharingDataService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ){
    this.store.select(usersSelector).subscribe(state => {      
      this.users = state.users;
      this.paginator = state.paginator;
      this.cd.markForCheck();
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.store.dispatch(load({page: +(params.get('page') || 0)})));
  }

  onRemove(id: number): void{
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete the selected user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(remove({id}));
      }
    });
  }

  onSelectedUser(user: User): void{
    this.router.navigate(['/users/edit/', user.id]);
  }

  get admin() {
    return this.authService.isAdmin();
  }
}
