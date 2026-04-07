import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'paginator',
  imports: [RouterLink],
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  @Input() url: string = '';
  @Input() paginator: any = {};
  
  
}
