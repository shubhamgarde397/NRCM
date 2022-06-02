import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-turn-book-display',
  templateUrl: './turn-book-display.component.html',
  styleUrls: ['./turn-book-display.component.css'],
  providers: [ApiCallsService]
})
export class TurnBookDisplayComponent implements OnInit {
  // displayTodayAvailable
 
  public data: any;
  public show = false;
  public tabledata: false;
  public today;
  public todaysDate;
  public name: string;
 
  public date = new Date();
  public turnbooklist: any;
  public dateFromUI;
  public buttonValue: any = 'Avaliable Trucks';
  public buttonOption = '1';
  public trucknoid;
 
  public role = 6;
  public dataTruck;
  public adminAccess = false;
  
  public turnbooklistnew = [];
  public tableSelected=false; 
 
  public displayoptions = [
    { 'value': '1', 'viewvalue': 'Avaliable Trucks' ,'disabled':false},
    { 'value': '2', 'viewvalue': 'Truck Arrival' ,'disabled':false},
    { 'value': '3', 'viewvalue': 'Truck Dispatched' ,'disabled':false},
    { 'value': '4', 'viewvalue': 'Cancelled Vehicles' ,'disabled':false},
  ]
 
  public years = []
  public buttons = []
  public balanceHireArrray = [];
  public publicI;
  public publicJ;
  public turnbooklist_trucks = [];
  public myFormGroup: FormGroup;
 
public types={'None':0,'Open':0,'Container':0}
public whatActionGotSelected='2';
public performActionButton='2';
public selectDate=false;
public details=false;
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService, public formBuilder: FormBuilder,) {
  }

  ngOnInit() {

       this.role = this.securityCheck.role;
   
    this.todaysDate = this.handleF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    this.turnbooklist = [];
    this.turnbooklist = this.handleData.giveTurn(); 

  }

  changeDetails(){
    this.details=!this.details;
  }

  setButtonValues(i,j){
    this.publicI=i;
    this.publicJ=j;
  }

  performAction(index){
    switch (index) {
      case 0:
        this.doFunction(this.publicI,this.publicJ,'delete');
      break;
      case 1:
        this.doFunction(this.publicI,this.publicJ,'cancel');
      break;
      case 2:
        this.doFunction(this.publicI,this.publicJ,'load');
      break;
      case 3:
        this.doFunction(this.publicI,this.publicJ,'okay');
      break;
  }
  }
  doFunction(i,j,data){
    let tempObj = {};

    tempObj['tablename'] = ''
    tempObj['method'] ='tb_'+data
    tempObj['_id']=i;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        this.turnbooklist.splice(j,1)
      });
  }

  findOption() {
    this.buttonOption = this.trucknoid;
    this.buttonValue = this.displayoptions[parseInt(this.trucknoid) - 1].viewvalue;
    this.tableSelected=false;
  }



  find = function (data = null) {//only for data from 1st april 2021 and loading data is empty
    let tempObj = {};

    tempObj['tablename'] = ''
    tempObj['method'] = 'displayTodayAvailable'

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {

        this.types={'None':0,'Open':0,'Container':0}

        res.Data.forEach(r=>{
          this.types[r.trucks.typeOfVehicle]=this.types[r.trucks.typeOfVehicle]+1;
          });

          this.turnbooklist = res.Data;
          console.log(this.turnbooklist);
          this.isAvailable=true;
          this.tableSelected=true;
       
      });
  };


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


}
