import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css'],
  providers: [ApiCallsService]
})

export class ChangeComponent implements OnInit {
  public newData;
  public dbName = 1;
  public lrdetails;
  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public securityCheck: SecurityCheckService
  ) {
  }

  fetchData = function () {

    this.apiCallservice.handleData_New(this.dbName, 'lrno/getLRDetails', 1, 0)
      .subscribe((res: Response) => {
        this.lrdetails = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'change/getChangeDetails', 1, 0).
      subscribe((res: Response) => {
        this.changeDetails = res;
        console.log(res);
        this.oldData = this.changeDetails[0].oldLrno;
        this.newData = this.changeDetails[0].newLrno;
      });
  };

  edit(value) {
    value.lrno = this.newData;
    value.id = value._id;
    this.apiCallservice.handleData_New(this.dbName, 'lrno/updateLRDetails', 3, 0, value)
      .subscribe((response: Response) => {
        this.apiCallservice.handleData_New(this.dbName, 'db/dropDB', 1, 0)
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe((response: Response) => {
            this.router.navigate(['Navigation']);
          });
      });
  }

  ngOnInit() {
    this.fetchData();
  }
}




