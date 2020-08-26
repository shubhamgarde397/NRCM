import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';

import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NavigationComponent } from '../../navigation/navigation.component';

@Component({
  selector: 'app-notification-display',
  templateUrl: './notification-display.component.html',
  styleUrls: ['./notification-display.component.css'],
  providers: [ApiCallsService],
  viewProviders: [NavigationComponent]
})
export class NotificationDisplayComponent implements OnInit {
  public notificationList;
  public show = false;
  public found;
  public arr;
  public checkVariable;

  public myFormGroup: FormGroup;
  public submitted = false;
  public dbName = 'NRCM_Information';
  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public formBuilder: FormBuilder,
    public testComponent: NavigationComponent

  ) { }

  ngOnInit() {
    this.fetchData();
    this.myFormGroup = this.formBuilder.group({
      notification: []
    });
  }

  store(value) {
    value.value.check = false;
    this.apiCallservice.handleData_New(this.dbName, 'notification/addNotifications', 1, 0, value.value)
      .subscribe((res) => {
        this.count();
        this.fetchData();
        this.testComponent.ngOnInit();
        { alert('Notification Added Successfully'); }
      });
  }

  fetchData = function () {
    this.apiCallservice.handleData_New(this.dbName, 'notification/getNotifications', 1, 0).
      subscribe((res: Response) => {
        console.log(res);
        this.notificationList = res;

      });
  };

  count() {
    this.apiCallservice.handleData_New(this.dbName, 'notification/countNotifications', 1, 0)
      .subscribe((res: Response) => {
        if (res) {
          this.handledata.notification(true);
        } else {
          this.handledata.notification(false);
        }
      });
  }

  delete = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'notification/deleteNotifications', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.ngOnInit();
          this.count();
        });
    }
  };

  showDatabyid = function (data) {

    this.apiCallservice.handleData_New(this.dbName, 'notification/updateNotifications', 3, 0, data)
      .subscribe((response: Response) => {
        this.fetchData();
        this.testComponent.ngOnInit();
      });
  };
}
