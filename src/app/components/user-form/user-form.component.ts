import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  @Input() user: User;

  @Output() newUserEventEmmitter: EventEmitter<User> = new EventEmitter();
  @Output() openEventEmmitter: EventEmitter<Boolean> = new EventEmitter();

  constructor(){
    this.user =new User();
  }

  onSubmit(userForm: NgForm): void {
    if(userForm.valid)
      this.newUserEventEmmitter.emit(this.user);

    userForm.reset();
    userForm.resetForm();
  }

  onClear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

  onOpenClose(): void{
    this.openEventEmmitter.emit();
  }
}
