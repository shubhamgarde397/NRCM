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
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';

@Component({
  selector: 'app-finolexdisplaysend',
  templateUrl: './finolexdisplaysend.component.html',
  styleUrls: ['./finolexdisplaysend.component.css'],
  providers: [ApiCallsService, handleFunction]
})
export class FinolexdisplaysendComponent implements OnInit {
  public date;
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
  public commonArray;
  public updateDataContent;
  public myFormGroup: FormGroup;
  public ownerdetailslist;
  public gstdetailslist;
  public villagelist;
  public updateDate;
  public updatenop;
  public updatelrno;
  public updatetruckno;
  public updateplace;
  public updatehamt;
  public gstdetailslistid = {};
  public ownerdetailslistid = {};
  public days = [];
  constructor(
    public apiCallservice: ApiCallsService,
    public handlefunction: handleFunction,
    public excelService: ExcelService,
    public securityCheck: SecurityCheckService
    , public formBuilder: FormBuilder,
    public spinner: Ng4LoadingSpinnerService,
    public obs: ObsServiceService) {
    this.days = this.handlefunction.generateDays();
  }

  ngOnInit() {

    this.yearNames = this.securityCheck.yearNames;
    this.commonArray = this.securityCheck.commonArray;
    this.m = this.monthNames[this.now.getMonth()];
    this.y = this.now.getFullYear();
    this.fetchBasic();
    this.model = new dataForMail(this.Mailsubject, this.Mailbody);
    this.myFormGroupE = this.formBuilder.group({
      password: ['', Validators.required]
    });

  }

  fetchBasic() {
    this.ownerdetailslist = [];
    this.gstdetailslist = [];
    this.villagelist = [];
    this.ownerdetailslist = this.commonArray.ownerdetails;
    this.gstdetailslist = this.commonArray.gstdetails;
    this.villagelist = this.commonArray.villagenames;
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
    this.date = this.year + '-' + this.handlefunction.generate2DigitNumber(String(this.handlefunction.getMonthNumber(this.month)));
    // this.apiCallservice.handleData_New_Temp('booking/alldetails', 1, { Date: date }, this.dbName);
    // this.apiCallservice.handleData_New(this.dbName, 'Finolex/getFinolexDetails', 1, 0, { Date: date })
    //   .subscribe((res: Response) => {
    //     this.finolexdetailslist = res;
    //     if (this.finolexdetailslist.length > 0) {
    //       this.tabledata = true;
    //     } else {
    //       this.tabledata = false;
    //     }
    //   });
    let formBody = {}
    formBody['method'] = 'display';
    formBody['Date'] = this.date
    this.apiCallservice.handleData_New_python('booking', 1, formBody, 1)
      .subscribe((res) => {
        this.finolexdetailslist = res;
        if (this.finolexdetailslist.length > 0) {
          this.tabledata = true;
        } else {
          this.tabledata = false;
        }
      });
  };

  delete(id) {
    if (confirm('Are you sure?')) {
      let formBody = {}
      formBody['method'] = 'delete';
      formBody['_id'] = id;
      formBody['Date'] = this.date;
      this.apiCallservice.handleData_New_python('booking', 1, formBody, 1)
        .subscribe((res) => {
          alert(res['Status']);
          let bb;
          let j = 0;
          this.finolexdetailslist.forEach((res) => {
            if (res._id == id) { bb = j; }
            j = j + 1;
          })
          this.finolexdetailslist.splice(bb, 1);
        });
    }
  }
  showUpdate(data) {
    this.updateDataContent = data;

    this.updateDate = data.Date.slice(-2);
    this.updatenop = data.partyDetails[0].name;
    this.updatelrno = data.lrno;
    this.updatetruckno = data.ownerDetails[0].truckno;
    this.updateplace = data.villageDetails[0].village_name;
    this.updatehamt = data.hamt;
    this.show = !this.show;
  }
  update() {
    let formBody = {};
    formBody['Date'] = this.handlefunction.getDate(parseInt(this.updateDate), this.handlefunction.getMonthNumber(this.month), this.y);
    formBody['partyid'] = this.gstdetailslistid['_id'] === undefined ? this.updateDataContent.partyDetails[0]._id : this.gstdetailslistid['_id'];
    formBody['ownerid'] = this.ownerdetailslistid['_id'] === undefined ? this.updateDataContent.ownerDetails[0]._id : this.ownerdetailslistid['_id'];
    formBody['lrno'] = this.updatelrno;
    if (this.updateDataContent.villageDetails[0].village_name === this.updateplace) {
      formBody['placeid'] = this.updateDataContent.villageDetails[0]._id;
    }
    else {
      formBody['placeid'] = this.handlefunction.findplace(this.updateplace);
    }

    formBody['hamt'] = this.updatehamt;
    formBody['method'] = 'update';
    formBody['_id'] = this.updateDataContent['_id'];

    this.apiCallservice.handleData_New_python('booking', 1, formBody, 1)
      .subscribe((res) => {
        alert(res['Status']);
        this.show = false;
        this.find();
      });
  }


  findgst() {
    this.gstdetailslistid = this.handlefunction.findgst(this.updatenop, this.gstdetailslist);
  }

  findowner() {
    this.ownerdetailslistid = this.handlefunction.findowner(this.updatetruckno, this.ownerdetailslist);
  }
  back() {
    this.show = !this.show;
  }
  exportAsXLSX(): void {

    this.createData(this.finolexdetailslist)
      .then((data) => {
        this.excelService.exportAsExcelFile(data, 'GST_ACCOUNT_DETAILS_' + this.month + '_' + this.year);
      });
  }

  createData(value) {
    const promise = new Promise((resolve, reject) => {
      const dataArray = [];
      value.forEach(element => {
        dataArray.push({
          'Date': element.Date,
          'Lrno': element.lrno,
          'From Party': 'Finolex Industries Limited',
          'From Party GST': '27AAACF2634A1Z9',
          'Name Of Party': element.partyDetails[0].name,
          'To Party GST': element.partyDetails[0].gst,
          'Truck No': element.ownerDetails[0].truckno,
          'Hire Amount': element.hamt,
          'Place': element.villageDetails[0].village_name,
          'Owner Name': element.ownerDetails[0].oname,
          'PAN': element.ownerDetails[0].pan
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
