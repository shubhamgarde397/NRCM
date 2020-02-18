import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { environment } from '../../../../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';
@Component({
  selector: 'app-poch-account-truck',
  templateUrl: './poch-account-truck.component.html',
  styleUrls: ['./poch-account-truck.component.css'],
  providers: [ApiCallsService]
})
export class PochAccountTruckComponent implements OnInit {
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
  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService, public router: Router,
    public securityCheck: SecurityCheckService) { this.dbName = this.securityCheck.saveFinancialYear; }

  ngOnInit() {
    this.apiCallservice.handleData_New('NRCM_Information', 'regularParty/getRegularPartyData', 1, 0)
      .subscribe((res: Response) => {
        this.dailydatadetailsnamelist = res;
      });

    this.apiCallservice.handleData_New('NRCM_Information', 'regularTruck/getregulartruckdata', 1, 0)
      .subscribe((res: Response) => {
        this.regulartrucklist = res;
      });
  }

  find = function () {
    this.apiCallservice.handleData_New(this.dbName, 'pochAccount/getPochDataDetailsTruckWiseByDateCount',
      1, 2, {}, this.regularpartyname, this.truckno)
      .subscribe((res: Response) => {
        this.count = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'pochAccount/getPochDataTruckWiseDetails',
      1, 2, {}, this.regularpartyname, this.truckno).
      subscribe((res: Response) => {
        this.pochdatadetails = res;
        this.tabledata = true;
      });
  };

  deletePochDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'pochAccount/delPochdetailsdata',
        1, 1, {}, id)
        .subscribe((response: Response) => {
          this.find();
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/PochAccount/PochAccountUpdate']);
  }
}
