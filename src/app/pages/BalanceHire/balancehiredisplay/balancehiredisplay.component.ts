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
  public role = 6;
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public excelService: ExcelService,
    public securityCheck: SecurityCheckService) {
    this.commonArray = this.securityCheck.commonArray;
  }

  ngOnInit() {
    this.role = this.securityCheck.role;
  }

  find = function () {

    let tempObj = {};
    tempObj['method'] = 'BalanceHireDisplay';
    tempObj['tablename'] = 'BalanceHire';
    tempObj['todayDate'] = this.selectedDate;//
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.balanceDate = [];
        this.balanceDate = res.balanceData;
      });
  };
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


  download() {//threshhold is 295
    let dateFormat = this.balanceDate[0].todayDate.slice(8, 10) + '-' + this.balanceDate[0].todayDate.slice(5, 7) + '-' + this.balanceDate[0].todayDate.slice(0, 4);
    var doc = new jsPDF();
    //Static Part Start
    //Date
    doc.setFontSize('10');
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text(dateFormat, 90, 5)
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
        //Static Part Start
        //Date
        doc.setFontSize('10');
        doc.setFontType('bold');
        doc.setTextColor(0, 0, 0);
        doc.text(dateFormat, 90, 5)
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
      doc.text(this.balanceDate[z].comments, 38.5, i);//comments
      for (let k = 0; k < data.length; k++) {
        doc.setFontSize('10');
        doc.text(String(this.balanceDate[z].truckData[k].amount), 16, i);//amount

        doc.setFontSize('10');
        doc.text(String(this.balanceDate[z].truckData[k].pageno), 61.5, i);//pgno
        doc.setFontSize('10');
        doc.text(this.balanceDate[z].truckData[k].date.slice(8, 10) + '/' + this.balanceDate[z].truckData[k].date.slice(5, 7) + '/' + this.balanceDate[z].truckData[k].date.slice(0, 4), 72.5, i);//date
        doc.setFontSize('10');
        doc.text(this.balanceDate[z].truckData[k].truckno.split(' ').join(''), 92.5, i);//truckno
        K = k;
        i = i + 6;
      }
      doc.line(0, i + 7, 210, i + 7);
      doc.setFontSize('10');
      doc.text(String(this.balanceDate[z].accountNumber), 136.5, i - (data.length * 6));//accno
      doc.text(this.balanceDate[z].ifsc + '-' + this.balanceDate[z].bankName, 136.5, i + 6 - (data.length * 6));//ifsc-bankname
      doc.text(this.balanceDate[z].accountName, 136.5, i + 12 - (data.length * 6));//accname
      i = i + 15;
    }
    //Dynamic Part End
    doc.save(dateFormat + '.pdf')
  }
  showDatabyid = function (data) {
    this.show = true;
    this.found = data;
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/BALANCE_HIRE_HANDLER/Update']);
  };
}

