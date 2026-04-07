import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit{

  users: User[] = [];
  paginator: any = {};

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService
  ){
  }
  
  ngOnInit(): void {
    this.saveUser();
    this.removeUser();
    this.paginatorEvents();
  }

  saveUser(): void {
    this.sharingData.newUserEventEmmitter.subscribe(user => {      
      const request$ = user.id > 0
        ? this.service.update(user)
        : this.service.create(user);
      
      request$.subscribe(
        {
          next: (savedUser) => {
            if(user.id > 0){
              this.users = this.users.map(u => u.id == savedUser.id ? {...savedUser} : u);
            } else {
              this.users = [...this.users, {...savedUser}];
            }
            this.router.navigate(['/users'])
            Swal.fire({
              title: "Saved!",
              text: "The user has been added",
              icon: "success"
            });
          },
          error: (err) => {
            if(err.status == 400)
              this.sharingData.errorsUserFormEventEmitter.emit(err.error)
          }
        })
    });
  }

  removeUser(): void{
    this.sharingData.idUserEventEmitter.subscribe(id => {
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
          this.service.delete(id).subscribe(() => {
            this.users = this.users.filter(u => u.id != id);          
            this.router.navigate(['/users/create'], { skipLocationChange: true}).then(() => {
              this.router.navigate(['/users']);
            });
          });

          Swal.fire({
            title: "Deleted!",
            text: "The user has been deleted.",
            icon: "success"
          });
        }
      });
    });    
  }

  paginatorEvents() {
    this.sharingData.paginatorEventEmitter.subscribe(pageable => this.paginator = pageable.paginator);
  }
}
