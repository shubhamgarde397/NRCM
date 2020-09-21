import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

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
  public date = new Date()
  public month;
  public year;
  constructor(public apiCallservice: ApiCallsService, public router: Router, public handledata: HandleDataService,
    public sec: SecurityCheckService, public obs: ObsServiceService, public hF: handleFunction
  ) { }

  ngOnInit() {
    this.obs.dateService.subscribe((res: any) => {
      let arr = res.split('_');
      this.month = arr[0];
      this.year = arr[1];
    })




  }

  sub(data) {
    switch (data) {
      case 'month':
        if (this.month == '01') {
          alert('Cannot reduce more');
        } else {
          this.month = this.hF.generate2DigitNumber(String(parseInt(this.month) - 1));
          this.saveToService(this.hF.generate2DigitNumber(this.month) + '_' + this.year);

        }
        break;
      case 'year':
        this.year = parseInt(this.year) - 1;
        this.saveToService(this.hF.generate2DigitNumber(this.month) + '_' + this.year);
        break;
    }
  }


  add(data) {
    switch (data) {
      case 'month':
        if (this.month == '12') {
          alert('Cannot increase more');
        } else {
          this.month = this.hF.generate2DigitNumber(String(parseInt(this.month) + 1));
          this.saveToService(this.hF.generate2DigitNumber(this.month) + '_' + this.year);
        }
        break;

      case 'year':
        this.year = parseInt(this.year) + 1;
        this.saveToService(this.hF.generate2DigitNumber(this.month) + '_' + this.year);
        break;
    }
  }

  saveToService(data) {
    this.obs.saveDate(data);
  }

}
