import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-poch-account-party-display',
  templateUrl: './poch-account-party-display.component.html',
  styleUrls: ['./poch-account-party-display.component.css'],
  providers: [ApiCallsService]
})
export class PochAccountPartyDisplayComponent implements OnInit {
  tableName: any;
  public pochdetailslist: any;
  public pochdetails: any;
  public nofpid: string;
  public show = true;
  public regularpartylist: any;
  public nopid: any;
  public newAuthor: any;
  public dbName = 1;
  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService, public router: Router,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {
    this.apiCallservice.handleData_New(0, 'regularParty/getRegularPartyData', 1, 0)
      .subscribe((res: Response) => {
        this.regularpartylist = res;
      });
  }

  find = function () {
    this.apiCallservice.handleData_New(this.dbName, 'pochAccount/getPochDataDetailsbyName', 1, 1, {}, this.nopid).
      subscribe((res: Response) => {
        this.show = false;
        this.pochdetailslist = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'pochAccount/PochDetailsbyNameCount', 1, 1, {}, this.nopid)
      .subscribe((res: Response) => {
        this.count = res;
      });
  };

  deletePochDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'pochAccount/delPochdetailsdata', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.find();
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/PochAccount/PochAccountUpdate']);
  }

  download() {
    this.newAuthor = this.apiCallservice.handleData_New(this.dbName, 'pochAccount/getPochDataDetailsbyNameCheck',
      1, 2, {}, this.nopid, false)
      .subscribe((res: Response) => {
        this.newAuthor = res;
        this.totalCount(this.newAuthor)
          .then((amount) => {
            let rows = [];
            const columns = [
              { title: 'Date', dataKey: 'date' },
              { title: 'Truck No', dataKey: 'truckno' },
              { title: 'Place', dataKey: 'place' },
              { title: 'Amount', dataKey: 'amount' },
            ];
            const doc = new jsPDF({
              orientation: 'landscape',
              unit: 'in',
              format: [15, 10]
            });
            const sender = 'Nitin Roadways And Cargo Movers';
            doc.setFontSize(40);
            doc.setFont('Arial');
            doc.setFontType('bold');
            doc.setTextColor(255, 0, 0);
            doc.text(sender, 3, 1.8);
            doc.setLineWidth(0.1);
            doc.line(0, 2.2, 15, 2.2);
            doc.text(this.nopid, 5, 3.2);
            // let doc = new jsPDF('p', 'pt');
            doc.setFontSize(30);
            doc.setTextColor(0, 0, 0);
            doc.setLineWidth(0.1);
            doc.line(0, 4.2, 15, 4.2);

            doc.addPage();
            let i = 1;
            // tslint:disable-next-line:forin
            for (const key in this.newAuthor) {
              rows = [...rows, Object.assign({}, {
                'date': this.newAuthor[key].Date,
                'truckno': this.newAuthor[key].truckno,
                'place': this.newAuthor[key].place,
                'amount': this.newAuthor[key].amt,
              })];
              i++;
            }
            rows = [...rows, Object.assign({}, {
              'date': '',
              'truckno': '',
              'place': 'Total',
              'amount': amount,
            })];
            doc.autoTable(columns, rows);
            this.tableName = this.nopid.replace(/ /g, '_');
            doc.save(this.tableName + '.pdf');
          });
      });
  }

  totalCount(value) {
    let amount = 0;
    const promise = new Promise((resolve, reject) => {
      value.forEach(element => {
        // tslint:disable-next-line:radix
        amount = amount + parseInt(element.amt);
      });
      resolve(amount);
    });
    return promise;
  }
}
