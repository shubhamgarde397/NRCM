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
      "_id": "5fd05b4139d88ed9d85df96c",
      "truckData": [
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        }
      ],
      "todayDate": "2020-12-09",
      "bankname": "ICICI",
      "ifsc": "ICIC0",
      "accountNumber": "3265",
      "accountName": "Shubham"
    },

    {
      "_id": "5fdef546d778c0bc817ffa9c",
      "truckData": [
        {
          "date": "2020-12-09",
          "truckno": "AP03 TC 6831",
          "pageno": 23,
          "amount": 123
        },
        {
          "date": "2020-12-21",
          "truckno": "AP03 TC 5589",
          "pageno": 23,
          "amount": 3456
        },
        {
          "date": "2020-12-09",
          "truckno": "AP03 TC 6831",
          "pageno": 23,
          "amount": 123
        }, {
          "date": "2020-12-09",
          "truckno": "AP03 TC 6831",
          "pageno": 23,
          "amount": 123
        }, {
          "date": "2020-12-09",
          "truckno": "AP03 TC 6831",
          "pageno": 23,
          "amount": 123
        }, {
          "date": "2020-12-09",
          "truckno": "AP03 TC 6831",
          "pageno": 23,
          "amount": 123
        }
      ],
      "todayDate": "2020-12-09",
      "bankname": "Canara",
      "ifsc": "CNRB",
      "accountNumber": "6258",
      "accountName": "Nitin"
    },
    {
      "_id": "5fd05b4139d88ed9d85df96c",
      "truckData": [
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        }
      ],
      "todayDate": "2020-12-09",
      "bankname": "ICICI",
      "ifsc": "ICIC0",
      "accountNumber": "3265",
      "accountName": "Shubham"
    },
    {
      "_id": "5fd05b4139d88ed9d85df96c",
      "truckData": [
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 29500
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 29500
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        }
      ],
      "todayDate": "2020-12-09",
      "bankname": "ICICI",
      "ifsc": "ICIC0",
      "accountNumber": "3265",
      "accountName": "Shubham"
    }, {
      "_id": "5fd05b4139d88ed9d85df96c",
      "truckData": [
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 29500
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 29500
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        }
      ],
      "todayDate": "2020-12-09",
      "bankname": "ICICI",
      "ifsc": "ICIC0",
      "accountNumber": "3265",
      "accountName": "Shubham"
    }, {
      "_id": "5fd05b4139d88ed9d85df96c",
      "truckData": [
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 29500
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 29500
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        },
        {
          "date": "2020-12-08",
          "truckno": "TN32 M 2542",
          "pageno": 78,
          "amount": 2950
        }
      ],
      "todayDate": "2020-12-09",
      "bankname": "ICICI",
      "ifsc": "ICIC0",
      "accountNumber": "3265",
      "accountName": "Shubham"
    }]


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
  pdf() {//threshhold is 295

    var doc = this.document;
    //Static Part Start
    //Date
    doc.setFontSize('15');
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text(this.temp[0].todayDate, 90, 5)
    //Date
    //line after date
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(0, 6, 210, 6);
    //line after date
    //5 vertical lines for amount, comments, pageno,date,trucno, account details(account details is further divided into 3 parts per data need a loop here)
    //vertical line after date
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(22, 6, 22, 300);
    doc.line(47, 6, 47, 300);
    doc.line(57, 6, 55.4, 300);
    doc.line(72, 6, 72, 300);
    doc.line(120, 6, 120, 300);
    //vertical line after date
    //Headers
    doc.setFontSize('10');
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Amount', 1, 10)
    doc.text('Comments', 23, 10)
    doc.text('Pg', 48, 10)
    doc.text('Date', 57.5, 10)
    doc.text('TruckNo', 72.5, 10)
    doc.text('Account Details', 120.5, 10)
    //Headers End
    //Line after headers
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(0, 12, 210, 12);
    //Line after headers
    //Static Part End
    //Dynamic Part Start
    doc.setFontSize('20');
    doc.setFontType('normal');
    doc.setTextColor(0, 0, 0);
    let i = 18;
    // doc.text('Shubham is awesome', 1, i);
    for (let z = 0; z < this.temp.length; z++) {
      let data = this.temp[z].truckData;
      if (data.length == 1) {

      }
      if (data.length > 1) {
        let K = 0
        for (let k = 0; k < data.length; k++) {
          doc.text(String(this.temp[z].truckData[k].amount), 1, i);//amount
          // doc.text(this.temp[z].truckData[k].amount,i,10);//comments
          doc.setFontSize('15');
          doc.text(String(this.temp[z].truckData[k].pageno), 48, i);//pgno
          doc.text(this.temp[z].truckData[k].date.slice(8, 10) + '/' + this.temp[z].truckData[k].date.slice(5, 7), 57.5, i);//date
          doc.setFontSize('20');
          doc.text(this.temp[z].truckData[k].truckno, 72.5, i);//truckno
          K = k;
          i = i + 6;
        }
        doc.line(0, i + 1, 210, i + 1);
        doc.text(this.temp[z].accountNumber, 121.5, i - (data.length * 6));//accno
        doc.text(this.temp[z].ifsc + '-' + this.temp[z].bankname, 121.5, i + 6 - (data.length * 6));//ifsc-bankname
        doc.text(this.temp[z].accountName, 121.5, i + 12 - (data.length * 6));//accname
        i = i + 7;
      }

    }
    //Dynamic Part End

    doc.save('tp.pdf')
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
        console.log(err);
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
}

