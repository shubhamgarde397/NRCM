import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-can-bank-payment-disp',
  templateUrl: './can-bank-payment-disp.component.html',
  styleUrls: ['./can-bank-payment-disp.component.css'],
  providers: [ApiCallsService]
})
export class CanBankPaymentDispComponent implements OnInit {
  public accType = 0;
  public canBankPaymentdetailslist;
  public show = false;
  public myFormGroup: FormGroup;
  public dbName = 1;
  constructor(
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public router: Router,
    public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService
  ) {
  }


  find() {
    if (this.accType === 0) {
      this.apiCallservice.handleData_New(this.dbName, 'CanaraBankPayment/getCanBankPaymentDetails', 1, 0)
        .subscribe((res: Response) => {
          this.canBankPaymentdetailslist = res;
        });
    }
    if (this.accType !== 0) {
      this.apiCallservice.handleData_New(this.dbName, 'CanaraBankPayment/getCanBankPaymentDetailsByID', 1, 1, {}, this.accType)
        .subscribe((res: Response) => {
          this.canBankPaymentdetailslist = res;
        });
    }
  }

  delete = function (id) {
    if (confirm('Please make changes in Bank Cash Expenses of ' + id.nameOfParty + 'with date as ' + id.paymentDate)) {
      this.apiCallservice.handleData_New(this.dbName, 'CanaraBankPayment/deleteCanBankPaymentDetails', 1, 1, {}, id._id)
        .subscribe((response: Response) => {
          this.router.navigate(['Navigation/BCE_HANDLER/BCEDisp']);
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/CanaraBankPayment_HANDLER/CanaraBankPaymentUpdate']);
  }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      accType: [12],
    });
    this.find();
  }
}
