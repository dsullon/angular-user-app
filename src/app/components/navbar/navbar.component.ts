import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { User } from '../../models/user';

@Component({
  selector: 'navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  @Input() users: User[] = [];
}
