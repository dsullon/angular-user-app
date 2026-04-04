import { Component, OnInit, signal } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from "./user/user.component";
import { UserFormComponent } from "./user-form/user-form.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit{
  title: string = 'Aplicación de usuarios'

  users = signal<User[]>([]);
  userSelected: User;

  open: boolean = false;

  constructor(
    private service: UserService,
  ){
    this.userSelected = new User();
  }
  
  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users.set(users))
  }

  addUser(user: User): void {
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

    Swal.fire({
      title: "Saved!",
      text: "The user has been added",
      icon: "success"
    });
    this.userSelected = new User();
    this.setOpen();
  }

  removeUser(id: number): void{
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
        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted.",
          icon: "success"
        });
      }
    });
    
  }

  setSelectedUser(userRow: User): void {
    this.userSelected = {...userRow};
    this.open = true;
  }

  setOpen(): void {
    this.open = !this.open;
  }
}
