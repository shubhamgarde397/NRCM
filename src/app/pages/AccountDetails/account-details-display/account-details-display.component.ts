import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as  jsPDF from 'jspdf';
import {Router} from '@angular/router'
import 'jspdf-autotable';

@Component({
  selector: 'app-account-details-display',
  templateUrl: './account-details-display.component.html',
  styleUrls: ['./account-details-display.component.css']
})
export class AccountDetailsDisplayComponent implements OnInit {
  // $BASIC $
  
  public myFormGroup18: FormGroup;
  public options = [
    {'viewValue':'Pan','value':'2','disabled':false},//remove
    {'viewValue':'Contact','value':'3','disabled':false},
    {'viewValue':'Transport Name','value':'5','disabled':false},
    {'viewValue':'Update Account Details','value':'9','disabled':false},
    {'viewValue':'Truck Format','value':'10','disabled':false},
    {'viewValue':'Truck Registration Fee','value':'11','disabled':false},
    {'viewValue':'My RC','value':'13','disabled':false},
    {'viewValue':'Count Partywise','value':'14','disabled':false},
    {'viewValue':'Count Loadwise','value':'15','disabled':false},
    {'viewValue':'Update Truck Details','value':'18','disabled':false},
    {'viewValue':'Daily Account Details','value':'19','disabled':false},
  ]
  public displayType;
  public buttonOption;
  public buttonValue;
  public showButton=false;
  public myFormGroup: FormGroup;
  public show=false;
  public considerArray;
  public commonArray;
  public typeDataConsists=false;
  public count=0;
  public bigI='';
  public trucks={'truckno':''}
// #BASIC #

  //$ Account $
  public tbl;
  public tblShow=false;
  public tblShow13=false;
//# Account #
// $PAN $
  public panarray=[];
  public pantable=false;
  public buttons=[];
  public years=[];
  public tempObj={};
  public selectedMY;
  public emptyData;
// #PAN #
public index=0;
// $Contact$
public contacttable=false;
public contactarray=[]
public trucknoid11;
public turn11=[];
public turnbooklist=[];
// #Contact#
// $Account$
public accounttable=false;
public accountarray=[]
// #Account#
// $TPT
public gotData19=false;
public tpttable=false;
public tptarray=[];
public transportlist=[];
public selectedTransporter='';
// #TPT
public accountArray=[]
// 
public truckarray=[];
public trucktable=false;
public selectedTruck;
public typeDataConsistsArray=[];
// 

// 
public accountarrayUF=[];
public accounttableUF=false;
public loadingDate;
// 

// 
public truckformatarray=[];
public truckformattable=false;
// 
public table14=false;
public emptyData14=[];
public gotData18=false;
public table15=false;
public emptyData15=[];
public truckVar='';
public emptyregData=[];
public emptyregDatatable=false;
// 
public myrcData=[];
public loadingDate6;
public tabs=[0,0,0,0,0,0,0,0,0,0]
public nrcmid=0;

public numbers=[];
public accName;
public accNo;
public ifsc;
public bname;


  constructor(
    public apiCallservice: ApiCallsService, 
    public securityCheck: SecurityCheckService,
     public handledata: HandleDataService,
     public handleF:handleFunction,
     public router:Router,
     public spinnerService: Ng4LoadingSpinnerService,
     public formBuilder: FormBuilder) { if(!this.securityCheck.login){
      this.router.navigate([''])
    }}

  ngOnInit() {
    this.nrcmid=this.securityCheck.nrcmid;
    switch (this.nrcmid) {
      case 7:
        this.tabs=[1,0,0,0,0,0,0,0,0,1,1];
        this.tabs.forEach((r,i) => {
          if(r===1){
            this.options[i]['disabled']=false;
          }else{
            this.options[i]['disabled']=true;
          }
        });
        break;
      case 1:
        this.tabs=[1,1,1,1,1,1,1,1,1,1,1];
        this.tabs.forEach((r,i) => {
          if(r===1){
            this.options[i]['disabled']=false;
          }else{
            this.options[i]['disabled']=true;
          }
        });
        break;
    }
  }
  updateifscCode(index){
    (<HTMLInputElement>document.getElementById('bname_'+index)).value=(<HTMLInputElement>document.getElementById('ifsc_'+index)).value.slice(0,4)
  }

