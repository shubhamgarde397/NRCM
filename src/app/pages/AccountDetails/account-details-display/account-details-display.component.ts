import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-account-details-display',
  templateUrl: './account-details-display.component.html',
  styleUrls: ['./account-details-display.component.css']
})
export class AccountDetailsDisplayComponent implements OnInit {
  // $BASIC $
  public options = [
    {'viewValue':'Account Number','value':'1'},
    {'viewValue':'Pan','value':'2'},
    {'viewValue':'Contact','value':'3'},
    {'viewValue':'Account','value':'4'},
    {'viewValue':'Transport Name','value':'5'},
    {'viewValue':'Vehicle Type','value':'6'},
    {'viewValue':'Weight','value':'7'},
    {'viewValue':'Dimensions','value':'8'},
    {'viewValue':'Update Account Details','value':'9'},
    {'viewValue':'Truck Format','value':'10'}
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
// #BASIC #

  //$ Account $
  public tbl;
  public tblShow=false;
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

// $Contact$
public contacttable=false;
public contactarray=[]
// #Contact#
// $Account$
public accounttable=false;
public accountarray=[]
// #Account#
// $TPT
public tpttable=false;
public tptarray=[];
public transportlist=[];
public selectedTransporter='';
// #TPT
// $WEIGHT
public weighttable=false;
public weightarray=[];
public selectedWeight=0;
// #WEIGHT
// $DEIMENSIONS
public dimensiontable=false;
public dimensionarray=[];
public selectedDimension='';
// #DEIMENSIONS

// 
public truckarray=[];
public trucktable=false;
public selectedTruck;
public typeDataConsistsArray=[];
// 

// 
public accountarrayUF=[];
public accounttableUF=false;
// 

// 
public truckformatarray=[];
public truckformattable=false;
// 

  constructor(
    public apiCallservice: ApiCallsService, 
    public securityCheck: SecurityCheckService,
     public handledata: HandleDataService,
     public handleF:handleFunction,
     public spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  }
  findOption() {
    this.showButton=true;
    this.buttonOption = this.displayType;
    this.buttonValue = this.options[parseInt(this.displayType) - 1].viewValue;
  }

  callOptionAPI(){
    this.resetAllDivs();
switch (this.buttonOption) {
    case '1':
      this.getInformationData()
    break;

    case '2':
      this.getPanInfoData();
    break;

    case '3':
      this.buttonOption='3';
    break;

    case '4':
    this.buttonOption='4';
    break;

    case '5':
      this.buttonOption='5';
      this.commonArray = this.securityCheck.commonArray;
      this.considerArray = this.handledata.createConsiderArray('infotpt')
      this.handledata.goAhead(this.considerArray) ? this.getInformationDataCC() : this.fetchBasicCC();
      this.transportlist = this.commonArray.transport;
    break;

    case '6':
      this.buttonOption='6';
    break;

    case '7':
      this.buttonOption='7';
    break;

    case '8':
      this.buttonOption='8';
    break;

    case '9':
      this.buttonOption='9';
    break;
  
    case '10':
      this.buttonOption='10';
    break;
}
  }

  resetAllDivs(){
    this.tblShow=false;
    this.pantable=false;
  }

  getInformationDataCC() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
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

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "acc12363TF", "tablename": ''};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.tblShow=true;
        this.tbl=res.Data;
        this.spinnerService.hide();
        
      });
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
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {
    this.emptyData=res.chartData;
    });
  }

  getContacts(){
    let tempObj={};
    tempObj['method']='SmartContact'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {
    this.contactarray=res.chartData;
    this.contacttable=true;
    });
  }

  getAccountsUpdateTrue(){
    let tempObj={};
    tempObj['method']='SmartAccountUpdateTrue'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {  
    this.accountarrayUF=res.chartData;
    this.accounttableUF=true;
    });
  }

  gettruckFormat(){
    let tempObj={};
    tempObj['method']='SmartTruckFormat'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {  
    this.truckformatarray=res.chartData;
    this.truckformattable=true;
    });
  }

  getAccount(data){
    let tempObj={};
    tempObj['method']='SmartAccount'
    tempObj['tablename']='';
    tempObj['option']=data;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {
    this.accountarray=res.chartData;
    this.accounttable=true;
    });
  }

  update(type,i,j){
    let tempObj = { "method": "updateacc12363TF", "tablename": '','type':type,'id':i._id};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        alert(res.Status);
        switch (type) {
          case 'both':
            this.tbl.splice(j,1)
            break;
            case '12':
            this.tbl[j]['accountDetails'][0]['acc12']=true;
            this.tbl[j]['accountDetails'][0]['acc363']?this.tbl.splice(j,1):null;
            break;
            case '363':
              this.tbl[j]['accountDetails'][0]['acc363']=true;
              this.tbl[j]['accountDetails'][0]['acc12']?this.tbl.splice(j,1):null;
            break;
        
          default:
            break;
        }
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
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {
      this.panarray=res.chartData;
      this.pantable=true;
    });
  }

  updatePan(i,j){
    let pan=(<HTMLInputElement>document.getElementById('pan_' + j)).value;
    let name=(<HTMLInputElement>document.getElementById('name_' + j)).value;
    if(pan===''||name===''){
      alert('Cannot add empty fields')
    }
    else if(pan.length<10){
      alert('Bad PAN Number!')
    }
    else{
      let tempObj={}
      tempObj['pan']=pan;
      tempObj['name']=name;
      tempObj['ownerid']=i['ownerid'];
      tempObj['tablename']='';
      tempObj['method']='SMARTPAN';
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        this.panarray.splice(j,1);
      });
    }
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
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        this.contactarray.splice(j,1);
      });
    }
  }

  updateaccountDetails(i,j){
    
    let accname=(<HTMLInputElement>document.getElementById('accname_' + j)).value;
    let accno=(<HTMLInputElement>document.getElementById('accno_' + j)).value;
    let bname=(<HTMLInputElement>document.getElementById('bname_' + j)).value;
    let ifsc=(<HTMLInputElement>document.getElementById('ifsc_' + j)).value;
    if(accname===''||accno===''||bname===''||ifsc===''){
      alert('Cannot add empty fields')
    }
    else{
      let tempObj={}
      let itempObj={}
      itempObj['accountName']=accname;
      itempObj['accountNumber']=accno;
      itempObj['bankName']=bname;
      itempObj['ifsc']=ifsc;
      itempObj['acc12']=false;
      itempObj['acc363']=false;
      tempObj['aD']=[
        itempObj
      ]
      tempObj['ownerid']=i['_id'];
      tempObj['tablename']='';
      tempObj['method']='SMARTACCOUNTUPDATEUF';
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        this.accountarrayUF.splice(j,1);
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
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        this.truckformatarray.splice(j,1);
      });
    }
  }

  updateAccount(i,j){
    
    let accname=(<HTMLInputElement>document.getElementById('accname_' + j)).value;
    let accno=(<HTMLInputElement>document.getElementById('accno_' + j)).value;
    let bname=(<HTMLInputElement>document.getElementById('bname_' + j)).value;
    let ifsc=(<HTMLInputElement>document.getElementById('ifsc_' + j)).value;
    if(accname===''||accno===''||bname===''||ifsc===''){
      alert('Cannot add empty fields')
    }
    else{
      let tempObj={}
      let itempObj={}
      itempObj['accountName']=accname;
      itempObj['accountNumber']=accno;
      itempObj['bankName']=bname;
      itempObj['ifsc']=ifsc;
      itempObj['acc12']=false;
      itempObj['acc363']=false;
      tempObj['aD']=[
        itempObj
      ]
      tempObj['ownerid']=i['_id'];
      tempObj['tablename']='';
      tempObj['method']='SMARTACCOUNTUPDATE';
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        this.panarray.splice(j,1);
      });
    }
  }

  getTransports(){
    let tempObj={};
    tempObj['method']='SmartTransport'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
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
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        this.tptarray.splice(j,1);
      });
    }
  }

  getAllTrucks(){
    let tempObj={};
    tempObj['method']='SmartTruck'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {
      this.truckarray=res.chartData;
      this.trucktable=true;
      this.typeDataConsists=false;
      this.typeDataConsistsArray=[];
    });
  }

  updatetruck2(data){
    let tempObj={}
    tempObj['truckType']=data;
    tempObj['ownerids']=this.typeDataConsistsArray.map(r=> r._id)
    tempObj['tablename']='';
    tempObj['method']='SMARTTRUCKUPDATE2';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {
      alert(res.Status);
      this.typeDataConsists=false;
      this.typeDataConsistsArray=[];
    });
  }

  addTotypeDataConsists(i,j){
    this.typeDataConsistsArray.push(i);
    this.typeDataConsists=true;
    this.truckarray.splice(j,1);
  }

  deleteTotypeDataConsists(i,j){
    this.truckarray.push(i);
    this.typeDataConsists=this.typeDataConsistsArray.length===0?false:true;
    this.typeDataConsistsArray.splice(j,1);
  }

  getAllWeights(){
    let tempObj={};
    tempObj['method']='SmartWeight'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {
      this.weightarray=res.chartData;
      this.weighttable=true;
    });
  }

  updateWeight(i,j){
    if(this.selectedWeight===0){
      alert('Cannot add empty fields')
    }
    else{
      let tempObj={}
      tempObj['weight']=this.selectedWeight;
      tempObj['ownerid']=i['_id'];
      tempObj['tablename']='';
      tempObj['method']='SMARTWEIGHTUPDATE';
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        this.weightarray.splice(j,1);
      });
    }
  }

  getAllDimensions(){
    let tempObj={};
    tempObj['method']='SmartDimension'
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {
      this.dimensionarray=res.chartData;
      this.dimensiontable=true;
    });
  }

  updatedimension(i,j){
    if(this.selectedDimension===''){
      alert('Cannot add empty fields')
    }
    else{
      let tempObj={}
      tempObj['hbl']=this.selectedDimension;
      tempObj['ownerid']=i['_id'];
      tempObj['tablename']='';
      tempObj['method']='SMARTDIMENSIONUPDATE';
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        this.dimensionarray.splice(j,1);
      });
    }
  }

  generateReportAccount(){//threshhold is 295

    let data=this.handleF.removeDuplicates(this.tbl)
    let pager=1;
     let bigValueofY=0;
     var doc = new jsPDF()
     doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Account Details : ', 15, 15)//partyname
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
     doc.text('TruckNo', 22, y)//partyname
     doc.text('Account', 36, y)//partyname
     doc.text('Number', 66, y)//partyname
     doc.text('Other', 130, y)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(10, 20, 10, 25);//srno
     doc.line(35, 20, 35, 25);//date
     doc.line(63, 20, 63, 25);//truckno
     doc.line(128, 20, 128, 25);//credit
     doc.line(140, 25, 140, 25);//credit
     doc.line(152, 20, 152, 25);//credit
     //vertical lines
     let startforI=0;
     y = y + 6;
     startforI=0;
     for (let i = startforI; i < data.length; i++) {
 
       if(y>290){
         y=24;
         y=y+6;
     starty = 24;
         doc.addPage();
         doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Account Details : ', 15, 15)//partyname
     doc.setFontSize('10');
    //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 3, y-6)//partyname
     doc.text('TruckNo', 22, y-6)//partyname
     doc.text('Account', 36, y-6)//partyname
     doc.text('Account', 66, y-6)//partyname
     doc.text('Contact', 130, y-6)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(10, 20, 10, 25);//srno
     doc.line(35, 20, 35, 25);//date
     doc.line(63, 20, 63, 25);//truckno
     doc.line(128, 20, 128, 25);//credit
     //vertical lines
     }
     
      doc.text(String(i+1), 3, y)//partyname
      doc.text(data[i].truckno, 12, y)//partyname
     doc.text(data[i].truckno, 36, y)//partyname
     if(data[i].accountDetails[0]!==undefined){
     doc.text(data[i].accountDetails[0].accountName, 66, y)//partyname
     doc.text(String(data[i].accountDetails[0].accountNumber), 66, y+4)//partyname
     doc.text(data[i].accountDetails[0].ifsc, 66, y+8)//partyname
     }

                
       doc.line(0, y + 11, 210, y + 11);//line after header
       y = y + 15;
 
       
     //vertical lines//getting applied for every loop, make it happen once only
     doc.line(10, starty, 10, y-4);//srno
     doc.line(35, starty, 35, y-4);//date
     doc.line(63, starty, 63, y-4);//truckno
     doc.line(128, starty, 128, y-4);//credit
     //vertical lines
     }

     doc.save('Account-Details.pdf')
   }
}
