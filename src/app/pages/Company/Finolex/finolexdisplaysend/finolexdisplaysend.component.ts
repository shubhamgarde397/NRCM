import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Consts } from '../../../../common/constants/const';
import { handleFunction } from '../../../../common/services/functions/handleFunctions';
import { environment } from '../../../../../environments/environment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ExcelService } from '../../../../common/services/sharedServices/excel.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { dataForMail } from './dataForMail';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { timeout } from 'rxjs/operators';
import { log } from 'console';

@Component({
  selector: 'app-finolexdisplaysend',
  templateUrl: './finolexdisplaysend.component.html',
  styleUrls: ['./finolexdisplaysend.component.css'],
  providers: [ApiCallsService, handleFunction]
})
export class FinolexdisplaysendComponent implements OnInit {

  public data;
  public yearNames: any[];
  public finolexdetailslist;
  public id: number;
  public show = false;
  public found;
  public arr;
  public monthNames = Consts.monthNames;
  public newAuthor: any;
  public tabledata = false;
  public now = new Date();
  public m = this.monthNames[this.now.getMonth()];
  public y = this.now.getFullYear();
  public showdate = false;
  public current_count: string;
  public year = '';
  public month = '';
  public dbName = 1;
  public mailDiv = false;
  public Mailsubject: string;
  public Mailbody: string;
  public myFormGroupE: FormGroup;
  public model: dataForMail;
  public modelSubmitted: dataForMail;
  public submitted = false;
  constructor(
    public apiCallservice: ApiCallsService,
    public handlefunction: handleFunction,
    public excelService: ExcelService,
    public securityCheck: SecurityCheckService
    , public formBuilder: FormBuilder,
    public spinner: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.yearNames = this.securityCheck.yearNames;
    console.log(this.yearNames);
    this.m = this.monthNames[this.now.getMonth()];
    this.y = this.now.getFullYear();

    this.model = new dataForMail(this.Mailsubject, this.Mailbody);
    this.myFormGroupE = this.formBuilder.group({
      password: ['', Validators.required]
    });

  }

  getMonthsLocal() {
    if (this.year === this.yearNames.slice(0, 1)[0]) {
      this.monthNames = Consts.monthNames.slice(3, 12);
    } else if (this.year === this.yearNames.slice(1, 2)[0]) {
      this.monthNames = Consts.monthNames.slice(0, 3);
    }
  }

  find = function () {
    this.showdate = true;
    let date = this.year + '-' + this.handlefunction.generate2DigitNumber(String(this.handlefunction.getMonthNumber(this.month)));
    this.apiCallservice.handleData_New(this.dbName, 'Finolex/getFinolexDetails', 1, 0, { Date: date })
      .subscribe((res: Response) => {
        this.finolexdetailslist = res;
        if (this.finolexdetailslist.length > 0) {
          this.tabledata = true;
        } else {
          this.tabledata = false;
        }
      });
  };

  exportAsXLSX(): void {

    const tab = this.month + this.year;
    console.log(tab);
    this.newAuthor = this.apiCallservice.handleData_New(this.dbName, 'Finolex/getFinolexDetails', 1, 1, {}, tab)
      .subscribe((res: Response) => {
        this.createData(res)
          .then((data) => {
            this.excelService.exportAsExcelFile(data, 'GST_ACCOUNT_DETAILS_' + this.month + '_' + this.year);
          });
      });
  }

  createData(value) {
    const promise = new Promise((resolve, reject) => {
      const dataArray = [];
      value.forEach(element => {
        dataArray.push({
          'Date': element.Date,
          'Lrno': element.lrno,
          'From Party': element.FromParty,
          'From Party GST': element.FromPartyGST,
          'Name Of Party': element.nop,
          'To Party GST': element.ToPartyGST,
          'Truck No': element.truckno,
          'Hire Amount': element.hamt,
          'Place': element.place,
          'Owner Name': element.OwnerName,
          'PAN': element.PAN
        });
      });
      resolve(dataArray);
    });
    return promise;

  }

  download() {
    const tab = this.month + this.year;
    this.newAuthor = this.apiCallservice.handleData_New(this.dbName, 'Finolex/getFinolexDetails', 1, 1, {}, tab)
      .subscribe((res: Response) => {
        this.newAuthor = res;
        let rows = [];
        const columns = [
          { title: 'Date', dataKey: 'Date' },
          { title: 'Lrno', dataKey: 'lrno' },
          { title: 'From Party', dataKey: 'fromparty' },
          { title: 'From Party GST', dataKey: 'frompartygst' },
          { title: 'Name Of Party', dataKey: 'nameofparty' },
          { title: 'To Party GST', dataKey: 'topartygst' },
          { title: 'Truck No', dataKey: 'truckno' },
          { title: 'Hire Amount', dataKey: 'hireamount' },
          { title: 'Place', dataKey: 'place' },
          { title: 'Owner Name', dataKey: 'ownername' },
          { title: 'PAN', dataKey: 'pan' },
        ];
        const doc = new jsPDF({
          orientation: 'landscape',
          unit: 'in',
          format: [15, 10]
        });
        const header = this.month + ',' + this.year + ' SALE AND EXPENSES ACCOUNT DETAILS';
        const sender = 'Nitin Roadways And Cargo Movers';
        doc.setFontSize(40);
        doc.setFont('Arial');
        doc.setFontType('bold');
        doc.setTextColor(255, 0, 0);
        doc.text(sender, 3, 1.8);
        doc.setLineWidth(0.1);
        doc.line(0, 2.2, 15, 2.2);
        // var doc = new jsPDF('p', 'pt');
        doc.setFontSize(30);
        doc.setTextColor(0, 0, 0);
        doc.text(header, 2, 3.5);
        doc.setLineWidth(0.1);
        doc.line(0, 4.2, 15, 4.2);

        doc.addPage();
        let i = 1;
        // tslint:disable-next-line:forin
        for (const key in this.newAuthor) {
          rows = [...rows, Object.assign({}, {
            'Date': this.newAuthor[key].Date,
            'lrno': this.newAuthor[key].lrno,
            'fromparty': this.newAuthor[key].FromParty,
            'frompartygst': this.newAuthor[key].FromPartyGST,
            'nameofparty': this.newAuthor[key].nop,
            'topartygst': this.newAuthor[key].ToPartyGST,
            'truckno': this.newAuthor[key].truckno,
            'hireamount': this.newAuthor[key].hamt,
            'place': this.newAuthor[key].place,
            'ownername': this.newAuthor[key].OwnerName,
            'pan': this.newAuthor[key].PAN,
          })];
          i++;
        }
        doc.autoTable(columns, rows);
        doc.save('GST_ACCOUNT_DETAILS_' + this.month + '_' + this.year + '.pdf');
      });
  }




  sendEmail({ value, valid }: { value: { password }, valid: boolean }) {
    this.submitted = true;
    this.spinner.show();
    this.apiCallservice.handleData_New(this.dbName, 'finalMail', 1, 0,
      {
        'FileName': this.month + '' + this.year,
        'Password': value.password
      }
    ).subscribe((res: Response) => {
      this.apiCallservice.handleData_New(this.dbName, 'finalMailSend', 1, 0,
        {
          'FileName': this.month + '' + this.year,
          'Password': value.password
        }
      ).subscribe((res: Response) => {
        alert('Mail has been sent successfully');
        this.spinner.hide();
      });
    });
  }

  changeDiv() {
    this.mailDiv = !this.mailDiv;
  }
}
