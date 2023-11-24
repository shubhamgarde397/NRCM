import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  public detailedPrint=false;
  data: any;
  show = 1;
  tabledata: false;
  public today;
  public modalButtonA=false;
  public amtRec=0;
  public RecDate;
  public todaysDate;
  public name: string;
  public dbName = 1;
  public commonArray;
  public date = new Date();
  public dateFromUI;
  public buttonValue: any = 'Party';
  public typeOfCols='default';
  public trucknoid;
  public allData;
  public dynDate;
  public dynDate2;
  public updateTruck={hamt:0,truckno:'',totalRec:0,balanceToCome:0,paymentof:0,partyhamali:0};
  public dataTruck;
  public pp;
  public pp1;
  public partyid = '';
  public considerArray;
  public partyData;
  public gstdetailslist;
  public nopid;
  public pendingTrucks;
  public addToArrayVar=[]
  public from;
  public to;
  public index;
  public adminAccess = false;
  public tableData = false;
  public monthNames=[];
  public paymentData;
  public youcanaddinarray=0;
  public displayType;
  public date1;
  public date2;
  public displayOption='0';
  public displayValue='This Month';
  public monthName;
  public balanceFollowMsg='';
  public balanceFollowAmount=0;
  public fromloading;
  public frompayment;
  public remark='';
  public toloading;
  public topayment;
  public mailSentDate;
  public partyids=[];
  public mailSendButton=false;
