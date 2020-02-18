import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-advance-account-date',
  templateUrl: './advance-account-date.component.html',
  styleUrls: ['./advance-account-date.component.css'],
  providers: [ApiCallsService]
})
export class AdvanceAccountDateComponent implements OnInit {
  public regularPartynamelist;
  public show = false;
  public found;
  public tabledata = false;
  public dailydatadetailsnamelist;
  public DailyDataPartyName: string;
  public showdate: boolean;
  public startDate;
  public endDate;
  public dbName;
  public commonArray;

  constructor(public apiCallservice: ApiCallsService, public router: Router, public handledata: HandleDataService,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.regularPartynamelist = this.commonArray.regularparty;
  }
  find = function () {
    this.apiCallservice.handleData_New('NRCM_Information', 'advanceAccount/getAdvanceDetailsByDate', 1, 3, {},
      this.startDate, this.endDate, this.DailyDataPartyName)
      .subscribe((res: Response) => {
        this.advanceDataList = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'advanceAccount/getAdvanceByDateCount', 1, 3, {},
      this.startDate, this.endDate, this.DailyDataPartyName)
      .subscribe((res: Response) => {
        this.count = res;
        this.tabledata = true;
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
