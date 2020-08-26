import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-daily-data-date-wise',
  templateUrl: './daily-data-date-wise.component.html',
  styleUrls: ['./daily-data-date-wise.component.css'],
  providers: [ApiCallsService]
})
@Input()
export class DailyDataDateWiseComponent implements OnInit {
  public dailydatalist;
  public show = false;
  public found;
  public tabledata = false;
  public dailydatadetailsnamelist;
  public DailyDataPartyName: string;
  public showdate: boolean;
  public dbName = 1;
  public startDate;
  public endDate;
  constructor(
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public router: Router,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {

    this.apiCallservice.handleData_New(0, 'regularParty/getRegularPartyData', 1, 0)
      .subscribe((res: Response) => {
        this.dailydatadetailsnamelist = res;
      });

  }
  find = function () {
    this.apiCallservice.handleData_New(this.dbName, 'dailyData/getDailyDataDetailsByDate', 1, 3, {},
      this.startDate, this.endDate, this.DailyDataPartyName)
      .subscribe((res: Response) => {
        this.dailydatalist = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'dailyData/getDailyDataDetailsByDateCount', 1, 3, {}, this.startDate,
      this.endDate, this.DailyDataPartyName)
      .subscribe((res: Response) => {
        this.count = res;
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
