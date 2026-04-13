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
