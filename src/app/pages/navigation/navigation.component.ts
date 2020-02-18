import { Component, OnInit, Input, ViewChild, QueryList, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { Location } from '@angular/common';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { NotificationDisplayComponent } from '../Notification/notification-display/notification-display.component';
// import * as moment from 'moment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [ApiCallsService, HandleDataService],
})
@Input()
export class NavigationComponent implements OnInit {
  @ViewChild('Bell') ndc: ElementRef;
  data;
  notRecievedCount;

  // public now = moment();
  public now = new Date();
  public day = this.now.getDate();
  public month = this.now.getMonth();
  public year = this.now.getFullYear();
  public dbName = 'NRCM_Information';
  public AUTH;
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public location: Location,
    public handledata: HandleDataService,
    public securit: SecurityCheckService
  ) { }

  // ngAfterViewChecked() {
  //   console.log(this.ndc);

  // }

  ngOnInit() {
    this.AUTH = this.securit.AUTH;
    this.apiCallservice.handleData_New(this.dbName, 'notification/countNotifications', 1, 0)
      .subscribe((res: Response) => {
        this.data = res;
        if (this.data > 0) {
          (<HTMLElement>document.querySelector('.NotificationBell')).style.color = 'red';
        } else {
          (<HTMLElement>document.querySelector('.NotificationBell')).style.color = 'white';
        }
      });
  }



  logout() {
    this.router.navigate(['']);
  }
}
