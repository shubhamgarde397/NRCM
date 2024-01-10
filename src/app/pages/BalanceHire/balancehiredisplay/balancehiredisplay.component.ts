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

@Component({
  selector: 'app-balancehiredisplay',
  templateUrl: './balancehiredisplay.component.html',
  styleUrls: ['./balancehiredisplay.component.css']
})
export class BalancehiredisplayComponent implements OnInit {
  public show = false;
  public found;
  public date = new Date();
  public balanceDate = [];
  public selectedDate;
  public role = 6;
  public admin = false;
  public printed: Boolean = true;
  public years = [];
  public createdDate = '';
  public displayoptions = [
    { 'value': '1', 'viewvalue': 'Balance Hire' },
    { 'value': '2', 'viewvalue': 'Update Actual Payments' }
  ]
  public months = [
    { '1': 'Jan' },
    { '2': 'Feb' },
    { '3': 'Mar' },
    { '4': 'Apr' },
    { '5': 'May' },
    { '6': 'Jun' },
    { '7': 'Jul' },
    { '8': 'Aug' },
    { '9': 'Sep' },
    { '10': 'Oct' },
    { '11': 'Nov' },
    { '12': 'Dec' },
  ]
  public actualMonths = [];
  public yeardiv = true;
  public monthdiv = false;
  public daydiv = false;
  public printInfo = false;
  public buttonValue: any = 'Balance Hire';
  public buttonOption = '0';
  public displayType;
  public data;
  public dayData;
  public givenTrucks;
  public givenTrucksPayment;
  public givenPaymentTable=false;
  public givenDate;
  public GPPMsg='Loading... Please Wait!'

  public selectedPochDate;
  public actualPayment=false;
  public actualPaymentTable=false;
  public fullpendingPayment=[];
  public paymentSettings=false;
  public saveArray=[
  ]
  public selectedPaymentDate='';
  public selectedPaymentAmount=0;
  public statusOfPoch='';
  public showpaymentButton=false;
  public defaultAmt=0;
  public ownerdetailslist;
  public showPDFButton=false;
  public fullPaymentDone=[];
  public updateMsgType='';

  public advAmt=0;
  public advDate='';
  public alltrucks=[];
  public contact='';
  public advancePayment=false;

  public advancePaymenttoTruck=false;
  public fullAdvDone=[];
  public updateMsgTypeA='';

  public fetchLoadedTruckTF=false;
  public currentLoadedParty=[];

  public pasteAndSend=false;
  public pasteAndSendV='';

