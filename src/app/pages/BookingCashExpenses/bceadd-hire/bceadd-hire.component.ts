import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { bce } from './bce';
import { Consts } from '../../../common/constants/const';
import { handleFunction } from '../../../common/services/functions/handleFunctions';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-bceadd-hire',
  templateUrl: './bceadd-hire.component.html',
  styleUrls: ['./bceadd-hire.component.css'],
  providers: [ApiCallsService, handleFunction]
})
export class BCEAddHireComponent implements OnInit {

  public nopid;
  togglemenu: boolean;
  ownerdetailslistid: any;
  trucknoid: string;
  public myFormGroup: FormGroup;
  public model: bce;
  public modelSubmitted: bce;
  public submitted = false;
  public response: any;
  public villagelist;
  public current_count = '0';
  public ownerdetailslist;
  public hireExtendingMoney = [];
  public gstdetailslist: any;

  public date: string;
  public nop: string;
  public truckNo: string;
  public lrno: string;
  public place: string;
  public hireAmount: string;
  public Payment: string;
  public dbName;
  public commonArray;
  constructor(
    public apiCallservice: ApiCallsService,
    public handlefunction: handleFunction,
    public http: Http,
    public formBuilder: FormBuilder,
    public router: Router,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
    this.commonArray = this.securityCheck.commonArray;
  }

  ngOnInit() {
    this.hireExtendingMoney = this.handlefunction.getMoney();

    this.model = new bce(this.date, this.nop, this.truckNo, this.lrno, this.place, this.hireAmount, this.Payment);
    this.myFormGroup = this.formBuilder.group({
      date: [this.model.date, Validators.required],
      nop: [this.model.nop, Validators.required],
      truckNo: [this.model.truckNo, Validators.required],
      lrno: [this.model.lrno, Validators.required],
      place: [this.model.place, Validators.required],
      hireAmount: [this.model.hireAmount],
      Payment: [this.model.Payment],
    });

    this.ownerdetailslist = this.commonArray.ownerdetails;
    this.gstdetailslist = this.commonArray.gstdetails;
    this.villagelist = this.commonArray.villagenames;
  }

  storeBookingCashExpenses({ value, valid }: { value: bce, valid: boolean }) {
    this.submitted = true;
    this.apiCallservice.handleData_New(this.dbName, 'bookingCashExpenses/addbookingCashExpenses', 1, 1, value, value.nop + 'BCE')
      .subscribe((res) => {
        { alert('Data entered Successfully'); }
      });
  }

  back() {
    this.submitted = !this.submitted;
  }
}
