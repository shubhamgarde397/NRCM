import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { ExcelService } from '../../../common/services/sharedServices/excel.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-bhdigi',
  templateUrl: './bhdigi.component.html',
  styleUrls: ['./bhdigi.component.css']
})
export class BHDigiComponent implements OnInit {
  public date = new Date();
  public balanceDate = [];
  public selectedDate;
  public commonArray: any;
  public considerArray: any;
  public gstdetailslist: any;
  public fetchPartyTF=false;
  public fetchLoadedTruckTF=false;
  public advbalarray=[]
  public bigII;
  public bigJJ;
  public tempType;
  public showTable=false;
public nrcmid=0;
public tempBalls= [];
public tempTruckNo='';
public bigArr = [];
public transports = [];
public paymentDate;
public paymentAmt;
public reference;
public transportid='';
public name='';
public value='';

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public excelService: ExcelService,
    public securityCheck: SecurityCheckService, public handleF: handleFunction) {
      if(!this.securityCheck.login){
        this.router.navigate([''])
      }
  }

  ngOnInit() {
    this.nrcmid=this.securityCheck.nrcmid;
  }

  find = function (data) {
    
    let tempObj = {};
    if (this.selectedDate === undefined) {
      this.selectedDate = this.handleF.getDate(this.date.getDate(), (this.date.getMonth() + 1), this.date.getFullYear());
      tempObj['createdDate'] = this.selectedDate;
    } else {
      tempObj['createdDate'] = this.selectedDate;
    }
    tempObj['data']=data;
    tempObj['method'] = 'BalanceHireDisplayDigital';
    tempObj['tablename'] = 'BalanceHire';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj, true)
      .subscribe((res:any) => {
        
        if(res.Data.length>0){
        this.balanceDate = [];
        this.balanceDate = res.Data;
        this.showTable=true;
        }
        else{
          this.showTable=false;
          alert('Data not avaliable!')
        }
      });
  };

  latemarker(ld,pd){
    return Math.floor(Math.abs(new Date(pd).valueOf()-new Date(ld).valueOf())/(1000*60*60*24))>30?'Late':'';
  }

    addPayment(){
    let tempObj={};
    tempObj['method']='updateAdvPaymentDetails'; 
    tempObj['_id']=this.bigII['_id']
    tempObj['paymentAmt']=this.paymentAmt;
    tempObj['paymentDate']=this.paymentDate;
    tempObj['reference']=this.reference;
    tempObj['transportid'] = this.transports.find(r=>r.tptName==this.transportid)['_id'];
    tempObj['tablename']='';
    tempObj['type']=this.tempType;
    tempObj['_id']=this.bigII['_id']

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status)
    this.balanceDate[this.bigJJ][this.tempType].push({'amount':this.paymentAmt,'date':this.paymentDate,'reference':this.reference});
      });
    
  }

    storeAD(){
    
    let tempObj1={};
    tempObj1['method'] = 'storeAD'
    tempObj1['tablename'] = ''
    tempObj1['type']=this.tempType
    tempObj1['_id']=this.bigII['_id'];
    tempObj1['name']=this.name
    tempObj1['value']=this.value
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true,this.handleF.createDate(new Date()))//fast
      .subscribe((res: any) => {
        alert(res.Status)
        this.tempBalls.push({key: this.name, value: this.value});
        this.balanceDate[this.bigJJ][this.tempType][this.name]=this.value;
      })
    
  }

   deleteTB(i,j){
    if(confirm('Do you want to delete?')){

       let tempObj1={};
    tempObj1['method'] = 'deleteAD'
    tempObj1['tablename'] = ''
    tempObj1['type']=this.tempType
    tempObj1['_id']=this.bigII['_id'];
    tempObj1['key']=i.key[j];

      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true,this.handleF.createDate(new Date()))//fast
      .subscribe((res: any) => {
        this.tempBalls.splice(j,1);
        delete this.balanceDate[this.bigJJ][this.tempType][i.key[j]];
        alert(res.Status)
      })
        
      }
  }

    savePayment(i,j,type){
    this.bigII=i;
    this.bigJJ=j;
    this.advbalarray = this.balanceDate[this.bigJJ][type]
      
    this.tempType=type;
  }

    savePayment2(i,j,type){
    this.tempBalls=[]
    this.bigII=i;
    this.bigJJ=j;
    this.tempType=type;
    this.bigArr = this.balanceDate[this.bigJJ]
    let tempObj=this.balanceDate[this.bigJJ][this.tempType];
    let tempObjK=Object.keys(tempObj)
    let tempObjV=Object.values(tempObj)
    for (let i = 0;i<tempObjK.length;i++){
      this.tempBalls.push({
        key:[tempObjK[i]],
        value: tempObjV[i]
      });
    }
    console.log(this.tempBalls);
    
  }

    getTransport(){
    let value={}
    value['method'] = 'getTransport';
    value['tablename'] = '';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        this.transports=res.Data;
      });
  }


  deladvbalArray(index){
  if(confirm('Are you sure?')){
  let tempObj={}
  
    tempObj['method']='deladvbalArray'; 
  
    tempObj['tablename']='';
    tempObj['_id']=this.bigII['_id']
    tempObj['index']=index;
    tempObj['type']=this.tempType;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
        this.balanceDate[this.bigJJ][this.tempType].splice(index,1);
      });
    
      
}
}


  fetchparty(){
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogst')
    this.handledata.goAhead(this.considerArray) ? this.getTransport() : this.getTransport();
    this.gstdetailslist = this.commonArray.gstdetails;
    this.fetchPartyTF=true;
    this.fetchLoadedTruckTF=false;
  }

  billno(data){
    switch (data.split('_')[0]) {
      case 'nrcm':
      return '1'+data.split('_')[1]
      case 'nr':
      return '2'+data.split('_')[1]
      case 'snl':
      return '3'+data.split('_')[1]
  }
}

  ls(no){
    if(no<6){
      return 3;
    }
    else if(no>=6){
      return no-5+this.ls(no-1);
    }
  }

}