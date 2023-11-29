import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { PassDataService } from 'src/app/pass-data.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';

@Component({
  selector: 'app-track-login',
  templateUrl: './track-login.component.html',
  styleUrls: ['./track-login.component.css'],
  providers: [ApiCallsService]
})
export class TrackLoginComponent implements OnInit {
  public username: any;
  public password: any;
  public show = true;
  public myFormGroup: FormGroup;
  public response: any;
  public isLoginSuccess = false;
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
    public obs:PassDataService,
    public handledata:HandleDataService
  ) {

  }

  ngOnInit() {
    this.header='Nitin Roadways And Cargo Movers';
    this.myFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  setUser() {
      this.loginButton = false;
      this.myFormGroup.controls['username'].enable();
      this.myFormGroup.controls['password'].enable();
  }

  login({ value, valid }: { value: [{}], valid: boolean }, check) {

    this.spinnerService.show();
      this.security.setUsername(value['username']);

      value['method'] = 'loginTracker';
      value['username']=this.myFormGroup.value.username;
      value['password']=this.myFormGroup.value.password;
      value['tablename']=''
      
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, value, true)
        .subscribe((res: any) => {
          if(res['Data'][0]['Login']){
            this.security.setDisplayname(res['Data'][0]['name']);
            this.security.setUserid(res['Data'][0]['_id']);
            this.security.setUserName(res['Data'][0]['username']);
            this.router.navigate(['TRACKQR']);
          }
          else{
            alert('Contact Admin for registration!')
          }
        });
  }

  register() {
    this.show = !this.show;
    this.router.navigate(['Register']);
  }

  entry(data,type){
    return data.find(r=>{return r.type===type})? true:false
  }
}