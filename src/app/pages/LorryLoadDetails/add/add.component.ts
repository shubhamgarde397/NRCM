import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Consts } from '../../../common/constants/const';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [ApiCallsService]
})
export class AddComponent implements OnInit {
  public ssign='';
  public myFormGroup: FormGroup;
  public myFormGroup8: FormGroup;
  public myFormGroup2: FormGroup;
  public showForm=false;
  public showForm2=false;
  public data;
  public form = false;
  public found;
  
public buttonValue='Create Bill';
public buttonOption='1';
public displayType;
public lrno=0;
public showPan=false;
public sstampsign='';
public showTon=false;
public showLrno=false;
public imgData2='';
public showQR=false;
public showsignstamp=false;
public showshubhamsign=false;
public showshubhamstamp=false;
public radio='';
public displayoptions = [
  { 'value': '1', 'viewvalue': 'Create Bill','disabled':false },
  { 'value': '2', 'viewvalue': 'Collection Memo','disabled':false },
  { 'value': '3', 'viewvalue': 'Bill No. Commision','disabled':false },
  { 'value': '4', 'viewvalue': 'Bill No. Collection Memo','disabled':false },
  { 'value': '5', 'viewvalue': 'By Loading Date','disabled':false },
  { 'value': '6', 'viewvalue': 'By LRNO','disabled':false },
  { 'value': '7', 'viewvalue': 'By Vehicle No.','disabled':false },
  { 'value': '8', 'viewvalue': 'Add Commission And Rent','disabled':false },
  { 'value': '9', 'viewvalue': 'Custom Memo','disabled':false }
  
]
public displayconsider = [0,0,0,0,0,0,0,0,0]
public considerArray;
public commonArray;
public billParty='NR';
public billNo=0;

public loadingDate;
public placeName2='';

public formData;
public bigJ;

public villagelist;
public parties;

public partyid;
public tempPNAME;
public extraRent=[]

public places;
public placeid;
public tempVNAME;
public partyType2;

public years=[];
public selectedMY;
public buttons=[];
public tempObj={}
public partyName2;
public shallIpT=false;
public showForm8=false;

public partyName;
public placeName;
public rent;
public advance;
public balance;
public truckNo;
public partyType;
public advanceArray=[];
// 0 nothing 1 add 2 display by billno 3 display by date 4 display by vehicle no 5 display by lrno

  constructor(
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public router: Router,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService,
    public formBuilder: FormBuilder,
    public handleF:handleFunction
  ) {
  }

  ngOnInit() {
    
    this.buttons=this.getButtons();
    this.myFormGroup = this.formBuilder.group({
      loadingDate:'',
      truckno: '',
      partyType:'',
      partyName:'',
      placeName:'',
      rent:0,
      extraAdvanceAmt:'',
      extraAdvanceMsg:'',
      advanceAmt:0,
      advanceDate:'',
      totalRent:0,
      extra_hamali:0,
      less:0,
      cash:0,
      billamt:0,
      totalBalance:0,
      totalAdvance:0,
      totalAdvancePaid:0,
      totalCut:0,
      billno:''
    });
    this.myFormGroup8 = this.formBuilder.group({
      hamt:0,
      billamt:0,
      loadingDate:'',
      truckno: '',
      partyType:'',
      partyName:'',
      placeName:'',
      billno:''
    });

    this.myFormGroup2 = this.formBuilder.group({
      loadingDate:'',
      truckno: '',
      partyType:'',
      partyName:'',
      placeName:'',
      rent:0,
      extra:'',
      advance:0,
      balance:0
    });
    this.considerArray = this.handledata.createConsiderArray('turnbookadd')
    this.handledata.goAhead(this.considerArray) ? this.getInformationDataB() : this.fetchBasic();
    this.commonArray = this.sec.commonArray;



    switch (this.sec.nrcmid) {
      case 7:
        this.displayconsider=[1,0,0,0,0,0,0,0,1];
        this.displayconsider.forEach((r,i) => {
          if(r===1){
            this.displayoptions[i]['disabled']=false;
          }else{
            this.displayoptions[i]['disabled']=true;
          }
        });
        break;
      case 1:
        this.displayconsider=[0,1,1,1,1,1,1,1,1]
        this.displayconsider.forEach((r,i) => {
          if(r===1){
            this.displayoptions[i]['disabled']=false;
          }else{
            this.displayoptions[i]['disabled']=true;
          }
        });
        break;
    }
  }

