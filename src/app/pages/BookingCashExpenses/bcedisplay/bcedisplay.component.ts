import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-bcedisplay',
  templateUrl: './bcedisplay.component.html',
  styleUrls: ['./bcedisplay.component.css'],
  providers: [ApiCallsService]
})
export class BCEDisplayComponent implements OnInit {
  data: any;
  modelPAN: any;
  modelTruckNo: any;
  modelOwnerName: any;
  gstdetailslist;
  show = false;
  found;
  bookingnamelist;
  arr;
  api;
  newAuthor: any;
  nameToBeDisplayed: any;
  tabledata: false;
  public name: string;
  public dbName = 1;
  public count;
  public commonArray;
  constructor(public apiCallservice: ApiCallsService, public router: Router,
    public handleData: HandleDataService,
    public securityCheck: SecurityCheckService
  ) {
    this.commonArray = this.securityCheck.commonArray;
  }

  ngOnInit() {
    this.gstdetailslist = this.commonArray.gstdetails;
  }

  find = function () {
    this.countFunc();
    this.apiCallservice.handleData_New(this.dbName, 'bookingCashExpenses/getbookingCashExpenses', 1, 1, {}, this.name + 'BCE').
      subscribe((res: Response) => {
        this.tabledata = true;
        this.bookingnamelist = res;
      });
  };

  countFunc = function () {
    this.apiCallservice.handleData_New(this.dbName, 'bookingCashExpenses/countbookingCashExpenses', 1, 1, {}, this.name + 'BCE').
      subscribe((res: Response) => {
        this.countResponse = res;
        this.count = this.countResponse.count;
      });
  };

  delete = function (id) {
    if (confirm('Please make changes in Bank Cash Expenses of ' + this.name + 'with date as ' + id.date)) {
      this.apiCallservice.handleData_New(this.dbName, 'bookingCashExpenses/deletebookingCashExpenses', 1, 2, {}, id._id, this.name + 'BCE')
        .subscribe((response: Response) => {
          this.router.navigate(['Navigation/CanaraBankPayment_HANDLER']);
        });
    }
  };

  showDatabyid = function (data, lrno) {
    const nameOfParty = this.name;
    if (lrno == null) {
      var lrnoP = 'payment';
    } else {
      var lrnoP = 'hire';
    }
    this.show = true;
    this.handleData.saveData({ data, lrnoP, nameOfParty });
    this.router.navigate(['Navigation/BCE_HANDLER/BCEUpdate']);
  };
}
