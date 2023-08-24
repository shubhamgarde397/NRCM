import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { ExcelService } from '../../../common/services/sharedServices/excel.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Button } from 'protractor';
import { DuesPageComponent } from '../../Dues/dues-page/dues-page.component';
import { templateSourceUrl } from '@angular/compiler';

@Component({
  selector: 'app-poch-pdf',
  templateUrl: './poch-pdf.component.html',
  styleUrls: ['./poch-pdf.component.css']
})
export class PochPdfComponent implements OnInit {
  public show = false;
  public showPDFButton=false;
  public found;
  public date = new Date();
  public balanceDate = [];
  public pochDate='';
  public printInfo = false;


  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public excelService: ExcelService,
    public securityCheck: SecurityCheckService, public handleF: handleFunction) {
     
  }

  ngOnInit() {

  }

  
  find = function () {
    let tempObj = {};

    tempObj['method'] = 'PochGivenPDF';
    tempObj['tablename'] = '';
    tempObj['givenDate'] = this.pochDate;
    this.apiCallservice.handleData_New_python
      ('turnbook', 1, tempObj, true)
      .subscribe((res:any) => {
        this.showPDFButton=true;
        this.printInfo = true;
        this.balanceDate = [];
        this.balanceDate = res.Data;
      });
  };


  PochBill(){//threshhold is 295
    let data=this.balanceDate;
    var doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a5',
      putOnlyUsedFonts:true
     })
    for(let i=0;i<data.length;i++){
     
       this.pdfData(doc,data[i]);
       doc.addPage();
    }
    this.pdfDataCount(doc,data)
    doc.save(this.pochDate)
 }

 pdfDataCount(doc,data){

  
  let d=new Date()
  let billno=String(d.getMinutes())+String(d.getSeconds());
  doc.setLineDash([1, 0], 10);
  doc.setFontSize('30');
  doc.setFontType('bold');
  doc.setTextColor(224,0,0);
  doc.text('NITIN ROADWAYS',28, 18)
  doc.line(0, 86, 5, 86);//punching line helper
  doc.setDrawColor(163,0,0);
  doc.setLineWidth(0.5);
  doc.line(3, 23, 146, 23);
  
  doc.setFontSize('11');
  doc.setFontType('bold');
  doc.setTextColor(224,0,0);
  doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 8,27)
  doc.setDrawColor(163,0,0);
  doc.setLineWidth(0.5);
  doc.line(3, 28, 146, 28);
  
  doc.setFontType('normal');
  doc.setFontSize('12');
  doc.setTextColor(0, 0, 0);
  doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 10, 35)
  doc.setFontSize('12');
  doc.text('Email : punenitinroadways@gmail.com  Website : www.nitinroadways.in', 10, 40)
  
  
  doc.setFontType('italic');
  doc.setFontSize('11');
  doc.setTextColor(0, 0, 0);
  doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 10, 45)
  
  doc.setDrawColor(224,0,0);
  doc.setLineWidth(0.8);
  doc.line(3, 47, 146, 47);
  
  doc.setDrawColor(224,0,0);
  doc.setLineWidth(0.2);
  doc.line(3, 48, 146, 48);
  
  doc.setFontSize('12');
  doc.setFontType('normal');
  doc.setTextColor(0, 0, 0);
  
  doc.setFontType('bold');
  doc.setDrawColor(0,0,0);
  doc.text('Bill No. :    '+billno,10,55)
  doc.text('Date : '+this.handleF.getDateddmmyy(this.pochDate),110,55)
  
  doc.setFontType('bold');
  doc.setFontSize('10');

  doc.text("A Total of "+data.length+" PODs have been submitted today.",20,66)
  
}

 pdfData(doc,data){

  
     let d=new Date()
     let billno=String(d.getMinutes())+String(d.getSeconds());
     doc.setLineDash([1, 0], 10);
     doc.setFontSize('30');
     doc.setFontType('bold');
     doc.setTextColor(224,0,0);
     doc.text('NITIN ROADWAYS',28, 18)
     doc.line(0, 86, 5, 86);//punching line helper
     doc.setDrawColor(163,0,0);
     doc.setLineWidth(0.5);
     doc.line(3, 23, 146, 23);
     
     doc.setFontSize('11');
     doc.setFontType('bold');
     doc.setTextColor(224,0,0);
     doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 8,27)
     doc.setDrawColor(163,0,0);
     doc.setLineWidth(0.5);
     doc.line(3, 28, 146, 28);
     
     doc.setFontType('normal');
     doc.setFontSize('12');
     doc.setTextColor(0, 0, 0);
     doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 10, 35)
     doc.setFontSize('12');
     doc.text('Email : punenitinroadways@gmail.com  Website : www.nitinroadways.in', 10, 40)
     
     
     doc.setFontType('italic');
     doc.setFontSize('11');
     doc.setTextColor(0, 0, 0);
     doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 10, 45)
     
     doc.setDrawColor(224,0,0);
     doc.setLineWidth(0.8);
     doc.line(3, 47, 146, 47);
     
     doc.setDrawColor(224,0,0);
     doc.setLineWidth(0.2);
     doc.line(3, 48, 146, 48);
     
     doc.setFontSize('12');
     doc.setFontType('normal');
     doc.setTextColor(0, 0, 0);
     
     doc.setFontType('bold');
     doc.setDrawColor(0,0,0);
     doc.text('Bill No. :    '+billno,10,55)
     doc.text('Date : '+this.handleF.getDateddmmyy(this.pochDate),110,55)
     
     doc.text("We Nitin Roadways are submitting "+data['sum']+" PODs to",20,66)
     doc.text(data['_id'],20,72.5)
     

 
     
     doc.setFontType('bold');
     doc.setFontSize('10');

     doc.text('Sr.',19,88)
     doc.text('Load Date',27,88)
     doc.text('Truck No',53,88)
     doc.text('Destination',84,88)
     doc.text('LRNO',120,88)
     doc.line(17, 90, 140, 90);
     // Table heading
     // Need a for loop here
     let start=97
     for(let k=0;k<data.sum;k++){
       // Table rows
       doc.line(17, start, 140, start);

       doc.text(String(k+1),19,start-9+7)//108-
     doc.text(this.handleF.getDateddmmyy(data['loadingDate'][k]),27,start-9+7)
     doc.text(data['truckno'][k],50,start-9+7)
     doc.text(data['place'][k],84,start-9+7)
     doc.text(data['nrlrno'][k],115,start-9+7)

       start=start+7;
       // Table rows
     }
     // Table square
     doc.line(17, 83, 140, 83);
     doc.line(17, 83, 17, start-7);
     doc.line(140, 83, 140, start-7);
     // Table square

         // Table heading
         doc.line(25, 83, 25, start-7);//srno
         doc.line(47, 83, 47, start-7);//date
         doc.line(79, 83, 79, start-7);//truckno
         doc.line(113, 83, 113, start-7);//destination145

     // Need a for loop here
     // Signature
     doc.setFontSize('10');

     doc.text("Signature ___________________",87,start-7+18)//165
     // Signature
     doc.setFontSize('10');
     doc.setFontType('bold');
     doc.text('Please check and pay the pending balance to : ',35,start-7+30)//158
     
     // Account
 // Account square
 doc.line(17, start-7+34, 140, start-7+34);
 doc.line(17, start-7+34, 17, start-7+48);
 doc.line(140, start-7+34, 140, start-7+48);
 doc.line(17, start-7+48, 140, start-7+48);
 // Account square
 // Account rows
 doc.line(17, start-7+41, 140, start-7+41);
 // Account rows
 // Account heading
 doc.line(47, start-7+34, 47, start-7+48);//date
 doc.line(79, start-7+34, 79, start-7+48);//truckno
 doc.line(109, start-7+34, 109, start-7+48);//truckno
 
 doc.setFontSize('10');
 doc.setFontType('bold');
 
 doc.text('Account Name',19.5,start-7+39)
 doc.text('Account Number',49,start-7+39)
 doc.text('Bank Name',85,start-7+39)
 doc.text('IFSC',120,start-7+39)
 
 doc.text('Nitin Roadways',19,start-7+46)
 doc.text('3265201000363',50,start-7+46)
 doc.text('Canara Bank',83,start-7+46)
 doc.text('CNRB0003265',112,start-7+46)
 // Account heading
 // Table
 }
  
}