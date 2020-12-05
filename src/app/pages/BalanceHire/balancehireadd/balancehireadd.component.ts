import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-balancehireadd',
  templateUrl: './balancehireadd.component.html',
  styleUrls: ['./balancehireadd.component.css']
})
export class BalancehireaddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public date = new Date();
  public todaysDate;
  public today;
  public dateFromUI;
  constructor(public apiCallservice: ApiCallsService, public handleF: handleFunction, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.todaysDate = this.date.getDate();
    this.today = this.handleF.getDate(this.date.getDate(), (this.date.getMonth() + 1), this.date.getFullYear());
    this.myFormGroup = this.formBuilder.group({
      truckno: ['', Validators.required],
      pageno: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
  addTemp() {
    //add to array [] [{}] [{},{}]

  }

  saveBalanceHire({ value, valid }: { value: [], valid: boolean }) {
    this.submitted = true;
    value['method'] = 'insert';
    value['tablename'] = 'balancehire';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, 0)
      .subscribe((res: any) => {
        alert('Added Successfully');
      });
  }

  leftRight(LR) {
    switch (LR) {
      case 'back':
        this.todaysDate = this.todaysDate - 1;
        this.today = this.handleF.getDate(this.todaysDate, (this.date.getMonth() + 1), this.date.getFullYear());
        break;
      case 'ahead':
        this.todaysDate = this.todaysDate + 1;
        this.today = this.handleF.getDate(this.todaysDate, (this.date.getMonth() + 1), this.date.getFullYear());
        break;
      case 'realDate':
        this.today = this.dateFromUI;
        break;
    }
  }

  back() {
    this.submitted = !this.submitted;
  }
}