  getInformationDataB() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.sec.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.sec.commonArray['gstdetails'];;
        this.sec.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.sec.commonArray['villagenames'];
        this.fetchBasic();
      });
  }

  fetchBasic() {
    this.showForm2=true;
    this.commonArray = this.sec.commonArray;
    this.parties = [];
    this.places = [];
    this.parties = this.commonArray.gstdetails;
    this.places = this.commonArray.villagenames;
  }

  setPartyNameMS(data) {
    if(data===1){
    let filteredList=this.parties.filter(r=>{return r.name==this.myFormGroup.value.partyName})
    this.partyid=filteredList[0]['_id']
    this.tempPNAME=filteredList[0]['name']
    this.myFormGroup.value.partyName = this.tempPNAME;
    }
    if(data===2){
      let filteredList=this.parties.filter(r=>{return r.name==this.partyName})
      this.partyid=filteredList[0]['_id']
      this.tempPNAME=filteredList[0]['name']
      this.partyName2 = this.tempPNAME;
      }
  }

  setPlaceNameMS(data) {
    if(data===1){
      let filteredList=this.places.filter(r=>{return r.village_name==this.myFormGroup.value.placeName})
      this.placeid=filteredList[0]['_id']
      this.tempVNAME=filteredList[0]['name']
      this.myFormGroup.value.placeName = this.tempVNAME;
      }
    if(data===2){
    let filteredList=this.places.filter(r=>{return r.village_name==this.placeName})
    this.placeid=filteredList[0]['_id']
    this.tempVNAME=filteredList[0]['village_name']
    this.placeName = this.tempVNAME;
   }
  }

  
  findOption() { 
    this.buttonOption = this.displayType;
    this.buttonValue = this.displayoptions[parseInt(this.displayType) - 1].viewvalue;
  }

  changeFormStatus(i,j){
    this.showForm=!this.showForm;
    this.formData=i;
    this.bigJ=j;
    this.myFormGroup.patchValue({
      loadingDate:this.formData.loadingDate,
      truckno:this.formData.truckno,
      partyType:this.formData.partyType,
      partyName:this.formData['partyDetails'][0]['name'],
      placeName:this.formData['villageDetails'][0]['village_name'],
      billno:this.formData.billno,
      advanceAmt:this.formData.advanceAmt,
      advanceDate:this.formData.advanceDate
    })
  }

  changeFormStatus8(i,j){
    this.showForm8=!this.showForm8;
    this.formData=i;
    this.bigJ=j;
    this.myFormGroup8.patchValue({
      loadingDate:this.formData.loadingDate,
      truckno:this.formData.truckno,
      partyType:this.formData.partyType,
      billno:this.formData.billno,
      partyName:this.formData['partyDetails'][0]['name'],
      placeName:this.formData['villageDetails'][0]['village_name']
    });
    this.shallIpT=this.formData.partyType==='NRCM'?false:true;
  }

  changeFormStatus2(){
    this.extraRent=this.formData.extra;
    this.advanceArray=this.formData.advanceArray;
    
    this.myFormGroup.patchValue({
      loadingDate:this.formData.loadingDate,
      truckno:this.formData.truckno,
      partyType:this.formData.partyType,
      partyName:this.formData.partyname,
      placeName:this.formData.village1,
      rent:this.formData.rent,
      totalRent:this.formData.rent+this.getAdvances2(this.extraRent,'extraAdvanceamt'),
      extra_hamali:this.formData.extra_hamali,
      less:this.formData.less,
      cash:this.formData.cash,
      billamt:this.formData.billamt,
      totalAdvancePaid:this.getAdvances2(this.advanceArray,'amount'),
      totalBalance:(this.getAdvances2(this.formData.extra,'extraAdvanceamt')+this.formData.rent-(this.formData.billamt+this.formData.extra_hamali+this.formData.less+this.formData.cash)-this.getAdvances2(this.formData.dueInfo,'dueAmtTaken'))-this.getAdvances2(this.formData.advanceArray,'amount'),
      totalAdvance:this.getAdvances2(this.advanceArray,'amount'),
      totalCut:Math.abs(this.formData.extra_hamali-this.formData.less-this.formData.cash-this.formData.billamt),
      billno:this.formData.billno
    });

    
  }

  getAdvances2(d,c){
    return d.reduce((partialSum, a) => partialSum + a[c], 0);
  }

  addExtraRent (){
    let tempObj={}
    tempObj['extraAdvanceMsg']=this.myFormGroup.value.extraAdvanceMsg;
    tempObj['extraAdvanceAmt']=this.myFormGroup.value.extraAdvanceAmt;
    this.extraRent.push(tempObj);
    this.myFormGroup.patchValue({
      totalRent:this.getAdvances()
       })
  }

  calculateRent(){
    this.myFormGroup.patchValue({
      totalRent:this.getAdvances()
       })
  }
  noExtraRent(){
    this.extraRent=[];
    this.myFormGroup.patchValue({
      totalRent:this.myFormGroup.value.rent
       })
  }
  getAdvances(){
    let sum=0;
    this.extraRent.forEach(r=>{sum=sum+r.extraAdvanceAmt})
    return this.myFormGroup.value.rent+sum;
  }



  totalBal(){
    this.myFormGroup.patchValue({
      totalBalance:this.myFormGroup.value.totalRent-this.myFormGroup.value.advanceAmt-this.myFormGroup.value.extra_hamali-this.myFormGroup.value.less-this.myFormGroup.value.cash-this.myFormGroup.value.billamt
    })
    
  }

  deleteOneA(i, j) {
    if (confirm('Are you sure?')) {
      this.extraRent.splice(j, 1);
      this.myFormGroup.patchValue({
        totalRent:this.getAdvances()
         })
    }
    
  }

  changeForm(){
    this.showForm=!this.showForm;
    this.myFormGroup.patchValue({
      loadingDate:'',
      truckno:'',
      partyType:'',
      partyName:'',
      rent:0,
      extraAdvanceAmt:'',
      extraAdvanceMsg:'',
      totalRent:0,
      extra_hamali:0,
      less:0,
      cash:0,
      billamt:0,
      totalBalance:0
    })
  }
  changeForm8(){
    this.showForm8=!this.showForm8;
    this.myFormGroup8.patchValue({
      loadingDate:'',
      truckno:'',
      partyType:'',
      partyName:'',
      billamt:0,
      hamt:0
    })
  }

  changeForm2(){
    this.showForm2=!this.showForm2;
    this.myFormGroup.patchValue({
      loadingDate:'',
      truckno:'',
      partyType:'',
      partyName:'',
      rent:0,
      extraAdvanceAmt:'',
      extraAdvanceMsg:'',
      totalRent:0,
      extra_hamali:0,
      less:0,
      cash:0,
      billamt:0,
      totalBalance:0
    })
  }

  store1(j,i){
    let tempObj={}

      let from=(<HTMLInputElement>document.getElementById('checkbox_' + i)).checked?'advance':'balance';
      let rent=parseInt((<HTMLInputElement>document.getElementById('rent_' + i)).value);
      let advanceamt=parseInt((<HTMLInputElement>document.getElementById('advanceamt_' + i)).value);
      let advancedate=(<HTMLInputElement>document.getElementById('advancedate_' + i)).value;
      let hamali=parseInt((<HTMLInputElement>document.getElementById('hamali_' + i)).value);
      let less=parseInt((<HTMLInputElement>document.getElementById('less_' + i)).value);
      let cash=parseInt((<HTMLInputElement>document.getElementById('cash_' + i)).value);


      if(rent===0||advanceamt===0||advancedate===''){alert('Empty Fields.')}
      else{
      let temp={
        'cash':cash?cash:0,
        'less':less?less:0,
        'extra_hamali':hamali?hamali:0,
        'rent':rent?rent:0,
        'advanceAmt':advanceamt,
        'advanceDate':advancedate,
        'method':'createBill',
        'tablename':'',
        'from':from,
        '_id':j['_id']
      }
      this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
        .subscribe((res: any) => {
          alert(res.Status);
        });
      }
    
    
  }

  calBill(j){
    (<HTMLInputElement>document.getElementById('bill_' + j)).value=String((parseInt((<HTMLInputElement>document.getElementById('hamt_' + j)).value)/1000)*35);
  }
  store8(){
    let bigArray=[]
    let tempObj={}

    for(let i=0;i<this.data.length;i++){

      let hamt=(<HTMLInputElement>document.getElementById('hamt_' + i)).value;
      let bill=(<HTMLInputElement>document.getElementById('bill_' + i)).value;
      let advanceamt=(<HTMLInputElement>document.getElementById('advanceamt_' + i)).value;
      let advancedate=(<HTMLInputElement>document.getElementById('advancedate_' + i)).value;


      if(bill===''){}
      else{
        let obj={
          'hamt':hamt,
          'billamt':parseInt(bill),
          'advanceamt':advanceamt,
          'advancedate':advancedate,
          'partyType':this.data[i]['partyType'],
          '_id':this.data[i]['_id']
        }    
        bigArray.push(obj);
      }
    }


    let temp={
      'method':'createBillRent1',
      'tablename':'',
      'array':bigArray
    }
    this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
      .subscribe((res: any) => {
        alert(res.Status);
      });
    
    
  }

  getInformationDataB2(){
    
    let temp={
      'partyid':this.partyid,
      'partyType':this.partyType2,
      'loadingDate':this.tempObj,
      'method':'createCollection',
      'tablename':''
    }
    this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
      .subscribe((res: any) => {
        this.data=[];
        this.data=res.Data;
        this.showForm=!this.showForm;
      });
  }
  getTBid(){
    this.data[this.loadingDate]
  }

  selectedColor(data){
    this.radio=data;
  }

  
  CollectionMemoC(){
    this.sstampsign=Consts.sstampsign;
    this.imgData2=Consts.imgData2;
    this.ssign=Consts.ssign;
    if(this.placeName2===''){}else{
      this.placeName=this.placeName+this.placeName2;
    }
    
    
    let d=new Date()
let billno=String(d.getMinutes())+String(d.getSeconds());
    let data={
      'partyType':this.partyType2,
      'loadingDate':this.loadingDate,
      'partyDetails':this.partyName,
      'villageDetails':this.placeName,
      'hamt':this.rent?this.rent:'',
      'partyAdvanceAmt':this.advance?this.advance:'',
      'balance':this.balance?this.balance:'',
      'truckno':this.truckNo,
      'lrno':this.lrno,
      'radio':this.radio
    };

    var doc = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a6',
      putOnlyUsedFonts:true
     })
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

    if(this.radio==='TON'){
    doc.text('TON',67, mainY+53)
    }
    else if(this.radio==='LRNO'){
      doc.text('LRNO',67, mainY+53)
    }
    else if(this.radio==='QR'){
      doc.text('QR',67, mainY+53)
    }
    doc.setTextColor(12,139,173);
    doc.text('Height or Length Extra Rs     : ',10,mainY+60)
    doc.setFontSize('10')
    doc.text('Please Load and oblige. Please Pay Advance Rs : ',10,mainY+67)
    doc.text('Balance Hire : ',10,mainY+73)

    doc.setFontSize('12')
    doc.setTextColor(0,0,0);
    doc.setDrawColor(0,0,0);
    doc.text(String(billno),30,mainY+30)
    doc.text(data.villageDetails,80,mainY+44)
    doc.text(this.handleF.getDateddmmyy(data.loadingDate),95,mainY+30)
 
    doc.text(data.partyDetails,35,mainY+37)
    
    // data.partyDetails
    doc.text(data.truckno,35,mainY+44)
    doc.text(String(data.hamt),35,mainY+53)
    if(this.radio==='TON'){
      doc.text('Fixed',100,mainY+53)
      }
      else if(this.radio==='LRNO'){
        doc.text(String(data.lrno),100,mainY+53)  
      }
      else if(this.radio==='QR'){
        doc.text(String(data.lrno),100,mainY+53)  
      }

      if(this.showsignstamp){
        // doc.addImage(this.imgData2,'JPEG',100,90,40,15)//JyotiGarde
        doc.addImage(this.sstampsign,'JPEG',100,85,40,20)
        }
        if(this.showshubhamsign){
          doc.addImage(this.ssign,'JPEG',100,90,30,15)
          }
    doc.text(String('-'),75,mainY+60)
    doc.setFontSize('10')
    doc.text(String(data.partyAdvanceAmt),100,mainY+67)
    doc.text(String(data.balance),35,mainY+73)

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
    if(data.partyType==='NRCM'){
      doc.text('For Nitin Roadways And Cargo Movers',90, mainY+86)
    }
    if(data.partyType==='NR'){
      doc.text('For Nitin Roadways',105, mainY+81)
      doc.setTextColor(0,0,0);
      if(this.showPan){
      doc.text('PAN : AFGPG0575D',10, mainY+92)
      }
      
    }
    if(data.partyType==='SNL'){
        doc.text('For Shri Nitin Logistics',105, mainY+84)
    }
  doc.save(data.truckno+'.pdf')
    // 3 Info
  }

 
  CollectionMemo(){
    let d=this.data[this.loadingDate]
    let data={
      'partyType':this.partyType2,
      'billno':d.billno.split('_')[1],
      'loadingDate':d.loadingDate,
      'partyDetails':d.partyDetails,
      'villageDetails':d.villageDetails,
      'extra':this.getAdvances2(d.extra,'extraAdvanceAmt'),
      'hamt':d.hamt,
      'partyAdvanceAmt':d.partyAdvanceAmt,
      'balance':d.hamt-d.partyAdvanceAmt-this.getAdvances2(d.extra,'extraAdvanceAmt'),
      'truckno':d.truckName
    };
    var doc = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a6',
      putOnlyUsedFonts:true
     })
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
    doc.text('Loading To : ',75,mainY+44)
    doc.text('Date : ',75,mainY+30)
    doc.text('M/s :              ',10,mainY+37)
    doc.text('Truck No : ',10,mainY+44)
    doc.text('Lorry Hire : ',10,mainY+53)
    doc.text('Tons : ',75,mainY+53)
    doc.text('Height or Length Extra Rs     : ',10,mainY+60)
    doc.setFontSize('10')
    doc.text('Please Load and oblige. Please Pay Advance Rs : ',10,mainY+67)
    doc.text('Balance Hire : ',10,mainY+73)

    doc.setFontSize('12')
    doc.setTextColor(0,0,0);
    doc.setDrawColor(0,0,0);
    doc.text(String(data.billno),30,mainY+30)
    doc.text(data.villageDetails,102,mainY+44)
    doc.text(this.handleF.getDateddmmyy(data.loadingDate),95,mainY+30)
    doc.text(data.partyDetails,35,mainY+37)
    doc.text(data.truckno,35,mainY+44)
    doc.text(String(data.hamt),35,mainY+53)
    doc.text('Fix',100,mainY+53)
    doc.text(String(data.extra),75,mainY+60)
    doc.setFontSize('10')
    doc.text(String(data.partyAdvanceAmt),100,mainY+67)
    doc.text(String(data.balance),35,mainY+73)

    doc.line(0, mainY+31, 150, mainY+31);
    doc.line(0, mainY+38, 150, mainY+38);
    doc.line(73, mainY+38, 73, mainY+46);
    doc.line(0, mainY+46, 150, mainY+46);
    doc.line(73, mainY+46, 73, mainY+55);
    doc.line(0, mainY+55, 150, mainY+55);
    doc.line(0, mainY+62, 150, mainY+62);
    doc.line(0, mainY+77, 150, mainY+77);

    
    

    doc.setFontSize('8')
    doc.setTextColor(224,0,0);
    doc.text('Before Loading Please Check All Documents Of The Vehicle.',10,mainY+81)
    doc.text('We are not responsible for leakage and damage',10,mainY+84)

    // doc.text('For,',95,mainY+88)
    if(data.partyType==='NRCM'){
      doc.text('For Nitin Roadways And Cargo Movers',95, mainY+92)
    }
    if(data.partyType==='NR'){
      doc.text('For Nitin Roadways',95, mainY+92)
    }
    if(data.partyType==='SNL'){
        doc.text('For Shri Nitin Logistics',95, mainY+92)
    }
  doc.save('Bills.pdf')
    // 3 Info
  }

  getData(){
  this.tempObj['from']=this.buttons[parseInt(this.selectedMY)]['value'].split('_')[0]
  this.tempObj['to']=this.buttons[parseInt(this.selectedMY)]['value'].split('_')[1]
  }
  getButtons() {
    let buttons=[]
    let index=0;
        for (let i = 0; i < new Date().getFullYear() - 2019; i++) {
          this.years.push(i + 2022)
        }
        for (let i = 0; i < this.years.length; i++) {
          let months = new Date().getFullYear() - this.years[i] == 0 ? new Date().getMonth() + 1 : 12;
          for (let j = 0; j < months; j++) {
            let date = new Date(String(i + 2022) + '-' + this.handleF.generate2DigitNumber(String(j + 1)) + '-01');
            let month = date.toLocaleString('default', { month: 'short' });
            this.tempObj['value'] =  String(i + 2022) + "-" + this.handleF.generate2DigitNumber(String(j + 1)) + "-01_"+String(i + 2022) + "-" + this.handleF.generate2DigitNumber(String(j + 1)) + "-31";
            this.tempObj['viewValue'] = month + '-' + String(i + 2022).slice(-2);
            this.tempObj['option']=1;
            this.tempObj['index']=index;
            buttons.push(this.tempObj);
            this.tempObj = {}
            index=index+1;
          }
          
        }
        buttons.push({'value':'""_""','viewValue':'All','option':2,'index':index});
        return buttons;
      }

  getInformationData() {
    let tempObj={};
    switch(this.buttonOption){
      case '1':
        tempObj = { "method": "loadingDetail",'tablename':''};
        break;
        case '3':
          tempObj = { "method": "getloadingDetailByBill",'tablename':'','billNo':this.billNo};
          break;

          case '8':
            tempObj = { "method": "loadingDetailsNoRentBill",'tablename':''};
            break;
    }
    this.spinnerService.show();
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        
        this.data=res.Data
        
        
        switch(this.buttonOption){
          case '1':
            this.form = true;
            this.spinnerService.hide();
            break;
            case '8':
            this.spinnerService.hide();
            break;
            case '3':
              this.showForm2=true;
              this.formData=res.Data[0]
              this.myFormGroup.patchValue({
                totalRent:0
              })
              this.changeFormStatus2()
              break;
        }
      });
  }


  pdfData2(){
    let data=this.data;
    var doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a5',
      putOnlyUsedFonts:true
     })
    let mainY=12
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
    doc.line(3, mainY+7, 146, mainY+7);
    
    doc.setFontSize('11');
    doc.setFontType('bold');
    doc.setTextColor(224,0,0);
    doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 8,mainY+11)
    doc.setDrawColor(163,0,0);
    doc.setLineWidth(0.5);
    doc.line(3, mainY+12, 146, mainY+12);
    
    doc.setFontType('normal');
    doc.setFontSize('12');
    doc.setTextColor(0, 0, 0);
    doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 10, mainY+19)
    doc.setFontSize('12');
    doc.text('Email : punenitinroadways@gmail.com  Website : www.nitinroadways.in', 10, mainY+24)
    
    
    doc.setFontType('italic');
    doc.setFontSize('11');
    doc.setTextColor(0, 0, 0);
    doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 10, mainY+29)
    
    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.8);
    doc.line(3, mainY+13, 146, mainY+13);
    
    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.2);
    doc.line(3, mainY+32, 146, mainY+32);
    
    doc.setFontSize('12');
    doc.setFontType('normal');
    doc.setTextColor(0, 0, 0);
    
    doc.setFontType('bold');
    doc.setDrawColor(0,0,0);
    doc.text('Bill No. : '+data.billno.split('_')[1],10,mainY+39)
    doc.text('Date : '+this.handleF.getDateddmmyy(data.loadingDate),105,mainY+39)

    // Consignee consigner box
    doc.line(10, mainY+48, 140,mainY+48);
    doc.line(10, mainY+55, 140,mainY+55);

    doc.line(10, mainY+48, 10,mainY+55);
    doc.line(140, mainY+48, 140,mainY+55);

    doc.line(83, mainY+48, 83,mainY+55);
    doc.setFontSize('10');  
    if(data.partyType==='NRCM'){
      doc.text('Consigner :',12,mainY+53)
      doc.text('NRCM',40,mainY+53)

      doc.text('Consignee :',85,mainY+53)
      doc.text('As Per Bill',110,mainY+53)
    }
    else{
      doc.text('Consigner :',12,mainY+53)
      doc.text(data.partyDetails[0]['name'],35,mainY+53)

      doc.text('Consignee :',85,mainY+53)
      doc.text('As Per Bill',110,mainY+53)
    }
    
    // 

    // Location From To box
    doc.line(10, mainY+60, 140,mainY+60);
    doc.line(10, mainY+67, 140,mainY+67);

    doc.line(10, mainY+60, 10,mainY+67);
    doc.line(140, mainY+60, 140,mainY+67);

    doc.line(75, mainY+60, 75,mainY+67);
    doc.setFontSize('10');  

      doc.text('From :',12,mainY+65)
      doc.text('Pune',40,mainY+65)

      doc.text('To :',mainY+65,mainY+65)
      doc.text(data.villageDetails[0]['village_name'],90,mainY+65)
    // 

    // Money Box
    doc.line(10, mainY+75, 140,mainY+75); //top line
    doc.line(10, mainY+150, 140,mainY+150); //bottom line

    doc.line(10, mainY+75, 10,mainY+150); //left vertical
    doc.line(140, mainY+75, 140,mainY+150); // right vertical
