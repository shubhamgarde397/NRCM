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
      "date": "2021-01-06",
      "amount": 44000,
      "value": 44000
    },
    {
      "lrno": 6970,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-01-08",
      "amount": 41500,
      "value": 85500
    },
    {
      "lrno": 6978,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-01-18",
      "amount": 41500,
      "value": 127000
    },
    {
      "lrno": 6935,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-01-22",
      "amount": 44000,
      "value": 171000
    },
    {
      "date": "2021-02-01",
      "amount": 215000,
      "type": "payment",
      "partyName": "Universal Marketing",
      "value": -44000
    },
    {
      "lrno": 6998,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-02-06",
      "amount": 41500,
      "value": -2500
    },
    {
      "lrno": 7108,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-02-13",
      "amount": 44000,
      "value": 41500
    },
    {
      "lrno": 7111,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-02-15",
      "amount": 45000,
      "value": 86500
    },
    {
      "lrno": 7119,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-02-17",
      "amount": 44000,
      "value": 130500
    },
    {
      "lrno": 7067,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-03-01",
      "amount": 44500,
      "value": 175000
    },
    {
      "lrno": 7197,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-03-05",
      "amount": 47000,
      "value": 222000
    },
    {
      "lrno": 7187,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-03-05",
      "amount": 47000,
      "value": 269000
    },
    {
      "lrno": 7196,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-03-05",
      "amount": 47000,
      "value": 316000
    },
    {
      "lrno": 7077,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-03-11",
      "amount": 44500,
      "value": 360500
    },
    {
      "lrno": 7088,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-03-20",
      "amount": 42500,
      "value": 403000
    },
    {
      "lrno": 7273,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-03-25",
      "amount": 47000,
      "value": 450000
    },
    {
      "lrno": 7309,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-04-05",
      "amount": 44500,
      "value": 494500
    },
    {
      "lrno": 7318,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-04-09",
      "amount": 44500,
      "value": 539000
    },
    {
      "lrno": 7330,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-04-19",
      "amount": 44500,
      "value": 583500
    },
    {
      "lrno": 7347,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-04-24",
      "amount": 44500,
      "value": 628000
    },
    {
      "lrno": 7350,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-04-29",
      "amount": 45500,
      "value": 673500
    },
    {
      "lrno": 7584,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-06-25",
      "amount": 44500,
      "value": 718000
    },
    {
      "lrno": 7600,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-07-06",
      "amount": 44500,
      "value": 762500
    },
    {
      "lrno": 7719,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-07-17",
      "amount": 44500,
      "value": 807000
    },
    {
      "lrno": 7713,
      "type": "buy",
      "partyName": "Universal Marketing",
      "date": "2021-07-22",
      "amount": 44500,
      "value": 851500
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
    doc.setFontSize('30');
    doc.setFontType('bold');
    doc.text('Nitin', 20, 20)//partyname

    doc.setLineWidth(0.8);
    doc.line(0, 28, 210, 28);
    doc.line(20, 28, 20, 300);

    doc.setFontSize('12');
    doc.text('Srno', 23, 35)//partyname
    doc.text('Date', 48, 35)//partyname
    doc.text('Lrno', 78, 35)//partyname
    doc.text('Amount', 115, 35)//partyname
    doc.text('Balance', 165, 35)//partyname
    doc.line(0, 38, 210, 38);
    doc.line(20, 28, 20, 300);

    doc.line(38, 28, 38, 38);
    doc.line(68, 28, 68, 38);
    doc.line(98, 28, 98, 38);
    doc.line(148, 28, 148, 38);

    if (this.temp[0]['bf'] == true) {
      doc.text(this.temp[0].partyName, 30, 45)//partyname
      doc.text(String(this.temp[0].value), 165, 45)//partyname
      doc.line(0, 48, 210, 48);
      doc.line(148, 38, 148, 48);
    }


    doc.setFontSize('15');


    doc.save('tp1' + '.pdf')
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
