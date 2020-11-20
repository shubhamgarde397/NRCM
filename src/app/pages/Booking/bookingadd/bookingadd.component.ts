import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { booking } from './booking';
import { Consts } from '../../../common/constants/const';
import { FormsModule } from '@angular/forms';
import { handleFunction } from '../../../common/services/functions/handleFunctions';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { odata } from '../../OwnerDetails/odadd/odata';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';

@Component({
  selector: 'app-bookingadd',
  templateUrl: './bookingadd.component.html',
  styleUrls: ['./bookingadd.component.css'],
  providers: [ApiCallsService, handleFunction]
})

@Input()
export class BookingaddComponent implements OnInit {
  @ViewChild('day') dayElRef: ElementRef;
  public modelO: odata; // mapped it to a variable
  public modelSubmittedO: odata;


  valueForBCE: any;
  valueForLR: any;
  public gstname: string;
  public days = [];
  public yearNames = [];
  public nopid: string;
  public impgstdetailslist: any;
  public monthno;
  public month;
  public year;
  public day;
  public myFormGroup: FormGroup;
  public myFormGroupO: FormGroup;
  public model: booking; // mapped it to a variable
  public modelSubmitted: booking;
  public submitted = false;
  public submittedO = false;
  public response: any;
  public villagelist;
  public monthNames = Consts.monthNames;
  public current_count = '0';
  public now = new Date();
  public d = this.days[this.now.getDate()];
  // public m = this.monthNames[this.now.getMonth()];
  public m;
  public y = '2020';
  public monthDay: number;
  public Date: string;
  public lrno: number;
  public nop: string;
  public PartyGST: string;
  public truckno: string;
  public hamt: string;
  public place: string;
  public Payment: string;
  public OwnerName: string;
  public PAN?: string;
  public PaymentRecDate?: string;
  public amt: string;
  public ownerdetailslist;
  public gstdetailslist;
  public gstdetailslistid;
  public togglemenu = true;
  public ownerdetailslistid;
  public impgstdetailslistid;
  public trucknoid: string;
  public impnopid: string;
  public hireExtendingMoney = [];
  public fullCount;
  public dbName = 1;
  public commonArray;
  public gstID = false;
  public ownerID = false;

  public TruckNo: string; // declared 3 variables
  public Name: string;
  public Pan: string;
  public MobileNo: string;
  public mobilenoauto;
  public role = 6;
  constructor(public apiCallservice: ApiCallsService, public handlefunction: handleFunction,
    public http: Http, public formBuilder: FormBuilder, public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService, public obs: ObsServiceService) {
    this.days = this.handlefunction.generateDays();
    this.yearNames = this.securityCheck.yearNames;
  }


