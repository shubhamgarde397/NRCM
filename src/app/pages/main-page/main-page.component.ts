import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public loginV = false;
  public fromloading='2026-01-01';
  public toloading='2026-01-01';
  public partyids=[{name:'SSRV'}]
public paymentData=[
    {
        "_id": "69576c0e749f845cb23859e6",
        "advanceArray": [
            {
                "date": "2026-01-02",
                "amount": 41400,
                "reference": "SSRV-001"
            }
        ],
        "loadingDate": "2025-12-27",
        "rent": 46000,
        "balanceArray": [
            {
                "date": "2026-03-23",
                "amount": 38700,
                "reference": "CNRBH00125270772"
            }
        ],
        "balTF": false,
        "truckNo": "KA22 D 9172",
        "place": "Tirupur"
    },
    {
        "_id": "69576c0d749f845cb23859dd",
        "advanceArray": [
            {
                "date": "2026-01-02",
                "amount": 37800
                "reference": "SSRV-001"
            }
        ],
        "loadingDate": "2025-12-27",
        "rent": 42100,
        "balanceArray": [
            {
                "date": "2026-03-23",
                "amount": 38700,
                "reference": "CNRBH00125270772"
            }
        ],
        "balTF": false,
        "truckNo": "MH11 CJ 5090",
        "place": "Karur"
    },
    {
        "_id": "69576c10749f845cb23859f2",
        "advanceArray": [
            {
                "date": "2026-01-02",
                "amount": 38700
                "reference": "SSRV-001"
            }
        ],
        "loadingDate": "2025-12-29",
        "rent": 43000,
        "balanceArray": [
            {
                "date": "2026-03-23",
                "amount": 38700,
                "reference": "CNRBH00125270772"
            }
        ],
        "balTF": false,
        "truckNo": "KA28 AB 2605",
        "place": "Karur"
    },
    {
        "_id": "69576c11749f845cb2385a03",
        "advanceArray": [
            {
                "date": "2026-01-02",
                "amount": 38700
                "reference": "SSRV-001"
            }
        ],
        "loadingDate": "2025-12-30",
        "rent": 43000,
        "balanceArray": [
            {
                "date": "2026-03-23",
                "amount": 38700,
                "reference": "CNRBH00125270772"
            }
        ],
        "balTF": false,
        "truckNo": "TN38 DK 8559",
        "place": "Pollachi"
    },
    {
        "_id": "69576c11749f845cb2385a05",
        "advanceArray": [
            {
                "date": "2026-01-02",
                "amount": 45000
                "reference": "SSRV-001"
            }
        ],
        "loadingDate": "2025-12-30",
        "rent": 50000,
        "balanceArray": [
            {
                "date": "2026-03-23",
                "amount": 38700,
                "reference": "CNRBH00125270772"
            }
        ],
        "balTF": false,
        "truckNo": "PB08 FJ 9071",
        "place": "Chennai"
    },
    {
        "_id": "69576c12749f845cb2385a0a",
        "advanceArray": [
            {
                "date": "2026-01-02",
                "amount": 37800
                "reference": "SSRV-001"
            }
        ],
        "loadingDate": "2025-12-30",
        "rent": 42100,
        "balanceArray": [
            {
                "date": "2026-03-23",
                "amount": 38700,
                "reference": "CNRBH00125270772"
            }
        ],
        "balTF": false,
        "truckNo": "MH13 EP 0611",
        "place": "Vellore"
    },
    {
        "_id": "695a13b38f09dc68509b1a23",
        "advanceArray": [
            {
                "date": "2026-01-04",
                "amount": 39150
                "reference": "SSRV-001"
            }
        ],
        "loadingDate": "2026-01-01",
        "rent": 43500,
        "balanceArray": [
            {
                "date": "2026-03-23",
                "amount": 38700,
                "reference": "CNRBH00125270772"
            }
        ],
        "balTF": false,
        "truckNo": "GJ15 AX 6995",
        "place": "Pollachi"
    },
    {
        "_id": "695a13b48f09dc68509b1a2c",
        "advanceArray": [
            {
                "date": "2026-01-04",
                "amount": 38700
                "reference": "h"
            }
        ],
        "loadingDate": "2026-01-02",
        "rent": 43000,
        "balanceArray": [
            {
                "date": "2026-03-23",
                "amount": 38700,
                "reference": "CNRBH00125270772"
            }
        ],
        "balTF": false,
        "truckNo": "KA09 AA 8021",
        "place": "Karur"
    },
    {
        "_id": "695a13b78f09dc68509b1a48",
        "advanceArray": [
            {
                "date": "2026-01-04",
                "amount": 37800
                "reference": "www.nitinr"
            }
        ],
        "loadingDate": "2026-01-03",
        "rent": 42100,
        "balanceArray": [
            {
                "date": "2026-03-23",
                "amount": 38700,
                "reference": "CNRBH00125270772"
            }
        ],
        "balTF": false,
        "truckNo": "MH11 CJ 5090",
        "place": "Karur"
    },
    
    {
        "_id": "69c0be36dc3c5aef9ba69a08",
        "advanceArray": [
            {
                "date": "2026-03-23",
                "amount": 38700,
                "reference": "CNRBH00125270772"
            }
        ],
        "loadingDate": "2026-03-20",
        "rent": 43000,
        "balanceArray": [
            {
                "date": "2026-03-23",
                "amount": 38700,
                "reference": "CNRBH00125270772"
            }
        ],
        "balTF": false,
        "truckNo": "MH14 LL 7510",
        "place": "Coimbatore"
    }
]


  constructor(
    public router: Router,
    public security:SecurityCheckService,
    public handleF : handleFunction
  ) {
    localStorage.clear();
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
}
