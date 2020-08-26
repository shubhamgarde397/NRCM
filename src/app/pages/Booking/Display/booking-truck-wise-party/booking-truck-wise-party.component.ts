import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Consts } from '../../../../common/constants/const';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-booking-truck-wise-party',
  templateUrl: './booking-truck-wise-party.component.html',
  styleUrls: ['./booking-truck-wise-party.component.css'],
  providers: [ApiCallsService]
})
export class BookingTruckWisePartyComponent implements OnInit {
  public countByDate;
  public monthNames = Consts.monthNames;
  public tabledata = false;
  public truckno;
  public ownerdetailslist: any;
  public showcount = false;
  public moreDetailsOfTruck = true;
  public bookingnamelist;
  public dbName = 1;
  public commonArray;

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService) {
    this.commonArray = this.securityCheck.commonArray;
  }

  ngOnInit() {
    this.ownerdetailslist = this.commonArray.ownerdetails;
  }

  find() {
    this.spinnerService.show();
    this.apiCallservice.handleData_New(this.dbName, 'booking/countTruckWiseParty', 1, 1, {}, this.truckno)
      .subscribe((res: Response) => {
        this.showcount = true;
        this.countByDate = res;
        this.spinnerService.hide();
      });
  }

  showDatabyid(name) {
    this.apiCallservice.handleData_New(this.dbName, 'booking/getBookingDetailsAllTrucks', 1, 2, {}, name, this.truckno).
      subscribe((res: Response) => {
        this.bookingnamelist = res;
        this.moreDetailsOfTruck = !this.moreDetailsOfTruck;
      });
  }

  back() {
    this.moreDetailsOfTruck = !this.moreDetailsOfTruck;
  }

}
