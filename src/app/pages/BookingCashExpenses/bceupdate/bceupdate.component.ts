import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-bceupdate',
  templateUrl: './bceupdate.component.html',
  styleUrls: ['./bceupdate.component.css'],
  providers: [ApiCallsService]
})
export class BCEUpdateComponent implements OnInit {
  show: boolean;
  public nopid;
  togglemenu: boolean;
  ownerdetailslistid: any;
  trucknoid: string;
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;
  public villagelist;
  public ownerdetailslist;
  public hireExtendingMoney = [];
  public gstdetailslist: any;
  public showData = true;

  public date: string;
  public nop: string;
  public truckNo: string;
  public lrno: string;
  public place: string;
  public hireAmount: string;
  public Payment: string;
  public dbName;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public router: Router,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.fetchBasic();
    this.nop = this.handledata.Data.nameOfParty;
    this.truckNo = this.handledata.Data.data.truckNo;
    if (this.handledata.Data.lrnoP === 'hire') {
      this.showData = false;
      this.myFormGroup = this.formBuilder.group({
        date: [this.handledata.Data.data.date, Validators.required],
        nop: [this.handledata.Data.nameOfParty],
        truckNo: [this.handledata.Data.data.truckNo, Validators.required],
        lrno: [this.handledata.Data.data.lrno, Validators.required],
        place: [this.handledata.Data.data.place, Validators.required],
        hireAmount: [this.handledata.Data.data.hireAmount],
      });
    } else if (this.handledata.Data.lrnoP === 'payment') {
      this.showData = true;
      this.myFormGroup = this.formBuilder.group({
        date: [this.handledata.Data.data.date, Validators.required],
        nop: [this.handledata.Data.nameOfParty],
        Payment: [this.handledata.Data.data.Payment]
      });
    }
  }

  fetchBasic() {
    this.apiCallservice.handleData_New('NRCM_Information', 'ownerDetails/getOwnerDetails', 1, 0)
      .subscribe((res: Response) => {
        this.ownerdetailslist = res;
      });

    this.apiCallservice.handleData_New('NRCM_Information', 'gstDetails/getGSTDetails', 1, 0)
      .subscribe((res: Response) => {
        this.gstdetailslist = res;
      });
    this.apiCallservice.handleData_New('NRCM_Information', 'Village/getVillageData', 1, 0)
      .subscribe((res: Response) => {
        this.villagelist = res;
      });
  }

  back() {
    this.show = !this.show;
    this._location.back();
  }

  change = function (data) {
    if (confirm('Please make changes in BCE of ' + this.handledata.Data.nameOfParty + 'with date as ' + this.handledata.Data.data.date)) {
      data.value.id = this.handledata.Data.data._id;
      this.apiCallservice.handleData_New(this.dbName, 'bookingCashExpenses/updatebookingCashExpenses', 3, 0, data.value)
        .subscribe((response: Response) => {
          this.router.navigate(['Navigation/CanaraBankPayment_HANDLER']);
        });
    }
  };
}
