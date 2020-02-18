import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { environment } from '../../../../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';
@Component({
  selector: 'app-advance-account-truck',
  templateUrl: './advance-account-truck.component.html',
  styleUrls: ['./advance-account-truck.component.css'],
  providers: [ApiCallsService]
})
export class AdvanceAccountTruckComponent implements OnInit {
  public dailydatadetailsnamelist: any;
  public regulartrucklist: any;
  public show = false;
  public found;
  public bookingnamelist;
  public arr;
  public api;
  public newAuthor: any;
  public nameToBeDisplayed: any;
  public tabledata: false;
  public dbName;
  public regularpartyname;
  public truckno;
  public commonArray;
  constructor(public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.dailydatadetailsnamelist = this.commonArray.regularparty;
    this.regulartrucklist = this.commonArray.RegularTruck;
  }

  find = function () {
    this.apiCallservice.handleData_New(this.dbName, 'advanceAccount/getAdvanceDataDetailsTruckWiseByDateCount', 1, 2, {},
      this.regularpartyname, this.truckno)
      .subscribe((res: Response) => {
        this.count = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'advanceAccount/getAdvanceDataTruckWiseDetails', 1, 2, {},
      this.regularpartyname, this.truckno).
      subscribe((res: Response) => {
        this.advancedatadetails = res;
        this.tabledata = true;
      });
  };

  deleteAdvanceDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'advanceAccount/delAdvancedetailsdata', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.find();
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/AdvanceAccount/AdvanceAccountUpdate']);
  }
}
