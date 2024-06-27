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
import { Consts } from '../../../common/constants/const';
@Component({
  selector: 'app-poch-pdf',
  templateUrl: './poch-pdf.component.html',
  styleUrls: ['./poch-pdf.component.css']
})
export class PochPdfComponent implements OnInit {
  public show = false;
  public showPDFButton=false;
  public showPochData=false;
  public found;
  public date = new Date();
  public balanceDate = [];
  public pochDate='';
  public printInfo = false;
  public sstampsign='';
  public ssign='';
  public adminMode='Admin Inactive!'
  public admin=false;
  public data=[];
  public billno='';

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public excelService: ExcelService,
    public securityCheck: SecurityCheckService, public handleF: handleFunction) {
     
  }

  ngOnInit() {
  }

  adminF(){
    let a = prompt('Enter Password');
    if(a=='NRCM'){
      this.admin=true;
      this.adminMode='Admin Activated!'
    }
    else{
      this.admin=false;
      this.adminMode='Admin Inactive!!'
    }
  }
  
  find = function () {
    if(this.pochDate===''){
      this.pochDate=this.handleF.generateDatefromBillno(this.billno);
    }
    let tempObj = {};

    tempObj['method'] = 'PochGivenPDF';
    tempObj['tablename'] = '';
    tempObj['givenDate'] = this.pochDate;
    this.apiCallservice.handleData_New_python
      ('turnbook', 1, tempObj, true)
      .subscribe((res:any) => {
        if(res.Data.length>0){
        this.showPDFButton=true;
        this.printInfo = true;
        this.balanceDate = [];
        this.balanceDate = res.Data;
        }else{
          this.showPDFButton=false;
          alert('No Data Present')
        }
      });
  };

  showData(i){
    let temp={
    }
    for(let ii=0;ii<i.sum;ii++){
      temp={
        truckno:i['truckno'][ii],
        loadingDate:i['loadingDate'][ii],
        nrlrno:i['nrlrno'][ii],
        hamt:i['hamt'][ii],
        partyAdvance:i['partyAdvance'][ii],
        partyBalance:i['partyBalance'][ii]
      }
      this.data.push(temp)
    }
    console.log(this.data);
    
    this.showPochData=true;
  }



PochBill(i,j){//threshhold is 295
  let data=this.balanceDate;
  let threshhold=this.threshholdCalculator(data[0]['sum']);
    var doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a5',
      putOnlyUsedFonts:true
     }) 
     this.pdfData(doc,data[j],false);
     doc.addPage();
     this.pdfData(doc,data[j],true);
    doc.save(data[j]['_id'])
  
}


threshholdCalculator(data){//16

  let t=15
  let oe = data%2==0?4:5//4
  if(data>15){
    if(data%15==0){
      return 15;
    }
    else{
      if(data>18){
        return 15;
      }
      else{
    return t=t-oe;//11
      }
    }
  }
  else{
    return t;
  }
}

pageCalculator(data){
  let t=this.threshholdCalculator(data);
  let arr=[];    
  if(data<15){
    return 1
  }
  else{
    arr.push(t);
    data=data-t;
    while(data>0){  
      if(data<t){
        arr.push(data);
        data=0;
      }
      else{
        arr.push(t)
        data=data-t
      }
  }
  return arr.length
  }
}

