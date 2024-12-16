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
  public remarks=[
    {value:'',viewValue:'Okay'},
    {value:'Short',viewValue:'Shortage'},
    {value:'Late',viewValue:'Late'},
    {value:'Dmge',viewValue:'Damage'},
  ]
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
public firstTime=false;
public back=false;
public checkSign=true;
public accountChecker=false;
public forceBackButton=false;
public nrcmid;
public bigI;
public accUpdater={'truckno':''};

public accName;
public accNo;
public ifsc;
public bname
  constructor(
    public securityCheck: SecurityCheckService,public handleF:handleFunction,public apiCallservice:ApiCallsService,public handleData:HandleDataService,public router:Router,public spinnerService:Ng4LoadingSpinnerService) { 
      if(!this.securityCheck.login){
        this.router.navigate([''])
      }
    }

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
          this.turnbooklist.forEach(r=>{
            // if(r.advAccid==-1){
            // }
            // else{
            //   if(r.update){}
            //   else{
            r.accounts=r.accountNo[0]//parseInt(r.advAccid)
            //   }
            // }

          })
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
        this.firstTime=false;
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
    
    let breaker=false;
    for(let i=0;i<this.balanceHireArrray[0].length;i++){
      if(this.balanceHireArrray[0][i]['update']){
        breaker=true;
      }
    }
    if(breaker){
      this.checkSign=false;
      this.accountChecker=true;
    }
    
  }

  accountCheckerF(){
    let breaker=false;
    console.log(this.balanceHireArrray[0])
    for(let i=0;i<this.balanceHireArrray[0].length;i++){
      if(this.balanceHireArrray[0][i]['update']){
        breaker=true;
        break;
      }
    }
    if(!breaker){
      this.checkSign=true;
      this.accountChecker=false;
    }
    else{
      alert('Update all Acounts!')
    }
  }
  moveToFinalStepReset(action) {
    
    this.balanceHireArrray = [];
    this.tempArray = [];
    this.comment='';
    this.bhTrucks=[];
    this.router.navigate(['Navigation/BALANCE_HIRE_HANDLER/BalanceHireDisp']);
  }

  setBalPage() {
    let breaker = false;
    this.saveToCheckArrayBoolean = !this.saveToCheckArrayBoolean;
    this.tableSelected=false;
    for (let i = 0; i < this.balanceHireArrray.length; i++) {
      for (let j = 0; j < this.balanceHireArrray[i].length; j++) {
          this.bhTrucks.find((r,index)=>{
            if(r._id==this.balanceHireArrray[i][j]['_id']){
              this.bhTrucks[index]['pochAmount']=parseInt((<HTMLInputElement>document.getElementById('balance_' + i + '_' + j)).value);
              this.bhTrucks[index]['return_hamali']=parseInt((<HTMLInputElement>document.getElementById('hamali_' + i + '_' + j)).value);
              this.bhTrucks[index]['lrno']=(<HTMLInputElement>document.getElementById('lrno_' + i + '_' + j)).value;
              this.bhTrucks[index]['remark']=(<HTMLInputElement>document.getElementById('remark_' + i + '_' + j)).value;
              this.bhTrucks[index]['balAccid']=parseInt((<HTMLInputElement>document.getElementById('name_' + j)).value);
              this.bhTrucks[index]['pageno']=this.securityCheck.nrcmid;  
              return true
            }
          })

      }
    }
    if (!breaker) { 
    this.finalFunction('do');
    }

  }

  addhamali(i,j){
    let bal=parseInt((<HTMLInputElement>document.getElementById('balance_' + i + '_' + j)).value);
    let ham=parseInt((<HTMLInputElement>document.getElementById('hamali_' + i + '_' + j)).value);
    (<HTMLInputElement>document.getElementById('total_' + i + '_' + j)).value=String(bal+ham);
  }

  storeAcc(){
    this.bigI;
    if(
      (this.accName==='') 
      ||
      (this.accNo==='') 
      ||
      (this.ifsc==='') 
      ||
      (this.bname==='') 
      ){
      alert('Fields Cannot be empty')
    }
    
    else{
    let tempObj={
      'ownerid':this.bhTrucks[this.bigI]['ownerid'],
      'name':this.accName,
      'no':this.accNo,
      'ifsc':this.ifsc,
      'bname':this.bname,
      'tablename':'',
      'method':'updateSimpleAccNo'
    }

    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
      this.bhTrucks[this.bigI]['balAccid']=0
      let temp=[
        {
          "accountName": tempObj.name,
          "accountNumber":tempObj.no,
          "ifsc":tempObj.ifsc
      }
    ]
      this.balanceHireArrray[0][this.bigI]['update']=false;
      this.balanceHireArrray[0][this.bigI]['accountNo']=temp;
      
    });
  }
  }

  updateACC(i,j){
    this.bigI=j;
    this.accUpdater=i
  }

  

  check(){
    let checker=0;
    for (let i = 0; i < this.balanceHireArrray.length; i++) {
      for (let j = 0; j < this.balanceHireArrray[i].length; j++) {
        if (
          (parseInt((<HTMLInputElement>document.getElementById('balance_' + i + '_' + j)).value) == 1) 
          ||
          (parseInt((<HTMLInputElement>document.getElementById('lrno_' + i + '_' + j)).value) == 0)
          ||
          ((<HTMLInputElement>document.getElementById('name_'  + j)).value == 'Default')
          ) {
          
          checker=checker+1;
        }
      }
    }   
    if(checker===0){
    alert('All Fields are Okay, Please Continue');
          this.firstTime=true;
          this.checkSign=false;
    }
    else{
      alert('Please fill in all the fields.');
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

