import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [ApiCallsService]
})
export class MainPageComponent implements OnInit {
  public loginV = false;
  public fromloading='2026-01-01';
  public toloading='2026-01-01';
  public partyids=[{name:'SSRV'}]

public data=[
    {
        "_id": "5b15f7735fe9b8da111a5692",
        "total": 696500,
        "name": "Shri Vijay PVC Distributors"
    },
    {
        "_id": "5b15f7735fe9b8da111a5691",
        "total": 595500,
        "name": "Shri Vijay Pipe Corporation"
    },
    {
        "_id": "62319dba178670f1863553dc",
        "total": 301000,
        "name": "Krishnaveni Associates"
    },
     {
        "_id": "5b15f7735fe9b8da111a5696",
        "total": 610000,
        "name": "Sri Ram Traders"
    },
    {
        "_id": "5b15f7735fe9b8da111a5697",
        "total": 720500,
        "name": "SS Agency"
    },
    {
        "_id": "5b15f7735fe9b8da111a5696",
        "total": 435000,
        "name": "K2 Polymers"
    },
    {
        "_id": "6224d5e61ed896a9957d28d4",
        "total": 205000,
        "name": "Rajendra Pumps"
    },
      {
        "_id": "5b15f7735fe9b8da111a568e",
        "total": 94000,
        "name": "Tirumala Pipe Distributors"
    },
     {
        "_id": "5b15f7735fe9b8da111a5699",
        "total": 79000,
        "name": "Tubes and Pipes_Salem"
    },
     {
        "_id": "5b15f7735fe9b8da111a568f",
        "total": 56000,
        "name": "Shri Jayalaxmi Stores"
    },
    {
        "_id": "5f1448e5565d0d1aae735cd5",
        "total": 46500,
        "name": "Universal Marketing"
    },
    {
        "_id": "5b15f7735fe9b8da111a568e",
        "total": 46000,
        "name": "Shakthi Agency"
    },
    {
        "_id": "5b15f7735fe9b8da111a5674",
        "total": 45000,
        "name": "ALS & T_Coimbatore"
    },
    {
        "_id": "5b15f7735fe9b8da111a5670",
        "total": 44500,
        "name": "Ajantha Hardware"
    }
]

  public belowTwenty: string[] = [
    "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];

  public tens: string[] = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
  ];
  constructor(
    
    public apiCallservice: ApiCallsService,
    public router: Router,
    public security:SecurityCheckService,
    public handleF : handleFunction
  ) {
    localStorage.clear();
    }

 convertNumberToWords(amount: number | string): string {
  const numStr: string = Number(amount).toFixed(2);
  const [wholePart, decimalPart] = numStr.split('.');



 


  // Handle Rupee words
  const rupeesNum: number = parseInt(wholePart, 10);
  const rupeesWord: string = rupeesNum === 0 ? "Zero" : this.convertToWords(rupeesNum);
  let result: string = rupeesWord + " Rupee" + (rupeesNum === 1 ? "" : "s");

  // Handle Paise words
  const paiseNum: number = parseInt(decimalPart, 10);
  if (paiseNum > 0) {
    result += " and " + this.getBelowHundred(paiseNum) + " Paise";
  }

  return result + " Only";
}

  getBelowHundred(n: number): string {
    if (n < 20) return this.belowTwenty[n];
    const digit: number = n % 10;
    return this.tens[Math.floor(n / 10)] + (digit > 0 ? " " + this.belowTwenty[digit] : "");
  }


