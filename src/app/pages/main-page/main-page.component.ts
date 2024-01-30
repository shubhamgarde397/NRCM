import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { handleFunction } from '../../common/services/functions/handleFunctions';
import { Consts } from '../../common/constants/const';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [ApiCallsService]
})
export class MainPageComponent implements OnInit {
    public formData={}
public objectKeys = Object.keys;
public items = { keyOne: 'value 1', keyTwo: 'value 2', keyThree: 'value 3' };
  public contact;
  public modalData;
  public loginV = false;
  public hoverThis = false;
  public now = new Date();
  public changed = false;
  public hehe;
  public morseIS = '';
  public clue = false;
  public fileFormData = new FormData();
  public fileFormDataPython = new FormData();
  public newAuthor: any;
  public paymentData;
  public selectedDate = '2024-01-06'
  public pochDate= '2024-01-17';
  public selectedFile = null;
  public imageFolder = ''
  public panCardFile: any;
  public panCardString: string;
  public finalJson = {};
  public pythonVar = '';
  public document = new jsPDF();

  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService,
    public router: Router, public handleF: handleFunction,public security:SecurityCheckService) {
    localStorage.clear();
    }

    


  login(data) {
    this.security.setBranch(data);
    
    this.router.navigate(['Login']);
    this.loginV = true;
    
  }

  track(){
    this.security.setBranch('nrcm');
    this.router.navigate(['TRACK']);
    this.loginV = true;
  }
  sendMsg(type,typo){

    switch (typo) {
      case 'wa':
        switch (type) {
          case 'nitin':
            window.open('https://wa.me/+919822288257/?text=Hi','_blank');    
            break;
            case 'shubham':
            window.open('https://wa.me/+919766707061/?text=Hi','_blank');    
            break;
        }
        break;
        case 'txt':
        switch (type) {
          case 'nitin':
            window.open('sms:+919822288257?body=Hi','_blank');    
            break;
            case 'shubham':
            window.open('sms:+919766707061?body=Hi','_blank');    
            break;
        }
        break;
    
      
    }
    
    
      }
    
  whatsapp() {
    this.router.navigate(['Whatsapp']);
    this.loginV = true;
  }

  whysapp() {
    this.router.navigate(['WhysApp']);
    this.loginV = true;
  }
  reverseMe() {
    this.hehe = this.hehe.split('').reverse().join('');
  }

  incomingFile(file) {

    this.selectedFile = file.target.files[0]
    if (file) {
      this.fileFormData.append('image', file.target.files[0]);

    }
  }






  getMorse(data) {
    this.morseIS = this.handleF.normalMorseCode(data);
  }

  clueCall() {
    this.clue = true;
  }
  ngOnInit() {
    this.lr();
    setInterval(() => {
      this.now = new Date();
      if (this.now.getSeconds() % 10 === 0) {
        this.changed = true;
      } else {
        this.changed = false;
      }
    }, 1000);
    }




  ls(no){
    if(no<6){
      return 3;
    }
    else if(no>=6){
      return no-5+this.ls(no-1);
    }
  }

amountSettler(d,c){return d.reduce((partialSum, a) => partialSum + a[c], 0);}

