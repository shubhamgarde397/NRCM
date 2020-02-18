import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-tpthire-details-party-wise',
  templateUrl: './tpthire-details-party-wise.component.html',
  styleUrls: ['./tpthire-details-party-wise.component.css'],
  providers: [ApiCallsService]
})
export class TPTHireDetailsPartyWiseComponent implements OnInit {
  public dailydatadetails: any;
  public nofpid: string;
  public dailydatadetailsnamelist: string;
  public tabledata = false;
  public show = false;
  public dbName;
  constructor(
    public apiCallservice: ApiCallsService,
    public spinnerService: Ng4LoadingSpinnerService,
    public handledata: HandleDataService,
    public router: Router,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.fetchData();
  }

  find = function () {
    this.apiCallservice.handleData_New(this.dbName, 'TPTHireDetails/getTPTHireDetailsName', 1, 1, {}, this.nofpid)
      .subscribe((res: Response) => {
        this.tabledata = true;
        this.tpthirelist = res;
      });
  };

  fetchData = function () {
    this.apiCallservice.handleData_New('NRCM_Information', 'regularParty/getRegularPartyData', 1, 0)
      .subscribe((res: Response) => {
        this.dailydatadetailsnamelist = res;
      });
  };
  deleteDailyDataDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'TPTHireDetails/deleteTPTHireDetails', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.find();
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/DailyData_HANDLER/DailyDataUpdate']);
  }
}
