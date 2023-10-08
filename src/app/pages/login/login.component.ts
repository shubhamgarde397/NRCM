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
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';

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
  public isLoginSuccess = false;
  public userTypeHTML;
  public userTypeTS;
  public modalUser = false;
  public loginButton = false;
  public header='';
  public isLoginSuccesss = false;
  public arr=[];
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
    this.handledata.createConsiderArray('default')

    this.spinnerService.show();
      this.security.setUsername(value['username']);

      value['method'] = 'login';
      value['username']=value.username
      value['password']=value.password
      value['tablename']=''
      value['consider']=[1,0,0,0,0,0,0,1]
      
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, value, true)
        .subscribe((res: any) => {
          if(res['Login']){
            this.security.setDisplayname(res['Data'][0]['displayName']);
            this.security.setSequence(res['Data'][1]);
            this.security.setNotifications(res['Data1'][7]['notificstions']);
            this.security.setUserid(res['Data'][0]['_id']);
            this.security.setUserName(res['Data'][0]['name']);
            this.security.setNRCMid(res['Data'][0]['nrcmid']);
            if(this.entry(res['Data'],'nrcm')){
            this.isLoginSuccess=true;
            this.obs.updateApprovalMessage(res);
            this.router.navigate(['Navigation']);


            let newdata=res['Data1']
            let resNew={
              "gstdetails": [{}],
              "ownerdetails": [{}],
              "villagenames": [{}],
              "lrlist": [{}],
              "hiddenownerdetails": [{}],
              "transport":[{}],
              "dues":[{}],
              "Role": 6
            }
            for(let i=0;i<newdata.length-1;i++){
              resNew[Object.keys(newdata[i])[0]]=Object.values(newdata[i])[0]
          }
            this.security.commonArray = resNew;
            this.security.commonArray['Role'] = resNew.Role;
            this.security.role = resNew.Role;
            let k=Object.keys(resNew['lrlist'][0])//lrsend
            let v=Object.values(resNew['lrlist'][0])//lrsend
            for(let i=0;i<2;i++){
              let obj={}
              obj['location']=k[i]
              obj['value']=v[i]
              obj['color']=v[2+i]
              this.arr.push(obj);
              this.handledata.saveLRStatus(this.arr);
              }
            }
            if(this.entry(res['Data'],'nrcm_transport')){
              this.isLoginSuccess=true;
              this.obs.updateApprovalMessage(res);
              this.router.navigate(['Transport_Navigation']);
              }


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