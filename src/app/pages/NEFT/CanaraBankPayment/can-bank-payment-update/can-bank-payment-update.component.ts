import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-can-bank-payment-update',
  templateUrl: './can-bank-payment-update.component.html',
  styleUrls: ['./can-bank-payment-update.component.css'],
  providers: [ApiCallsService]
})
export class CanBankPaymentUpdateComponent implements OnInit {

  show: boolean;
  nop: any;
  newValue: { date: any; truckNo: any; lrno: string; place: any; hireAmount: any; Payment: any; };
  lrno: any;
  public mobileNo: number;
  public bankuniqudetaillist: Promise<any>;
  public bankdetaillist: Promise<any>;
  public listofnames: Promise<any>;
  public parties: Promise<any>;
  public myFormGroup: FormGroup;
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
  public dbName = 1;
  constructor(
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public handledata: HandleDataService,
    public _location: Location,
    public router: Router,
    public securityCheck: SecurityCheckService
  ) {
  }

  ngOnInit() {
    this.nop = this.handledata.Data.nameOfParty;

    this.myFormGroup = this.formBuilder.group({
      accType: [this.handledata.Data.accType, [Validators.required]],
      transferType: [this.handledata.Data.transferType, [Validators.required]],
      nameOfParty: [this.handledata.Data.nameOfParty],
      lrno: [this.handledata.Data.lrno],
      payment: [this.handledata.Data.payment, [Validators.required]],
      paymentDate: [this.handledata.Data.paymentDate, [Validators.required]],
    });
  }

  change = function (data) {
    if (confirm('Please make changes in Bank Cash Expenses of ' + this.nop + 'with date as ' + this.handledata.Data.paymentDate)) {
      data.value.id = this.handledata.Data._id;
      this.apiCallservice.handleData_New(this.dbName, 'CanaraBankPayment/updateCanBankPaymentDetails', 3, 0, data.value)
        .subscribe((response: Response) => {
          this.router.navigate(['Navigation/BCE_HANDLER/BCEDisp']);
        });
    }
  };

  back() {
    this.show = !this.show;
    this._location.back();
  }

}
