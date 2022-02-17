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
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-turn-book-display-main',
  templateUrl: './turn-book-display-main.component.html',
  styleUrls: ['./turn-book-display-main.component.css'],
  providers: [ApiCallsService]
})
export class TurnBookDisplayMainComponent implements OnInit {
  public isAvailable=false;
  public tp1='tp1';
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
  public tableSelected=false; 
  public sum=0;
  public advanceArray=[];
  public displayoptions = [
    { 'value': '1', 'viewvalue': 'Avaliable Trucks' ,'disabled':false},
    { 'value': '2', 'viewvalue': 'Truck Arrival' ,'disabled':false},
    { 'value': '3', 'viewvalue': 'Truck Dispatched' ,'disabled':false},
    { 'value': '4', 'viewvalue': 'To From' ,'disabled':false},
    { 'value': '5', 'viewvalue': 'Monthly Data' ,'disabled':false},
    { 'value': '6', 'viewvalue': 'Balance Hire' ,'disabled':false},
    { 'value': '7', 'viewvalue': 'Update Poch Check' ,'disabled':false},
    { 'value': '8', 'viewvalue': 'Monthly By Series' ,'disabled':false},
    { 'value': '9', 'viewvalue': 'Cancelled Vehicles' ,'disabled':false},
    { 'value': '10', 'viewvalue': 'By Party' ,'disabled':false},
    { 'value': '11', 'viewvalue': 'Details By Truck' ,'disabled':false},
    { 'value': '12', 'viewvalue': 'Invoice' ,'disabled':false},
    { 'value': '13', 'viewvalue': 'LRNO' ,'disabled':false},
    // { 'value': '14', 'viewvalue': 'Dont Use' ,'disabled':true},//present in turnbooklocation dont use 14 use 15 onwards dont use:LRNO
    // { 'value': '15', 'viewvalue': 'Dont Use','disabled':true},//present in turnbooklocation dont use 14 use 15 onwards dont use:Pending Payment
    // { 'value': '16', 'viewvalue': 'Poch Update Series' ,'disabled':false},
  ]
  public trucknoid11;
  public years = []
  public buttons = []
  public balanceHireArrray = [];
  public tempArray = [];
  public finalObject = {};
  public finalArray = [];
  public tempObj = {};
  public saveToCheckArrayBoolean = true;
  public finalCheckDone = true;
  public pageno;
  public gAD;
  public trucks=[];
  public ids = [];
  public partyTypes=[];
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
  public byInvoice;
  public bylrno;
  public turn11;
  public oids=[];
  public showprdfP=false;
  public truckSelected=false;
  public amountShow;
  public tempDate;
  public comment='';
  public buttonOptionPartyType;
public types={'None':0,'Open':0,'Container':0}
public Locationtypes={'None':0,'Shivapur':0,'Dhaba':0}
public monthlybyseriesData={'place':'','typeOfLoad':'','party':'','lrno':'','hamt':''}
public monthlybyseriesDataU={'place':'','party':'','pochAmount':0}
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService, public formBuilder: FormBuilder,) {
  }

  ngOnInit() {
    this.considerArray = this.handleData.createConsiderArray('turnbookadd')
    this.handleData.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.buttons=this.getButtons()
    this.role = this.securityCheck.role;
    this.commonArray = this.securityCheck.commonArray;
    this.todaysDate = this.handleF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    this.turnbooklist = [];
    this.turnbooklist = this.handleData.giveTurn(); 
 
    this.tableSelected=this.turnbooklist.length>0?true:false;
    this.getTrucks()
  }

  getInformationData() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];
        this.securityCheck.commonArray['qr'] = Object.keys(res.qr[0]).length > 0 ? res.qr : this.securityCheck.commonArray['qr'];
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
    this.tableSelected=false;
  }

  showDatabyidTurn = function (data) {
    this.show = true;
    this.found = data;
    this.handleData.saveData(data);
    this.router.navigate(['Navigation/OWNER_HANDLER/OwnerUpdate']);
  };

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
        tempObj['partyType']=this.buttonOptionPartyType;
        break;
      case '7':
        tempObj['date'] = data;
        break;
      case '8':
        tempObj['date'] = this.selectedmy;
        tempObj['partyType']=this.buttonOptionPartyType;
        break;
        case '16':
        tempObj['date'] = this.selectedmy;
        tempObj['partyType']=this.buttonOptionPartyType;
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
          tempObj['truckno'] = this.truckVar;
        }
        case '12':
          tempObj['invoice']=this.byInvoice;
        break;
        case '13':
          tempObj['lrno']=this.bylrno;
        break;
      default:
        break;
    }
    if (this.buttonOption !== '8') {
      this.showbuttonOption8 = false;
    }
    if (this.buttonOption !== '16') {
      this.showbuttonOption8 = false;
    }


    tempObj['tablename'] = 'turnbook'
    tempObj['method'] = 'displayTB'
    tempObj['display'] = this.buttonOption;