// 5 horizontal
    doc.line(10, mainY+85, 140,mainY+85);
    doc.line(10, mainY+97, 140,mainY+97);
    doc.line(10, mainY+109, 140,mainY+109);

    doc.line(10, mainY+121, 50,mainY+121);
    doc.line(93, mainY+121, 140,mainY+121);

    doc.line(10, mainY+133, 140,mainY+133);
// 5 horizontal
    doc.text('Freight',12,mainY+81)
    doc.text('Extra',12,mainY+91)
    doc.text('Total',12,mainY+102);doc.text('Freight',12,mainY+107)
    doc.text('Advance',12,mainY+115)
    doc.text('Balance',12,mainY+126);doc.text('Freight',12,mainY+131)
    // 
    doc.line(28, mainY+75, 28,mainY+133);//line after first info
    // 
    // Second Info
    doc.text(String(data.rent),32,mainY+81)
    doc.text(data.extra[0]?String(data.extra[0]['extraAdvanceMsg']):'',29,mainY+89);
    doc.text(data.extra[0]?String(data.extra[0]['extraAdvanceAmt']):'',32,mainY+94)//1

    doc.text(data.extra[1]?String(data.extra[1]['extraAdvanceMsg']):'',51,mainY+89);
    doc.text(data.extra[1]?String(data.extra[1]['extraAdvanceAmt']):'',57,mainY+94)//2

    doc.text(data.extra[2]?String(data.extra[2]['extraAdvanceMsg']):'',73,mainY+89);
    doc.text(data.extra[2]?String(data.extra[2]['extraAdvanceAmt']):'',79,mainY+94)//3
    this.extraRent=data.extra;
    doc.text(String(this.getAdvances2(this.extraRent,'extraAdvanceAmt')+data.rent),32,mainY+105);
    doc.text(String(data.advanceAmt),32,mainY+114);doc.text(this.handleF.getDateddmmyy(data.advanceDate),29,mainY+119)
    doc.text(String(this.getAdvances2(this.extraRent,'extraAdvanceAmt')+data.rent-data.advanceAmt),32,mainY+128);
    // Second Info
    // 
    doc.line(50, mainY+75, 50,mainY+133);//line after second info
    doc.line(71, mainY+85, 71,mainY+97);//line after second info////////////////
    // 
    // 3 Info
    doc.text('Do not cross the goods',52,mainY+80)
    doc.setFontSize('15');
    doc.setFontType('bold');
    doc.text(data.truckno,51,mainY+122)
    doc.setFontSize('12');
    doc.setFontType('normal');
    // 
    doc.line(93, mainY+75,93,mainY+150);//line after 3 info
    // 
