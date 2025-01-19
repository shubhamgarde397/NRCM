import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Router } from 'node_modules/@angular/router';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ApiCallsService]
})
export class ProfileComponent implements OnInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public state='';
  public gender='';
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public handleFunction:handleFunction,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService,
  public router:Router) {if(!this.sec.login){
      this.router.navigate([''])
    } }
  ngOnInit() {
    
    this.myFormGroup = this.formBuilder.group({
      name: this.sec.data0['name'],
      password: this.sec.data0['password'],
      displayName: this.sec.data0['displayName'],
      city: this.sec.data0['city'],
      state: this.sec.data0['state'],
      gender: this.sec.data0['gender'],
      bod: this.sec.data0['bod'],
      email: this.sec.data0['email'],
      contact:this.sec.data0['contact'],
      bgrp:this.sec.data0['bgrp'],
      nrcmid:this.sec.data0['nrcmid'],
      empid:this.sec.data0['empid'],
      lastLoginDate:this.sec.data0['lastLoginDate']
    });
    this.state= this.sec.data0['state']
    this.gender= this.sec.data0['gender']

  }

  
  change = function (data) {
    this.submitted = true;

    let formbody=
    {
      name: data.value['name'],
      password: data.value['password'],
      displayName: data.value['displayName'],
      city: data.value['city'],
      state: data.value['state'],
      gender: data.value['gender'],
      bod: data.value['bod'],
      empid:this.sec.data0['empid'],
      empidNew:this.handleFunction.getEmpId(data.value),
      email: data.value['email'],
      contact:data.value['contact'],
      bgrp:data.value['bgrp'],
      nrcmid:data.value['nrcmid'],
      method:'update_user',
      tablename:''
    }
    this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
      .subscribe((response: Response) => {
        alert(response['Status']);
        this.show = !this.show;
        this._location.back();
      });
  };

}