if(this.buttonOption !== '11'){

    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 1)
      .subscribe((res: any) => {
        if(this.buttonOption!=='8'&&this.buttonOption!=='16'){
        this.types={'None':0,'Open':0,'Container':0}
        this.Locationtypes={'None':0,'Shivapur':0,'Dhaba':0}
        res.Data.forEach(r=>{
          this.types[r.ownerDetails[0].typeOfVehicle]=this.types[r.ownerDetails[0].typeOfVehicle]+1;
          this.Locationtypes[r.waitLocation]=this.Locationtypes[r.waitLocation]+1;
          r['typeOfVehiclefirst']=r.ownerDetails[0].typeOfVehicle.slice(0,1)
          });
        }
        if (this.buttonOption == '6') {
          this.turnbooklist = res.Data;
          this.handleData.saveBH(this.turnbooklist);
          this.tableSelected=true;
        }
        else if (this.buttonOption == '7') {
          this.pochDiv = false;
          this.turnbooklist = res.Data;
          this.handleData.saveBH(this.turnbooklist);
          this.tableSelected=true;
        }
        else if (this.buttonOption == '8') {
          if (res.Data.length > 0) {
            this.showbuttonOption8 = true;
            this.turnbooklistnew = res.Data;
            this.myFormGroup = this.formBuilder.group({
              loadingDateDynamic: '',
              typeOfLoad:'',
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
        else if (this.buttonOption == '16') {
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
              pochAmount:''
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
          this.tableSelected=true;
        }
      });
      
    }
    else if(this.buttonOption==='11'){
let tempObj1={};
    tempObj1['tablename'] = 'turnbook'
    tempObj1['method'] = 'singleTruck'
    tempObj1['display'] = this.buttonOption;
    tempObj1['truckno'] = this.truckVar;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, 1)
      .subscribe((res: any) => {
        this.byTruckName=true;
        this.turnbooklist = res.Data;
        this.unique11turnbooklist= res.Data.map(r=>r.truckName.truckno).filter(function(item, pos) {return res.Data.map(r=>r.truckName.truckno).indexOf(item) == pos;})
        this.tableSelected=true;
      });
      
    }

  };

  find11UniqueTruck(){
    if(this.trucknoid11!=='Default'){
    this.turn11=this.turnbooklist.filter(r=>{return r.truckName.truckno==this.trucknoid11});
    this.showprdfP=true;
    }
  }

  getOtherDetails() {
    this.showbuttonOption82 = true;
    this.turnbooklist_trucks = this.turnbooklistnew.filter(r => r.loadingDate == this.myFormGroup.value.loadingDateDynamic)
  }
  getOtherDetails2() {
    this.tempDate = this.turnbooklist_trucks.filter(r => r.truckno == this.myFormGroup.value.truckno);
    
    this.monthlybyseriesData['hamt']=this.tempDate[0].hamt;
    this.monthlybyseriesData['typeOfLoad']=this.tempDate[0].typeOfLoad;
    this.monthlybyseriesData['lrno']=this.tempDate[0].lrno;
    this.monthlybyseriesData['party']=this.tempDate[0].party['name'];
    this.monthlybyseriesData['place']=this.tempDate[0].place['village_name'];

this.placeid=this.tempDate[0]['place']['_id']
this.partyid=this.tempDate[0]['party']['_id']

    this.toSendid = this.tempDate[0]._id;
    this.showbuttonOption821 = true;
    this.myFormGroup.patchValue({ turnbookDate: this.tempDate[0]['turnbookDate'] })
    this.myFormGroup.patchValue({ place: this.tempDate[0][''] })
    this.myFormGroup.patchValue({ partyName: this.tempDate[0][''] })
    this.myFormGroup.patchValue({ lrno: this.tempDate[0]['lrno'] })
    this.myFormGroup.patchValue({ hamt: this.tempDate[0]['hamt'] })
  }


  getOtherDetailsU() {
    this.showbuttonOption82 = true;
    this.turnbooklist_trucks = this.turnbooklistnew.filter(r => r.loadingDate == this.myFormGroup.value.loadingDateDynamic)
  }
  getOtherDetails2U() {
    this.tempDate = this.turnbooklist_trucks.filter(r => r.truckno == this.myFormGroup.value.truckno);
    this.monthlybyseriesDataU['party']='United Cargo';
    this.monthlybyseriesDataU['place']=this.tempDate[0].place['village_name'];

this.placeid=this.tempDate[0]['place']['_id']

    this.toSendid = this.tempDate[0]._id;
    this.showbuttonOption821 = true;
    this.myFormGroup.patchValue({ turnbookDate: this.tempDate[0]['turnbookDate'] })
    this.myFormGroup.patchValue({ place: this.tempDate[0][''] })
  }


  setPlaceName() {
    let filteredList=this.villagelist.filter(r=>{return r.village_name==this.myFormGroup.value.place})
    this.placeid= filteredList[0]['_id']
    this.tempVNAME = filteredList[0]['village_name']
    this.myFormGroup.value.place = this.tempVNAME

  }

  setPartyName() {
    let filteredList=this.parties.filter(r=>{return r.name==this.myFormGroup.value.partyName})
    this.partyid=filteredList[0]['_id']
    this.tempPNAME=filteredList[0]['name']
    this.myFormGroup.value.partyName = this.tempPNAME;
  }


  change(data) {
    let tempData = {}
    tempData['placeid'] = this.placeid;
    tempData['partyid'] = this.partyid;
    tempData['lrno'] = data.value.lrno===0?this.tempDate[0]['lrno']:data.value.lrno;
    tempData['hamt'] = data.value.hamt===0?this.tempDate[0]['hamt']:data.value.hamt;
    tempData['typeOfLoad'] = data.value.typeOfLoad===''?this.tempDate[0]['typeOfLoad']:data.value.typeOfLoad;
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
  changeU(data) {
    let tempData = {}
    tempData['pochAmount'] = data.value.pochAmount===0?this.tempDate[0]['pochAmount']:data.value.pochAmount;
    tempData['_id'] = this.toSendid;
    tempData['tablename'] = 'turnbook'
    tempData['method'] = 'update'
    tempData['part'] = 5;
    
    this.apiCallservice.handleData_New_python('turnbook1', 1, tempData, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        let newData = this.turnbooklistnew.filter(r => r._id !== this.toSendid);
        this.handleData.saveTurn([]);
        this.handleData.saveTurn(newData);
        this.turnbooklistnew = newData;
        this.myFormGroup.patchValue({ pochAmount: '' })
        this.showbuttonOption82 = false;
        this.showbuttonOption821 = false;
      });
  }

  uncheckPoch(data, j) {
    let tempObj = {};
    tempObj['method'] = 'updatePoch';
    tempObj['tablename'] = 'turnbook';
    tempObj['_id'] = data['_id'];
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert('Moved to Balance Hire!')
        this.turnbooklist.splice(j, 1);
      });
  }

  showDatabyid = function (data, j, number) {
    this.show = true;
    let tempObj = {};
    tempObj['place'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0].village_name;
    tempObj['place2'] = data.villageDetails2[0] === undefined ? '' : data.villageDetails2[0].village_name;
    tempObj['truckno'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0].truckno;
    tempObj['partyName'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0].name;
    tempObj['ownerid'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0]._id;
    tempObj['accountDetails'] = data.ownerDetails[0]['accountDetails'];
    tempObj['parentAccNo'] = data.parentAccNo;
    tempObj['placeid'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0]._id;
    tempObj['placeid2'] = data.villageDetails2[0] === undefined ? '' : data.villageDetails2[0]._id;
    tempObj['partyid'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0]._id;
    tempObj['entryDate'] = data.entryDate;
    tempObj['_id'] = data._id;
    tempObj['partyType'] = data.partyType;
    tempObj['turnbookDate'] = data.turnbookDate;
    tempObj['loadingDate'] = data.loadingDate;
    tempObj['lrno'] = data.lrno === undefined ? '' : data.lrno;
    tempObj['hamt'] = data.hamt === undefined ? 0 : data.hamt;
    tempObj['ohamt'] = data.ohamt === undefined ? 0 : data.ohamt;
    tempObj['pochDate'] = data.pochDate === undefined ? '' : data.pochDate;
    tempObj['givenDate'] = data.givenDate === undefined ? '' : data.givenDate;
    tempObj['pochPayment'] = data.pochPayment === undefined ? '' : data.pochPayment;
    tempObj['pgno'] = data.pgno === undefined ? '' : data.pgno;
    tempObj['payment'] = data.paymentDetails;
    tempObj['index'] = j;
    tempObj['number'] = number;
    tempObj['invoice'] = data.invoice;
    tempObj['locations'] = data.locations;
    tempObj['locationDate'] = data.locationDate;
    tempObj['complete'] = data.complete;
    tempObj['typeOfLoad'] = data.typeOfLoad;
    tempObj['waitLocation'] = data.waitLocation;
    tempObj['advanceArray'] = data.advanceArray;
    tempObj['qr'] = data.qr;
    tempObj['paymentDisabled']=true;
    tempObj['pochAmount']=data.pochAmount;
    this.handleData.saveupdateTurn(true);


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
      tempObj['placeid2'] = '';
      tempObj['partyid'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0]._id;
      tempObj['_id'] = data._id;
      tempObj['loadingDate'] = newdate;

      tempObj['locations'] = data.locations;
      tempObj['locationDate'] = data.locationDate;
      tempObj['method'] = 'update';
      tempObj['tablename'] = 'turnbook';
      tempObj["turnbookDate"] = data.turnbookDate,
        tempObj["entryDate"] = data.entryDate,
        tempObj["lrno"] = 0;
        tempObj["invoice"] = '';
      tempObj["partyType"] = newtype;
      tempObj["hamt"] = 0;
      tempObj["ohamt"] = data.ohamt;
      tempObj["pochDate"] = '2099-12-12';
      tempObj["givenDate"] = '2099-12-12';
      tempObj["pochPayment"] = false;
      tempObj["pgno"] = 997;
      tempObj['index'] = j;
      tempObj['qr'] = 0;
      tempObj['qrid'] = '61c082b87dcfd6ecb7f02b90';
      tempObj['advanceArray'] = data.advanceArray;
      tempObj['number'] = 2;
      tempObj['typeOfLoad'] = '';
      tempObj['complete'] = false;
      tempObj['pochAmount'] = 0;
      tempObj['paymentid'] = data.paymentDetails[0]._id;
      this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 0)
        .subscribe((res: any) => {
          alert(res.Status);
          this.handleData.turnData[j]['ownerid'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0]._id;;
          this.handleData.turnData[j]['placeid'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0]._id;
          this.handleData.turnData[j]['placeid2'] = '';
          this.handleData.turnData[j]['partyid'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0]._id;
          this.handleData.turnData[j]['loadingDate'] = newdate;
          this.handleData.turnData[j]["turnbookDate"] = data.turnbookDate,
            this.handleData.turnData[j]["entryDate"] = data.entryDate,
            this.handleData.turnData[j]["lrno"] = '';
          this.handleData.turnData[j]["partyType"] = newtype;
          this.handleData.turnData[j]["hamt"] = '';
          this.handleData.turnData[j]["pochDate"] = '';
          this.handleData.turnData[j]["pochPayment"] = '';
          this.handleData.turnData[j]["pgno"] = '';
          this.handleData.turnData[j]['index'] = j;
          this.handleData.turnData[j]["locations"] = '';
          this.handleData.turnData[j]["complete"] = false;
          this.handleData.turnData[j]['locationDate'] = j;
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
          alert(response['Status'])
          this.turnbooklist.splice(j, 1);
        });
    }
  }

  edit(data) {
    this.show = true;
    data['index'] = 0;
    this.handleData.saveData(data);
    this.router.navigate(['Navigation/OWNER_HANDLER/OwnerUpdate']);
  }

  toPay(i,j,c){
    if(confirm('Is it To Pay Vehicle?')){
    this.turnbooklist[j]['checker'] = c;
    if (c == 1) {
      this.tempArray.push(i);
    } else if (c == 0) {
      this.tempArray.splice(j, 1);
    }
    this.balanceHireArrray.push(this.tempArray);
    this.turnbooklist = this.reduceArray();
    for (let i = 0; i < this.balanceHireArrray.length; i++) {
      let truckData = []
      for (let j = 0; j < this.balanceHireArrray[i].length; j++) {
        let tempObj = {};
          this.ids.push(this.balanceHireArrray[i][j]['_id']);
          this.partyTypes.push(this.balanceHireArrray[i][j]['partyType']);
          this.oids.push(this.balanceHireArrray[i][j]['ownerDetails'][0]['_id']);
          tempObj['date'] = this.balanceHireArrray[i][j].loadingDate;
          tempObj['truckno'] = this.balanceHireArrray[i][j].ownerDetails[0].truckno;
          tempObj['pageno'] = 990;
          tempObj['amount'] = 0;
          truckData.push(tempObj);
      }
      this.finalObject['truckData'] = truckData
      this.finalObject['todayDate'] = this.todaysDate;
      this.finalObject['comments'] = "";
      this.finalObject['print'] = false;
      this.finalObject['bankName'] = '';
      this.finalObject['ifsc'] = '';
      this.finalObject['accountNumber'] = '';
      this.finalObject['accountName'] = '';
      this.finalObject['commentToTruck'] = 'To Pay'
      this.finalArray.push(this.finalObject);
      this.finalObject = {};
    }
    this.finalFunction('dont');
  }
  }

  addToCheckArray(i, j, c) {
    i['balance']=this.balance(i);
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
  }

  saveToCheckArray() {
    this.balanceHireArrray.push(this.tempArray);
    this.tempArray = []
    this.turnbooklist = this.reduceArray();
  }

  balance(i) {
    return i.hamt -this.getAdvances(i)
  }

  getAdvances(i){
    this.sum=0;
    i.advanceArray.forEach(r=>{
      if(r.consider){
      this.sum = r.advanceAmt + this.sum
      }
    })
    return this.sum===(NaN||undefined)?0:this.sum;
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
  moveToFinalStepReset(action) {
    action==='do'?this.saveToCheckArrayBoolean = !this.saveToCheckArrayBoolean:null;
    this.balanceHireArrray = [];
    this.tempArray = [];
    this.finalObject = {};
    this.finalArray = [];
    this.ids=[];
    this.partyTypes=[];
    this.oids=[];
    this.comment='';
    this.find()
  }

  comments(){
    this.comment = prompt('Enter Comment'); 
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
          this.partyTypes.push(this.balanceHireArrray[i][j]['partyType']);
          this.oids.push(this.balanceHireArrray[i][j]['ownerDetails'][0]['_id']);//ObjectId to mongoform in lambda write a loop
          tempObj['date'] = this.balanceHireArrray[i][j].loadingDate;
          tempObj['truckno'] = this.balanceHireArrray[i][j].ownerDetails[0].truckno;
          tempObj['shortDetails']=this.balanceHireArrray[i][j].partyType+'-'+this.balanceHireArrray[i][j].partyDetails[0].shortName+'-'+this.balanceHireArrray[i][j].villageDetails[0].shortName;
          tempObj['pageno'] = parseInt((<HTMLInputElement>document.getElementById('pageno_' + i + '_' + j)).value);
          tempObj['amount'] = parseInt((<HTMLInputElement>document.getElementById('balance_' + i + '_' + j)).value);
          tempObj['partyType'] = this.balanceHireArrray[i][j].partyType;
          truckData.push(tempObj);
        }

      }
      if (breaker) { break; }
      let commentToTruck=''
      this.finalObject['truckData'] = truckData
      this.finalObject['todayDate'] = this.todaysDate;
      this.finalObject['comments'] = "";
      commentToTruck= String(this.balanceHireArrray[0][0].parentAccNo);
     this.finalObject['commentToTruck']=this.comment===''?commentToTruck:commentToTruck+'\n'+this.comment;
      this.finalObject['print'] = false;
      this.finalObject['bankName'] = '';
      this.finalObject['ifsc'] = '';
      this.finalObject['accountNumber'] = '';
      this.finalObject['accountName'] = '';
      this.finalArray.push(this.finalObject);
      this.finalObject = {};
    }
    this.finalFunction('do');
  }

  finalFunction(action) {
    let tempObj = {}
    tempObj['bhData'] = this.finalArray;
    tempObj['method'] = 'insertmany.many';
    tempObj['tablename'] = 'BalanceHire';
    tempObj['ids'] = this.ids;
    tempObj['oids'] = this.oids;
    tempObj['partyTypes'] = this.partyTypes;
    tempObj['todayDate'] = this.todaysDate;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        this.moveToFinalStepReset(action);
      });
  }

  getTrucks() {
    this.trucklist = this.commonArray.ownerdetails;
  }



  downloadAvailableData(){//threshhold is 295
 
 
    let data=this.turnbooklist;
    let pager=1;
     let bigValueofY=0;
     var doc = new jsPDF()
     doc.setFontSize('25');
     doc.line(0, 148.2, 5, 148.2);//punching line helper
     doc.setFontType('bold');
     doc.text(data[0]['partyDetails'][0]['name'], 15, 15)//partyname
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
     doc.text('Date', 34, y)//partyname
     doc.text('Destination', 56, y)//partyname
     doc.text('Notes', 105, y)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(7, 20, 7, 25);//srno
     doc.line(33, 20, 33, 25);//truck
     doc.line(55, 20, 55, 25);//date
     doc.line(81, 20, 81, 25);//village
     //vertical lines
     let startforI=0;
     y = y + 6;
     startforI=0;
     for (let i = startforI; i < data.length; i++) {
 
       if(y>290){
        
         y=30;
     starty = 25;
     doc.line(7, starty, 7, 292);//date
        doc.line(33, starty,33, 292);//truckno
        doc.line(55, starty, 55, 292);//credit
        doc.line(81, starty, 81, 292);//village
         doc.addPage();
         doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text(data[0]['partyDetails'][0]['name'], 15, 15)//partyname
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
     doc.text('Date', 34, y-6)//partyname
     doc.text('Destination', 56, y-6)//partyname
     doc.text('Notes', 105, y-6)//partyname
     //headers
     //vertical lines
     doc.line(7, 20, 7, 25);//srno
     doc.line(33, 20, 33, 25);//truck
     doc.line(55, 20, 55, 25);//date
     doc.line(81, 20, 81, 25);//village
     //vertical lines
     doc.line(0, 25, 210, 25);//line after header
     }
     
    doc.text(this.handleF.generate2DigitNumber(String(i+1)), 2, y-1)//partyname
    doc.text(data[i].ownerDetails[0].truckno.split(' ')[0]+''+data[i].ownerDetails[0].truckno.split(' ')[1]+''+data[i].ownerDetails[0].truckno.split(' ')[2], 8, y-1)//partyname
    doc.text(this.handleF.getDateddmmyy(data[i].loadingDate), 34, y-1)//Date              
    doc.text(data[i].villageDetails[0]['village_name'], 56, y-1)//Destination
    doc.line(0, y +2, 210, y +2);//line after header
       y = y + 10;
       
     }
        //vertical lines//getting applied for every loop, make it happen once only
        doc.line(7, starty, 7, y-8);//date
        doc.line(33, starty,33, y-8);//truckno
        doc.line(55, starty, 55, y-8);//credit
        doc.line(81, starty, 81, y-8);//village
        //vertical lines

    //  doc.save('Available-Data.pdf')
     doc.save(data[0]['partyDetails'][0]['name']+'.pdf')//partyname
   }

   downloadDeepData(){
    let tempObj1={};
    tempObj1['tablename'] = 'turnbook'
    tempObj1['method'] = 'deepDetails'
    tempObj1['ownerid'] = this.truckid['_id'];
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, 1)
    .subscribe((res: any) => {
    //  this.downloadDeepData2(res)
    });
  }
 downloadAvailable(){//threshhold is 295
  let data=this.turnbooklist;

    let pager=1;
     var doc = new jsPDF()
     doc.setFontSize('25');
     doc.line(0, 148.2, 5, 148.2);//punching line helper
     doc.setFontType('bold');
     doc.text('Available Trucks : '+this.todaysDate, 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     //headers
     doc.setFontSize('10');
     let y = 24;
     let starty = 24;
     doc.text('Sr', 2, y)//partyname
     doc.text('TruckNo', 8, y)//partyname
     doc.text('Personal Details', 36, y)//partyname
     doc.text('Account Details', 99, y)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(7, 20, 7, 25);//srno
     doc.line(33, 20, 33, 25);//date
     doc.line(97, 20, 97, 25);//date
     //vertical lines
     let startforI=0;
     y = y + 6;
     startforI=0;
     for (let i = startforI; i < data.length; i++) {
 
       if(y>276){
        doc.line(7, starty, 7, y-4);//srno
        doc.line(33, starty, 33, y-4);//date 
        doc.line(97, starty, 97, y-4);//date
         y=24;
         y=y+6;
     starty = 24;
         doc.addPage();
         doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Available Trucks : '+this.todaysDate, 15, 15)//partyname
     doc.setFontSize('10');
    //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 2, y-6)//partyname
     doc.text('TruckNo', 8, y-6)//partyname
     doc.text('Personal Details', 36, y-6)//partyname
     doc.text('Account Details', 99, y-6)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(7, 20, 7, 25);//srno
     doc.line(33, 20, 33, 25);//date
     doc.line(97, 20, 97, 25);//date
     //vertical lines
     }
     doc.text(this.handleF.generate2DigitNumber(String(i+1)), 2, y-1)//partyname
      doc.text(data[i].ownerDetails[0].truckno.split(' ')[0]+''+data[i].ownerDetails[0].truckno.split(' ')[1]+''+data[i].ownerDetails[0].truckno.split(' ')[2], 8, y-1)//partyname
      doc.text(data[i]['ownerDetails'][0]['pan']===""?'Name : ':'Name : '+data[i]['ownerDetails'][0]['oname'], 34, y)//Name
      doc.text(data[i]['ownerDetails'][0]['pan']===""?'Pan : ':'Pan : '+data[i]['ownerDetails'][0]['pan'], 34, y+5)//Pan
      doc.text(data[i]['ownerDetails'][0]['contact'][0]===undefined?'Contact : ':'Contact : '+data[i]['ownerDetails'][0]['contact'][0], 34, y+10)//Contact
      doc.text(data[i]['ownerDetails'][0]['accountDetails'].length<1?'Name : ':'Name : '+data[i]['ownerDetails'][0]['accountDetails'][0]['accountName'], 99, y)//Name
      doc.text(data[i]['ownerDetails'][0]['accountDetails'].length<1?'No : ':'No : '+data[i]['ownerDetails'][0]['accountDetails'][0]['accountNumber'], 99, y+5)//Pan
      doc.text(data[i]['ownerDetails'][0]['accountDetails'].length<1?'IFSC : ':'IFSC : '+data[i]['ownerDetails'][0]['accountDetails'][0]['ifsc'], 99, y+10)//Contact

                
       doc.line(0, y + 11, 210, y + 11);//line after header
       y = y + 15;
 
     
     
     }
//vertical lines//getting applied for every loop, make it happen once only
doc.line(7, starty, 7, y-4);//srno
        doc.line(33, starty, 33, y-4);//date 
        doc.line(97, starty, 97, y-4);//date
//vertical lines
     doc.save('Available-Details.pdf')
   }

}

