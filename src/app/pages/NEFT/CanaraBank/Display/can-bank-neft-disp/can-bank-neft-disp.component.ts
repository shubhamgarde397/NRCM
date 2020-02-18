import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-can-bank-neft-disp',
  templateUrl: './can-bank-neft-disp.component.html',
  styleUrls: ['./can-bank-neft-disp.component.css'],
  providers: [ApiCallsService]
})
export class CanBankNeftDispComponent implements OnInit {
  public accType = 0;
  public modelaccno: any;
  public modelIFSC: any;
  public modelBankName: any;
  public modelMobileNumber: any;
  public modelName: any;
  public modelSummary: any;
  public canBankNeftdetailslist;
  public show = false;
  public found;
  public arr;
  public copy: any;
  public myFormGroup: FormGroup;
  public dbName;
  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService,
    public router: Router, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  find() {
    if (this.accType === 0) {
      this.apiCallservice.handleData_New(this.dbName, 'CanaraBankNEFT/getCanBankNEFTDetails', 1, 0)
        .subscribe((res: Response) => {
          this.canBankNeftdetailslist = res;
        });
    }
    if (this.accType !== 0) {
      this.apiCallservice.handleData_New(this.dbName, 'CanaraBankNEFT/getCanBankNEFTDetailsByID', 1, 1, {}, this.accType)
        .subscribe((res: Response) => {
          this.canBankNeftdetailslist = res;
        });
    }
  }

  deleteOwnerDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'CanaraBankNEFT/delCanBankNEFTDetails', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.find();
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/CanaraBankNeft_HANDLER/CanaraBankNeftUpdate']);
  }

  getMobileNumber(i) {
    this.modelName = i.name;
    this.modelMobileNumber = i.mobileNo;
    this.modelBankName = i.bankName;
    this.modelIFSC = i.IFSC;
    this.modelaccno = i.accno;
    this.modelSummary = i.summary;
  }
  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      accType: [12],
    });
    this.find();
  }
}
