import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Alex',
      lastName: 'Sullon',
      email: 'donald.sullon@outlook.com',
      userName: 'dsullon',
      password: '123456'
    },
    {
      id: 2,
      name: 'Juan Israel',
      lastName: 'Bustamante Romero',
      email: 'juan.israel@buro.com',
      userName: 'jiburo',
      password: '123456'      
    }
  ]

  findAll(): Observable<User[]>{
    return of(this.users);
  }
}
