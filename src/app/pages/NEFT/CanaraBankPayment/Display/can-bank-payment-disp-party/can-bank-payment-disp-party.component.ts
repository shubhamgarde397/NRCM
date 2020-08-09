import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../../common/services/ApiCalls/ApiCalls.service';
import { Consts } from '../../../../../common/constants/const';
import { SecurityCheckService } from '../../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-can-bank-payment-disp-party',
  templateUrl: './can-bank-payment-disp-party.component.html',
  styleUrls: ['./can-bank-payment-disp-party.component.css'],
  providers: [ApiCallsService]
})
export class CanBankPaymentDispPartyComponent implements OnInit {
  public canBankPaymentdetailslist;
  public monthNames = Consts.monthNames;
  public tabledata = false;
  public nameOfParty;
  public parties: any;
  public showcount;
  public moreDetailsOfTruck = true;
  public bookingnamelist;
  public dbName = 1;
  constructor(public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {

    this.apiCallservice.handleData_New(0, 'gstDetails/getGSTDetails', 1, 0).
      subscribe((res: Response) => {
        this.parties = res;
      });
  }

  find() {
    this.apiCallservice.handleData_New(this.dbName, 'CanaraBankPayment/getCanBankPaymentDetailsByParty', 1, 1, {}, this.nameOfParty)
      .subscribe((res: Response) => {
        this.canBankPaymentdetailslist = res;
        this.showcount = Object.keys(this.canBankPaymentdetailslist)[0];
      });
  }


}
