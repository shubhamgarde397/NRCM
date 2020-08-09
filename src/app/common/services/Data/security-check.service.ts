import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityCheckService {
  public yearNames;
  public monthNames;
  public commonArray = [];
  public AUTH = false;

  constructor() {
    console.log('called');
  }

  authenticate(a) {
    if (a === 'hi') {
      return true;
    } else {
      return false;
    }
  }

}
