import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Router } from 'node_modules/@angular/router';
import { Consts } from 'src/app/common/constants/const';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-driver-contact',
  templateUrl: './driver-contact.component.html',
  styleUrls: ['./driver-contact.component.css']
})
export class DriverContactComponent implements OnInit {
  public bigI='';
  public bigJ='';
  public tab=1;
  public considerArray=[];
  public sstampsign=''
  public ssign=''
  public tempBalls= [];
  public tempType= '';
  public tempTruckNo='';
  public bigArr = [];
  public transports = [];
  public paymentDate;
  public paymentAmt;
  public reference;
  public transportid='';
  public name='';
  public value='';
  public advbalarray=[]
  public bigII;
  public bigJJ;

  public turnbooklist1=[];
  public contact=[];
  public qr=[];
  public qrsetter=0;
  public pts=[
    {value:'NRCM',viewValue:'NRCM'},
    {value:'NR',viewValue:'NR'},
    {value:'SNL',viewValue:'SNL'}
  ]
  public tols=[
    {value:'Pipe',viewValue:'Pipe_Urse'},
    {value:'Fittings',viewValue:'Fittings_TVS'},
    {value:'Fittings',viewValue:'Fittings_DHL'},
    {value:'Ratnagiri',viewValue:'Pipe_Ratnagiri'}
  ]

  public tols2=[]
  public submitButton=false;
  public tons=[]

  public submission=[];
  public commonArray;
  public parties=[]
  public parties2=[]
  public villages=[]
  public todayDate=new Date().toLocaleDateString();
  public loadingDate;
  public pmts=[]
  public comm=[];
  public pmts3=[]
  public trucks=[]
  public rqty =0

    constructor(
      public apiCallservice: ApiCallsService, 
      public securityCheck: SecurityCheckService,
       public handledata: HandleDataService,
       public handleF:handleFunction,
       public formBuilder: FormBuilder,
       public router:Router
       ) {if(!this.securityCheck.login){
        this.router.navigate([''])
      } }
  
    ngOnInit() {
      this.considerArray = this.handledata.createConsiderArray('infogsthidden')
   this.get() 
    this.commonArray = this.securityCheck.commonArray;
    }

    tabF(data){
      this.tab=data;
    }

