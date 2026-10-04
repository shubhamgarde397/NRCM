import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Consts } from '../../common/constants/const';

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

public data2=[
    {
        "total": 720000,
        "name": "Shri Vijay PVC Distributors"
    },
    {
        "total": 620000,
        "name": "Shri Vijay Pipe Corporation"
    },
    {
        "total": 203000,
        "name": "Krishnaveni Associates"
    },
    {
        "total": 710000,
        "name": "SS Agency"
    },
    {
        "total": 580000,
        "name": "Sri Ram Traders"
    },
    {
        "total": 425000,
        "name": "K2 Polymers"
    },
    {
        "total": 90000,
        "name": "Tirumala Pipe Distributors"
    },
    {
        "total": 103000,
        "name": "Kumaran Karp Limited"
    },
    {
        "total": 99000,
        "name": "Universal Marketing"
    },
    {
        "total": 126000,
        "name": "Shri Jayalaxmi Stores"
    },
    {
        "total": 98000,
        "name": "Tubes and Pipes"
    },
    {
        "total": 101000,
        "name": "ALST"
    },
]

public data={
    "_id": "6001b02a994ac0fc7654a372",
    "partyType": "NRCM",
    "hamt": 0,
    "lrno": 6975,
    "imps2": true,
    "billno": "nrcm_57",
    "particulars": [],
    "particulars2": {
        "w": "",
        "tf": "",
        "paid": "",
        "tp": "",
        "ba": ""
    },
    "truckno": "TN32 J 8469",
    "date": "2021-01-13",
    "partyname": "Shri Vijay PVC Distributors",
    "typeOfLoad": "Pipe",
    "documentno": [],
    "destination": "Thanjavur",
    "flexid": [
        {
            "flexid": 0,
            "village": "Pudukottai",
            "contact": 9842427373
        },
        {
            "flexid": 0,
            "village": "Kallakuruchi",
            "contact": 9585607313
        },
        {
            "flexid": 0,
            "village": "Coimbatore",
            "contact": 8012573735
        },
        {
            "flexid": 0,
            "village": "Trichy",
            "contact": 8012587373
        },
        {
            "flexid": 0,
            "village": "Erode",
            "contact": 8012046464
        },
        {
            "flexid": 0,
            "village": "Virudachalam",
            "contact": 9585607313
        },
        {
            "flexid": 0,
            "village": "Pattukottai",
            "contact": 8012573736
        },
        {
            "flexid": 0,
            "village": "Manargudi",
            "contact": 9361509893
        },
        {
            "flexid": 0,
            "village": "Thanjavur",
            "contact": 9361509893
        },
        {
            "flexid": 0,
            "village": "Villupuram",
            "contact": 9585607313
        },
        {
            "flexid": 0,
            "village": "Tiruvarur",
            "contact": 9361509893
        },
        {
            "flexid": 0,
            "village": "Kumbhakonam",
            "contact": 9361509893
        },
        {
            "flexid": 0,
            "village": "Mayavaram",
            "contact": 9361509893
        }
    ],
    "lrshort": "URS",
    "gstno": "33AABFS4345M1Z3",
    "fromname": "Finolex Industries Limited",
    "fromflex": 0,
    "fromaddress": "Gat No.399, Taluka Maval, Pune, Urse, Maharashtra 410506 ",
    "fromgstno": "27AAACF2634A1Z9"
}

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
                // this.DownloadLR();

    

  }

//   downloadBank(data) {
//     let wordY=0;
//     var doc = new jsPDF()
//     doc.setFontSize('28');
//     doc.setFontType('bold');
//     doc.setTextColor(224,0,0);
//     doc.text('NITIN ROADWAYS AND CARGO MOVERS',7, 25)

//     doc.setFontSize('16');
//     doc.setFontType('bold');
//     doc.setFontType('italic');
//     doc.setTextColor(0, 0, 0);

//     doc.setDrawColor(163,0,0);
//     doc.setLineWidth(0.5);
//     doc.line(15, 33, 195, 33);

