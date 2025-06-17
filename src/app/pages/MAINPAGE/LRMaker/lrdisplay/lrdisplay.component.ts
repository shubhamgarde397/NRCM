import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consts } from '../../../../common/constants/const';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-lrdisplay',
  templateUrl: './lrdisplay.component.html',
  styleUrls: ['./lrdisplay.component.css'],
  
  providers: [ApiCallsService]
})
export class LrdisplayComponent implements OnInit {
public billno='';
public data=[];
public documentNo='';
public particular='';
public documentNos=[];
public particulars=[];
public w;
public tf;
public paid;
public tp;
public ba;
public showFrieght=false;
public bigJJ=0;
public bigII;
public showdownload=false;
constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
  public handleData: HandleDataService, public handleF: handleFunction,
  public securityCheck: SecurityCheckService, public formBuilder: FormBuilder,) {if(!this.securityCheck.login){
    this.router.navigate([''])
  }
}
  ngOnInit() {
  }

  find(){
    this.showdownload=false;
  let tempObj1={};
      tempObj1['tablename'] = ''
      tempObj1['method'] = 'getDigiLR'
      tempObj1['billno'] = this.billno;
      this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj1, true)
        .subscribe((res: any) => {
          if(res.Data.length>0){
            this.showdownload=true;
          this.data = res.Data;
        }

        });
  
  }

  delDoc(j){
    if(confirm('Are you sure you want to delete this document?')){
    this.documentNos.splice(j,1)
    this.data[this.bigJJ].documentNo.splice(j,1)

    let tempObj={}
    tempObj['method']='saveDocumentNo';  //work from here
    tempObj['tablename']='';
    tempObj['_id']=this.bigII['_id']
    tempObj['documentNo']=this.documentNos;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status)
      });
    }
}

addDoc(){
  if(this.documentNo===''){}
  else{
  this.data[this.bigJJ].documentno.push(this.documentNo);
  this.documentNos=this.data[this.bigJJ]['documentno'];
  }
  let tempObj={}
  tempObj['method']='saveDocumentNo';  //work from here
  tempObj['tablename']='';
  tempObj['_id']=this.bigII['_id']
  tempObj['documentNo']=this.documentNos;
  this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
    });
}

delPar(j){
  if(confirm('Are you sure you want to delete this particular?')){
  this.particulars.splice(j,1)
  this.data[this.bigJJ].particulars.splice(j,1)

  let tempObj={}
  tempObj['method']='saveparticular';  //work from here
  tempObj['tablename']='';
  tempObj['_id']=this.bigII['_id']
  tempObj['particulars']=this.particulars;
  this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
    });
  }
}

addPar(){
if(this.particular===''){}
else{
this.data[this.bigJJ].particulars.push(this.particular);
this.particulars=this.data[this.bigJJ]['particulars'];
}
let tempObj={}
tempObj['method']='saveparticular';  //work from here
tempObj['tablename']='';
tempObj['_id']=this.bigII['_id']
tempObj['particulars']=this.particulars;
this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
  .subscribe((res: any) => {
    alert(res.Status);
    this.particular='';
  });
}

addPar2(){
  let tempObj={}
  tempObj['method']='saveparticular2';
  tempObj['tablename']='';
  tempObj['_id']=this.bigII['_id']
  tempObj['w']=this.w;
  tempObj['tf']=this.tf;
  tempObj['paid']=this.paid;
  tempObj['tp']=this.tp;
  tempObj['ba']=this.ba;
  this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status);
    });
  }

  