pdfData(doc,data,ack){
  let threshhold=this.threshholdCalculator(data.sum);
  let pager=1;
  let pagerMax=this.pageCalculator(data.sum);
  let d=new Date()
  // let billno=String(d.getMinutes())+String(d.getSeconds());
  let billno = this.handleF.generateBillByDate(this.pochDate)
  doc.setLineDash([1, 0], 10);
  doc.setFontSize('30');
  doc.setFontType('bold');
  doc.setTextColor(224,0,0);
  doc.text('NITIN ROADWAYS',28, 18)
  doc.line(0, 106, 5, 106);//punching line helper
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
  
  doc.text("We Nitin Roadways are submitting "+data['sum']+" PODs to",15,66)
  doc.text(data['_id'],15,72.5)
  doc.setTextColor(224,0,0);
  doc.setFontSize('10');
  doc.text('PAN No. : AFGPG0575D',15,80)
  doc.setFontSize('12');
  doc.setTextColor(0, 0, 0);
// 
// Signature box
doc.line(110, 58, 143, 58);
doc.line(110, 58, 110, 80);
doc.line(143, 58, 143, 80);
doc.line(110, 80, 143, 80);
doc.setFontSize('8');
doc.setTextColor(132,132,132);
doc.text('Sign & Stamp',118,69)
// 
doc.setTextColor(0, 0, 0);
  
  doc.setFontType('bold');
  doc.setFontSize('10');

  doc.text('Sr.',12,88)
  doc.text('Load Date',20,88)
  doc.text('Truck No',46,88)
  doc.text('Dest.',71,88)
  doc.text('LRNO',85,88)
  doc.text('Rent',108,88)
  doc.text('Adv',122,88)
  doc.text('Bal',134,88)
  doc.line(10, 90, 143, 90);
  // Table heading
  // Need a for loop here
  let start=97
  let tsum=0
  for(let k=0;k<data.sum;k++){
    // IF LOOP
    if(tsum==threshhold){
      tsum=0;
      doc.setTextColor(132,132,132);
      doc.text('Page '+pager+' of '+pagerMax,120,205)
      if(ack){
        doc.setFontType('bold');
        doc.setFontSize('20');
        doc.setTextColor(132,132,132);
      doc.text('Acknowledgement Slip',21,205)
      doc.setTextColor(0,0,0);
      doc.setFontType('normal');
      }
      pager=pager+1;
      doc.setTextColor(0,0,0);
      // Table square
  doc.line(10, 83, 143, 83);
  doc.line(10, 83, 10, start-7);
  doc.line(143, 83, 143, start-7);
  // Table square

      // Table heading
      doc.line(18, 83, 18, start-7);//srno
      doc.line(40, 83, 40, start-7);//date
      doc.line(68, 83, 68, start-7);//truckno
      doc.line(83, 83, 83, start-7);//destination145
      doc.line(107, 83, 107, start-7);//destination145
      doc.line(120, 83, 120, start-7);//destination145
      doc.line(133, 83, 133, start-7);//destination145

       doc.addPage();
      let d=new Date()
  // let billno=String(d.getMinutes())+String(d.getSeconds());
  doc.setLineDash([1, 0], 10);
  doc.setFontSize('30');
  doc.setFontType('bold');
  doc.setTextColor(224,0,0);
  doc.text('NITIN ROADWAYS',28, 18)
  doc.line(0, 106, 5, 106);//punching line helper
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
  
  doc.text("We Nitin Roadways are submitting "+data['sum']+" PODs to",15,66)
  doc.text(data['_id'],15,72.5)
  doc.setTextColor(224,0,0);
  doc.setFontSize('10');
  doc.text('PAN No. : AFGPG0575D',15,80)
  doc.setFontSize('12');
  doc.setTextColor(0, 0, 0);
// 
// Signature box
doc.line(110, 58, 143, 58);
doc.line(110, 58, 110, 80);
doc.line(143, 58, 143, 80);
doc.line(110, 80, 143, 80);
doc.setFontSize('8');
doc.setTextColor(132,132,132);
doc.text('Sign & Stamp',118,69)
// 
doc.setTextColor(0, 0, 0);
  
  doc.setFontType('bold');
  doc.setFontSize('10');

  doc.text('Sr.',12,88)
  doc.text('Load Date',20,88)
  doc.text('Truck No',46,88)
  doc.text('Dest.',71,88)
  doc.text('LRNO',85,88)
  doc.text('Rent',108,88)
  doc.text('Adv',122,88)
  doc.text('Bal',134,88)
  doc.line(10, 90, 143, 90);
  // Table heading
  start=97
    }
    // IF LOOP
    // Table rows
    doc.line(10, start, 143, start);

    doc.text(String(k+1),12,start-9+7)//108-
  doc.text(this.handleF.getDateddmmyy(data['loadingDate'][k]),20,start-9+7)
  doc.text(data['truckno'][k],41,start-9+7)
  doc.text(data['place'][k],71,start-9+7)
  doc.text(String(data['nrlrno'][k]),85,start-9+7)
    if(this.admin){
  doc.text(String(data['hamt'][k]==0?'':data['hamt'][k]),108,start-9+7)
  doc.text(this.amountSettler(data['partyAdvance'][k],'amount')===0?'':String(this.amountSettler(data['partyAdvance'][k],'amount')),122,start-9+7)
  doc.text(this.amountSettler(data['partyBalance'][k],'amount')===0?'':String(this.amountSettler(data['partyBalance'][k],'amount')),134,start-9+7)
    }
    start=start+7;
    tsum = tsum + 1;
    // Paging
    
    // Paging
  }
  // Table square
  doc.line(10, 83, 143, 83);
  doc.line(10, 83, 10, start-7);
  doc.line(143, 83, 143, start-7);
  // Table square

      // Table heading
      doc.line(18, 83, 18, start-7);//srno
      doc.line(40, 83, 40, start-7);//date
      doc.line(68, 83, 68, start-7);//truckno
      doc.line(83, 83, 83, start-7);//destination145
      doc.line(107, 83, 107, start-7);//destination145
      doc.line(120, 83, 120, start-7);//destination145
      doc.line(133, 83, 133, start-7);//destination145
      doc.setTextColor(132,132,132);
      doc.text('Page '+pager+' of '+pagerMax,120,205)
      doc.setTextColor(0,0,0);
      if(ack){
        doc.setTextColor(132,132,132);
        doc.setFontType('bold');
        doc.setFontSize('20');
      doc.text('Acknowledgement Slip',21,205)
      doc.setFontType('normal');
      doc.setTextColor(0,0,0);
      }

  // Need a for loop here
}

