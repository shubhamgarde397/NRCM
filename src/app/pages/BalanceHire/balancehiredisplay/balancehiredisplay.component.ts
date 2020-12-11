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

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public excelService: ExcelService,
    public securityCheck: SecurityCheckService) {
    this.commonArray = this.securityCheck.commonArray;
  }

  ngOnInit() {
  }

  find = function () {
    console.log(this.selectedDate);

    let tempObj = {};
    tempObj['method'] = 'BalanceHireDisplay';
    tempObj['tablename'] = 'BalanceHire';
    tempObj['todayDate'] = this.selectedDate;//
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.balanceDate = res;
        console.log(res);

      });
  };



  download() {
    this.spinnerService.show();
    this.apiCallservice.handleData_New(this.dbName, 'booking/getBookingDetails', 1, 1, {}, this.name)
      .subscribe((res: Response) => {
        this.newAuthor = res.json();
        let rows = [];
        const columns = [
          { title: 'Date', dataKey: 'Date' },
          { title: 'Lrno', dataKey: 'lrno' },
          { title: 'Truck No', dataKey: 'truckno' },
          { title: 'Hire Amount', dataKey: 'hireamount' },
          { title: 'Place', dataKey: 'place' },
          { title: 'Amount', dataKey: 'amount' },
          { title: 'Payment', dataKey: 'payment' },
          { title: 'Payment Date', dataKey: 'paymentdate' }
        ];
        const doc = new jsPDF({
          orientation: 'landscape',
          unit: 'in',
          format: [15, 10]
        });
        const sender = 'Nitin Roadways And Cargo Movers';
        const party = this.newAuthor[0].nop;
        const to = this.newAuthor[0].FromParty;
        const toGST = this.newAuthor[0].FromPartyGST;
        const partyGST = this.newAuthor[0].ToPartyGST;
        doc.setFontSize(40);
        doc.setFont('Arial');
        doc.setFontType('bold');
        doc.setTextColor(255, 0, 0);
        doc.text(sender, 3, 1.8);
        doc.setLineWidth(0.1);
        doc.line(0, 2.2, 15, 2.2);
        // var doc = new jsPDF('p', 'pt');
        doc.setFontSize(60);
        doc.setTextColor(0, 0, 0);
        doc.text(party, 4, 3.5);
        doc.setLineWidth(0.1);
        doc.line(0, 4.2, 15, 4.2);
        doc.setFontSize(16);
        doc.text(name + ' : ' + partyGST, 8, 4.6);
        doc.text(to + ' : ' + toGST, 8, 5);

        doc.addPage();
        let i = 1;
        // tslint:disable-next-line:forin
        for (const key in this.newAuthor) {
          rows = [...rows, Object.assign({}, {
            'Date': this.newAuthor[key].Date,
            'lrno': this.newAuthor[key].lrno,
            'truckno': this.newAuthor[key].truckno,
            'hireamount': this.newAuthor[key].hamt,
            'place': this.newAuthor[key].place,
            'amount': this.newAuthor[key].amt,
            'payment': this.newAuthor[key].Payment,
            'paymentdate': this.newAuthor[key].PaymentReCDate,
          })];
          i++;
        }
        doc.autoTable(columns, rows);
        doc.save('' + name + '.pdf');
        this.spinnerService.hide();
      });
  }
}

