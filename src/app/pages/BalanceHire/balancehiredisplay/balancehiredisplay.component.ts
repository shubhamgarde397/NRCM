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
import { Button } from 'protractor';
import { DuesPageComponent } from '../../Dues/dues-page/dues-page.component';
import { templateSourceUrl } from '@angular/compiler';

@Component({
  selector: 'app-balancehiredisplay',
  templateUrl: './balancehiredisplay.component.html',
  styleUrls: ['./balancehiredisplay.component.css']
})
export class BalancehiredisplayComponent implements OnInit {
  public show = false;
  public found;
  public date = new Date();
  public balanceDate = [];
  public selectedDate;
  public role = 6;
  public admin = false;
  public printed: Boolean = true;
  public years = [];
  public createdDate = '';
  public displayoptions = [
    { 'value': '1', 'viewvalue': 'Balance Hire' },
    { 'value': '2', 'viewvalue': 'Check Prints' },
    { 'value': '3', 'viewvalue': 'Given Date' },
    { 'value': '4', 'viewvalue': 'Given Payment Pending' },
    { 'value': '5', 'viewvalue': 'Update Actual Payments' },
    { 'value': '6', 'viewvalue': 'Balance Message To Driver' },
    { 'value': '7', 'viewvalue': 'Update Advance Payments' },
    { 'value': '8', 'viewvalue': 'Advance Message To Driver' },
    { 'value': '9', 'viewvalue': 'Party Msg' }
  ]
  public months = [
    { '1': 'Jan' },
    { '2': 'Feb' },
    { '3': 'Mar' },
    { '4': 'Apr' },
    { '5': 'May' },
    { '6': 'Jun' },
    { '7': 'Jul' },
    { '8': 'Aug' },
    { '9': 'Sep' },
    { '10': 'Oct' },
    { '11': 'Nov' },
    { '12': 'Dec' },
  ]
  public actualMonths = [];
  public yeardiv = true;
  public monthdiv = false;
  public daydiv = false;
  public printInfo = false;
  public buttonValue: any = 'Balance Hire';
  public buttonOption = '0';
  public displayType;
  public data;
  public dayData;
  public givenTrucks;
  public givenTrucksPayment;
  public givenPaymentTable=false;
  public givenDate;
  public GPPMsg='Loading... Please Wait!'

  public selectedPochDate;
  public actualPayment=false;
  public actualPaymentTable=false;
  public fullpendingPayment=[];
  public paymentSettings=false;
  public saveArray=[
  ]
  public saveArrayData=false;
  public selectedPaymentDate='';
  public selectedPaymentAmount=0;
  public statusOfPoch='';
  public showpaymentButton=false;
  public defaultAmt=0;
  public ownerdetailslist;
  public showPDFButton=false;
  public fullPaymentDone=[];
  public updateMsgType='';

  public advAmt=0;
  public advDate='';
  public alltrucks=[];
  public contact='';
  public advancePayment=false;

  public advancePaymenttoTruck=false;
  public fullAdvDone=[];
  public updateMsgTypeA='';

  public fetchLoadedTruckTF=false;
  public currentLoadedParty=[];

  public pasteAndSend=false;
  public pasteAndSendV='';

