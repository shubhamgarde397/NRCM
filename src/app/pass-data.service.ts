import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  private users = new BehaviorSubject([]);
  currentUsers = this.users.asObservable();
 
  constructor() {
 
  }
  updateApprovalMessage(message) {
  this.users.next(message)
  }
 }