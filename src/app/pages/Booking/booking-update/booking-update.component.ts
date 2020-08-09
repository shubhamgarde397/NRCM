import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Consts } from '../../../common/constants/const';
import { handleFunction } from '../../../common/services/functions/handleFunctions';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { booking } from './booking';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-booking-update',
  templateUrl: './booking-update.component.html',
  styleUrls: ['./booking-update.component.css'],
  providers: [ApiCallsService]
})
export class BookingUpdateComponent implements OnInit {
  public days = [];
  public yearNames = [];
  public nopid: string;
  public impgstdetailslist: any;
  public model: booking;
  public modelSubmitted: booking;
  public monthno: number;
  public month;
  public year;
  public day;
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;
  public villagelist;
  public monthNames = Consts.monthNames;
  public now = new Date();
  public d = this.days[this.now.getDate()];
  public m = this.monthNames[this.now.getMonth()];
  public y = this.now.getFullYear();
  public monthDay: number;
  public Date: string;
  public lrno: number;
  public nop: string;
  public PartyGST: string;
  public _id;
  public FromParty: string;
  public truckno: string;
  public hamt: string;
  public place: string;
  public Payment: string;
  public OwnerName: string;
  public PAN?: string;
  public PaymentRecDate?: string;
  public amt: string;
  public ownerdetailslist; // pan ans owner name
  public gstdetailslist; // gst from part number
  public gstdetailslistid;
  public togglemenu = true;
  public ownerdetailslistid;
  public impgstdetailslistid;
  public trucknoid: string;
  public impnopid: string;
  public show = false;
  public id: string;
  public dbName = 1;
  public commonArray;
  public ownerID = false;
  public gstID = false;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public handlefunction: handleFunction,
    public router: Router,
    public securityCheck: SecurityCheckService
  ) {
    this.days = this.handlefunction.generateDays();
    this.yearNames = this.handlefunction.generateYears();
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.fetchBasic();
    this.model = new booking(this.id, this.Date, this.lrno, this.nop,
      this.PartyGST, this.truckno, this.hamt, this.place, this.OwnerName, this.PAN, this.Payment, this.PaymentRecDate, this.amt);
    this.myFormGroup = this.formBuilder.group({
      Date: [this.handledata.Data.Date, Validators.required],
      nop: [this.handledata.Data.nop, Validators.required],
      lrno: [this.handledata.Data.lrno, [Validators.required, Validators.pattern('^[0-9]{4}')]],
      // FromParty: [this.handledata.Data.FromParty, Validators.required],
      // FromPartyGST: [this.handledata.Data.FromPartyGST],
      truckno: [this.handledata.Data.truckno, Validators.required],
      place: [this.handledata.Data.place, Validators.required],
      hamt: [this.handledata.Data.hamt, Validators.required],
      PaymentRecDate: [this.handledata.Data.PaymentRecDate],
      Payment: [this.handledata.Data.Payment],
      amt: [this.handledata.Data.amt, Validators.required]
    });
    this._id = this.handledata.Data._id;
    this.Date = this.handledata.Data.Date.slice(8, 10);
    this.m = this.handlefunction.generateMonthName(this.handledata.Data.Date.slice(5, 7));
    this.y = this.handledata.Data.Date.slice(0, 4);
    this.truckno = this.handledata.Data.truckno;
    this.nop = this.handledata.Data.nop;
    this.FromParty = this.handledata.Data.FromParty;
    this.place = this.handledata.Data.place;
    // this.impgstdetailslistid = { 'gst': this.handledata.Data.FromPartyGST, 'dest': this.handledata.Data.place }
  }

  fetchBasic() {
    this.ownerdetailslist = this.commonArray.ownerdetails;
    this.gstdetailslist = this.commonArray.gstdetails;
    this.villagelist = this.commonArray.villagenames;
  }

  findgst() {
    this.gstdetailslistid = this.handlefunction.findgst(this.nopid, this.gstdetailslist);
    this.gstID = true;
  }

  findowner() {
    this.ownerdetailslistid = this.handlefunction.findowner(this.trucknoid, this.ownerdetailslist);
    this.ownerID = true;
  }

  findimpgst() {
    this.apiCallservice.handleData_New(0, 'impGstDetails/getImpGSTDetailsbyid', 1, 1, {}, this.impnopid)
      .subscribe((res: Response) => {
        this.impgstdetailslistid = res;
      });
  }
  change = function ({ value, valid }: { value: booking, valid: boolean }) {

    this.m = this.handlefunction.getMonthNumber(this.m);
    value.Date = this.handlefunction.sliceDate(this.Date, this.m, this.y);
    value.FromParty = 'Finolex Industries Limited';
    value.FromPartyGST = '27AAACF2634A1Z9';
    value.ToPartyGST = this.gstdetailslistid[0].gst;
    value.OwnerName = this.ownerdetailslistid[0].oname;
    value.PAN = this.ownerdetailslistid[0].pan;
    value.nop = this.gstdetailslistid[0].name;
    value.id = this.handledata.Data._id;

    this.valueForBCE = {
      date: value.Date,
      truckNo: null,
      lrno: null,
      place: null,
      hireAmount: null,
      Payment: value.Payment
    };

    if (this.handledata.Data.Payment !== value.Payment) {
      this.apiCallservice.handleData_New(this.dbName, 'bookingCashExpenses/addbookingCashExpenses', 1, 1,
        this.valueForBCE, this.handledata.Data.nop + 'BCE')
        .subscribe((res) => {
        });
    }

    if (this.handledata.Data.lrno !== value.lrno) {
      this.change = { 'oldLrno': this.handledata.Data.lrno, 'newLrno': value.lrno };
      this.apiCallservice.handleData_New(this.dbName, 'change/addChangeDetails', 1, 0, this.change)
        .subscribe((res) => { });
    }

    if (value.nop === this.nop) {
      this.apiCallservice.handleData_New(this.dbName, 'booking/updateBookingData', 3, 1, value, this.nop)
        .subscribe((response: Response) => {
          if (value.lrno !== this.handledata.Data.lrno) {
            if (confirm('You have changed the LRNO, You are now being redirected to change the LRNO')) {
              this.router.navigate(['Change']);
            }
          } else {
            this.show = !this.show;
            this._location.back();
          }
        });
    } else {
      this.apiCallservice.handleData_New(this.dbName, 'booking/delBookingdetailsdata', 2, 2, {}, value.id, this.nop)
        .subscribe((response: Response) => {
          this.newValue = {
            'Date': value.Date,
            'nop': value.nop,
            'lrno': value.lrno,
            'truckno': value.truckno,
            'place': value.place,
            'hamt': value.hamt,
            'PaymentRecDate': value.PaymentRecDate,
            'Payment': value.Payment,
            'amt': value.amt,
            'FromParty': value.FromParty,
            'FromPartyGST': value.FromPartyGST,
            'ToPartyGST': value.ToPartyGST,
            'OwnerName': value.OwnerName,
            'PAN': value.PAN,
          };

          this.apiCallservice.handleData_New(this.dbName, 'booking/addbookingdata', 1, 1, this.newValue, value.nop)
            .subscribe((res) => {

              if (value.lrno !== this.handledata.Data.lrno) {
                if (confirm('You have changed the LRNO, You are now being redirected to change the LRNO')) {
                  this.router.navigate(['Change']);
                }
              } else {
                this.show = !this.show;
                this._location.back();
              }
            });
        });
    }
  };

  back() {
    this.show = !this.show;
    this._location.back();
  }
}
