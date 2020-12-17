import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Consts } from '../../../../common/constants/const';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-daily-data-truck-wise-party',
  templateUrl: './daily-data-truck-wise-party.component.html',
  styleUrls: ['./daily-data-truck-wise-party.component.css'],
  providers: [ApiCallsService]
})
export class DailyDataTruckWisePartyComponent implements OnInit {
  public countByDate;
  public monthNames = Consts.monthNames;
  public tabledata = false;
  public truckno;
  public ownerdetailslist: any;
  public showcount = false;
  public moreDetailsOfTruck = true;
  public dailybookingnamelist;
  public dbName = 1;
  constructor(public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {
    this.apiCallservice.handleData_New(0, 'regularTruck/getregulartruckdata', 1, 0).
      subscribe((res: Response) => {
        this.ownerdetailslist = res;
      });
  }

  find() {
    this.apiCallservice.handleData_New(this.dbName, 'dailydata/countTruckWiseParty', 1, 1, {}, this.truckno)
      .subscribe((res: Response) => {
        this.showcount = true;
        this.countByDate = res;
      });
  }

  showDatabyid(name) {
    this.apiCallservice.handleData_New(this.dbName, 'dailyData/getDailyDetailsAllTrucks', 1, 2, {}, name, this.truckno).
      subscribe((res: Response) => {
        this.dailybookingnamelist = res;
        this.moreDetailsOfTruck = !this.moreDetailsOfTruck;
      });
  }

  back() {
    this.moreDetailsOfTruck = !this.moreDetailsOfTruck;
  }

}
