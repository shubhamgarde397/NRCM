import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { login } from './login';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SecurityCheckService } from '../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
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
  public dbName = 'PochDetails';
  public isLoginSuccess = false;
  public userTypeHTML;
  public userTypeTS;
  public modalUser = false;
  public loginButton = false;
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public hd:HandleDataService,
    public spinnerService: Ng4LoadingSpinnerService,
    public security: SecurityCheckService,
    private obs:PassDataService
  ) {

  }

  ngOnInit() {
    this.model = new login(this.username, this.password);
    this.myFormGroup = this.formBuilder.group({
      username: [this.model.username, Validators.required],
      password: [this.model.password, Validators.required],
    });
  }
  setUser() {
    this.userTypeTS = this.userTypeHTML;
      this.loginButton = false;
      this.myFormGroup.controls['username'].enable();
      this.myFormGroup.controls['password'].enable();
  }

  login({ value, valid }: { value: login, valid: boolean }, check) {
    this.spinnerService.show();
      this.security.setUsername(value['username']);

      value['method'] = 'login';
      value['username']=value.username
      value['password']=value.password
      value['tablename']=''
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, value, 0)
        .subscribe((res: any) => {
          if(res['Login']){
            this.security.setDisplayname(res['Data'][0]['displayName']);
            this.security.setUserid(res['Data'][0]['_id']);
            this.security.setUserName(res['Data'][0]['name']);
            this.security.setNRCMid(res['Data'][0]['nrcmid']);
            if(this.entry(res['Data'])){
            this.isLoginSuccess=true;
            this.obs.updateApprovalMessage(res);
            this.router.navigate(['Navigation']);
            }else{
              alert('Contact Admin for registration!')
            }
          }
          else{
            alert('Contact Admin for registration!')
          }
        });
  }
  entry(data){
    return data.find(r=>{return r.type==='nrcm_q'})? true:false
  }
}