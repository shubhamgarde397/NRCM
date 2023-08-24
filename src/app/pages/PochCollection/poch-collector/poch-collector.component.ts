import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-poch-collector',
  templateUrl: './poch-collector.component.html',
  styleUrls: ['./poch-collector.component.css']
})
export class PochCollectorComponent implements OnInit {
  public saveToCheckArrayBoolean = true;
  public turnbooklist;
public tempArray=[];
public balanceHireArrray=[];
public todaysDate;
public date=new Date();
public sum=0;
public finalCheckDone = true;
public bhTrucks=[];
public uitodayDate=''
public tableSelected=false;
public nextStepButton=false;
public firstTime=true;
public back=false;
public forceBackButton=false;

  constructor(public handleF:handleFunction,public apiCallservice:ApiCallsService,public handleData:HandleDataService,public router:Router,public spinnerService:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.uitodayDate = this.handleF.getDate(this.handleF.generate2DigitNumber(this.date.getDate()), (this.date.getMonth() + 1), this.date.getFullYear());
    this.todaysDate = this.handleF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    // this.find();
  }

  todayDateSetter(){
    this.tableSelected=true;
  }

  find = function () {
    this.spinnerService.show();
    let tempObj = {};
    tempObj['tablename'] = ''
    tempObj['method'] = 'getPochToSendData'
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, true)
      .subscribe((res: any) => {
        this.bhTrucks=[];
          this.turnbooklist = res.Data;
          this.tableSelected=true;
          this.spinnerService.hide();
      });

  };

  finalFunction() {
    let tempObj = {}
    tempObj['method'] = 'PochGivenProcessing';
    tempObj['tablename'] = '';
    tempObj['givenDate']=this.uitodayDate;
    tempObj['bhTrucks']=this.reducebhTrucks(this.bhTrucks);
    tempObj['todayDate'] = this.uitodayDate;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true,this.uitodayDate)//check this function
      .subscribe((res: any) => {
        alert(res.Status);
        this.moveToFinalStepReset();
      });
  }

  reducebhTrucks(data){
    let rkeys=[, 
    'checker',
        "place",
    "party",
    "loadingDate",
    "truckno",
  "nrlrno"]
    for(let i=0;i<data.length;i++){
      for(let j=0;j<rkeys.length;j++){delete data[i][rkeys[j]]}
  }
  return data;
  }

    addToCheckArray(i, j, c) {
      if(i['checker']===0){
      
    this.nextStepButton=true;
      this.turnbooklist[j]['checker'] = c;
      if (c == 1) {
        this.tempArray.push(i);
        this.bhTrucks.push(i);
      } else if (c == 0) {
        this.tempArray.splice(j, 1);
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

  saveToCheckArray() {
    this.balanceHireArrray.push(this.tempArray);
    this.tempArray = []
    this.turnbooklist = this.reduceArray();
  }

  moveToFinalStep() {

    this.saveToCheckArrayBoolean = !this.saveToCheckArrayBoolean;
  }

  moveToFinalStepReset() {
    this.saveToCheckArrayBoolean=!this.saveToCheckArrayBoolean;
    this.balanceHireArrray = [];
    this.turnbooklist=[];
    this.tempArray = [];
    this.bhTrucks=[];
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