  ngOnInit() {
    this.obs.dateService.subscribe((res: any) => {
      let arr = res.split('_');
      this.m = this.handlefunction.generateMonthName(arr[0]);
      this.y = arr[1];
    })


    this.commonArray = this.securityCheck.commonArray;
    this.hireExtendingMoney = this.handlefunction.getMoney();

    this.model = new booking(this.Date, this.lrno, this.nop, this.PartyGST,
      this.truckno, this.hamt, this.place, this.OwnerName, this.PAN, this.Payment, this.PaymentRecDate, this.amt);
    this.myFormGroup = this.formBuilder.group({
      Date: [this.model.Date, Validators.required],
      nop: [this.model.nop, Validators.required],
      lrno: [this.model.lrno, [Validators.required, Validators.pattern('^[0-9]{4}')]],
      // FromParty: [this.model.FromParty, Validators.required],
      truckno: [this.model.truckno, Validators.required],
      place: [this.model.place, Validators.required],
      hamt: ['0'],
      PaymentRecDate: [this.model.PaymentRecDate],
      Payment: [this.model.Payment],
      amt: [this.model.amt]
    });

    this.modelO = new odata(this.TruckNo, this.Name, this.Pan, this.MobileNo);
    this.myFormGroupO = this.formBuilder.group({
      truckno: [this.modelO.TruckNo, [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[ ]{0,1}[A-Z]{0,2}[ ][0-9]{4}')]],
      oname: [this.modelO.OwnerName, Validators.required],
      pan: [this.modelO.PAN, [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      mobileno: [this.modelO.MobileNo, [Validators.required, Validators.pattern('^[9|8|7|6]{1}[0-9]{9}')]]
    });


    this.fetchBasic();
    this.role = this.securityCheck.role;
  }

  ngAfterViewInit() {
    this.dayElRef.nativeElement.focus();
  }

  fetchBasic() {
    this.ownerdetailslist = [];
    this.gstdetailslist = [];
    this.impgstdetailslist = [];
    this.villagelist = [];
    this.ownerdetailslist = this.commonArray.ownerdetails;
    this.gstdetailslist = this.commonArray.gstdetails;
    this.impgstdetailslist = this.commonArray.impgstdetails;
    this.villagelist = this.commonArray.villagenames;
  }
  storeBookingData1({ value, valid }: { value: booking, valid: boolean }, day) {
    this.spinnerService.show();
    let formBody = {};
    this.monthno = this.handlefunction.getMonthNumber(this.m);
    value.Date = this.handlefunction.getDate(day, this.monthno, this.y);
    formBody['Date'] = value.Date;
    formBody['partyid'] = this.gstdetailslistid._id;
    formBody['ownerid'] = this.ownerdetailslistid._id;
    formBody['frompartyid'] = '1';
    formBody['lrno'] = value.lrno;
    formBody['placeid'] = value.place;
    formBody['PaymentRecDate'] = "";
    formBody['Payment'] = "";
    formBody['amt'] = '0';
    formBody['Check'] = false;
    formBody['recDate'] = '';
    formBody['hamt'] = value['hamt'];
    formBody['method'] = 'insert';
    this.submitted = true;
    this.apiCallservice.handleData_New_python('booking', 1, formBody, 1)
      .subscribe((res: any) => {
        this.spinnerService.hide();
        alert(res.Status);
        this.reset();
      });
  }
  storeBookingData({ value, valid }: { value: booking, valid: boolean }, day) {
    console.log(this.ownerdetailslistid);

    const tab = this.m + this.y;
    this.monthno = this.handlefunction.getMonthNumber(this.m);
    value.Date = this.handlefunction.getDate(day, this.monthno, this.y);
    // value.FromParty = '1';//finolexx show gsstd which is contanct here
    value.FromParty = 'Finolex Industries Limited';
    value.FromPartyGST = '27AAACF2634A1Z9';
    value.ToPartyGST = this.gstdetailslistid.gst;
    value.OwnerName = this.ownerdetailslistid.oname;
    value.PAN = this.ownerdetailslistid.pan;
    // value.truckno = this.ownerdetailslistid.srno;//on display show pan and oname by truckNo
    // value.nop = this.gstdetailslistid.srno;//show to party gst no and place from gst name

    value.truckno = this.ownerdetailslistid.truckno;//on display show pan and oname by truckNo
    value.nop = this.gstdetailslistid.name;//show to party gst no and place from gst name

    // value.PaymentRecDate = '';
    // value.Payment = '';
    value.PaymentRecDate = null;
    value.Payment = null;
    value.amt = '0';
    value['Check'] = false;
    value['recDate'] = '';
    // value['lrno'] = String(value['lrno']);
    // value['place'] = String(value['place']);
    // value['truckno'] = String(value['truckno']);
    // value.place =
    this.submitted = true;
    this.apiCallservice.handleData_New(this.dbName, 'booking/addpartydata', 1, 0, value)
      .subscribe((res) => {
        if (res['done']) {
          alert('Done')
          // this.apiCallservice.handleData_New_Temp('booking', 1, value, this.dbName);
        } else {
          this.toggle();
        }
      });


  }


  findgst() {
    console.log(this.nopid);

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

  back() {
    this.submitted = !this.submitted;
  }

  reset() {
    this.ownerID = false;
    this.gstID = false;
    this.submitted = false;
    this.myFormGroup.patchValue({ nop: '' });
    this.myFormGroup.patchValue({ lrno: '' });
    this.myFormGroup.patchValue({ truckno: '' });
    this.myFormGroup.patchValue({ place: '' });
    this.myFormGroup.patchValue({ hamt: '0' });
    this.myFormGroup.patchValue({ PaymentRecDate: '' });
    this.myFormGroup.patchValue({ Payment: '' });
    this.myFormGroup.patchValue({ amt: '' });
    document.getElementById('Date').focus();
  }
  toggle() {
    this.togglemenu = !this.togglemenu;
    this.fetchBasic();
  }
  refreshData() {
    this.fetchBasic();
  }


  storeOwnerDetailsData({ value, valid }: { value: odata, valid: boolean }) {
    this.submittedO = true;
    this.apiCallservice.handleData_New(0, 'ownerDetails/addownerdetailsdata', 1, 0, value)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['ownerdetails'] = [];
        this.securityCheck.commonArray['ownerdetails'] = res;
        this.fetchBasic();
      });
  }



}
