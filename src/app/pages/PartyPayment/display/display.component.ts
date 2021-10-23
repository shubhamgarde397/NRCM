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
  public buttonOption = '1';
  public trucknoid;
  public dynDate;
  public dynDate2;
  public role = 6;
  public dataTruck;
  public partyid = '';
  public considerArray;
  public partyData;
  public gstdetailslist;
  public nopid;
  public adminAccess = false;
  public tableData = false;
  public displayoptions = [
    { 'value': '1', 'viewvalue': 'Party' },
    { 'value': '2', 'viewvalue': 'Date' },
    { 'value': '3', 'viewvalue': 'Both' },
    { 'value': '4', 'viewvalue': 'Only Lorry Details' },
    { 'value': '5', 'viewvalue': 'Payment And Lorry' },
  ]
  public buttonOptions=[
    { 'value': '1', 'viewvalue': 'This Month' },
    { 'value': '2', 'viewvalue': 'Last Month' },
    { 'value': '3', 'viewvalue': '1st April' },
    { 'value': '4', 'viewvalue': 'By Months' },
    { 'value': '5', 'viewvalue': 'Custom Date' }
  ];
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
public balanceFollowGlobal={};
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogstonly')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.monthNames=this.handleF.genaratemonthNames()
    this.role = this.securityCheck.role;
    this.partyids=[];
  }

  findgst() {
    this.partyid = this.handleF.findgst(this.nopid, this.gstdetailslist);
    this.partyids.push(this.handleF.findgst(this.nopid, this.gstdetailslist))
  }
  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
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

  findOption() {
    this.buttonOption = this.trucknoid;
    this.buttonValue = this.displayoptions[parseInt(this.trucknoid) - 1].viewvalue;
    if((this.buttonOption==='3')){
      this.displayOption='0';

    }else if(this.buttonOption==='4'){
      this.displayOption='1';
    }else if(this.buttonOption==='2'){
      this.displayOption='5';
    }else{
      this.displayOption='1';
    }
  }

  findDisplayOption(){
    this.displayOption = this.displayType;
    this.displayValue = this.buttonOptions[parseInt(this.displayType) - 1].viewvalue;
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
    switch(this.displayOption){
      case '0':
        tempObj['from'] = '2020-01-01';
          tempObj['to'] = this.date.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(parseInt(this.date.getMonth())+1)) +'-31';
          this.date1=tempObj['from'];
          this.date2=tempObj['to'];
        break;
        case '1':
          // tempObj['from'] = this.date.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(parseInt(this.date.getMonth())+1)) +'-01';
          tempObj['from'] = '2020-01-01';
          tempObj['to'] = this.date.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(parseInt(this.date.getMonth())+1)) +'-31';
          // tempObj['from'] = this.date1.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(parseInt(this.date1.getMonth())+1)) +'-'+this.date1.getDay();
          // tempObj['to'] = this.date2.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(parseInt(this.date2.getMonth())+1)) +'-'+this.date1.getDay();
          this.date1=tempObj['from'];
          this.date2=tempObj['to'];
          break;
          case '2':
            tempObj['from'] = this.date.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(this.date.getMonth())) +'-01';
          tempObj['to'] = this.date.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(this.date.getMonth())) +'-31';
          this.date1=tempObj['from'];
          this.date2=tempObj['to'];
            break;
            case '3':
              tempObj['from'] = this.date.getFullYear()+'-04-01';
          tempObj['to'] =  this.date.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(parseInt(this.date.getMonth())+1)) +'-31';
          this.date1=tempObj['from'];
          this.date2=tempObj['to'];
              break;
              case '4':
                tempObj['from'] = this.date1;
          tempObj['to'] = this.date2;
          this.date1=tempObj['from'];
          this.date2=tempObj['to'];
                break;
                case '5':
                  tempObj['from'] = this.date1;
          tempObj['to'] = this.date2;
          this.date1=tempObj['from'];
          this.date2=tempObj['to'];
                  break;
    }


    switch (this.buttonOption) {
      case '1':
        if (this.partyid === '') { alert('Select a Party Name'); break; }
        else {
          // tempObj['partyid'] = this.partyid['_id'];
          tempObj['partyid']=this.partyids;
          tempObj['method'] = 'displayPP';
          flag = true;
        }
        break;
      case '2':
        if ((this.date1 === undefined) || (this.date2 === undefined)) { alert('Select a Date'); break; }
        else {
          tempObj['from'] = this.date1;
          tempObj['to'] = this.date2;
          tempObj['method'] = 'displayPP';
          flag = true;
        }
        break;
      case '3':
        if ((this.date1 === undefined) || (this.date2 === undefined) || (this.partyid === '')) { alert('Select a Date and Party'); break; }
        else {
          tempObj['from'] = this.date1;
          tempObj['to'] = this.date2;
          tempObj['method'] = 'displayPP';
          // tempObj['partyid'] = this.partyid['_id'];
          tempObj['partyid']=this.partyids;
          flag = true;
        }
        break;
      case '4':
        let msg = '';
        let amt = 0;
        if ((this.date1 === undefined) || (this.date2 === undefined) || (this.partyid === '')) { alert('Select a Date and Party'); break; }
        else {
          tempObj['from'] = this.date1;
          tempObj['to'] = this.date2;
          tempObj['method'] = 'partyPaymentPDF';
          // tempObj['partyid'] = this.partyid['_id'];
          tempObj['partyid']=this.partyids;
          if (confirm('Want to add Balance Follow?')) {
            msg = prompt('Balance Follow Message');
            amt = parseInt(prompt('Balance Follow Amount'));
            balanceFollow['partyName'] = msg;
            balanceFollow['amount'] = amt;
            balanceFollow['type'] = 'buy';
            balanceFollow['lrno'] = 'Balance Follow';
            balanceFollow['bf'] = true;
          }else{
          balanceFollow['bf'] = false;
          }
          flag = true;
        }
        break;
        case '5':
          let msg1 = '';
        let amt1 = 0;
        if ((this.frompayment === undefined) || (this.topayment === undefined) || (this.fromloading === undefined)  || (this.toloading === undefined) || (this.partyid === '')) { alert('Select a Date and Party'); break; }
        else {
          
          tempObj['frompayment'] = this.frompayment;
          tempObj['topayment'] = this.topayment;
          tempObj['fromloading'] = this.fromloading;
          tempObj['toloading'] = this.toloading;
          tempObj['method'] = 'partyPaymentPDFForParty';
          // tempObj['partyid'] = this.partyid['_id'];
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
         
                    break;
    }
    
    if (flag) {
      tempObj['tablename'] = 'partyPayment'
tempObj['partyid']=this.partyids.map(r=>r._id);
      tempObj['display'] = parseInt(this.buttonOption);
  
      this.balanceFollowGlobal=balanceFollow;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
        .subscribe((res: any) => {
          this.paymentData = res.paymentData;
          this.paymentData = this.buttonOption == '4' ? this.pdfJSON(res.paymentData, balanceFollow,'addBalance') : ( this.buttonOption == '5'? this.pdfJSONForParty(res.paymentData,balanceFollow,'addBalance'):res.paymentData);
          if (this.paymentData.length > 0) {
            this.tableData = true;
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
    // tempObj['partyid']=this.partyid['_id'];
    tempObj['partyid']=this.partyids[0]['_id'];
    tempObj['loadingFrom']=this.fromloading;
    tempObj['loadingTo']=this.toloading;
    tempObj['paymentFrom']=this.frompayment;
    tempObj['paymentTo']=this.topayment;
    tempObj['balanceFollowMsg']=this.balanceFollowMsg
    tempObj['balanceFollowAmount']=this.balanceFollowAmount
    tempObj['mailSentDate']=this.mailSentDate;
    tempObj['method']='insert';
    tempObj['tablename']='MailDetails';

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {
      
      alert(res.Status)

    });
    
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

  delete(id, j) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id._id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'partyPayment';
      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
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
      let formbody = {'partyData':{}}

      formbody['_id'] = i._id;
      formbody['method'] = 'update';
      formbody['tablename'] = 'partyPayment';
      formbody['partyData']['date']=i.date;
      formbody['partyData']['partyid']=i.partyid;
      formbody['partyData']['amount']=parseInt(amt);

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response: Response) => {
          alert(response['Status']);
          this.paymentData[j]['amount']=parseInt(amt);
        });
    }

    deleteTrucks(i,j){
      this.handledata.savePPData([i])
      this.router.navigate(['Navigation/PARTY_PAYMENT_HANDLER/Update']);
    }
  

  deleteTemp(id,j){
    if (confirm('Are you sure to temporarily delete?')) {
      if(id['bF']){
        this.balanceFollowGlobal={}
        this.balanceFollowGlobal['bF']=false;
      }
          this.paymentData.splice(j, 1);
          if (this.paymentData.length > 0) {
            this.tableData = true;
          } else {
            this.tableData = false;
          }
          
          this.paymentData =this.buttonOption == '4' ? this.pdfJSON(this.paymentData, this.balanceFollowGlobal,'addBalance') : ( this.buttonOption == '5'? this.pdfJSONForParty(this.paymentData,this.balanceFollowGlobal,''):this.paymentData);
          alert('Done!');
    }
  }

  getAdminAccess() {
    this.adminAccess = !this.adminAccess;
  }

  download() {//threshhold is 295
   let pager=1;
    
    var doc = new jsPDF()
    doc.setFontSize('25');
    doc.setFontType('bold');
    doc.text(this.partyids[0]['name'], 15, 15)//partyname
    doc.setFontSize('10');
    doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
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
    doc.text('Sr', 23, y)//partyname
    doc.text('Date', 38, y)//partyname
    doc.text('TruckNo', 57, y)//partyname
    doc.text('Lrno', 88, y)//partyname
    doc.text('Amount', 108, y)//partyname
    doc.text('Place', 128, y)//partyname
    doc.text('Notes', 170, y)//partyname
    //headers
    doc.line(0, 25, 210, 25);//line after header

    //vertical lines
    doc.line(30, 20, 30, 25);//srno
    doc.line(55, 20, 55, 25);//date
    doc.line(83, 20, 83, 25);//truckno
    doc.line(100, 20, 100, 25);//lrno
    doc.line(125, 20, 125, 25);//credit
    doc.line(155, 20, 155, 25);//debit
    //vertical lines
    let startforI=0;
    if (this.paymentData[0]['bf'] == true) {
      y = y + 5;
      starty = 31;
      doc.text(this.paymentData[0].partyName, 30, y)//partyname
      doc.text(String(this.paymentData[0].value), 155, y)//partyname
      doc.line(20, 31, 210, 31);
      doc.line(150, 25, 150, 31);
      y = y + 6;
      startforI=1
    }else{
      y = y + 6;
      startforI=0;
    }

    for (let i = startforI; i < this.paymentData.length; i++) {

      if(y>290){
        y=24;
        
    starty = 20;
        doc.addPage();
        doc.setFontSize('25');
    doc.setFontType('bold');
    doc.text(this.partyids[0]['name'], 15, 15)//partyname
    doc.setFontSize('10');
    doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
    doc.text(String(pager), 180, 5)//pageno
    pager=pager+1;
    doc.setFontSize('25');
    doc.setLineWidth(0.5);
    doc.line(0, 20, 210, 20);//line after main header
    doc.line(20, 20, 20, 300);//punching area line
    //headers
    doc.setFontSize('10');
    doc.text('Sr', 23, y)//partyname
    doc.text('Date', 38, y)//partyname
    doc.text('TruckNo', 57, y)//partyname
    doc.text('Lrno', 88, y)//partyname
    doc.text('Amount', 108, y)//partyname
    doc.text('Place', 128, y)//partyname
    doc.text('Notes', 175, y)//partyname
    //headers
    doc.line(0, 25, 210, 25);//line after header

    //vertical lines
    doc.line(30, 20, 30, 25);//srno
    doc.line(55, 20, 55, 25);//date
    doc.line(83, 20, 83, 25);//truckno
    doc.line(100, 20, 100, 25);//lrno
    doc.line(125, 20, 125, 25);//credit
    doc.line(155, 20, 155, 25);//debit
    //vertical lines
    }
      doc.text(String(i+1), 23, y)//partyname
      doc.text(this.handleF.getDateddmmyy(this.paymentData[i].date), 32, y)//partyname
      doc.text(String(this.paymentData[i].lrno), 88, y)//lrno
      doc.text(this.paymentData[i].truckNo, 57, y)//truckno
      doc.text(String(this.paymentData[i].amount), 108, y)//partyname
      doc.text(this.paymentData[i].placeName, 128, y)//partyname
      doc.line(20, y + 1, 210, y + 1);//line after header
      y = y + 5;
    //vertical lines//getting applied for every loop, make it happen once only
    doc.line(30, starty, 30, y - 4);//srno
    doc.line(55, starty, 55, y - 4);//date
    doc.line(83, starty, 83, y - 4);//truckno
    doc.line(100, starty, 100, y - 4);//lrno
    doc.line(125, starty, 125, y - 4);//credit
    doc.line(155, starty, 155, y - 4);//debit
    //vertical lines

    }
    doc.save(this.partyids[0]['name']+'_'+this.handleF.getDateddmmyy(this.date1)+'_'+this.handleF.getDateddmmyy(this.date2)+ '.pdf')
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
    //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
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
     doc.text('Sr', 23, y)//partyname
     doc.text('Date', 38, y)//partyname
     doc.text('Truck No.', 62, y)//partyname
     doc.text('LR No.', 86, y)//partyname
     doc.text('Lorry Bill', 104, y)//partyname
     doc.text('Payment Rec', 127, y)//partyname
     if(data=='party'){
     doc.text('Notes', 155, y)//partyname
     }else if(data=='self'){
      doc.text('Balance', 155, y)//partyname
     }
     doc.text('Notes', 182, y)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(30, 20, 30, 25);//srno
     doc.line(55, 20, 55, 25);//date
     doc.line(83, 20, 83, 25);//truckno
     doc.line(100, 20, 100, 25);//lrno
     doc.line(125, 20, 125, 25);//credit
     doc.line(150, 20, 150, 25);//debit
     doc.line(180, 20, 180, 20);//balance
     //vertical lines
     let startforI=0;
     if (this.paymentData[0]['bf'] == true) {
       y = y + 5;
       starty = 31;
       doc.text(this.paymentData[0].partyName, 30, y)//partyname
       doc.text(String(this.paymentData[0].value), 155, y)//partyname
       doc.line(20, 31, 210, 31);
       doc.line(150, 25, 150, 31);
       y = y + 6;
       startforI=1;
     }else{
       y = y + 6;
       startforI=0;
     }
 
     for (let i = startforI; i < this.paymentData.length; i++) {
 
       if(y>290){
         y=30;
         
     starty = 20;
         doc.addPage();
         doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text(this.partyids[0]['name'], 15, 15)//partyname
     doc.setFontSize('10');
    //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
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
     doc.text('Truck No.', 62, y-6)//partyname
     doc.text('LR No.', 86, y-6)//partyname
     doc.text('Lorry Bill', 104, y-6)//partyname
     doc.text('Payment Rec', 127, y-6)//partyname
     if(data=='party'){
      doc.text('Notes', 155, y-6)//partyname
      }else if(data=='self'){
       doc.text('Balance', 155, y-6)//partyname
      }
     doc.text('Notes', 182, y-6)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(30, 20, 30, 25);//srno
     doc.line(55, 20, 55, 25);//date
     doc.line(83, 20, 83, 25);//truckno
     doc.line(100, 20, 100, 25);//lrno
     doc.line(125, 20, 125, 25);//credit
     doc.line(150, 20, 150, 25);//debit
     doc.line(180, 20, 180, 20);//balance
     //vertical lines
     }
     if(this.paymentData[0]['bf'] == true){
      doc.text(String(i), 23, y)//partyname
      }else {
        doc.text(String(i+1), 23, y)//partyname
      }
       
       doc.text(this.handleF.getDateddmmyy(this.paymentData[i].date), 32, y)//partyname
       if (this.paymentData[i].type === 'buy') {
         doc.text(String(this.paymentData[i].lrno), 88, y)//lrno
         doc.text(this.paymentData[i].truckNo, 57, y)//truckno
       } else {
         doc.text(String('-'), 88, y)//lrno
         doc.text(String('-'), 57, y)//truckno
       }
       if (this.paymentData[i].type === 'buy') {
         doc.text(String(this.paymentData[i].amount), 108, y)//partyname
         doc.text(String('-'), 133, y)//partyname
       } else {
         doc.text(String(this.paymentData[i].amount), 133, y)//partyname
         doc.text(String('-'), 108, y)//partyname
       }
 
       if(data=='self'){
       doc.text(String(this.paymentData[i].value), 155, y)//partyname
        }
      
       doc.line(20, y + 1, 210, y + 1);//line after header
       y = y + 5;
 
       
     //vertical lines//getting applied for every loop, make it happen once only
     doc.line(30, starty, 30, y - 4);//srno
     doc.line(55, starty, 55, y - 4);//date
     doc.line(83, starty, 83, y - 4);//truckno
     doc.line(100, starty, 100, y - 4);//lrno
     doc.line(125, starty, 125, y - 4);//credit
     doc.line(150, starty, 150, y - 4);//debit
     doc.line(180, 20, 180, y - 4);//balance
     //vertical lines
     bigValueofY=y;
     }

     let [amount,payment,balance]=this.returnAmountPaymentBalance()
     doc.setFontSize('10');
     doc.text(String(this.paymentData.length+1), 23, bigValueofY)//partyname
     doc.text('Total', 62, bigValueofY)//partyname
     doc.text(String(amount), 106, bigValueofY)//partyname
     doc.text(String(payment), 130, bigValueofY)//partyname
     doc.text(String(balance), 153, bigValueofY)//partyname
     doc.line(30, starty, 30, bigValueofY+1);//srno
     doc.line(55, starty, 55, bigValueofY+1);//date
     doc.line(83, starty, 83, bigValueofY+1);//truckno
     doc.line(100, starty, 100, bigValueofY+1);//lrno
     doc.line(125, starty, 125, bigValueofY+1);//credit
     doc.line(150, starty, 150, bigValueofY+1);//debit
     doc.line(180, 20, 180, bigValueofY+1);//balance
     doc.line(20, bigValueofY+1, 210, bigValueofY+1);//line after header





    //  doc.setFontSize('20');
    //  doc.text('Total Balance : ',25,bigValueofY+30);
    //  doc.text(String(amount)+' - '+String(payment)+' = '+String(balance),80,bigValueofY+30);

     doc.save(this.partyids[0]['name']+'_'+this.handleF.getDateddmmyy(this.date1)+'_'+this.handleF.getDateddmmyy(this.date2)+ '.pdf')
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



