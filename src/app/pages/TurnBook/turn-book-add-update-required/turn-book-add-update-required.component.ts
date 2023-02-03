import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Consts } from '../../../common/constants/const';
import { FormsModule } from '@angular/forms';
import { handleFunction } from '../../../common/services/functions/handleFunctions';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { odata } from '../../OwnerDetails/odadd/odata';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';

@Component({
  selector: 'app-turn-book-add-update-required',
  templateUrl: './turn-book-add-update-required.component.html',
  styleUrls: ['./turn-book-add-update-required.component.css']
})
export class TurnBookAddUpdateRequiredComponent implements OnInit {
  public modelO: odata;
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
  public submitted = false;
  public submittedO = false;
  public response: any;
  public villagelist;
  public monthNames = Consts.monthNames;
  public current_count = '0';
  public now = new Date();
  public d = this.days[this.now.getDate()];
  public m;
  public y = '2020';
  public monthDay: number;
  public Date: string;
  public lrno: number;
  public nop: string;
  public date = new Date();
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

  public TruckNo: string;  
  public Name: string;
  public Pan: string;
  public MobileNo: string;
  public mobilenoauto;
  public considerArray;
  constructor(public apiCallservice: ApiCallsService, public handlefunction: handleFunction,
    public http: Http, public formBuilder: FormBuilder, public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService, public obs: ObsServiceService, public handledata: HandleDataService) {
    this.days = this.handlefunction.generateDays();
    this.yearNames = this.securityCheck.yearNames;
  }


  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.hireExtendingMoney = this.handlefunction.getMoney();

    this.myFormGroup = this.formBuilder.group({
      loadingDate: ['', Validators.required],
      party: ['', Validators.required],
      lrno: ['', [Validators.required, Validators.pattern('^[0-9]{4}')]],
      truckno: ['', Validators.required],
      place: ['', Validators.required],
      amount: [''],
    });
    this.considerArray = this.handledata.createConsiderArray('booking')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.ownerdetailslist = [];
    this.gstdetailslist = [];
    this.villagelist = [];
    this.ownerdetailslist = this.commonArray.ownerdetails;
    this.gstdetailslist = this.commonArray.gstdetails;
    this.villagelist = this.commonArray.villagenames;
  }
  storeBookingData1({ value, valid }: { value: [{}], valid: boolean }) {
    this.spinnerService.show();
    let formBody = {};
    this.monthno = this.handlefunction.getMonthNumber(this.m);
    formBody['loadingDate'] = value['loadingDate'];
    formBody['partyid'] = this.gstdetailslistid._id;
    formBody['ownerid'] = this.ownerdetailslistid._id;
    formBody['frompartyid'] = '5b15fa76bb8aa51564e0561f';
    formBody['lrno'] = value['lrno'];
    formBody['placeid'] = value['place'];
    formBody['hamt'] = value['amount'];
    formBody['partyType'] = 'NRCM';
    formBody['entryDate'] = this.date.getFullYear() + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getMonth() + 1)) + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getDate()));
    formBody['turnbookDate'] = value['loadingDate'];
    formBody['truckno'] = this.ownerdetailslistid.truckno;
    formBody['advance'] = '';
    formBody['balance'] = '';
    formBody['pochDate'] = '';
    formBody['pochPayment'] = false;
    formBody['pgno'] = 0;
    formBody['input'] = 'portal'

    formBody['tablename'] = 'turnbook';
    formBody['method'] = 'insert,old';

    this.submitted = true;
    this.apiCallservice.handleData_New_python('turnbook', 1, formBody, 1)
      .subscribe((res: any) => {
        this.spinnerService.hide();
        alert(res.Status);
        this.reset();
      });
  }

  findgst() {
    this.gstdetailslistid = this.handlefunction.findgst(this.nopid, this.gstdetailslist);
    this.gstID = true;
  }

  findowner() {
    this.ownerdetailslistid = this.handlefunction.findowner(this.trucknoid, this.ownerdetailslist, 'Select Truck Number');
    this.ownerID = true;
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
    document.getElementById('Date').focus();
  }
}