    get2(){
      let tempObj = { "method": "getpartymsgtosend", 'tablename':''};
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.pmts=res.Data;
          this.pmts.forEach(r=>{
            r.contactp=r['contactp1'].filter(rr=>{return rr.village==r['destination']})[0]['contact']
        })
        });
    }

    get3(){
      let tempObj = { "method": "sendOfcLocation", 'tablename':''};
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.pmts3=res.Data;
        });
    }

    get4(){
      let tempObj = { 
        "method": "getcommtosend", 
        'tablename':'',
        'loadingDate':this.loadingDate
      };
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.comm=res.Data;
        //   this.comm.forEach(r=>{
        //     r.contactp=r['contactp1'].filter(rr=>{return rr.village==r['destination']})[0]['contact']
        // })
        });
    }

     get44(){
      let tempObj = { 
        "method": "getBaltosend", 
        'tablename':''
      };
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.comm=res.Data;
        });
    }

    get55(){
      let tempObj = { 
        "method": "getCollectionMemo",
        'loadingDate':this.loadingDate,
        'tablename':''
      };
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.comm=res.Data;
        });
    }

    sendCM(dataM,i){
      this.sstampsign=Consts.sstampsign;
      this.ssign=Consts.ssign;
      if(dataM.place2===undefined){}
      else{
        dataM.place=dataM.place+'/'+dataM.place2;
      }

     
      
      
      let d=new Date()
      let billno=dataM.billno.split('_')[1];
      let data={
        'partyType':  dataM.partyType,
        'loadingDate':dataM.loadingDate,
        'partyDetails':dataM.party,
        'villageDetails':dataM.place,
        'hamt':dataM.hamt,
        'partyAdvanceAmt':(<HTMLInputElement>document.getElementById('adv_' + i)).value,
        'balance':(<HTMLInputElement>document.getElementById('bal_' + i)).value,
        'truckno':dataM.truckNo,
        'nrlrno':dataM.nrlrno,
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
      if(data.partyType==='SNL'){
        doc.text('DAILY SERVICE MAHARASHTRA,TAMILNADU, KERALA & KARNATAKA',18,mainY+8)
      }
      else{
        doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY',18,mainY+8)
      }
      
      doc.setDrawColor(163,0,0);
      doc.setLineWidth(0.5);
      doc.line(3, mainY+9, 146, mainY+9);
  
      doc.setDrawColor(224,0,0);
      doc.setLineWidth(0.8);
      doc.line(3, mainY+10, 146, mainY+10);
      
      doc.setFontType('italic');
    
      if(data.partyType==='SNL'){
        doc.setFontType('normal');
        doc.setFontSize('9');
        doc.setTextColor(0, 0, 0);
        doc.text('Cell :- 9822288257, 8529275757', 10, mainY+14)
        doc.text('Email : shrinitinlogistics@gmail.com  Website : www.nitinroadways.in', 10, mainY+18)
        doc.text('PNo 25, Vazhudavoor Rd, Ramanathapuram, Villianur Commune,Pondicherry - 605505', 10, mainY+22)
        }
        else{
          doc.setFontType('normal');
        doc.setFontSize('9');
        doc.setTextColor(0, 0, 0);
        doc.text('Cell :- 9822288257, 8459729293, 9423580221, 8529275757', 10, mainY+14)
        doc.text('Email : punenitinroadways@gmail.com  Website : www.nitinroadways.in', 10, mainY+18)
        doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 10, mainY+22)

      }
      
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
  
      if(data.nrlrno==='')
        {
      doc.text('TON',67, mainY+53)
      }
      else{
        doc.text('LRNO',67, mainY+53)
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
      if(data.nrlrno===''){
        doc.text('Fixed',100,mainY+53)
        }
        else{ 
          doc.text(String(data.nrlrno),100,mainY+53)  
        }
  

            doc.addImage(this.ssign,'JPEG',100,90,30,15)
         
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
   
      if(data.partyType==='NR'){
        doc.text('For Nitin Roadways',105, mainY+81)
        doc.setTextColor(0,0,0);
        doc.text('PAN : AFGPG0575D',10, mainY+92)
        
        
      }
      if(data.partyType==='SNL'){
          doc.text('For Shri Nitin Logistics',105, mainY+84)
          doc.setTextColor(0,0,0);
        doc.text('PAN : BTBPG2818K',10, mainY+92)
        
      }
      doc.save(data.truckno+'.pdf')
      // 3 Info
    }

  sendMsg(data){
      let addonsSum=data.addonsSum
      let deductionsSum=data.deductionsSum
          
    let msg=''
    msg=msg+'*'+(data.truckName.truckno)+'*%0A';
    msg=msg+'*'+(this.handleF.getDateddmmyy(data.loadingDate))+'*%0A';
    msg=msg+''+(data.placeName.village_name)+'%0A%0A';

      if(addonsSum>0){
    msg=msg+'%0A> *`Addons`*'+'%0A';
    for(let i=0;i<Object.keys(data.addons).length;i++){
        msg=msg+'* '+Object.keys(data.addons)[i]+' : '+Object.values(data.addons)[i]+'%0A';
    }
    if(Object.keys(data.addons).length>1){
      msg=msg+'------------------------------------%0A';
      msg=msg+'* Total : '+addonsSum.toString()+'%0A%0A';
    }
    msg=msg+'`Rent` : '+data.rent+' + '+addonsSum.toString()+' = '+(parseInt(data.rent) + parseInt(addonsSum)).toString()+'%0A';
    msg=msg+'`Advance` : '+(data.advanceArray.reduce((partialSum, a) => partialSum + parseInt(a.amount), 0)+data.billamt+ deductionsSum).toString()+'%0A';
    msg=msg+'`Balance` : '+(data.rent+addonsSum-data.billamt-deductionsSum-data.advanceArray.reduce((partialSum, a) => partialSum + parseInt(a.amount), 0)).toString()+'%0A%0A';
    }
    else{
    msg=msg+'`Rent` : '+(data.rent).toString()+'%0A';
    msg=msg+'`Advance` : '+(data.advanceArray.reduce((partialSum, a) => partialSum + parseInt(a.amount), 0)+data.billamt+ deductionsSum).toString()+'%0A';
    msg=msg+'`Balance` : '+(data.rent-data.billamt-deductionsSum-data.advanceArray.reduce((partialSum, a) => partialSum + parseInt(a.amount), 0)).toString()+'%0A%0A';
    }
    
    if(deductionsSum>0){
    msg=msg+'%0A> *`Deductions`*'+'%0A';
    for(let i=0;i<Object.keys(data.deductions).length;i++){
        msg=msg+'* '+Object.keys(data.deductions)[i]+' : '+Object.values(data.deductions)[i]+'%0A';
    }
    if(data.billamt>0){
    msg=msg+'* Bill Amt : '+(data.billamt).toString()+'%0A';
    }
    msg=msg+'------------------------------------%0A';
    msg=msg+'* Total : '+(data.billamt+ deductionsSum).toString()+'%0A';
    }
    else{
     if(data.billamt>0){
    msg=msg+'* Bill Amt : '+(data.billamt).toString()+'%0A';
    
    msg=msg+'------------------------------------%0A';
    msg=msg+'* Total : '+(data.billamt+ deductionsSum).toString()+'%0A';
     }
    }
    msg=msg+'%0A> *`Advance`*%0A';
    msg=msg+'*`['+(data.advanceArray.reduce((partialSum, a) => partialSum + parseInt(a.amount), 0)+data.billamt+ deductionsSum).toString()+'-'+(data.billamt+ deductionsSum).toString()+'='+(data.advanceArray.reduce((partialSum, a) => partialSum + parseInt(a.amount), 0)).toString()+']`*%0A%0A';
    for(let i=0;i<data.advanceArray.length;i++){
        msg=msg+'* '+data.advanceArray[i]['amount'].toString()+' ('+this.handleF.getDateddmmyy(data.advanceArray[i]['date'])+')'+'%0A';
    }
    msg=msg+'%0A';

    msg=msg+'*Nitin Roadways*%0A%0A';
    // msg=msg+'`Click on link to download Commission Bill.`';
    let qr='https://wa.me/+91'+data.contacttb[0]+'/?text='+msg
      window.open(qr,'_blank');    
  }

  sendMsgB(data){
      

     let tempObj = { 
        "method": "setBalanceOkay1", 
        'tablename':'',
        '_id':data._id
      };
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {});


      let balance = 0
            let addonsSum=data.addonsSum
      let deductionsSum=data.deductionsSum
      let balancedeductionsSum=data.balancedeductionsSum
          
      let msg=''
      msg=msg+'*'+(data.truckName.truckno)+'*%0A';
      msg=msg+'*'+(this.handleF.getDateddmmyy(data.loadingDate))+'-'+(data.placeName.village_name)+'*%0A';

      if(balancedeductionsSum>0){
      msg=msg+'%0A> *`Deductions`*'+'%0A';
      for(let i=0;i<Object.keys(data.balancedeductions).length;i++){
        msg=msg+'* '+Object.keys(data.balancedeductions)[i]+' : '+Object.values(data.balancedeductions)[i]+'%0A';
      }
      if(Object.keys(data.balancedeductions).length>1){
        msg=msg+'------------------------------------%0A';
        msg=msg+'* Total : '+balancedeductionsSum.toString()+'%0A%0A';
      }
      balance = data.rent+addonsSum-data.billamt-deductionsSum-data.advanceArray.reduce((partialSum, a) => partialSum + parseInt(a.amount), 0);
      }
      else{
    balance = data.rent-data.billamt-deductionsSum-data.advanceArray.reduce((partialSum, a) => partialSum + parseInt(a.amount), 0)
      }
        

        msg=msg+'%0A> *`Balance`*%0A';
        if(balancedeductionsSum>0){
        msg=msg+'*`['+balance+'-'+(balancedeductionsSum).toString()+'='+(balance - balancedeductionsSum-50).toString()+']`*%0A%0A';
        }
        for(let i=0;i<data.balanceArray.length;i++){
            msg=msg+'* '+data.balanceArray[i]['amount'].toString()+' ('+this.handleF.getDateddmmyy(data.balanceArray[i]['date'])+')'+'%0A';
        }
        msg=msg+'%0A';

        msg=msg+'*Nitin Roadways*%0A%0A';
        // msg=msg+'`Click on link to download Commission Bill.`';
        
    // this.qrMsg=res.Status.split(res.Status.substring(0,34))[1].replaceAll('%0A','%0A');

    let qr='https://wa.me/+91'+data.contacttb[0]+'/?text='+msg
          window.open(qr,'_blank');  

  }


    setTrue3(){
      let tempObj = { "method": "setOfcLocation", 'tablename':'','ownerids':this.pmts3.map(r=>{return r.ownerid})};
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          alert(res.Status)
        });
    }

    qrCoder(data){
      window.open(data,'_blank');  
    }

    LocationSender(data){
      window.open("https://wa.me/+91"+data.contacttb+"/?text=*Nitin Roadways*%0A%0Ahttps://maps.app.goo.gl/6i4xkLQUbeGXXh3y8?g_st=awb",'_blank');
    }


    get() {
      this.trucks=[];
      let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
          this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];
          this.securityCheck.commonArray['transport'] = Object.keys(res.transport[0]).length > 0 ? res.transport : this.securityCheck.commonArray['transport'];
          
        });
    }

  savePayment(i,j,type){
    this.bigII=i;
    this.bigJJ=j;
    this.advbalarray = this.comm[this.bigJJ][type]
      
    this.tempType=type;
  }

  
  deladvbalArray(index){
    if(confirm('Are you sure?')){
    let tempObj={}
    
      tempObj['method']='deladvbalArray'; 
    
      tempObj['tablename']='';
      tempObj['_id']=this.bigII['_id']
      tempObj['index']=index;
      tempObj['type']=this.tempType;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          alert(res.Status);
          this.comm[this.bigJJ][this.tempType].splice(index,1);
        });
    
      
  }
  }

  addPayment(){
    let tempObj={};
    tempObj['method']='updateAdvPaymentDetails'; 
    tempObj['_id']=this.bigII['_id'];
    tempObj['paymentAmt']=this.paymentAmt;
    tempObj['paymentDate']=this.paymentDate;
    tempObj['reference']=this.reference;
    tempObj['transportid'] = this.transports.find(r=>r.tptName==this.transportid)['_id'];
    tempObj['tablename']='';
    tempObj['type']=this.tempType;
    tempObj['_id']=this.bigII['_id']

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status)
    this.comm[this.bigJJ][this.tempType].push({'amount':this.paymentAmt,'date':this.paymentDate,'reference':this.reference});
      });
    
  }

  storeAD1(){
    
    let tempObj1={};
    tempObj1['method'] = 'storeAD'
    tempObj1['tablename'] = ''
    tempObj1['type']=this.tempType
    tempObj1['_id']=this.bigII['_id'];
    tempObj1['name']=this.name
    tempObj1['value']=this.value
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true,this.handleF.createDate(new Date()))//fast
      .subscribe((res: any) => {
        alert(res.Status)
        this.tempBalls.push({key: this.name, value: this.value});
        this.comm[this.bigJJ][this.tempType][this.name]=this.value;
      })
    
  }

   deleteTB1(i,j){
    if(confirm('Do you want to delete?')){

       let tempObj1={};
    tempObj1['method'] = 'deleteAD'
    tempObj1['tablename'] = ''
    tempObj1['type']=this.tempType
    tempObj1['_id']=this.bigII['_id'];
    tempObj1['key']=i.key[j];

      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true,this.handleF.createDate(new Date()))//fast
      .subscribe((res: any) => {
        this.tempBalls.splice(j,1);
        delete this.comm[this.bigJJ][this.tempType][i.key[j]];
        alert(res.Status)
      })
        
      }
  }


    savePayment2(i,j,type){
      this.tempBalls=[]
      this.bigII=i;
      this.bigJJ=j;
      this.tempType=type;
      this.bigArr = this.comm[this.bigJJ]
      let tempObj=this.comm[this.bigJJ][this.tempType];
      let tempObjK=Object.keys(tempObj)
      let tempObjV=Object.values(tempObj)
      for (let i = 0;i<tempObjK.length;i++){
        this.tempBalls.push({
          key:[tempObjK[i]],
          value: tempObjV[i]
        });
      }
  }

    getTransport(){
      let value={}
      value['method'] = 'getTransport';
      value['tablename'] = '';
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, value, true)
        .subscribe((res: any) => {
          this.transports=res.Data;
        });
  }

    fetchBasic() {
      this.commonArray = this.securityCheck.commonArray;
      this.parties = [];
      this.trucks=[]
      this.villages = [];
      this.parties = this.commonArray.gstdetails;
      this.villages = this.commonArray.villagenames;
      this.transports = this.commonArray.transport;
    }

    checkTON(index){     
      console.log((<HTMLInputElement>document.getElementById('tol_' + index)).value);
      
      if((<HTMLInputElement>document.getElementById('tol_' + index)).value==='Fittings_TVS')
        {
          this.turnbooklist1[index].tons=['0','6','SXL-32','MXL-32']
        }
      else if((<HTMLInputElement>document.getElementById('tol_' + index)).value==='Fittings_DHL')
        {
          this.turnbooklist1[index].tons=['0','6','7','SXL-32','MXL-32']
        }
        else
        {
          this.turnbooklist1[index].tons=['0','7','8','10','T'];
        }
        console.log(this.turnbooklist1[index].tons);
        
    }
  
    setParty(index){
      let data=(<HTMLInputElement>document.getElementById('pt_' + index)).value;
      switch (data) {
        case 'NRCM':
          let qr=(<HTMLInputElement>document.getElementById('qrsetter')).value;
          this.turnbooklist1[index].parties2=this.parties.filter(r=>{return r.partyType=='NRCM'});
          this.turnbooklist1[index]['qrs']=[];
          this.turnbooklist1[index]['qrs'].push({qr:qr});
          this.turnbooklist1[index]['otherbuttons']=true;
          this.turnbooklist1[index].tons=['0','7','8','10','T'];
          break;
          case 'NR':
            this.turnbooklist1[index].parties2=this.parties.filter(r=>{return r.partyType=='NR'})
            this.turnbooklist1[index]['otherbuttons']=false;
            this.turnbooklist1[index]['qrs']=[];
          break;
          case 'SNL':
            this.turnbooklist1[index].parties2=this.parties.filter(r=>{return r.partyType=='SNL'})
            this.turnbooklist1[index]['otherbuttons']=false;
            this.turnbooklist1[index]['qrs']=[];
          break;
      
        
        
      }
    }

    breakBill(data){
     let temp={}
      for(let i=0;i<data.length;i++){
          temp[data[i][0]]=data[i][1]
      }
        return temp;
      }

  saveEdit(i,j,k){
    this.bigI=i;
    this.bigJ=j;
    this.tempTruckNo=(<HTMLInputElement>document.getElementById('truckno_' + j)).value;
    this.tempType=k;
    this.tempBalls=this.turnbooklist1[this.bigJ][this.tempType];
  }

  deleteTB(j){
    if(confirm('Do you want to delete?')){
        this.turnbooklist1[this.bigJ][this.tempType].splice(j,1);
      }
  }

  storeAD(){
    let a=this.name
    let b=this.value
    let arr=[a,b]
    this.turnbooklist1[this.bigJ][this.tempType].push(arr);
    
  }

  addRow(data,index){
    switch (data) {
      case 'r':
        let temp={
          contacts:[{co:''}],
          lul:'lock',
          parties2:[],
          tol:'',
          tons:[],
          addons:[],
          deductions:[]
        }
          this.turnbooklist1.push(temp);
          this.submission.push(0);
          this.submitButton=this.submission.every((value)=>{return value>0})
       
        break;
    
      case 'c':
        this.turnbooklist1[index]['contacts'].push({co:''})
        break;

      case 'q':
        this.turnbooklist1[index]['qrs'].push({qr:(<HTMLInputElement>document.getElementById('qrsetter')).value});
        
        // (<HTMLInputElement>document.getElementById('qr_'+this.turnbooklist1.length+this.turnbooklist1[index]['qrs'].length)).value
        break;
    }
    
  }

  checker(index){
    let pt = (<HTMLInputElement>document.getElementById('pt_' + index)).value;
    

    if(pt==='NRCM'){
      let date = (<HTMLInputElement>document.getElementById('date_' + index)).value;
      let tno = (<HTMLInputElement>document.getElementById('truckno_' + index)).value;
      let pn = (<HTMLInputElement>document.getElementById('pn_' + index)).value;
      let p1 = (<HTMLInputElement>document.getElementById('p1_' + index)).value;
      let c = this.turnbooklist1[index]['contacts'];
      let q = this.turnbooklist1[index]['qrs'];
      let pac=12;
      let tol = (<HTMLInputElement>document.getElementById('tol_' + index)).value;
      let weight=(<HTMLInputElement>document.getElementById('weight_' + index)).value;
      let r = this.handleF.checkme([date,tno,pn,p1,c,q,tol,weight],['string','string','string','string','object','object','string','string'],[]);

      return r.every((value)=>{return value>0})
    }
    if(pt==='NR'){
      let date = (<HTMLInputElement>document.getElementById('date_' + index)).value;
      let tno = (<HTMLInputElement>document.getElementById('truckno_' + index)).value;
      let pn = (<HTMLInputElement>document.getElementById('pn_' + index)).value;
      let p1 = (<HTMLInputElement>document.getElementById('p1_' + index)).value;
      let c = this.turnbooklist1[index]['contacts'];
      let r = this.handleF.checkme([date,tno,pn,p1,c],['string','string','string','string','object'],[]);
      let pac=363;

      return r.every((value)=>{return value>0})
    }
    if(pt==='SNL'){
      let pac=65;
      let date = (<HTMLInputElement>document.getElementById('date_' + index)).value;
      let tno = (<HTMLInputElement>document.getElementById('truckno_' + index)).value;
      let pn = (<HTMLInputElement>document.getElementById('pn_' + index)).value;
      let p1 = (<HTMLInputElement>document.getElementById('p1_' + index)).value;
      let c = this.turnbooklist1[index]['contacts'];
      let r = this.handleF.checkme([date,tno,pn,p1,c],['string','string','string','string','object'],[]);

      return r.every((value)=>{return value>0})
    }
    else{
      alert('Cannot Lock Select Party Type!');
      return false;
    }

  }
  lulAll(){
    for(let i = 0;i<this.turnbooklist1.length;i++){
      this.turnbooklist1[i]['lul']='unlock'
      this.submission[i]=1;
    }
    this.submitButton=this.submission.every((value)=>{return value>0})
  }


  delete(index,data,index2){
    switch (data) {
      case 'r':
      if(confirm('Do you want to delete entire row?')){
        this.turnbooklist1.splice(index,1);
        this.submitButton=this.submission.every((value)=>{return value>0})
      }
        break;
    
      case 'c':
        this.turnbooklist1[index]['contacts'].splice(index2,1);
        this.submitButton=this.submission.every((value)=>{return value>0})
        break;

      case 'q':
        this.turnbooklist1[index]['qrs'].splice(index2,1);
        this.submitButton=this.submission.every((value)=>{return value>0})
        break;
    }
  }


   formatTruckNo(a){
      a=a.toUpperCase();
      let newtruck=[]
      let raw=a.replace(/ /g, "");
      newtruck.push(raw.slice(0,2))
      newtruck.push(raw.slice(2,4))
      
      if(raw.length==10){
          newtruck.push(' ')
          newtruck.push(raw.slice(4,6))	
          newtruck.push(' ')
          newtruck.push(raw.slice(6,10))	
      }
      if(raw.length==9){

          newtruck.push(' ')
          newtruck.push(raw.slice(4,5))	
          newtruck.push(' ')
          newtruck.push(raw.slice(5,9))	
      }
      if(raw.length==8){
          newtruck.push(' ')
          newtruck.push(raw.slice(4,8))	
      }
      return newtruck.join('')
    }


    save(){
    let array=[]
    for(let i =0;i<this.turnbooklist1.length;i++){
      let temp={};
      let c = []
      let q=[]
      let tno = this.formatTruckNo((<HTMLInputElement>document.getElementById('truckno_' + i)).value);
      let pt = (<HTMLInputElement>document.getElementById('pt_' + i)).value;
      let pn = (<HTMLInputElement>document.getElementById('pn_' + i)).value;
      let p1 = (<HTMLInputElement>document.getElementById('p1_' + i)).value;
      let p2 = (<HTMLInputElement>document.getElementById('p2_' + i)).value;
      let tptName = (<HTMLInputElement>document.getElementById('tptName_' + i)).value;
      let tol = pt==='NRCM'?(<HTMLInputElement>document.getElementById('tol_' + i)).value:'Other';
      let hamt = pt==='NRCM'?0:parseInt((<HTMLInputElement>document.getElementById('hamt_' + i)).value);
      let weight = pt==='NRCM'?(<HTMLInputElement>document.getElementById('weight_' + i)).value:0;
      let pac = pt==='NRCM'?12:(pt==='NR'?363:65)

      let rent = (<HTMLInputElement>document.getElementById('rent_' + i)).value;
      let bill = (<HTMLInputElement>document.getElementById('bill_' + i)).value;
      
      for(let j=0;j<this.turnbooklist1[i]['contacts'].length;j++){
        c.push((<HTMLInputElement>document.getElementById('co_' + i+j)).value)
      }
      for(let j=0;j<this.turnbooklist1[i]['qrs'].length;j++){
        q.push((<HTMLInputElement>document.getElementById('qr_' + i+j)).value)
      }

      temp={
        'date' :(<HTMLInputElement>document.getElementById('datesetter')).value,
        'pac':pac,
        'tno' :tno,
        'pt' :pt,
        'pn' :pn,
        'p1' :p1,
        'hamt' :hamt,
        'p2' :p2==='Default'?'':p2,
        'tptName':tptName,
        'tol' :tol==='Ratnagiri'?'Pipe':tol,
        'weight':weight,
        'c':c,
        'q':q,
        'rent':isNaN(parseInt(rent))?0:parseInt(rent),
        'bill':isNaN(parseInt(bill))?0:parseInt(bill),
        
        'plant':tol==='Ratnagiri'?'Ratnagiri':(tol==='Pipe'?'Urse':'Talegaon'),
        'addons':this.breakBill(this.turnbooklist1[i]['addons']),
        'deductions':this.breakBill(this.turnbooklist1[i]['deductions'])
      }
      array.push(temp);
    }
    let tempObj = { "method": "addnewturn",'array':array,tablename:'' };
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          alert(res.Status);
          this.turnbooklist1=[];
        });
    }

    billAmount(i){
    (<HTMLInputElement>document.getElementById('bill_'+i)).value=String(parseInt((<HTMLInputElement>document.getElementById('rent_'+i)).value)-parseInt((<HTMLInputElement>document.getElementById('adv_'+i)).value) - 3000);
    
  }

  partyOk(){
    
    let tempObj = { "method": "setPartyOk",tablename:'' };
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          alert(res.Status);
        });
  }

  CommOk(){
    
    let tempObj = { "method": "setCommOk",tablename:'' };
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          alert(res.Status);
        });
  }

  
}