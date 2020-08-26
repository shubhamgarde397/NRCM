import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Consts } from '../../../../common/constants/const';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-poch-account-count',
  templateUrl: './poch-account-count.component.html',
  styleUrls: ['./poch-account-count.component.css'],
  providers: [ApiCallsService]
})
export class PochAccountCountComponent implements OnInit {
  public countByDate;
  public monthNames = Consts.monthNames;
  public tabledata = false;
  public dbName = 1;
  constructor(public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.apiCallservice.handleData_New(this.dbName, 'Count/getCountDateWise', 1, 1, {}, 'PochAccount')
      .subscribe((res: Response) => {
        this.countByDate = res;
      });
  }
}
