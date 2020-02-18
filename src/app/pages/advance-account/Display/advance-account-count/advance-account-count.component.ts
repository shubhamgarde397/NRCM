import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Consts } from '../../../../common/constants/const';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-advance-account-count',
  templateUrl: './advance-account-count.component.html',
  styleUrls: ['./advance-account-count.component.css'],
  providers: [ApiCallsService]
})
export class AdvanceAccountCountComponent implements OnInit {
  public countByDate;
  public monthNames = Consts.monthNames;
  public tabledata = false;
  public dbName;
  constructor(public apiCallservice: ApiCallsService, public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.apiCallservice.handleData_New(this.dbName, 'Count/getCountDateWise', 1, 1, {}, 'AdvanceAccount')
      .subscribe((res: Response) => {
        this.countByDate = res;
      });
  }
}
