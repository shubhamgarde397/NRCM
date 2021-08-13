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
    { 'value': '4', 'viewvalue': 'PDF' }
  ]
  public paymentData;

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogstonly')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();

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
  }
  find = function () {
    let flag = false;
    let tempObj = {};
    let balanceFollow = {};

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
          console.log(this.paymentData);

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
    data.unshift(balanceFollow);
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
}