public balanceFollowGlobal=[];
public paymentCheck=false;
public balanceFollowArr=[]
public typeOfColsB=false;
public month;
public selectDisable=false;
public bigger=true;
public year;
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService) {
  }

  accounting(data){
    switch (data) {
      case 'adv':
      this.bigger=true;
        break;
        case 'bal':
          this.bigger=false;
        break;
    }
  }

  trucks(data){
    switch (data) {
      case 2:
        this.show=2;
        break;
    }
  }
  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogstonly')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray ,'notall':false};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.gstdetailslist = [];
    this.gstdetailslist = this.commonArray.gstdetails;
  }

  findgst() {
    this.partyid = this.handleF.findgst(this.nopid, this.gstdetailslist);
  }

  getPartyPayments(){
    let tempObj={};
    tempObj['method'] = 'partyPayment';
    tempObj['partyid']=this.partyid['_id'];
    tempObj['from']=this.from;
    tempObj['to']=this.to;
    tempObj['tablename'] = ''

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.paymentData = res.Data;
        this.selectDisable=false;
      });
  }

  setAllData(){
    this.paymentCheck = this.paymentData.find(r=>{return r._id===this.pp1})['done']
    
    let tempObj={};
    tempObj['method'] = 'pendingPayment';
    tempObj['date'] = this.paymentData.find(r=>{return r._id===this.pp1})['date']
    tempObj['partyid']=this.partyid['_id'];
    tempObj['paymentid'] = this.pp1;
    tempObj['tablename'] = ''

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.pendingTrucks = res.Data[0]['tb'];
        this.addToArrayVar = res.Data[0]['pp'];
        this.selectDisable=true;
      });

  }

  setAllDataBalance(){
    this.paymentCheck = this.paymentData.find(r=>{return r._id===this.pp1})['done']
    let tempObj={};
    tempObj['method'] = 'pendingPaymentBalance';
    tempObj['date'] = this.paymentData.find(r=>{return r._id===this.pp1})['date']
    tempObj['partyid']=this.partyid['_id'];
    tempObj['paymentid'] = this.pp1;
    tempObj['tablename'] = ''

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.pendingTrucks = res.Data[0]['tb'];
        this.addToArrayVar = res.Data[0]['pp'];
        this.selectDisable=true;
      });

  }

  
  onChange(){
    this.index=parseInt(this.handleF.findpayment(this.pp));

    this.updateTruck['truckno']=this.pendingTrucks[this.index]['data'].split('_')[2];
    this.updateTruck['hamt']=this.pendingTrucks[this.index]['data'].split('_')[5];
    this.updateTruck['totalRec']=this.pendingTrucks[this.index]['weRec'];
    this.updateTruck['partyhamali']=this.pendingTrucks[this.index]['partyhamali'];
    this.updateTruck['balanceToCome']=this.pendingTrucks[this.index]['balanceToCome'];
    this.updateTruck['paymentof']=this.paymentData.find(r=>{return r._id===this.pp1})['amount'];
    this.youcanaddinarray=this.updateTruck['paymentof']-this.amtFromArray();
   
    this.modalButtonA=true;
  }


  addToArray(){
    if(this.isValid()){
    let tempObj={}
    this.index=parseInt(this.handleF.findpayment(this.pp));
    tempObj['truckno']=this.pendingTrucks[this.index]['data'].split('_')[2]
    tempObj['date']=this.paymentData.find(r=>{return r._id===this.pp1})['date']
    tempObj['lrno']=this.pendingTrucks[this.index]['lrno']
    tempObj['amount']=this.amtRec;
    tempObj['remark']=this.remark;
    tempObj['shallIDelete']=false;
    tempObj['hamt']=this.pendingTrucks[this.index]['hamt']
    tempObj['rent']=this.pendingTrucks[this.index]['rent']
    tempObj['id']=this.pendingTrucks[this.index]['data'].split('_')[3]
    tempObj['partyName']=this.pendingTrucks[this.index]['partyName']
    tempObj['entryDate']=this.pendingTrucks[this.index]['data'].split('_')[1]
    tempObj['index']=this.index;
    this.pendingTrucks.splice(this.index,1);
    this.addToArrayVar.push(tempObj)
    this.modalButtonA=false;
    this.pp='';
    this.youcanaddinarray=this.updateTruck['paymentof']-this.amtFromArray();
    }
    else{
      alert('Please enter valid amount!')
    }
  }


  amtFromArray(){
    let temp=0;
    for(let i=0;i<this.addToArrayVar.length;i++){
      let t={}
      temp=temp+this.addToArrayVar[i]['amount'];
    }
    return temp;
  }
  isValid(){
    
    if(this.youcanaddinarray>=this.amtRec){
    return true;
    }else{
      alert('Please enter amounts below or equal to pending Balance')
    }
  }


  addToSave(){
    let tempobj={}
    tempobj['tbids']=[]
    for(let i=0;i<this.addToArrayVar.length;i++){
      let t={}
      // this.addToArrayVar.map(r=>r.id);
      t['tbid']=this.addToArrayVar[i]['data']!==undefined?this.addToArrayVar[i]['data'].split('_')[3]:this.addToArrayVar[i]['id']
      t['amount']=this.addToArrayVar[i]['amount']
      t['remark']=this.addToArrayVar[i]['remark']
      t['date']=this.paymentData.find(r=>{return r._id===this.pp1})['date']
      tempobj['tbids'].push(t);
    }
    tempobj['_id']=this.pp1;
    tempobj['method']='addIdsToPartyAndTB';
    tempobj['tablename']='partyPayment';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, true)
        .subscribe((response: Response) => {
          alert(response['Status']);
          this.selectDisable=false;
          this.addToArrayVar=[];
          this.paymentData=[];
          this.youcanaddinarray=0;
          this.pendingTrucks=[];
          this.modalButtonA=false;
        });
    
  }

  checkPayment(){
    let temp={
      'method':'makepartypaymenttrueorfalse',
      'check':(<HTMLInputElement>document.getElementById('paymentCheck')).checked,
      'tablename':''
    }
    this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
    .subscribe((response: Response) => {
      alert(response['Status']);
    });
  }

  addToSaveBalance(){
    let tempobj={};
    tempobj['tbids']=[];
    for(let i=0;i<this.addToArrayVar.length;i++){
      let t={}
      // this.addToArrayVar.map(r=>r.id);
      t['tbid']=this.addToArrayVar[i]['data']!==undefined?this.addToArrayVar[i]['data'].split('_')[3]:this.addToArrayVar[i]['id']
      t['amount']=this.addToArrayVar[i]['amount']
      t['remark']=this.addToArrayVar[i]['remark']
      t['date']=this.paymentData.find(r=>{return r._id===this.pp1})['date']
      tempobj['tbids'].push(t);
    }
    tempobj['_id']=this.pp1;
    tempobj['method']='addIdsToPartyAndTBBalancce';
    tempobj['tablename']='partyPayment';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, true)
        .subscribe((response: Response) => {
          alert(response['Status']);
          this.selectDisable=false;
          this.addToArrayVar=[];
          this.paymentData=[];
          this.youcanaddinarray=0;
          this.pendingTrucks=[];
          this.modalButtonA=false;
        });
    
  }

  tempDelete(j,i){
    if(i['shallIDelete']){
      if(confirm('You are about to delete a payment, are you sure???')){
        this.addToArrayVar.splice(j,1);
        let tempObj={}
        tempObj['date']=i['date']
        tempObj['lrno']=i['lrno']
        tempObj['weRec']=0
        tempObj['balanceToCome']=i['hamt']
        tempObj['partyName']=i['partyName']
        tempObj['_id']=i['id']
        tempObj['hamt']=i['hamt']
        tempObj['rent']=i['rent']
        tempObj['shallIDelete']=true;
        tempObj['data']=i['date']+'_'+i['entryDate']+'_'+i['truckno']+'_'+i['data'].split('_')[3]+'_'+i['rent']+'_'+i['hamt']
            this.pendingTrucks.splice(i['index'],0,tempObj); 
            this.youcanaddinarray=this.updateTruck['paymentof']-this.amtFromArray();
            console.log(tempObj);
let tempo={
  tbid:i['data'].split('_')[3],
  paymentid:i['id'],
  method:'deletePaymentinTBPP',
  tablename:''
}

            this.apiCallservice.handleData_New_python('commoninformation', 1, tempo, true)
            .subscribe((response: Response) => {
              alert(response['Status']);
            });
        }
      else{
        alert('You have cancelled Deletion.')
      }
  }else{
    alert('You Cannot delete entry just added.')
  }  
  }

  tempDeleteB(j,i){
    if(i['shallIDelete']){
      if(confirm('You are about to delete a payment, are you sure???')){
        this.addToArrayVar.splice(j,1);
        let tempObj={}
        tempObj['date']=i['date']
        tempObj['lrno']=i['lrno']
        tempObj['weRec']=0
        tempObj['balanceToCome']=i['hamt']
        tempObj['partyName']=i['partyName']
        tempObj['_id']=i['id']
        tempObj['hamt']=i['hamt']
        tempObj['rent']=i['rent']
        tempObj['shallIDelete']=true;
        tempObj['data']=i['date']+'_'+i['entryDate']+'_'+i['truckno']+'_'+i['data'].split('_')[3]+'_'+i['rent']+'_'+i['hamt']
            this.pendingTrucks.splice(i['index'],0,tempObj); 
            this.youcanaddinarray=this.updateTruck['paymentof']-this.amtFromArray();
            console.log(tempObj);
let tempo={
  tbid:i['data'].split('_')[3],
  paymentid:i['id'],
  method:'deletePaymentinTBPPBalance',
  tablename:''
}

            this.apiCallservice.handleData_New_python('commoninformation', 1, tempo, true)
            .subscribe((response: Response) => {
              alert(response['Status']);
            });
        }
      else{
        alert('You have cancelled Deletion.')
      }
  }else{
    alert('You Cannot delete entry just added.')
  }  
  }


}
