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
  public dynDate2;
  public role = 6;
  public dataTruck;
  public adminAccess = false;
  public displayoptions = [
    { 'value': '1', 'viewvalue': 'Avaliable Trucks' },
    { 'value': '2', 'viewvalue': 'Truck Arrival' },
    { 'value': '3', 'viewvalue': 'Truck Dispatched' },
    { 'value': '4', 'viewvalue': 'To From' },
    { 'value': '5', 'viewvalue': 'Monthly Data' },
  ]

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {
    this.role = this.securityCheck.role;

    this.todaysDate = this.date.getDate() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getFullYear();;
    this.turnbooklist = [];
    this.turnbooklist = this.handleData.giveTurn();

  }

  getAdminAccess() {
    this.adminAccess = !this.adminAccess;
  }

  newData() {
    if (this.dataTruck === '' || this.dataTruck === null || this.dataTruck === undefined) {
      this.turnbooklist = [];
      this.turnbooklist = this.handleData.giveTurn();
    }
    else {
      let tempList = this.handleData.giveTurn();
      this.turnbooklist = this.handleData.giveTurn();
      this.turnbooklist = [];
      let tempData = [];
      tempList.filter((res, index) => {
        if (res.ownerDetails[0]['truckno'].includes(this.dataTruck.toUpperCase())) {
          tempData.push(res);
        }

      })
      this.turnbooklist = tempData;

    }
  }

  findOption() {

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
      case '4':
        tempObj['turnbookDate'] = this.dynDate;
        tempObj['turnbookDateFrom'] = this.dynDate2;
        break;
      case '5':
        tempObj['turnbookDate'] = this.dynDate.slice(0, 7);
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
        this.handleData.saveTurn(this.turnbooklist);
      });
  };

  showDatabyid = function (data, j) {
    this.show = true;

    let tempObj = {};
    tempObj['place'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0].village_name;
    tempObj['truckno'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0].truckno;
    tempObj['partyName'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0].name;
    tempObj['ownerid'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0]._id;;
    tempObj['placeid'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0]._id;
    tempObj['partyid'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0]._id;
    tempObj['entryDate'] = data.entryDate;
    tempObj['_id'] = data._id;
    tempObj['partyType'] = data.partyType;
    tempObj['turnbookDate'] = data.turnbookDate;
    tempObj['loadingDate'] = data.loadingDate;
    tempObj['lrno'] = data.lrno === undefined ? '' : data.lrno;
    tempObj['hamt'] = data.hamt === undefined ? 0 : data.hamt;
    tempObj['advance'] = data.advance === undefined ? 0 : data.advance;
    tempObj['balance'] = data.balance === undefined ? 0 : data.balance;
    tempObj['pochDate'] = data.pochDate === undefined ? '' : data.pochDate;
    tempObj['pochPayment'] = data.pochPayment === undefined ? '' : data.pochPayment;
    tempObj['index'] = j;
    tempObj['number'] = 1;
    this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookUpdate']);
    this.handleData.saveData(tempObj);
  };


  showDatabyid3 = function (data, j) {
    this.show = true;

    let tempObj = {};
    tempObj['place'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0].village_name;
    tempObj['truckno'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0].truckno;
    tempObj['partyName'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0].name;

    tempObj['ownerid'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0]._id;;
    tempObj['placeid'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0]._id;
    tempObj['partyid'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0]._id;

    tempObj['entryDate'] = data.entryDate;
    tempObj['_id'] = data._id;

    tempObj['partyType'] = data.partyType;
    tempObj['turnbookDate'] = data.turnbookDate;
    tempObj['loadingDate'] = data.loadingDate;
    tempObj['lrno'] = data.lrno === undefined ? '' : data.lrno;
    tempObj['hamt'] = data.hamt === undefined ? 0 : data.hamt;
    tempObj['advance'] = data.advance === undefined ? 0 : data.advance;
    tempObj['balance'] = data.balance === undefined ? 0 : data.balance;
    tempObj['pochDate'] = data.pochDate === undefined ? '' : data.pochDate;
    tempObj['pochPayment'] = data.pochPayment === undefined ? '' : data.pochPayment;
    tempObj['index'] = j;
    tempObj['number'] = 3;
    this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookUpdate']);
    this.handleData.saveData(tempObj);
  };

  showDatabyid2 = function (data, j) {
    if (confirm('Do you want to Cancel this Vehicle?')) {
      this.show = true;

      let tempObj = {};
      tempObj['ownerid'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0]._id;;
      tempObj['placeid'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0]._id;
      tempObj['partyid'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0]._id;
      tempObj['_id'] = data._id;
      tempObj['loadingDate'] = '2099-12-12';


      tempObj['method'] = 'update';
      tempObj['tablename'] = 'turnbook';
      tempObj["turnbookDate"] = data.turnbookDate,
        tempObj["entryDate"] = data.entryDate,
        tempObj["lrno"] = '';
      tempObj["partyType"] = '';
      tempObj["hamt"] = '';
      tempObj["advance"] = '';
      tempObj["balance"] = '';
      tempObj["pochDate"] = '';
      tempObj["pochPayment"] = '';
      tempObj['index'] = j;
      tempObj['number'] = 2;
      this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 0)
        .subscribe((res: any) => {
          alert(res.Status);
          this.handleData.turnData[j]['ownerid'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0]._id;;
          this.handleData.turnData[j]['placeid'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0]._id;
          this.handleData.turnData[j]['partyid'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0]._id;
          this.handleData.turnData[j]['loadingDate'] = '2099-12-12';
          this.handleData.turnData[j]["turnbookDate"] = data.turnbookDate,
            this.handleData.turnData[j]["entryDate"] = data.entryDate,
            this.handleData.turnData[j]["lrno"] = '';
          this.handleData.turnData[j]["partyType"] = '';
          this.handleData.turnData[j]["hamt"] = '';
          this.handleData.turnData[j]["advance"] = '';
          this.handleData.turnData[j]["balance"] = '';
          this.handleData.turnData[j]["pochDate"] = '';
          this.handleData.turnData[j]["pochPayment"] = '';
          this.handleData.turnData[j]['index'] = j;



          let tempData = this.handleData.giveTurn();
          this.handleData.saveTurn([]);
          let tempArray = []
          tempArray = tempData;
          tempArray.splice(j, 1)
          this.handleData.saveTurn(tempArray)
          this.turnbooklist = [];
          this.turnbooklist = this.handleData.giveTurn();
        });
    }
    else {

    }
  };

  delete(id, j) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id._id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'turnbook';
      formbody['turnbookDate'] = id.turnbookDate;

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response: Response) => {
          this.turnbooklist.splice(j, 1);
        });
    }
  }

  edit(data) {
    this.show = true;
    data['index'] = 0;
    this.handleData.saveData(data);
    this.router.navigate(['Navigation/Information/OWNER_HANDLER/OwnerUpdate']);
  }

}
