import { Component, OnInit, Input } from '@angular/core';
import { canbankneft } from './canbankneft';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-can-bank-neft-add',
  templateUrl: './can-bank-neft-add.component.html',
  styleUrls: ['./can-bank-neft-add.component.css'],
  providers: [ApiCallsService]
})

@Input()
export class CanBankNeftAddComponent implements OnInit {

  public mobileNo: number;
  public bankuniqudetaillist: any;
  public bankdetaillist: any;
  public listofnames: any;
  public truckbankdetailslist: any;
  public myFormGroup: FormGroup;
  public model: canbankneft; // mapped it to a variable
  public modelSubmitted: canbankneft;
  public submitted = false;
  public response: any;
  public accType: number;
  public accno: number;
  public accDate: string;
  public paymentDate: string;
  public bankName: string;
  public truckNo: string;
  public name: string;
  public IFSC: string;
  public amt: number;
  public summary: string;
  public transferType: string;
  public trucknopart: string;
  public namepart: string;
  public banknamepart: string;
  public showBankName: boolean;
  public showPersonName: boolean;
  public showBankNameIFSC: boolean;
  public togglemenu = true;
  public dbName = 1;
  constructor(
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService
  ) {
  }

  ngOnInit() {
    this.model = new canbankneft(this.accType, this.accno, this.accDate, this.paymentDate,
      this.bankName, this.truckNo, this.name, this.IFSC, this.amt, this.summary, this.transferType, this.mobileNo);
    this.myFormGroup = this.formBuilder.group({
      accType: [this.model.accType, [Validators.required]],
      accDate: [this.model.accDate, [Validators.required]],
      truckNo: [this.model.truckNo, [Validators.required]],
      name: [this.model.name, [Validators.required]],
      bankName: [this.model.bankName, [Validators.required]],
      IFSC: [this.model.IFSC, [Validators.required]],
      accno: [this.model.accno, [Validators.required]],
      amt: [this.model.amt, [Validators.required]],
      summary: ['Advance', [Validators.required]],
      transferType: [this.model.transferType, [Validators.required]],
      paymentDate: [this.model.paymentDate],
      mobileNo: [this.model.mobileNo]
    });

    this.fetchTruckBankDetails();
  }

  fetchTruckBankDetails() {
    this.apiCallservice.handleData_New(0, 'truckBankDetails/getTruckBankDetails', 1, 0).
      subscribe((res: Response) => {
        this.truckbankdetailslist = res;
      });
  }

  findbd() {
    this.apiCallservice.handleData_New(0, 'truckBankDetails/getTruckBankDetailsbyid', 1, 1, {}, this.trucknopart)
      .subscribe((res: Response) => {
        this.listofnames = res;
        this.myFormGroup.patchValue({ bankName: '' });
        this.myFormGroup.patchValue({ IFSC: '' });
        this.myFormGroup.patchValue({ accno: '' });
        this.showPersonName = true;
      });
  }

  findbankdetails() {
    this.apiCallservice.handleData_New(0, 'bankDetails/getBankDetailsbyid', 1, 1, {}, this.namepart)
      .subscribe((res: Response) => {
        this.bankdetaillist = res;
        this.showBankName = true;
      });
  }

  finduniquebankdetails() {
    this.apiCallservice.handleData_New(0, 'bankDetails/getUniqueBankDetailsbyid',
      1, 2, {}, this.banknamepart, this.namepart)
      .subscribe((res: Response) => {
        this.bankuniqudetaillist = res;
        this.showBankNameIFSC = true;
        if (!this.bankuniqudetaillist[0]) {
          this.myFormGroup.patchValue({ IFSC: '' });
          this.myFormGroup.patchValue({ accno: '' });
          this.spinnerService.hide();
        } else {
          this.myFormGroup.patchValue({ IFSC: this.bankuniqudetaillist[0].IFSC });
          this.myFormGroup.patchValue({ accno: this.bankuniqudetaillist[0].Accno });
          this.spinnerService.hide();
        }
      });
  }

  storeCanaraNEFTDetailsData({ value, valid }: { value: canbankneft, valid: boolean }) {
    this.submitted = true;
    this.apiCallservice.handleData_New(this.dbName, 'CanaraBankNEFT/addCanBankNEFTDetails', 1, 0, value)
      .subscribe((x) => {
        this.storeCashExpenses(value);
      });
  }

  storeCashExpenses(value) {
    const valueToSend = {
      'Date': value.accDate,
      'TruckNo': value.truckNo,
      'Diesel': 0,
      'Cash': 0,
      'NEFT': value.amt
    };
    this.apiCallservice.handleData_New(this.dbName, 'cashExpenses/addCashExpenses', 1, 0, valueToSend)
      .subscribe(x => { alert('Data entered Successfully'); });
  }

  back() {
    this.submitted = false;
    this.showPersonName = !this.showPersonName;
    this.showBankName = !this.showBankName;
  }

  reLoad() {
    this.submitted = false;
    this.showPersonName = false;
    this.showBankName = false;
    this.ngOnInit();
  }

  toggle() {
    this.togglemenu = !this.togglemenu;
    this.fetchTruckBankDetails();
  }
}
