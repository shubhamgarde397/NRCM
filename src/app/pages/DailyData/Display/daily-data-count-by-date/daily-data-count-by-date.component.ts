import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Consts } from '../../../../common/constants/const';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-daily-data-count-by-date',
  templateUrl: './daily-data-count-by-date.component.html',
  styleUrls: ['./daily-data-count-by-date.component.css'],
  providers: [ApiCallsService]
})
export class DailyDataCountByDateComponent implements OnInit {
  public countByDate;
  public monthNames = Consts.monthNames;
  public tabledata = false;
  public dbName;
  constructor(public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService
  ) { this.dbName = this.securityCheck.saveFinancialYear; }

  ngOnInit() {
    this.apiCallservice.handleData_New(this.dbName, 'Count/getCountDateWise', 1, 1, {}, 'dailydata')
      .subscribe((res: Response) => {
        this.countByDate = res;
      });
  }
}
