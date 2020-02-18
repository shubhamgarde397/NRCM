import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-poch-account-date',
  templateUrl: './poch-account-date.component.html',
  styleUrls: ['./poch-account-date.component.css'],
  providers: [ApiCallsService]
})
export class PochAccountDateComponent implements OnInit {
  public regularPartynamelist;
  public show = false;
  public found;
  public tabledata = false;
  public dailydatadetailsnamelist;
  public DailyDataPartyName: string;
  public showdate: boolean;
  public dbName;
  public startDate;
  public endDate;

  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService, public router: Router,
    public securityCheck: SecurityCheckService) { this.dbName = this.securityCheck.saveFinancialYear; }

  ngOnInit() {

    this.apiCallservice.handleData_New('NRCM_Information', 'regularParty/getRegularPartyData', 1, 0)
      .subscribe((res: Response) => {
        this.regularPartynamelist = res;
      });

  }
  find = function () {
    this.apiCallservice.handleData_New(this.dbName, 'pochAccount/getPochDetailsByDate',
      1, 3, {}, this.startDate, this.endDate, this.DailyDataPartyName)
      .subscribe((res: Response) => {
        this.pochDataList = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'pochAccount/getPochByDateCount',
      1, 3, {}, this.startDate, this.endDate, this.DailyDataPartyName)
      .subscribe((res: Response) => {
        this.count = res;
        this.tabledata = true;
      });
  };

  deletePochDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'pochAccount/delPochdetailsdata', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.find();
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/PochAccount/PochAccountUpdate']);
  }



}
