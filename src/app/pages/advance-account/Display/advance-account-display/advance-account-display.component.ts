import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-advance-account-display',
  templateUrl: './advance-account-display.component.html',
  styleUrls: ['./advance-account-display.component.css'],
  providers: [ApiCallsService]
})
@Input()
export class AdvanceAccountDisplayComponent implements OnInit {
  public show = false;
  public dbName;
  constructor(public apiCallservice: ApiCallsService, public router: Router,
    public handledata: HandleDataService,
    public securityCheck: SecurityCheckService
  ) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  fetchData = function () {
    this.apiCallservice.handleData_New(this.dbName, 'advanceAccount/getAdvanceDetails', 1, 0)
      .subscribe((res: Response) => {
        this.advancedetails = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'advanceAccount/AdvanceDataDetailsCount', 1, 0)
      .subscribe((res: Response) => {
        this.notRecievedCount = res;
      });
  };

  deleteAdvanceDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'advanceAccount/delAdvancedetailsdata', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.fetchData();
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/AdvanceAccount/AdvanceAccountUpdate']);
  }

  ngOnInit() {
    this.fetchData();
  }
}