// 4 info
doc.setFontSize('10'); 
doc.setFontType('bold');
    doc.text('Bill',95,mainY+81)
    doc.text('Hamali',95,mainY+91)
    doc.text('Misc',95,mainY+102);
    doc.text('Cash',95,mainY+115)
    doc.text('Balance',94,mainY+126);
    // 
    doc.line(115, mainY+75, 115,mainY+133);//line after 4 info
    // 

    doc.text(String(data.billamt),120,mainY+81)
    doc.text(String(data.extra_hamali),120,mainY+91)
    doc.text(String(data.less),120,mainY+102);
    doc.text(String(data.cash),120,mainY+115)
    this.extraRent=data.extra;
    doc.text(String(this.getAdvances2(this.extraRent,'extraAdvanceAmt')+data.rent-data.billamt-data.advanceAmt-data.extra_hamali-data.less-data.cash),120,mainY+126);
// 

    doc.text('For,',94,mainY+138)
    if(data.partyType==='NRCM'){
      doc.text('Nitin Roadways And',100,mainY+138+5)
      doc.text('Cargo Movers',104,mainY+138+10)
      
    }
    if(data.partyType==='NR'){
      doc.text('Nitin Roadways',100, mainY+138+5)
    }
    if(data.partyType==='SNL'){
        doc.text('Shri Nitin Logistics',100, mainY+138+5)
    }
    doc.setFontSize('8')
    doc.text('I agree with the terms and conditions overleaf and abide',12, mainY+138)
    doc.text('by that the goods are received in good condition.',12, mainY+138+3)
    // Box complete

    // Account Details// 
    doc.setFontSize('8')
    doc.text('*Note : Advance and Balance payment will be done on this account.',12, mainY+153)
    doc.text('Please update your Account Details if necessary.',22, mainY+156)
    // 
     // Account
  // Account square
  doc.setFontSize('10')
  
  doc.line(10,175,115,175)
  doc.line(10,198,115,198)
  doc.line(10,175,10,198)
  doc.line(115,175,115,198)

  doc.line(50,175,50,198)

  doc.line(10,181,115,181)
  doc.line(10,186,115,186)
  doc.line(10,191,115,191)



  doc.text('Account Name ',12,180)
  doc.text('Account Number ',12,185)
  doc.text('Bank Name ',12,190)
  doc.text('IFSC ',12,195)

  doc.text(data.ownerDetails[0].accountDetails[0]['accountName'],mainY+40,180)
  doc.text(String(data.ownerDetails[0].accountDetails[0]['accountNumber']),mainY+40,185)
  doc.text(data.ownerDetails[0].accountDetails[0]['bankName'],mainY+40,190)
  doc.text(data.ownerDetails[0].accountDetails[0]['ifsc'],mainY+40,195)

  doc.save('Bills.pdf')
    // 3 Info
  }

  pdfData(){
    
 
    // let data=this.data[0];
    let data=this.formData;
    let imgdata=Consts.imgData;
    var doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a5',
      putOnlyUsedFonts:true
     })
    let mainY=12
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
    doc.line(3, mainY+7, 146, mainY+7);
    
    doc.setFontSize('11');
    doc.setFontType('bold');
    doc.setTextColor(224,0,0);
    doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 8,mainY+11)
    doc.setDrawColor(163,0,0);
    doc.setLineWidth(0.5);
    doc.line(3, mainY+12, 146, mainY+12);
    
    doc.setFontType('normal');
    doc.setFontSize('12');
    doc.setTextColor(0, 0, 0);
    doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 10, mainY+19)
    doc.setFontSize('12');
    doc.text('Email : punenitinroadways@gmail.com  Website : www.nitinroadways.in', 10, mainY+24)
    
    
    doc.setFontType('italic');
    doc.setFontSize('11');
    doc.setTextColor(0, 0, 0);
    doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 10, mainY+29)
    
    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.8);
    doc.line(3, mainY+13, 146, mainY+13);
    
    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.2);
    doc.line(3, mainY+32, 146, mainY+32);
    
    doc.setFontSize('12');
    doc.setFontType('normal');
    doc.setTextColor(0, 0, 0);
    
    doc.setFontType('bold');
    doc.setDrawColor(0,0,0);
    doc.text('Bill No. : '+data.billno.split('_')[1],10,mainY+39)
    doc.text('Date : '+this.handleF.getDateddmmyy(data.loadingDate),105,mainY+39)

    // Consignee consigner box
    doc.line(10, mainY+44, 140,mainY+44);
    doc.line(10, mainY+58, 140,mainY+58);

    doc.line(10, mainY+44, 10,mainY+58);
    doc.line(140, mainY+44, 140,mainY+58);

    doc.line(83, mainY+44, 83,mainY+58);


    doc.setFontSize('10');  
    if(data.partyType==='NRCM'){
      doc.text('Consigner : NRCM',12,mainY+49)
      doc.text('Consignee : As Per Bill',85,mainY+49)
    }
    else{
      doc.text('Consigner : '+data['partyname'],12,mainY+49)
      doc.text('Consignee : As Per Bill',85,mainY+49)
    }
