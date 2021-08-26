import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  data: any;
  show = false;
  tabledata: false;
  public today;
  public todaysDate;
  public name: string;
  public dbName = 1;
  public commonArray;
  public date = new Date();
  public dateFromUI;
  public buttonValue: any = 'Party';
  public buttonOption = '1';
  public trucknoid;
  public dynDate;
  public dynDate2;
  public role = 6;
  public dataTruck;
  public partyid = '';
  public considerArray;
  public partyData;
  public gstdetailslist;
  public nopid;
  public adminAccess = false;
  public tableData = false;
  public displayoptions = [
    { 'value': '1', 'viewvalue': 'Party' },
    { 'value': '2', 'viewvalue': 'Date' },
    { 'value': '3', 'viewvalue': 'Both' },
    { 'value': '4', 'viewvalue': 'PDF Data' }
  ]
  public buttonOptions=[
    { 'value': '1', 'viewvalue': 'This Month' },
    { 'value': '2', 'viewvalue': 'Last Month' },
    { 'value': '3', 'viewvalue': '1st April' },
    { 'value': '4', 'viewvalue': 'By Months' },
    { 'value': '5', 'viewvalue': 'Custom Date' }
  ];
  public monthNames=[];
  public paymentData;
  public displayType;
  public date1;
  public date2;
  public displayOption='0';
  public displayValue='This Month';
  public monthName;

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogstonly')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.monthNames=this.handleF.genaratemonthNames()
    this.role = this.securityCheck.role;
  }

  findgst() {
    this.partyid = this.handleF.findgst(this.nopid, this.gstdetailslist);
  }
  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.gstdetailslist = [];
    this.gstdetailslist = this.commonArray.gstdetails;
  }

  findOption() {
    this.buttonOption = this.trucknoid;
    this.buttonValue = this.displayoptions[parseInt(this.trucknoid) - 1].viewvalue;
    if((this.buttonOption==='3')){
      this.displayOption='0';

    }else if(this.buttonOption==='4'){
      this.displayOption='1';
    }else{
      this.displayOption='1';
    }
  }

  findDisplayOption(){
    this.displayOption = this.displayType;
    this.displayValue = this.buttonOptions[parseInt(this.displayType) - 1].viewvalue;
  }

  setDateMonth(){    
    this.date1="2021-"+this.handleF.generate2DigitNumber(String(this.handleF.getMonthNumber(this.monthName)))+"-01"
    this.date2="2021-"+this.handleF.generate2DigitNumber(String(this.handleF.getMonthNumber(this.monthName)))+"-31"
  }
  find = function () {
    console.log(this.monthName);
    
    this.paymentData=[];
    let flag = false;
    let tempObj = {};
    let balanceFollow = {};
    switch(this.displayOption){
      case '0':
        tempObj['from'] = this.date.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(parseInt(this.date.getMonth())+1)) +'-01';
          tempObj['to'] = this.date.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(parseInt(this.date.getMonth())+1)) +'-31';
          this.date1=tempObj['from'];
          this.date2=tempObj['to'];
        break;
        case '1':
          tempObj['from'] = this.date.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(parseInt(this.date.getMonth())+1)) +'-01';
          tempObj['to'] = this.date.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(parseInt(this.date.getMonth())+1)) +'-31';
          this.date1=tempObj['from'];
          this.date2=tempObj['to'];
          break;
          case '2':
            tempObj['from'] = this.date.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(this.date.getMonth())) +'-01';
          tempObj['to'] = this.date.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(this.date.getMonth())) +'-31';
          this.date1=tempObj['from'];
          this.date2=tempObj['to'];
            break;
            case '3':
              tempObj['from'] = this.date.getFullYear()+'-04-01';
          tempObj['to'] =  this.date.getFullYear()+'-'+this.handleF.generate2DigitNumber(String(parseInt(this.date.getMonth())+1)) +'-31';
          this.date1=tempObj['from'];
          this.date2=tempObj['to'];
              break;
              case '4':
                tempObj['from'] = this.date1;
          tempObj['to'] = this.date2;
          this.date1=tempObj['from'];
          this.date2=tempObj['to'];
                break;
                case '5':
                  tempObj['from'] = this.date1;
          tempObj['to'] = this.date2;
          this.date1=tempObj['from'];
          this.date2=tempObj['to'];
                  break;
                  default:
                    break;
    }


    switch (this.buttonOption) {
      case '1':
        if (this.partyid === '') { alert('Select a Party Name'); break; }
        else {
          tempObj['partyid'] = this.partyid['_id'];
          tempObj['method'] = 'displayPP';
          flag = true;
        }
        break;
      case '2':
        if ((this.date1 === undefined) || (this.date2 === undefined)) { alert('Select a Date'); break; }
        else {
          tempObj['from'] = this.date1;
          tempObj['to'] = this.date2;
          tempObj['method'] = 'displayPP';
          flag = true;
        }
        break;
      case '3':
        if ((this.date1 === undefined) || (this.date2 === undefined) || (this.partyid === '')) { alert('Select a Date and Party'); break; }
        else {
          tempObj['from'] = this.date1;
          tempObj['to'] = this.date2;
          tempObj['method'] = 'displayPP';
          tempObj['partyid'] = this.partyid['_id'];
          flag = true;
        }
        break;
      case '4':
        let msg = '';
        let amt = 0;
        if ((this.date1 === undefined) || (this.date2 === undefined) || (this.partyid === '')) { alert('Select a Date and Party'); break; }
        else {
          tempObj['from'] = this.date1;
          tempObj['to'] = this.date2;
          tempObj['method'] = 'partyPaymentPDF';
          tempObj['partyid'] = this.partyid['_id'];
          if (confirm('Want to add Balance Follow?')) {
            msg = prompt('Balance Follow Message');
            amt = parseInt(prompt('Balance Follow Amount'));
            balanceFollow['partyName'] = msg;
            balanceFollow['amount'] = amt;
            balanceFollow['type'] = 'buy';
            balanceFollow['lrno'] = 'Balance Follow';
            balanceFollow['bf'] = true;
          }else{
          balanceFollow['bf'] = false;
          }
          flag = true;
        }
        break;
      default:
        break;
    }
    
    if (flag) {
      tempObj['tablename'] = 'partyPayment'

      tempObj['display'] = parseInt(this.buttonOption);
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
        .subscribe((res: any) => {
          this.paymentData = res.paymentData;
          this.paymentData = this.buttonOption == '4' ? this.pdfJSON(res.paymentData, balanceFollow) : res.paymentData;

          if (this.paymentData.length > 0) {
            this.tableData = true;
          } else {
            alert('No Data Available.');
            this.tableData = false;
          }
        });
    }
  };

  pdfJSON(data, balanceFollow) {
    let val = 0
    if(balanceFollow['bf']){
    data.unshift(balanceFollow);
    }
    
    
    data.forEach((res) => {
      if (res['type'] == 'buy') {
        val = val + res['amount'];
        res['value'] = val;

      }
      else if (res['type'] == 'payment') {
        val = val - res['amount'];
        res['value'] = val;
      }
    })
    return data;
  }

  delete(id, j) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id._id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'partyPayment';
      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response: Response) => {
          alert(response['Status']);
          this.paymentData.splice(j, 1);
          if (this.paymentData.length > 0) {
            this.tableData = true;
          } else {
            this.tableData = false;
          }
        });
    }
  }

  getAdminAccess() {
    this.adminAccess = !this.adminAccess;
  }

  downloadBank() {
    var doc = new jsPDF()
    doc.setFontSize('30');
    doc.setFontType('bold');
    doc.text(this.partyid['name'], 15, 25)

    doc.setTextColor(255, 255, 255);
    doc.setLineWidth(0.8);
    doc.line(0, 28, 215, 28);

    doc.setFontSize('15');

    // doc.text('Declarant', 150, 268)
    doc.save('tp1' + '.pdf')
  }

  download() {//threshhold is 295
   let pager=1;
    
    var doc = new jsPDF()
    doc.setFontSize('25');
    doc.setFontType('bold');
    doc.text(this.partyid['name'], 15, 15)//partyname
    doc.setFontSize('10');
    doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
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
    doc.text('Sr', 23, y)//partyname
    doc.text('Date', 38, y)//partyname
    doc.text('TruckNo', 57, y)//partyname
    doc.text('Lrno', 88, y)//partyname
    doc.text('Debit', 108, y)//partyname
    doc.text('Credit', 133, y)//partyname
    doc.text('Balance', 155, y)//partyname
    doc.text('Notes', 182, y)//partyname
    //headers
    doc.line(0, 25, 210, 25);//line after header

    //vertical lines
    doc.line(30, 20, 30, 25);//srno
    doc.line(55, 20, 55, 25);//date
    doc.line(83, 20, 83, 25);//truckno
    doc.line(100, 20, 100, 25);//lrno
    doc.line(125, 20, 125, 25);//credit
    doc.line(150, 20, 150, 25);//debit
    doc.line(180, 20, 180, 20);//balance
    //vertical lines
    let startforI=0;
    if (this.paymentData[0]['bf'] == true) {
      y = y + 5;
      starty = 31;
      doc.text(this.paymentData[0].partyName, 30, y)//partyname
      doc.text(String(this.paymentData[0].value), 155, y)//partyname
      doc.line(20, 31, 210, 31);
      doc.line(150, 25, 150, 31);
      y = y + 6;
      startforI=1
    }else{
      y = y + 6;
      startforI=0;
    }

    for (let i = startforI; i < this.paymentData.length; i++) {

      if(y>290){
        y=30;
        
    starty = 20;
        doc.addPage();
        doc.setFontSize('25');
    doc.setFontType('bold');
    doc.text(this.partyid['name'], 15, 15)//partyname
    doc.setFontSize('10');
    doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
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
    doc.text('TruckNo', 57, y-6)//partyname
    doc.text('Lrno', 88, y-6)//partyname
    doc.text('Debit', 108, y-6)//partyname
    doc.text('Credit', 133, y-6)//partyname
    doc.text('Balance', 155, y-6)//partyname
    doc.text('Notes', 182, y-6)//partyname
    //headers
    doc.line(0, 25, 210, 25);//line after header

    //vertical lines
    doc.line(30, 20, 30, 25);//srno
    doc.line(55, 20, 55, 25);//date
    doc.line(83, 20, 83, 25);//truckno
    doc.line(100, 20, 100, 25);//lrno
    doc.line(125, 20, 125, 25);//credit
    doc.line(150, 20, 150, 25);//debit
    doc.line(180, 20, 180, 20);//balance
    //vertical lines
    }
      doc.text(String(i+1), 23, y)//partyname
      doc.text(this.handleF.getDateddmmyy(this.paymentData[i].date), 32, y)//partyname
      if (this.paymentData[i].type === 'buy') {
        doc.text(String(this.paymentData[i].lrno), 88, y)//lrno
        doc.text(this.paymentData[i].truckNo, 57, y)//truckno
      } else {
        doc.text(String('-'), 88, y)//lrno
        doc.text(String('-'), 57, y)//truckno
      }
      if (this.paymentData[i].type === 'buy') {
        doc.text(String(this.paymentData[i].amount), 108, y)//partyname
        doc.text(String('-'), 133, y)//partyname
      } else {
        doc.text(String(this.paymentData[i].amount), 133, y)//partyname
        doc.text(String('-'), 108, y)//partyname
      }

      doc.text(String(this.paymentData[i].value), 155, y)//partyname
      doc.line(20, y + 1, 210, y + 1);//line after header
      y = y + 5;

      
    //vertical lines//getting applied for every loop, make it happen once only
    doc.line(30, starty, 30, y - 4);//srno
    doc.line(55, starty, 55, y - 4);//date
    doc.line(83, starty, 83, y - 4);//truckno
    doc.line(100, starty, 100, y - 4);//lrno
    doc.line(125, starty, 125, y - 4);//credit
    doc.line(150, starty, 150, y - 4);//debit
    doc.line(180, 20, 180, y - 4);//balance
    //vertical lines

    }
    doc.save(this.partyid['name']+'_'+this.handleF.getDateddmmyy(this.date1)+'_'+this.handleF.getDateddmmyy(this.date2)+ '.pdf')
  }

}

