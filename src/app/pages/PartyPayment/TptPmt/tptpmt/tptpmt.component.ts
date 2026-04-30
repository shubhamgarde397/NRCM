import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
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
  public reference;
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
  public adv=false;
  public bal=false;
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
public balanceFollowArr=[]
public typeOfColsB=false;
public month;
public year;
public paymentData2=[];
public paymentData3=[];
  constructor(public apiCallservice: ApiCallsService, public router: Router,
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

  submitapd(){
      let formbody = {}

      formbody['_id'] = this.bigI._id;;
      formbody['method'] = 'addapd';
      formbody['tablename'] = '';
      formbody['apd']=this.apd;
      formbody['apa']=this.apa;
      formbody['pochAmount']=this.pochamount;
      formbody['reference']=this.reference;

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: Response) => {
          alert(response['Status']);
          this.paymentData[this.bigJ]['actualPaymentDate']=this.apd;
          this.paymentData[this.bigJ]['actualPaymentAmount']=this.apa;
          this.paymentData[this.bigJ]['pochAmount']=this.pochamount;
          this.paymentData[this.bigJ]['reference']=this.reference;
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


  downloadForParty1() {//threshhold is 295
  
    
    let tptName = this.transports.filter(r=>r._id==this.nopid)[0]['tptName']
    let adv=this.adv;
    let bal=this.bal;
     let pmtNameArray='';
    let pmtDate='';
    let pmtAmt='';
    let pmtNameArray2='';
        let pmtDate2='';
        let pmtAmt2='';
    if (adv){
    pmtNameArray='advanceArray';
    pmtDate='Adv Dt';
    pmtAmt='Ad Amt';
        if (bal){
         pmtNameArray2='balanceArray';
         pmtDate2='Bal Dt';
         pmtAmt2='Bl Amt';
        }
    }else if (bal){
       pmtNameArray='balanceArray';
     pmtDate='Bal Dt';
     pmtAmt='Bl Amt';
    }

    let pager=1;
     let bigValueofY=0;
    var doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts:true
       }) 
     doc.setFontSize('20');
     doc.setFontType('bold');
     doc.setTextColor(234, 1, 0);
     doc.text('NITIN ROADWAYS AND CARGO MOVERS', 30, 8)//partyname
     doc.setFontSize('15');
     doc.setTextColor(215, 6, 9);
     doc.text(tptName, 60, 15)//partyname
     doc.setFontSize('10');
     doc.setTextColor(0, 0, 0);
     doc.setFontSize('10');
     doc.text('Details From Date : ', 165, 15)
     doc.text(this.handleF.getDateddmmyy(this.fromloading)+' to '+this.handleF.getDateddmmyy(this.toloading), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 273, 20);//line after main header
     doc.line(20, 20, 20, 300);//punching area line
     //headers
     doc.setFontSize('10');
     let y = 24;
     let starty = 24;
     doc.line(0, 148.2, 5, 148.2);//punching line helper
     doc.text('Sr', 23, y)//partyname
     doc.text('Date', 38, y)//partyname
     doc.text('Truck No.', 55, y)//partyname
     doc.text('Place', 81, y)//partyname
     doc.text('Rent', 106, y)//partyname

    doc.text(pmtDate, 118, y)//partyname
    doc.text(pmtAmt, 138, y)//partyname
    doc.text('Reference', 152, y)//partynam
    if(!adv && !bal){
        doc.text('Notes', 182, y)//partynam
    }   
    if(adv && bal){
        doc.text(pmtDate2, 181, y)//partyname
    doc.text(pmtAmt2, 202, y)//partyname
    doc.text('Reference', 215, y)//partynam
      doc.text('Notes', 245, y)//partynam
    }
    


      doc.line(30, 20, 30, 25);//srno
      doc.line(50, 20, 50, 25);//date
      doc.line(77, 20, 77, 25);//truckno
      doc.line(105, 20, 105, 25);//lrno
      doc.line(117, 20, 117, 25);//credit
      doc.line(137, 20, 137, 25);//debit
      doc.line(151, 20, 151, 25);//balance
      doc.line(180, 20, 180, 25);//balance
      if(adv && bal){
      doc.line(200, 20, 200, 25);//debit
      doc.line(214, 20, 214, 25);//balance
      doc.line(243, 20, 243, 25);//balance
      }
      doc.line(273, 20, 273, 25);//balance

     //headers
     doc.line(0, 25, 273, 25);//line after header
 
     let startforI=0;
     starty = 25 ;
      y=y+6
      
 
     for (let i = startforI; i < this.paymentData.length; i++) {
 
      
       if(y>205){
         
         y=24;
        doc.line(30, starty, 30, 291);//srno
        doc.line(50, starty, 50, 291);//date
        doc.line(77, starty, 77, 291);//truckno
        doc.line(105, starty, 105, 291);//lrno
        doc.line(117, starty, 117, 291);//credit
        doc.line(137, starty, 137, 291);//debit
        doc.line(151, starty, 151, 291);//balance
        doc.line(180, starty, 180, 291);//balance
        if(adv && bal){
        doc.line(200, starty, 200, 291);//debit
      doc.line(214, starty, 214, 291);//balance
      doc.line(243, starty, 243, 291);//balance
        }
      doc.line(273, starty, 273, 291);//balance

        starty = 25;
         doc.addPage();
         doc.setFontSize('20');
     doc.setFontType('bold');

     doc.setTextColor(234, 1, 0);
     doc.text('NITIN ROADWAYS AND CARGO MOVERS', 30, 8)//partyname
     doc.setFontSize('15');
     doc.setTextColor(215, 6, 9);
     doc.text(tptName, 60, 15)//partyname
     doc.setFontSize('10');
     doc.setTextColor(0, 0, 0);
     doc.setFontSize('10');
     doc.text('Details From Date : ', 165, 15)
     doc.text(this.handleF.getDateddmmyy(this.fromloading)+' to '+this.handleF.getDateddmmyy(this.toloading), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 273, 20);//line after main header
     doc.line(20, 20, 20, 300);//punching area line
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 23, y)//partyname
     doc.text('Date', 38, y)//partyname
     doc.text('Truck No.', 55, y)//partyname
     doc.text('Place', 81, y)//partyname
     doc.text('Rent', 106, y)//partyname

     doc.text(pmtDate, 118, y)//partyname
    doc.text(pmtAmt, 138, y)//partyname
    doc.text('Reference', 152, y)//partynam
    if(!adv && !bal){
        doc.text('Notes', 182, y)//partynam
    }   
    if(adv && bal){
        doc.text(pmtDate2, 181, y)//partyname
    doc.text(pmtAmt2, 202, y)//partyname
    doc.text('Reference', 215, y)//partynam
      doc.text('Notes', 245, y)//partynam
    }
     
     //headers
     doc.line(0, 25, 273, 25);//line after header
 
     //vertical lines
     doc.line(30, 20, 30, 25);//srno
     doc.line(50, 20, 50, 25);//date
     doc.line(77, 20, 77, 25);//truckno
     doc.line(105, 20, 105, 25);//lrno
     doc.line(117, 20, 117, 25);//credit
     doc.line(137, 20, 137, 25);//debit
     doc.line(151, 20, 151, 25);//balance
     doc.line(180, 20, 180, 25);//balance
    if(adv && bal){
     doc.line(200, 20, 200, 25);//debit
      doc.line(214, 20, 214, 25);//balance
      doc.line(243, 20, 243, 25);//balance
    }
      doc.line(273, 20, 273, 25);//balance

      starty = 25 ;
      y=y+6

     //vertical lines
     }
        doc.text(String(i+1), 22, y)//partyname
      
       
       doc.text(this.handleF.getDateddmmyy(this.paymentData[i].loadingDate), 31, y)//partyname
     
         doc.text(this.paymentData[i].truckNo, 51, y)//truckno
         doc.text(String(this.paymentData[i].place), 78, y)//lrno
         doc.text(String(this.paymentData[i].rent), 106, y)//truckno

         doc.text(this.paymentData[i][pmtNameArray][0]['date'], 118, y)//truckno
         doc.text(String(this.paymentData[i][pmtNameArray][0]['amount']), 139, y)//truckno
         doc.setFontSize('8');
         doc.text(this.paymentData[i][pmtNameArray][0]['reference'], 152, y)//truckno
         doc.setTextColor(0, 0, 0);
         doc.setFontSize('10');

          if(adv && bal){
            
            doc.text(this.paymentData[i][pmtNameArray2][0]['date'], 181, y)//truckno
            doc.text(String(this.paymentData[i][pmtNameArray2][0]['amount']), 202, y)//truckno
            doc.setFontSize('8');
            doc.text(this.paymentData[i][pmtNameArray2][0]['reference'], 215, y)//truckno
            doc.setTextColor(0, 0, 0);
            doc.setFontSize('10');
          }
     
      
       
      
          y = y + 5;
          
          doc.line(20, y -4, 273, y -4);//line after header
     bigValueofY=y;
     }
   
  
     doc.line(30, starty, 30, bigValueofY-4);//srno
     doc.line(50, starty, 50  , bigValueofY-4);//date
     doc.line(77, starty, 77, bigValueofY-4);//truckno
     doc.line(105, starty, 105, bigValueofY-4);//lrno
     doc.line(117, starty, 117, bigValueofY-4);//credit
     doc.line(137, starty, 137, bigValueofY-4);//debit
     doc.line(151, starty, 151, bigValueofY-4);//balance
     doc.line(180, starty, 180, bigValueofY-4);//balance
    if(adv && bal){
    doc.line(200, starty, 200, bigValueofY-4);//debit
      doc.line(214, starty, 214, bigValueofY-4);//balance
      doc.line(243, starty, 243, bigValueofY-4);//balance
    }
      doc.line(273, starty, 273, bigValueofY-4);//balance

     doc.save(tptName+'.pdf')
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