  public commonArray;
  public considerArray;
  public gstdetailslist
  public fetchPartyTF=false;
  public partyName;
  public qr;
  public typeOfLoad;
  public dest1;
  public dest2;
public partyDetails;
public contactP;
public sentComments=[];
public bigI;
public duesButton=true;
public Dues=[];
public DuesT=[];
public dueChangeValue;
public addDueDetailsTF=false;
public dueInfo;
public dueInfoPending;
public nrcmid=0;
public adminA=false;
public dueMAmt;
public dueMDate;

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public excelService: ExcelService,
    public securityCheck: SecurityCheckService, public handleF: handleFunction) {
     
  }

  ngOnInit() {
    this.nrcmid=this.securityCheck.nrcmid;
    this.adminA=this.nrcmid===1?true:false;
    this.printInfo = false;
    this.balanceDate = this.securityCheck.commonBalanceHire.length > 0 ? this.securityCheck.commonBalanceHire : [];
    for (let i = 0; i < new Date().getFullYear() - 2020; i++) {
      this.years.push(i + 2021)
    }
    this.givenDate=this.handleF.createDate(new Date());
  }

  pay(){
    let formbody={}
    let temp=[];
    for(let i=0;i<this.balanceDate.length;i++){
      for(let j=0;j<this.balanceDate[i]['truckData'].length;j++){
        if((<HTMLInputElement>document.getElementById('m_'+i+'_'+j)).checked){
          temp.push(this.balanceDate[i]['truckData'][j]['tbid'])
        }
      }
    }

formbody['method']='updatewhichtopay';
formbody['tablename']=''
formbody['ids']=temp;
    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, formbody, true)
    .subscribe((res: any) => {
      alert(res.Status);
    });
  }

  adminAccess() {
    this.admin = !this.admin;
  }

  find = function () {
    this.duesButton=true;
    let tempObj = {};
    if (this.selectedDate === undefined) {
      this.selectedDate = this.handleF.getDate(this.date.getDate(), (this.date.getMonth() + 1), this.date.getFullYear());
      tempObj['createdDate'] = this.selectedDate;
    } else {
      tempObj['createdDate'] = this.selectedDate;
    }
    tempObj['method'] = 'BalanceHireDisplay';
    tempObj['tablename'] = 'BalanceHire';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj, true)
      .subscribe((res:any) => {
        this.showPDFButton=true;
        this.printInfo = true;
        this.balanceDate = [];
        this.balanceDate = this.accE(res.balanceData);
        this.Dues=res.Dues;
        this.DuesT=res.DuesT;
        this.findDues(res);
        this.securityCheck.commonBalanceHire = res.balanceData;
        this.printed = res.balanceData.length > 0 ? res.balanceData[0].print : true;
      });
  };

  findDues(data){
    let boids=[]
    let doids=[]
    data.balanceData.forEach(r=>{r['truckData'].forEach(y=>{boids.push(y['ownerid'])})})


    data.Dues.forEach(r=>{doids.push(r['ownerid'])})
    doids.every(r=>{
      boids.every(y=>{
          if(r===y){
            this.duesButton=false;
              return false;
          }
          return true;//means continue the loop
      })
      return true;//means continue the loop
    })
// if data is true it means no dues, if data is false it means dues are there
  }

  getDues(){
    this.balanceDate.forEach(r=>{
      r.truckData.forEach(s=>{
          
          s['dues']=this.Dues.filter(t=>{
              return t.truckno===s.truckno 
          })
          
      })
      
  })
  }

  dueChange(){
let a=this.dueChangeValue.split('_')
this.addDueDetailsTF=true;
this.dueInfo=this.balanceDate[a[0]]['truckData'][a[1]]['dues'][a[2]]
this.dueInfoPending=this.balanceDate[a[0]]['truckData'][a[1]]['dues'][a[2]]['pending']
  }
  storeDue(){
    if(this.dueMAmt>this.dueInfoPending){
      alert('Due amount cant be greater than pending amount.')
    }
    else if(this.dueMAmt===0){alert('Due amount cant be 0.')}
    else if(this.dueMAmt<=this.dueInfoPending){
    let a=this.dueChangeValue.split('_')
let bhid=this.balanceDate[a[0]]['_id']
let tbid=this.balanceDate[a[0]]['truckData'][a[1]]['tbid']
let oid=this.balanceDate[a[0]]['truckData'][a[1]]['ownerid']
let duesid=this.balanceDate[a[0]]['truckData'][a[1]]['dues'][a[2]]['_id']
let duesdate=this.balanceDate[a[0]]['truckData'][a[1]]['dues'][a[2]]['date']

    let tempObj={
      'bhid':bhid,
      'tbid':tbid,
      'oid':oid,
      'duesid':duesid,
      'dueDate':this.dueMDate,
      'dueAmt':this.dueMAmt,
      'totalDue':this.balanceDate[a[0]]['truckData'][a[1]]['dues'][a[2]]['amt'],
      'duesDate':duesdate,
      'type':'due',
      'msg':'Loan',
      'tsrno':String(parseInt(a[1])+1),
      'tablename':'',
      'method':'DuesUpdateFromBH'
    }

    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
    });
  }
  }

  
  accE(data){
    data.forEach(r=>{r['available']=r['acc'+String(r.parentAccNo)]?'':'X'})
      return data
    }
  find2(data, type, set = true) {
    if (set) {
      switch (type) {
        case 'year':
          this.createdDate = this.createdDate + data;
          this.yeardiv = false;
          this.monthdiv = true;
          break;
        case 'month':

          this.createdDate = this.createdDate + '-' + this.handleF.generate2DigitNumber(String(data['number']));
          this.monthdiv = false;
          this.daydiv = true;
          break;
        case 'day':
          this.createdDate = this.createdDate + '-' + data['_id'].slice(8);
          this.daydiv = false;
          this.printInfo = true;
          break;
      }
    }
    this.actualMonths = [];
    let tempObj = {};
    tempObj['method'] = 'BalanceHireDisplay';
    tempObj['tablename'] = 'BalanceHire';
    tempObj['createdDate'] = type === 'year' ? '^' + data + '.*' : type === 'month' ? this.createdDate : type === 'day' ? this.createdDate : null;
    tempObj['type'] = type;
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        if (type === 'year') {
          res.balanceData.forEach((res) => {
            let temp = {}
            temp['name'] = res['name'];
            temp['number'] = res['_id'];
            temp['count'] = res['data']
            temp['print'] = res['print']
            this.actualMonths.push(temp)
          });
        }
        else if (type === 'month') {
          this.dayData = res.balanceData;
        }
        else {
          this.balanceDate = res.balanceData;
        }
        this.printed = res.balanceData.length > 0 ? res.balanceData[0].print : true;
        this.selectedDate=this.createdDate;
      })
  }

  deleteBH(data) {
    if (confirm('Are you sure?')) {
      data['comments'] = data['comments'] === 'cancel' ? '' : 'cancel';
      data['method'] = 'update';
      data['tablename'] = 'BalanceHire';
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, data, true)
        .subscribe((res: any) => {
          this.balanceDate.find(r => r._id == data._id)['comments'] = data['comments'];
        });
    }
  }

  tempDelete(data){
if(confirm('Do you want to temporary delete it?')){
  this.balanceDate.splice(data,1);
}
  }
  printUpdate() {
    let data = {};
    if (confirm('Document printed?')) {
      data['method'] = 'update';
      data['tablename'] = 'BalanceHire';
      data['todayDateToPrint'] = this.selectedDate;
      data['print'] = true;
      data['part'] = 0;
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, data, true)
        .subscribe((res: any) => {
          alert(res.Status);
          this.printed = !this.printed;
        });
    } else { }
  }

   sendMsg(no,type,data){
    let bal=data.advanceArray.find(r=>{return r.reason==='Balance'})
  let msg=''
  msg=msg+'*****%20%20*Balance%20Payment%20Details*%20%20*****%0A%0A'
  msg=msg+'*TruckNo*%20:%20'+data.truckno.replace(/\s/g, "%20")+'%0A'
  msg=msg+'*Loading*%20Date%20:%20'+this.handleF.getDateddmmyy(data.loadingDate)+'%0A'
  msg=msg+'*Load*%20:%20'+data.typeOfLoad+'%0A'
  msg=msg+'*Destination*%20:%20'+data.vsname+'%20'+(data.vsname2?data.vsname2:'')+'%0A'
  msg=msg+'*Status%20of%20Delivery*%20:%20'+data.statusOfPoch+'%0A'
  msg=msg+'*Balance%20Amount*%20:%20'+(bal?bal.advanceAmt:'')+'%0A%0A'
  msg=msg+'*%20*Payment%20Details*%20*%0A%0A'
  msg=msg+'*Payment%20Amount*%20:%20'+data.actualPaymentAmount+'%0A'
  msg=msg+'*Payment%20Date*%20:%20'+this.handleF.getDateddmmyy(data.actualPaymentDate)+'%0A%0A%0A'
  msg=msg+'*%20*Account%20Details*%20*%0A%0A'
  msg=msg+'*Accname*%20:%20'+(bal?bal.BHAccname.replace(/\s/g, "%20"):'')+'%0A'
  msg=msg+'*AccNo*%20:%20'+(bal?bal.BHAccNo:'')+'%0A'
  msg=msg+'*IFSC*%20:%20'+(bal?bal.BHIFSC:'')+'%0A%0A'
  msg=msg+'*Nitin%20Roadways%20and%20Cargo%20Movers*%0A'
  msg=msg+'*Pune*%0A'
  msg=msg+'9822288257%0A'
  msg=msg+'9766707061%0A'
    switch (type) {
      case 'wa':
          window.open('https://wa.me/+91'+no+'/?text='+msg,'_blank');  
        break;
        case 'txt':
          window.open('sms:+91'+no+'?body='+msg,'_blank');    
        break;
    }
  }

  fetchparty(){
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogst')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.gstdetailslist = this.commonArray.gstdetails;
    this.fetchPartyTF=true;
    this.fetchLoadedTruckTF=false;
    this.pasteAndSend=false;
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.gstdetailslist = [];
    this.gstdetailslist = this.commonArray.gstdetails;
  }

  setPartyName() {
    this.partyDetails=this.gstdetailslist[this.partyName.split('+')[1]]
    this.contactP=this.partyDetails.contact[0];
  }

  sendMsgA(no,type,data){
    let r=data.rc?'':'RC'
    let l=data.lc?'':'License'
    let p=data.pan?'':'PAN'
    let shall=(data.rc&&data.lc&&data.pan);
    let doc=(data.rc?'':'%20RC')+(data.lc?'':'%20License')+(data.pan?'':'%20PAN')
    let bal=data.advanceArray.find(r=>{return r.reason==='Advance'})
    let msg=''
    msg=msg+'*NITIN%20ROADWAYS%20AND%20CARGO%20MOVERS*%0A%0A'
    msg=msg+'*****%20%20*Advance%20Payment%20Details*%20%20*****%0A%0A'
    msg=msg+'*TruckNo*%20:%20'+data.truckno.replace(/\s/g, "%20")+'%0A%0A'
    msg=msg+'*%20*Advance%20Details*%20*%0A%0A'
    msg=msg+'*Advance%20Amount*%20:%20'+bal.advanceAmt+'%0A'
    msg=msg+'*Advance%20Date*%20:%20'+this.handleF.getDateddmmyy(bal.advanceDate)+'%0A%0A'
    msg=msg+'*%20*Account%20Details*%20*%0A%0A'
    msg=msg+'*Accname*%20:%20'+data.accountDetails[0].accountName.replace(/\s/g, "%20")+'%0A'
    msg=msg+'*AccNo*%20:%20'+data.accountDetails[0].accountNumber+'%0A'
    msg=msg+'*IFSC*%20:%20'+data.accountDetails[0].ifsc+'%0A%0A'
    if(!shall){
    msg=msg+'Unga%20Vandika%0A*'+doc+'*%0ASend%20Pananga%0A%0A';
    }
    msg=msg+'*Nitin%20Roadways%20and%20Cargo%20Movers*%0A'
    msg=msg+'*Pune*%0A'
    msg=msg+'9822288257%0A'
    msg=msg+'9766707061%0A'
      switch (type) {
        case 'wa':
            window.open('https://wa.me/+91'+no+'/?text='+msg,'_blank');  
          break;
          case 'txt':
            window.open('sms:+91'+no+'?body='+msg,'_blank');    
          break;
      }
    }


  

  deleteBHComplete(data, j) {
    let ids=[]
    for(let i=0;i<data.truckData.length;i++){
      ids.push(data.truckData[i]['tbid'])
    }
    
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_ids'] = ids;
      formbody['method'] = 'deleteBHNew';
      formbody['tablename'] = 'BalanceHire';
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, formbody, true)
        .subscribe((res: any) => {
          alert(res.Status);
          this.balanceDate.splice(j, 1);
        });
    }
  }

  showDatabyidEditForm(data, j) {
    this.show = true;
    this.found = data;
    data['index'] = j;
    data['editOption'] = 1;
    data['truckData'].map(r=>{r.field=true;})
    data['commentToTruck']=data['commentToTruck']

    
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/BALANCE_HIRE_HANDLER/UpdateSingle']);
  }

  getValueofI(a) {
    let I = 16;
    let l;
    for (let i = 0; i < a.length; i) {


      let x = parseInt(a[i]);

      let l = parseInt(a[i + 1]);

      let X = parseInt(a.slice(i + 2, i + 2 + l));

      I = I + ((6 * X) * (x + 2))

      i = i + l + 2
    }


    return I;
  }

   download(dataTF) {//threshhold is 295

    let i;
    if (confirm('Fresh Page?')) {
      i = 16;
    } else {
      let z = '';
      let str = "";
      while (z != null) {
        z = prompt('Enter Truck Numbers');
        if (z.length > 1) {
          alert('Cannot have more than 9 trucks, Please enter lesser value or print on new page.')
        } else {
          if (z == null || z == "") {
            break;
          }
          str = str + z + "11";
        }
      }



      i = this.getValueofI(str) + 16;
    }
    if (i > 280) {
      i = 16;
    }


    let pageno = 1;
    let dateFormat = this.selectedDate.slice(8, 10) + '-' + this.selectedDate.slice(5, 7) + '-' + this.selectedDate.slice(0, 4);
    let totalAmount=0;
    var doc = new jsPDF();
    doc.line(0, 148.2, 5, 148.2);//punching line helper
    //Static Part Start
    //Date
    doc.setFontSize('10');
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text(dateFormat, 90, i + 5 - 16)
    doc.text(String(pageno), 190, i + 5 - 16)
    pageno = pageno + 1;
    let pageStopper = i+5-16;
    //Date
    //line after date
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(0, i + 6 - 16, 210, i + 6 - 16);
    //line after date
    //5 vertical lines for amount, comments, pageno,date,trucno, account details(account details is further divided into 3 parts per data need a loop here)
    //vertical line after date
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(37, i + 6 - 16, 37, i + 12 - 16);
    doc.line(61, i + 6 - 16, 61, i + 12 - 16);
    // doc.line(72, i + 6 - 16, 72, i + 12 - 16);
    doc.line(83, i + 6 - 16, 83, i + 12 - 16);
    doc.line(146, i + 6 - 16, 146, i + 12 - 16);


    //vertical line after date till headers
    //Headers
    doc.setFontSize('10');
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Amount', 16, i + 10 - 16)
    doc.text('Comments', 38, i + 10 - 16)
    // doc.text('Pg', 63, i + 10 - 16)
    doc.text('Date', 63, i + 10 - 16)
    doc.text('TruckNo', 83, i + 10 - 16)
    if(!dataTF){
    doc.text('Payment Details', 111.5, i + 10 - 16)
    }

    doc.text('Account Details', 146.5, i + 10 - 16)
    //Headers End
    //Line after headers
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(0, i + 12 - 16, 210, i + 12 - 16);
    //Line after headers
    //Static Part End
    //Dynamic Part Start
    doc.setFontSize('10');
    doc.setFontType('normal');
    doc.setTextColor(0, 0, 0);
    // doc.text('Shubham is awesome', 1, i);
    for (let z = 0; z < this.balanceDate.length; z++) {
      totalAmount=0;
      let data = this.balanceDate[z].truckData;


      if (((data.length * 6) + 15 + i) > 295) {
        doc.text('->', 192, pageStopper)
        doc.addPage();
        doc.line(0, 148.2, 5, 148.2);//punching line helper
        //Static Part Start
        //Date
        doc.setFontSize('10');
        doc.setFontType('bold');
        doc.setTextColor(0, 0, 0);
        doc.text(dateFormat, 90, 5)
        doc.text(String(pageno), 190, 5)
        pageStopper = 5;
        pageno = pageno + 1;
        //Date
        //line after date
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(0, 6, 210, 6);
        //line after date
        //5 vertical lines for amount, comments, pageno,date,trucno, account details(account details is further divided into 3 parts per data need a loop here)
        //vertical line after date
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(37, 6, 37, 12);

        doc.line(61, 6, 61, 12);
        // doc.line(72, 6, 72, 12);

        doc.line(83, 6, 83, 12);
        doc.line(146, 6, 146, 12);
        //vertical line after date
        //Headers
        doc.setFontSize('10');
        doc.setFontType('bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Amount', 16, 10)
        doc.text('Comments', 38, 10)
        // doc.text('Pg', 63, 10)
        doc.text('Date', 63, 10)
        doc.text('TruckNo', 83, 10)

        if(!dataTF){
          doc.text('Payment Details', 111.5, 10)
          }

        doc.text('Account Details', 146.5, 10)
        //Headers End
        //Line after headers
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(0, 12, 210, 12);
        //Line after headers
        //Static Part End
        //Dynamic Part Start
        doc.setFontSize('10');
        doc.setFontType('normal');
        doc.setTextColor(0, 0, 0);
        i = 16;
      }



      let K = 0
      let accountI=i;
      doc.setFontSize('10');
      if(dataTF){
        doc.text(String(parseInt(this.balanceDate[z].parentAccNo)).split(' ')[0], 38.5, i);//comments
      }
      for (let k = 0; k < data.length; k++) {
        doc.setFontSize('10');
        if(this.balanceDate[z].truckData[k].pay){
        doc.text("Pay", 2, i);//amount
        }
        // Forward Date
        if(this.selectedDate==this.balanceDate[z]['todayDate']){
          if(this.balanceDate[z].truckData[k].forwardDate==''){}else{
            doc.text('fD:'+this.handleF.getDateddmmyy(this.balanceDate[z].truckData[k].forwardDate), 191, i+12);
            }
        }
        else{
          if(this.balanceDate[z].truckData[k].forwardDate==this.selectedDate){
            doc.text('pD:'+this.handleF.getDateddmmyy(this.balanceDate[z]['todayDate']), 191, i+12);
          }
        }
        
        // Forward Date
        doc.text(String(this.balanceDate[z].truckData[k].total), 16, i);//amount

        doc.setFontSize('10');
        doc.text(this.balanceDate[z].truckData[k].date.slice(8, 10) + '/' + this.balanceDate[z].truckData[k].date.slice(5, 7) + '/' + this.balanceDate[z].truckData[k].date.slice(0, 4), 63, i);//date
        doc.setFontSize('10');
        doc.text(this.balanceDate[z].truckData[k].truckno.split(' ').join(''), 83.5, i);//truckno
          doc.text(this.balanceDate[z].truckData[k].remark, 50, i);//truckno
        
        doc.setFontSize('8');
        if(dataTF){
        doc.text(this.balanceDate[z].truckData[k].shortDetails?this.balanceDate[z].truckData[k].shortDetails:'', 108, i);//truckno
        doc.text(this.balanceDate[z].truckData[k].Prd, 142, i);//truckno
        }        

        doc.setFontSize('10');
        K = k;
        i = i + 6;
        totalAmount=totalAmount+this.balanceDate[z].truckData[k].total;
      }
      if(data.length>1){
      doc.line(5, i-4, 32, i-4);
      doc.text(String(totalAmount),16,i)
      }
      let bigKK=0
      // let data = this.balanceDate[z].truckData;
      for (let kk = 0; kk < this.balanceDate[z].dueToTake.length; kk++) {
        if(this.balanceDate[z].dueToTake[kk]){
          doc.setFontSize('8');
          doc.setLineDash([0.5, 1], 10);
          doc.line(37, i-4, 146, i-4);
          
          

            doc.text('*'+String(this.balanceDate[z].due[kk]['reason'])+'  *Total Due -'+String(this.balanceDate[z].due[kk]['totalDue']), 38.5, i+1+bigKK);//comments
            doc.text('* Due : '+String(this.balanceDate[z].due[kk]['thiscut'])+'   *Due Date* : '+String(this.balanceDate[z].due[kk]['dueTaken'].slice(8, 10) + '/' + this.balanceDate[z].due[kk]['dueTaken'].slice(5, 7) + '/' + this.balanceDate[z].due[kk]['dueTaken'].slice(0, 4)),83.5,i+1)+bigKK;
            bigKK=bigKK+5

        }
        doc.setLineDash([1, 0], 10);
      }
      bigKK=bigKK==0?5:bigKK;


      let bigK=0

      let adder=0

      doc.line(0, i + 7-(bigK*2)+adder, 210, i + 7-(bigK*2)+adder);
      doc.line(37, i - (data.length * 6) -11-(bigK*2), 37, i + 7-(bigK*2)+adder);

      doc.line(61, i - (data.length * 6) -11-(bigK*2), 61, i + 7-(bigK*2)+adder);

      doc.line(83, i - (data.length * 6) -11-(bigK*2), 83, i + 7-(bigK*2)+adder);
      doc.line(146, i - (data.length * 6) -11-(bigK*2), 146, i + 7-(bigK*2)+adder);

  
      doc.setFontSize('10');
      if(this.balanceDate[z].update){}else{
  
      doc.text(this.balanceDate[z].accountName, 147.5, accountI);//accno
      doc.text(String(this.balanceDate[z].accountNumber), 147.5, accountI+6);//accname
      doc.text(this.balanceDate[z].ifsc + '-' + this.balanceDate[z].contacttb, 147.5, accountI+12);//ifsc-bankname
      }
      if(!dataTF){
        doc.text(String(this.handleF.getDateddmmyy(this.balanceDate[z].apd)), 115, accountI);//truckno
        doc.text(String(this.balanceDate[z].apm), 115, accountI+6);//truckno
      }
      // doc.text(this.balanceDate[z]['available'], 191, accountI+6);//accno
      doc.setFontSize('8');
      
      i = i + 12-(bigK*2)+(bigKK-5);
    }
    doc.text('#', 192, pageStopper)
    //Dynamic Part End
    doc.save(dateFormat + '.pdf')
  }

  ls(no){
    if(no<6){
      return 3;
    }
    else if(no>=6){
      return no-5+this.ls(no-1);
    }
  }
  back(type) {
    switch (type) {
      case 'year':
        this.yeardiv = true;
        this.monthdiv = false;
        this.daydiv = false;
        this.printInfo = false;
        this.createdDate = "";
        break;
      case 'month':
        this.yeardiv = false;
        this.monthdiv = true;
        this.daydiv = false;
        this.printInfo = false;
        this.createdDate = this.createdDate.slice(0, 4);
        this.find2(this.createdDate, 'year', false)
        break;
      case 'day':
        this.yeardiv = false;
        this.monthdiv = false;
        this.daydiv = true;
        this.printInfo = false;
        this.createdDate = this.createdDate.slice(0, 7);
        this.find2(this.createdDate, 'month', false)
        break;
    }
  }

}