lr() {
  let om = Consts.om;
  let y=2
  let x=0
  var doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts:true
   })
   let data={
    'date':'2024-01-26',
    'billno':'1234',
    'partyname':'Shri Vijay PVC Distributors',
    'truckno':'TN99 V 9999',
    'typeofload':'Pipe',
    'documentno':['F12456585478','F124565456456'],
    'destination':'Pudukottai',
    'flexid':'130564',
    'gstno':'33AFGPG3657Z1Z4',
    'documentid':[],
    'fromaddress':'Gat No.399, Taluka Maval, Pune, Urse, Maharashtra 410506',
    'fromgstno':'27ASDFG4565A4Z4'
}
// Box on the page
doc.line(2,2,295,2)
doc.line(2,2,2,208)
doc.line(295,2,295,208)
doc.line(2,208,295,208)
// 2
// Box on the page

  doc.setFontSize('25');
  doc.setFontType('bold');
  doc.setTextColor(224,0,0);
  doc.addImage(om,'PNG',102,y+1,5,5)
  doc.text('NITIN ROADWAYS AND CARGO MOVERS',15, y+14)

  doc.setFontSize('16');
  doc.setFontType('bold');
  doc.setFontType('italic');
  doc.setTextColor(0, 0, 0);

  doc.setFontType('normal');
  doc.setFontSize('12');
  doc.setTextColor(0, 0, 0);
  doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 25, y+21)
  doc.text('Email : punenitinroadways@gmail.com    Website : www.nitinroadways.in', 25, y+26)


  doc.setFontType('italic');
  doc.setTextColor(0, 0, 0);
  doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 25, y+31)


  doc.setDrawColor(224,0,0);
  doc.setLineWidth(0.8);
  doc.line(5, y+33, 197, y+33);

  doc.setDrawColor(224,0,0);
  doc.setLineWidth(0.2);
  doc.line(5, y+34, 197, y+34);

  // outline for outher details hosizontal and vertical line
  doc.setLineWidth(0.1);  
  doc.setDrawColor(0,0,0);
  doc.line(200,2,200,208)
  doc.line(2,38,295,38)
  // outline for outher details hosizontal and vertical line
  // top right box
  doc.line(260,2,260,38)
  doc.line(200,21.5,295,21.5)
  // top right box
  // info in top right box
doc.setFontSize('10');
doc.setFontType('bold');
doc.setTextColor(52,65,124)
doc.text('(Subject to Pune Jurisdiction)',205, 12)
doc.setTextColor(0,0,0)
doc.setFontSize('10');
doc.setFontType('bold')
doc.text('GSTIN NO. : 27AFGPG3657L1Z5',203,28)
doc.text('PAN : AFGPG3657L',203,35)
doc.setTextColor(52,65,124)
doc.text('DATE',263,26)
doc.text('BILL NO',263,8)
doc.setTextColor(0,0,0)
doc.setFontType('normal');
doc.setFontSize('12')

doc.text(data.billno,263,16)
doc.text(data.date,263,34)

  // info in top right box
 
// Body BOX horiontal lines
doc.line(2,46,295,46)
// doc.line(2,56,295,56)
// doc.line(2,63,295,63)
doc.line(2,84,200,84)

doc.line(2,91,51,91)
doc.line(110,91,200,91)

doc.line(2,98,51,98)
doc.line(110,98,200,98)

doc.line(2,105,51,105)
doc.line(110,105,200,105)

doc.line(2,112,200,112)
doc.line(2,119,200,119)
doc.line(2,126,200,126)
doc.line(2,133,200,133)
doc.line(2,194,200,194)
doc.line(2,201,130,201)//

doc.line(200,56,295,56)
doc.line(200,63,295,63)
doc.line(200,70,295,70)
doc.line(200,77,295,77)
doc.line(200,84,295,84)
doc.line(200,91,295,91)
doc.line(200,98,295,98)
doc.line(200,105,295,105)
doc.line(200,112,295,112)
doc.line(200,119,295,119)
doc.line(200,126,295,126)
doc.line(200,133,295,133)
doc.line(200,140,295,140)

doc.line(200,194,295,194)
doc.line(200,201,295,201)
// Body Box vertical lines
doc.line(101,38,101,84)
doc.line(248,56,248,119)
doc.line(10,84,10,112)
doc.line(51,84,51,112)
doc.line(110,84,110,133)
doc.line(155,84,155,98)
doc.line(60,112,60,133)
doc.line(90,133,90,194)
doc.line(130,194,130,208)
// Headings
doc.setFontType('bold')
doc.text('Sr         Invoice Nos.',4,89)
doc.text('Actual Weight',120,89)
doc.text('Charged Weight',162,89)
doc.text('Eway Bill No and Valid Upto',130,103)
doc.text('Description (Contains)',5,117)
doc.text('Value of Goods',72,117)
doc.text('Remarks (If Any)',135,117)


