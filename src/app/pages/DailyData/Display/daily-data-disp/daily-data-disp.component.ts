import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-daily-data-disp',
  templateUrl: './daily-data-disp.component.html',
  styleUrls: ['./daily-data-disp.component.css'],
  providers: [ApiCallsService]
})
export class DailyDataDispComponent implements OnInit {
  public dailydatalist;
  public show = false;
  public found;
  public tabledata = false;
  public dbName;
  constructor(public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData = function () {
    this.apiCallservice.handleData_New(this.dbName, 'dailyData/getDailyDataDetails', 1, 0)
      .subscribe((res: Response) => {
        this.dailydatalist = res;
        this.tabledata = true;
      });
  };

  deleteDailyDataDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'dailyData/delDailydata', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.fetchData();
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/DailyData_HANDLER/DailyDataUpdate']);
  }
}
