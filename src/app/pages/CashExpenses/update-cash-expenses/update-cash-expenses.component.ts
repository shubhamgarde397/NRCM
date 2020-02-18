import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-update-cash-expenses',
  templateUrl: './update-cash-expenses.component.html',
  styleUrls: ['./update-cash-expenses.component.css'],
  providers: [ApiCallsService]
})
export class UpdateCashExpensesComponent implements OnInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;

  public TruckNo: string;
  public Date: string;
  public Payment: number;
  public Diesel: number;
  public Cash: number;
  public NEFT: number;
  public regulartrucklist: any;

  public togglemenu = true;
  public dbName;
  constructor(
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public handledata: HandleDataService,
    public _location: Location,
    public securityCheck: SecurityCheckService
  ) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.fetchBasic();
    this.myFormGroup = this.formBuilder.group({
      Date: [this.handledata.Data.Date, [Validators.required]],
      TruckNo: [this.handledata.Data.TruckNo, [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[ ]{0,1}[A-Z]{0,2}[ ][0-9]{4}')]],
      Diesel: [this.handledata.Data.Diesel, Validators.required],
      Cash: [this.handledata.Data.Cash, Validators.required],
      NEFT: [this.handledata.Data.NEFT, Validators.required]
    });
    this.TruckNo = this.handledata.Data.TruckNo;
  }

  fetchBasic() {
    this.apiCallservice.handleData_New('NRCM_Information', 'regularTruck/getregulartruckdata', 1, 0)
      .subscribe((res: Response) => {
        this.regulartrucklist = res;
      });
  }
  update = function (data) {
    data.value.id = this.handledata.Data._id;
    this.apiCallservice.handleData_New(this.dbName, 'cashExpenses/updateCashExpenses', 3, 0, data.value)
      .subscribe((response: Response) => {
        this._location.back();
      });
  };

  back() {
    this._location.back();
  }
}