saveDoc(i,j,data){
  this.bigII=i;
  this.bigJJ=j;
  switch (data) {
    case 'doc':
      this.documentNos=this.data[this.bigJJ]['documentno'];    
      break;
      case 'par':
      this.particulars=this.data[this.bigJJ]['particulars'];
      break;
      case 'par2':
        this.w=this.data[this.bigJJ]['particulars2'].w;
        this.tf=this.data[this.bigJJ]['particulars2'].tf;
        this.paid=this.data[this.bigJJ]['particulars2'].paid;
        this.tp=this.data[this.bigJJ]['particulars2'].tp;
        this.ba=this.data[this.bigJJ]['particulars2'].ba;
      
      break;
  }
  
  
}

  DownloadLR1() {
    let temp=this.data[0]; 
    let om = Consts.om;
    let y=2
    let x=0
    var doc = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts:true
     })
     
  
     let data={
      'date':temp['date'],
      'billno':temp['billno'],
      'partyname':temp['partyname'],
      'truckno':temp['truckno'],
      'typeofload':temp['typeOfLoad'],
      'documentno':temp['documentno'],
      'destination':temp['destination'],
      'flexid':temp.flexid.filter(t=>{return t.village===temp.destination})[0]['flexid'],
      'fromflex':temp['fromflex'],
      'gstno':temp['gstno'],
      'fromname':temp['fromname'],
      'fromaddress':temp['fromaddress'],
      'fromgstno':temp['fromgstno'],
      'lrshort':temp['lrshort']
  }
  // Box on the page
  doc.line(14,14,295,14)
  doc.line(14,14,14,208)
  doc.line(295,14,295,208)
  doc.line(14,208,295,208)
  // 2
  // Box on the page
  
    doc.setFontSize('25');
    doc.setFontType('bold');
    doc.setTextColor(224,0,0);
    doc.addImage(om,'PNG',114,y+13,5,5)
    doc.text('NITIN ROADWAYS AND CARGO MOVERS',27, y+26)
  
    doc.setFontSize('16');
    doc.setFontType('bold');
    doc.setFontType('italic');
    doc.setTextColor(0, 0, 0);
  
    doc.setFontType('normal');
    doc.setFontSize('12');
    doc.setTextColor(0, 0, 0);
    doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 37, y+33)
    doc.text('Email : punenitinroadways@gmail.com    Website : www.nitinroadways.in', 37, y+38)
  
  
    doc.setFontType('italic');
    doc.setTextColor(0, 0, 0);
    doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 37, y+43)
  
  
    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.8);
    doc.line(17, y+45, 209, y+45);
  
    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.2);
    doc.line(17, y+46, 209, y+46);
  
    doc.setFontSize('12');
  doc.setFontType('bold');
  doc.setTextColor(0,0,0)
  doc.text('Consignor',42,55)
  doc.text('Consignee',132,55)
  doc.setFontSize('14');
  doc.setTextColor(52,65,124)
  doc.text(data.fromname,17,64)
  doc.text(data.partyname,115,64)
  doc.setTextColor(0,0,0)
  doc.setFontSize('9');
  doc.text(data.fromaddress,17,72)
  doc.text('Shipping Address : As Per Bill to '+data.destination,115,72)
  doc.text('Customer Id : '+data.fromflex,17,77)
  doc.text('Customer Id : '+data.flexid,115,77)
  doc.text('GST NO : '+data.fromgstno,17,82)
  doc.text('GST NO : '+data.gstno,115,82)
  
  
  //////////////////////////////////////
  
    // outline for outher details hosizontal and vertical line
    doc.setLineWidth(0.1);  
    doc.setDrawColor(0,0,0);
    doc.line(212,14,212,208)
    doc.line(14,50,295,50)
    // outline for outher details hosizontal and vertical line
    // top right box
    doc.line(260,14,260,33)
    doc.line(212,33.5,295,33.5)
    // top right box
    // info in top right box
  doc.setFontSize('10');
  doc.setFontType('bold');
  doc.setTextColor(52,65,124)
  doc.text('(Subject to Pune Jurisdiction)',230, 6)
  doc.setTextColor(0,0,0)
  doc.setFontSize('10');
  doc.setFontType('bold')
  doc.text('GSTIN NO. : 27AFGPG3657L1Z5',222,40)
  doc.text('PAN : AFGPG3657L',222,47)
  doc.setTextColor(52,65,124)
  doc.text('DATE',222,20)
  doc.text('BILL NO',262,20)
  doc.setTextColor(0,0,0)
  doc.setFontType('normal');
  doc.setFontSize('12')
  doc.setFontType('bold')
  // doc.text(data.lrshort+'-'+data.billno.split('_')[1],262,28)
  doc.text(data.billno.split('_')[1],262,28)
  doc.setFontType('normal')
  doc.text(this.handleF.getDateddmmyy(data.date),222,28)
  //////////////////////////////////////////////
    // info in top right box
   
  // Body BOX horiontal lines
  doc.line(14,58,212,58)
  doc.line(14,84,212,84)
  doc.line(14,91,63,91)
  doc.line(122,91,212,91)
  
  doc.line(14,98,63,98)
  doc.line(122,98,212,98)
  
  doc.line(14,105,63,105)
  doc.line(122,105,212,105)
  
  doc.line(14,112,212,112)
  doc.line(14,119,212,119)
  doc.line(14,126,212,126)
  doc.line(14,133,212,133)
  doc.line(14,194,212,194)
  doc.line(14,201,142,201)
  
  doc.line(212,56,295,56)
  doc.line(212,63,295,63)
  doc.line(212,70,295,70)
  doc.line(212,77,295,77)
  doc.line(212,84,295,84)
  doc.line(212,91,295,91)
  doc.line(212,98,295,98)
  doc.line(212,105,295,105)
  doc.line(212,112,295,112)
  doc.line(212,119,295,119)
  doc.line(212,126,295,126)
  doc.line(212,133,295,133)
  doc.line(212,140,295,140)
  
  doc.line(212,194,295,194)
  doc.line(212,201,295,201)
  // Body Box vertical lines
  doc.line(113,50,113,84)
  doc.line(260,56,260,119)
  doc.line(22,84,22,112)
  doc.line(63,84,63,112)
  doc.line(122,84,122,133)
  doc.line(167,84,167,98)
  doc.line(72,112,72,133)
  doc.line(102,133,102,194)
  doc.line(142,194,142,208)
  // Headings
  doc.setFontType('bold')
  doc.text('Sr         Invoice Nos.',16,89)
  doc.text('Actual Weight',132,89)
  doc.text('Charged Weight',174,89)
  doc.text('Eway Bill No and Valid Upto',142,103)
  doc.text('Description (Contains)',17,117)
  doc.text('Value of Goods',84,117)
  doc.text('Remarks (If Any)',157,117)
  
  doc.setFontSize('10')
  doc.setFontType('normal')
  if(data.typeofload==='Fittings'){
  doc.text('Fittings Bags and Boxes',17,124)
  }else if(data.typeofload==='Pipe'){
    doc.text('PVC Pipes',17,124)
  }
  doc.text('As Per Bill',84,124)
  doc.setFontType('bold')
  
  doc.setFontSize('12');
  doc.setTextColor(52,65,124)
  doc.text('VEHICLE NUMBER',72,89)
  doc.setFontSize('20');
  doc.setTextColor(224,0,0)
  doc.text(data.truckno,70,100)
  doc.setTextColor(0,0,0)
  doc.setFontSize('10');
  doc.text('1.',16,96)
  doc.text('2.',16,103)
  doc.text('3.',16,110)
  // 
  let iii = 0
  for(let ii=0;ii<data.documentno.length;ii++){
    doc.text(String(data.documentno[ii]),24,96+iii)
    iii = iii + 7;
  }
  // Inside box Text
  doc.setFontType('normal')
  doc.text('EWAY BILL ATTACHED WITH INVOICE COPY',127,110)
  ////////////////////////////////////// 
  
  doc.setTextColor(52,65,124)
  doc.setFontSize('12');
  doc.setFontType('bold');
  
  doc.text("AT OWNER'S RISK",240,54.5)
  doc.setTextColor(0,0,0)
  doc.setFontSize('9');
  doc.text('Policy No. And Date',222,61)
  doc.setFontSize('11');
  doc.setFontType('bold');
  doc.text('Particulars',222,68)
  doc.text('Freight Amt',222,75)
  doc.text('Delivery Charge',222,82)
  doc.text('Detention Charge',222,89)
  doc.text('Unloading Charges',222,96)
  doc.text('Sub Total',222,103)
  doc.text('GST @   %',222,110)
  doc.text('Grand Total',222,117)
  doc.text('Amount in Words : ',222,124)
  
  // Condition
  doc.setFontSize('7')
  doc.setTextColor(244,0,0)
  doc.text("Terms and Conditions : ",214,145)
  doc.setTextColor(0,0,0)
  doc.text("1. Goods will be sent at the owner's risk.",214,149)
  doc.text("2. If goods are under a permit & if permit is missing,",214,153)
  doc.text("the owner will be responsible.",217,156)
  doc.text("3. Any cases of fire, riots or accidents the owner will be responsible.",214,160)
  doc.text("4. If there is any claim it should be informed within a month.",214,164)
  doc.text("5. Jurisdiction will be at the Pune Court.",214,168)
  doc.text("6. Goods must be unloaded within 2 days after arrival of the vehicle,",214,172)
  doc.text("if not the demurrange will have to be borne by the consignee.",217,175)
  doc.text("7. Conditions & value of the consignments",214,179)
  doc.text("are not known to the company.",217,182)
  doc.text("8. Make proper insurance of the goods,",214,186)
  doc.text("we are not responsible for damage or shortage of goods.",214,189)
  
  // Condition
  
  
  doc.setTextColor(52,65,124)
  doc.text('GST Payable by : '+data.partyname,215,199)
  doc.setTextColor(0,0,0)
  doc.text('This is a computer generated LR Copy',227,206)
  
  
  doc.setTextColor(255,0,0)
  doc.text('DO NOT PAY CASH TO LORRY DRIVER ONLY ISSUE CHEQUE',15,199)
  doc.text('IN FAVOR OF NITIN ROADWAYS AND CARGO MOVERS',15,206)
  doc.setTextColor(52,65,124)
  doc.text('Signature of Consignor',145,199)
  doc.setTextColor(132,132,132);
  doc.text('Acknowledgement Signature & Stamp',34,165)
  doc.setTextColor(0,0,0);
  doc.text("Delivered Good's Remarks",104,139)
  
  // Inside box Text
    doc.save(data.truckno+'.pdf')
  }

  DownloadLR() {
    let temp=this.data[0];
    let om = Consts.om;
    let y=2
    let x=0
    var doc = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts:true
     })
     
     
     let data={
      'date':temp['date'],
      'billno':temp['billno'],
      'partyname':temp['partyname'],
      'truckno':temp['truckno'],
      'partyType':temp['partyType'],
      'typeofload':temp['typeOfLoad'],
      'documentno':temp['documentno'],
      'destination':temp['destination'],
      'flexid':temp.flexid.filter(t=>{return t.village===temp.destination})[0]['flexid'],
      'fromflex':temp['fromflex'],
      'gstno':temp['gstno'],
      'particulars':temp['particulars'],
      'particulars2':temp['particulars2'],
      'fromname':temp['fromname'],
      'fromaddress':temp['fromaddress'],
      'fromgstno':temp['fromgstno'],
      'lrshort':temp['lrshort']
  }
  // Box on the page
  doc.line(14,14,295,14)
  doc.line(14,14,14,208)
  doc.line(295,14,295,208)
  doc.line(14,208,295,208)
  // 2
  // Box on the page
  
    doc.setFontSize('25');
    doc.setFontType('bold');
    doc.setTextColor(224,0,0);
    doc.addImage(om,'PNG',114,y+13,5,5)
    if(data.partyType==='NRCM'){
    doc.text('NITIN ROADWAYS AND CARGO MOVERS',27, y+26)
    }else if(data.partyType==='SNL'){
      doc.text('SHRI NITIN LOGISTICS',72, y+26)
    }
  
    doc.setFontSize('16');
    doc.setFontType('bold');
    doc.setFontType('italic');
    doc.setTextColor(0, 0, 0);
  
    doc.setFontType('normal');
    doc.setFontSize('12');
    doc.setTextColor(0, 0, 0);
    doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 37, y+33)
    doc.text('Email : punenitinroadways@gmail.com    Website : www.nitinroadways.in', 37, y+38)
  
  
    doc.setFontType('italic');
    doc.setTextColor(0, 0, 0);
    doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 37, y+43)
  
  
    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.8);
    doc.line(17, y+45, 209, y+45);
  
    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.2);
    doc.line(17, y+46, 209, y+46);
  
    doc.setFontSize('12');
  doc.setFontType('bold');
  doc.setTextColor(0,0,0)
  doc.text('Consignor',42,55)
  doc.text('Consignee',132,55)
  doc.setFontSize('14');
  doc.setTextColor(52,65,124)
  doc.text(data.fromname,17,64)
  doc.text(data.partyname,115,64)
  doc.setTextColor(0,0,0)
  doc.setFontSize('9');
  doc.text(data.fromaddress,17,72)
  doc.text('Shipping Address : As Per Bill to '+data.destination,115,72)
  doc.text('Customer Id : '+data.fromflex,17,77)
  doc.text('Customer Id : '+(data.flexid.length>0?data.flexid:'0'),115,77)//
  doc.text('GST NO : '+data.fromgstno,17,82)
  doc.text('GST NO : '+data.gstno,115,82)
  
  
  //////////////////////////////////////
  
    // outline for outher details hosizontal and vertical line
    doc.setLineWidth(0.1);  
    doc.setDrawColor(0,0,0);
    doc.line(212,14,212,126)//standing line
    doc.line(14,50,295,50)
    // outline for outher details hosizontal and vertical line
    // top right box
    doc.line(260,14,260,33)
    doc.line(212,33.5,295,33.5)
    // top right box
    // info in top right box
  doc.setFontSize('10');
  doc.setFontType('bold');
  doc.setTextColor(52,65,124)
  doc.text('(Subject to Pune Jurisdiction)',230, 6)
  doc.setTextColor(0,0,0)
  doc.setFontSize('10');
  doc.setFontType('bold')
  if(data.partyType==='NRCM'){
  doc.text('GSTIN NO. : 27AFGPG3657L1Z5',222,40)
  doc.text('PAN : AFGPG3657L',222,47)
  }else if(data.partyType==='SNL'){
    doc.text('PAN : BTBPG2818K',222,43)
  }
  doc.setTextColor(52,65,124)
  doc.text('DATE',222,20)
  doc.text('BILL NO',262,20)
  doc.setTextColor(0,0,0)
  doc.setFontType('normal');
  doc.setFontSize('12')
  doc.setFontType('bold')
  // doc.text(data.lrshort+'-'+data.billno.split('_')[1],262,28)
  doc.text(data.billno.split('_')[1],262,28)
  doc.setFontType('normal')
  doc.text(this.handleF.getDateddmmyy(data.date),222,28)
  //////////////////////////////////////////////
    // info in top right box
   
  // Body BOX horiontal lines
  doc.line(14,58,212,58)
  doc.line(14,84,212,84)
  doc.line(14,91,63,91)
  doc.line(122,91,212,91)
  
  doc.line(14,98,63,98)
  doc.line(122,98,212,98)
  
  doc.line(14,105,63,105)
  doc.line(122,105,212,105)
  
  doc.line(14,112,212,112)
  doc.line(14,119,212,119)
  doc.line(14,126,295,126)
  doc.line(14,138,295,138)
  // doc.line(14,194,212,194)
  doc.line(14,201,212,201)
  
  doc.line(212,58,295,58)
  doc.line(212,98,295,98)
  // doc.line(212,140,295,140)
  
  doc.line(212,194,295,194)
  doc.line(212,201,295,201)
  // Body Box vertical lines
  doc.line(113,50,113,84)
  doc.line(22,84,22,112)
  doc.line(63,84,63,112)
  doc.line(122,84,122,112)
  
  doc.line(150,98,150,112)
  doc.line(182,98,182,112)
  
  // doc.line(142,194,142,208)
  // Headings
  doc.setFontType('bold')
  doc.text('Sr         Invoice Nos.',16,89)
  doc.text('Eway Bill No and Valid Upto',142,89)
  doc.setFontSize('10')
  doc.text('Actual Weight',125,103)
  doc.text('Charged Weight',152,103)
  doc.text('Value of Goods',184,103)
  doc.setFontType('normal')
  doc.text('As Per Bill',128,110)
  doc.text('As Per Bill',157,110)
  doc.text('As Per Bill',187,110)
  doc.setFontType('bold')
  doc.setFontSize('12')
  
  doc.text('Remarks',17,117)
  
  doc.setFontSize('9')
  doc.setFontType('bold')
  
  doc.line(28,126,28,180)
  doc.line(113,126,113,180)
  doc.line(146,126,146,180)
  
  doc.line(192,126,192,180)
  doc.line(237,126,237,180)
  doc.line(268,126,268,180)
  
  doc.line(14,180,295,180)
  doc.line(14,187,295,187)
  
  doc.text('No. of',15 ,131)
  doc.text('Articles',15 ,135)
  
  doc.text('Description',60 ,131)
  
  doc.text('Weight',123 ,131)
  doc.text('Qty.     Kg',123 ,135)
  
  doc.text('Total Frieght',158,131)
  
  doc.text('Paid Amount',205,131)
  
  doc.text('To Pay',245,131)
  doc.text('Amount',245,135)
  
  doc.text('Balance',275,131)
  doc.text('Amount',275,135)
  
  
  doc.text('Amount in Words : ',16,185)
  
  doc.setFontType('normal')

  if(data.partyType==='NRCM'){
    if(data.particulars.length>0)
    {
      for(let ii=0;ii<data.particulars.length;ii++){
        doc.text(String(ii+1),18,145+(ii*5))
        doc.text(data.particulars[ii],50,145+(ii*5))
      }
      doc.text(String(data.particulars2['w']),126,145)
      doc.text(String(data.particulars2['tf']),158,145)
      doc.text(String(data.particulars2['paid']),205,145)
      doc.text(String(data.particulars2['tp']),245,145)
      doc.text(String(data.particulars2['ba']),275,145)
    }else{
      if(data.typeofload==='Fittings'){
      doc.text('1',18,145)
      doc.text('PVC Fittings Bags and Boxes',50,145)
      doc.text('FTL',126,145)
      }else if(data.typeofload==='Pipe'){
        doc.text('1',18,145)
        doc.text('PVC Pipes',50,145)
        doc.text('FTL',126,145)
      }
    }
  }else if(data.partyType==='SNL')
  {
    if(data.particulars.length>0)
      {
        for(let ii=0;ii<data.particulars.length;ii++){
          doc.text(String(ii+1),18,145+(ii*5))
          doc.text(data.particulars[ii],50,145+(ii*5))
        }
        doc.text(String(data.particulars2['w']),126,145)
        doc.text(String(data.particulars2['tf']),158,145)
        doc.text(String(data.particulars2['paid']),205,145)
        doc.text(String(data.particulars2['tp']),245,145)
        doc.text(String(data.particulars2['ba']),275,145)
      }
  }
  doc.setFontType('bold')
  
  doc.setFontSize('12');
  doc.setTextColor(52,65,124)
  doc.text('VEHICLE NUMBER',72,89)
  doc.setFontSize('20');
  doc.setTextColor(224,0,0)
  doc.text(data.truckno,70,100)
  doc.setTextColor(0,0,0)
  doc.setFontSize('10');
  doc.text('1.',16,96)
  doc.text('2.',16,103)
  doc.text('3.',16,110)
  // 
  let iii = 0
  for(let ii=0;ii<data.documentno.length;ii++){
    doc.text(String(data.documentno[ii]),24,96+iii)
    iii = iii + 7;
  }
  // Inside box Text
  doc.setFontType('normal')
  doc.text('EWAY BILL ATTACHED WITH INVOICE COPY',127,96)
  ////////////////////////////////////// 
  
  doc.setTextColor(52,65,124)
  doc.setFontSize('12');
  doc.setFontType('bold');
  
  doc.text("AT OWNER'S RISK",230,54.5)
  doc.setFontSize('7')
  doc.setTextColor(0,0,0);
  doc.text("Delivered Good's Remarks",215,63)
  doc.text('Acknowledgement Signature & Stamp',215,102)
  
  // Condition
  doc.setFontSize('7')
  doc.setTextColor(244,0,0)
  doc.setTextColor(0,0,0)
  doc.text("Condition : 1) Goods will be sent at the owner's risk.2) If goods are under a permit & if permit is missing,the owner will be responsible.3) Any cases of fire,",15,190)
  doc.text("riots or accidents the owner will be responsible.4) If there is any claim it should be informed within a month.5) Jurisdiction will be at the Pune Court.6) Goods must be",15,193)
  doc.text("unloaded within 2 days after arrival of the vehicle,if not the demurrange will have to be borne by the consignee.7) Conditions,value of the consignments are",15,196)
  doc.text("not known to the company.8) Make proper insurance of the goods,we are not responsible for damage or shortage of goods.",15,199)
  // Condition
  
  
  doc.setTextColor(52,65,124)
  doc.text('GST Payable by Consignor/Consignee',225,191)
  doc.setTextColor(0,0,0)
  doc.text('This is a computer generated LR Copy',225,198)
  
  
  doc.setTextColor(255,0,0)
  if(data.partyType==='NRCM'){
    doc.text('ISSUE CHEQUE IN FAVOR OF NITIN ROADWAYS AND CARGO MOVERS ONLY',15,206)
    doc.setTextColor(52,65,124)
  doc.text('Signature of Consignor',145,206)
  doc.setTextColor(255,0,0)
  doc.text('FOR NITIN ROADWAYS AND CARGO MOVERS',222,205)
  }
  else if(data.partyType==='SNL'){
    doc.text('ISSUE CHEQUE IN FAVOR OF SHRI NITIN LOGISTICS ONLY',15,206)
    doc.setTextColor(52,65,124)
  doc.text('Signature of Consignor',145,206)
  doc.setTextColor(255,0,0)
  doc.text('FOR SHRI NITIN LOGISTICS',222,205)

  }
  
  
  
  doc.line(212,187,212,208)
  doc.line(140,201,140,208)
  // Inside box Text
    doc.save(data.truckno+'.pdf')
  }
}
