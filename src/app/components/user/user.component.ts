import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user',
  imports: [],
  templateUrl: './user.component.html',
})
export class UserComponent {
  @Input() users: User[] = [];

  @Output() idUserEventEmitter: EventEmitter<number> = new EventEmitter();
  @Output() selectedUserEventEmitter: EventEmitter<User> = new EventEmitter();

  onRemove(id: number): void{
    this.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void{
    this.selectedUserEventEmitter.emit(user);
  }
}