  public commonArray;
  public considerArray;
  public gstdetailslist
  public fetchPartyTF=false;
  public partyName;
  public qr;
  public typeOfLoad;
  public dest1;
  public dest2;
public partyDetails;
public contactP;
public sentComments=[];
public bigI;
public duesButton=true;
public Dues=[];
public DuesT=[];
public dueChangeValue;
public addDueDetailsTF=false;
public dueInfo;
public dueInfoPending;

public dueMAmt;
public dueMDate;

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public excelService: ExcelService,
    public securityCheck: SecurityCheckService, public handleF: handleFunction) {
     
  }

  ngOnInit() {
  
    this.printInfo = false;
    this.balanceDate = this.securityCheck.commonBalanceHire.length > 0 ? this.securityCheck.commonBalanceHire : [];
    for (let i = 0; i < new Date().getFullYear() - 2020; i++) {
      this.years.push(i + 2021)
    }
    this.givenDate=this.handleF.createDate(new Date());
  }

  adminAccess() {
    this.admin = !this.admin;
  }

  fetchPendinActualPayments(){
    this.fullpendingPayment=[];
    this.saveArray=[]
    this.selectedPaymentAmount=0;
    this.selectedPaymentDate=''
    this.paymentSettings=false;
    this.showpaymentButton=false;
    this.saveArrayData=false;
    this.defaultAmt=0;

let formbody={}
formbody['method']='getTrucksWithNoActualPayment';
formbody['tablename']=''
formbody['selectedPochDate']=this.selectedPochDate;
    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, formbody, 0)
    .subscribe((res: any) => {
      this.fullpendingPayment=this.addBHAmount(res.Data);
      this.paymentSettings=true;
    });
    
  }
  copyAmount(){
    this.selectedPaymentAmount=this.defaultAmt;
  }

  addBHAmount(data){
    data.forEach(r=>{
      let arr=r['advanceArray']
      for(let i=0;i<arr.length;i++){
          if(arr[i]['reason']==='Balance'){
              r['BHAmount']=arr[i]['advanceAmt']
          }   
      }
  })
    return data
  }

  paymentDateAmount(){
    this.showpaymentButton=this.selectedPaymentDate==''?false:true;
    this.showpaymentButton=this.selectedPaymentAmount==0?false:true;
    this.showpaymentButton=this.statusOfPoch==''?false:true;
  }

  addtosavearray(i,j){
    this.saveArray.push(i)
    this.saveArrayData=true;
    this.fullpendingPayment.splice(j,1)
    this.defaultAmt=this.defaultAmt+parseInt((i['BHAmount']))
  }

  deletetosavearray(i,j){
    this.saveArray.splice(j,1)
    this.saveArrayData=this.saveArray.length>0?true:false;
    this.fullpendingPayment.push(i)
    this.defaultAmt=this.defaultAmt-parseInt((i['BHAmount']))
  }

  // sendDatatoUpdate(){
  //   let obj={}
  //   let saveArray2=[]
  //   this.saveArray.forEach(r=>{saveArray2.push(r._id)})
  //   obj['ids']=saveArray2;
  //   obj['paymentDate']=this.selectedPaymentDate;
  //   obj['paymentAmt']=this.selectedPaymentAmount;
  //   obj['statusOfPoch']=this.statusOfPoch;
  //   obj['tablename']='';
  //   obj['method']='updateActualPaymentDetails'
  //   this.apiCallservice.handleData_New_python
  //   ('commoninformation', 1, obj, 0)
  //   .subscribe((res: any) => {
  //     alert(res.Status);
  //     this.saveArray=[]
  //     this.selectedPaymentAmount=0;
  //     this.selectedPaymentDate=''
  //     this.defaultAmt=0;
  //   });
  // }

  sendDatatoUpdate(){
    let bigArray=[]
    let tempObj={}
    for(let i=0;i<this.fullpendingPayment.length;i++){
      if((<HTMLInputElement>document.getElementById('amt_'+i)).value===''){}
      else{
        let obj={}
        obj['ids']=this.fullpendingPayment[i]['_id'];
        obj['paymentDate']=(<HTMLInputElement>document.getElementById('date_'+i)).value;
        obj['paymentAmt']=parseInt((<HTMLInputElement>document.getElementById('amt_'+i)).value);
        obj['statusOfPoch']=(<HTMLInputElement>document.getElementById('status_'+i)).value;

        bigArray.push(obj)
          }
      }
      tempObj['array']=bigArray;
      tempObj['tablename']='';
      tempObj['method']='updateActualPaymentDetailsSingly'
    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, tempObj, 0)
    .subscribe((res: any) => {
      alert(res.Status);
      alert('Please Refresh!')
    });
  }

 

  findOption() {
    this.buttonOption = this.displayType;
    this.buttonValue = this.displayoptions[parseInt(this.displayType) - 1].viewvalue;
    this.yeardiv = true;
    this.monthdiv = false;
    this.daydiv = false;
    this.printInfo = this.buttonOption == '1' ? true : false;
    this.createdDate = '';
    this.buttonOption == '3'?this.getGivenDateTrucks():undefined;
    this.buttonOption == '4'?this.getGivenTrucksPayment():undefined;
this.actualPayment=this.buttonOption == '5'?true:false;
    
  }
  refresh(data){
    switch (data) {
      case '3':
        this.getGivenDateTrucks();    
        break;
    case '4':
      this.getGivenTrucksPayment();
      break;
      
    }
    
  }
  getGivenDateTrucks(){
    let formbody = {}
    formbody['method'] = 'givenEmpty';
    formbody['tablename'] = 't';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, formbody, 0)
      .subscribe((res: any) => {
        this.givenTrucks=res.Data;
      });
  
  }

  addtoGiven(id,j){
    if (confirm('Add to Given Date?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['givenDate']=this.givenDate;
      formbody['method'] = 'addGivenEmpty';
      formbody['tablename'] = 't';
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, formbody, 0)
        .subscribe((res: any) => {
          alert(res.Status);
          this.givenTrucks.splice(j,1);
        });
    }
  }

  showDatabyidTBEdit(data,j){
  
    this.show = true;
    let tempObj = {};

    tempObj['place'] = data.places[0] === undefined ? '' : data.places[0].village_name;
    tempObj['place2'] = data.places2[0] === undefined ? '' : data.places2[0].village_name;
    tempObj['truckno'] = data.trucks[0] === undefined ? '' : data.trucks[0].truckno;
    tempObj['partyName'] = data.parties[0] === undefined ? '' : data.parties[0].name;
    tempObj['ownerid'] = data.trucks[0] === undefined ? '' : data.trucks[0]._id;
    tempObj['accountDetails'] = data.trucks[0]['accountDetails'];
    tempObj['placeid'] = data.places[0] === undefined ? '' : data.places[0]._id;
    tempObj['placeid2'] = data.places2[0] === undefined ? '' : data.places2[0]._id;
    tempObj['partyid'] = data.parties[0] === undefined ? '' : data.parties[0]._id;
    tempObj['entryDate'] = data.entryDate;
    tempObj['_id'] = data._id;
    tempObj['partyType'] = data.partyType;
    tempObj['turnbookDate'] = data.turnbookDate;
    tempObj['loadingDate'] = data.loadingDate;
    tempObj['lrno'] = data.lrno === undefined ? '' : data.lrno;
    tempObj['hamt'] = data.hamt === undefined ? 0 : data.hamt;
    tempObj['pochDate'] = data.pochDate === undefined ? '' : data.pochDate;
    tempObj['givenDate'] = data.givenDate === undefined ? '' : data.givenDate;
    tempObj['pochPayment'] = data.pochPayment === undefined ? '' : data.pochPayment;
    tempObj['pgno'] = data.pgno === undefined ? '' : data.pgno;
    tempObj['payment'] = data.paymentDetails;
    tempObj['paymentDisabled']=false;
    tempObj['index'] = j;
    tempObj['number'] = '1';
    tempObj['invoice'] = data.invoice;
    tempObj['locations'] = data.locations;
    tempObj['locationDate'] = data.locationDate;
    tempObj['complete'] = data.complete;
    tempObj['typeOfLoad'] = data.typeOfLoad;
    tempObj['waitLocation'] = data.waitLocation;
    tempObj['advanceArray'] = data.advanceArray;
    tempObj['qr'] = data.qr;
    this.handledata.saveupdateTurn(false)


    this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookUpdate']);
    this.handledata.saveData(tempObj);
  };

  
  getGivenTrucksPayment(){
    let formbody = {}
    formbody['method'] = 'givenPaymentPending';
    formbody['tablename'] = 't';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, formbody, 0)
      .subscribe((res: any) => {
        this.givenTrucksPayment=res.Data;
        this.givenPaymentTable=res.Data.length>0?true:false;
        this.GPPMsg=res.Data.length>0?'':'No Pending Payments'
      });
  }

  find = function () {
    this.duesButton=true;
    let tempObj = {};
    if (this.selectedDate === undefined) {
      this.selectedDate = this.handleF.getDate(this.date.getDate(), (this.date.getMonth() + 1), this.date.getFullYear());
      tempObj['createdDate'] = this.selectedDate;
    } else {
      tempObj['createdDate'] = this.selectedDate;
    }
    tempObj['method'] = 'BalanceHireDisplay';
    tempObj['tablename'] = 'BalanceHire';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj, 0)
      .subscribe((res:any) => {
        this.showPDFButton=true;
        this.printInfo = true;
        this.balanceDate = [];
        this.balanceDate = this.accE(res.balanceData);
        this.Dues=res.Dues;
        this.DuesT=res.DuesT;
        this.findDues(res);
        this.securityCheck.commonBalanceHire = res.balanceData;
        this.printed = res.balanceData.length > 0 ? res.balanceData[0].print : true;
      });
  };

  findDues(data){
    let boids=[]
    let doids=[]
    data.balanceData.forEach(r=>{r['truckData'].forEach(y=>{boids.push(y['ownerid'])})})


    data.Dues.forEach(r=>{doids.push(r['ownerid'])})
    doids.every(r=>{
      boids.every(y=>{
          if(r===y){
            this.duesButton=false;
              return false;
          }
          return true;//means continue the loop
      })
      return true;//means continue the loop
    })
// if data is true it means no dues, if data is false it means dues are there
  }

  getDues(){
    this.balanceDate.forEach(r=>{
      r.truckData.forEach(s=>{
          
          s['dues']=this.Dues.filter(t=>{
              return t.truckno===s.truckno 
          })
          
      })
      
  })
  }

  dueChange(){
let a=this.dueChangeValue.split('_')
this.addDueDetailsTF=true;
this.dueInfo=this.balanceDate[a[0]]['truckData'][a[1]]['dues'][a[2]]
this.dueInfoPending=this.balanceDate[a[0]]['truckData'][a[1]]['dues'][a[2]]['pending']
  }
  storeDue(){
    if(this.dueMAmt>this.dueInfoPending){
      alert('Due amount cant be greater than pending amount.')
    }
    else if(this.dueMAmt===0){alert('Due amount cant be 0.')}
    else if(this.dueMAmt<=this.dueInfoPending){
    let a=this.dueChangeValue.split('_')
let bhid=this.balanceDate[a[0]]['_id']
let tbid=this.balanceDate[a[0]]['truckData'][a[1]]['tbid']
let oid=this.balanceDate[a[0]]['truckData'][a[1]]['ownerid']
let duesid=this.balanceDate[a[0]]['truckData'][a[1]]['dues'][a[2]]['_id']
let duesdate=this.balanceDate[a[0]]['truckData'][a[1]]['dues'][a[2]]['date']

    let tempObj={
      'bhid':bhid,
      'tbid':tbid,
      'oid':oid,
      'duesid':duesid,
      'dueDate':this.dueMDate,
      'dueAmt':this.dueMAmt,
      'totalDue':this.balanceDate[a[0]]['truckData'][a[1]]['dues'][a[2]]['amt'],
      'duesDate':duesdate,
      'type':'due',
      'msg':'Loan',
      'tsrno':String(parseInt(a[1])+1),
      'tablename':'',
      'method':'DuesUpdateFromBH'
    }

    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, tempObj, 0)
    .subscribe((res: any) => {
      alert(res.Status)
    });
  }
  }

  
  accE(data){
    data.forEach(r=>{r['available']=r['acc'+String(r.commentToTruck.split(' ')[0])]?'':'X'})
      return data
    }

    setComments(i){
      this.sentComments=i.commentToTruck2;
      this.bigI=i;
    }

  find2(data, type, set = true) {
    if (set) {
      switch (type) {
        case 'year':
          this.createdDate = this.createdDate + data;
          this.yeardiv = false;
          this.monthdiv = true;
          break;
        case 'month':

          this.createdDate = this.createdDate + '-' + this.handleF.generate2DigitNumber(String(data['number']));
          this.monthdiv = false;
          this.daydiv = true;
          break;
        case 'day':
          this.createdDate = this.createdDate + '-' + data['_id'].slice(8);
          this.daydiv = false;
          this.printInfo = true;
          break;
      }
    }
    this.actualMonths = [];
    let tempObj = {};
    tempObj['method'] = 'BalanceHireDisplay';
    tempObj['tablename'] = 'BalanceHire';
    tempObj['createdDate'] = type === 'year' ? '^' + data + '.*' : type === 'month' ? this.createdDate : type === 'day' ? this.createdDate : null;
    tempObj['type'] = type;
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        if (type === 'year') {
          res.balanceData.forEach((res) => {
            let temp = {}
            temp['name'] = res['name'];
            temp['number'] = res['_id'];
            temp['count'] = res['data']
            temp['print'] = res['print']
            this.actualMonths.push(temp)
          });
        }
        else if (type === 'month') {
          this.dayData = res.balanceData;
        }
        else {
          this.balanceDate = res.balanceData;
        }
        this.printed = res.balanceData.length > 0 ? res.balanceData[0].print : true;
        this.selectedDate=this.createdDate;
      })
  }

  deleteBH(data) {
    if (confirm('Are you sure?')) {
      data['comments'] = data['comments'] === 'cancel' ? '' : 'cancel';
      data['method'] = 'update';
      data['tablename'] = 'BalanceHire';
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, data, 0)
        .subscribe((res: any) => {
          this.balanceDate.find(r => r._id == data._id)['comments'] = data['comments'];
        });
    }
  }

  tempDelete(data){
if(confirm('Do you want to temporary delete it?')){
  this.balanceDate.splice(data,1);
}
  }
  printUpdate() {
    let data = {};
    if (confirm('Document printed?')) {
      data['method'] = 'update';
      data['tablename'] = 'BalanceHire';
      data['todayDateToPrint'] = this.selectedDate;
      data['print'] = true;
      data['part'] = 0;
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, data, 0)
        .subscribe((res: any) => {
          alert(res.Status);
          this.printed = !this.printed;
        });
    } else { }
  }

  fetchDonePayments(){
    let data = {};
      data['method'] = 'bhMessageData';
      data['tablename'] = '';

      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, data, 0)
        .subscribe((res: any) => {
          this.fullPaymentDone=res.chartData;
          this.actualPaymentTable = true;
        });
  }
  fetchDonePaymentsAdv(){
    let data = {};
      data['method'] = 'displayTruckstoSendAdvanceMsg';
      data['tablename'] = '';

      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, data, 0)
        .subscribe((res: any) => {
          this.fullAdvDone=res.chartData;
          this.advancePaymenttoTruck = true;
        });
  }
  
  fetchLoadedTruck(){
    let data = {};
      data['method'] = 'displayTruckstoSendPartyMsg';
      data['tablename'] = '';

      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, data, 0)
        .subscribe((res: any) => {
          this.currentLoadedParty=res.chartData;
          this.fetchLoadedTruckTF = true;
          this.fetchPartyTF=false;
          this.pasteAndSend=false;
        });
  }

  updatePaymentMsgParty(i,index){
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = i._id;
      formbody['method'] = 'updateMsgTypeForParty';
      formbody['tablename'] = '';

      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, formbody, 0)
        .subscribe((res: any) => {
          alert(res.Status);
          this.currentLoadedParty.splice(index,1);
        });
    }
  }

  downloadEmptyContacts(){//threshhold is 295
    var doc = new jsPDF()
    let data=this.fullPaymentDone.filter(r=>{return r.contact.length==0});
    doc.setFontType('bold');
    doc.setFontSize('10');
    doc.setLineWidth(0.5);
    //headers
    let y = 4;
    doc.text('Sr', 0.5, y)//partyname
    doc.text('Date', 10.5, y)//partyname
    doc.text('TruckNo', 10.5, y+4)//partyname
    doc.text('Name', 45, y)//partyname
    doc.text('Contact', 78, y)//partyname

    doc.text('Sr', 105.5, y)//partyname
    doc.text('Date', 115.5, y)//partyname
    doc.text('TruckNo', 115.5, y+4)//partyname
    doc.text('Name', 150, y)//partyname
    doc.text('Contact', 183, y)//partyname

    doc.line(0, 9, 210, 9);//line after main header
    //headers

    y=10
    let newpage=0;
    for (let i = 0; i < data.length; i++) {

     if(y>290){
       newpage=newpage+1;
       doc.line(105, 0, 105, 300);//mid line
       doc.line(8, 0, 8, 300);//mid line
       doc.line(40, 0, 40, 300);//mid line
       doc.line(75, 0, 75, 300);//mid line
       doc.line(113, 0, 113, 300);//mid line
       doc.line(145, 0, 145, 300);//mid line
       doc.line(180, 0, 180, 300);//mid line
       if(newpage===2){
       doc.addPage();
       newpage=0;
       doc.setFontType('bold');
       doc.setFontSize('10');
       doc.setLineWidth(0.5);
       //headers
       y = 4;
       doc.text('Sr', 0.5, y)//partyname
       doc.text('Date', 10.5, y)//partyname
       doc.text('TruckNo', 10.5, y+4)//partyname
       doc.text('Name', 45, y)//partyname
       doc.text('Contact', 78, y)//partyname

       doc.text('Sr', 105.5, y)//partyname
       doc.text('Date', 115.5, y)//partyname
       doc.text('TruckNo', 115.5, y+4)//partyname
       doc.text('Name', 150, y)//partyname
       doc.text('Contact', 183, y)//partyname

       doc.line(0, 9, 210, 9);//line after main header
       //headers
       y=10
       //vertical lines
       }
y=10
   }
   if(newpage===0){
    doc.text(this.handleF.generate2DigitNumber(String(i+1)), 0.5, y+4)//partyname
    doc.text(data[i].truckno, 10.5, y+4)//partyname
     doc.text(this.handleF.getDateddmmyy(data[i].loadingDate), 10.5, y+8)//partyname
       
     doc.line(0, y+9, 105, y+9);//line after main header
     y = y + 9;
   }
if(newpage===1){
  doc.text(this.handleF.generate2DigitNumber(String(i+1)), 105.5, y+4)//partyname
  doc.text(data[i].truckno, 115.5, y+4)//partyname
  doc.text(this.handleF.getDateddmmyy(data[i].loadingDate),115.5 , y+8)//partyname
    
  doc.line(105, y+9, 210, y+9);//line after main header
  y = y + 9;
}
  
    }

    doc.line(105, 0, 105, y);//mid line
    doc.line(8, 0, 8, y);//mid line
    doc.line(40, 0, 40, y);//mid line
    doc.line(75, 0, 75, y);//mid line
    doc.line(113, 0, 113, y);//mid line
    doc.line(145, 0, 145, y);//mid line
    doc.line(180, 0, 180, y);//mid line
    doc.save('Contact-Details.pdf')
  }
  sendMsg(no,type,data){
    let bal=data.advanceArray.find(r=>{return r.reason==='Balance'})
  let msg=''
  msg=msg+'*****%20%20*Balance%20Payment%20Details*%20%20*****%0A%0A'
  msg=msg+'*TruckNo*%20:%20'+data.truckno.replace(/\s/g, "%20")+'%0A'
  msg=msg+'*Loading*%20Date%20:%20'+this.handleF.getDateddmmyy(data.loadingDate)+'%0A'
  msg=msg+'*Load*%20:%20'+data.typeOfLoad+'%0A'
  msg=msg+'*Destination*%20:%20'+data.vsname+'%20'+(data.vsname2?data.vsname2:'')+'%0A'
  msg=msg+'*Status%20of%20Delivery*%20:%20'+data.statusOfPoch+'%0A'
  msg=msg+'*Balance%20Amount*%20:%20'+(bal?bal.advanceAmt:'')+'%0A%0A'
  msg=msg+'*%20*Payment%20Details*%20*%0A%0A'
  msg=msg+'*Payment%20Amount*%20:%20'+data.actualPaymentAmount+'%0A'
  msg=msg+'*Payment%20Date*%20:%20'+this.handleF.getDateddmmyy(data.actualPaymentDate)+'%0A%0A%0A'
  msg=msg+'*%20*Account%20Details*%20*%0A%0A'
  msg=msg+'*Accname*%20:%20'+(bal?bal.BHAccname.replace(/\s/g, "%20"):'')+'%0A'
  msg=msg+'*AccNo*%20:%20'+(bal?bal.BHAccNo:'')+'%0A'
  msg=msg+'*IFSC*%20:%20'+(bal?bal.BHIFSC:'')+'%0A%0A'
  msg=msg+'*Nitin%20Roadways%20and%20Cargo%20Movers*%0A'
  msg=msg+'*Pune*%0A'
  msg=msg+'9822288257%0A'
  msg=msg+'9766707061%0A'
    switch (type) {
      case 'wa':
          window.open('https://wa.me/+91'+no+'/?text='+msg,'_blank');  
        break;
        case 'txt':
          window.open('sms:+91'+no+'?body='+msg,'_blank');    
        break;
    }
  }

  fetchparty(){
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogst')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.gstdetailslist = this.commonArray.gstdetails;
    this.fetchPartyTF=true;
    this.fetchLoadedTruckTF=false;
    this.pasteAndSend=false;
  }

  fetchpasteAndSend(){
    this.fetchPartyTF=false;
    this.fetchLoadedTruckTF=false;
    this.pasteAndSend=true;
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.gstdetailslist = [];
    this.gstdetailslist = this.commonArray.gstdetails;
  }

  setPartyName() {
    this.partyDetails=this.gstdetailslist[this.partyName.split('+')[1]]
    this.contactP=this.partyDetails.contact[0];
  }

  Whatsapp(){
    let data={}
    data['truckno']=(<HTMLInputElement>document.getElementById('truck_000')).value;
    data['dest1']=this.dest1;
    data['dest2']=this.dest2;
    data['contact']=(<HTMLInputElement>document.getElementById('contact_000')).value
    data['typeOfLoad']=this.typeOfLoad;
    data['qr']=this.qr;

    this.sendMsgP(this.contactP,'',data,0,2)
  }



  getTruckDetails(){
    let temp={}
    temp['truckno']=(<HTMLInputElement>document.getElementById('truck_000')).value;
    temp['tablename']='';
    temp['method']='getTruckContact';
    this.apiCallservice.handleData_New_python('commoninformation', 1, temp, 0)
      .subscribe((res: any) => {
        (<HTMLInputElement>document.getElementById('contact_000')).value=res.Data[0]
      });
  }

  sendMsgA(no,type,data){
    let r=data.rc?'':'RC'
    let l=data.lc?'':'License'
    let p=data.pan?'':'PAN'
    let shall=(data.rc&&data.lc&&data.pan);
    let doc=(data.rc?'':'%20RC')+(data.lc?'':'%20License')+(data.pan?'':'%20PAN')
    let bal=data.advanceArray.find(r=>{return r.reason==='Advance'})
    let msg=''
    msg=msg+'*NITIN%20ROADWAYS%20AND%20CARGO%20MOVERS*%0A%0A'
    msg=msg+'*****%20%20*Advance%20Payment%20Details*%20%20*****%0A%0A'
    msg=msg+'*TruckNo*%20:%20'+data.truckno.replace(/\s/g, "%20")+'%0A%0A'
    msg=msg+'*%20*Advance%20Details*%20*%0A%0A'
    msg=msg+'*Advance%20Amount*%20:%20'+bal.advanceAmt+'%0A'
    msg=msg+'*Advance%20Date*%20:%20'+this.handleF.getDateddmmyy(bal.advanceDate)+'%0A%0A'
    msg=msg+'*%20*Account%20Details*%20*%0A%0A'
    msg=msg+'*Accname*%20:%20'+data.accountDetails[0].accountName.replace(/\s/g, "%20")+'%0A'
    msg=msg+'*AccNo*%20:%20'+data.accountDetails[0].accountNumber+'%0A'
    msg=msg+'*IFSC*%20:%20'+data.accountDetails[0].ifsc+'%0A%0A'
    if(!shall){
    msg=msg+'Unga%20Vandika%0A*'+doc+'*%0ASend%20Pananga%0A%0A';
    }
    msg=msg+'*Nitin%20Roadways%20and%20Cargo%20Movers*%0A'
    msg=msg+'*Pune*%0A'
    msg=msg+'9822288257%0A'
    msg=msg+'9766707061%0A'
      switch (type) {
        case 'wa':
            window.open('https://wa.me/+91'+no+'/?text='+msg,'_blank');  
          break;
          case 'txt':
            window.open('sms:+91'+no+'?body='+msg,'_blank');    
          break;
      }
    }

    sendMsgP(no,type,data,j,option){
      let contactD;
      let qr;
      if(option===1){
        contactD=(<HTMLInputElement>document.getElementById('contact_'+j)).value+'%0A'
        qr=(<HTMLInputElement>document.getElementById('qr_'+j)).value+'%0A%0A';
      }else if(option===2){
        contactD=data['contact']+'%0A'
        qr=data['qr']+'%0A%0A';
      }
      let msg=''
      msg=msg+'*Nitin%20Roadways%20and%20Cargo%20Movers*%0A%0A'
      msg=msg+'*TruckNo*%20:%20'+data.truckno.replace(/\s/g, "%20")+'%0A'
      msg=msg+'*Destination*%20:%20'+data.dest1;
      msg=msg+(data.dest2?('/'+data.dest2+'%0A'):'%0A');
      msg=msg+'*Contact*%20:+%20+91%20'+contactD
      
      
      switch (data.typeOfLoad) {
        case 'Other':
          msg=msg+'%0AThe above truck has been dispatched.'
          break;
          case 'Pipe':
            msg=msg+'*QR*%20:%20'+qr;
            msg=msg+'The above truck has been dispatched from Urse Plant.'
          break;
          case 'Fittings':
            msg=msg+'*QR*%20:%20'+qr
            msg=msg+'The above truck has been dispatched from Talegaon Fittings Plant.'
          break;
      }
      msg=msg+'%0A%0A';
      msg=msg+'*Nitin%20Roadways%20and%20Cargo%20Movers*%0A'
      msg=msg+'*Pune*%0A'
      msg=msg+'9822288257%0A'
      msg=msg+'9766707061%0A'
      window.open('https://wa.me/+91'+no+'/?text='+msg,'_blank');  
            
      }

      Whatsapp2(){
        let a =this.pasteAndSendV.split('\t');
        let data={}
        data['truckno']=a[1];
        data['dest1']=a[5];
        data['dest2']=a[6];
        data['contact']=a[2]
        data['typeOfLoad']=a[3];
        data['qr']=a[7];
        this.sendMsgPT(a[8],data)
      }

      sendMsgPT(no,data){
        let contactD=data['contact']+'%0A'
        let qr=data['qr']+'%0A%0A';
        let msg=''
        msg=msg+'*Nitin%20Roadways%20and%20Cargo%20Movers*%0A%0A'
        msg=msg+'*TruckNo*%20:%20'+data.truckno.replace(/\s/g, "%20")+'%0A'
        msg=msg+'*Destination*%20:%20'+data.dest1;
        msg=msg+(data.dest2?('/'+data.dest2+'%0A'):'%0A');
        msg=msg+'*Contact*%20:+%20+91%20'+contactD
        
        
        switch (data.typeOfLoad) {
            case 'Pipe':
              msg=msg+'*QR*%20:%20'+qr;
              msg=msg+'The above truck has been dispatched from Urse Plant.'
            break;
            case 'Fittings':
              msg=msg+'*QR*%20:%20'+qr
              msg=msg+'The above truck has been dispatched from Talegaon Fittings Plant.'
            break;
        }
        msg=msg+'%0A%0A';
        msg=msg+'*Nitin%20Roadways%20and%20Cargo%20Movers*%0A'
        msg=msg+'*Pune*%0A'
        msg=msg+'9822288257%0A'
        msg=msg+'9766707061%0A'
        window.open('https://wa.me/+91'+no+'/?text='+msg,'_blank');
              
        }

  updatePaymentMsg(i,index){
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = i._id;
      formbody['method'] = 'updateMsgTypeForBalance';
      formbody['tablename'] = '';
      formbody['typeOfMessage'] = this.updateMsgType;

      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, formbody, 0)
        .subscribe((res: any) => {
          alert(res.Status);
          this.fullPaymentDone[index][this.updateMsgType]=true;
          this.fullPaymentDone.splice(index,1);
        });
    }
  }

  forse(i,index){
    this.updateMsgType='pmtMsgText';
    this.updatePaymentMsg(i,index);
    
  }
  updatePaymentMsgAdv(i,index){
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = i._id;
      formbody['method'] = 'updateMsgTypeForAdvance';
      formbody['tablename'] = '';
      formbody['advanceMsg'] = this.updateMsgTypeA;

      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, formbody, 0)
        .subscribe((res: any) => {
          alert(res.Status);
          this.fullAdvDone[index][this.updateMsgTypeA]=true;
          this.fullAdvDone.splice(index,1);
        });
    }
  }

  deleteBHComplete(data, j) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = data._id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'BalanceHire';
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, formbody, 0)
        .subscribe((res: any) => {
          this.balanceDate.splice(j, 1);
        });
    }
  }

  showDatabyidEditForm(data, j) {
    this.show = true;
    this.found = data;
    data['index'] = j;
    data['editOption'] = 1;
    data['truckData'].map(r=>{r.field=true;})
    data['commentToTruck']=data['commentToTruck']

    
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/BALANCE_HIRE_HANDLER/UpdateSingle']);
  }

  updateComments(){
    let msg1=(<HTMLInputElement>document.getElementById('msg')).value;
    let no1=(<HTMLInputElement>document.getElementById('no')).value;
    let tsrno1=(<HTMLInputElement>document.getElementById('tsrno')).value;
    let letsgo=false;
      if(msg1!==''&&no1!==''&&tsrno1!==''){
        letsgo=true;
      }

    if(letsgo){
    let formbody = {}
    formbody['_id'] = this.bigI._id;
    formbody['method'] = 'BalanceHireCommentUpdate';
    formbody['tablename'] = 'BalanceHire';
    formbody['commentToTruck2']={'msg':msg1,'no':no1,'tsrno':tsrno1,'type':'balance'};

    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, formbody, 0)
    .subscribe((res: any) => {
      alert(res.Status)
    });
  }
  else{
    alert('Update cancelled.')
  }
  }

  clearComments(i,j){
    let formbody = {}
    formbody['_id'] = this.bigI._id;
    formbody['index'] = j;
    formbody['method'] = 'BalanceHireClearComment';
    formbody['tablename'] = 'BalanceHire';

    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, formbody, 0)
    .subscribe((res: any) => {
      alert(res.Status)
      alert('Please refresh!')
    });
  }

  getValueofI(a) {
    let I = 16;
    let l;
    for (let i = 0; i < a.length; i) {


      let x = parseInt(a[i]);

      let l = parseInt(a[i + 1]);

      let X = parseInt(a.slice(i + 2, i + 2 + l));

      I = I + ((6 * X) * (x + 2))

      i = i + l + 2
    }


    return I;
  }

  downloadGPP()
  {//threshhold is 295
 
    
    
    let data=this.givenTrucksPayment;
 
    let pager=1;
     let bigValueofY=0;
     var doc = new jsPDF()
     doc.line(0, 148.2, 5, 148.2);//punching line helper
     doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Payment Pending', 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     //headers
     doc.setFontSize('10');
     let y = 24;
     let starty = 25;
     doc.text('Sr', 2, y)//partyname
     doc.text('TruckNo', 8, y)//partyname
     doc.text('Date', 34, y)//partyname
     doc.text('Party', 56, y)//partyname
     doc.text('Place', 95, y)//partyname
     doc.text('Notes', 145, y)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(7, 20, 7, 25);//srno
     doc.line(33, 20, 33, 25);//truck
     doc.line(55, 20, 55, 25);//date
     doc.line(94, 20, 94, 25);//village
     doc.line(144, 20, 144, 25);//village
     //vertical lines
     let startforI=0;
     y = y + 6;
     startforI=0;
     for (let i = startforI; i < data.length; i++) {
 
       if(y>290){
        
         y=30;
     starty = 25;
     doc.line(7, starty, 7, 292);//date
        doc.line(33, starty,33, 292);//truckno
        doc.line(55, starty, 55, 292);//credit
        doc.line(94, starty, 94, 292);//village
        doc.line(144, starty, 144, 292);//village
         doc.addPage();
         doc.line(0, 148.2, 5, 148.2);//punching line helper
         doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Payment Pending', 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 2, y-6)//partyname
     doc.text('TruckNo', 8, y-6)//partyname
     doc.text('Date', 34, y-6)//partyname
     doc.text('Party', 56, y-6)//partyname
     doc.text('Place', 95, y-6)//partyname
     doc.text('Notes', 145, y-6)//partyname
     //headers
     //vertical lines
     doc.line(7, 20, 7, 25);//srno
     doc.line(33, 20, 33, 25);//truck
     doc.line(55, 20, 55, 25);//date
     doc.line(94, 20, 94, 25);//village
     doc.line(144, 20, 144, 25);//village
     //vertical lines
     doc.line(0, 25, 210, 25);//line after header
     }
     
    doc.text(this.handleF.generate2DigitNumber(String(i+1)), 2, y-1)//partyname
    doc.text(data[i].trucks[0].truckno, 8, y-1)//partyname
    doc.text(this.handleF.getDateddmmyy(data[i].loadingDate), 34, y-1)//Date  
    doc.text(this.handleF.getDateddmmyy(data[i].givenDate), 34, y+2)//Date              
    doc.text(data[i].parties[0].name.slice(0,16), 56, y-1)//Destination
    doc.text(data[i].places[0].village_name.slice(0,16), 95, y-1)//Destination
    doc.line(0, y +4, 210, y +4);//line after header
       y = y + 8;
       
     }
        //vertical lines//getting applied for every loop, make it happen once only
        doc.line(7, starty, 7, y-4);//date
        doc.line(33, starty,33, y-4);//truckno
        doc.line(55, starty, 55, y-4);//credit
        doc.line(94, starty, 94, y-4);//village
        doc.line(144, starty, 144, y-4);//village
        //vertical lines

    //  doc.save('Available-Data.pdf')
     doc.save('GPP.pdf')//partyname
   }
   download(dataTF) {//threshhold is 295

    let i;
    if (confirm('Fresh Page?')) {
      i = 16;
    } else {
      let z = '';
      let str = "";
      while (z != null) {
        z = prompt('Enter Truck Numbers');
        if (z.length > 1) {
          alert('Cannot have more than 9 trucks, Please enter lesser value or print on new page.')
        } else {
          if (z == null || z == "") {
            break;
          }
          str = str + z + "11";
        }
      }



      i = this.getValueofI(str) + 16;
    }
    if (i > 280) {
      i = 16;
    }


    let pageno = 1;
    let dateFormat = this.balanceDate[0].todayDate.slice(8, 10) + '-' + this.balanceDate[0].todayDate.slice(5, 7) + '-' + this.balanceDate[0].todayDate.slice(0, 4);
    let totalAmount=0;
    var doc = new jsPDF();
    doc.line(0, 148.2, 5, 148.2);//punching line helper
    //Static Part Start
    //Date
    doc.setFontSize('10');
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text(dateFormat, 90, i + 5 - 16)
    doc.text(String(pageno), 190, i + 5 - 16)
    pageno = pageno + 1;
    let pageStopper = i+5-16;
    //Date
    //line after date
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(0, i + 6 - 16, 210, i + 6 - 16);
    //line after date
    //5 vertical lines for amount, comments, pageno,date,trucno, account details(account details is further divided into 3 parts per data need a loop here)
    //vertical line after date
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(37, i + 6 - 16, 37, i + 12 - 16);
    doc.line(61, i + 6 - 16, 61, i + 12 - 16);
    // doc.line(72, i + 6 - 16, 72, i + 12 - 16);
    doc.line(83, i + 6 - 16, 83, i + 12 - 16);
    doc.line(146, i + 6 - 16, 146, i + 12 - 16);


    //vertical line after date till headers
    //Headers
    doc.setFontSize('10');
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Amount', 16, i + 10 - 16)
    doc.text('Comments', 38, i + 10 - 16)
    // doc.text('Pg', 63, i + 10 - 16)
    doc.text('Date', 63, i + 10 - 16)
    doc.text('TruckNo', 83, i + 10 - 16)
    if(!dataTF){
    doc.text('Payment Details', 111.5, i + 10 - 16)
    }

    doc.text('Account Details', 146.5, i + 10 - 16)
    //Headers End
    //Line after headers
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(0, i + 12 - 16, 210, i + 12 - 16);
    //Line after headers
    //Static Part End
    //Dynamic Part Start
    doc.setFontSize('10');
    doc.setFontType('normal');
    doc.setTextColor(0, 0, 0);
    // doc.text('Shubham is awesome', 1, i);
    for (let z = 0; z < this.balanceDate.length; z++) {
      totalAmount=0;
      let data = this.balanceDate[z].truckData;


      if (((data.length * 6) + 15 + i) > 295) {
        doc.text('->', 192, pageStopper)
        doc.addPage();
        doc.line(0, 148.2, 5, 148.2);//punching line helper
        //Static Part Start
        //Date
        doc.setFontSize('10');
        doc.setFontType('bold');
        doc.setTextColor(0, 0, 0);
        doc.text(dateFormat, 90, 5)
        doc.text(String(pageno), 190, 5)
        pageStopper = 5;
        pageno = pageno + 1;
        //Date
        //line after date
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(0, 6, 210, 6);
        //line after date
        //5 vertical lines for amount, comments, pageno,date,trucno, account details(account details is further divided into 3 parts per data need a loop here)
        //vertical line after date
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(37, 6, 37, 12);

        doc.line(61, 6, 61, 12);
        // doc.line(72, 6, 72, 12);

        doc.line(83, 6, 83, 12);
        doc.line(146, 6, 146, 12);
        //vertical line after date
        //Headers
        doc.setFontSize('10');
        doc.setFontType('bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Amount', 16, 10)
        doc.text('Comments', 38, 10)
        // doc.text('Pg', 63, 10)
        doc.text('Date', 63, 10)
        doc.text('TruckNo', 83, 10)

        if(!dataTF){
          doc.text('Payment Details', 111.5, 10)
          }

        doc.text('Account Details', 146.5, 10)
        //Headers End
        //Line after headers
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(0, 12, 210, 12);
        //Line after headers
        //Static Part End
        //Dynamic Part Start
        doc.setFontSize('10');
        doc.setFontType('normal');
        doc.setTextColor(0, 0, 0);
        i = 16;
      }



      let K = 0
      let accountI=i;
      doc.setFontSize('10');
      if(dataTF){
        doc.text(String(this.balanceDate[z].commentToTruck).split(' ')[0], 38.5, i);//comments

      }
      for (let k = 0; k < data.length; k++) {
        doc.setFontSize('10');
        doc.text(String(this.balanceDate[z].truckData[k].amount), 16, i);//amount

        doc.setFontSize('10');
        // if(dataTF){
        // doc.text(String(this.balanceDate[z].truckData[k].pageno), 61.5, i);//pgno
        // }
        doc.setFontSize('10');
        doc.text(this.balanceDate[z].truckData[k].date.slice(8, 10) + '/' + this.balanceDate[z].truckData[k].date.slice(5, 7) + '/' + this.balanceDate[z].truckData[k].date.slice(0, 4), 63, i);//date
        doc.setFontSize('10');
        doc.text(this.balanceDate[z].truckData[k].truckno.split(' ').join(''), 83.5, i);//truckno
        doc.setFontSize('8');
        if(dataTF){
        doc.text(this.balanceDate[z].truckData[k].shortDetails?this.balanceDate[z].truckData[k].shortDetails:'', 108, i);//truckno
        doc.text(this.balanceDate[z].truckData[k].Prd, 142, i);//truckno
        }        

        doc.setFontSize('10');
        K = k;
        i = i + 6;
        totalAmount=totalAmount+this.balanceDate[z].truckData[k].amount;
      }
      if(data.length>1){
      doc.line(5, i-4, 32, i-4);
      doc.text(String(totalAmount),16,i)
      }
      let bigK=0
      for (let k = 0; k < this.balanceDate[z].commentToTruck2.length; k++) {
        if(k==0){
        doc.setLineDash([0.5, 1], 10);
        doc.line(37, i-4, 146, i-4);
        doc.setLineDash([1, 0], 10);
        }
        doc.setFontSize('8')
        if(dataTF){
        if(String(this.balanceDate[z].commentToTruck2[k]['type'])==='balance'){
          doc.text(String(this.balanceDate[z].commentToTruck2[k]['msg']), 38.5, i+k+1);//comments
          doc.text('How many : '+String(this.balanceDate[z].commentToTruck2[k]['no']),72.5,i+k+1);
          doc.text('Truck Sr.'+String(this.balanceDate[z].commentToTruck2[k]['tsrno']), 92.5, i+k+1);//comments
        }
        else if(String(this.balanceDate[z].commentToTruck2[k]['type'])==='due'){
          doc.text(String(this.balanceDate[z].commentToTruck2[k]['msg'])+' -Total Due -', 38.5, i+k+1);//comments
          doc.text(String(this.balanceDate[z].commentToTruck2[k]['totalDue']),61.5,i+k+1)
          doc.text('Due : '+String(this.balanceDate[z].commentToTruck2[k]['no']),72.5,i+k+1);
          doc.text('Truck Sr.'+String(this.balanceDate[z].commentToTruck2[k]['tsrno'])+'  Due Date : '+String(this.balanceDate[z].commentToTruck2[k]['dueDate'].slice(8, 10) + '/' + this.balanceDate[z].commentToTruck2[k]['dueDate'].slice(5, 7) + '/' + this.balanceDate[z].commentToTruck2[k]['dueDate'].slice(0, 4)), 92.5, i+k+1);//comments
        } 
        }

        i = i + 2;
        bigK=k;
      }

      let adder=0
      if(this.balanceDate[z].commentToTruck2.length>5){
        adder=this.balanceDate[z].truckData.length===1?0:this.balanceDate[z].truckData.length+this.ls(this.balanceDate[z].commentToTruck2.length);
      }

      doc.line(0, i + 7-(bigK*2)+adder, 210, i + 7-(bigK*2)+adder);
      doc.line(37, i - (data.length * 6) -11-(bigK*2), 37, i + 7-(bigK*2)+adder);

      doc.line(61, i - (data.length * 6) -11-(bigK*2), 61, i + 7-(bigK*2)+adder);
      // doc.line(72, i - (data.length * 6) -11-(bigK*2), 72, i + 7-(bigK*2)+adder);

      doc.line(83, i - (data.length * 6) -11-(bigK*2), 83, i + 7-(bigK*2)+adder);
      doc.line(146, i - (data.length * 6) -11-(bigK*2), 146, i + 7-(bigK*2)+adder);

  
      doc.setFontSize('10');
      if(this.balanceDate[z].update){}else{
      // doc.text(this.balanceDate[z].accountName, 156.5, i - (data.length * 6));//accno
      // doc.text(String(this.balanceDate[z].accountNumber), 156.5, i + 6 - (data.length * 6));//accname
      // doc.text(this.balanceDate[z].ifsc + '-' + this.balanceDate[z].bankName, 156.5, i + 12 - (data.length * 6));//ifsc-bankname
      doc.text(this.balanceDate[z].accountName, 147.5, accountI);//accno
      doc.text(String(this.balanceDate[z].accountNumber), 147.5, accountI+6);//accname
      doc.text(this.balanceDate[z].ifsc + '-' + this.balanceDate[z].bankName, 147.5, accountI+12);//ifsc-bankname
      }
      if(!dataTF){
        doc.text(String(this.handleF.getDateddmmyy(this.balanceDate[z].apd)), 115, accountI);//truckno
        doc.text(String(this.balanceDate[z].apm), 115, accountI+6);//truckno
      }
      // doc.text(this.balanceDate[z]['available'], 200, i + 6 - (data.length * 6));//accno
      doc.text(this.balanceDate[z]['available'], 191, accountI+6);//accno
      doc.setFontSize('8');
      
      i = i + 12-(bigK*2);
    }
    doc.text('#', 192, pageStopper)
    //Dynamic Part End
    doc.save(dateFormat + '.pdf')
  }

  ls(no){
    if(no<6){
      return 3;
    }
    else if(no>=6){
      return no-5+this.ls(no-1);
    }
  }

  showDatabyid = function (data, j) {
    this.show = true;
    this.found = data;
    data['index'] = j;
    data['editOption'] = 0;
    data['commentToTruck']=data['commentToTruck']

    this.handledata.saveData(data);
    this.router.navigate(['Navigation/BALANCE_HIRE_HANDLER/Update']);
  };
  back(type) {
    switch (type) {
      case 'year':
        this.yeardiv = true;
        this.monthdiv = false;
        this.daydiv = false;
        this.printInfo = false;
        this.createdDate = "";
        break;
      case 'month':
        this.yeardiv = false;
        this.monthdiv = true;
        this.daydiv = false;
        this.printInfo = false;
        this.createdDate = this.createdDate.slice(0, 4);
        this.find2(this.createdDate, 'year', false)
        break;
      case 'day':
        this.yeardiv = false;
        this.monthdiv = false;
        this.daydiv = true;
        this.printInfo = false;
        this.createdDate = this.createdDate.slice(0, 7);
        this.find2(this.createdDate, 'month', false)
        break;
    }
  }


  getTrucks(){

    let data = {};
    data['method'] = 'displayEmptyTrucks';
    data['tablename'] = '';

    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, data, 0)
      .subscribe((res: any) => {
        this.alltrucks=res.chartData;
        this.advancePayment = true;
      });
      
  }

  advancePaymentDone(i,j){
    
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = i._id;
      formbody['ownerid'] = i.ownerid;
      formbody['account'] = i.account;
      formbody['method'] = 'updateadvanceamtdate';
      formbody['tablename'] = '';
      formbody['advAmt']=parseInt((<HTMLInputElement>document.getElementById('advAmt_' + j)).value)
      formbody['advDate']=(<HTMLInputElement>document.getElementById('advDate_' + j)).value
      formbody['contact']=(<HTMLInputElement>document.getElementById('advContact_' + j))?[(<HTMLInputElement>document.getElementById('advContact_' + j)).value]:this.alltrucks[j]['contact'];
      formbody['contactO']=(<HTMLInputElement>document.getElementById('advContactO_' + j))?[(<HTMLInputElement>document.getElementById('advContactO_' + j)).value]:this.alltrucks[j]['contactO'];
      
      
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, formbody, 0)
        .subscribe((res: any) => {
          alert(res.Status);
          this.alltrucks[j]['advanceAmt']=(<HTMLInputElement>document.getElementById('advAmt_' + j)).value
          this.alltrucks[j]['advanceDate']=(<HTMLInputElement>document.getElementById('advDate_' + j)).value
          this.alltrucks[j]['contact']=(<HTMLInputElement>document.getElementById('advContact_' + j))?[(<HTMLInputElement>document.getElementById('advContact_' + j)).value]:this.alltrucks[j]['contact'];
          this.alltrucks[j]['contactO']=(<HTMLInputElement>document.getElementById('advContactO_' + j))?[(<HTMLInputElement>document.getElementById('advContactO_' + j)).value]:this.alltrucks[j]['contactO'];
          this.advAmt=0;
          this.advDate='';
          this.alltrucks.splice(j,1);
        });
    }
  }
}


