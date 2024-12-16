import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Location } from '@angular/common';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tptnavigation',
  templateUrl: './tptnavigation.component.html',
  styleUrls: ['./tptnavigation.component.css'],
  providers: [ApiCallsService, HandleDataService],
})
export class TPTNavigationComponent implements OnInit {
  public data;
  public notRecievedCount;
  public now = new Date();
  public day = this.now.getDate();
  public month = this.now.getMonth();
  public year = this.now.getFullYear();
  public dbName = 'NRCM_Information';
  public AUTH;
  public date = new Date();
  public todayDate;
  public username;
  public nameOfUser = 'Guest';
  public URL = '';
  public showThisMsg = false
  public reportData=[];
  public myFormGroup: FormGroup;
  public arr=[];
  public from;
  public to;
  public acknowledgement=false;
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public location: Location,
    public handledata: HandleDataService,
    public securit: SecurityCheckService,
    public securityCheck: SecurityCheckService,
    public spin: Ng4LoadingSpinnerService,
    public obs: ObsServiceService,
    public hF: handleFunction,
    public formBuilder: FormBuilder,
  ) {if(!this.securit.login){
    this.router.navigate([''])
  } }

  ngOnInit() {
    this.todayDate = this.hF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    this.username = this.securityCheck.dname;
    this.nameOfUser = this.username.slice(0, 1).toLocaleUpperCase() + this.username.slice(1, this.username.length)
    this.getInformationData()
    this.month = this.date.getMonth() + 1
    this.year = this.date.getFullYear();
    this.obs.saveDate(this.hF.generate2DigitNumber(String(this.month)) + '_' + this.year)
  }



  getInformationData() {
    this.spin.show();
    let tempObj = {};
    tempObj['method']='getregisteredtruckstotpt';
    tempObj['tablename']='';
    tempObj['userid']=this.securityCheck.userid;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.securityCheck.setTruckData(res.Data)
      });
  }


  logout() {
    this.router.navigate(['']);
  }

}