// From To Text 
      doc.text('From : Pune',12,mainY+56)
      doc.text('To : '+data['village1'],85,mainY+56)
      doc.line(10, mainY+51, 140,mainY+51);
    // 

    // Money Box
    doc.line(10, mainY+65, 140,mainY+65); //top line
    doc.line(10, mainY+140, 140,mainY+140); //bottom line

    doc.line(10, mainY+65, 10,mainY+140); //left vertical
    doc.line(140, mainY+65, 140,mainY+140); // right vertical
// 5 horizontal
    doc.line(10, mainY+75, 113,mainY+75);
    doc.line(53, mainY+87, 113,mainY+87);
    doc.line(10, mainY+99, 53,mainY+99);

    doc.line(10, mainY+111, 53,mainY+111);//line after total freight
    doc.line(113, mainY+92, 140,mainY+92);//line after total reduction

    doc.line(10, mainY+123, 140,mainY+123);
// 5 horizontal
    doc.text('Freight',11,mainY+71)
    doc.text('Extra',11,mainY+81)
    doc.text('Total',11,mainY+92);doc.text('Freight',11,mainY+97)
    doc.setTextColor(189,143,5)
    doc.text('Advance',11,mainY+105)
    doc.setTextColor(0,0,0)
    doc.text('Balance',11,mainY+116);doc.text('Freight',11,mainY+121)
    // 
    doc.line(26, mainY+65, 26,mainY+123);//line after first info
    // 
    // Second Info
    doc.setFontSize('10');
    doc.text(String(data.rent),32,mainY+71)
    doc.text(data.extra[0]?String(data.extra[0]['extraAdvancemsg'])+' : '+String(data.extra[0]['extraAdvanceamt']):'',29,mainY+79);
    doc.text(data.extra[1]?String(data.extra[1]['extraAdvancemsg'])+' : '+String(data.extra[1]['extraAdvanceamt']):'',29,mainY+84);
    doc.text(data.extra[2]?String(data.extra[2]['extraAdvancemsg'])+' : '+String(data.extra[2]['extraAdvanceamt']):'',29,mainY+89);
    doc.line(30, mainY+91, 45,mainY+91);
    doc.setTextColor(49,94,168)
    doc.text(String(this.getAdvances2(data.extra,'extraAdvanceamt')+data.rent),32,mainY+95);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize('9');
    for(let i=0;i<data.advanceArray.length;i++)
    {
      doc.text(String(data.advanceArray[i]['amount'])+' : '+String(this.handleF.getDateddmmyy(data.advanceArray[i]['date'],'ddmmyy')),28,mainY+104+(i*3));
    }
    doc.text(
      String(this.getAdvances2(data.extra,'extraAdvanceamt')+data.rent)+'-'+
      String((this.getAdvances2(data.extra,'extraAdvanceamt')+data.rent) - ((this.getAdvances2(data.extra,'extraAdvanceamt')+data.rent-(data.billamt+data.extra_hamali+data.less+data.cash)-this.getAdvances2(data.dueInfo,'dueAmtTaken'))-this.getAdvances2(data.advanceArray,'amount')))+'=',28,mainY+116);
    doc.text(String((this.getAdvances2(data.extra,'extraAdvanceamt')+data.rent-(data.billamt+data.extra_hamali+data.less+data.cash)-this.getAdvances2(data.dueInfo,'dueAmtTaken'))-this.getAdvances2(data.advanceArray,'amount')),28,mainY+120);
    doc.setFontSize('10');
    doc.line(53, mainY+65, 53,mainY+123);//line after second info
    // 
    // 3 Info
    doc.setTextColor(224,0,0);
    doc.text('Do not cross the goods',63,mainY+70)
    doc.setTextColor(0,0,0);
    doc.setFontSize('15');
    doc.setFontType('bold');
    doc.text(data.truckno,62,mainY+83)
    doc.setFontSize('12');
    doc.setFontType('normal');
    // 
