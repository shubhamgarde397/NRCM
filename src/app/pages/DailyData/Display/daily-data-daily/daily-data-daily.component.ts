import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-daily-data-daily',
  templateUrl: './daily-data-daily.component.html',
  styleUrls: ['./daily-data-daily.component.css'],
  providers: [ApiCallsService]
})
export class DailyDataDailyComponent implements OnInit {
  public dailydatalist;
  public show = false;
  public found;
  public tabledata = false;
  public dailydatadetailsnamelist;
  public DailyDataPartyName: string;
  public showdate: boolean;
  public dbName = 1;
  constructor(
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public router: Router,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() { this.find(); }

  find = function () {
    this.apiCallservice.handleData_New(this.dbName, 'dailyData/getDailyDataDetailsToday', 1, 0)
      .subscribe((res: Response) => {
        this.dailydatalist = res;
        this.tabledata = true;
      });
  };

  deleteDailyDataDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'dailyData/delDailydata', 1, 1, {}, id)
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
