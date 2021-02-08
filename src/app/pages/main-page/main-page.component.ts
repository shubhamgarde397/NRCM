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
      "_id": "60182bdbdeb170e12b66052b",
      "truckData": [
        {
          "date": "2021-01-08",
          "truckno": "TN59 BT 8597",
          "pageno": 130,
          "amount": 2950
        }, {
          "date": "2021-01-08",
          "truckno": "TN59 BT 8597",
          "pageno": 130,
          "amount": 2950
        },
        {
          "date": "2021-01-08",
          "truckno": "TN59 BT 8597",
          "pageno": 130,
          "amount": 2950
        },
        {
          "date": "2021-01-08",
          "truckno": "TN59 BT 8597",
          "pageno": 130,
          "amount": 2950
        }
      ],
      "todayDate": "2021-02-01",
      "bankName": "5",
      "ifsc": "5",
      "accountNumber": "5",
      "accountName": "5",
      "comments": ""
    },
    {
      "_id": "60182bdbdeb170e12b66052b",
      "truckData": [
        {
          "date": "2021-01-08",
          "truckno": "TN59 BT 8597",
          "pageno": 130,
          "amount": 2950
        }, {
          "date": "2021-01-08",
          "truckno": "TN59 BT 8597",
          "pageno": 130,
          "amount": 2950
        },
        {
          "date": "2021-01-08",
          "truckno": "TN59 BT 8597",
          "pageno": 130,
          "amount": 2950
        },
        {
          "date": "2021-01-08",
          "truckno": "TN59 BT 8597",
          "pageno": 130,
          "amount": 2950
        }
      ],
      "todayDate": "2021-02-01",
      "bankName": "5",
      "ifsc": "5",
      "accountNumber": "5",
      "accountName": "5",
      "comments": ""
    },
    {
      "_id": "60182bdbdeb170e12b66052b",
      "truckData": [
        {
          "date": "2021-01-08",
          "truckno": "TN59 BT 8597",
          "pageno": 130,
          "amount": 2950
        }
      ],
      "todayDate": "2021-02-01",
      "bankName": "5",
      "ifsc": "5",
      "accountNumber": "5",
      "accountName": "5",
      "comments": ""
    },
    {
      "_id": "60182bdbdeb170e12b66052b",
      "truckData": [
        {
          "date": "2021-01-08",
          "truckno": "TN59 BT 8597",
          "pageno": 130,
          "amount": 2950
        },
        {
          "date": "2021-01-08",
          "truckno": "TN59 BT 8597",
          "pageno": 130,
          "amount": 2950
        }
      ],
      "todayDate": "2021-02-01",
      "bankName": "5",
      "ifsc": "5",
      "accountNumber": "5",
      "accountName": "5",
      "comments": ""
    }, {
      "_id": "60182bdbdeb170e12b66052b",
      "truckData": [
        {
          "date": "2021-01-08",
          "truckno": "TN59 BT 8597",
          "pageno": 130,
          "amount": 2950
        },
        {
          "date": "2021-01-08",
          "truckno": "TN59 BT 8597",
          "pageno": 130,
          "amount": 2950
        }
      ],
      "todayDate": "2021-02-01",
      "bankName": "5",
      "ifsc": "5",
      "accountNumber": "5",
      "accountName": "5",
      "comments": ""
    },
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
    let i;
    if (confirm('Fresh Page?')) {
      i = 16;
    } else {
      let z = '';
      let str = "";
      while (z != null) {
        z = prompt('Enter Truck Numbers');
        if (z.length > 1) {
          alert('Cannot have more than 9 trucks, Please enter lesser value or print on new page.')
        } else {
          if (z == null || z == "") {
            break;
          }
          str = str + z + "11";
        }
      }



      i = this.getValueofI(str) + 16;
    }
    if (i > 280) {
      i = 16;
    }


    let pageno = 1;
    let dateFormat = this.temp[0].todayDate.slice(8, 10) + '-' + this.temp[0].todayDate.slice(5, 7) + '-' + this.temp[0].todayDate.slice(0, 4);
    var doc = new jsPDF();
    //Static Part Start
    //Date
    doc.setFontSize('10');
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text(dateFormat, 90, i + 5 - 16)
    doc.text(String(pageno), 190, i + 5 - 16)
    pageno = pageno + 1;
    //Date
    //line after date
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(0, i + 6 - 16, 210, i + 6 - 16);
    //line after date
    //5 vertical lines for amount, comments, pageno,date,trucno, account details(account details is further divided into 3 parts per data need a loop here)
    //vertical line after date
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(37, i + 6 - 16, 37, i + 12 - 16);
    doc.line(61, i + 6 - 16, 61, i + 12 - 16);
    doc.line(72, i + 6 - 16, 72, i + 12 - 16);
    doc.line(92, i + 6 - 16, 92, i + 12 - 16);
    doc.line(135, i + 6 - 16, 135, i + 12 - 16);


    //vertical line after date till headers
    //Headers
    doc.setFontSize('10');
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Amount', 16, i + 10 - 16)
    doc.text('Comments', 38, i + 10 - 16)
    doc.text('Pg', 63, i + 10 - 16)
    doc.text('Date', 72.5, i + 10 - 16)
    doc.text('TruckNo', 92.5, i + 10 - 16)
    doc.text('Account Details', 135.5, i + 10 - 16)
    //Headers End
    //Line after headers
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(0, i + 12 - 16, 210, i + 12 - 16);
    //Line after headers
    //Static Part End
    //Dynamic Part Start
    doc.setFontSize('10');
    doc.setFontType('normal');
    doc.setTextColor(0, 0, 0);
    // doc.text('Shubham is awesome', 1, i);
    for (let z = 0; z < this.temp.length; z++) {
      let data = this.temp[z].truckData;


      if (((data.length * 6) + 15 + i) > 295) {
        doc.addPage();
        //Static Part Start
        //Date
        doc.setFontSize('10');
        doc.setFontType('bold');
        doc.setTextColor(0, 0, 0);
        doc.text(dateFormat, 90, 5)
        doc.text(String(pageno), 190, 5)
        pageno = pageno + 1;
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
        doc.line(37, 6, 37, 12);
        doc.line(61, 6, 61, 12);
        doc.line(72, 6, 72, 12);
        doc.line(92, 6, 92, 12);
        doc.line(135, 6, 135, 12);
        //vertical line after date
        //Headers
        doc.setFontSize('10');
        doc.setFontType('bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Amount', 16, 10)
        doc.text('Comments', 38, 10)
        doc.text('Pg', 63, 10)
        doc.text('Date', 72.5, 10)
        doc.text('TruckNo', 92.5, 10)
        doc.text('Account Details', 135.5, 10)
        //Headers End
        //Line after headers
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(0, 12, 210, 12);
        //Line after headers
        //Static Part End
        //Dynamic Part Start
        doc.setFontSize('10');
        doc.setFontType('normal');
        doc.setTextColor(0, 0, 0);
        i = 16;
      }
      let K = 0
      doc.setFontSize('10');
      doc.text(this.temp[z].comments, 38.5, i);//comments
      for (let k = 0; k < data.length; k++) {
        doc.setFontSize('10');
        doc.text(String(this.temp[z].truckData[k].amount), 16, i);//amount

        doc.setFontSize('10');
        doc.text(String(this.temp[z].truckData[k].pageno), 61.5, i);//pgno
        doc.setFontSize('10');
        doc.text(this.temp[z].truckData[k].date.slice(8, 10) + '/' + this.temp[z].truckData[k].date.slice(5, 7) + '/' + this.temp[z].truckData[k].date.slice(0, 4), 72.5, i);//date
        doc.setFontSize('10');
        doc.text(this.temp[z].truckData[k].truckno.split(' ').join(''), 92.5, i);//truckno
        K = k;
        i = i + 6;
      }
      doc.line(0, i + 7, 210, i + 7);



      //console.log(i - (data.length * 6));
      // doc.line(37, 29, 37, 29);
      // doc.line(61, 29, 61, 29);
      // doc.line(72, 29, 72, 29);
      // doc.line(92, 29, 92, 29);
      // doc.line(135, 29, 135, 29);
      doc.line(37, i - (data.length * 6) - 5, 37, i + 7);
      doc.line(61, i - (data.length * 6) - 5, 61, i + 7);
      doc.line(72, i - (data.length * 6) - 5, 72, i + 7);
      doc.line(92, i - (data.length * 6) - 5, 92, i + 7);
      doc.line(135, i - (data.length * 6) - 5, 135, i + 7);

      doc.setFontSize('10');
      doc.text(this.temp[z].accountName, 136.5, i - (data.length * 6));//accno
      doc.text(String(this.temp[z].accountNumber), 136.5, i + 6 - (data.length * 6));//accname
      doc.text(this.temp[z].ifsc + '-' + this.temp[z].bankName, 136.5, i + 12 - (data.length * 6));//ifsc-bankname

      i = i + 12;
    }
    //Dynamic Part End
    doc.save(dateFormat + '.pdf')
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