// 4 info
doc.setFontSize('10'); 
doc.setFontType('bold');
    doc.text('Misc',114,mainY+70)
    doc.text('Hamali',114,mainY+75)
    doc.text('Less',114,mainY+80);
    doc.text('Cash',114,mainY+85)
    doc.text('Total',114,mainY+90);
    // 
    doc.line(113, mainY+65, 113,mainY+123);//line after 4 info vertical
    // 

    doc.text(String(data.billamt),128,mainY+71)
    doc.text('+'+String(data.extra_hamali),128,mainY+75)
    doc.text('+'+String(data.less),128,mainY+80);
    doc.text('+'+String(data.cash),128,mainY+85)
    doc.line(125, mainY+86, 138,mainY+86);//line after 4 info
    doc.setTextColor(220, 76, 100)
    doc.text(String(data.billamt+data.extra_hamali+data.less+data.cash),128,mainY+90)
    doc.setTextColor(0,0,0)
// 

// 
// Payment Details how:
doc.setFontSize('9'); 
doc.setFontType('bold');
    doc.text('Freight',114,mainY+97)
    doc.text('Advance',114,mainY+102)
    doc.text('Total Bill',114,mainY+107);
    doc.text('Dues',114,mainY+112)
    doc.text('Advance',114,mainY+117);
    doc.text('Paid',114,mainY+120);
    doc.setTextColor(49,94,168)
    doc.text(String(this.getAdvances2(data.extra,'extraAdvanceamt')+data.rent),130,mainY+97)
    doc.setTextColor(0,0,0)
    doc.line(113, mainY+98, 140,mainY+98);//line after 4 info
    doc.setTextColor(0,0,0)
    doc.text(String((this.getAdvances2(data.extra,'extraAdvanceamt')+data.rent) - ((this.getAdvances2(data.extra,'extraAdvanceamt')+data.rent-(data.billamt+data.extra_hamali+data.less+data.cash)-this.getAdvances2(data.dueInfo,'dueAmtTaken'))-this.getAdvances2(data.advanceArray,'amount')) ),130,mainY+102)
    doc.setTextColor(220, 76, 100)
    doc.text('-'+String(data.billamt+data.extra_hamali+data.less+data.cash),130,mainY+107);
    doc.setTextColor(191,115,16)
    doc.text('-'+String(this.getAdvances2(data.dueInfo,'dueAmtTaken')),130,mainY+112)
    doc.line(129, mainY+114, 139,mainY+114);//line after 4 info
    doc.line(mainY+116, mainY+92, mainY+116,mainY+123);//line after 4 info
    doc.setTextColor(189,143,5)
    doc.text(String(this.getAdvances2(data.advanceArray,'amount')),130,mainY+117)
    doc.setTextColor(0,0,0)
    // (this.getAdvances2(data.extra,'extraAdvanceamt')+data.rent-(data.billamt+data.extra_hamali+data.less+data.cash)-this.getAdvances2(data.dueInfo,'dueAmtTaken'))-this.getAdvances2(data.advanceArray,'amount')

