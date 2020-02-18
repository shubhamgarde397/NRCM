import { Component, OnInit, Input } from '@angular/core';
import { canbankpayment } from './canbankpayment';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-can-bank-payment-add',
  templateUrl: './can-bank-payment-add.component.html',
  styleUrls: ['./can-bank-payment-add.component.css'],
  providers: [ApiCallsService]
})

@Input()
export class CanBankPaymentAddComponent implements OnInit {

  newValue: { date: any; truckNo: any; lrno: string; place: any; hireAmount: any; Payment: any; };
  lrno: any;
  public mobileNo: number;
  public bankuniqudetaillist;
  public bankdetaillist;
  public listofnames;
  public parties;
  public myFormGroup: FormGroup;
  public model: canbankpayment;
  public modelSubmitted: canbankpayment;
  public submitted = false;
  public response: any;
  public accType: number;
  public accno: number;
  public accDate: string;
  public paymentDate: string;
  public payment: string;
  public nameOfParty: string;
  public transferType: string;
  public trucknopart: string;
  public namepart: string;
  public banknamepart: string;
  public showBankName: boolean;
  public showPersonName: boolean;
  public showBankNameIFSC: boolean;
  public togglemenu = true;
  public dataGone = false;
  public dbName;
  constructor(
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService
  ) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.model = new canbankpayment(this.accType, this.transferType, this.nameOfParty, this.lrno, this.payment, this.paymentDate);
    this.myFormGroup = this.formBuilder.group({
      accType: [this.model.accType, [Validators.required]],
      transferType: [this.model.transferType, [Validators.required]],
      nameOfParty: [this.model.nameOfParty, [Validators.required]],
      lrno: [this.model.lrno],
      payment: [this.model.payment, [Validators.required]],
      paymentDate: [this.model.paymentDate, [Validators.required]],
    });

    this.fetchParty();
  }

  fetchParty() {
    this.apiCallservice.handleData_New('NRCM_Information', 'gstDetails/getGSTDetails', 1, 0).
      subscribe((res: Response) => {
        this.parties = res;
      });
  }

  storeCanaraPaymentDetailsData({ value, valid }: { value: canbankpayment, valid: boolean }) {
    this.submitted = true;
    this.dataGone = !this.dataGone;
    this.apiCallservice.handleData_New(this.dbName, 'CanaraBankPayment/addCanBankPaymentDetails', 1, 0, value)
      .subscribe((x) => {
        this.newValue = {
          date: value.paymentDate,
          truckNo: null,
          lrno: null,
          place: null,
          hireAmount: null,
          Payment: value.payment
        };
        this.apiCallservice.handleData_New(this.dbName, 'bookingCashExpenses/addbookingCashExpenses',
          1, 1, this.newValue, value.nameOfParty + 'BCE')
          .subscribe((res) => { { alert('Data entered Successfully'); } });
      });
  }

  back() {
    this.submitted = false;
    this.showPersonName = !this.showPersonName;
    this.showBankName = !this.showBankName;
  }

  reLoad() {
    this.submitted = false;
    this.dataGone = !this.dataGone;
    this.ngOnInit();
  }
}
