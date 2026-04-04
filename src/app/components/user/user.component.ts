import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  imports: [RouterLink],
  templateUrl: './user.component.html',
})
export class UserComponent {

  title: string = 'Listado de usuarios'
  users: User[] = [];

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService
  ){
    if(this.router.currentNavigation()?.extras.state)
      this.users = this.router.currentNavigation()?.extras.state!['users'];
    else
      this.service.findAll().subscribe(users => this.users = users);
  }

  onRemove(id: number): void{
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void{
    this.router.navigate(['/users/edit/', user.id], {state: {user}})
  }
}