amountSettler(d,c){return d.reduce((partialSum, a) => partialSum + a[c], 0);}

CollectionMemoC(dataa,j,sign){
  var doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a6',
    putOnlyUsedFonts:true
   })
   
  
  for(let index=0;index<dataa.sum;index++){
    
  let data={
    'partyType':dataa.partyType,
    'loadingDate':dataa['loadingDate'][index],
    'party':dataa['party'][index],
    'place':dataa['place'][index],
    'hamt':dataa['hamt'][index]===0?'':dataa['hamt'][index],
    'partyAdvanceAmt':this.amountSettler(dataa['partyAdvance'][index],'amount')===0?'':this.amountSettler(dataa['partyAdvance'][index],'amount'),
    'balance':this.amountSettler(dataa['partyBalance'][index],'amount')===0?'':this.amountSettler(dataa['partyBalance'][index],'amount'),
    'truckno':dataa['truckno'][index],
    'nrlrno':dataa['nrlrno'][index],
    'billno':dataa['billno'][index].split('_')[1],
    'lrnoTF':dataa['lrnoTF']
  };

  this.sstampsign=Consts.sstampsign;//showsignstamp
  this.ssign=Consts.ssign;//showshubhamsign

  let mainY=6
  doc.setFontSize('20');
  doc.setFontType('bold');
  doc.setTextColor(224,0,0);
  if(data.partyType==='NRCM'){
    doc.text('Nitin Roadways And Cargo Movers',15, mainY+2)
  }
  if(data.partyType==='NR'){
    doc.text('Nitin Roadways',48, mainY+2)
  }
  if(data.partyType==='SNL'){
      doc.text('Shri Nitin Logistics',40, mainY+2)
  }

  doc.setDrawColor(163,0,0);
  doc.setLineWidth(0.5);
  doc.line(3, mainY+4, 146, mainY+4);
  
  doc.setFontSize('9');
  doc.setFontType('bold');
  doc.setTextColor(224,0,0);
  doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY',18,mainY+8)
  doc.setDrawColor(163,0,0);
  doc.setLineWidth(0.5);
  doc.line(3, mainY+9, 146, mainY+9);

  doc.setDrawColor(224,0,0);
  doc.setLineWidth(0.8);
  doc.line(3, mainY+10, 146, mainY+10);
  
  doc.setFontType('normal');
  doc.setFontSize('9');
  doc.setTextColor(0, 0, 0);
  doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 10, mainY+14)
  doc.text('Email : punenitinroadways@gmail.com  Website : www.nitinroadways.in', 10, mainY+18)
  
  doc.setFontType('italic');
  doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 10, mainY+22)
  
  
  doc.setDrawColor(224,0,0);
  doc.setLineWidth(0.2);
  doc.line(3, mainY+24, 146, mainY+24);
  
  doc.setFontSize('12');
  doc.setFontType('normal');
  doc.setTextColor(0, 0, 0);
  
  doc.setFontType('bold');
  doc.setTextColor(12,139,173);
  doc.text('Bill No. : ',10,mainY+30)
  doc.text('To : ',67,mainY+44)
  doc.text('Date : ',75,mainY+30)
  doc.text('M/s :              ',10,mainY+37)  
  doc.text('Truck No : ',10,mainY+44)
  
  doc.text('Lorry Hire : ',10,mainY+53)
  doc.setTextColor(224,0,0);

  doc.text(data['lrnoTF']?'LRNO':'TON',67, mainY+53)

  doc.setTextColor(12,139,173);
  doc.text('Height or Length Extra Rs     : ',10,mainY+60)
  doc.setFontSize('10')
  doc.text('Please Load and oblige. Please Pay Advance Rs : ',10,mainY+67)
  doc.text('Balance Hire : ',10,mainY+73)

  doc.setFontSize('12')
  doc.setTextColor(0,0,0);
  doc.setDrawColor(0,0,0);
  doc.text(String(data.billno),30,mainY+30)
  doc.text(data.place,80,mainY+44)
  doc.text(this.handleF.getDateddmmyy(data.loadingDate),95,mainY+30)

  doc.text(data.party,35,mainY+37)
  
  // data.partyDetails
  doc.text(data.truckno,35,mainY+44)
  if(this.admin){
  doc.text(String(data.hamt),35,mainY+53)
  }
    doc.text(data['lrnoTF']?data.nrlrno:'TON',100, mainY+53)
