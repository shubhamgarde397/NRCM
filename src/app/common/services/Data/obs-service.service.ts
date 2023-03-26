import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObsServiceService {

  public dataService = new BehaviorSubject([]);
  public data = this.dataService.asObservable();

  public pipeService = new BehaviorSubject([]);
  public pipe = this.pipeService.asObservable();

  public dateService = new BehaviorSubject([]);
  public monthYear = this.dateService.asObservable();

  constructor() { }
  resetData() {
    this.dataService.next([]);
  }
  addData(dataObj) {
    const currentValue = this.dataService.value;
    const updatedValue = [...currentValue, dataObj];
    this.dataService.next(updatedValue);
  }
  updateData(dataObj, index, str) {
    const currentValue = this.dataService.value;
    switch (str) {
      case 'payment':
        currentValue[2].PaymentDetails[index] = dataObj;
        break;
      case 'account':
        currentValue[1].AccountDetails[index] = dataObj;
        break;
      case 'balance':
        currentValue[0].BFDetails = dataObj;
        break;
    }
    this.dataService.next(currentValue);
  }
  deleteData(index, str) {
    const currentValue = this.dataService.value;
    switch (str) {
      case 'balance':
        currentValue[0].BFDetails = { 'BFMsg': '', 'BF': '' };
        break;
      case 'account':
        currentValue[1].AccountDetails.splice([index], 1);
        break;
      case 'payment':
        currentValue[2].PaymentDetails.splice([index], 1);
        break;
    }
    this.dataService.next(currentValue);
  }
  savePipe(data) {
    this.pipeService.next(data);
  }

  saveDate(data) {
    this.dateService.next(data);
  }
}
