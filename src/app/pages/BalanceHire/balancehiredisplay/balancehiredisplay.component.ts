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
import { t } from '@angular/core/src/render3';

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
    { 'value': '2', 'viewvalue': 'Check Prints' },
    { 'value': '3', 'viewvalue': 'Given Date' },
    { 'value': '4', 'viewvalue': 'Given Payment Pending' }
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
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public excelService: ExcelService,
    public securityCheck: SecurityCheckService, public handleF: handleFunction) {
     
  }

  ngOnInit() {
// NgOninit is being called automatically when clicked on edit by admin in balance follow, chk how very important
    this.printInfo = false;
    this.role = this.securityCheck.role;
    this.balanceDate = this.securityCheck.commonBalanceHire.length > 0 ? this.securityCheck.commonBalanceHire : [];
    for (let i = 0; i < new Date().getFullYear() - 2020; i++) {
      this.years.push(i + 2021)
    }
    this.givenDate=this.handleF.createDate(new Date());
  }

  adminAccess() {
    this.admin = !this.admin;
  }

  findOption() {
    this.buttonOption = this.displayType;
    this.buttonValue = this.displayoptions[parseInt(this.displayType) - 1].viewvalue;
    this.yeardiv = true;
    this.monthdiv = false;
    this.daydiv = false;
    this.printInfo = this.buttonOption == '1' ? true : false;
    this.createdDate = '';
    this.buttonOption == '3'?this.getGivenDateTrucks():undefined;
    this.buttonOption == '4'?this.getGivenTrucksPayment():undefined;
    
  }
  refresh(data){
    switch (data) {
      case '3':
        this.getGivenDateTrucks();    
        break;
    case '4':
      this.getGivenTrucksPayment();
      break;
      
    }
    
  }
  getGivenDateTrucks(){
    let formbody = {}
    formbody['method'] = 'givenEmpty';
    formbody['tablename'] = 't';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, formbody, 0)
      .subscribe((res: any) => {
        this.givenTrucks=res.Data;
      });
  
  }

  addtoGiven(id){
    if (confirm('Add to Given Date?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['givenDate']=this.givenDate;
      formbody['method'] = 'addGivenEmpty';
      formbody['tablename'] = 't';
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, formbody, 0)
        .subscribe((res: any) => {
          alert(res.Status)
        });
    }
  }

  showDatabyidTBEdit(data,j){
   
  // showDatabyid = function (data, j, number) {
    this.show = true;
    let tempObj = {};

    tempObj['place'] = data.places[0] === undefined ? '' : data.places[0].village_name;
    tempObj['place2'] = data.places2[0] === undefined ? '' : data.places2[0].village_name;
    tempObj['truckno'] = data.trucks[0] === undefined ? '' : data.trucks[0].truckno;
    tempObj['partyName'] = data.parties[0] === undefined ? '' : data.parties[0].name;
    tempObj['ownerid'] = data.trucks[0] === undefined ? '' : data.trucks[0]._id;
    tempObj['accountDetails'] = data.trucks[0]['accountDetails'];
    tempObj['placeid'] = data.places[0] === undefined ? '' : data.places[0]._id;
    tempObj['placeid2'] = data.places2[0] === undefined ? '' : data.places2[0]._id;
    tempObj['partyid'] = data.parties[0] === undefined ? '' : data.parties[0]._id;
    tempObj['entryDate'] = data.entryDate;
    tempObj['_id'] = data._id;
    tempObj['partyType'] = data.partyType;
    tempObj['turnbookDate'] = data.turnbookDate;
    tempObj['loadingDate'] = data.loadingDate;
    tempObj['lrno'] = data.lrno === undefined ? '' : data.lrno;
    tempObj['hamt'] = data.hamt === undefined ? 0 : data.hamt;
    tempObj['ohamt'] = data.ohamt === undefined ? 0 : data.ohamt;
    tempObj['pochDate'] = data.pochDate === undefined ? '' : data.pochDate;
    tempObj['givenDate'] = data.givenDate === undefined ? '' : data.givenDate;
    tempObj['pochPayment'] = data.pochPayment === undefined ? '' : data.pochPayment;
    tempObj['pgno'] = data.pgno === undefined ? '' : data.pgno;
    tempObj['payment'] = data.paymentDetails;
    tempObj['paymentDisabled']=false;
    tempObj['index'] = j;
    tempObj['number'] = '1';
    tempObj['invoice'] = data.invoice;
    tempObj['locations'] = data.locations;
    tempObj['locationDate'] = data.locationDate;
    tempObj['complete'] = data.complete;
    tempObj['typeOfLoad'] = data.typeOfLoad;
    tempObj['waitLocation'] = data.waitLocation;
    tempObj['advanceArray'] = data.advanceArray;
    tempObj['qr'] = data.qr;
    this.handledata.saveupdateTurn(false)


    this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookUpdate']);
    this.handledata.saveData(tempObj);
  };

  
  getGivenTrucksPayment(){
    let formbody = {}
    formbody['method'] = 'givenPaymentPending';
    formbody['tablename'] = 't';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, formbody, 0)
      .subscribe((res: any) => {
        this.givenTrucksPayment=res.Data;
        this.givenPaymentTable=res.Data.length>0?true:false;
        this.GPPMsg=res.Data.length>0?'':'No Pending Payments'
      });
  }

  downloadPendingPayment(){
    // pdf to see pendingpayment
  }

  find = function () {
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
      ('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.printInfo = true;
        this.balanceDate = [];
        this.balanceDate = res.balanceData;
        this.securityCheck.commonBalanceHire = res.balanceData;
        this.printed = res.balanceData.length > 0 ? res.balanceData[0].print : true;
      });
  };
  find2(data, type, set = true) {//set the  data['todayDate'] = this.selectedDate; to the data['todayDate']
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
      ('commoninformation', 1, tempObj, 0)
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

  // {"method":"update","tablename":"BalanceHire","todayDate":"2021-09-04","print":true,"part":0,"user":"shubham"}
  //{"method":"update","tablename":"BalanceHire","print":true,"part":0,"user":"shubham"}


  deleteBH(data) {
    if (confirm('Are you sure?')) {
      data['comments'] = data['comments'] === 'cancel' ? '' : 'cancel';
      data['method'] = 'update';
      data['tablename'] = 'BalanceHire';
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, data, 0)
        .subscribe((res: any) => {
          this.balanceDate.find(r => r._id == data._id)['comments'] = data['comments'];
        });
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
        ('commoninformation', 1, data, 0)
        .subscribe((res: any) => {
          alert(res.Status);
          this.printed = !this.printed;
        });
    } else { }
  }

  deleteBHComplete(data, j) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = data._id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'BalanceHire';
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, formbody, 0)
        .subscribe((res: any) => {
          this.balanceDate.splice(j, 1);
        });
    }
  }

  showDatabyidEditForm(data, j) {
    console.log(data);
    
    this.show = true;
    this.found = data;
    data['index'] = j;
    data['editOption'] = 1;
    data['truckData'].map(r=>{r.field=true;})
    data['commentToTruck']=data['commentToTruck']
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/BALANCE_HIRE_HANDLER/UpdateSingle']);
  }

  updateComments(i,j){
    console.log(i);
    let a = prompt('Your Comment was : '+String(i['commentToTruck'])+'.\nDo you want to add more to it?');
    a=a===null?'':' '+a;
    a=String(i['commentToTruck'])+String(a);
    let formbody = {}
    formbody['_id'] = i._id;
    formbody['method'] = 'BalanceHireCommentUpdate';
    formbody['tablename'] = 'BalanceHire';
    formbody['commentToTruck']=a;

    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, formbody, 0)
    .subscribe((res: any) => {
      alert(res.Status)
    });
  }


  download1() {//threshhold is 295
    let pageno = 1;
    let dateFormat = this.balanceDate[0].todayDate.slice(8, 10) + '-' + this.balanceDate[0].todayDate.slice(5, 7) + '-' + this.balanceDate[0].todayDate.slice(0, 4);
    var doc = new jsPDF();
    doc.line(0, 148.2, 5, 148.2);//punching line helper
    //Static Part Start
    //Date
    doc.setFontSize('10');
    doc.line(0, 148.2, 5, 148.2);//punching line helper
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text(dateFormat, 90, 5)
    doc.text(String(pageno), 190, 5)
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
    doc.line(37, 6, 37, 300);
    doc.line(61, 6, 61, 300);
    doc.line(72, 6, 70.4, 300);
    doc.line(92, 6, 92, 300);
    doc.line(135, 6, 135, 300);
    //vertical line after date
    //Headers
    doc.setFontSize('10');
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Amount', 16, 10)
    doc.text('Comments', 38, 10)
    doc.text('Pg', 63, 10)
    doc.text('Date', 72.5, 10)
    doc.text('TruckNo', 92.5, 10)
    doc.text('Account Details', 135.5, 10)
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
    let i = 18;
    // doc.text('Shubham is awesome', 1, i);
    for (let z = 0; z < this.balanceDate.length; z++) {
      let data = this.balanceDate[z].truckData;
      if (((data.length * 6) + 15 + i) > 295) {
        doc.addPage();
        doc.line(0, 148.2, 5, 148.2);//punching line helper
        //Static Part Start
        //Date
        doc.setFontSize('10');
        doc.setFontType('bold');
        doc.setTextColor(0, 0, 0);
        doc.text(dateFormat, 90, 5)
        doc.text(String(pageno), 190, 5)
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
        doc.line(37, 6, 37, 300);
        doc.line(61, 6, 61, 300);
        doc.line(72, 6, 70.4, 300);
        doc.line(92, 6, 92, 300);
        doc.line(135, 6, 135, 300);
        //vertical line after date
        //Headers
        doc.setFontSize('10');
        doc.setFontType('bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Amount', 16, 10)
        doc.text('Comments', 38, 10)
        doc.text('Pg', 63, 10)
        doc.text('Date', 72.5, 10)
        doc.text('TruckNo', 92.5, 10)
        doc.text('Account Details', 135.5, 10)
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
        i = 18;
      }

      let K = 0
      doc.setFontSize('10');
      doc.text(this.balanceDate[z].commentToTruck, 38.5, i);//comments
      for (let k = 0; k < data.length; k++) {
        doc.setFontSize('10');
        doc.text(String(this.balanceDate[z].truckData[k].amount), 16, i);//amount

        doc.setFontSize('10');
        doc.text(String(this.balanceDate[z].truckData[k].pageno), 61.5, i);//pgno
        doc.setFontSize('10');
        doc.text(this.balanceDate[z].truckData[k].date.slice(8, 10) + '/' + this.balanceDate[z].truckData[k].date.slice(5, 7) + '/' + this.balanceDate[z].truckData[k].date.slice(0, 4), 72.5, i);//date
        doc.setFontSize('10');
        doc.text(this.balanceDate[z].truckData[k].truckno.split(' ').join(''), 92.5, i);//truckno
        doc.text(this.balanceDate[z].truckData[k].shortDetails, 120, i);//truckno
        K = k;
        i = i + 6;
      }
      doc.line(0, i + 7, 210, i + 7);
      doc.setFontSize('10');
      doc.text(this.balanceDate[z].accountName, 136.5, i - (data.length * 6));//accno
      doc.text(String(this.balanceDate[z].accountNumber), 136.5, i + 6 - (data.length * 6));//accname
      doc.text(this.balanceDate[z].ifsc + '-' + this.balanceDate[z].bankName, 136.5, i + 12 - (data.length * 6));//ifsc-bankname

      i = i + 15;
    }
    //Dynamic Part End
    doc.save(dateFormat + '.pdf')
  }
  // a will be the array to pass for eg: 412212111
  //4 trucks wale in bulk are a digit number which is 2
  //2 trucks wale in bulk are a digit number which is 2
  //1 trucks wale in bulk are a digit number which is 1
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

  downloadGPP()
  {//threshhold is 295
 
    
    
    let data=this.givenTrucksPayment;
 
    let pager=1;
     let bigValueofY=0;
     var doc = new jsPDF()
     doc.line(0, 148.2, 5, 148.2);//punching line helper
     doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Payment Pending', 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     //headers
     doc.setFontSize('10');
     let y = 24;
     let starty = 25;
     doc.text('Sr', 2, y)//partyname
     doc.text('TruckNo', 8, y)//partyname
     doc.text('Date', 34, y)//partyname
     doc.text('Party', 56, y)//partyname
     doc.text('Place', 95, y)//partyname
     doc.text('Notes', 145, y)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(7, 20, 7, 25);//srno
     doc.line(33, 20, 33, 25);//truck
     doc.line(55, 20, 55, 25);//date
     doc.line(94, 20, 94, 25);//village
     doc.line(144, 20, 144, 25);//village
     //vertical lines
     let startforI=0;
     y = y + 6;
     startforI=0;
     for (let i = startforI; i < data.length; i++) {
 
       if(y>290){
        
         y=30;
     starty = 25;
     doc.line(7, starty, 7, 292);//date
        doc.line(33, starty,33, 292);//truckno
        doc.line(55, starty, 55, 292);//credit
        doc.line(94, starty, 94, 292);//village
        doc.line(144, starty, 144, 292);//village
         doc.addPage();
         doc.line(0, 148.2, 5, 148.2);//punching line helper
         doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Payment Pending', 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 2, y-6)//partyname
     doc.text('TruckNo', 8, y-6)//partyname
     doc.text('Date', 34, y-6)//partyname
     doc.text('Party', 56, y-6)//partyname
     doc.text('Place', 95, y-6)//partyname
     doc.text('Notes', 145, y-6)//partyname
     //headers
     //vertical lines
     doc.line(7, 20, 7, 25);//srno
     doc.line(33, 20, 33, 25);//truck
     doc.line(55, 20, 55, 25);//date
     doc.line(94, 20, 94, 25);//village
     doc.line(144, 20, 144, 25);//village
     //vertical lines
     doc.line(0, 25, 210, 25);//line after header
     }
     
    doc.text(this.handleF.generate2DigitNumber(String(i+1)), 2, y-1)//partyname
    doc.text(data[i].trucks[0].truckno, 8, y-1)//partyname
    doc.text(this.handleF.getDateddmmyy(data[i].loadingDate), 34, y-1)//Date  
    doc.text(this.handleF.getDateddmmyy(data[i].givenDate), 34, y+2)//Date              
    doc.text(data[i].parties[0].name.slice(0,16), 56, y-1)//Destination
    doc.text(data[i].places[0].village_name.slice(0,16), 95, y-1)//Destination
    doc.line(0, y +4, 210, y +4);//line after header
       y = y + 8;
       
     }
        //vertical lines//getting applied for every loop, make it happen once only
        doc.line(7, starty, 7, y-4);//date
        doc.line(33, starty,33, y-4);//truckno
        doc.line(55, starty, 55, y-4);//credit
        doc.line(94, starty, 94, y-4);//village
        doc.line(144, starty, 144, y-4);//village
        //vertical lines

    //  doc.save('Available-Data.pdf')
     doc.save('GPP.pdf')//partyname
   }
  download() {//threshhold is 295
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
    let dateFormat = this.balanceDate[0].todayDate.slice(8, 10) + '-' + this.balanceDate[0].todayDate.slice(5, 7) + '-' + this.balanceDate[0].todayDate.slice(0, 4);
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
    doc.line(72, i + 6 - 16, 72, i + 12 - 16);
    doc.line(92, i + 6 - 16, 92, i + 12 - 16);
    doc.line(155, i + 6 - 16, 155, i + 12 - 16);


    //vertical line after date till headers
    //Headers
    doc.setFontSize('10');
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Amount', 16, i + 10 - 16)
    doc.text('Comments', 38, i + 10 - 16)
    doc.text('Pg', 63, i + 10 - 16)
    doc.text('Date', 72.5, i + 10 - 16)
    doc.text('TruckNo', 92.5, i + 10 - 16)
    doc.text('Account Details', 155.5, i + 10 - 16)
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
        doc.addPage();
        doc.line(0, 148.2, 5, 148.2);//punching line helper
        //Static Part Start
        //Date
        doc.setFontSize('10');
        doc.setFontType('bold');
        doc.setTextColor(0, 0, 0);
        doc.text(dateFormat, 90, 5)
        doc.text(String(pageno), 190, 5)
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
        doc.line(72, 6, 72, 12);
        doc.line(92, 6, 92, 12);
        doc.line(155, 6, 155, 12);
        //vertical line after date
        //Headers
        doc.setFontSize('10');
        doc.setFontType('bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Amount', 16, 10)
        doc.text('Comments', 38, 10)
        doc.text('Pg', 63, 10)
        doc.text('Date', 72.5, 10)
        doc.text('TruckNo', 92.5, 10)
        doc.text('Account Details', 155.5, 10)
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
      doc.setFontSize('10');
      doc.text(String(this.balanceDate[z].commentToTruck), 38.5, i);//comments
      for (let k = 0; k < data.length; k++) {
        doc.setFontSize('10');
        doc.text(String(this.balanceDate[z].truckData[k].amount), 16, i);//amount

        doc.setFontSize('10');
        doc.text(String(this.balanceDate[z].truckData[k].pageno), 61.5, i);//pgno
        doc.setFontSize('10');
        doc.text(this.balanceDate[z].truckData[k].date.slice(8, 10) + '/' + this.balanceDate[z].truckData[k].date.slice(5, 7) + '/' + this.balanceDate[z].truckData[k].date.slice(0, 4), 72.5, i);//date
        doc.setFontSize('10');
        doc.text(this.balanceDate[z].truckData[k].truckno.split(' ').join(''), 92.5, i);//truckno
        doc.setFontSize('8');
        doc.text(this.balanceDate[z].truckData[k].shortDetails?this.balanceDate[z].truckData[k].shortDetails:'', 119, i);//truckno
        doc.setFontSize('10');
        K = k;
        i = i + 6;
        totalAmount=totalAmount+this.balanceDate[z].truckData[k].amount;
      }
      if(data.length>1){
      doc.line(5, i-4, 32, i-4);
      doc.text(String(totalAmount),16,i)
      }
      doc.line(0, i + 7, 210, i + 7);
      doc.line(37, i - (data.length * 6) - 5, 37, i + 7);
      doc.line(61, i - (data.length * 6) - 5, 61, i + 7);
      doc.line(72, i - (data.length * 6) - 5, 72, i + 7);
      doc.line(92, i - (data.length * 6) - 5, 92, i + 7);
      doc.line(155, i - (data.length * 6) - 5, 155, i + 7);

      doc.setFontSize('10');
      doc.text(this.balanceDate[z].accountName, 156.5, i - (data.length * 6));//accno
      doc.text(String(this.balanceDate[z].accountNumber), 156.5, i + 6 - (data.length * 6));//accname
      doc.text(this.balanceDate[z].ifsc + '-' + this.balanceDate[z].bankName, 156.5, i + 12 - (data.length * 6));//ifsc-bankname

      i = i + 12;
    }
    //Dynamic Part End
    doc.save(dateFormat + '.pdf')
  }

  showDatabyid = function (data, j) {
    this.show = true;
    this.found = data;
    data['index'] = j;
    data['editOption'] = 0;
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/BALANCE_HIRE_HANDLER/Update']);
  };
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


