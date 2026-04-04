import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAppComponent } from "./components/user-app.component";

@Component({
  selector: 'app-root',
  imports: [UserAppComponent],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('user-app');
}
