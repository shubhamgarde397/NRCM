import { Component, OnInit } from '@angular/core';
import { addCash } from './addCash';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-add-cash-expenses',
  templateUrl: './add-cash-expenses.component.html',
  styleUrls: ['./add-cash-expenses.component.css'],
  providers: [ApiCallsService]
})
export class AddCashExpensesComponent implements OnInit {

  public myFormGroup: FormGroup;
  public model: addCash;
  public modelSubmitted: addCash;
  public submitted = false;
  public response: any;

  public TruckNo: string;
  public Date: string;
  public Payment: number;
  public Diesel;
  public Cash: number;
  public NEFT: number;
  public regulartrucklist: any;

  public togglemenu = true;
  public dbName = 1;
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {
    this.model = new addCash(this.Date, this.TruckNo, this.Diesel, this.Cash, this.NEFT);
    this.myFormGroup = this.formBuilder.group({
      Date: [this.model.Date, [Validators.required]],
      TruckNo: [this.model.TruckNo, [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[ ]{0,1}[A-Z]{0,2}[ ][0-9]{4}')]],
      Diesel: [this.model.Diesel, Validators.required],
      Cash: [this.model.Cash, Validators.required],
      NEFT: [this.model.NEFT, Validators.required]

    });
    this.fetchBasic();
  }

  fetchBasic() {
    this.apiCallservice.handleData_New(0, 'regularTruck/getregulartruckdata', 1, 0)
      .subscribe((res: Response) => {
        this.regulartrucklist = res;
      });
  }

  storeCashExpenses({ value, valid }: { value: addCash, valid: boolean }) {
    this.submitted = true;
    this.apiCallservice.handleData_New(this.dbName, 'cashExpenses/addCashExpenses', 1, 0, value)
      .subscribe(x => { alert('Data entered Successfully'); });
  }

  back() {
    this.submitted = !this.submitted;
  }
  toggle() {
    this.togglemenu = !this.togglemenu;
    this.fetchBasic();
  }
}
