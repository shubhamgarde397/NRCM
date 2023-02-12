import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-balance-hire-add',
  templateUrl: './balance-hire-add.component.html',
  styleUrls: ['./balance-hire-add.component.css']
})
export class BalanceHireAddComponent implements OnInit {
  public saveToCheckArrayBoolean = true;
  public turnbooklist;
public tempArray=[];
public balanceHireArrray=[];
public todaysDate;
public date=new Date();
public sum=0;
public finalCheckDone = true;
public comment='';
public bhTrucks=[];
public uitodayDate=''
public tableSelected=false;
public nextStepButton=false;
public dues=[];

  constructor(public handleF:handleFunction,public apiCallservice:ApiCallsService,public handleData:HandleDataService,public router:Router,public spinnerService:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.todaysDate = this.handleF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    this.find();
  }
  reducebhTrucks(data){
    let rkeys=[
    'advanceArray', 
    'locations', 
    'locationDate', 
    'complete', 
    'completeDate', 
    'typeOfLoad', 
    'turnbookDate', 
    'entryDate', 
    'lrno', 
    'hamt', 
    'pochDate', 
    'pochPayment', 
    'checker', 
    'villageDetails2', 
    'paymentDetails', 
    'truckname', 
    'invoice', 
    'typeOfVehiclefirst', 
    'Pf', 
    'rf', 
    'df', 
    'C', 
    'A', 
    'P', 
    'balance', 
    'truckName','transports']
    for(let i=0;i<data.length;i++){
      for(let j=0;j<rkeys.length;j++){delete data[i][rkeys[j]]}
        delete data[i]['ownerDetails']
        delete data[i]['villageDetails']
        delete data[i]['partyDetails']
        delete data[i]['loadingDate']
  }
  return data;
  }

  todayDateSetter(){
    this.tableSelected=true;
  }

  edit(data) {
    data['index'] = 0;
    data['updateNumber']=true
    this.handleData.saveData(data);
    this.router.navigate(['Navigation/OWNER_HANDLER/OwnerUpdate']);
  }

  find = function () {
    this.spinnerService.show();
    let tempObj = {};
    tempObj['tablename'] = 'turnbook'
    tempObj['method'] = 'displayTB2'
    tempObj['display'] = '6';
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, true)
      .subscribe((res: any) => {
        this.bhTrucks=[];
          this.turnbooklist = res.Data;
          this.dues = res.Data2;
          this.handleData.saveBH(this.turnbooklist);
          this.spinnerService.hide();
      });
  };

  fetchBasic(){
    let temp={"method": "DuesDisplay","tablename": ""}
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, temp, true)
      .subscribe((res: any) => {
        this.dues=res.Data
      });
  }

  toPay(i,j,c){
    if(confirm('Is it To Pay Vehicle?')){
    this.turnbooklist[j]['checker'] = c;
    i['amount']=0;
    i['pgno']=990;
    this.bhTrucks.push(i);
    if (c == 1) {
      this.tempArray.push(i);
    } else if (c == 0) {
      this.tempArray.splice(j, 1);
    }
    this.balanceHireArrray.push(this.tempArray);
    this.turnbooklist = this.reduceArray();
    this.finalFunction('dont');
  }
  }
  
  finalFunction(action) {
    let tempObj = {}
    tempObj['method'] = 'BHInsert';
    tempObj['tablename'] = 'BalanceHire';
    tempObj['bhTrucks']=this.bhTrucks;
    tempObj['todayDate'] = this.uitodayDate;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true,this.uitodayDate)
      .subscribe((res: any) => {
        alert(res.Status);
        this.moveToFinalStepReset(action);
      });
  }

  addToCheckArray(i, j, c) {
    this.nextStepButton=true;
    i['balance']=this.balance(i);
    if (i['loadingDate'] == "") {
      alert('Loading Date cant be empty.')
    }
    else {
      this.turnbooklist[j]['checker'] = c;
      if (c == 1) {
        this.tempArray.push(i);
        this.bhTrucks.push(i);
      } else if (c == 0) {
        this.tempArray.splice(j, 1);
      }
    }
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
    this.comment='';
    this.bhTrucks=[];
    action==='dont'?null:this.router.navigate(['Navigation/BALANCE_HIRE_HANDLER/BalanceHireDisp']);
  }

  comments(){
    this.comment = prompt('Enter Comment'); 
  }
  setBalPage() {
    let breaker = false;
    
    for (let i = 0; i < this.balanceHireArrray.length; i++) {
      if (breaker) { break; }
      for (let j = 0; j < this.balanceHireArrray[i].length; j++) {
        if (breaker) { break; }
        if (((<HTMLInputElement>document.getElementById('balance_' + i + '_' + j)).value.length == 0) || ((<HTMLInputElement>document.getElementById('pageno_' + i + '_' + j)).value.length == 0)) {
          alert('Please fill in all the fields.');
          breaker = true;
          break;
        }
        else {
          if (breaker) { break; }

          this.bhTrucks.find((r,index)=>{
            if(r._id==this.balanceHireArrray[i][j]['_id']){
              this.bhTrucks[index]['pgno']=parseInt((<HTMLInputElement>document.getElementById('pageno_' + i + '_' + j)).value)
              this.bhTrucks[index]['amount']=parseInt((<HTMLInputElement>document.getElementById('balance_' + i + '_' + j)).value)
              return true
            }
          })
         }

      }
      if (breaker) { break; }
      let commentToTruck=''
      commentToTruck= String(this.balanceHireArrray[0][0].parentAccNo);
    }
    this.finalFunction('do');
  }

}
