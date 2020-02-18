import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { login } from './login';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SecurityCheckService } from '../../common/services/Data/security-check.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiCallsService]
})
export class LoginComponent implements OnInit {
  public username: any;
  public password: any;
  public show = true;
  public myFormGroup: FormGroup;
  public model: login;
  public modelSubmitted: login;
  public response: any;
  public logindetailslist;
  public financialYear;
  public dbName = 'NRCM_Information';
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public spinnerService: Ng4LoadingSpinnerService,
    public security: SecurityCheckService
  ) {

  }

  ngOnInit() {
    this.model = new login(this.username, this.password);
    this.myFormGroup = this.formBuilder.group({
      username: [this.model.username, Validators.required],
      password: [this.model.password, Validators.required],
      financialYear: [this.model.financialYear, Validators.required]
    });
  }

  login({ value, valid }: { value: login, valid: boolean }) {
    this.spinnerService.show();
    this.security.saveYear(value.financialYear);
    this.apiCallservice.handleData_New(this.dbName, 'login/getLoginDetailsbyid', 1, 0, { "username": value.username, "password": value.password })
      .subscribe((res: any) => {
        if (res.AUTH) {
          this.security.AUTH = true;
        } else {
          this.security.AUTH = false;
        }

        this.logindetailslist = res.status;
        if (this.logindetailslist === true) {
          this.show = !this.show;
          this.spinnerService.hide();
          this.router.navigate(['Navigation']);
        } else {
          this.spinnerService.hide();
          alert('Wrong Credentials..!');
        }
      });
  }


  register() {
    this.show = !this.show;
    this.router.navigate(['Register']);
  }
}
