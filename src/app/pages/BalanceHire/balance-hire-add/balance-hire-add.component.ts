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
public ids=[];
public partyTypes=[];
public oids=[];
public finalObject={};
public finalArray = [];
public tempObj = {};
public todaysDate;
public date=new Date();
public sum=0;
public finalCheckDone = true;
public comment='';
public bhTrucks=[];
public pgnos=[];
public amounts=[];
public uitodayDate=''
public tableSelected=false;
public nextStepButton=false;

  constructor(public handleF:handleFunction,public apiCallservice:ApiCallsService,public handleData:HandleDataService,public router:Router,public spinnerService:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.todaysDate = this.handleF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    this.find();
  }

  todayDateSetter(){
    this.tableSelected=true;
  }

  edit(data) {
    data['index'] = 0;
    this.handleData.saveData(data);
    this.router.navigate(['Navigation/OWNER_HANDLER/OwnerUpdate']);
  }

  find = function () {
    this.spinnerService.show();
    let tempObj = {};
    tempObj['tablename'] = 'turnbook'
    tempObj['method'] = 'displayTB'
    tempObj['display'] = '6';
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 1)
      .subscribe((res: any) => {
        this.bhTrucks=[];
          this.turnbooklist = res.Data;
          this.handleData.saveBH(this.turnbooklist);
          this.spinnerService.hide();
      });

  };

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

  finalFunction(action) {
    let tempObj = {}
    tempObj['bhData'] = this.finalArray;
    tempObj['method'] = 'BHInsert';
    tempObj['tablename'] = 'BalanceHire';
    tempObj['ids'] = this.ids;
    tempObj['bhTrucks']=this.bhTrucks;
    tempObj['oids'] = this.oids;
    tempObj['pgnos']=this.pgnos;
    tempObj['amounts']=this.amounts;
    tempObj['partyTypes'] = this.partyTypes;
    // tempObj['todayDate'] = this.todaysDate;
    tempObj['todayDate'] = this.uitodayDate;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
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
    this.finalObject = {};
    this.finalArray = [];
    this.ids=[];
    this.partyTypes=[];
    this.oids=[];
    this.pgnos=[];
    this.amounts=[];
    this.comment='';
    this.bhTrucks=[];
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
          this.pgnos.push(parseInt((<HTMLInputElement>document.getElementById('pageno_' + i + '_' + j)).value));
          this.amounts.push(parseInt((<HTMLInputElement>document.getElementById('balance_' + i + '_' + j)).value));

          this.bhTrucks.find((r,index)=>{
            if(r._id==this.balanceHireArrray[i][j]['_id']){
              this.bhTrucks[index]['pgno']=parseInt((<HTMLInputElement>document.getElementById('pageno_' + i + '_' + j)).value)
              this.bhTrucks[index]['amount']=parseInt((<HTMLInputElement>document.getElementById('balance_' + i + '_' + j)).value)
              return true
            }
          })

          this.oids.push(this.balanceHireArrray[i][j]['ownerDetails'][0]['_id']);//ObjectId to mongoform in lambda write a loop
          tempObj['date'] = this.balanceHireArrray[i][j].loadingDate;
          tempObj['truckno'] = this.balanceHireArrray[i][j].ownerDetails[0].truckno;
          tempObj['shortDetails']=this.balanceHireArrray[i][j].partyType+'-'+this.balanceHireArrray[i][j].partyDetails[0].shortName+'-'+this.balanceHireArrray[i][j].villageDetails[0].shortName;
          tempObj['pageno'] = parseInt((<HTMLInputElement>document.getElementById('pageno_' + i + '_' + j)).value);
          tempObj['amount'] = parseInt((<HTMLInputElement>document.getElementById('balance_' + i + '_' + j)).value);
          tempObj['partyType'] = this.balanceHireArrray[i][j].partyType;
          truckData.push(tempObj);
          //write logic to update the TurnBook_2020_2021 and change pochPayment to true when sent to lambda
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

}