// 
// Dues Data
      if(data.due.length>0){
        let yer=0
        for(let i=0;i<data.due.length;i++){
          doc.text(String('Due'+(i+1))+' : '+data.due[i]['reason']+' : '+String(data.due[i]['amt'])+' : '+String(this.handleF.getDateddmmyy(data.due[i]['date'],'ddmmyyyy')),55,mainY+90+(i*5))  
          yer=i;
        }
        yer=yer+1
        doc.setTextColor(191,115,16)
        doc.text('Total Due : '+String(this.getAdvances2(data.due,'amt')),55,mainY+90+(yer*5))  
        doc.setTextColor(0,0,0)
        doc.line(53, mainY+92+(yer*5), 113,mainY+92+(yer*5));//line after 4 info

        doc.line(53, mainY+92+(yer*5)+5, 113,mainY+92+(yer*5)+5);
        doc.text('Sr',55,mainY+90+(yer*5)+5)
        doc.text('Date',60,mainY+90+(yer*5)+5)
        doc.text('Amount',80,mainY+90+(yer*5)+5)
        yer=mainY+90+(yer*5)+10;
        let yyer=0
        for(let i=0;i<data.dueInfo.length;i++){
          if(data.dueInfo[i]['fromWhere']==='AD'){
          doc.text(String(i+1),55,yer+(i*5))
          doc.text(String(this.handleF.getDateddmmyy(data.dueInfo[i]['date'],'ddmmyyyy')),60,yer+(i*5))
          doc.text(String(data.dueInfo[i]['dueAmtTaken']),80,yer+(i*5))
          yyer=i;
          }
        }
        doc.setTextColor(191,115,16)
        doc.text('Total Due Cut : '+String(this.getAdvances2(data.dueInfo,'dueAmtTaken')),55,yer+(yyer*5)+5)  
        doc.setTextColor(0,0,0)
      }
