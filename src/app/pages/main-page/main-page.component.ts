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

  public data=[
    {
        "_id": "Mukund Roadlines",
        "sum": 17,
        "loadingDate": [
            "2023-10-18",
            "2023-10-27",
            "2023-11-03",
            "2023-11-04",
            "2023-11-04",
            "2023-11-07",
            "2023-11-20",
            "2023-11-24",
            "2023-11-24",
            "2023-11-25",
            "2023-11-28",
            "2023-11-28",
            "2023-12-01",
            "2023-12-02",
            "2023-12-04",
            "2023-12-06",
            "2023-12-05"
        ],
        "nrlrno": [
            "CHK00945",
            "KTD00965",
            "KTD01016",
            "CHK0104244",
            "KTD01023",
            "KTD01034",
            "CHK01109",
            "KTD01087",
            "KTD01088",
            "KTD01095",
            "KTD01106",
            "KTD01107",
            "",
            "CHK01182",
            "KTD01147",
            "KTD01156",
            "KTD01151"
        ],
        "place": [
            "CBE",
            "CBE",
            "CBE",
            "CBE",
            "CBE",
            "CBE",
            "CBE",
            "CBE",
            "CBE",
            "CBE",
            "CBE",
            "CBE",
            "CBE",
            "CBE",
            "CBE",
            "CBE",
            "CBE"
        ],
        "party": [
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines",
            "Mukund Roadlines"
        ],
        "truckno": [
            "TN16 E 7101",
            "TN66 W 8231",
            "TN58 AS 6279",
            "TN37 DX 0696",
            "KA51 AG 9600",
            "TN66 W 1839",
            "TN66 Z 1909",
            "TN37 DY 0703",
            "KA22 D 2023",
            "TN38 CU 6769",
            "TN52 AC 3735",
            "TN48 BW 4037",
            "TN42 AM 4213",
            "TN64 R 8722",
            "TN34 AY 0677",
            "TN57 BH 1839",
            "TN02 BK 4869"
        ],
        "rent": [
          '',
          '',
          38000,
          39000,
          38000,
          38000,
          39000,
          38000,
          38000,
          38000,
          38000,
          38000,
          '',
          '',
          '',
          '',
          ''
      ],
      "adv": [
        '',
        '',
          35000,
          36000,
          35000,
          35000,
          36000,
          35000,
          35000,
          35000,
          35000,
          35000,
          '',
          '',
          '',
          '',
          ''
    ],
    "bal": [
      '',
      '',
          3000,
          3000,
          3000,
          3000,
          3000,
          3000,
          3000,
          3000,
          3000,
          3000,
          '',
          '',
          '',
          '',
          ''
  ],
        "hamt": [],
        "advanceArray": []
    }
]

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
    this.PochBill()
    }
    PochBill(){//threshhold is 295
      let data=this.data;
      
      for(let i=0;i<data.length;i++){
        var doc = new jsPDF({
          orientation: 'p',
          unit: 'mm',
          format: 'a5',
          putOnlyUsedFonts:true
         }) 
         this.pdfData(doc,data[i]);
        doc.save('T1')
      }
      
   }

    pdfData(doc,data){

  
      let d=new Date()
      let billno=String(d.getMinutes())+String(d.getSeconds());
      doc.setLineDash([1, 0], 10);
      doc.setFontSize('30');
      doc.setFontType('bold');
      doc.setTextColor(224,0,0);
      doc.text('NITIN ROADWAYS',28, 18)
      doc.line(0, 86, 5, 86);//punching line helper
      doc.setDrawColor(163,0,0);
      doc.setLineWidth(0.5);
      doc.line(3, 23, 146, 23);
      
      doc.setFontSize('11');
      doc.setFontType('bold');
      doc.setTextColor(224,0,0);
      doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 8,27)
      doc.setDrawColor(163,0,0);
      doc.setLineWidth(0.5);
      doc.line(3, 28, 146, 28);
      
      doc.setFontType('normal');
      doc.setFontSize('12');
      doc.setTextColor(0, 0, 0);
      doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 10, 35)
      doc.setFontSize('12');
      doc.text('Email : punenitinroadways@gmail.com  Website : www.nitinroadways.in', 10, 40)
      
      
      doc.setFontType('italic');
      doc.setFontSize('11');
      doc.setTextColor(0, 0, 0);
      doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 10, 45)
      
      doc.setDrawColor(224,0,0);
      doc.setLineWidth(0.8);
      doc.line(3, 47, 146, 47);
      
      doc.setDrawColor(224,0,0);
      doc.setLineWidth(0.2);
      doc.line(3, 48, 146, 48);
      
      doc.setFontSize('12');
      doc.setFontType('normal');
      doc.setTextColor(0, 0, 0);
      
      doc.setFontType('bold');
      doc.setDrawColor(0,0,0);
      doc.text('Bill No. :    '+billno,10,55)
      doc.text('Date : '+this.handleF.getDateddmmyy('2023-12-16'),110,55)
      
      doc.text("We Nitin Roadways are submitting "+data['sum']+" PODs to",15,66)
      doc.text(data['_id'],15,72.5)
      
