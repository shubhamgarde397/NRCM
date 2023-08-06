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
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [ApiCallsService]
})
export class AddComponent implements OnInit {
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
public ratnagiri=false;
public showTon=false;
public showLrno=false;
public showQR=false;
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
        this.displayconsider=[1,0,0,0,0,0,0,0,0];
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
      let filteredList=this.parties.filter(r=>{return r.name==this.partyName2})
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
    let filteredList=this.places.filter(r=>{return r.village_name==this.myFormGroup2.value.placeName})
    this.placeid=filteredList[0]['_id']
    this.tempVNAME=filteredList[0]['name']
    this.myFormGroup2.value.placeName = this.tempVNAME;
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
    this.myFormGroup.patchValue({
      loadingDate:this.formData.loadingDate,
      truckno:this.formData.truckno,
      partyType:this.formData.partyType,
      partyName:this.formData.partyDetails[0]['name'],
      placeName:this.formData.villageDetails[0]['village_name'],
      rent:this.formData.rent,
      advanceAmt:this.formData.advanceAmt,
      advanceDate:this.formData.advanceDate,
      totalRent:this.formData.rent+this.getAdvances2(this.extraRent,'extraAdvanceAmt'),
      extra_hamali:this.formData.extra_hamali,
      less:this.formData.less,
      cash:this.formData.cash,
      billamt:this.formData.billamt,
      totalBalance:this.formData.rent+this.getAdvances2(this.extraRent,'extraAdvanceAmt')-this.formData.advanceAmt-this.formData.extra_hamali-this.formData.less-this.formData.cash-this.formData.billamt,
      billno:this.formData.billno
    });
    
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

  getAdvances2(d,c){
    let sum=0;
    d.forEach(r=>{sum=sum+r[c]})
    return sum;
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
    console.log(j);
    
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
  CollectionMemoC(){
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
      'hamt':this.rent,
      'partyAdvanceAmt':this.advance?this.advance:'',
      'balance':this.balance?this.balance:'',
      'truckno':this.truckNo,
      'lrno':this.lrno
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
    if(this.ratnagiri){
      doc.text('From : ',67,mainY+44)
    }
    else{
      doc.text('To : ',67,mainY+44)
    }
    doc.text('Date : ',75,mainY+30)
    doc.text('M/s :              ',10,mainY+37)  
    doc.text('Truck No : ',10,mainY+44)
    
    doc.text('Lorry Hire : ',10,mainY+53)
    doc.setTextColor(224,0,0);

    if(this.showTon){
    doc.text('TON',67, mainY+53)
    }
    else if(this.showLrno){
      doc.text('LRNO',67, mainY+53)
    }
    else if(this.showQR){
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
    if(this.ratnagiri){
      doc.text(' To '+data.villageDetails,80,mainY+44)
    }else{
    doc.text(data.villageDetails,80,mainY+44)
    }
    doc.text(this.handleF.getDateddmmyy(data.loadingDate),95,mainY+30)
    if(this.ratnagiri){
      doc.text('Finolex Industries Pvt. Ltd. Ratanagiri',35,mainY+37)
      
    }
    else{
    doc.text(data.partyDetails,35,mainY+37)
    }
    // data.partyDetails
    doc.text(data.truckno,35,mainY+44)
    doc.text(String(data.hamt),35,mainY+53)
    if(this.showTon){
      doc.text('Fixed',100,mainY+53)
      }
      else if(this.showLrno){
        doc.text(String(data.lrno),100,mainY+53)  
      }
      else if(this.showQR){
        doc.text(String(data.lrno),100,mainY+53)  
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
      doc.text('For Nitin Roadways',105, mainY+84)
      doc.setTextColor(0,0,0);
      if(this.showPan){
      doc.text('PAN : AFGPG0575D',105, mainY+92)
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
    console.log(data);
    
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
          tempObj = { "method": "getloadingDetailByBill",'tablename':'','billNo':this.billParty+'_'+this.billNo};
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
    let imgdata="data:image/png;base64,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"
    let data=this.data[0];
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
    if(data.from==='advance'){
    doc.text(String(data.advanceAmt-data.extra_hamali-data.less-data.cash),32,mainY+114);
    }
    else{
      doc.text(String(data.advanceAmt),32,mainY+114);
    }
    doc.text(this.handleF.getDateddmmyy(data.advanceDate),29,mainY+119)
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
    if(data.from==='balance'){
    doc.text(String(this.getAdvances2(this.extraRent,'extraAdvanceAmt')+data.rent-data.advanceAmt-data.extra_hamali-data.less-data.cash),120,mainY+126);
    }
    else{
      doc.text(String(this.getAdvances2(this.extraRent,'extraAdvanceAmt')+data.rent-data.advanceAmt-data.extra_hamali-data.less-data.cash),120,mainY+126);
    }
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
    if(data.ownerDetails[0].update){
      doc.text('*Note : Please send your Account details with Truck No. on Mo:-9822288257',12, mainY+153)
    }else{
    doc.text('*Note : Advance and Balance payment will be done on this account.',12, mainY+153)
    doc.text('Please update your Account Details if necessary.',22, mainY+156)
    }
    // 
     // Account
  // Account square
  doc.setFontSize('10')
  
  doc.line(10,175,115,175)
  doc.line(10,196,115,196)
  doc.line(10,175,10,196)
  doc.line(115,175,115,196)

  doc.line(50,175,50,196)

  doc.line(10,181,115,181)
  doc.line(10,186,115,186)
  doc.line(10,191,115,191)



  doc.text('Account Name ',12,180)
  doc.text('Account Number ',12,185)
  doc.text('Bank Name ',12,190)
  doc.text('IFSC ',12,195)
    if(data.ownerDetails[0].update){}else{
  doc.text(data.ownerDetails[0].accountDetails[0]['accountName'],mainY+40,180)
  doc.text(String(data.ownerDetails[0].accountDetails[0]['accountNumber']),mainY+40,185)
  doc.text(data.ownerDetails[0].accountDetails[0]['bankName'],mainY+40,190)
  doc.text(data.ownerDetails[0].accountDetails[0]['ifsc'],mainY+40,195)
    }
  doc.addImage(imgdata, 'PNG', 118, 174, 25, 28);//add if else
  doc.setFontSize('8')
  doc.text('Scan QR code to contact us.',76,200)
  doc.save('Bills.pdf')
    // 3 Info
  }

}
