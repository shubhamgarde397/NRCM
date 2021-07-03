import { Component, OnInit, Input, ViewChild, QueryList, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { Location } from '@angular/common';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { NotificationDisplayComponent } from '../Notification/notification-display/notification-display.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
// import * as moment from 'moment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [ApiCallsService, HandleDataService],
})
@Input()
export class NavigationComponent implements OnInit {
  data;
  notRecievedCount;

  // public now = moment();
  public now = new Date();
  public day = this.now.getDate();
  public month = this.now.getMonth();
  public year = this.now.getFullYear();
  public dbName = 'NRCM_Information';
  public AUTH;
  public date = new Date();
  public username;
  public role = 6;
  public nameOfUser = 'Guest';
  public URL = '';
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public location: Location,
    public handledata: HandleDataService,
    public securit: SecurityCheckService,
    public securityCheck: SecurityCheckService,
    public spin: Ng4LoadingSpinnerService,
    public obs: ObsServiceService,
    public hF: handleFunction
  ) { }

  ngOnInit() {
    this.URL = window.location.href.split('/')[1];
    this.username = this.securityCheck.username;
    this.nameOfUser = this.username.slice(0, 1).toLocaleUpperCase() + this.username.slice(1, this.username.length)
    // this.role = 1;//comment
    this.getInformationData();//uncomment
    this.AUTH = this.securit.AUTH;
    this.month = this.date.getMonth() + 1
    this.year = this.date.getFullYear();
    this.obs.saveDate(this.hF.generate2DigitNumber(String(this.month)) + '_' + this.year)

  }

  getInformationData() {
    this.spin.show();
    let caller = this.URL === 'www.nitinroadways.in' ? 'first' : 'default';
    let tempObj = { "method": "displaynew", "username": this.username, "consider": this.handledata.createConsiderArray(caller) };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray = res;
        this.securityCheck.commonArray['Role'] = res.Role;
        this.securityCheck.role = res.Role;
        this.role = res.Role;
        this.spin.hide();
        this.router.navigate(['Navigation/NRCM_HOME'])
      });
  }



  logout() {
    this.router.navigate(['']);
    this.apiCallservice.logout();
  }
}