// 
// Signature box
   doc.line(110, 58, 143, 58);
   doc.line(110, 58, 110, 80);
   doc.line(143, 58, 143, 80);
   doc.line(110, 80, 143, 80);
   doc.setFontSize('8');
   doc.setTextColor(132,132,132);
   doc.text('Sign & Stamp',118,69)
// 
doc.setTextColor(0, 0, 0);
      
      doc.setFontType('bold');
      doc.setFontSize('10');
 
      doc.text('Sr.',12,88)
      doc.text('Load Date',20,88)
      doc.text('Truck No',46,88)
      doc.text('Dest.',71,88)
      doc.text('LRNO',85,88)
      doc.text('Rent',108,88)
      doc.text('Adv',122,88)
      doc.text('Bal',134,88)
      doc.line(10, 90, 143, 90);
      // Table heading
      // Need a for loop here
      let start=97
      for(let k=0;k<data.sum;k++){
        // Table rows
        doc.line(10, start, 143, start);
 
        doc.text(String(k+1),12,start-9+7)//108-
      doc.text(this.handleF.getDateddmmyy(data['loadingDate'][k]),20,start-9+7)
      doc.text(data['truckno'][k],41,start-9+7)
      doc.text(data['place'][k],71,start-9+7)
      doc.text(String(data['nrlrno'][k]),85,start-9+7)

      doc.text(String(data['rent'][k]),108,start-9+7)
      doc.text(String(data['adv'][k]),122,start-9+7)
      doc.text(String(data['bal'][k]),134,start-9+7)
 
        start=start+7;
        // Table rows
      }
      // Table square
      doc.line(10, 83, 143, 83);
      doc.line(10, 83, 10, start-7);
      doc.line(143, 83, 143, start-7);
      // Table square
 
          // Table heading
          doc.line(18, 83, 18, start-7);//srno
          doc.line(40, 83, 40, start-7);//date
          doc.line(68, 83, 68, start-7);//truckno
          doc.line(83, 83, 83, start-7);//destination145
          doc.line(107, 83, 107, start-7);//destination145
          doc.line(120, 83, 120, start-7);//destination145
          doc.line(133, 83, 133, start-7);//destination145

 
      // Need a for loop here
      // Signature
      doc.setFontSize('10');
 
      doc.text("Signature ___________________",87,start-7+18)//165
      // Signature
      doc.setFontSize('10');
      doc.setFontType('bold');
      doc.text('Please check and pay the pending balance to : ',35,start-7+30)//158
      
      // Account
  // Account square
  doc.line(17, start-7+34, 140, start-7+34);
  doc.line(17, start-7+34, 17, start-7+48);
  doc.line(140, start-7+34, 140, start-7+48);
  doc.line(17, start-7+48, 140, start-7+48);
  // Account square
  // Account rows
  doc.line(17, start-7+41, 140, start-7+41);
  // Account rows
  // Account heading
  doc.line(47, start-7+34, 47, start-7+48);//date
  doc.line(79, start-7+34, 79, start-7+48);//truckno
  doc.line(109, start-7+34, 109, start-7+48);//truckno
  
  doc.setFontSize('10');
  doc.setFontType('bold');
  
  doc.text('Account Name',19.5,start-7+39)
  doc.text('Account Number',49,start-7+39)
  doc.text('Bank Name',85,start-7+39)
  doc.text('IFSC',120,start-7+39)
  
  doc.text('Nitin Roadways',19,start-7+46)
  doc.text('3265201000363',50,start-7+46)
  doc.text('Canara Bank',83,start-7+46)
  doc.text('CNRB0003265',112,start-7+46)
  // Account heading
  // Table
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
  getValueofI(a) {
    let I = 16;
    for (let i = 0; i < a.length; i) {
      let x = parseInt(a[i]);
      let l = parseInt(a[i + 1]);
      let X = parseInt(a.slice(i + 2, i + 2 + l));
      I = I + ((6 * X) * (x + 2))
      i = i + l + 2
    }
    return I;
  }

  ngOnInit() {
    setInterval(() => {
      this.now = new Date();
      if (this.now.getSeconds() % 10 === 0) {
        this.changed = true;
      } else {
        this.changed = false;
      }
    }, 1000);
    }
 
}

