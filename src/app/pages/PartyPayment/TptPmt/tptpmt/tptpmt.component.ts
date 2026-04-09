import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-tptpmt',
  templateUrl: './tptpmt.component.html',
  styleUrls: ['./tptpmt.component.css']
})
export class TptpmtComponent implements OnInit {
 public detailedPrint=false;
  data: any;
  show = false;
  tabledata: false;
  public today;
  public todaysDate;
  public bigI;
  public bigJ;
  public apd;
  public apa;
  public pochamount;
  public balRefNo;
  public name: string;
  public dbName = 1;
  public commonArray;
  public date = new Date();
  public dateFromUI;
  public buttonValue: any = 'Party';
  public lrnos = [];
  public typeOfCols='default';
  public trucknoid;
  public dynDate;
  public lrno = 0;
  public dynDate2;
  public dataTruck;
  public partyid = '';
  public considerArray;
  public partyData;
  public transports;
  public nopid;
  public adminAccess = false;
  public tableData = false;
  public monthNames=[];
  public paymentData;
  public displayType;
  public date1;
  public date2;
  public displayOption='0';
  public displayValue='This Month';
  public monthName;
  public balanceFollowMsg='';
  public balanceFollowAmount=0;
  public fromloading;
  public frompayment;
  public toloading;
  public topayment;
  public mailSentDate;
  public partyids=[];
  public truckno5b='';
  public mailSendButton=false;
public balanceFollowGlobal=[];
public balanceFollowArr=[]
public typeOfColsB=false;
public month;
public year;
public paymentData2=[];
public paymentData3=[];
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService) {if(!this.securityCheck.login){
      this.router.navigate([''])
    }
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infotpt')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.partyids=[];
    this.paymentData=this.handledata.givePaymentData();
    this.paymentData.length>0?this.tableData = true:this.tableData = false;
  }


  getInformationData() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray ,'notall':false};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['transport'] = Object.keys(res.transport).length > 0 ? res.transport : this.securityCheck.commonArray['transport'];
        this.fetchBasic();
      });
  }

    refresh(){
    this.considerArray=[0,0,0,0,0,0,1,0]
    this.getInformationData()
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.transports = [];
    this.transports = this.commonArray.transport;
  }

  cancel(data){
    switch (data) {
      case 'load':
        this.fromloading='2021-01-01';
        this.toloading='2021-01-01';
        break;
        case 'payment':
          this.frompayment='2021-01-01';
          this.topayment='2021-01-01';
        break;
    }
  }
  setDate(type){
    switch (type) {
      case 'month':
        this.month=(<HTMLInputElement>document.getElementById('month')).value;
        break;
        case 'year':
        this.year=(<HTMLInputElement>document.getElementById('year')).value;
        break;
        case 'final':
        this.toloading=this.year+'-'+this.month+'-31'
        this.fromloading=this.year+'-'+this.month+'-01'
          break;
    }
  }

  setDateMonth(){    
    this.date1="2021-"+this.handleF.generate2DigitNumber(String(this.handleF.getMonthNumber(this.monthName)))+"-01"
    this.date2="2021-"+this.handleF.generate2DigitNumber(String(this.handleF.getMonthNumber(this.monthName)))+"-31"
  }

  findMany = function () {
    this.paymentData=[];
    let flag = false;
    let tempObj = {};
console.log(this.nopid);

    if ((this.fromloading === undefined)  || (this.toloading === undefined) || (this.nopid === undefined)) { 
      alert('Select a Date and Party'); 
    }
    else {
      tempObj['fromloading'] = this.fromloading;
      tempObj['toloading'] = this.toloading;
      tempObj['method'] = 'transportPaymentPDFForParty';
      tempObj['transportid']=this.nopid;
      this.fromloading=tempObj['fromloading'];
      this.toloading=tempObj['toloading'];

      flag = true;
      
    if (flag) {
      tempObj['tablename'] = 'transportPayment'
      tempObj['transportid']=this.nopid;
      tempObj['lrnos'] = this.lrnos;
      this.balanceFollowGlobal=this.balanceFollowArr;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.paymentData = res.Data;
          if (this.paymentData.length > 0) {
            this.tableData = true;
            this.handledata.savePaymentData(this.paymentData);
          } else {
            alert('No Data Available.');
            this.tableData = false;
          }
        });
    }
  }
  };

  setVar(i,j){
    this.bigI=i;
    this.bigJ=j;
    this.truckno5b=i['truckNo'];
  }

  submitapd(){
      let formbody = {}

      formbody['_id'] = this.bigI._id;;
      formbody['method'] = 'addapd';
      formbody['tablename'] = '';
      formbody['apd']=this.apd;
      formbody['apa']=this.apa;
      formbody['pochAmount']=this.pochamount;
      formbody['balRefNo']=this.balRefNo;

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: Response) => {
          alert(response['Status']);
          this.paymentData[this.bigJ]['actualPaymentDate']=this.apd;
          this.paymentData[this.bigJ]['actualPaymentAmount']=this.apa;
          this.paymentData[this.bigJ]['pochAmount']=this.pochamount;
          this.paymentData[this.bigJ]['balRefNo']=this.balRefNo;
        });
  }

  rentUpdate(i,j){
  let digit = 0
  let gono = false;

      digit=parseInt(prompt('Enter the updating amount'))
    if(digit!==null){
      if(!isNaN(digit)){      
        gono = true
      }
      else{
        alert('Error with number')
      }
      
    }else{
      alert('Error with number')
    }

if(gono){
  let tempObj={}
  tempObj['method']='rentupdate';  //work from here
  tempObj['tablename']='';
  tempObj['_id']=i['_id']
  tempObj['rent']=digit

  this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
      this.paymentData[j]['rent'] = digit;
    });
  }
}

  deleteTemp(id,j){
    if (confirm('Are you sure to temporarily delete?')) {
          this.paymentData.splice(j, 1);
          if (this.paymentData.length > 0) {
            this.tableData = true;
          } else {
            this.tableData = false;
          }
          
          alert('Done!');
    }
  }



  downloadForParty1(data) {//threshhold is 295
    console.log(this.balanceFollowArr);
    console.log(this.paymentData);
    
    this.mailSendButton=true;
    let pager=1;
     let bigValueofY=0;
     var doc = new jsPDF()
     doc.setFontSize('20');
     doc.setFontType('bold');
     doc.setTextColor(234, 1, 0);
     doc.text('NITIN ROADWAYS AND CARGO MOVERS', 30, 8)//partyname
     doc.setFontSize('15');
     doc.setTextColor(215, 6, 9);
     doc.text(this.partyids[0]['name'], 60, 15)//partyname
     doc.setFontSize('10');
     doc.setTextColor(0, 0, 0);
     doc.text('GST No. : '+this.partyids[0]['gst'], 60, 19)//partyname
     doc.setFontSize('10');
     doc.text('Details From Date : ', 165, 15)
     doc.text(this.handleF.getDateddmmyy(this.fromloading)+' to '+this.handleF.getDateddmmyy(this.toloading), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     doc.line(20, 20, 20, 300);//punching area line
     //headers
     doc.setFontSize('10');
     let y = 24;
     let starty = 24;
     doc.line(0, 148.2, 5, 148.2);//punching line helper
     doc.text('Sr', 23, y)//partyname
     doc.text('Date', 38, y)//partyname
     doc.text('Truck No.', 60, y)//partyname
     doc.text('LR No.', 86, y)//partyname
     doc.text('Destination', 106, y)//partyname
     doc.text('Lorry Bill', 135, y)//partyname
      doc.text('Payment', 152, y)//partyname
     if(data=='party'){
      doc.text('Weight / Notes', 180, y)//partyname
      }else if(data=='self'){
       doc.text('Balance', 180, y)//partyname
      }

      doc.line(30, 20, 30, 25);//srno
      doc.line(55, 20, 55, 25);//date
      doc.line(83, 20, 83, 25);//truckno
      doc.line(105, 20, 105, 25);//lrno
      doc.line(134, 20, 134, 25);//credit
      doc.line(151, 20, 151, 25);//debit
      doc.line(171, 20, 171, 25);//balance


     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     let startforI=0;
     starty = 31;
     for(let yy=0;yy<this.balanceFollowArr.length;yy++){
          y = y + 5;
          
          doc.text(this.paymentData[yy].partyName, 30, y)//partyname
          doc.text(String(this.paymentData[yy].amount), 130, y)//partyname
          doc.line(20, 31, 210, 31);
          //  doc.line(151, 25, 151, 31);
          startforI++;
          doc.line(20, 31+(yy*5), 210, 31+(yy*5));
         

      }
      starty = starty+((this.balanceFollowArr.length-1)*5);
      y=y+6
      
 
     for (let i = startforI; i < this.paymentData.length; i++) {
 
      
       if(y>290){
         
         y=30;
        doc.line(30, starty, 30, 291);//srno
        doc.line(55, starty, 55, 291);//date
        doc.line(83, starty, 83, 291);//truckno
        doc.line(105, starty, 105, 291);//lrno
        doc.line(134, starty, 134, 291);//credit
        doc.line(151, starty, 151, 291);//debit
        doc.line(171, starty, 171, 291);//balance

        starty = 20;
         doc.addPage();
         doc.setFontSize('20');
     doc.setFontType('bold');

     doc.setTextColor(234, 1, 0);
     doc.text('NITIN ROADWAYS AND CARGO MOVERS', 30, 8)//partyname
     doc.setFontSize('15');
     doc.setTextColor(215, 6, 9);
     doc.text(this.partyids[0]['name'], 60, 15)//partyname
     doc.setFontSize('10');
     doc.setTextColor(0, 0, 0);
     doc.text('GST No. : '+this.partyids[0]['gst'], 60, 19)//partyname
     doc.setFontSize('10');
     doc.text('Details From Date : ', 165, 15)
     doc.text(this.handleF.getDateddmmyy(this.fromloading)+' to '+this.handleF.getDateddmmyy(this.toloading), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     doc.line(20, 20, 20, 300);//punching area line
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 23, y-6)//partyname
     doc.text('Date', 38, y-6)//partyname
     doc.text('Truck No.', 60, y-6)//partyname
     doc.text('LR No.', 86, y-6)//partyname
     doc.text('Destination', 106, y-6)//partyname
     doc.text('Lorry Bill', 135, y-6)//partyname
      doc.text('Payment', 152, y-6)//partyname
      if(data=='party'){
        doc.text('Weight / Notes', 180, y-6)//partyname
        }else if(data=='self'){
         doc.text('Balance', 180, y-6)//partyname
        }

     
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(30, 20, 30, 25);//srno
     doc.line(55, 20, 55, 25);//date
     doc.line(83, 20, 83, 25);//truckno
     doc.line(105, 20, 105, 25);//lrno
     doc.line(134, 20, 134, 25);//credit
     doc.line(151, 20, 151, 25);//debit
     doc.line(171, 20, 171, 20);//balance
     //vertical lines
     }
     if(this.paymentData[0]['bf'] == true){
      doc.text(String(i), 22, y)//partyname
      }else {
        doc.text(String(i+1), 22, y)//partyname
      }
       
       doc.text(this.handleF.getDateddmmyy(this.paymentData[i].date), 32, y)//partyname
       if (this.paymentData[i].type === 'buy') {
        if(this.paymentData[i].lrshort==='BNG'){
          doc.setTextColor(207,120,18);
          
          doc.text(this.paymentData[i].lrshort+'-'+this.paymentData[i].lrno.split('_')[1], 84, y)//lrno
          doc.setTextColor(0,0,0);
          
        }
        else{
          if(this.paymentData[0].partyType=='NRCM'){
         doc.text(String(this.paymentData[i].lrno), 87, y)//lrno
         }
         else if(this.paymentData[0].partyType!='NRCM'){
          doc.setFontSize('8');
          doc.text(String(this.paymentData[i].lrno), 86, y)//lrno
          doc.setFontSize('10');
         }
        }
         doc.text(this.paymentData[i].truckNo, 57, y)//truckno
         doc.text(this.paymentData[i].placeName, 106, y)//truckno
         if(this.paymentData[i].placeName2!==undefined){
          doc.text(this.paymentData[i].placeName2, 106, y+5)//truckno
         }
       } else {
         doc.text(String('-'), 73, y)//lrno
         doc.text(String('-'), 62, y)//truckno
         doc.text('-', 106, y)//truckno
       }

       if(this.typeOfCols==='default'){
            if (this.paymentData[i].type === 'buy') {
              if(this.paymentData[i]['dominance']){
              doc.text(String(this.paymentData[i].pendingAmt), 135, y)//partyname
              doc.setTextColor(234, 1, 0);
              doc.text(String(this.paymentData[i].pendingReason)+'-'+String(this.paymentData[i]['weight']), 180, y)//partyname
              doc.setTextColor(0,0,0);
              doc.text(String('-'), 152, y)//partyname
              }
              else{
              doc.text(String(this.paymentData[i].amount), 135, y)//partyname
              doc.text(String('-'), 152, y)//partyname
              }
            } else {
              
              doc.text(String(this.paymentData[i].amount), 152, y)//partyname
              doc.text(String(this.paymentData[i].weight), 180, y)//partyname
              doc.text(String('-'), 135, y)//partyname
            }
      }else if(this.typeOfCols==='noamount'){
          doc.text(String('-'), 135, y)//partyname
          doc.text(String('-'), 152, y)//partyname
      }
      else if(this.typeOfCols==='nobalance'){
        if (this.paymentData[i].type === 'buy') {
          if(this.paymentData[i]['dominance']){
              doc.text(String(this.paymentData[i].pendingAmt), 135, y)//partyname
              doc.setTextColor(234, 1, 0);
              doc.text(String(this.paymentData[i].pendingReason)+'-'+String(this.paymentData[i]['weight']), 180, y)//partyname
              doc.setTextColor(0,0,0);
              doc.text(String('-'), 152, y)//partyname
              }
              else{
          doc.text(String(this.paymentData[i].amount), 135, y)//partyname
          doc.text(String('-'), 152, y)//partyname
              }
        } else {
          doc.text(String(this.paymentData[i].amount), 152, y)//partyname
          doc.text(String('-'), 135, y)//partyname
        }
    }
 
      if(this.typeOfCols==='default'){
        if(data=='self'){
          doc.text(String(this.paymentData[i]['value']), 174, y)//partyname
           }
      }else if(this.typeOfCols==='noamount'){
        if(data=='self'){
          doc.text(String('-'), 174, y)//partyname
           }
      }
      else if(this.typeOfCols==='nobalance'){
        if(data=='self'){
          doc.text(String('-'), 174, y)//partyname
           }
      }
      if(this.paymentData[i]['typeOfLoad']==='Fittings'){
      doc.setTextColor(234, 1, 0);
      doc.text(String(this.paymentData[i]['typeOfLoad'])+'-'+String(this.paymentData[i]['weight']), 180, y)//type of load
      doc.setTextColor(0,0,0);
      }else{
        if (this.paymentData[i].type === 'buy') {
          if(!this.paymentData[i]['dominance']){
        doc.setTextColor(234, 1, 0);
      doc.text(String(this.paymentData[i]['weight']), 180, y)//type of load
      doc.setTextColor(0,0,0);
          }
        }
      }
       
      
        if(this.paymentData[i].placeName2===undefined){
          y = y + 5;
          }else{
           y = y + 10;
          }
          doc.line(20, y -4, 210, y -4);//line after header
     bigValueofY=y;
     }

     let [amount,payment,balance]=this.returnAmountPaymentBalance()
     doc.setFontSize('10');
    //  doc.text(String(this.paymentData.length+1), 23, bigValueofY)//partyname
    if(this.typeOfCols==='default'){
      doc.text('Total', 106, bigValueofY)//partyname
      doc.text(String(amount)+' - '+String(payment), 135, bigValueofY)//partyname
      if(data=='self'){
      doc.text(' = '+String(balance), 172, bigValueofY)//partyname
      }
      if(data=='party'){
      //  doc.text('Balance', 172, bigValueofY-5)//partyname
       doc.text(' = '+String(balance), 172, bigValueofY)//partyname
      }
    }else if(this.typeOfCols==='noamount'){
    }
    else if(this.typeOfCols==='nobalance'){
    }
   
  
     doc.line(30, starty, 30, bigValueofY-4);//srno
     doc.line(55, starty, 55, bigValueofY-4);//date
     doc.line(83, starty, 83, bigValueofY-4);//truckno
     doc.line(105, starty, 105, bigValueofY-4);//lrno
     doc.line(134, starty, 134, bigValueofY-4);//credit
     doc.line(151, starty, 151, bigValueofY-4);//debit
     doc.line(171, starty, 171, bigValueofY-4);//balance
     doc.line(20, bigValueofY+1, 210, bigValueofY+1);//line after header

     
         
      y=30;
     starty = 20;
      doc.addPage();
      doc.setFontSize('20');
  doc.setFontType('bold');

  doc.setTextColor(234, 1, 0);
  doc.text('NITIN ROADWAYS AND CARGO MOVERS', 30, 8)//partyname
  doc.setFontSize('15');
  doc.setTextColor(215, 6, 9);
  doc.text(this.partyids[0]['name'], 60, 15)//partyname
  doc.setFontSize('10');
  doc.setTextColor(0, 0, 0);
  doc.text('GST No. : '+this.partyids[0]['gst'], 60, 19)//partyname
  doc.setFontSize('10');
  doc.text('Details From Date : ', 165, 15)
  doc.text(this.handleF.getDateddmmyy(this.fromloading)+' to '+this.handleF.getDateddmmyy(this.toloading), 165, 19)//date
  doc.text(String(pager), 180, 5)//pageno
  pager=pager+1;
  doc.setFontSize('25');
  doc.setLineWidth(0.5);
  doc.line(0, 20, 210, 20);//line after main header
  doc.line(20, 20, 20, 300);//punching area line
  //headers
  doc.setFontSize('20')
  doc.text('Summary of loaded vehicles by Tonnage.',25,30)
  let v=[];
  let Countdata = this.counts(this.paymentData)
  v=Object.values(Countdata)
  let k=Object.keys(Countdata)
  
k[k.findIndex(r=>{return r==='undefined'})]='Payments'

  v.push(v.splice(k.findIndex(r=>{return r==='6'}),1)[0])
  v.push(this.paymentData.length)
  k.splice(k.findIndex(r=>{return r==='6'}),1)[0]
  k.push('Fittings','Total')
  
   if(this.typeOfCols==='default'){
            if (this.paymentData[0].type === 'buy') {}
   }
    doc.autoTable({
      head: [['Tonnage'].concat(k)],
      body: [['Count'].concat(v)],
      style:[],
      theme: 'grid',
      startY: 40,
      margin: {  left: 50 },
      headStyles :{lineWidth: 1,fillColor: [215, 6, 9],textColor: [255,255,255],
      },
      tableWidth: 'wrap'
  })
  
  
  //headers

  
  






     doc.save(this.partyids[0]['name']+'_'+this.handleF.getDateddmmyy(this.fromloading)+'_'+this.handleF.getDateddmmyy(this.toloading)+ '.pdf')
   }

   counts(a){
    let arr={}
    a.forEach(r=>{
        if(r.weight in arr){
            arr[r.weight]=arr[r.weight]+1
        }
        else{
            arr[r.weight]=1
        }
    }); 
    return arr;
}

     addlrno(){
        this.lrnos.push(parseInt(String(this.lrno)));
      }
  delLR(index){
        if (confirm('Are you sure?')) {

          this.lrnos.splice(index,1);
          
      }
    }


   balance(data) {
  return  data.rent - this.getAdvances(data.advanceArray);
  }

  getAdvances(data){
    let sum =0 
    
    data.forEach(r=>{
      if(r.consider){
      sum = r.advanceAmt + sum
      }
    })
    return sum===(NaN||undefined)?0:sum;
  }

     returnAmountPaymentBalance(){
     let amount=0;
     let payment=0;
     this.paymentData.forEach(r=>{
      if(r.type=='buy'){
        if(r.dominance){
          amount=amount+r.pendingAmt;
        }
        else{
      amount=amount+r.amount;
        }
  }
  else if(r.type=='payment'){
      payment=payment+r.amount;
  }
  
  })
     return [amount,payment,amount-payment];
   }

}



