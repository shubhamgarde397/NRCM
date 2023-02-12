import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-link-truck',
  templateUrl: './link-truck.component.html',
  styleUrls: ['./link-truck.component.css'],
  providers: [ApiCallsService]
})
export class LinkTruckComponent implements OnInit {
  public show = false;
  public dbName = 'NRCM_Information';
  public tpts;
  public tptusers;
  public tptId;
  public truckNo;
public switchTab=0;
public username;
public password;
public usernameU;
public passwordU;
public tptIdU;
public type;
public dname;
public tpts2;
  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService,public sec: SecurityCheckService
  ) { }


  ngOnInit() {
  

  }

  getInformationData() {
    let tempObj = {};
    tempObj['method']='getTptUsers'
    tempObj['tablename']=''
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.tpts=res.Data;
      });
  }
  getInformationData2() {
    let tempObj = {};
    tempObj['method']='getTptUsers2'
    tempObj['tablename']=''
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.tpts2=res.Data;
      });
  }
  getInformationUsers(){
    let tempObj = {};
    tempObj['method']='getTptUsersLogin'
    tempObj['tablename']=''
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.tptusers=res.Data;
      });
  }
  getInformationUsersWhoDidNotLogin(){
    let tempObj = {};
    tempObj['method']='getTptUsersLoginWhoDidNot'
    tempObj['tablename']=''
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.tptusers=res.Data;
      });
  }
  getUseridInfo(){
    let x=this.tptusers.find(r=>{return r._id===this.tptIdU})
    this.usernameU=x.name;
    this.passwordU=x.password
  }

  getAll(){
    this.getInformationData2()
    this.getInformationUsers()
  }

  link(){
    let tempObj = {};
    tempObj['method']='linkusertotruck'
    tempObj['tptid']=this.tptId
    tempObj['truckno']=this.truckNo;
    tempObj['tablename']=''
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status)
        this.truckNo=''
      });
  }

  link2(){
    let tempObj = {};
    tempObj['method']='linktransporttouser'
    tempObj['tptid']=this.tptId
    tempObj['userid']=this.tptIdU;
    tempObj['tablename']=''
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status)
      });
  }


  register(){
    let tempObj = {};
    tempObj['method']='register_nrcm'
    tempObj['password']=this.password
    tempObj['username']=this.username;
    tempObj['dname']=this.dname;
    tempObj['type']=this.type;
    tempObj['tablename']=''
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status)
        this.truckNo=''
      });
  }
  forgot(){
    let tempObj = {};
    tempObj['method']='forgot_nrcm'
    tempObj['password']=this.passwordU
    tempObj['username']=this.usernameU;
    tempObj['_id']=this.tptIdU;
    tempObj['tablename']=''
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status)
      });
  }

  swicther(data){
    this.switchTab=data;
  }



}