  updateaccountDetails(i,j){

    let aD=[]
    let tempObj={};


    for(let i=0;i<this.accountarrayUF.length;i++){
    let accname=(<HTMLInputElement>document.getElementById('accname_' + i)).value;
    let accno=(<HTMLInputElement>document.getElementById('accno_' + i)).value;
    let bname=(<HTMLInputElement>document.getElementById('bname_' + i)).value;
    let ifsc=(<HTMLInputElement>document.getElementById('ifsc_' + i)).value;
    if(accname===''||accno===''||bname===''||ifsc===''){}
    else{
      let itempObj={}
      itempObj['accountName']=accname;
      itempObj['accountNumber']=accno;
      itempObj['ifsc']=ifsc;
      itempObj['_id']=this.accountarrayUF[i]['_id'];
      aD.push(itempObj)

    }
  }


  tempObj['aD']=aD;
      tempObj['tablename']='';
      tempObj['method']='SMARTACCOUNTUPDATEUFNEW';
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
        this.accountarrayUF.splice(j,1);
      });
  }

  find(){
    let tempObj = {}
    tempObj['tablename'] = 'ownerdetails'
    tempObj['method'] = 'displayEditTruckTB' 

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.turnbooklist = res.Data;
      });
  }

  find19(){
    let tempObj = {}
    tempObj['tablename'] = ''
    tempObj['method'] = 'editTruckAccountsDailyBasis'
    tempObj['loadingDate']=this.loadingDate; 

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.turnbooklist = res.Data;
        this.gotData19=true;
      });
  }


  back(){
    this.gotData18=!this.gotData18;
  }
  edit(i,j){
    this.bigI=i;
    this.index=j;
    this.gotData18=!this.gotData18;

    this.myFormGroup18 = this.formBuilder.group({
      truckNo: i['truckno'],
      pan:i['pan'],
      name:i['oname'],
      weight:i['weight'],
      h:i['h'],
      b:i['b'],
      l:i['l'],
      typeOfVehicle:i['typeOfVehicle'],
      ifsc:'',
      accountNumber:'',
      accountName:''
    });
    this.accountArray=i.accountDetails;
  }

  saveEdit(i,j){
    this.trucks=i;
    this.index=j;
  }
  delLit(j,z){
    this.turnbooklist[j]['accounts'].splice(z,1);
  }

  storeAcc(){
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
  

  
      let temp=
        {
          "accountName": this.accName,
          "accountNumber":this.accNo,
          "ifsc":this.ifsc,
      }
      this.turnbooklist[this.index]['accounts'].push(temp);
      alert('Added, Close the modal!')
  }
  }

  save(i,j){
    
    let tempObj = {
       "method": "addtoaccounts", 
       "id": i['ownerid'],
       'tablename':'',
       'accounts':i['accounts']
      };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj,true)
      .subscribe((res: any) => {
        alert(res.Status)
      });
  }

  addaccount() {
    if (
      this.myFormGroup18.value.accountNumber === '' ||
       this.myFormGroup18.value.accountName === '' ||
       this.myFormGroup18.value.ifsc === '') { alert('Cant enter empt entries!') } else {
      let tempObj = {};
      tempObj['accountName'] = this.myFormGroup18.value.accountName;
      tempObj['accountNumber'] = this.myFormGroup18.value.accountNumber;
      tempObj['ifsc'] = this.myFormGroup18.value.ifsc;
      tempObj['delete'] = true;
      this.accountArray.push(tempObj);
      this.myFormGroup18.patchValue({ accountName: '' });
      this.myFormGroup18.patchValue({ accountNumber: '' });
      this.myFormGroup18.patchValue({ ifsc: '' });
    }

  }

  deleteOneA(i, j) {
    if (confirm('Are you sure?')) {
      this.accountArray.splice(j, 1);0
    }
  }

  getDimW(){
    switch (this.myFormGroup18.value.typeOfVehicle) {
      case 'Container':
        this.myFormGroup18.patchValue({'weight':6})
        this.myFormGroup18.patchValue({'h':8})
        this.myFormGroup18.patchValue({'b':8})
        this.myFormGroup18.patchValue({'l':20})
        break;
    case 'Open':
      this.myFormGroup18.patchValue({'weight':8})
        this.myFormGroup18.patchValue({'h':7})
        this.myFormGroup18.patchValue({'b':7})
        this.myFormGroup18.patchValue({'l':20})
        break;
    }
    
  }

  // find11UniqueTruck(){
  //   if(this.trucknoid11!=='Default'){
  //   this.turn11=this.turnbooklist.filter(r=>{return r.truckno==this.trucknoid11})[0]; 
    
  //   this.showButton=false;
  //         this.myFormGroup18 = this.formBuilder.group({
  //           truckNo: this.turn11['truckno'],
  //           pan:this.turn11['pan'],
  //           name:this.turn11['oname'],
  //           weight:this.turn11['weight'],
  //           h:this.turn11['h'],
  //           b:this.turn11['b'],
  //           l:this.turn11['l'],
  //           typeOfVehicle:this.turn11['typeOfVehicle'],
  //           ifsc:'',
  //           accountNumber:'',
  //           accountName:''
  //         });
  //         this.gotData18=true;

  //   }
  // }

  getRC(data){

    let tempObj = { "method": "myrcvehicles", "rc": data,'tablename':''};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj,true)
      .subscribe((res: any) => {
        this.tblShow13=true;
        this.myrcData=res.Data;
      });
  }

  findOption() {
    if(this.buttonOption=='18'){
      this.showButton=false;
    }
    this.showButton=true;
    let temp=this.options.filter(r=>{return r.value==this.displayType})[0]
    this.buttonOption = this.displayType;
    this.buttonValue = temp.viewValue;

  }
  change(data){
    let temp={
      'pan':data.value.pan,
      'oname':data.value.name,
      'h':data.value.h,
      'b':data.value.b,
      'l':data.value.l,
      'weight':data.value.weight,
      'typeOfVehicle':data.value.typeOfVehicle,
      'accountDetails':this.accountArray,
      'ownerid':this.bigI['ownerid'],
      '_id':this.bigI['_id'],
    }
   
    let tempObj={};
    tempObj['data']=temp
    tempObj['method']='allAnilUpdate'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj,true)
    .subscribe((res: any) => {
    alert(res.Status)
    this.turnbooklist.splice(this.index,1)
    this.gotData18=!this.gotData18;
    });
    
  }

  callOptionAPI(){
    this.resetAllDivs();
switch (this.buttonOption) {
    case '2':
      this.getPanInfoData();
    break;

    case '14':
      this.getPanInfoData();
    break;

    case '15':
      this.getPanInfoData();
    break;

    case '3':
      this.buttonOption='3';
    break;

    case '5':
      this.buttonOption='5';
      this.commonArray = this.securityCheck.commonArray;
      this.considerArray = this.handledata.createConsiderArray('infotpt')
      this.handledata.goAhead(this.considerArray) ? this.getInformationDataCC() : this.fetchBasicCC();
      this.transportlist = this.commonArray.transport;
    break;
  
    case '10':
      this.buttonOption='10';
    break;
    case '11':
      this.buttonOption='11';
    break;
}
  }

  resetAllDivs(){
    this.tblShow=false;
    this.pantable=false;
  }

  getInformationDataCC() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj,true)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['transport'] = Object.keys(res.transport[0]).length > 0 ? res.transport : this.securityCheck.commonArray['transport'];;
        this.fetchBasicCC();
        this.spinnerService.hide();
      });
  }

  fetchBasicCC() {
    this.commonArray = this.securityCheck.commonArray;
    this.transportlist = [];
    this.transportlist = this.commonArray.transport;
  }

  getPanInfoData(){
    this.buttons=this.getButtons();
// getpan infor from other reports, i want same ui
  }

  getButtons() {
    let buttons=[]
    let index=0;
        for (let i = 0; i < new Date().getFullYear() - 2019; i++) {
          this.years.push(i + 2020)
        }
        for (let i = 0; i < this.years.length; i++) {
          let months = new Date().getFullYear() - this.years[i] == 0 ? new Date().getMonth() + 1 : 12;
          for (let j = 0; j < months; j++) {
            let date = new Date(String(i + 2020) + '-' + this.handleF.generate2DigitNumber(String(j + 1)) + '-01');
            let month = date.toLocaleString('default', { month: 'short' });
            this.tempObj['value'] =  String(i + 2020) + "-" + this.handleF.generate2DigitNumber(String(j + 1)) + "-01_"+String(i + 2020) + "-" + this.handleF.generate2DigitNumber(String(j + 1)) + "-31";
            this.tempObj['viewValue'] = month + '-' + String(i + 2020).slice(-2);
            this.tempObj['option']=1;
            this.tempObj['index']=index;
            buttons.push(this.tempObj);
            this.tempObj = {}
            index=index+1;
          }
          
        }
        buttons.push({'value':'""_""','viewValue':'All','option':2,'index':index});
        return buttons;
      }


  getData(option){
    let tempObj={};
    tempObj['from']=this.buttonOption==='2'?(this.buttons[parseInt(this.selectedMY)]['option']===1?this.buttons[parseInt(this.selectedMY)]['value'].split('_')[0]:null):null;
    tempObj['to']=this.buttonOption==='2'?(this.buttons[parseInt(this.selectedMY)]['option']===1?this.buttons[parseInt(this.selectedMY)]['value'].split('_')[1]:null):null;
    tempObj['method']='pipelinePan'
    tempObj['tablename']='';
    tempObj['option']=1;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj,true)
    .subscribe((res: any) => {
    this.emptyData=res.chartData;
    });
  }

  getData14(){
    let tempObj={};
    tempObj['from']=this.buttons[parseInt(this.selectedMY)]['value'].split('_')[0];
    tempObj['to']=this.buttons[parseInt(this.selectedMY)]['value'].split('_')[1];
    tempObj['method']='countSumOfParty'
    tempObj['tablename']='';
    tempObj['option']=14;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj,true)
    .subscribe((res: any) => {
    this.emptyData14=res.Data;
    this.table14=true;
    });
  }

    getData15(){
    let tempObj={};
    tempObj['from']=this.buttons[parseInt(this.selectedMY)]['value'].split('_')[0];
    tempObj['to']=this.buttons[parseInt(this.selectedMY)]['value'].split('_')[1];
    tempObj['method']='countSumOfPF'
    tempObj['tablename']='';
    tempObj['option']=15;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj,true)
    .subscribe((res: any) => {
    this.emptyData15=res.Data;
    this.table15=true;
    });
  }

  getEmptyRegFee(){
    let tempObj={};
    tempObj['method']='SmartRegFee'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
    this.emptyregData=res.chartData;
    this.emptyregDatatable=true;
    });
  }

  updateRegFee(i,j){
    let regFeeDate=(<HTMLInputElement>document.getElementById('regFeeDate_' + j)).value;
    let regFee=(<HTMLInputElement>document.getElementById('regFee_' + j)).checked;
    if(regFeeDate===''){
      alert('Cannot add empty fields')
    }
    else{
      let tempObj={}
      tempObj['regFeeDate']=regFeeDate;
      tempObj['_id']=i['_id'];
      tempObj['regFee']=regFee;
      tempObj['tablename']='';
      tempObj['method']='SMARTREGFEEUPDATE';
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
        this.emptyregData.splice(j,1);
      });
    }
  }
  
  doRegExpiry(){
    let tempObj={};
    tempObj['method']='regFeeExpired'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
    alert(res.Status)
    });
  }

  getContacts(){
    let tempObj={};
    tempObj['method']='SmartContact'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
    this.contactarray=res.chartData;
    this.contacttable=true;
    });
  }

  getAccountsUpdateTrue(){
    let tempObj={};
    tempObj['method']='SmartAccountUpdateTrue'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {  
    this.accountarrayUF=res.chartData;
    this.accounttableUF=true;
    });
  }

  gettruckFormat(){
    let tempObj={};
    tempObj['method']='SmartTruckFormat'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {  
    this.truckformatarray=res.chartData;
    this.truckformattable=true;
    });
  }

  downloadPan(data,option){
    let tempObj={};
    tempObj['from']=this.buttons[parseInt(this.selectedMY)]['option']===1?this.buttons[parseInt(this.selectedMY)]['value'].split('_')[0]:null;
    tempObj['to']=this.buttons[parseInt(this.selectedMY)]['option']===1?this.buttons[parseInt(this.selectedMY)]['value'].split('_')[1]:null;
    tempObj['partyType']=data['_id'];
    tempObj['method']='pipelinePan'
    tempObj['tablename']='';
    tempObj['option']=this.buttons[parseInt(this.selectedMY)]['option']===2?3:4;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      this.panarray=res.chartData;
      this.pantable=true;
    });
  }

  updatePan(){

    let bigArray=[]
    let tempObj={}

    

    for(let i=0;i<this.panarray.length;i++){

      let pan=(<HTMLInputElement>document.getElementById('pan_' + i)).value;
      let name=(<HTMLInputElement>document.getElementById('name_' + i)).value;

      if(pan.length<10){}

      else{
        let obj={}
        obj['pan']=pan;
        obj['name']=name;
        obj['ownerid']=this.panarray[i]['ownerid'];
        bigArray.push(obj);
      }
    }
      tempObj['tablename']='';
      tempObj['method']='SMARTPANNEW';
      tempObj['array']=bigArray;

      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
        alert('Please Refresh!')
      });
    

  }
  updateContact(i,j){
    let contact=(<HTMLInputElement>document.getElementById('contact_' + j)).value;
    let m=(<HTMLInputElement>document.getElementById('m_' + j)).checked;
    if(contact===''){
      alert('Cannot add empty fields')
    }
    else{
      let tempObj={}
      tempObj['contact']=contact;
      tempObj['ownerid']=i['_id'];
      tempObj['m']=m;
      tempObj['tablename']='';
      tempObj['method']='SMARTCONTACTUPDATE';
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
        this.contactarray.splice(j,1);
      });
    }
  }

  updatetruckformat(i,j){
    
    let truckno=(<HTMLInputElement>document.getElementById('truckno_' + j)).value;
    if(truckno===''){
      alert('Cannot add empty fields')
    }
    else{
      let tempObj={}
      tempObj['truckno']=truckno;
      tempObj['ownerid']=i['_id'];
      tempObj['tablename']='';
      tempObj['method']='SMARTTRUCKFORMATUPDATE';
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
        this.truckformatarray.splice(j,1);
      });
    }
  }

  getTransports(){
    let tempObj={};
    tempObj['method']='SmartTransport'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      this.tptarray=res.chartData;
      this.tpttable=true;
    });
  }

  updatetpt(i,j,data){
    if(this.selectedTransporter===''){
      alert('Cannot add empty fields')
    }
    else{
      let tempObj={}
      tempObj['tptid']=this.selectedTransporter;
      tempObj['ownerid']=i['_id'];
      tempObj['tablename']='';
      tempObj['typer']=data;
      tempObj['method']='SMARTTRANSPORTUPDATE';
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
        this.tptarray.splice(j,1);
      });
    }
  }

  generateReportAccount(yo=''){//threshhold is 295
    // Fetch all trucks who have either 12 or 363 as false
          let data=this.handleF.removeDuplicates(this.tbl)
          let pager=1;
           var doc = new jsPDF()
           doc.setFontSize('25');
           doc.setFontType('bold');
           if(yo===''){
           doc.text('Account Details : ', 15, 15)//partyname
           }else{
            doc.text('Account Details : '+String(this.count), 15, 15)//partyname
           }
           doc.setFontSize('10');
          //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
           doc.text(String(pager), 180, 5)//pageno
           pager=pager+1;
           doc.setFontSize('25');
           doc.setLineWidth(0.5);
           doc.line(0, 20, 210, 20);//line after main header
           //headers
           doc.setFontSize('10');
           let y = 24;
           let starty = 24;
           doc.text('Sr', 3, y)//partyname
           doc.text('TruckNo', 12, y)//partyname
           doc.text('Account', 39, y)//partyname
           doc.text('Account Number', 150, y)//partyname
           //headers
           doc.line(0, 25, 210, 25);//line after header
       
           //vertical lines
           doc.line(10, 20, 10, 25);//srno
           doc.line(38, 20, 38, 25);//date
           doc.line(90, 20, 90, 25);//truckno
           doc.line(112, 20, 112, 25);//credit
           doc.line(134, 20, 134, 25);//credit
           //vertical lines
           let startforI=0;
           y = y + 6;
           startforI=0;
           for (let i = startforI; i < data.length; i++) {
       
             if(y>290){
              //vertical lines//getting applied for every loop, make it happen once only
           doc.line(10, starty, 10, y-4);//srno
           doc.line(38, starty, 38, y-4);//date
           doc.line(90, starty, 90, y-4);//truckno
           doc.line(112, starty, 112, y-4);//credit
           doc.line(134, starty, 134, y-4);//credit
           //vertical lines
               y=24;
               y=y+6;
           starty = 24;
               doc.addPage();
               doc.setFontSize('25');
           doc.setFontType('bold');
           if(yo===''){
            doc.text('Account Details : ', 15, 15)//partyname
            }else{
             doc.text('Account Details : '+String(this.count), 15, 15)//partyname
            }
           doc.setFontSize('10');
          //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 190, 19)//date
           doc.text(String(pager), 180, 5)//pageno
           pager=pager+1;
           doc.setFontSize('25');
           doc.setLineWidth(0.5);
           doc.line(0, 20, 210, 20);//line after main header
           //headers
           doc.setFontSize('10');
           doc.text('Sr', 3, y-6)//partyname
           doc.text('TruckNo', 12, y-6)//partyname
           doc.text('Account', 39, y-6)//partyname
           doc.text('Account Number', 150, y-6)//partyname
           //headers
           doc.line(0, 25, 210, 25);//line after header
       
           //vertical lines
           doc.line(10, 20, 10, 25);//srno
           doc.line(38, 20, 38, 25);//date
           doc.line(90, 20, 90, 25);//truckno
           doc.line(112, 20, 112, 25);//credit
           doc.line(134, 20, 134, 25);//credit
           //vertical lines
           }
           if(yo===''){
            doc.text(String(i+1), 3, y)//partyname
            doc.text(data[i].truckno, 11, y)//partyname
           doc.text(data[i].accountDetails[0].accountName, 39, y)//partyname
           doc.text(String(data[i].accountDetails[0].accountNumber), 39, y+4)//partyname
           doc.text(data[i].accountDetails[0].ifsc, 39, y+8)//partyname
           }else{
            doc.text(String(i+1), 3, y)//partyname
            doc.text(data[i].truckno, 11, y)//partyname
           doc.text(data[i].acc.accountName, 39, y)//partyname
           doc.text(String(data[i].acc.accountNumber), 39, y+4)//partyname
           doc.text(data[i].acc.ifsc, 39, y+8)//partyname
           }
                      
             doc.line(0, y + 11, 210, y + 11);//line after header
             y = y + 15;
           }

           //vertical lines//getting applied for every loop, make it happen once only
           doc.line(10, starty, 10, y-4);//srno
           doc.line(38, starty, 38, y-4);//date
           doc.line(90, starty, 90, y-4);//truckno
           doc.line(112, starty, 112, y-4);//credit
           doc.line(134, starty, 134, y-4);//credit
           //vertical lines
      
           doc.save('Account-Details.pdf')
         }

         generateReportAccount2(){//threshhold is 295
          // Fetch all trucks who have either 12 or 363 as false
                let data=this.accountarrayUF;
                let pager=1;
                 var doc = new jsPDF()
                 doc.setFontType('bold');
                 doc.setFontSize('25');
                 doc.setLineWidth(0.5);
                 doc.line(0, 5, 210, 5);//line after main header
                 //headers
                 doc.setFontSize('10');
                 let y = 9;
                 let starty = 9;
                 doc.text('Sr', 3, y)//partyname
                 doc.text('TruckNo', 12, y)//partyname
                 doc.text('Account', 39, y)//partyname
                 //headers
                 doc.line(0, 10, 210, 10);//line after header
             
                 //vertical lines
                 doc.line(10, 5, 10, 10);//srno
                 doc.line(38, 5, 38, 10);//date
                 //vertical lines
                 let startforI=0;
                 y = y + 6;
                 startforI=0;
                 for (let i = startforI; i < data.length; i++) {
             
                   if(y>195){
                    //vertical lines//getting applied for every loop, make it happen once only
                 doc.line(10, starty, 10, y-4);//srno
                 doc.line(38, starty, 38, y-4);//date
                 //vertical lines
                     y=9;
                     y=y+6;
                 starty = 9;
                     doc.addPage();
                 doc.setFontType('bold');
                 doc.setFontSize('25');
                 doc.setLineWidth(0.5);
                 doc.line(0, 5, 210, 5);//line after main header
                 //headers
                 doc.setFontSize('10');
                 doc.text('Sr', 3, y-6)//partyname
                 doc.text('TruckNo', 12, y-6)//partyname
                 doc.text('Account', 39, y-6)//partyname
                 //headers
                 doc.line(0, 10, 210, 10);//line after header
             
                 //vertical lines
                 doc.line(10, 5, 10, 10);//srno
                 doc.line(38, 5, 38, 10);//date
                 //vertical lines
                 }
    
                  doc.text(String(i+1), 3, y)//partyname
                  doc.text(data[i].truckno, 11, y)//partyname
     
                            
                   doc.line(0, y + 11, 210, y + 11);//line after header
                   y = y + 15;
                 }
      
                 //vertical lines//getting applied for every loop, make it happen once only
                 doc.line(10, starty, 10, y-4);//srno
                 doc.line(38, starty, 38, y-4);//date
                 //vertical lines
            
                 doc.save('Account-Details.pdf')
               }
}