//     doc.setFontSize('15');
//     doc.setFontType('bold');
//     doc.setTextColor(224,0,0);
//     doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 15, 38)

//     doc.setDrawColor(163,0,0);
//     doc.setLineWidth(0.5);
//     doc.line(15, 39, 195, 39);

//     doc.setFontType('normal');
//     doc.setFontSize('15');
//     doc.setTextColor(0, 0, 0);
//     doc.text('Cell :- 9822288257, 8459729293, 9423580221, 8529275757', 25, 51)
//     doc.setFontSize('12');
//     doc.text('Email : punenitinroadways@gmail.com    Website : www.nitinroadways.in', 25, 58)


//     doc.setFontType('italic');
//     doc.setFontSize('14');
//     doc.setTextColor(0, 0, 0);
//     doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 25, 65)


//     doc.setDrawColor(224,0,0);
//     doc.setLineWidth(0.8);
//     doc.line(15, 67, 195, 67);

//     doc.setDrawColor(224,0,0);
//     doc.setLineWidth(0.2);
//     doc.line(15, 68, 195, 68);

//     doc.setFontSize('12');
//     doc.setFontType('normal');
//     doc.setTextColor(0, 0, 0);
// doc.text('AUGUST-26', 50, 73)
// doc.text('Date :- 05-09-2026 ', 141, 73)
//     // doc.text(this.timeLog.toString() + ' - ' + this.timeLogYear.toString(), 50, 73)
//     // doc.text('Date :- ' + this.dateSetter(), 141, 73)
//     doc.text('To,', 25, 80)
//     doc.text('Branch Manager,', 40, 85)
//     doc.text('Canara Bank,', 40, 90)
//     doc.text('Dhankawadi Branch,', 40, 95)
//     doc.text('Pune.', 40, 100)

//     doc.setFontSize('15');

  
//  let v=[]
//   for(let i=0;i<data.length;i++){
//     let temp=[]
//     temp.push(String(i+1))
//     temp.push(data[i].name)
//     temp.push(String(data[i].total))
//     v.push(temp)

//     wordY=110+(i*10)
//   }
//   v.push(['','Total',String(this.counts(data))])

// doc.autoTable({
//       head: [['Sr'].concat(['Name of Party','Amount'])],
//       body: v,
//       style:[],
//       theme: 'grid',
//       startY: 110,
//       margin: {  left: 100 },
//       headStyles :{lineWidth: 1,fillColor: [215, 6, 9],textColor: [255,255,255],
//       },
//       tableWidth: 'wrap'
//   })
//  doc.setFontSize('10');
//     doc.setFontType('normal');
//   doc.text('In Words : ', 25, wordY);
//   doc.text(this.convertNumberToWords(this.counts(data))+' Only.', 25, wordY+5);
//     doc.save('T.pdf')
//   }

//     counts(a){
//     let sum=0;
//     a.forEach(r=>{
     
//             sum=sum+r['total'];
        
//     }); 
//     return sum;
// }

  

 DownloadLR(i,j) {
    let temp=this.data;
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
      'date':temp['date'],
      'billno':temp['billno'],
      'partyname':temp['partyname'],
      'truckno':temp['truckno'],
      'partyType':temp['partyType'],
      'typeofload':temp['typeOfLoad'],
      'documentno':temp['documentno'],
      'destination':temp['destination'],
      'flexid':temp.flexid.length==0?'0':temp.flexid.filter(t=>{return t.village===temp.destination})[0]['flexid'],
      'fromflex':temp['fromflex'],
      'gstno':temp['gstno'],
      'lrno':temp['lrno'],
      'particulars':temp['particulars'],
      'particulars2':temp['particulars2'],
      'fromname':temp['fromname'],
      'fromaddress':temp['fromaddress'],
      'fromgstno':temp['fromgstno'],
      'lrshort':temp['lrshort']
  }

  doc.setFontSize('10');
  doc.setFontType('bold');
  doc.setTextColor(52,65,124)
  doc.text('Subject to Pune Jurisdiction',8, 10)
  doc.addImage(om,'PNG',148,10,5,5)



  
    doc.save('Test.pdf')
  }

}
