import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit{
  user: User = new User();
  errors: any = {};

  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private service: UserService,
    private cd: ChangeDetectorRef
  ){
  }

  ngOnInit(): void {
    this.sharingData.errorsUserFormEventEmitter.subscribe(errors => {
      this.errors = errors;
      this.cd.detectChanges();
    });
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if( id > 0){
        this.service.findById(id).subscribe(user => {
          this.user = user;
          //Object.assign(this.user, user);
          this.cd.detectChanges();
        });
        
      }
    })
  }

  onSubmit(userForm: NgForm): void {
    const userData: User = {...this.user};
    //if(userForm.valid)
    this.sharingData.newUserEventEmmitter.emit(userData);
    //userForm.reset();
    //userForm.resetForm();
  }

  onClear(userForm: NgForm): void {
    //this.user.set(new User());
    userForm.reset();
    userForm.resetForm();
  }
}
