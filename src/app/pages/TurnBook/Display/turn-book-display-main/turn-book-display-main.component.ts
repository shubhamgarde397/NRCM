import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'jspdf-autotable';
import * as  jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-turn-book-display-main',
  templateUrl: './turn-book-display-main.component.html',
  styleUrls: ['./turn-book-display-main.component.css'],
  providers: [ApiCallsService]
})
export class TurnBookDisplayMainComponent implements OnInit {
  public isAvailable=false;
  public loadingDateDynamic;
  public showbuttonOption8 = false;
  public showbuttonOption82 = false;
  public showbuttonOption821 = false;
  public data: any;
  public show = false;
  public tabledata: false;
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
  public trucklist;
  public dateFilter;
  public truckFilter;
  public truckFilter2;
  public dateFilterB = true;
  public truckFilterB = false;
  public turnbooklistnew = [];
  public displayoptions = [
    { 'value': '1', 'viewvalue': 'Avaliable Trucks' },
    { 'value': '2', 'viewvalue': 'Truck Arrival' },
    { 'value': '3', 'viewvalue': 'Truck Dispatched' },
    { 'value': '4', 'viewvalue': 'To From' },
    { 'value': '5', 'viewvalue': 'Monthly Data' },
    { 'value': '6', 'viewvalue': 'Balance Hire' },
    { 'value': '7', 'viewvalue': 'Update Poch Check' },
    { 'value': '8', 'viewvalue': 'Monthly By Series' },
    { 'value': '9', 'viewvalue': 'Cancelled Vehicles' },
    { 'value': '10', 'viewvalue': 'By Party' },
    { 'value': '11', 'viewvalue': 'Details By Truck' },
  ]
  public years = []
  public buttons = []
  public balanceHireArrray = [];
  public tempArray = [];
  public finalObject = {};
  public finalArray = [];
  public tempObj = {};
  public saveToCheckArrayBoolean = true;
  public finalCheckDone = true;
  public balance;
  public pageno;
  public gAD;
  public trucks=[];
  public ids = [];
  public pochDiv = true;
  public selectedMonth;
  public selectedYear;
  public selectedmy;
  public turnbooklist_trucks = [];
  public myFormGroup: FormGroup;
  public considerArray;
  public villagelist: any;
  public parties: any;
  public tempVNAME;
  public placeid;
  public partyid;
  public tempPNAME;
  public toSendid;
  public show8Msg = "";
  public selectpartyType;
  public partyVar;
  public truckVar;
  public truckid;
  public byTruckName=false;

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService, public formBuilder: FormBuilder,) {
  }

  ngOnInit() {//"^2021-04.*"
    this.considerArray = this.handleData.createConsiderArray('turnbookadd')
    this.handleData.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.buttons=this.getButtons()
    this.role = this.securityCheck.role;
    this.commonArray = this.securityCheck.commonArray;
    this.todaysDate = this.handleF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());//
    this.turnbooklist = [];
    this.turnbooklist = this.handleData.giveTurn();
    this.getTrucks()
  }

  showDatabyParty() {
    this.turnbooklist = this.handleData.giveTurn();
    let tempData = [];
    switch (this.selectpartyType) {
      case 'NRCM':
        tempData = this.turnbooklist.filter(r => r.partyType === 'NRCM')
        break;
      case 'NR':
        tempData = this.turnbooklist.filter(r => r.partyType === 'NR')
        break;
      case 'All':
        tempData = this.turnbooklist.filter(r => r.partyType)
        break;

    }
    this.turnbooklist = tempData;
  }

  getInformationData() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.fetchBasic();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.parties = [];
    this.trucks=[]
    this.villagelist = [];
    this.parties = this.commonArray.gstdetails;
    this.trucks = this.commonArray.ownerdetails;
    this.villagelist = this.commonArray.villagenames;
  }


  getButtons() {
let buttons=[]
    for (let i = 0; i < new Date().getFullYear() - 2019; i++) {
      this.years.push(i + 2020)
    }
    for (let i = 0; i < this.years.length; i++) {
      let months = new Date().getFullYear() - this.years[i] == 0 ? new Date().getMonth() + 1 : 12;
      for (let j = 0; j < months; j++) {
        let date = new Date(String(i + 2020) + '-' + this.handleF.generate2DigitNumber(String(j + 1)) + '-01');
        let month = date.toLocaleString('default', { month: 'short' });
        this.tempObj['value'] = "^" + String(i + 2020) + "-" + this.handleF.generate2DigitNumber(String(j + 1)) + ".*";
        this.tempObj['viewValue'] = month + '-' + String(i + 2020).slice(-2);
        buttons.push(this.tempObj);
        this.tempObj = {}
      }
    }
    return buttons.reverse();

    // for(i=0;i<years.length;i++){
    //   months=new Date().getFullYear()-years[i]==0?new Date().getMonth()+1:12;
    //   for(j=0;j<months;j++){
    //      date = new Date(String(i+2020)+'-'+generate2DigitNumber(String(j+1))+'-01');
    // month = date.toLocaleString('default', { month: 'short' });
    //   }
    // }this works
  }
  filter(sh) {
    switch (sh) {
      case 'date':
        if (this.dateFilter === '' || this.dateFilter === null || this.dateFilter === undefined) {
          this.turnbooklist = [];
          this.turnbooklist = this.handleData.giveBH();
        }
        else {
          let tempList = this.handleData.giveBH();
          this.turnbooklist = this.handleData.giveBH();
          this.turnbooklist = [];
          let tempData = [];
          tempList.filter((res, index) => {
            if (res['loadingDate'].includes(this.dateFilter)) {
              tempData.push(res);
            }
          })
          this.turnbooklist = tempData;
          this.handleData.saveBH(this.turnbooklist)
          this.dateFilterB = !this.dateFilterB;
          this.truckFilterB = !this.truckFilterB;
        }
        break;
      case 'truck':
        if (this.truckFilter === '' || this.truckFilter === null || this.truckFilter === undefined) {
          this.turnbooklist = [];
          this.turnbooklist = this.handleData.giveBH();
        }
        else {
          let tempList = this.handleData.giveBH();
          this.turnbooklist = this.handleData.giveBH();
          this.turnbooklist = [];
          let tempData = [];
          tempList.filter((res, index) => {
            if (res['truckno'].includes(this.truckFilter)) {
              tempData.push(res);
            }
          })
          this.turnbooklist = tempData;
          this.dateFilterB = !this.dateFilterB;
          this.truckFilterB = !this.truckFilterB;
        }
        break;
      case 'skipDate':
        this.dateFilterB = !this.dateFilterB;
        this.truckFilterB = !this.truckFilterB;
        break;

      case '':
        this.dateFilterB = true;
        this.truckFilterB = false;
        this.turnbooklist = this.handleData.giveBH();
        break;
    }
  }
  filter2(sh) {
    switch (sh) {
      case 'truck':
        if (this.truckFilter2 === '' || this.truckFilter2 === null || this.truckFilter2 === undefined) {
          this.turnbooklist = [];
          this.turnbooklist = this.handleData.giveBH();
        }
        else {
          let tempList = this.handleData.giveBH();
          this.turnbooklist = this.handleData.giveBH();
          this.turnbooklist = [];
          let tempData = [];
          tempList.filter((res, index) => {
            if (res['ownerDetails'][0]['truckno'].includes(this.truckFilter2)) {
              tempData.push(res);
            }
          })
          this.turnbooklist = tempData;
          this.handleData.saveBH(this.turnbooklist)
        }
        break;
      case 'back':
        this.pochDiv = true;
        break;
      case '':
        this.turnbooklist = this.handleData.giveBH();
        break;
    }
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

  findgst() {
    this.partyid = this.handleF.findgst(this.partyVar, this.parties);
  }

  findtruck() {
    this.truckid = this.handleF.findowner(this.truckVar, this.trucks,'Select Truck No');
  }

  findOption() {
    this.pochDiv = true;
    this.buttonOption = this.trucknoid;
    this.buttonValue = this.displayoptions[parseInt(this.trucknoid) - 1].viewvalue;
  }
  find = function (data = null) {//only for data from 1st april 2021 and loading data is empty
    let tempObj = {};
    this.byTruckName=false;
    switch (this.buttonOption) {
      case '1':
        tempObj['turnbookDate'] = '2021-04-01';
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
      case '7':
        tempObj['date'] = data;
        break;
      case '8':
        tempObj['date'] = this.selectedmy;
        break;
        case '10':
        if (this.partyVar === '') { alert('Select a Party Name'); break; }
        else {
          tempObj['partyid'] = this.partyid['_id'];
        }
        break;
        case '11':
        if (this.truckVar === '') { alert('Select a Truck'); break; }
        else {
          tempObj['id'] = this.truckid['_id'];
        }
        break;
      default:
        break;
    }
    if (this.buttonOption !== '8') {
      this.showbuttonOption8 = false;
    }


    tempObj['tablename'] = 'turnbook'
    tempObj['method'] = 'displayTB'
    tempObj['display'] = this.buttonOption;

if(this.buttonOption !== '11'){

    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 1)
      .subscribe((res: any) => {
        if (this.buttonOption == '6') {
          this.turnbooklist = res.Data;
          this.handleData.saveBH(this.turnbooklist);
        }
        else if (this.buttonOption == '7') {
          this.pochDiv = false;
          this.turnbooklist = res.Data;
          this.handleData.saveBH(this.turnbooklist);
        }
        else if (this.buttonOption == '8') {
          if (res.Data.length > 0) {
            this.showbuttonOption8 = true;
            this.turnbooklistnew = res.Data;
            this.myFormGroup = this.formBuilder.group({
              loadingDateDynamic: '',
              turnbookDate: '',
              truckno: '',
              place: '',
              partyName: '',
              loadingDate: '',
              lrno: '',
              hamt: '',
            });
          } else {
            this.showbuttonOption8 = false;
            this.show8Msg = "All set for this month.";
          }
        }
        else {
          this.turnbooklist = res.Data;
          this.isAvailable=true;
          this.handleData.saveTurn(this.turnbooklist);
        }
      });
    }
    else if(this.buttonOption==='11'){
let tempObj1={};
    tempObj1['tablename'] = 'turnbook'
    tempObj1['method'] = 'singleTruck'
    tempObj1['display'] = this.buttonOption;
    tempObj1['id'] = this.truckid['_id'];
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, 1)
      .subscribe((res: any) => {
        this.byTruckName=true;
        this.turnbooklist = res.Data;
      });
    }

  };

  getOtherDetails() {
    this.showbuttonOption82 = true;
    this.turnbooklist_trucks = this.turnbooklistnew.filter(r => r.loadingDate == this.myFormGroup.value.loadingDateDynamic)
  }
  getOtherDetails2() {
    let tempDate = this.turnbooklist_trucks.filter(r => r.truckno == this.myFormGroup.value.truckno);
    this.toSendid = tempDate[0]._id;
    this.showbuttonOption821 = true;
    this.myFormGroup.patchValue({ turnbookDate: tempDate[0]['turnbookDate'] })
    this.myFormGroup.patchValue({ place: tempDate[0][''] })
    this.myFormGroup.patchValue({ partyName: tempDate[0][''] })
    this.myFormGroup.patchValue({ lrno: tempDate[0]['lrno'] })
    this.myFormGroup.patchValue({ hamt: tempDate[0]['hamt'] })
  }

  change(data) {
    let tempData = {}
    tempData['placeid'] = this.placeid;
    tempData['partyid'] = this.partyid
    tempData['lrno'] = data.value.lrno
    tempData['hamt'] = data.value.hamt
    tempData['_id'] = this.toSendid;
    tempData['tablename'] = 'turnbook'
    tempData['method'] = 'update'
    tempData['part'] = 2;
    this.apiCallservice.handleData_New_python('turnbook', 1, tempData, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        let newData = this.turnbooklistnew.filter(r => r._id !== this.toSendid);
        this.handleData.saveTurn([]);
        this.handleData.saveTurn(newData);
        this.turnbooklistnew = newData;
        this.myFormGroup.patchValue({ turnbookDate: '' })
        this.myFormGroup.patchValue({ place: '' })
        this.myFormGroup.patchValue({ partyName: '' })
        this.myFormGroup.patchValue({ lrno: '' })
        this.myFormGroup.patchValue({ hamt: '' })
        this.showbuttonOption82 = false;
        this.showbuttonOption821 = false;

      });

  }

  uncheckPoch(data, j) {
    console.log(j);
    
    let tempObj = {};
    tempObj['method'] = 'updatePoch';
    tempObj['tablename'] = 'turnbook';
    tempObj['_id'] = data['_id'];
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 1)
      .subscribe((res: any) => {
        this.handleData.saveBH(this.turnbooklist.splice(j, 1));
      });
  }

  showDatabyid = function (data, j, number) {
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
    tempObj['number'] = number;
    this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookUpdate']);
    this.handleData.saveData(tempObj);
  };

  showDatabyid2 = function (data, j, type) {
    let newdate;
    let newtype;
    switch (type) {
      case 'cancel':
        newdate = '2099-12-12';
        newtype = 'Cancel';
        break;
      case 'uncancel':
        newdate = '';
        newtype = '';
        break;
    }
    if (confirm('Do you want to Cancel this Vehicle?')) {
      this.show = true;

      let tempObj = {};
      tempObj['ownerid'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0]._id;
      tempObj['placeid'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0]._id;
      tempObj['partyid'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0]._id;
      tempObj['_id'] = data._id;
      tempObj['loadingDate'] = newdate;


      tempObj['method'] = 'update';
      tempObj['tablename'] = 'turnbook';
      tempObj["turnbookDate"] = data.turnbookDate,
        tempObj["entryDate"] = data.entryDate,
        tempObj["lrno"] = '';
      tempObj["partyType"] = newtype;
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
          this.handleData.turnData[j]['loadingDate'] = newdate;
          this.handleData.turnData[j]["turnbookDate"] = data.turnbookDate,
            this.handleData.turnData[j]["entryDate"] = data.entryDate,
            this.handleData.turnData[j]["lrno"] = '';
          this.handleData.turnData[j]["partyType"] = newtype;
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
  addToCheckArray(i, j, c) {
    // i['index'] = j;
    if (i['loadingDate'] == "") {
      alert('Loading Date cant be empty.')
    }
    else {
      this.turnbooklist[j]['checker'] = c;
      if (c == 1) {
        this.tempArray.push(i);
      } else if (c == 0) {
        this.tempArray.splice(j, 1);
      }
    }
  }

  addToCheckArray2(i, j, c) {
    this.balanceHireArrray[i][j]['checker'] = c;
    this.balanceHireArrray[i].splice(j, 1)
    // this.turnbooklist.push(this.balanceHireArrray[i][j])
  }

  saveToCheckArray() {
    this.balanceHireArrray.push(this.tempArray);
    this.tempArray = []


    this.turnbooklist = this.reduceArray();
  }

  reduceArray() {
    let tempArray = []
    for (let i = 0; i < this.turnbooklist.length; i++) {
      if (this.turnbooklist[i].checker == 0) {
        tempArray.push(this.turnbooklist[i])
      }
    }
    return tempArray;
  }

  moveToFinalStep() {
    this.saveToCheckArrayBoolean = !this.saveToCheckArrayBoolean;
  }
  moveToFinalStep2() {
    this.finalCheckDone = !this.finalCheckDone;
  }
  moveToFinalStepReset() {
    this.saveToCheckArrayBoolean = !this.saveToCheckArrayBoolean;
    this.balanceHireArrray = [];
    this.tempArray = [];
    this.finalObject = {};
    this.finalArray = [];
    this.ids=[];
    this.find()
  }

  setBalPage() {
    let breaker = false;
    for (let i = 0; i < this.balanceHireArrray.length; i++) {
      let truckData = []
      if (breaker) { break; }
      for (let j = 0; j < this.balanceHireArrray[i].length; j++) {
        if (breaker) { break; }
        let tempObj = {};
        if (((<HTMLInputElement>document.getElementById('balance_' + i + '_' + j)).value.length == 0) || ((<HTMLInputElement>document.getElementById('pageno_' + i + '_' + j)).value.length == 0)) {
          alert('Please fill in all the fields.');
          breaker = true;
          break;
        }
        else {
          if (breaker) { break; }
          this.ids.push(this.balanceHireArrray[i][j]['_id']);//ObjectId to mongoform in lambda write a loop
          tempObj['date'] = this.balanceHireArrray[i][j].loadingDate;
          tempObj['truckno'] = this.balanceHireArrray[i][j].ownerDetails[0].truckno;
          tempObj['pageno'] = parseInt((<HTMLInputElement>document.getElementById('pageno_' + i + '_' + j)).value);
          tempObj['amount'] = parseInt((<HTMLInputElement>document.getElementById('balance_' + i + '_' + j)).value);
          truckData.push(tempObj);
          //write logic to update the TurnBook_2020_2021 and change pochPayment to true when sent to lambda
        }

      }
      if (breaker) { break; }
      this.finalObject['truckData'] = truckData
      this.finalObject['todayDate'] = this.todaysDate;
      this.finalObject['comments'] = "";
      this.finalObject['print'] = false;
      
      let aD = this.getADD(truckData);
      this.finalObject['bankName'] = (aD['accountDetails'].length > 1 || aD['accountDetails'].length == 0) ? '' : aD['accountDetails'][0]['bankName'];
      this.finalObject['ifsc'] = (aD['accountDetails'].length > 1 || aD['accountDetails'].length == 0) ? '' : aD['accountDetails'][0]['ifsc'];
      this.finalObject['accountNumber'] = (aD['accountDetails'].length > 1 || aD['accountDetails'].length == 0) ? '' : aD['accountDetails'][0]['accountNumber'];
      this.finalObject['accountName'] = (aD['accountDetails'].length > 1 || aD['accountDetails'].length == 0) ? '' : aD['accountDetails'][0]['accountName'];
      this.finalArray.push(this.finalObject);
      this.finalObject = {};
    }
    this.finalFunction();
  }

  finalFunction() {
    let tempObj = {}
    tempObj['bhData'] = this.finalArray;
    tempObj['method'] = 'insertmany.many';
    tempObj['tablename'] = 'BalanceHire';
    tempObj['ids'] = this.ids;
    tempObj['todayDate'] = this.todaysDate;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        this.moveToFinalStepReset();
      });
    //update the pochPayment = true for those trucks whose entry was done in BalanceHire
  }

  getTrucks() {
    this.trucklist = this.commonArray.ownerdetails;
  }

  getADD(array) {
    array.forEach(res => {
      let g = this.trucklist.find(r => r.truckno === res.truckno);
      if (g['accountDetails'].length > 0) { this.gAD = g; }
      else { this.gAD = { 'accountDetails': [] }; }
    });
    return this.gAD;
  }

  setPlaceName() {
    this.placeid = this.villagelist[this.myFormGroup.value.place.split('+')[1]]._id;
    this.tempVNAME = this.villagelist[this.myFormGroup.value.place.split('+')[1]].village_name;
    this.myFormGroup.value.place = this.tempVNAME;
  }

  setPartyName() {
    this.partyid = this.parties[this.myFormGroup.value.partyName.split('+')[1]]._id;
    this.tempPNAME = this.parties[this.myFormGroup.value.partyName.split('+')[1]].name;
    this.myFormGroup.value.partyName = this.tempPNAME;
  }

  downloadAvailableData(){//threshhold is 295
    let data=this.turnbooklist;
    let pager=1;
     let bigValueofY=0;
     var doc = new jsPDF()
     doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Available Trucks Details : ', 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     //headers
     doc.setFontSize('10');
     let y = 24;
     let starty = 25;
     doc.text('Sr', 2, y)//partyname
     doc.text('TruckNo', 8, y)//partyname
     doc.text('Acc', 33.5, y)//partyname
     doc.text('Pan', 43, y)//partyname
     doc.text('RC', 53, y)//partyname
     doc.text('DL', 63, y)//partyname
     doc.text('Con', 71, y)//partyname
     doc.text('Notes', 105, y)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(7, 20, 7, 25);//srno
     doc.line(33, 20, 33, 25);//date
     doc.line(40, 20, 40, 25);//truckno
     doc.line(50, 20, 50, 25);//truckno
     doc.line(60, 20, 60, 25);//truckno
     doc.line(70, 20, 70, 25);//truckno
     doc.line(80, 20, 80, 25);//truckno
     //vertical lines
     let startforI=0;
     y = y + 6;
     startforI=0;
     console.log(data.length);
     
     for (let i = startforI; i < data.length; i++) {
 
       if(y>290){
         y=30;
     starty = 25;
         doc.addPage();
         doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Available Trucks Details : ', 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 2, y-6)//partyname
     doc.text('TruckNo', 8, y-6)//partyname
     doc.text('Acc', 33.5, y-6)//partyname
     doc.text('Pan', 43, y-6)//partyname
     doc.text('RC', 53, y-6)//partyname
     doc.text('DL', 63, y-6)//partyname
     doc.text('Con', 71, y-6)//partyname
     doc.text('Notes', 105, y-6)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
     }
     
      doc.text(this.handleF.generate2DigitNumber(String(i+1)), 2, y-1)//partyname
     doc.text(data[i].ownerDetails[0].truckno.split(' ')[0]+''+data[i].ownerDetails[0].truckno.split(' ')[1]+''+data[i].ownerDetails[0].truckno.split(' ')[2], 8, y-1)//partyname
     doc.text(data[i].ownerDetails[0].accountDetails.length>0?"Ok":"X",34, y-1)//partyname
     doc.text(data[i].ownerDetails[0].pan!==""?'Ok':'X', 43, y-1)//partyname
     doc.text(data[i].ownerDetails[0].drivingLic!==""?'Ok':'X', 53, y-1)//partyname
     doc.text(data[i].ownerDetails[0].regCard!==""?'Ok':'X', 63, y-1)//partyname
     doc.text(data[i].ownerDetails[0].contact.length>0?'Ok':'X', 73, y-1)//partyname
                
       doc.line(0, y +2, 210, y +2);//line after header
       y = y + 10;
     }
        //vertical lines//getting applied for every loop, make it happen once only
        doc.line(7, starty, 7, y-8);//date
        doc.line(33, starty,33, y-8);//truckno
        doc.line(40, starty, 40, y-8);//credit
        doc.line(50, starty, 50, y-8);//credit
        doc.line(60, starty, 60, y-8);//credit
        doc.line(70, starty, 70, y-8);//credit
        doc.line(80, starty, 80, y-8);//credit
        //vertical lines

     doc.save('Available-Data.pdf')
   }

}

