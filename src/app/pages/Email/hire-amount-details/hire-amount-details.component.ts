import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { Consts } from '../../../common/constants/const';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Router } from '@angular/router';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';

export interface Model {
  date: string;
  truckNo: string;
  lrno: string;
  amount: string;
  particulars: string;
  dest: string;
}

@Component({
  selector: 'app-hire-amount-details',
  templateUrl: './hire-amount-details.component.html',
  styleUrls: ['./hire-amount-details.component.css'],
  providers: [ApiCallsService]
})
export class HireAmountDetailsComponent implements OnInit, AfterViewInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public villagenamelist: any;
  public response: any;
  public monthno: number;
  public days = [];
  public now = new Date();
  public monthNames = Consts.monthNames;
  public yearNames = ['2019', '2020'];
  public hireExtendingMoney = [];
  public alertBoxSuccess = false;
  public dbName = 1;
  public commonArray;
  ownerdetailslist = [];
  villagelist = [];
  dataArray = [];


  public validComment = '';

  constructor(public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService,
    public handlefunction: handleFunction,
    public router: Router,
    public ds: ObsServiceService) {
    this.days = this.handlefunction.generateDays();
  }



  ngOnInit() {

    this.commonArray = this.securityCheck.commonArray;
    this.ownerdetailslist = [];
    this.villagelist = [];
    this.ownerdetailslist = this.commonArray.ownerdetails;
    this.villagelist = this.commonArray.villagenames;

    this.hireExtendingMoney = this.handlefunction.getMoney();
    this.commonArray = this.securityCheck.commonArray;
    this.myFormGroup = this.formBuilder.group({
      date: [''],
      truckNo: ['', Validators.required],
      lrno: ['', [Validators.required, Validators.pattern('^[0-9]{4}')]],
      amount: ['', Validators.required],
      particulars: ['Lorry Freight', Validators.required],
      dest: ['', Validators.required]
    });

    this.villagenamelist = this.commonArray.villagenames;

  }

  ngAfterViewInit() {
    if (confirm('Are you sure to Enter this Page?')) {
      setTimeout(() => {
        this.balanceFollow();
      }, 500);

    } else {
      this.router.navigate(['Navigation'])
    }
  }
  commenting(data) {
    let comment = prompt(data);
    comment = (typeof (comment) === 'string') ? comment.trim() : comment;
    if (comment === null) {
      this.validComment = '';
    }
    else if (comment === '') {
      alert('Please' + data);
      this.commenting(data);
    } else {
      this.validComment = comment;
    }
  }
  balanceFollow() {
    const BFArray = {};
    this.validComment = '';
    if (confirm("Balance follow ?")) {
      this.commenting('Enter the Balance Follow Up Message');
      if (this.validComment) {
        const BFMsg = this.validComment;
        this.validComment = '';
        this.commenting('Enter Amount');
        const BF = this.validComment;
        BFArray['BF'] = BF;
        BFArray['BFMsg'] = BFMsg;
        this.dataArray['BFDetails'] = BFArray;
        this.ds.addData({ 'BFDetails': BFArray });
        this.dataArray = [];
      }
    } else {
      if (confirm('Are you sure you dont have a Balance Follow Up?')) {
        this.ds.addData({ 'BFDetails': { 'BF': '', 'BFMsg': '' } });
      } else {
        this.balanceFollow();
      }

    }

  }

  storeGstDetailsData({ value, valid }: { value: Model, valid: boolean }) {
    this.submitted = true;
    this.dataArray.push(value);
    this.back();
  }

  back() {
    this.myFormGroup.patchValue({ date: '' });
    this.myFormGroup.patchValue({ truckNo: '' });
    this.myFormGroup.patchValue({ lrno: '' });
  }
  Proceed() {
    if (this.dataArray.length === 0) {
      alert('Please Enter Atleast one Account Details.')
    } else {
      if (confirm('Done with the Account Details?')) {
        this.ds.addData({ 'AccountDetails': this.dataArray });
        this.router.navigate(['Navigation/Email_Handler/Payments']);
      }
    }


  }
}
