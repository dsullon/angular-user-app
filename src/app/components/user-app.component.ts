import { Component, OnInit, signal } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit{

  users = signal<User[]>([]);

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService
  ){
  }
  
  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users.set(users))
    this.addUser();
    this.removeUser();
  }

  addUser(): void {
    this.sharingData.newUserEventEmmitter.subscribe(user => {
      this.users.update(users => {
        if(user.id > 0)
          return users.map(u => u.id == user.id ? {...user} : u);
        else {
          return [
            ...users, 
            {...user, id: new Date().getTime()}
          ]
        }
      })
      this.router.navigate(['/users'], {state: {users: this.users()}})
      Swal.fire({
        title: "Saved!",
        text: "The user has been added",
        icon: "success"
      });
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
          this.users.update(users => users.filter(u => u.id != id));
          console.log(this.users());
          
          this.router.navigate(['/users/create'], { skipLocationChange: true}).then(() => {
            this.router.navigate(['/users'], { state: {users: this.users()} })
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
}