doc.setFontSize('20');
doc.setTextColor(52,65,124)
doc.text(data.truckno,58,100)
doc.setTextColor(0,0,0)
doc.setFontSize('10');
doc.text('1.',4,96)
doc.text('2.',4,103)
doc.text('3.',4,110)
// 
// doc.text('F124565879564',5,85)loop this
// Inside box Text
doc.setFontType('normal')
doc.text('EWAY BILL ATTACHED WITH INVOICE COPY',115,110)
// 
doc.setFontSize('12');
doc.setFontType('bold');
doc.setTextColor(0,0,0)
doc.text('Consignor',30,43)
doc.text('Consignee',120,43)
doc.setTextColor(52,65,124)
doc.text("AT OWNER'S RISK",228,43)
doc.setFontSize('14');
doc.text('M/s. Finolex Industries Limited',5,52)
doc.text(data.partyname,103,52)
doc.setTextColor(0,0,0)
// doc.text(data.typeofload,30,43)
// doc.text(data.destination,120,43)
// 
doc.setFontSize('11');
doc.text('Insurace Details',210,50)
doc.setFontSize('9');
doc.text('Policy No. And Date',210,55)
doc.setTextColor(52,65,124)
doc.text('GST Payable by : '+data.partyname,203,199)
doc.setTextColor(0,0,0)
doc.text('This is a computer generated LR Copy',215,206)
doc.text(data.fromaddress,5,60)
doc.text('Shipping Address : As Per Bill to '+data.destination,103,60)
doc.text('Customer Id : ',5,65)
doc.text('Customer Id : '+data.flexid,103,65)
doc.text('GST NO : '+data.fromgstno,5,70)
doc.text('GST NO : '+data.gstno,103,70)

doc.setFontSize('11');
doc.setFontType('bold');
doc.text('Particulars',210,61)
doc.text('Freight Amt',210,68)
doc.text('Delivery Charge',210,75)
doc.text('Detention Charge',210,82)
doc.text('Unloading Charges',210,89)
doc.text('Sub Total',210,96)
doc.text('GST @   %',210,103)
doc.text('Grand Total',210,110)
doc.text('Amount in Words : ',210,117)

doc.text('Amount',258,61)
doc.text('0.00',285,68)
doc.text('0.00',285,75)
doc.text('0.00',285,82)
doc.text('0.00',285,89)
doc.text('0.00',285,96)
doc.text('0.00',285,103)
doc.text('0.00',285,110)

doc.setTextColor(255,0,0)
doc.text('DO NOT PAY CASH TO LORRY DRIVER ONLY ISSUE CHEQUE',3,199)
doc.text('IN FAVOR OF NITIN ROADWAYS AND CARGO MOVERS',3,206)
doc.setTextColor(52,65,124)
doc.text('Signature of Consignor',132,199)
doc.setTextColor(132,132,132);
doc.text('Acknowledgement Signature & Stamp',10,165)
doc.setTextColor(0,0,0);
doc.text("Delivered Good's Remarks",92,139)
// Condition
doc.setFontSize('8')
doc.setTextColor(244,0,0)
doc.text("Terms and Conditions : ",202,145)
doc.setTextColor(0,0,0)
doc.text("1. Goods will be sent at the owner's risk.",202,149)
doc.text("2. If goods are under a permit & if permit is missing,",202,153)
doc.text("the owner will be responsible.",205,156)
doc.text("3. Any cases of fire, riots or accidents the owner will be responsible.",202,160)
doc.text("4. If there is any claim it should be informed within a month.",202,164)
doc.text("5. Jurisdiction will be at the Pune Court.",202,168)
doc.text("6. Goods must be unloaded within 2 days after arrival of the vehicle,",202,172)
doc.text("if not the demurrange will have to be borne by the consignee.",205,175)
doc.text("7. Conditions & value of the consignments",202,179)
doc.text("are not known to the company.",205,182)
doc.text("8. Make proper insurance of the goods,",202,186)
doc.text("we are not responsible for damage or shortage of goods.",202,189)

// Condition
// Inside box Text
  doc.save('lr.pdf')
}
}
