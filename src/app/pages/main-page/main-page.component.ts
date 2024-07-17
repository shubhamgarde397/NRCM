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
  public contact;
  public dateFromUI='';
  public modalData;
  public loginV = false;
  public hoverThis = false;
  public now = new Date();
  public changed = false;
  public hehe;
  public imgdata=Consts.goldennr;
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

  data=[
    {
      "_id": "NRCM",
      "partyType": [
        "NRCM"
      ],
      "pochAmount": [
        2950
      ],
      "truckno": [
        "TN66 W 8231"
      ],
      "place": [
        "Trichy"
      ],
      "loadingDate": [
        "2024-03-13"
      ],
      "billno": [
        "nrcm_6430"
      ],
      "accdetail": {
        "accountName": "M Murulidharan",
        "accountNumber": "663053000002302",
        "bankName": "SIBL",
        "ifsc": "SIBL0000663",
        "acc12": true,
        "acc363": true,
        "acc65": true
      },
      "contactqr": "9443655061",
      "actualPaymentAmount": 2950,
      "actualPaymentDate": "2024-05-05"
    },
    {
      "_id": "NR",
      "partyType": [
        "NR",
        "NR",
        "NR",
        "NR"
      ],
      "pochAmount": [
        3545,
        2950,
        2950,
        2950
      ],
      "truckno": [
        "TN66 W 8231",
        "TN66 W 8231",
        "TN66 W 8231",
        "TN66 W 1839"
      ],
      "place": [
        "Coimbatore",
        "Coimbatore",
        "Coimbatore",
        "Coimbatore"
      ],
      "loadingDate": [
        "2024-03-08",
        "2024-03-30",
        "2024-04-13",
        "2024-04-19"
      ],
      "billno": [
        "nr_2418",
        "nr_2427",
        "nr_2455",
        "nr_2466"
      ],
      "accdetail": {
        "accountName": "M Murulidharan",
        "accountNumber": "663053000002302",
        "bankName": "SIBL",
        "ifsc": "SIBL0000663",
        "acc12": true,
        "acc363": true,
        "acc65": true
      },
      "contactqr": "9443655061",
      "actualPaymentAmount": 12395,
      "actualPaymentDate": "2024-05-02"
    },
    {
      "_id": "SNL",
      "partyType": [
        "SNL"
      ],
      "pochAmount": [
        2950
      ],
      "truckno": [
        "TN66 W 1839"
      ],
      "place": [
        "Pune"
      ],
      "loadingDate": [
        "2024-04-05"
      ],
      "billno": [
        "snl_121"
      ],
      "accdetail": {
        "accountName": "M Murulidharan",
        "accountNumber": "663053000002302",
        "bankName": "SIBL",
        "ifsc": "SIBL0000663",
        "acc12": true,
        "acc363": true,
        "acc65": true
      },
      "contactqr": "9443655061",
      "actualPaymentAmount": 2950,
      "actualPaymentDate": "2024-06-29"
    }
  ]

  qr=''


  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService,
    public router: Router, public handleF: handleFunction,public security:SecurityCheckService) {
    localStorage.clear();
    // if(!this.security.login){
    //   this.router.navigate([''])
    // }
    // this.downloadBank({refNo:'12345'});
    }
    dateSetter() {
      if (this.dateFromUI === undefined || this.dateFromUI === '') {
        return '';
      }
      return this.dateFromUI.slice(8, 11) + '-' + this.dateFromUI.slice(5, 7) + '-' + this.dateFromUI.slice(0, 4)
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

}
