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
  public isLoginSuccess = 'false';
  public userTypeHTML;
  public userTypeTS;
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
      type: [this.model.type, Validators.required]
    });
    this.apiCallservice.authSuccess.subscribe(
      (res: any) => { this.isLoginSuccess = res; }
    );
    this.apiCallservice.initAuth();
  }
  setUser(){
    this.userTypeTS=this.userTypeHTML;
  }

  login({ value, valid }: { value: login, valid: boolean }) {
    this.spinnerService.show();
    // this.apiCallservice.logout();
    this.security.setUsername(value.username);
    this.apiCallservice.signIn(value.username, value.password,parseInt(value.type));
  }


  register() {
    this.show = !this.show;
    this.router.navigate(['Register']);
  }
}

// C: \Users\Admin\AppData\Local\Programs\Python\Python37 - 32\; C: \Users\Admin\AppData\Local\Programs\Microsoft VS Code\bin;