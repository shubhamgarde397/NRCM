import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';


@Component({
  selector: 'app-lrnumber-not',
  templateUrl: './lrnumber-not.component.html',
  styleUrls: ['./lrnumber-not.component.css'],
  providers: [ApiCallsService]
})
export class LrnumberNotComponent implements OnInit {
  public dbName;
  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService, public router: Router,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
  }

  refresh() {

    this.apiCallservice.handleData_New(this.dbName, 'lrno/getLRDetailsNot', 1, 0)
      .subscribe((res: Response) => {
        if (Object.keys(res).length > 0) {
          console.log('all clear');

        } else {

          console.log('refreshing');
          this.apiCallservice.handleData_New(this.dbName, 'lrno/getLRDetails', 1, 0)
            .subscribe((res2: Response) => {
              this.refreshToDatabase(res2, true);
            });
        }
      });


  }

  refreshToDatabase(data, refresh) {
    const lrNotData = [];
    const __length__ = Object.keys(data).length;
    let tempLength = 0;
    let firstLRNO = data[0].lrno;
    data.forEach(element => {
      if (firstLRNO === element.lrno) {
        firstLRNO++;
      } else {
        for (let i = firstLRNO; i < element.lrno; i++) {
          let value = { 'lrno': firstLRNO++, 'check': false, 'value': '' };
          if (refresh) {
            console.log(value);

            this.apiCallservice.handleData_New(this.dbName, 'lrno/pushLRDetailsNot', 1, 0, value)
              .subscribe((res: Response) => {
                value = { 'lrno': 0, 'check': false, 'value': '' };
              });
          }
        }

        tempLength++;
        firstLRNO++;
      }
    });
    if (tempLength === __length__ - 1) {
      console.log(lrNotData);
    } else {
      console.log(lrNotData);
    }
  }

}
