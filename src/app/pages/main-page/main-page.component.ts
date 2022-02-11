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
  public contact;
  temp = [
    {
        "lrno": 8248,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN15 D 7922",
        "placeName": "Thanjavur",
        "date": "2022-01-01",
        "amount": 50000
    },
    {
        "lrno": 8267,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN54 S 7843",
        "placeName": "Mayavaram",
        "date": "2022-01-01",
        "amount": 48500
    },
    {
        "date": "2022-01-01",
        "amount": 97500,
        "type": "payment",
        "partyName": "Shri Vijay PVC Distributors"
    },
    {
        "lrno": 8268,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN37 DY 0703",
        "placeName": "Erode",
        "date": "2022-01-03",
        "amount": 42500
    },
    {
        "lrno": 8250,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN37 DX 0696",
        "placeName": "Erode",
        "date": "2022-01-03",
        "amount": 46000
    },
    {
        "date": "2022-01-03",
        "amount": 241000,
        "type": "payment",
        "partyName": "Shri Vijay PVC Distributors"
    },
    {
        "lrno": 8303,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN16 C 3771",
        "placeName": "Pudukottai",
        "date": "2022-01-04",
        "amount": 51000
    },
    {
        "lrno": 8301,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN29 BZ 2794",
        "placeName": "Coimbatore",
        "date": "2022-01-04",
        "amount": 47000
    },
    {
        "lrno": 8270,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN38 CC 9311",
        "placeName": "Coimbatore",
        "date": "2022-01-04",
        "amount": 43500
    },
    {
        "date": "2022-01-04",
        "amount": 99500,
        "type": "payment",
        "partyName": "Shri Vijay PVC Distributors"
    },
    {
        "lrno": 8305,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN32 BB 2287",
        "placeName": "Thanjavur",
        "date": "2022-01-05",
        "amount": 50000
    },
    {
        "lrno": 8275,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN16 E 5035",
        "placeName": "Ariyalur",
        "date": "2022-01-05",
        "amount": 44500
    },
    {
        "lrno": 8273,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN18 BB 0245",
        "placeName": "Erode",
        "date": "2022-01-05",
        "amount": 42500
    },
    {
        "date": "2022-01-05",
        "amount": 147000,
        "type": "payment",
        "partyName": "Shri Vijay PVC Distributors"
    },
    {
        "lrno": 8307,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN25 BK 5951",
        "placeName": "Thanjavur",
        "date": "2022-01-06",
        "amount": 50000
    },
    {
        "lrno": 8308,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN15 D 7270",
        "placeName": "Mayavaram",
        "date": "2022-01-06",
        "amount": 53000
    },
    {
        "date": "2022-01-06",
        "amount": 46000,
        "type": "payment",
        "partyName": "Shri Vijay PVC Distributors"
    },
    {
        "lrno": 8311,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN99 V 1144",
        "placeName": "Coimbatore",
        "date": "2022-01-07",
        "amount": 47000
    },
    {
        "lrno": 8312,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN32 AQ 0392",
        "placeName": "Kumbhakonam",
        "date": "2022-01-07",
        "amount": 53000
    },
    {
        "lrno": 8313,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN90 E 5035",
        "placeName": "Thanjavur",
        "date": "2022-01-07",
        "amount": 50000
    },
    {
        "lrno": 8283,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN65 AQ 0923",
        "placeName": "Trichy",
        "date": "2022-01-07",
        "amount": 44500
    },
    {
        "lrno": 8280,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN54 T 5648",
        "placeName": "Trichy",
        "date": "2022-01-07",
        "amount": 44500
    },
    {
        "lrno": 8282,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN18 AM 1297",
        "placeName": "Mayavaram",
        "date": "2022-01-07",
        "amount": 48500
    },
    {
        "lrno": 8281,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN29 BR 2937",
        "placeName": "Trichy",
        "date": "2022-01-07",
        "amount": 44500
    },
    {
        "date": "2022-01-07",
        "amount": 48500,
        "type": "payment",
        "partyName": "Shri Vijay PVC Distributors"
    },
    {
        "lrno": 8284,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN93 D 9887",
        "placeName": "Trichy",
        "date": "2022-01-08",
        "amount": 44500
    },
    {
        "lrno": 8285,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN56 Q 6266",
        "placeName": "Thanjavur",
        "date": "2022-01-08",
        "amount": 46500
    },
    {
        "date": "2022-01-08",
        "amount": 139500,
        "type": "payment",
        "partyName": "Shri Vijay PVC Distributors"
    },
    {
        "lrno": 8318,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN32 AF 0434",
        "placeName": "Pattukottai",
        "date": "2022-01-09",
        "amount": 53000
    },
    {
        "lrno": 8322,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN48 BB 5230",
        "placeName": "Thanjavur",
        "placeName2": "Thanjavur",
        "date": "2022-01-10",
        "amount": 50000
    },
    {
        "lrno": 8321,
        "type": "buy",
        "partyName": "Shri Vijay PVC Distributors",
        "truckNo": "TN99 Z 1144",
        "placeName": "Kumbhakonam",
        "date": "2022-01-10",
        "amount": 53000
    },
    {
        "date": "2022-01-10",
        "amount": 142500,
        "type": "payment",
        "partyName": "Shri Vijay PVC Distributors"
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
  public paymentData;
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
    public router: Router, public handleF: handleFunction) {
    localStorage.clear();

  }


  login() {
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
    this.morseIS = this.handleF.normalMorseCode(data);
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
