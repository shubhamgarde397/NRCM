import { Component, OnInit } from '@angular/core';
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
import { ExcelService } from 'src/app/common/services/sharedServices/excel.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


export interface Model {
  date: string;
  amount: string;
}
export interface EmailModel {
  toReceive: string;
  password: string;

}

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
  providers: [ApiCallsService]
})


export class PaymentDetailsComponent implements OnInit {
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
  public dataArray = [];
  public showTable = false;
  public mainArray = [];
  public paymentUpdateData: any = [];
  public accountUpdateData: any = [];
  public balanceUpdateData: any = [];
  public AccountModeDelete = false;
  public AccountModeUpdate = false;
  public PaymentModeDelete = false;
  public PaymentModeUpdate = false;
  public BalanceModeDelete = false;
  public BalanceModeUpdate = false;

  public GlobalIndex = 0;
  public myFormGroupE: FormGroup;
  public receivers = [
    { 'viewValue': 'Shubham Garde', 'value': 'shubham.garde397@gmail.com', },
    { 'viewValue': 'R Raja', 'value': 'mla.kanchi@gmail.com' },
    { 'viewValue': 'SS Agency', 'value': 'ssfinolexpipe@gmail.com' },
    { 'viewValue': 'Jaya Laxmi Stores', 'value': 'jksbrothers333@gmail.com' },
    { 'viewValue': 'K2 Polymers', 'value': 'k2polymers2018@gmail.com' },
    { 'viewValue': 'Ganapathy Irritec', 'value': 'ganafino@gmail.com' },
    { 'viewValue': 'Sekar And Co Karur', 'value': 'sekarandcokrr@gmail.com' },
    { 'viewValue': 'Arcot Electricals', 'value': 'arcotelectricals4155@gmail.com' },
    { 'viewValue': 'GB COmmercials', 'value': 'gbcommercialhosur@yahoo.co.in' },
    { 'viewValue': 'NRCM', 'value': 'punenitinroadways@gmail.com' }
  ];
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService,
    public handlefunction: handleFunction, public router: Router,
    public ds: ObsServiceService,
    public excelService: ExcelService,
    public spinner: Ng4LoadingSpinnerService) {
    this.days = this.handlefunction.generateDays();
  }

  ngOnInit() {

    this.ds.dataService.subscribe((res) => {
      this.mainArray = res;
    });
    this.commonArray = this.securityCheck.commonArray;
    this.hireExtendingMoney = this.handlefunction.getMoney();
    this.commonArray = this.securityCheck.commonArray;
    this.myFormGroup = this.formBuilder.group({
      date: [''],
      amount: ['', Validators.required]
    });
    this.myFormGroupE = this.formBuilder.group({
      toReceive: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  storeGstDetailsData({ value, valid }: { value: Model, valid: boolean }) {
    this.submitted = true;
    this.dataArray.push(value);
    this.back();
  }

  back() {
    this.myFormGroup.patchValue({ date: '' });
    this.myFormGroup.patchValue({ amount: '' });
  }
  Proceed() {
    if (confirm('Done with the Account Details?')) {
      this.ds.addData({ 'PaymentDetails': this.dataArray });
      this.showTable = true;
    }
  }

  update(index, type) {
    this.GlobalIndex = index;
    switch (type) {
      case 'account':
        this.accountUpdateData = this.mainArray[1].AccountDetails[index];
        this.tf(false, true, false, false, false, false);
        break;
      case 'payment':
        this.paymentUpdateData = this.mainArray[2].PaymentDetails[index];
        this.tf(false, false, false, true, false, false);
        break;
      case 'balance':
        this.balanceUpdateData = this.mainArray[0].BFDetails;
        this.tf(false, false, false, false, false, true);
        break
    }
  }
  resetArray() {
    this.ds.resetData();
    this.router.navigate(['Navigation'])
  }
  delete(index, type) {
    this.ds.deleteData(index, type);
  }
  finalUpdate(type, data1 = '', data2 = '', data3 = '', data4 = '', data5 = '', data6 = '') {
    switch (type) {
      case 'account':
        this.ds.updateData({ date: data1, truckNo: data4, lrno: data5, amount: data6, particulars: data2, dest: data3 }, this.GlobalIndex, type);
        break;
      case 'payment':
        this.ds.updateData({ date: data1, amount: data2 }, this.GlobalIndex, type);
        break;
      case 'balance':
        this.ds.updateData({ BF: data1, BFMsg: data2 }, this.GlobalIndex, type);
        break;
    }
  }

  tf(ad, au, pd, pu, bd, bu) {
    this.AccountModeDelete = ad;
    this.AccountModeUpdate = au;
    this.PaymentModeDelete = pd;
    this.PaymentModeUpdate = pu;
    this.BalanceModeDelete = bd;
    this.BalanceModeUpdate = bu;
  }
  // send json to server and create an excel saev it in a directory and download the file to client
  downloadExcel() {
    this.apiCallservice.handleData_New(this.dbName, 'EmailEveryMonth/download', 1, 0, { 'toReceive': this.myFormGroupE.value.toReceive })
      .subscribe((res) => {
        alert('Done');
      })
    // this.excelService.exportAsExcelFile(this.mainArray, 'AccountDetails');
  }

  sendMail({ value, valid }: { value: EmailModel, valid: boolean }) {
    this.spinner.show();
    this.mainArray[3] = { 'toReceive': value.toReceive };
    this.mainArray[4] = { 'Password': value.password };
    this.apiCallservice.handleData_New(this.dbName, 'EmailEveryMonth/dowloadExcel', 4, 0,
      this.mainArray
    ).subscribe((res: Response) => {
      this.apiCallservice.handleData_New(this.dbName, 'EmailEveryMonth/sendFile', 1, 0,
        this.mainArray
      ).subscribe((res: Response) => {
        alert('Mail has been sent successfully');
        this.spinner.hide();
      });
    });
  }
}
