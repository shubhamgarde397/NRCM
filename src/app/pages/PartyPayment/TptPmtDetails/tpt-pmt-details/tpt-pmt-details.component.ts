import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-tpt-pmt-details',
  templateUrl: './tpt-pmt-details.component.html',
  styleUrls: ['./tpt-pmt-details.component.css']
})
export class TptPmtDetailsComponent implements OnInit {
  data: any;
  tabledata= false;
  public nopid;
  public tptid=''
  public today;
  public reference='';
  public amount='';
  public todaysDate;
  public name: string;
  public considerArray = [];
  public commonArray = {
    "gstdetails": [{}],
    "ownerdetails": [{}],
    "villagenames": [{}],
    "lrlist": [{}],
    "hiddenownerdetails": [{}],
    "transport":[{}],
    "dues":[{}],
    "Role": 6
  }
  public transports = [];
  public date = new Date();
public paymentData=[];
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
    this.paymentData=this.handledata.givePaymentData();
    this.paymentData.length>0?this.tabledata = true:this.tabledata = false;
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


  findMany = function () {
    this.paymentData=[];
    let tempObj = {};
    let flag = false;
    if ((this.nopid === undefined)) { 
      alert('Select Transport'); 
    }
    else {
      this.tptid=this.transports.find(r=>{return r.tptName===this.nopid})._id
      tempObj['method'] = 'transportPaymentDetailsB';
      tempObj['transportid']=this.tptid;

      flag = true;
      
    if (flag) {
      tempObj['tablename'] = ''
      tempObj['amount']=this.amount;
      tempObj['date']=this.date;
      tempObj['reference']=this.reference;

      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.paymentData = res.Data;
          if (this.paymentData.length > 0) {
            this.tabledata = true;
          } else {
            alert('No Data Available.');
            this.tabledata = false;
          }
        });
    }
  }
  };


  amountUpdate(i,j){
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
  tempObj['method']='pochAmountupdate';  //work from here
  tempObj['tablename']='';
  tempObj['_id']=i['_id']
  tempObj['pochAmount']=digit

  this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
      this.paymentData[j]['pochAmount'] = digit;
    });
  }
}

  deleteTemp(id,j){
    if (confirm('Are you sure to temporarily delete?')) {
          this.paymentData.splice(j, 1);
          if (this.paymentData.length > 0) {
            this.tabledata = true;
          } else {
            this.tabledata = false;
          }
          
          alert('Done!');
    }
  }



  download() {//threshhold is 295
    let data=this.paymentData;
     let bigValueofY=0;
     var doc = new jsPDF()
     doc.setFontSize('20');
     doc.setFontType('bold');
     doc.setTextColor(234, 1, 0);
     doc.text('NITIN ROADWAYS AND CARGO MOVERS', 30, 8)//partyname
     doc.setFontSize('15');
     doc.setTextColor(215, 6, 9);
     doc.text(this.nopid, 60, 15)//partyname
     doc.setFontSize('10');
     doc.setTextColor(0, 0, 0);
     doc.text('Date : ' + this.handleF.getDateddmmyy(data[0].balanceArray[0].date), 175, 10)//partyname
     doc.text('Amount : '+ data[0].balanceArray[0].amount, 175, 14)//partyname
     doc.text('Reference : '+ data[0].balanceArray[0].reference, 150, 18)//partyname

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
     doc.text('Place', 86, y)//partyname
     doc.text('LRNO', 116, y)//partyname
     doc.text('Balance', 145, y)//partyname
     doc.text('Notes', 170, y)//partyname
     

      doc.line(30, 20, 30, 25);//srno
      doc.line(55, 20, 55, 25);//date
      doc.line(83, 20, 83, 25);//truckno
      doc.line(115, 20, 115, 25);//lrno
      doc.line(144, 20, 144, 25);//credit
      doc.line(169, 20, 169, 25);//credit


     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     let startforI=0;
     starty = 20;

      y=y+6
      
 
     for (let i = startforI; i < data.length; i++) {
 
      
       if(y>290){
         
         y=30;
        doc.line(30, starty, 30, 291);//srno
        doc.line(55, starty, 55, 291);//date
        doc.line(83, starty, 83, 291);//truckno
        doc.line(115, starty, 115, 291);//lrno
        doc.line(144, starty, 144, 291);//credit
        doc.line(169, 20, 169, 25);//credit

        starty = 20;
         doc.addPage();
         doc.setFontSize('20');
     doc.setFontType('bold');

     doc.setTextColor(234, 1, 0);
    doc.text('NITIN ROADWAYS AND CARGO MOVERS', 30, 8)//partyname
     doc.setFontSize('15');
     doc.setTextColor(215, 6, 9);
     doc.text(this.nopid, 60, 15)//partyname
     doc.setFontSize('10');
     doc.setTextColor(0, 0, 0);
     doc.text('Date : ' + this.handleF.getDateddmmyy(data[0].balanceArray[0].date), 175, 10)//partyname
     doc.text('Amount : '+ data[0].balanceArray[0].amount, 175, 14)//partyname
     doc.text('Reference : '+ data[0].balanceArray[0].reference, 150, 18)//partyname
     doc.line(0, 20, 210, 20);//line after main header
     doc.line(20, 20, 20, 300);//punching area line
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 23, y-6)//partyname
     doc.text('Date', 38, y-6)//partyname
     doc.text('Truck No.', 60, y-6)//partyname
     doc.text('Place', 86, y-6)//partyname
     doc.text('LRNO', 116, y-6)//partyname
     doc.text('Balance', 145, y-6)//partyname
     doc.text('Notes', 170, y-6)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(30, 20, 30, 25);//srno
     doc.line(55, 20, 55, 25);//date
     doc.line(83, 20, 83, 25);//truckno
     doc.line(115, 20, 115, 25);//lrno
     doc.line(144, 20, 144, 25);//credit
     doc.line(169, 20, 169, 25);//credit
     //vertical lines
     }
        
     
     doc.text(String(i+1), 22, y)//partyname
      
       
       doc.text(this.handleF.getDateddmmyy(data[i].loadingDate), 32, y)//partyname
      
         doc.text(data[i].truckName, 57, y)//truckno
         doc.text(data[i].placeName, 86, y)//truckno
       doc.text(String(data[i].lrno), 116, y)
        doc.text(String(data[i].pochAmount), 145, y)
        
     
          y = y + 5;
          doc.line(20, y -4, 210, y -4);//line after row
     bigValueofY=y;
     }


   
  
     doc.line(30, starty, 30, bigValueofY-4);//srno
     doc.line(55, starty, 55, bigValueofY-4);//date
     doc.line(83, starty, 83, bigValueofY-4);//truckno
     doc.line(115, starty, 115, bigValueofY-4);//lrno
     doc.line(144, starty, 144, bigValueofY-4);//credit
     doc.line(169, starty, 169, bigValueofY-4);//credit

     doc.line(20, bigValueofY+1, 210, bigValueofY+1);//line after header

     
         
      y=30;
     starty = 20;
     

 doc.text('Total', 116, bigValueofY)//truckno
       
        doc.text(String(data[0]['balanceArray'][0]['amount']), 145, bigValueofY)

     doc.save(this.nopid + '_' + data[0]['balanceArray'][0]['amount'] + '.pdf')
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



