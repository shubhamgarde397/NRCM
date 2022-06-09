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
    { 'value': '2', 'viewvalue': 'Cancelled Vehicles' ,'disabled':false},
    { 'value': '3', 'viewvalue': 'Dont Know' ,'disabled':false},
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
      case 2:
        this.doFunction(this.publicI,this.publicJ,'load');
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
    tempObj['method'] = 'displayTodayAvailable_'+this.buttonOption;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {

        this.types={'None':0,'Open':0,'Container':0}

        res.Data.forEach(r=>{
          this.types[r.trucks.typeOfVehicle]=this.types[r.trucks.typeOfVehicle]+1;
          });

          this.turnbooklist = res.Data;
          this.isAvailable=true;
          this.tableSelected=true;
       
      });
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
