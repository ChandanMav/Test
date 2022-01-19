import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }

  loggedInUser = new Subject<boolean>();
}
