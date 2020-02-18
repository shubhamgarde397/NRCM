import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Consts } from '../../../../common/constants/const';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-booking-display-count-by-date',
  templateUrl: './booking-display-count-by-date.component.html',
  styleUrls: ['./booking-display-count-by-date.component.css'],
  providers: [ApiCallsService]
})

@Input()
export class BookingDisplayCountByDateComponent implements OnInit {
  public countByDate;
  public monthNames = Consts.monthNames;
  public tabledata = false;
  public name;
  public gstdetailslist: any;
  public showcount = false;
  public dbName;
  public commonArray;

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
    this.commonArray = this.securityCheck.commonArray;
  }

  ngOnInit() {

    this.gstdetailslist = this.commonArray.gstdetails;
  }
  find() {
    this.spinnerService.show();
    this.apiCallservice.handleData_New(this.dbName, 'Count/getCountDateWise', 1, 1, {}, this.name)
      .subscribe((res: Response) => {
        this.showcount = true;
        this.countByDate = res;
        this.spinnerService.hide();
      });

  }



}
