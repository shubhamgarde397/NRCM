import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Location } from '@angular/common';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-mail-display',
  templateUrl: './mail-display.component.html',
  styleUrls: ['./mail-display.component.css']
})
export class MailDisplayComponent implements OnInit {
public data;
public paymentData;
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public location: Location,
    public handledata: HandleDataService,
    public securit: SecurityCheckService,
    public securityCheck: SecurityCheckService,
    public spin: Ng4LoadingSpinnerService,
    public obs: ObsServiceService,
    public hF: handleFunction
  ) { if(!this.securit.login){
    this.router.navigate([''])
  }}

  ngOnInit() {
    this.find()
  }
  find(){
    let tempObj={};
    tempObj['method']='displayMail';
    tempObj['tablename']='MailDetails';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {       
        this.data=res.Data;
      });
  }
  delete(id){
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'MailDetails';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: Response) => {
          alert(response['Status']);
          let bb;
          let j = 0;
          this.data.forEach((res) => {
            if (res._id == id) { bb = j; }
            j = j + 1;
          })
          this.data.splice(bb, 1);
        });
    }
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

  download(i){
    let tempObj={};
    tempObj['tablename'] = 'partyPayment'
tempObj['partyid']=[i.partyid];
    tempObj['display'] = 4;


    tempObj['frompayment'] =i.paymentFrom;
    tempObj['topayment'] =i.paymentTo;
    tempObj['fromloading'] =i.loadingFrom;
    tempObj['toloading'] =i.loadingTo;
    tempObj['method'] = 'partyPaymentPDFForParty';
        



    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        let balanceFollow={};
        
        this.paymentData = res.paymentData;
        if(i.balanceFollowAmount===0){
          balanceFollow['bf'] = false;
          this.paymentData = this.pdfJSON(res.paymentData, balanceFollow,'addBalance');
        }else{
          balanceFollow['partyName'] = i.balanceFollowMsg;
        balanceFollow['amount'] = i.balanceFollowAmount;
        balanceFollow['type'] = 'buy';
        balanceFollow['lrno'] = 'Balance Follow';
        balanceFollow['bf'] = true;
        this.paymentData = this.pdfJSON(res.paymentData, balanceFollow,'addBalance');
        }
        this.downloadForParty(i);
      });
  }


  downloadForParty(data) {//threshhold is 295
    let pager=1;
     let bigValueofY=0;
     var doc = new jsPDF()
     doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text(data.partyDetails[0].name, 15, 15)//partyname
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
  
      doc.text('Balance', 155, y)//partyname

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
     doc.text(data.partyDetails[0].name, 15, 15)//partyname
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
 
       doc.text('Balance', 155, y-6)//partyname
 
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
       
       doc.text(this.hF.getDateddmmyy(this.paymentData[i].date), 32, y)//partyname
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
 

       doc.text(String(this.paymentData[i].value), 155, y)//partyname
      
       
      
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
     doc.line(30, starty, 30, bigValueofY+1);//srno
     doc.line(55, starty, 55, bigValueofY+1);//date
     doc.line(83, starty, 83, bigValueofY+1);//truckno
     doc.line(100, starty, 100, bigValueofY+1);//lrno
     doc.line(125, starty, 125, bigValueofY+1);//credit
     doc.line(150, starty, 150, bigValueofY+1);//debit
     doc.line(180, 20, 180, bigValueofY+1);//balance
     doc.line(20, bigValueofY+1, 210, bigValueofY+1);//line after header





     doc.setFontSize('20');
    //  doc.text('Total Lorry Bill : ',25,bigValueofY+10);
    //  doc.text('Total Payment Received : ',25,bigValueofY+20);
     doc.text('Total Balance : ',25,bigValueofY+30);

    //  doc.text(String(amount),105,bigValueofY+10);
    //  doc.text(String(payment),105,bigValueofY+20);
     doc.text(String(amount)+' - '+String(payment)+' = '+String(balance),80,bigValueofY+30);

     doc.save(data.partyDetails[0].name+'_Old_Mail_Data'+'.pdf')
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
