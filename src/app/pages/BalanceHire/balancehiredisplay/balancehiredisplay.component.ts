import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { environment } from '../../../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { ExcelService } from '../../../common/services/sharedServices/excel.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
// import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-balancehiredisplay',
  templateUrl: './balancehiredisplay.component.html',
  styleUrls: ['./balancehiredisplay.component.css']
})
export class BalancehiredisplayComponent implements OnInit {

  data: any;
  modelPAN: any;
  modelTruckNo: any;
  modelOwnerName: any;
  gstdetailslist: any;
  show = false;
  found;
  bookingnamelist;
  arr;
  api;
  newAuthor: any;
  nameToBeDisplayed: any;
  tabledata: false;
  public name: string;
  public dbName = 1;
  public commonArray;
  public date = new Date();
  public todayDate;
  public balanceDate = [];
  public selectedDate;
  public document = new jsPDF();

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public excelService: ExcelService,
    public securityCheck: SecurityCheckService) {
    this.commonArray = this.securityCheck.commonArray;
  }

  ngOnInit() {
  }

  find = function () {

    let tempObj = {};
    tempObj['method'] = 'BalanceHireDisplay';
    tempObj['tablename'] = 'BalanceHire';
    tempObj['todayDate'] = this.selectedDate;//
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.balanceDate = res.balanceData;
        console.log(this.balanceDate);

      });
  };



  download() {//threshhold is 295

    var doc = this.document;
    //Static Part Start
    //Date
    doc.setFontSize('15');
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text(this.balanceDate[0].todayDate, 90, 5)
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
    doc.line(22, 6, 22, 300);
    doc.line(46, 6, 46, 300);
    doc.line(57, 6, 55.4, 300);
    doc.line(72, 6, 72, 300);
    doc.line(120, 6, 120, 300);
    //vertical line after date
    //Headers
    doc.setFontSize('10');
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Amount', 1, 10)
    doc.text('Comments', 23, 10)
    doc.text('Pg', 48, 10)
    doc.text('Date', 57.5, 10)
    doc.text('TruckNo', 72.5, 10)
    doc.text('Account Details', 120.5, 10)
    //Headers End
    //Line after headers
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(0, 12, 210, 12);
    //Line after headers
    //Static Part End
    //Dynamic Part Start
    doc.setFontSize('20');
    doc.setFontType('normal');
    doc.setTextColor(0, 0, 0);
    let i = 18;
    // doc.text('Shubham is awesome', 1, i);
    for (let z = 0; z < this.balanceDate.length; z++) {
      let data = this.balanceDate[z].truckData;

      let K = 0
      for (let k = 0; k < data.length; k++) {
        doc.setFontSize('20');
        doc.text(String(this.balanceDate[z].truckData[k].amount), 1, i);//amount
        // doc.text(this.balanceDate[z].truckData[k].amount,i,10);//comments
        doc.setFontSize('15');
        doc.text(String(this.balanceDate[z].truckData[k].pageno), 46.5, i);//pgno
        doc.text(this.balanceDate[z].truckData[k].date.slice(8, 10) + '/' + this.balanceDate[z].truckData[k].date.slice(5, 7), 57.5, i);//date
        doc.setFontSize('20');
        doc.text(this.balanceDate[z].truckData[k].truckno, 72.5, i);//truckno
        K = k;
        i = i + 6;
      }
      doc.line(0, i + 7, 210, i + 1);
      doc.setFontSize('15');
      doc.text(this.balanceDate[z].accountNumber, 121.5, i - (data.length * 6));//accno
      doc.text(this.balanceDate[z].ifsc + '-' + this.balanceDate[z].bankname, 121.5, i + 6 - (data.length * 6));//ifsc-bankname
      doc.text(this.balanceDate[z].accountName, 121.5, i + 12 - (data.length * 6));//accname
      i = i + 10;


    }
    //Dynamic Part End
    console.log(i);

    doc.save('tp.pdf')
  }
}

