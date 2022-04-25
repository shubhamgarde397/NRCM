import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-payment-pending-display',
  templateUrl: './payment-pending-display.component.html',
  styleUrls: ['./payment-pending-display.component.css']
})
export class PaymentPendingDisplayComponent implements OnInit {

  public tbl;
  public tblShow=false;
  public myFormGroup: FormGroup;

  public show=false;

  constructor(public apiCallservice: ApiCallsService, 
    public securityCheck: SecurityCheckService, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getInformationData();
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "pendingPaymentJustDisplay", "tablename": ''};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.tblShow=true;
        this.tbl=res.Data;
        console.log(this.tbl);
        
        this.spinnerService.hide();
        
      });
  }
}

