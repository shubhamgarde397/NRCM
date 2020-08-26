import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-month-names',
  templateUrl: './month-names.component.html',
  styleUrls: ['./month-names.component.css'],
  providers: [ApiCallsService]
})
export class MonthNamesComponent implements OnInit {
  example: any;
  public monthnames;
  public show = false;
  public found;
  public arr;
  public dbName = 'NRCM_Information';
  public commonArray;
  constructor(public apiCallservice: ApiCallsService, public router: Router, public handledata: HandleDataService,
    public sec: SecurityCheckService
  ) { }
  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.monthnames = this.commonArray.months;
  };

  update(yo) {
    this.apiCallservice.handleData_New(this.dbName, 'month/updateMonth', 3, 0, yo)
      .subscribe((response: Response) => {
        this.sec.commonArray['months'] = [];
        this.sec.commonArray['months'] = response;
        this.monthnames = response;
      });
  }

  ngOnInit() {
    this.fetchData();

  }

}
