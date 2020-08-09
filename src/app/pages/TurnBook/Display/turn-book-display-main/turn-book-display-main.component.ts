import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { environment } from '../../../../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { ExcelService } from '../../../../common/services/sharedServices/excel.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
// import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-turn-book-display-main',
  templateUrl: './turn-book-display-main.component.html',
  styleUrls: ['./turn-book-display-main.component.css'],
  providers: [ApiCallsService]
})
export class TurnBookDisplayMainComponent implements OnInit {

  data: any;
  modelPAN: any;
  modelTruckNo: any;
  modelOwnerName: any;
  gstdetailslist: any;
  show = false;
  found;
  bookingnamelist;
  arr;
  api;
  newAuthor: any;
  nameToBeDisplayed: any;
  tabledata: false;
  public today;
  public todaysDate;
  public name: string;
  public dbName = 1;
  public commonArray;
  public date = new Date();
  turnbooklist: any;
  public dateFromUI;

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService) {
    this.commonArray = this.securityCheck.commonArray;
  }

  ngOnInit() {
    this.gstdetailslist = this.commonArray.gstdetails;
    this.todaysDate = this.date.getDate();
    this.find();
  }

  find = function () {
    this.today = this.handleF.getDate(this.date.getDate(), (this.date.getMonth() + 1), this.date.getFullYear());
    let body = {};
    body['today'] = this.today;
    this.apiCallservice.handleData_New(this.dbName, 'turnBook/getturnbookdata', 1, 0, body).
      subscribe((res: Response) => {
        this.turnbooklist = res;
      });
  };

  leftRight(LR) {
    switch (LR) {
      case 'back':
        this.todaysDate = this.todaysDate - 1;
        this.today = this.handleF.getDate(this.todaysDate, (this.date.getMonth() + 1), this.date.getFullYear());
        break;
      case 'ahead':
        this.todaysDate = this.todaysDate + 1;
        this.today = this.handleF.getDate(this.todaysDate, (this.date.getMonth() + 1), this.date.getFullYear());
        break;
      case 'realDate':
        this.today = this.dateFromUI;
        break;
    }
    let body = {};
    body['today'] = this.today;
    this.apiCallservice.handleData_New(this.dbName, 'turnBook/getturnbookdata', 1, 0, body).
      subscribe((res: Response) => {
        this.turnbooklist = res;
      });
  }

  deleteTurnBookDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.spinnerService.show();
      this.apiCallservice.handleData_New(this.dbName, 'turnBook/delturnbookdata', 1, 0, { id: id })
        .subscribe((response: Response) => {
          this.find();
          this.spinnerService.hide();
        });
    }
  };

  showDatabyid = function (data) {
    this.show = true;
    this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookUpdate']);
    this.handleData.saveData(data);
  };

}
