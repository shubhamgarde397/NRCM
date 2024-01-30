import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Consts } from '../../common/constants/const';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [ApiCallsService]
})
export class MainPageComponent implements OnInit {
  public date3month;
  public unique11turnbooklist=[];
  public tempObj = {};
  public years = []
  public buttons = []
  public todayDate;
  public placeidto;
  public partyidto;
  public trucknoid11=''
  public selectDate=false;
  public byTruckName=false;
  public villagenamelist=[];
  public whichType='0';
  public parties=[]
  public randomarray=[];
  public places=[]
  public tableDate=false;
  public turnbooklist=[]
  public data=[];
  public turn11=[];
  public myFormGroupR: FormGroup;
  public unique5turnbooklist=[];
  public commonArray;
  public considerArray;
  public truckVar;
  public transports=[];
  public showPan=false;
public sstampsign='';
public showTon=false;
public formData;
public showLrno=false;
public display8=false;
public imgData2='';
public ssign='';
public placeName2='';
public placeName='';
public extraRent=[]
public advanceArray=[];
public showQR=false;
public showsignstamp=false;
public showshubhamsign=false;
public showshubhamstamp=false;
public partyType2='';
public loadingDate='';
public partyName='';
public rent='';
public advance='';
public balance='';
public lrno='';
  public wala11=false;
  public data6=[];
  public fromDate='';
  public toDate = '';
public dataT='';
public bigI;
public dataTT='';
public truckNo='';
public admin=0;
public myFormGroup: FormGroup;
public paymentAmt=0;
public paymentDate='';
public statusOfPoch='Okay';
public bigII;
public radio='';
public bigJJ;
public selectedPochDate='';public fullpendingPayment=[];
public saveArray=[]
public selectedPaymentAmount=0;
public selectedPaymentDate=''
public paymentSettings=false;
public showpaymentButton=false;
public saveArrayData=false;
public defaultAmt=0;
public secretDoorForAnil=false;
public actualPayment=true;
public secretDoor=false;
public selectedmy;
public data3='0';
public data3value='';
public billNo=''
public showForm2=false;

// custom
public date;
public type1;
public type2;
public documentNos=[];
public documentNo='';
public date5b=''
public truckno5b=''
public partyName5b=''
public placeName5b=''
public placeName25b=''
public rent5b=0;
public partyType5b='';
public totalRentb5=0
public totalAdvanceb5=0
public billamt5b=0
public amount=0;
public remark='';
public coolie5b=0;
public data8=[];
public less5b=0;
public cash5b=0;
public totalcut5b=0;
public balance5b=0;
public advamt=0;
public advdate='';
public personalshubham=false;
// 

  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService,
    public handleF:handleFunction,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
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
    this.todayDate=this.handleF.createDate(new Date());
    this.myFormGroupR = this.formBuilder.group({
      from: 0,
      to: 0,
      qty:0
    });
  }

  getAdvances2(d,c){
    return d.reduce((partialSum, a) => partialSum + a[c], 0);
  }

  savePayment(i,j){
    this.bigII=i;
    this.bigJJ=j;
  }

  saveDoc(i,j){
    this.bigII=i;
    this.bigJJ=j;
    this.documentNos=this.turn11[this.bigJJ]['documentNo'];
  }

  fetchPendinActualPayments(){
    this.fullpendingPayment=[];
    this.saveArray=[]
    this.selectedPaymentAmount=0;
    this.selectedPaymentDate=''
    this.paymentSettings=false;
    this.showpaymentButton=false;
    this.saveArrayData=false;
    this.defaultAmt=0;

let formbody={}
formbody['method']='getTrucksWithNoActualPayment';
formbody['tablename']=''
formbody['selectedPochDate']=this.selectedPochDate;
    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, formbody, true)
    .subscribe((res: any) => {
      this.fullpendingPayment=res.Data;
      this.actualPayment=true;
      this.paymentSettings=true;
    });
    
  }

  paymentDateAmount(){
    this.showpaymentButton=this.selectedPaymentDate==''?false:true;
    this.showpaymentButton=this.selectedPaymentAmount==0?false:true;
    this.showpaymentButton=this.statusOfPoch==''?false:true;
  }


  sendDatatoUpdate1(){
    let obj={}
    let saveArray2=[]
    this.saveArray.forEach(r=>{saveArray2.push(r._id)})
    obj['ids']=saveArray2;
    obj['paymentDate']=this.paymentDate;
    obj['paymentAmt']=this.paymentAmt;
    obj['statusOfPoch']=this.statusOfPoch;
    obj['tablename']='';
    obj['method']='updateActualPaymentDetailsAll'
    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, obj, true)
    .subscribe((res: any) => {
      alert(res.Status);
      this.saveArray=[]
      this.paymentAmt=0;
      this.paymentDate=''
      this.defaultAmt=0;
    });
  }

  sendDatatoUpdate(){
    let arr=[]
    for (let i = 0; i < this.fullpendingPayment.length; i++) {
      if ((Number.isNaN(parseInt((<HTMLInputElement>document.getElementById('bhamt_' + i)).value)))) {}
      else if ((<HTMLInputElement>document.getElementById('bhdate_' + i)).value=='') {}
        else {
          let temp={}
          temp['_id']=this.fullpendingPayment[i]['_id'];
          temp['date']=(<HTMLInputElement>document.getElementById('bhdate_' + i )).value;
          temp['amt']=parseInt((<HTMLInputElement>document.getElementById('bhamt_' + i )).value);
          temp['status']=(<HTMLInputElement>document.getElementById('bhstatus_' + i )).value;
          arr.push(temp)
        }

    }

    let temp={}
    temp['method'] = 'updateActualPaymentDetailsAll';
    temp['data'] = arr;
    this.apiCallservice.handleData_New_python('commoninformation',1, temp, true)
      .subscribe((res: any) => {
        alert(res['Status']);
      });
    
  }

  addPayment(){
    let tempObj={}
    tempObj['method']='updateActualPaymentDetails';  
    tempObj['tablename']='';
    tempObj['_id']=this.bigII['_id']
    tempObj['paymentAmt']=this.paymentAmt;
    tempObj['paymentDate']=this.paymentDate;
    tempObj['statusOfPoch']=this.statusOfPoch;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status)
      });
  }
  saveDocData(){
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
  addDoc(){
    this.turn11[this.bigJJ].documentNo.push(this.documentNo);
    this.documentNos=this.turn11[this.bigJJ]['documentNo'];
  }

  toModal(index){
    this.bigI=index;
  }

  addToArrayAdv(){
      
    let temp={'amount':this.advamt,'date':this.advdate};
  this.advanceArray.push(temp);
  this.calcTotalAdv()
  }

  addToArray(){
    let temp={'extraAdvanceamt':this.amount,'extraAdvancemsg':this.remark};
    this.extraRent.push(temp);
    this.calcTotalRent()
  }

  delRent(j){
      this.extraRent.slice(j,1)
  }
  delDoc(j){
    this.documentNos.splice(j,1)
    this.turn11[this.bigJJ].documentNo.splice(j,1)
}
  deladv(j){
    this.advanceArray.splice(j,1);
}


  adminP(){
let pwd=prompt('Enter code!')
    if(pwd==='GOLDENLEO'){
      this.secretDoor=true
    }
    else if(pwd==='NRCM'){
      // let a=prompt('')
      this.secretDoorForAnil=true
    }
    else if(pwd==='SELFADMIN'){
      this.personalshubham=true;
    }
    else if(pwd==='ADMIN'){
      // Use this to show/hide hireamount and other important stuff
    }
  }


  littleDetail1(data){
    console.log(data);
    
    let msg=''
    msg=msg+'*TruckNo*-'+(data.truckName.truckno)+'\n';
    msg=msg+'*Contact*-'+(data.contacttb[0])+'\n'
    msg=msg+'*QR*-'+(data.qr[0])+'\n'
    msg=msg+''+(data.placeName.village_name)+'-'+data.typeOfLoad+'\n\n';
    msg=msg+'*Nitin Roadways*';
    return msg;
  }

  typeOfLoad(data){
    if(data==='Pipe'){return 'Urse';}
    else if(data==='Fittings'){return 'Talegaon';}
    else if(data==='Ratnagiri'){return 'Ratnagiri';}
  }

  saveData(index){
    this.bigI=index;
    console.log(this.data[this.bigI]);
    
    this.truckNo=this.turnbooklist[this.bigI]['truckName']['truckno'];
    this.dataTT=this.littleDetail1(this.turnbooklist[this.bigI])
      }

  getAmitDetails(){
    let tempObj={}
          tempObj['method']='findbyqrforLoadingStatus';  
    tempObj['tablename']='';
  
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {

              this.dataT=this.setMsg1(res.Data);
        this.whichType='7';    
        
      });
  }

  littleDetail(data,msg){
    if(data.typeOfLoad==='Pipe'){
    msg=msg+(data.truckno)+'\n';
    msg=msg+(data.party)+'\n';
    msg=msg+(data.v1)+'\n';
    msg=msg+'\n\n';
    return msg;
    }
    return msg;
  }
  
  
  setMsg1(data){
    let msg='';
    data.forEach(r => {
      msg=this.littleDetail(r,msg)
      console.log(msg);
      
    });
    return msg;
  }

  getWhichType(data,yn){
this.whichType=data;
if(yn){
let tempObj={}
switch(data){
    case '1':
      this.tableDate=false;
      tempObj['tablename'] = ''
    tempObj['method'] = 'getRent'
      break;
}
this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        switch(data){
          case '1':
            this.tableDate=true;
            this.data=res.Data;
          break;
          case '2':
            this.villagenamelist=res.Data;
          break;
        }
      });
    }
  }

  getdata3(){
    this.data3=this.data3value;
console.log(this.data3value);

    if(this.data3value==='2'){
    this.buttons=this.getButtons();
    }
      }

      getButtons() {
        console.log('hi');
        
        let buttons=[]
            for (let i = 0; i < new Date().getFullYear() - 2019; i++) {
              this.years.push(i + 2020)
            }
            for (let i = 0; i < this.years.length; i++) {
              let months = new Date().getFullYear() - this.years[i] == 0 ? new Date().getMonth() + 1 : 12;
              for (let j = 0; j < months; j++) {
                let date = new Date(String(i + 2020) + '-' + this.handleF.generate2DigitNumber(String(j + 1)) + '-01');
                let month = date.toLocaleString('default', { month: 'short' });
                this.tempObj['value'] = "^" + String(i + 2020) + "-" + this.handleF.generate2DigitNumber(String(j + 1)) + ".*";
                this.tempObj['viewValue'] = month + '-' + String(i + 2020).slice(-2);
                buttons.push(this.tempObj);
                this.tempObj = {}
              }
            }
            return buttons.reverse();
          }

      download(){

        let tempObj1={};
        tempObj1['tablename'] = ''
        tempObj1['method'] = 'downloadRentSheet'
        tempObj1['date'] = this.selectedmy;
          this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
          .subscribe((res: any) => {
            this.turnbooklist=res.Data;
          //  this.pdfrent(res.Data)
          
          });

      }
      changeDiv(){
        this.display8=!this.display8;
      }
      storePersonal(){
        let tempObj1={};
        tempObj1['tablename'] = ''
        tempObj1['method'] = 'storePersonal'
        tempObj1['date'] = this.date;
        tempObj1['type1'] = this.type1;
        tempObj1['type2'] = this.type2;
          this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
          .subscribe((res: any) => {
            alert(res.Data);
          });
      }
      get8(){
        let tempObj1={};
        tempObj1['tablename'] = ''
        tempObj1['method'] = 'getPersonal'
          this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
          .subscribe((res: any) => {
            this.data8=res.Data;
          });
      }
      changeRC(data,i){
        alert('Changing data for '+data+'\nCurrent '+i[data]);
        let value=prompt('Enter new value for '+data)

        let tempObj1={};
        tempObj1['tablename'] = ''
        tempObj1['method'] = 'changeRC'
        tempObj1['_id'] = i['_id']
        tempObj1['value'] = value;
        tempObj1['what']=data;
          this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
          .subscribe((res: any) => {
            alert(res.Status)
          });
      }

