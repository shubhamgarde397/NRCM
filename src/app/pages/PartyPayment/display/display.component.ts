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
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  public detailedPrint=false;
  data: any;
  show = false;
  tabledata: false;
  public today;
  public todaysDate;
  public name: string;
  public dbName = 1;
  public commonArray;
  public date = new Date();
  public dateFromUI;
  public buttonValue: any = 'Party';
  public typeOfCols='default';
  public trucknoid;
  public dynDate;
  public dynDate2;
  public dataTruck;
  public partyid = '';
  public considerArray;
  public partyData;
  public gstdetailslist;
  public nopid;
  public adminAccess = false;
  public tableData = false;
  public monthNames=[];
  public paymentData;
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
  public toloading;
  public topayment;
  public mailSentDate;
  public partyids=[];
  public mailSendButton=false;
public balanceFollowGlobal=[];
public balanceFollowArr=[]
public typeOfColsB=false;
public month;
public year;
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogstonly')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.monthNames=this.handleF.genaratemonthNames()
    this.partyids=[];
    this.paymentData=this.handledata.givePaymentData();
    this.paymentData.length>0?this.tableData = true:this.tableData = false;
  }

  typeofcolsF(){
    this.typeOfColsB=true;
  }

  findgst() {
    this.partyid = this.handleF.findgst(this.nopid, this.gstdetailslist);
    this.partyids.push(this.handleF.findgst(this.nopid, this.gstdetailslist))
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

  cancel(data){
    switch (data) {
      case 'load':
        this.fromloading='2021-01-01';
        this.toloading='2021-01-01';
        break;
        case 'payment':
          this.frompayment='2021-01-01';
          this.topayment='2021-01-01';
        break;
    }
  }
  setDate(type){
    switch (type) {
      case 'month':
        this.month=(<HTMLInputElement>document.getElementById('month')).value;
        break;
        case 'year':
        this.year=(<HTMLInputElement>document.getElementById('year')).value;
        break;
        case 'final':
        this.toloading=this.year+'-'+this.month+'-31'
        this.fromloading=this.year+'-'+this.month+'-01'
          break;
    }
  }

  setDateMonth(){    
    this.date1="2021-"+this.handleF.generate2DigitNumber(String(this.handleF.getMonthNumber(this.monthName)))+"-01"
    this.date2="2021-"+this.handleF.generate2DigitNumber(String(this.handleF.getMonthNumber(this.monthName)))+"-31"
  }
  find = function () {
    this.mailSendButton=false;
    this.paymentData=[];
    let flag = false;
    let tempObj = {};
    let balanceFollow = {};
    tempObj['from'] = this.date1;
    tempObj['to'] = this.date2;
    this.date1=tempObj['from'];
    this.date2=tempObj['to'];
    if ((this.frompayment === undefined) || (this.topayment === undefined) || (this.fromloading === undefined)  || (this.toloading === undefined) || (this.partyid === '')) { 
      alert('Select a Date and Party'); 
    }
    else {
      tempObj['frompayment'] = this.frompayment;
      tempObj['topayment'] = this.topayment;
      tempObj['fromloading'] = this.fromloading;
      tempObj['toloading'] = this.toloading;
      tempObj['method'] = 'partyPaymentPDFForParty';
      tempObj['partyid']=this.partyids;
      this.frompayment=tempObj['frompayment'];
      this.topayment=tempObj['topayment'];
      this.fromloading=tempObj['fromloading'];
      this.toloading=tempObj['toloading'];
      if (confirm('Want to add Balance Follow?')) {
        this.balanceFollowMsg = prompt('Balance Follow Message');
        this.balanceFollowAmount = parseInt(prompt('Balance Follow Amount'));
        balanceFollow['partyName'] = this.balanceFollowMsg;
        balanceFollow['amount'] = this.balanceFollowAmount;
        balanceFollow['type'] = 'buy';
        balanceFollow['lrno'] = 'Balance Follow';
        balanceFollow['bf'] = true;
      }else{
        balanceFollow['bf'] = false;
      }
      flag = true;
      }
    if (flag) {
      tempObj['tablename'] = 'partyPayment'
      tempObj['partyid']=this.partyids.map(r=>r._id);
      tempObj['display'] = parseInt('5');
      this.balanceFollowGlobal=balanceFollow;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.paymentData = res.paymentData;
          this.paymentData =  this.pdfJSONForParty(res.paymentData,balanceFollow,'addBalance');
          if (this.paymentData.length > 0) {
            this.tableData = true;
            this.handledata.savePaymentData(this.paymentData);
          } else {
            alert('No Data Available.');
            this.tableData = false;
          }
        });
    }
  };
  findMany = function () {
    this.balanceFollowArr=[];
    this.mailSendButton=false;
    this.paymentData=[];
    let flag = false;
    let tempObj = {};
    let balanceFollow = {};
    tempObj['from'] = this.date1;
    tempObj['to'] = this.date2;
    this.date1=tempObj['from'];
    this.date2=tempObj['to'];
    if ((this.frompayment === undefined) || (this.topayment === undefined) || (this.fromloading === undefined)  || (this.toloading === undefined) || (this.partyid === '')) { 
      alert('Select a Date and Party'); 
    }
    else {
      tempObj['frompayment'] = this.frompayment;
      tempObj['topayment'] = this.topayment;
      tempObj['fromloading'] = this.fromloading;
      tempObj['toloading'] = this.toloading;
      tempObj['method'] = 'partyPaymentPDFForParty';
      tempObj['partyid']=this.partyids;
      this.frompayment=tempObj['frompayment'];
      this.topayment=tempObj['topayment'];
      this.fromloading=tempObj['fromloading'];
      this.toloading=tempObj['toloading'];
      if (confirm('Want to add Balance Follow?')) {
        let howmany=parseInt(prompt('How many BF?'));
        for(let ii=0;ii<howmany;ii++){

          let balanceFollowTemp={}
        this.balanceFollowMsg = prompt('Balance Follow Message');
        this.balanceFollowAmount = parseInt(prompt('Balance Follow Amount'));
        balanceFollowTemp['partyName'] = this.balanceFollowMsg;
        balanceFollowTemp['amount'] = this.balanceFollowAmount;
        balanceFollowTemp['type'] = 'buy';
        balanceFollowTemp['lrno'] = 'Balance Follow';
        balanceFollowTemp['bf'] = true;
        this.balanceFollowArr.push(balanceFollowTemp);
        }
        this.balanceFollowArr.reverse()

      }else{
        // balanceFollow['bf'] = false;
        this.balanceFollowArr.push({'bf':false});
      }
      flag = true;
      }
    if (flag) {
      tempObj['tablename'] = 'partyPayment'
      tempObj['partyid']=this.partyids.map(r=>r._id);
      tempObj['display'] = parseInt('5');
      this.balanceFollowGlobal=this.balanceFollowArr;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.paymentData = res.paymentData;
          this.paymentData =  this.pdfJSONForParty(res.paymentData,this.balanceFollowArr,'addBalance');
          if (this.paymentData.length > 0) {
            this.tableData = true;
            this.handledata.savePaymentData(this.paymentData);
          } else {
            alert('No Data Available.');
            this.tableData = false;
          }
        });
    }
  };

  deletePartyIds(i,j){
    this.partyids.splice(j,1);
  }
  mailSentSave(){
    let tempObj={}
    let newDate=new Date()
    this.mailSentDate= newDate.getFullYear()+'-'+(this.handleF.generate2DigitNumber(String(newDate.getMonth()+1)))+'-'+(this.handleF.generate2DigitNumber(newDate.getDate()));
    tempObj['partyid']=this.partyids[0]['_id'];
    tempObj['loadingFrom']=this.fromloading;
    tempObj['loadingTo']=this.toloading;
    tempObj['paymentFrom']=this.frompayment;
    tempObj['paymentTo']=this.topayment;
    tempObj['balanceFollowMsg']=this.balanceFollowMsg
    tempObj['balanceFollowAmount']=this.balanceFollowAmount
    tempObj['balanceFollowArr']=this.balanceFollowArr
    tempObj['mailSentDate']=this.mailSentDate;
    tempObj['method']='insert';
    tempObj['tablename']='MailDetails';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true).subscribe((res: any) => {alert(res.Status)});
  }

  pdfJSON(data, balanceFollow,todo) {
    let val = 0
    if(todo=='addBalance'){
    if(balanceFollow['bf']){
    data.unshift(balanceFollow);
    }
  }
    
    
    data.forEach((res) => {
      if (res['type'] == 'buy') {
        val = val + res['amount'];
        res['value'] = val;

      }
      else if (res['type'] == 'payment') {
        val = val - res['amount'];
        res['value'] = val;
      }
    })
    return data;
  }
  pdfJSONForParty(data, balanceFollow,todo) {
    let val = 0
    if(todo=='addBalance'){
      for(let i=0;i<balanceFollow.length;i++){
    if(balanceFollow[i]['bf']){
    data.unshift(balanceFollow[i]);
    }
  }
  }
    data.forEach((res) => {
      if (res['type'] == 'buy') {
        val = val + res['amount'];
        res['value'] = val;

      }
      else if (res['type'] == 'payment') {
        val = val - res['amount'];
        res['value'] = val;
      }
    })
    
    return data;
  }

  delete(id, j) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id._id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'partyPayment';
      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: Response) => {
          alert(response['Status']);
          this.paymentData.splice(j, 1);
          if (this.paymentData.length > 0) {
            this.tableData = true;
          } else {
            this.tableData = false;
          }
        });
    }
  }
  edit(i,j){
    var amt=prompt('Enter the updating amount')
    if(amt!==null){
      let formbody = {'partyData':{}}

      formbody['_id'] = i._id;;
      formbody['method'] = 'editAmount';
      formbody['tablename'] = 'partyPayment';
      formbody['amount']=parseInt(amt);

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: Response) => {
          alert(response['Status']);
          this.paymentData[j]['amount']=parseInt(amt);
        });
    }
  }
    deleteTrucks(i,j){
      this.handledata.savePPData([i])
      this.router.navigate(['Navigation/PARTY_PAYMENT_HANDLER/Update']);
    }
  

  deleteTemp(id,j){
    if (confirm('Are you sure to temporarily delete?')) {
      if(id['bF']){
        // this.balanceFollowGlobal={}
        // this.balanceFollowGlobal['bF']=false;
        this.balanceFollowGlobal.splice(j,1)
      }
          this.paymentData.splice(j, 1);
          if (this.paymentData.length > 0) {
            this.tableData = true;
          } else {
            this.tableData = false;
          }
          
          this.paymentData =  this.pdfJSONForParty(this.paymentData,this.balanceFollowGlobal,'');
          alert('Done!');
    }
  }

  getAdminAccess() {
    this.adminAccess = !this.adminAccess;
  }

  downloadForParty1(data) {//threshhold is 295
    console.log(this.balanceFollowArr);
    
    this.mailSendButton=true;
    let pager=1;
     let bigValueofY=0;
     var doc = new jsPDF()
     doc.setFontSize('20');
     doc.setFontType('bold');
     doc.setTextColor(234, 1, 0);
     doc.text('NITIN ROADWAYS AND CARGO MOVERS', 30, 8)//partyname
     doc.setFontSize('15');
     doc.setTextColor(215, 6, 9);
     doc.text(this.partyids[0]['name'], 60, 15)//partyname
     doc.setFontSize('10');
     doc.setTextColor(0, 0, 0);
     doc.text('GST No. : '+this.partyids[0]['gst'], 60, 19)//partyname
     doc.setFontSize('10');
     doc.text('Details From Date : ', 165, 15)
     doc.text(this.handleF.getDateddmmyy(this.fromloading)+' to '+this.handleF.getDateddmmyy(this.toloading), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     doc.line(20, 20, 20, 300);//punching area line
     //headers
     doc.setFontSize('10');
     let y = 24;
     let starty = 24;
     doc.line(0, 148.2, 5, 148.2);//punching line helper
     doc.text('Sr', 23, y)//partyname
     doc.text('Date', 38, y)//partyname
     doc.text('Truck No.', 60, y)//partyname
     doc.text('LR No.', 86, y)//partyname
     doc.text('Destination', 106, y)//partyname
     doc.text('Lorry Bill', 129, y)//partyname
      doc.text('Payment', 147, y)//partyname
     if(data=='party'){
      doc.text('Notes', 174, y)//partyname
      }else if(data=='self'){
       doc.text('Balance', 174, y)//partyname
      }

      doc.line(30, 20, 30, 25);//srno
      doc.line(55, 20, 55, 25);//date
      doc.line(83, 20, 83, 25);//truckno
      doc.line(105, 20, 105, 25);//lrno
      doc.line(127, 20, 127, 25);//credit
      doc.line(145, 20, 145, 25);//debit
      doc.line(171, 20, 171, 25);//balance


     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     let startforI=0;
     starty = 31;
     for(let yy=0;yy<this.balanceFollowArr.length;yy++){
          y = y + 5;
          
          doc.text(this.paymentData[yy].partyName, 30, y)//partyname
          doc.text(String(this.paymentData[yy].amount), 130, y)//partyname
          doc.line(20, 31, 210, 31);
          //  doc.line(150, 25, 150, 31);
          startforI++;
          doc.line(20, 31+(yy*5), 210, 31+(yy*5));
         

      }
      starty = starty+((this.balanceFollowArr.length-1)*5);
      y=y+6
      
 
     for (let i = startforI; i < this.paymentData.length; i++) {
 
      
       if(y>290){
         
         y=30;
        doc.line(30, starty, 30, 291);//srno
        doc.line(55, starty, 55, 291);//date
        doc.line(83, starty, 83, 291);//truckno
        doc.line(105, starty, 105, 291);//lrno
        doc.line(127, starty, 127, 291);//credit
        doc.line(145, starty, 145, 291);//debit
        doc.line(171, starty, 171, 291);//balance

        starty = 20;
         doc.addPage();
         doc.setFontSize('20');
     doc.setFontType('bold');

     doc.setTextColor(234, 1, 0);
     doc.text('NITIN ROADWAYS AND CARGO MOVERS', 30, 8)//partyname
     doc.setFontSize('15');
     doc.setTextColor(215, 6, 9);
     doc.text(this.partyids[0]['name'], 60, 15)//partyname
     doc.setFontSize('10');
     doc.setTextColor(0, 0, 0);
     doc.text('GST No. : '+this.partyids[0]['gst'], 60, 19)//partyname
     doc.setFontSize('10');
     doc.text('Details From Date : ', 165, 15)
     doc.text(this.handleF.getDateddmmyy(this.fromloading)+' to '+this.handleF.getDateddmmyy(this.toloading), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     doc.line(20, 20, 20, 300);//punching area line
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 23, y-6)//partyname
     doc.text('Date', 38, y-6)//partyname
     doc.text('Truck No.', 60, y-6)//partyname
     doc.text('LR No.', 86, y-6)//partyname
     doc.text('Destination', 106, y-6)//partyname
     doc.text('Lorry Bill', 129, y-6)//partyname
      doc.text('Payment', 147, y-6)//partyname
      if(data=='party'){
        doc.text('Notes', 174, y-6)//partyname
        }else if(data=='self'){
         doc.text('Balance', 174, y-6)//partyname
        }

     
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(30, 20, 30, 25);//srno
     doc.line(55, 20, 55, 25);//date
     doc.line(83, 20, 83, 25);//truckno
     doc.line(105, 20, 105, 25);//lrno
     doc.line(127, 20, 127, 25);//credit
     doc.line(145, 20, 145, 25);//debit
     doc.line(171, 20, 171, 20);//balance
     //vertical lines
     }
     if(this.paymentData[0]['bf'] == true){
      doc.text(String(i), 25, y)//partyname
      }else {
        doc.text(String(i+1), 23, y)//partyname
      }
       
       doc.text(this.handleF.getDateddmmyy(this.paymentData[i].date), 32, y)//partyname
       if (this.paymentData[i].type === 'buy') {
        if(this.paymentData[i].lrshort==='BNG'){
          doc.setTextColor(207,120,18);
          
          doc.text(this.paymentData[i].lrshort+'-'+this.paymentData[i].lrno.split('_')[1], 84, y)//lrno
          doc.setTextColor(0,0,0);
          
        }
        else{
         doc.text(String(this.paymentData[i].lrno), 84, y)//lrno
        }
         doc.text(this.paymentData[i].truckNo, 57, y)//truckno
         doc.text(this.paymentData[i].placeName, 106, y)//truckno
         if(this.paymentData[i].placeName2!==undefined){
          doc.text(this.paymentData[i].placeName2, 106, y+5)//truckno
         }
       } else {
         doc.text(String('-'), 73, y)//lrno
         doc.text(String('-'), 62, y)//truckno
         doc.text('-', 106, y)//truckno
       }

       if(this.typeOfCols==='default'){
            if (this.paymentData[i].type === 'buy') {
              doc.text(String(this.paymentData[i].amount), 132, y)//partyname
              doc.text(String('-'), 150, y)//partyname
            } else {
              doc.text(String(this.paymentData[i].amount), 150, y)//partyname
              doc.text(String('-'), 132, y)//partyname
            }
      }else if(this.typeOfCols==='noamount'){
          doc.text(String('-'), 132, y)//partyname
          doc.text(String('-'), 150, y)//partyname
      }
      else if(this.typeOfCols==='nobalance'){
        if (this.paymentData[i].type === 'buy') {
          doc.text(String(this.paymentData[i].amount), 132, y)//partyname
          doc.text(String('-'), 150, y)//partyname
        } else {
          doc.text(String(this.paymentData[i].amount), 150, y)//partyname
          doc.text(String('-'), 132, y)//partyname
        }
    }
 
      if(this.typeOfCols==='default'){
        if(data=='self'){
          doc.text(String(this.paymentData[i]['value']), 174, y)//partyname
           }
      }else if(this.typeOfCols==='noamount'){
        if(data=='self'){
          doc.text(String('-'), 174, y)//partyname
           }
      }
      else if(this.typeOfCols==='nobalance'){
        if(data=='self'){
          doc.text(String('-'), 174, y)//partyname
           }
      }

       
      
        if(this.paymentData[i].placeName2===undefined){
          y = y + 5;
          }else{
           y = y + 10;
          }
          doc.line(20, y -4, 210, y -4);//line after header
     bigValueofY=y;
     }

     let [amount,payment,balance]=this.returnAmountPaymentBalance()
     doc.setFontSize('10');
    //  doc.text(String(this.paymentData.length+1), 23, bigValueofY)//partyname
    if(this.typeOfCols==='default'){
      doc.text('Total', 104, bigValueofY)//partyname
      doc.text(String(amount), 128, bigValueofY)//partyname
      doc.text(String(payment), 148, bigValueofY)//partyname
      if(data=='self'){
      doc.text(String(balance), 172, bigValueofY)//partyname
      }
      if(data=='party'){
       doc.text('Balance', 172, bigValueofY-5)//partyname
       doc.text(String(balance), 172, bigValueofY)//partyname
      }
    }else if(this.typeOfCols==='noamount'){
    }
    else if(this.typeOfCols==='nobalance'){
    }
   

     doc.line(30, starty, 30, bigValueofY+1);//srno
     doc.line(55, starty, 55, bigValueofY+1);//date
     doc.line(83, starty, 83, bigValueofY+1);//truckno
     doc.line(105, starty, 105, bigValueofY+1);//lrno
     doc.line(127, starty, 127, bigValueofY+1);//credit
     doc.line(145, starty, 145, bigValueofY+1);//debit
     doc.line(171, starty, 171, bigValueofY+1);//balance
     doc.line(20, bigValueofY+1, 210, bigValueofY+1);//line after header

     doc.save(this.partyids[0]['name']+'_'+this.handleF.getDateddmmyy(this.fromloading)+'_'+this.handleF.getDateddmmyy(this.toloading)+ '.pdf')
   }

   downloadForParty(data) {//threshhold is 295
    this.mailSendButton=true;
    let pager=1;
     let bigValueofY=0;
     var doc = new jsPDF()
     doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text(this.partyids[0]['name'], 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(this.handleF.getDateddmmyy(this.fromloading)+' to '+this.handleF.getDateddmmyy(this.toloading), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     doc.line(20, 20, 20, 300);//punching area line
     //headers
     doc.setFontSize('10');
     let y = 24;
     let starty = 24;
     doc.line(0, 148.2, 5, 148.2);//punching line helper
     doc.text('Sr', 23, y)//partyname
     doc.text('Date', 38, y)//partyname
     doc.text('Truck No.', 60, y)//partyname
     doc.text('LR No.', 86, y)//partyname
     doc.text('Destination', 101, y)//partyname
     doc.text('Lorry Bill', 128, y)//partyname
      doc.text('Payment Rec', 148, y)//partyname
     if(data=='party'){
      doc.text('Notes', 172, y)//partyname
      }else if(data=='self'){
       doc.text('Balance', 172, y)//partyname
      }

      doc.line(30, 20, 30, 25);//srno
      doc.line(55, 20, 55, 25);//date
      doc.line(83, 20, 83, 25);//truckno
      doc.line(100, 20, 100, 25);//lrno
      doc.line(127, 20, 127, 25);//credit
      doc.line(145, 20, 145, 25);//debit
      doc.line(171, 20, 171, 25);//balance


     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     let startforI=0;
     if (this.paymentData[0]['bf'] == true) {
       y = y + 5;
       starty = 31;
       doc.text(this.paymentData[0].partyName, 30, y)//partyname
       doc.text(String(this.paymentData[0].value), 130, y)//partyname
       doc.line(20, 31, 210, 31);
      //  doc.line(150, 25, 150, 31);
       y = y + 6;
       startforI=1;
     }else{
       y = y + 6;
       startforI=0;
     }
 
     for (let i = startforI; i < this.paymentData.length; i++) {
 
      
       if(y>290){
         
         y=30;
        doc.line(30, starty, 30, 291);//srno
        doc.line(55, starty, 55, 291);//date
        doc.line(83, starty, 83, 291);//truckno
        doc.line(100, starty, 100, 291);//lrno
        doc.line(127, starty, 127, 291);//credit
        doc.line(145, starty, 145, 291);//debit
        doc.line(171, starty, 171, 291);//balance

        starty = 20;
         doc.addPage();
         doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text(this.partyids[0]['name'], 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(this.handleF.getDateddmmyy(this.fromloading)+' to '+this.handleF.getDateddmmyy(this.toloading), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     doc.line(20, 20, 20, 300);//punching area line
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 23, y-6)//partyname
     doc.text('Date', 38, y-6)//partyname
     doc.text('Truck No.', 60, y-6)//partyname
     doc.text('LR No.', 86, y-6)//partyname
     doc.text('Destination', 101, y-6)//partyname
     doc.text('Lorry Bill', 128, y-6)//partyname
      doc.text('Payment Rec', 148, y-6)//partyname
      if(data=='party'){
        doc.text('Notes', 172, y-6)//partyname
        }else if(data=='self'){
         doc.text('Balance', 172, y-6)//partyname
        }

     
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(30, 20, 30, 25);//srno
     doc.line(55, 20, 55, 25);//date
     doc.line(83, 20, 83, 25);//truckno
     doc.line(100, 20, 100, 25);//lrno
     doc.line(127, 20, 127, 25);//credit
     doc.line(145, 20, 145, 25);//debit
     doc.line(171, 20, 171, 20);//balance
     //vertical lines
     }
     if(this.paymentData[0]['bf'] == true){
      doc.text(String(i), 25, y)//partyname
      }else {
        doc.text(String(i+1), 23, y)//partyname
      }
       
       doc.text(this.handleF.getDateddmmyy(this.paymentData[i].date), 32, y)//partyname
       if (this.paymentData[i].type === 'buy') {
         doc.text(String(this.paymentData[i].lrno), 88, y)//lrno
         doc.text(this.paymentData[i].truckNo, 57, y)//truckno
         doc.text(this.paymentData[i].placeName, 101, y)//truckno
         if(this.paymentData[i].placeName2!==undefined){
          doc.text(this.paymentData[i].placeName2, 101, y+5)//truckno
         }
       } else {
         doc.text(String('-'), 88, y)//lrno
         doc.text(String('-'), 57, y)//truckno
         doc.text('-', 101, y)//truckno
       }
       if (this.paymentData[i].type === 'buy') {
         doc.text(String(this.paymentData[i].amount), 130, y)//partyname
         doc.text(String('-'), 148, y)//partyname
       } else {
         doc.text(String(this.paymentData[i].amount), 148, y)//partyname
         doc.text(String('-'), 130, y)//partyname
       }
 
       if(data=='self'){
       doc.text(String(this.paymentData[i]['value']), 172, y)//partyname
        }
      
        if(this.paymentData[i].placeName2===undefined){
          y = y + 5;
          }else{
           y = y + 10;
          }
          doc.line(20, y -4, 210, y -4);//line after header
     bigValueofY=y;
     }

     let [amount,payment,balance]=this.returnAmountPaymentBalance()
     doc.setFontSize('10');
    //  doc.text(String(this.paymentData.length+1), 23, bigValueofY)//partyname
     doc.text('Total', 104, bigValueofY)//partyname
     doc.text(String(amount), 128, bigValueofY)//partyname
     doc.text(String(payment), 148, bigValueofY)//partyname
     if(data=='self'){
     doc.text(String(balance), 172, bigValueofY)//partyname
     }
     if(data=='party'){
      doc.text('Balance', 172, bigValueofY-5)//partyname
      doc.text(String(balance), 172, bigValueofY)//partyname
     }

     doc.line(30, starty, 30, bigValueofY+1);//srno
     doc.line(55, starty, 55, bigValueofY+1);//date
     doc.line(83, starty, 83, bigValueofY+1);//truckno
     doc.line(100, starty, 100, bigValueofY+1);//lrno
     doc.line(127, starty, 127, bigValueofY+1);//credit
     doc.line(145, starty, 145, bigValueofY+1);//debit
     doc.line(171, starty, 171, bigValueofY+1);//balance
     doc.line(20, bigValueofY+1, 210, bigValueofY+1);//line after header
     doc.save(this.partyids[0]['name']+'_'+this.handleF.getDateddmmyy(this.fromloading)+'_'+this.handleF.getDateddmmyy(this.toloading)+ '.pdf')
   }


   balance(data) {
  return  data.rent - this.getAdvances(data.advanceArray);
  }

  getAdvances(data){
    let sum =0 
    
    data.forEach(r=>{
      if(r.consider){
      sum = r.advanceAmt + sum
      }
    })
    return sum===(NaN||undefined)?0:sum;
  }

     returnAmountPaymentBalance(){
     let amount=0;
     let payment=0;
     this.paymentData.forEach(r=>{
      if(r.type=='buy'){
      amount=amount+r.amount;
  }
  else if(r.type=='payment'){
      payment=payment+r.amount;
  }
  
  })
     return [amount,payment,amount-payment];
   }

}



