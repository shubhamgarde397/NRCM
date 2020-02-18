import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-advance-account-party-display',
  templateUrl: './advance-account-party-display.component.html',
  styleUrls: ['./advance-account-party-display.component.css'],
  providers: [ApiCallsService]
})
export class AdvanceAccountPartyDisplayComponent implements OnInit {
  public show = false;
  public advancedetailslist: any;
  public advancedetails: any;
  public nofpid: string;
  public dailydatadetailsnamelist: string;
  public tabledata = false;
  public regularpartylist: any;
  public dbName;
  public nopid;
  public commonArray;
  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public securityCheck: SecurityCheckService
  ) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.regularpartylist = this.commonArray.regularparty;
  }

  find = function () {
    this.apiCallservice.handleData_New(this.dbName, 'advanceAccount/getAdvanceDataDetailsbyName', 1, 1, {}, this.nopid)
      .subscribe((res: Response) => {
        console.log(res);
        this.tabledata = true;
        this.advancedetailslist = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'advanceAccount/AdvanceDataDetailsbyNameCount', 1, 1, {}, this.nopid)
      .subscribe((res: Response) => {
        this.count = res;
      });
  };

  deleteAdvanceDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'advanceAccount/delAdvancedetailsdata', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.find();
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/AdvanceAccount/AdvanceAccountUpdate']);
  }
}
