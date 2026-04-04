import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class SharingDataService {

  private _newUserEventEmmitter: EventEmitter<User> = new EventEmitter();
  private _idUserEventEmitter: EventEmitter<number> = new EventEmitter();
  private _findUserEventEmitter: EventEmitter<number> = new EventEmitter();
  private _selectUserEventEmitter: EventEmitter<User> = new EventEmitter();

  get newUserEventEmmitter(): EventEmitter<User> {
    return this._newUserEventEmmitter;
  }
  
  get idUserEventEmitter(): EventEmitter<number> {
    return this._idUserEventEmitter;
  }

  get findUserEventEmitter(): EventEmitter<number> {
    return this._findUserEventEmitter;
  }

  get selectUserEventEmitter(): EventEmitter<User> {
    return this._selectUserEventEmitter;
  }
}
