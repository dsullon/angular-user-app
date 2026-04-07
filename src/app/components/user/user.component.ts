import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';

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
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ){      
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const page = +(params.get('page') || 0);
      this.service.findAllPageable(page).subscribe(pageable => {
        this.users = pageable.content as User[];
        this.paginator = pageable;
        this.sharingData.paginatorEventEmitter.emit({paginator: this.paginator});
        this.cd.detectChanges();
      });
    });
  }

  onRemove(id: number): void{
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void{
    this.router.navigate(['/users/edit/', user.id]);
  }
}
