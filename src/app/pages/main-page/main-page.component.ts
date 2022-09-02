import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { handleFunction } from '../../common/services/functions/handleFunctions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [ApiCallsService]
})
export class MainPageComponent implements OnInit {
  public jsonData=[
    {
        "Pipe": {
            "Hire": 0,
            "Advance": 0
        }
    },
    {
        "Fittings": {
            "Hire": 0,
            "Advance": 5
        }
    }
]
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

  public selectedFile = null;
  public imageFolder = ''
  public panCardFile: any;
  public panCardString: string;
  public finalJson = {};
  public pythonVar = '';
  public document = new jsPDF();
public data=[]
  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService,
    public router: Router, public handleF: handleFunction,public security:SecurityCheckService) {
    localStorage.clear();
    // this.generateReportAccount();
    }
    generateReportAccount(){//threshhold is 295
// Fetch all trucks who have either 12 or 363 as false
      let data=this.handleF.removeDuplicates(this.data)
      let pager=1;
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
       doc.text('TruckNo', 12, y)//partyname
       doc.text('Account', 39, y)//partyname
       doc.text('12', 92, y)//partyname
       doc.text('363', 114, y)//partyname
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
           y=24;
           y=y+6;
       starty = 24;
           doc.addPage();
           doc.setFontSize('25');
       doc.setFontType('bold');
       doc.text('Account Details : ', 15, 15)//partyname
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
       doc.text('12', 92, y-6)//partyname
       doc.text('363', 114, y-6)//partyname
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
       
        doc.text(String(i+1), 3, y)//partyname
        doc.text(data[i].truckno, 11, y)//partyname

       doc.text(data[i].accountDetails[0].accountName, 39, y)//partyname
       doc.text(String(data[i].accountDetails[0].accountNumber), 39, y+4)//partyname
       doc.text(data[i].accountDetails[0].ifsc, 39, y+8)//partyname
  
                  
         doc.line(0, y + 11, 210, y + 11);//line after header
         y = y + 15;
   
         
       //vertical lines//getting applied for every loop, make it happen once only
       doc.line(10, starty, 10, y-4);//srno
       doc.line(38, starty, 38, y-4);//date
       doc.line(90, starty, 90, y-4);//truckno
       doc.line(112, starty, 112, y-4);//credit
       doc.line(134, starty, 134, y-4);//credit
       //vertical lines
       }
  
       doc.save('Account-Details.pdf')
     }

  login(data) {
    this.security.setBranch(data);
    
    this.router.navigate(['Login']);
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
download(){
    var doc = new jsPDF()
    doc.setFontSize('30');
    doc.setFontType('bold');
    doc.setTextColor(224,0,0);
    doc.text('Nitin Roadways And Cargo Movers',15, 25)

    doc.setFontSize('16');
    doc.setFontType('bold');
    doc.setFontType('italic');
    doc.setTextColor(0, 0, 0);
    // doc.text('(TRANSPORT CONTRACTOR & COMMISSION AGENT)', 30, 35)

    doc.setDrawColor(163,0,0);
    doc.setLineWidth(0.5);
    doc.line(15, 33, 195, 33);

    doc.setFontSize('15');
    doc.setFontType('bold');
    doc.setTextColor(224,0,0);
    doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 15, 38)

    doc.setDrawColor(163,0,0);
    doc.setLineWidth(0.5);
    doc.line(15, 39, 195, 39);

    doc.setFontType('normal');
    doc.setFontSize('15');
    doc.setTextColor(0, 0, 0);
    doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 25, 51)
    doc.setFontSize('12');
    doc.text('Email : punenitinroadways@gmail.com    Website : www.nitinroadways.in', 25, 58)


    doc.setFontType('italic');
    doc.setFontSize('14');
    doc.setTextColor(0, 0, 0);
    doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 25, 65)

    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.8);
    doc.line(15, 67, 195, 67);

    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.2);
    doc.line(15, 68, 195, 68);

    doc.setFontSize('12');
    doc.setFontType('normal');
    doc.setTextColor(0, 0, 0);

    doc.setFontType('bold');
    doc.setDrawColor(0,0,0);
    doc.text('Bill No. : ',25,79)
    doc.text('Date : ',150,79)

    doc.line(15, 85, 195, 85);
    doc.line(15, 85, 15, 290);
    doc.line(195, 85, 195, 290);
    doc.line(15, 290, 195, 290);

    doc.text("Owner's Name : ",18,95);
    doc.text("Contact : ",120,95);

   
    doc.save('test.pdf')
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
    // this.download();
    }
 
}