   convertToWords(n: number): string {
    if (n === 0) return "";
    if (n < 100) return this.getBelowHundred(n);
    if (n < 1000) {
      return this.belowTwenty[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " " + this.getBelowHundred(n % 100) : "");
    }
    if (n < 100000) { // Thousands
      return this.convertToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + this.convertToWords(n % 1000) : "");
    }
    if (n < 10000000) { // Lakhs
      return this.convertToWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + this.convertToWords(n % 100000) : "");
    }
    // Crores
    return this.convertToWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + this.convertToWords(n % 10000000) : "");
  }

  login(data) {
    this.security.setBranch(data);
    this.router.navigate(['Login']);
    this.loginV = true;
    
  }


  sendMsg(type,typo,no){

    switch (typo) {
      case 'wa':
            window.open('https://wa.me/+91'+no+'/?text=Hi','_blank'); 

        break;
        case 'txt':
            window.open('sms:+91'+no+'?body=Hi','_blank');  
        break;
    
      
    }
    
      }
  

  ngOnInit() { 
    // this.DownloadLR();
    

          // let tempObj1={}
          
          // tempObj1 = { "method": "getBankDeclarationData", "tablename": ''};    
  
          
          // this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
          //   .subscribe((res: any) => {
          //       res.Data;
                // this.downloadBank(this.data)
            // });

    

  }

  downloadBank(data) {
    let wordY=0;
    var doc = new jsPDF()
    doc.setFontSize('28');
    doc.setFontType('bold');
    doc.setTextColor(224,0,0);
    doc.text('NITIN ROADWAYS AND CARGO MOVERS',7, 25)

    doc.setFontSize('16');
    doc.setFontType('bold');
    doc.setFontType('italic');
    doc.setTextColor(0, 0, 0);

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
    doc.text('Cell :- 9822288257, 8459729293, 9423580221, 8529275757', 25, 51)
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
doc.text('MAY-26', 50, 73)
doc.text('Date :- 03-06-2026 ', 141, 73)
    // doc.text(this.timeLog.toString() + ' - ' + this.timeLogYear.toString(), 50, 73)
    // doc.text('Date :- ' + this.dateSetter(), 141, 73)
    doc.text('To,', 25, 80)
    doc.text('Branch Manager,', 40, 85)
    doc.text('Canara Bank,', 40, 90)
    doc.text('Dhankawadi Branch,', 40, 95)
    doc.text('Pune.', 40, 100)

    doc.setFontSize('15');

  
 let v=[]
  for(let i=0;i<data.length;i++){
    let temp=[]
    temp.push(String(i+1))
    temp.push(data[i].name)
    temp.push(String(data[i].total))
    v.push(temp)

    wordY=110+(i*10)
  }
  v.push(['','Total',String(this.counts(data))])

doc.autoTable({
      head: [['Sr'].concat(['Name of Party','Amount'])],
      body: v,
      style:[],
      theme: 'grid',
      startY: 110,
      margin: {  left: 25 },
      headStyles :{lineWidth: 1,fillColor: [215, 6, 9],textColor: [255,255,255],
      },
      tableWidth: 'wrap'
  })
 doc.setFontSize('10');
    doc.setFontType('normal');
  doc.text('In Words : ', 25, wordY);
  doc.text(this.convertNumberToWords(this.counts(data))+' Only.', 25, wordY+5);
    doc.save('T.pdf')
  }

    counts(a){
    let sum=0;
    a.forEach(r=>{
     
            sum=sum+r['total'];
        
    }); 
    return sum;
}

   DownloadLR() {//298,
      let temp={};
      let y=0
      let x=0
      var doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts:true
       })
       
       
    
      doc.setFontSize('25');
      doc.setFontType('bold');
      doc.setTextColor(224,0,0);

        doc.text('SANTOSH ROADLINES',100, 14)
          doc.setFontSize('12');
        doc.text('Fleet Owners & Transport Contractors', 112, 19)
doc.setFontType('normal');
    doc.text('D-501, Ishal Surshti, Warje, Pune - 411052. Phone No. 64700716 M.: 9970302537', 72, 24)
    doc.text('E-mail : kadamsantoshk@yahoo.com', 117, 29)

      // Consinee Consinor Box
      292
  doc.line(5,32,292,32)
  doc.line(97,32,97,66)
  //doc.line(194,32,194,96)

doc.line(30,40,93,40)
doc.line(30,48,93,48)
doc.line(30,56,93,56)
doc.line(30,64,93,64)

doc.line(125,40,190,40)
doc.line(125,48,190,48)
doc.line(125,56,190,56)
doc.line(125,64,190,64)
  
  doc.setFontSize('12');
  doc.setFontType('bold');
doc.text('Consignor ', 7, 40)
doc.text('Consignee ', 99, 40)

doc.text('G.C. Note No. ', 196, 40)
doc.text('Date ', 196, 46)
doc.text('From ', 196, 52)
doc.text('To ', 196, 58)
doc.text('Truck No ', 196, 64)

doc.line(225,40,292,40)
doc.line(208,46,292,46)
doc.line(208,52,292,52)
doc.line(203,58,292,58)
doc.line(215,64,292,64)

doc.line(5,66,292,66)
doc.line(5,66,5,180)
doc.line(292,66,292,180)
doc.line(5,180,292,180)


doc.line(20,66,20,180)
doc.line(136,66,136,180)
  doc.line(188,66,188,180)
  doc.line(240,66,240,180)
doc.line(5,75,292,75)

    // Inside box Text
      doc.save('a.pdf')
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

}
