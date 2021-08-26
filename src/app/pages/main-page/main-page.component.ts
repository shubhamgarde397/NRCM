import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
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
  temp = [
    {
      "bf": true,
      "type": "buy",
      "partyName": "Balance Follow",
      "amount": 0,
      "value": 0
    },
    {
      "lrno": 6909,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "KA01 AH 7778",
      "date": "2021-01-06",
      "amount": 44000
    },
    {
      "lrno": 6970,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN28 AR 0660",
      "date": "2021-01-08",
      "amount": 41500
    },
    {
      "lrno": 6978,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN58 BA 5305",
      "date": "2021-01-18",
      "amount": 41500
    },
    {
      "lrno": 6935,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN64 S 2077",
      "date": "2021-01-22",
      "amount": 44000
    },
    {
      "date": "2021-02-01",
      "amount": 215000,
      "type": "payment",
      "partyName": "Universal Marketing"
    },
    {
      "lrno": 6998,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN58 AV 9982",
      "date": "2021-02-06",
      "amount": 41500
    },
    {
      "lrno": 7108,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN64 L 4871",
      "date": "2021-02-13",
      "amount": 44000
    },
    {
      "lrno": 7111,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN25 AL 2516",
      "date": "2021-02-15",
      "amount": 45000
    },
    {
      "lrno": 7119,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN34 AD 2144",
      "date": "2021-02-17",
      "amount": 44000
    },
    {
      "lrno": 7067,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN93 5927",
      "date": "2021-03-01",
      "amount": 44500
    },
    {
      "lrno": 7197,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN29 BL 9891",
      "date": "2021-03-05",
      "amount": 47000
    },
    {
      "lrno": 7187,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "MH12 QW 3212",
      "date": "2021-03-05",
      "amount": 47000
    },
    {
      "lrno": 7196,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "MH12 QW 3059",
      "date": "2021-03-05",
      "amount": 47000
    },
    {
      "lrno": 7077,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN57 AX 2599",
      "date": "2021-03-11",
      "amount": 44500
    },
    {
      "lrno": 7088,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN32 J 8469",
      "date": "2021-03-20",
      "amount": 42500
    },
    {
      "lrno": 7273,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN83 C 1074",
      "date": "2021-03-25",
      "amount": 47000
    },
    {
      "lrno": 7309,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN66 Z 1909",
      "date": "2021-04-05",
      "amount": 44500
    },
    {
      "lrno": 7318,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN32 AR 7320",
      "date": "2021-04-09",
      "amount": 44500
    },
    {
      "lrno": 7330,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN38 CX 3299",
      "date": "2021-04-19",
      "amount": 44500
    },
    {
      "lrno": 7347,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN54 S 7843",
      "date": "2021-04-24",
      "amount": 44500
    },
    {
      "lrno": 7350,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN58 BA 5305",
      "date": "2021-04-29",
      "amount": 45500
    },
    {
      "lrno": 7584,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN38 CU 6769",
      "date": "2021-06-25",
      "amount": 44500
    },
    {
      "lrno": 7600,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN58 BD 4917",
      "date": "2021-07-06",
      "amount": 44500
    },
    {
      "lrno": 7719,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN93 B 2604",
      "date": "2021-07-17",
      "amount": 44500
    },
    {
      "lrno": 7713,
      "type": "buy",
      "partyName": "Universal Marketing",
      "truckNo": "TN64 H 2272",
      "date": "2021-07-22",
      "amount": 44500
    }
  ]


  modalData;
  public loginV = false;
  public hoverThis = false;
  public now = new Date();
  changed = false;
  public hehe;
  public morseIS = '';
  public clue = false;
  public fileFormData = new FormData();
  public fileFormDataPython = new FormData();
  public newAuthor: any;
  // 
  selectedFile = null;
  imageFolder = ''
  panCardFile: any;
  //base64s
  panCardString: string;
  //json
  finalJson = {};
  public pythonVar = '';
  public document = new jsPDF();
  // 
  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService,
    public router: Router, public handlefunction: handleFunction) {
    localStorage.clear();
  }
  download() {//threshhold is 295
    var doc = new jsPDF()
    doc.setFontSize('25');
    doc.setFontType('bold');
    doc.text('Nitin', 15, 15)//partyname
    doc.setFontSize('10');
    doc.text('08-01-2020 to 08-08-2021', 165, 19)//date
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
    doc.text('Credit', 108, y)//partyname
    doc.text('Debit', 133, y)//partyname
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
    if (this.temp[0]['bf'] == true) {
      y = y + 5;
      starty = 31;
      doc.text(this.temp[0].partyName, 30, y)//partyname
      doc.text(String(this.temp[0].value), 155, y)//partyname
      doc.line(20, 31, 210, 31);
      doc.line(150, 25, 150, 31);
      y = y + 6;
    }

    for (let i = 1; i < this.temp.length; i++) {
      doc.text(String(i), 23, y)//partyname
      doc.text(this.temp[i].date, 32, y)//partyname

      if (this.temp[i].type === 'buy') {
        doc.text(String(this.temp[i].lrno), 88, y)//lrno
        doc.text(this.temp[i].truckNo, 57, y)//truckno
      } else {
        doc.text(String('-'), 88, y)//lrno
        doc.text(String('-'), 57, y)//truckno
      }
      if (this.temp[i].type === 'buy') {
        doc.text(String(this.temp[i].amount), 108, y)//partyname
        doc.text(String('-'), 133, y)//partyname
      } else {
        doc.text(String(this.temp[i].amount), 133, y)//partyname
        doc.text(String('-'), 108, y)//partyname
      }

      doc.text(String(this.temp[i].value), 155, y)//partyname
      doc.line(20, y + 1, 210, y + 1);//line after header
      y = y + 5;
    }

    //vertical lines
    doc.line(30, starty, 30, y - 4);//srno
    doc.line(55, starty, 55, y - 4);//date
    doc.line(83, starty, 83, y - 4);//truckno
    doc.line(100, starty, 100, y - 4);//lrno
    doc.line(125, starty, 125, y - 4);//credit
    doc.line(150, starty, 150, y - 4);//debit
    doc.line(180, 20, 180, y - 4);//balance
    //vertical lines


    doc.save('tp2' + '.pdf')
  }

  login() {
    this.router.navigate(['Login']);
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

  upload() {
    this.fileFormData.append('name', this.imageFolder);
    this.apiCallservice.handleImage(this.fileFormData, 'http://localhost:3000/image/addImage')
      .subscribe((res) => {
        this.fileFormData = new FormData();
      }, err => {

      })
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

  sendData() {
    this.fileFormDataPython.append('input', this.pythonVar);
    this.apiCallservice.handleData_Pyhon('rohit', 0, this.fileFormDataPython)
      .subscribe((res: any) => {
        this.pythonVar = '';
      })

  }

  showAlert() {
    this.pythonVar = prompt('Enter your question');
    if (this.pythonVar != '') {
      this.fileFormDataPython.append('input', this.pythonVar);
      this.apiCallservice.handleData_Pyhon('rohit', 0, this.fileFormDataPython)
        .subscribe((res: any) => {
          alert(JSON.parse(res['_body']).Status);
          this.fileFormDataPython = new FormData();
        })
    } else {
      this.pythonVar = prompt('Enter your question');

      this.fileFormDataPython.append('input', this.pythonVar);
      this.apiCallservice.handleData_Pyhon('rohit', 0, this.fileFormDataPython)
        .subscribe((res: any) => {
          alert(JSON.parse(res['_body']).Status);
          this.fileFormDataPython = new FormData();
        })
    }
  }

  getMorse(data) {
    this.morseIS = this.handlefunction.normalMorseCode(data);
  }

  clueCall() {
    this.clue = true;
  }
  // a will be the array to pass for eg: 412212111
  //4 trucks wale in bulk are a digit number which is 2
  //2 trucks wale in bulk are a digit number which is 2
  //1 trucks wale in bulk are a digit number which is 1
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
}



// for(let i=0;i<a.length;i=i+l+2){

//   let x=parseInt(a[i]);

//   let l=parseInt(a[i+1]);

//   let X=parseInt(a.slice(i+2,i+2+l));


//   I=I+((6*parseInt(X))*(x+2))

// }