find(event){
  if(event==='11'){
    this.wala11=true;
  }
  else{
    this.wala11=false;
  }
        let tempObj1={};
    tempObj1['tablename'] = 'turnbook'
    tempObj1['method'] = 'singleTruck'
    tempObj1['display'] = event;
    tempObj1['truckno'] = this.truckVar;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true,this.handleF.createDate(new Date()),'nrcm')
      .subscribe((res: any) => {
        if(res.Data.length>0){
        this.unique11turnbooklist=res.Data;
        this.byTruckName=true;
        this.turnbooklist = res.Data;
        this.unique11turnbooklist= res.Data.map(r=>r.truckName.truckno).filter(function(item, pos) {return res.Data.map(r=>r.truckName.truckno).indexOf(item) == pos;})
        if(event==='11new'){
          this.trucknoid11=res.Data[0].truckName.truckno
          this.find11UniqueTruck();
        }
        if(event==='qr'){
          this.trucknoid11=res.Data[0].truckName.truckno
          this.find11UniqueTruck();
        }
        if(event==='bill'){
          this.trucknoid11=res.Data[0].truckName.truckno
          this.find11UniqueTruck();
        }
      }
      else{
        this.unique11turnbooklist=[];
        this.turn11=[];
        this.turnbooklist=[];
        this.byTruckName=false;
      }
      });

}

  generate(){
    if(this.myFormGroupR.value.to-this.myFormGroupR.value.from+1>=this.myFormGroupR.value.qty){
    this.randomarray = []
    
      while(this.randomarray.length < this.myFormGroupR.value.qty){
          var r = Math.floor(Math.random() * (this.myFormGroupR.value.to - this.myFormGroupR.value.from + 1)) + this.myFormGroupR.value.from;
          if(this.randomarray.indexOf(r) === -1) this.randomarray.push(r);
      }
    }
    else{
      alert('Range Warning!')
    }
  }


    find11UniqueTruck(){
      if(this.trucknoid11!=='Default'){
        this.selectDate=false;
        this.byTruckName=true;
      this.turn11=this.turnbooklist.filter(r=>{return r.truckName.truckno==this.trucknoid11});
      this.turn11.forEach(r=>{
        let ad=r.advanceArray
        for(let i=0;i<ad.length;i++){
            if(ad[i]['reason']==='Balance'){
                r['BHamt']=ad[i]['advanceAmt']
                r['BHAccNo']=ad[i]['BHAccNo']
                r['BHAccName']=ad[i]['BHAccname']
            }
        }
    })
      
      }
    }

  getVillages(){
    let value={}
    value['method'] = 'display';
    value['code'] = 'v';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        this.villagenamelist=res.Data;
        this.sec.commonArray['places'] = res.Data.length > 0 ? res.Data : this.sec.commonArray['places'];
      });
  }
  getparties(){
    let value={}
    value['method'] = 'display';
    value['code'] = 'p';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        this.parties=res.Data;
        this.sec.commonArray['parties'] = res.Data.length > 0 ? res.Data : this.sec.commonArray['parties'];
      });
  }

  selectedColor(data){
    this.radio=data;
  }

  getVPData(){
    let tempObj1={};
    tempObj1['method'] = 'villagerent'
    tempObj1['tablename'] = ''
    tempObj1['partyid'] = this.partyidto;
    tempObj1['placeid'] = this.placeidto;
    tempObj1['fromDate'] = this.fromDate;
    tempObj1['toDate'] = this.toDate;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true,this.handleF.createDate(new Date()),'nrcm_f')
      .subscribe((res: any) => {
        this.turnbooklist = res.Data;
      })
  }
  find6(){
  let tempObj1={};
    tempObj1['method'] = 'getTeBa';
    tempObj1['tablename'] = '';
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true,this.handleF.createDate(new Date()),'nrcm_f')
      .subscribe((res: any) => {
        this.data6 = res.Data;
      })
}
  setTB(){
    let arr=[]
    for (let i = 0; i < this.data6.length; i++) {
        if ((parseInt((<HTMLInputElement>document.getElementById('tb_' + i )).value) == 1)) {}
        else if ((Number.isNaN(parseInt((<HTMLInputElement>document.getElementById('tb_' + i)).value)))) {}
        else {
          let temp={}
          temp['_id']=this.data6[i]['_id'];
          temp['tb']=parseInt((<HTMLInputElement>document.getElementById('tb_' + i )).value);
          arr.push(temp)
        }

    }

    let temp={}
    temp['method'] = 'setTeBa';
    temp['data'] = arr;
    this.apiCallservice.handleData_New_python('commoninformation',1, temp, true)
      .subscribe((res: any) => {
        alert(res['Status']);
      });
    
  }

  show(data){
    this.data6=this.data6.filter(r=>{if(r.tentativeBalance==data){return r}})
  }

  getTpt(){
  let data=[]
let tempObj1={};
    tempObj1['tablename'] = ''
    tempObj1['method'] = 'gettpts'
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true,this.handleF.createDate(new Date()),'nrcm_f')
      .subscribe((res: any) => {
        data=res.Data;
        this.CollectionMemoC();
      });
    }

    getInformationData() {
      let tempObj={};
            tempObj = { "method": "getloadingDetailByBill",'tablename':'','billNo':this.billNo};
      this.spinnerService.show();
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          
          this.data=res.Data

                this.showForm2=true;
                this.formData=res.Data[0]
                this.myFormGroup.patchValue({
                  totalRent:0
                })
                this.changeFormStatus2()
              
          
        });
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

    CollectionMemoC(){
      this.sstampsign=Consts.sstampsign;
      this.imgData2=Consts.imgData2;//jyoti garde
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

    calcTotalRent(){
      let sum=0;
      sum=this.rent5b;
      this.extraRent.forEach(r=>{sum=sum+parseInt(r.extraAdvanceamt)})
      this.totalRentb5=sum;
    }
    
    calcTotalAdv(){
      let sum=0;
      this.advanceArray.forEach(r=>{sum=sum+parseInt(r.amount)})
      this.totalAdvanceb5=sum;
    }

    calcTotalBill(){
      console.log(this.billamt5b);
      console.log(this.coolie5b);
      console.log(this.less5b);
      console.log(this.cash5b);
      
      this.totalcut5b=this.billamt5b+this.coolie5b+this.less5b+this.cash5b;
    }
      

    pdfData(data2){
    
      let data={
        "dueInfo": [],
        "returnhamali": 0,
        "advanceArray": [],
        "loadingDate": "",
        "partyType": "",
        "rent": 0,
        "extra": [],
        "extra_hamali": 0,
        "less": 0,
        "cash": 0,
        "billamt": 0,
        "advAccid": 0,
        "billno": "",
        "due": [],
        "truckno": "",
        "update": false,
        "village1": "",
        "partyname": "",
        "account": {
            "accountName": "",
            "accountNumber": "",
            "bankName": "",
            "ifsc": ""
        }
    }

  
      switch(data2){
        case 'simple':
          data=this.formData;
          break;
        case 'custom':
          data={
            "dueInfo": [],
            "returnhamali": 0,
            "advanceArray": this.advanceArray,
            "loadingDate": this.date5b,
            "partyType": this.partyType5b,
            "rent": this.rent5b,
            "extra": this.extraRent,
            "extra_hamali": this.coolie5b,
            "less": this.less5b,
            "cash": this.cash5b,
            "billamt": this.billamt5b,
            "advAccid": 1,
            "billno": this.truckno5b,
            "due": [],
            "truckno": this.truckno5b,
            "update": false,
            "village1": this.placeName5b,
            "partyname": this.partyName5b,
            "account": {
                "accountName": "",
                "accountNumber": "",
                "bankName": "",
                "ifsc": ""
            }
        }
           
          break;
      }
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
      doc.text('Bill No. : '+data.billno,10,mainY+39)
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
      if(data2=='simple'){
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
    
    doc.save(data.truckno+'.pdf')
      // 3 Info
    }
}

