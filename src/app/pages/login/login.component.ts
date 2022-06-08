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
import { PassDataService } from 'src/app/pass-data.service';

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
  public modalUser = false;
  public loginButton = false;
  public header='';
  public isLoginSuccesss = false;
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public spinnerService: Ng4LoadingSpinnerService,
    public security: SecurityCheckService,
    public obs:PassDataService
  ) {

  }

  ngOnInit() {
    this.header=this.security.getBranch()==='nrcm'?'Nitin Roadways And Cargo Movers':'Nitin Roadways Shivapur';
    this.model = new login(this.username, this.password);
    this.myFormGroup = this.formBuilder.group({
      username: [this.model.username, Validators.required],
      password: [this.model.password, Validators.required],
    });
    this.apiCallservice.authSuccess.subscribe(
      (res: any) => { this.isLoginSuccess = res; }
    );
    this.apiCallservice.initAuth();
  }
  setUser() {
    this.userTypeTS = this.userTypeHTML;
      this.loginButton = false;
      this.myFormGroup.controls['username'].enable();
      this.myFormGroup.controls['password'].enable();
  }

  login({ value, valid }: { value: login, valid: boolean }, check) {
   this.security.getBranch()==='nrcm'?this.loginH(this.myFormGroup,check):this.loginS(this.myFormGroup,check);
  }


  loginH({ value, valid }: { value: login, valid: boolean }, check) {
    value = value === undefined ? {} : value;
    this.spinnerService.show();
      this.security.setUsername(value['username']);
      this.apiCallservice.signIn(value['username'], value['password'], 1);//type);
  }

  loginS(value1, check) {
    this.spinnerService.show();
let value={}

      this.security.setUsername(value1.value['username']);
      

      value['method'] = 'login';
      value['username']=value1.value.username
      value['password']=value1.value.password
      value['tablename']='';
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, value, 0)
        .subscribe((res: any) => {
          if(res['Login']){
            this.isLoginSuccesss=true;
            this.obs.updateApprovalMessage(res);
            this.router.navigate(['NavigationS']);
            this.security.setRole(res.Data[0]['role']);
          }
          else{
            this.isLoginSuccesss=false;
            this.router.navigate(['']);
          }
        });
  }


  register() {
    this.show = !this.show;
    this.router.navigate(['Register']);
  }
}