if(sign){
  doc.addImage(this.sstampsign,'JPEG',100,85,40,20)
}

  doc.text(String('-'),75,mainY+60)
  doc.setFontSize('10')
  if(this.admin){
  doc.text(String(data.partyAdvanceAmt),100,mainY+67)
  doc.text(String(data.balance),35,mainY+73)
  }
  doc.line(0, mainY+31, 150, mainY+31);
  doc.line(0, mainY+38, 150, mainY+38);
  doc.line(65, mainY+38, 65, mainY+46);
  doc.line(0, mainY+46, 150, mainY+46);
  doc.line(65, mainY+46, 65, mainY+55);
  doc.line(0, mainY+55, 150, mainY+55);
  doc.line(0, mainY+62, 150, mainY+62);
  doc.line(0, mainY+77, 150, mainY+77);

  
  

  doc.setFontSize('8')
  doc.setTextColor(224,0,0);
  doc.text('Before Loading Please Check All Documents Of The Vehicle.',10,mainY+81)
  doc.text('We are not responsible for leakage and damage',10,mainY+84)

  // doc.text('For,',95,mainY+88)
  if(data.partyType==='NR'){
    doc.text('For Nitin Roadways',105, mainY+81)
    doc.setTextColor(0,0,0);
    doc.text('PAN : AFGPG0575D',10, mainY+92)
    
  }
  else if(data.partyType==='SNL'){
      doc.text('For Shri Nitin Logistics',105, mainY+84)
  }
  if(index+1>=dataa.sum){}
    else{
    doc.addPage()
    }

}
doc.save(dataa._id+'.pdf')

  // 3 Info
}
  
}


//  PochBillAll(){//threshhold is 295
  
//   let data=this.balanceDate;
//   var doc = new jsPDF({
//     orientation: 'p',
//     unit: 'mm',
//     format: 'a5',
//     putOnlyUsedFonts:true
//    }) 
//   for(let i=0;i<data.length;i++){
   
//      this.pdfData(doc,data[i],false);
//      doc.addPage();
//      this.pdfData(doc,data[i],true);
//      doc.addPage();
//   }
//   doc.save(this.pochDate)
// }