// 

    doc.text('For,',94,mainY+128)
    if(data.partyType==='NRCM'){
      doc.text('Nitin Roadways And',100,mainY+128+5)
      doc.text('Cargo Movers',104,mainY+128+10)
      
    }
    if(data.partyType==='NR'){
      doc.text('Nitin Roadways',100, mainY+128+5)
    }
    if(data.partyType==='SNL'){
        doc.text('Shri Nitin Logistics',100, mainY+128+5)
    }
    doc.line(90,mainY+123,90,mainY+140)
    doc.setFontSize('8')
    doc.text('I agree with the terms and conditions overleaf and abide',12, mainY+128)
    doc.text('by that the goods are received in good condition.',12, mainY+128+3)
    // Box complete

    // Account Details// 
    doc.setFontSize('8')
    if(data['update']){
      doc.text('*Note : Please send your Account details with Truck No. on Mo:-9766707061',12, mainY+148)
    }else{
    doc.text('*Note : Advance and Balance payment will be done on this account.',12, mainY+148)
    doc.text('Please update your Account Details if necessary.',22, mainY+151)
    }
    // 
     // Account
     
  // Account square
  doc.setFontSize('10')
  
  doc.line(10,165,115,165)
  doc.line(10,186,115,186)
  doc.line(10,165,10,186)
  doc.line(115,165,115,186)

  doc.line(50,165,50,186)

  doc.line(10,171,115,171)
  doc.line(10,176,115,176)
  doc.line(10,181,115,181)



  doc.text('Account Name ',12,170)
  doc.text('Account Number ',12,175)
  doc.text('Bank Name ',12,180)
  doc.text('IFSC ',12,185)
    if(data['update']){}else{
  doc.text(data['account']['accountName'],mainY+40,170)
  doc.text(String(data['account']['accountNumber']),mainY+40,175)
  doc.text(data['account']['bankName'],mainY+40,180)
  doc.text(data['account']['ifsc'],mainY+40,185)
    }
    if(data.due.length==0){
      doc.addImage(imgdata, 'PNG', 70, 101, 25, 28);//add if else
      doc.setFontSize('8')
      doc.text('Scan QR code to contact us.',65,132)
    }
    else{
      doc.addImage(imgdata, 'PNG', 118, 160, 25, 28);//add if else
      doc.setFontSize('8')
      doc.text('Scan QR code to contact us.',76,190)
    }
  
  doc.save('Bills.pdf')
    // 3 Info
  }
}
