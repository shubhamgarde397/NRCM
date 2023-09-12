import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-balance-hire-add',
  templateUrl: './balance-hire-add.component.html',
  styleUrls: ['./balance-hire-add.component.css']
})
export class BalanceHireAddComponentA implements OnInit {
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
public firstTime=true;
public back=false;
public forceBackButton=false;
public nrcmid;
  constructor(
    public securityCheck: SecurityCheckService,public handleF:handleFunction,public apiCallservice:ApiCallsService,public handleData:HandleDataService,public router:Router,public spinnerService:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.uitodayDate = this.handleF.getDate(this.handleF.generate2DigitNumber(this.date.getDate()), (this.date.getMonth() + 1), this.date.getFullYear());
    this.todaysDate = this.handleF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    this.nrcmid=this.securityCheck.nrcmid;
    console.log(this.securityCheck.nrcmid);
    
    // this.find();
  }

  todayDateSetter(){
    this.tableSelected=true;
  }

  find = function () {
    this.spinnerService.show();
    let tempObj = {};
    tempObj['tablename'] = 'turnbook'
    tempObj['method'] = 'getBalances'
    tempObj['display'] = '6';
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, true)
      .subscribe((res: any) => {
        this.bhTrucks=[];
          this.turnbooklist = res.Data;
          this.tableSelected=true;
          this.spinnerService.hide();
      });

  };

  finalFunction(action) {
    let tempObj = {}
    tempObj['method'] = 'BHInserttoProcessing';
    tempObj['tablename'] = 'BalanceHire';
    tempObj['bhTrucks']=this.reducebhTrucks(this.bhTrucks);
    tempObj['todayDate'] = this.uitodayDate;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true,this.uitodayDate)//check this function
      .subscribe((res: any) => {
        alert(res.Status);
        this.moveToFinalStepReset(action);
      });
  }

  reducebhTrucks(data){
    let rkeys=[
    'advanceArray', 
    'balanceArray',
    'locations',  
    'locationDate', 
    'complete', 
    'completeDate', 
    'typeOfLoad', 
    'turnbookDate', 
    'tentativeBalance',
    'entryDate', 
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
        "place",
    "party",
    "snameparty",
    "truckno",
    'accountNo',
    'rf', 
    'df', 
    'C', 
    'A', 
    'P', 
    'balance', 
    'truckName',
  'transports']
    for(let i=0;i<data.length;i++){
      for(let j=0;j<rkeys.length;j++){delete data[i][rkeys[j]]}
        delete data[i]['ownerDetails']
        delete data[i]['villageDetails']
        delete data[i]['partyDetails']
        delete data[i]['loadingDate']
  }
  return data;
  }

    addToCheckArray(i, j, c) {
      if(i['checker']===0){
      
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
  else{
alert('Selected!')
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
    
    this.balanceHireArrray = [];
    this.tempArray = [];
    this.comment='';
    this.bhTrucks=[];
    this.router.navigate(['Navigation/BALANCE_HIRE_HANDLER/BalanceHireDisp']);
  }

  setBalPage() {
    this.firstTime=false;
    let breaker = false;
    this.saveToCheckArrayBoolean = !this.saveToCheckArrayBoolean;
    this.tableSelected=false;
    for (let i = 0; i < this.balanceHireArrray.length; i++) {
      if (breaker) { break; }
      for (let j = 0; j < this.balanceHireArrray[i].length; j++) {
        if (breaker) { break; }
        if (
          ((<HTMLInputElement>document.getElementById('balance_' + i + '_' + j)).value.length == 0) 
          ||
          ((<HTMLInputElement>document.getElementById('lrno_' + i + '_' + j)).value.length == 0)
          ) {
          alert('Please fill in all the fields.');
          breaker = true;
          break;
        }
        else {
          this.bhTrucks.find((r,index)=>{
            if(r._id==this.balanceHireArrray[i][j]['_id']){
              this.bhTrucks[index]['amount']=parseInt((<HTMLInputElement>document.getElementById('balance_' + i + '_' + j)).value);
              this.bhTrucks[index]['lrno']=(<HTMLInputElement>document.getElementById('lrno_' + i + '_' + j)).value;
              this.bhTrucks[index]['remark']=(<HTMLInputElement>document.getElementById('remark_' + i + '_' + j)).value;
              this.bhTrucks[index]['pageno']=this.securityCheck.nrcmid;
              
              return true
            }
          })
        }

      }
    }
    if (!breaker) { 
    this.finalFunction('do');
    }

  }

  leftRight(LR) {
    let tempArray;
    let date;
    
    switch (LR) {
      case 'back':
        tempArray=this.uitodayDate.split('-');
        date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])-1)
        this.uitodayDate = this.handleF.createDate(date);
        break;
      case 'ahead':
        tempArray=this.uitodayDate.split('-');
        date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])+1)
        this.uitodayDate = this.handleF.createDate(date);
        break;
    }
    if(!this.forceBackButton){
    if(this.todaysDate===this.uitodayDate){
      this.back=false;
    }else{
      this.back=true;
    }
  }
  }

  forceBack(){
    this.forceBackButton=true;
    this.back=true;
  }

}

