import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityCheckService {
  public saveFinancialYear;
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

  saveYear(yearName) {
    this.yearNames = [yearName.slice(0, 4), yearName.slice(5, 9)];
    switch (yearName) {
      case '2018-2019 (April-March)':
        // this.saveFinancialYear = '1';
        this.saveFinancialYear = 'NRCM';
        break;
      case '2019-2020 (April-March)':

        // this.saveFinancialYear = '2';
        this.saveFinancialYear = 'NRCM_2019_2020';
        break;
    }
  }
}
