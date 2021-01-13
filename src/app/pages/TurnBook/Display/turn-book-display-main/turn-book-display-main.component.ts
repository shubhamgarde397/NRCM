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
  show = false;
  tabledata: false;
  public today;
  public todaysDate;
  public name: string;
  public dbName = 1;
  public commonArray;
  public date = new Date();
  public turnbooklist: any;
  public dateFromUI;
  public buttonValue: any = 'Avaliable Trucks';
  public buttonOption = '1';
  public trucknoid;
  public dynDate;
  public displayoptions = [{ 'value': '1', 'viewvalue': 'Avaliable Trucks' }, { 'value': '2', 'viewvalue': 'Truck Arrival' }, { 'value': '3', 'viewvalue': 'Truck Dispatched' }]
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {
    this.todaysDate = this.date.getDate();
  }
  findOption() {
    console.log(this.trucknoid);

    this.buttonOption = this.trucknoid;
    this.buttonValue = this.displayoptions[parseInt(this.trucknoid) - 1].viewvalue;
  }
  find = function () {//only for data from 1st jan 2021 and loading data is empty
    let tempObj = {};
    switch (this.buttonOption) {
      case '1':
        tempObj['turnbookDate'] = '2021-01-01';
        break;
      case '2':
        tempObj['turnbookDate'] = this.dynDate;
        break;
      case '3':
        tempObj['turnbookDate'] = this.dynDate;
        break;

      default:
        break;
    }


    tempObj['tablename'] = 'turnbook'
    tempObj['method'] = 'displayTB'
    tempObj['display'] = this.buttonOption;
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 1)
      .subscribe((res: any) => {
        this.turnbooklist = res.Data;

      });
  };

  showDatabyid = function (data) {
    this.show = true;
    this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookUpdate']);
    this.handleData.saveData(data);
  };

}
