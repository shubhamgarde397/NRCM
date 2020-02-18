import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { environment } from '../../../../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-booking-truck-wise-display',
  templateUrl: './booking-truck-wise-display.component.html',
  styleUrls: ['./booking-truck-wise-display.component.css'],
  providers: [ApiCallsService]
})
export class BookingTruckWiseDisplayComponent implements OnInit {
  modelPartyGST: any;
  modelPartyName: any;
  modelPAN: any;
  modelOwnerName: any;
  modelTruckNo: any;
  public gstdetailslist;
  public trucknumbers;
  public show = false;
  public found;
  public bookingnamelist;
  public arr;
  public api;
  public newAuthor: any;
  public nameToBeDisplayed: any;
  public tabledata: false;
  public dbName;
  public partyname;
  public truckno;
  public commonArray;
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
    this.commonArray = this.securityCheck.commonArray;
  }

  ngOnInit() {
    this.gstdetailslist = this.commonArray.gstdetails;
    this.trucknumbers = this.commonArray.ownerdetails;
  }

  find = function () {
    this.apiCallservice.handleData_New(this.dbName, 'booking/getBookingDetailsTruckWiseCount', 1, 2, {}, this.partyname, this.truckno).
      subscribe((res: Response) => {
        this.countOfTrucks = res;
        this.tabledata = true;
      });

    this.apiCallservice.handleData_New(this.dbName, 'booking/getBookingDetailsAllTrucks', 1, 2, {}, this.partyname, this.truckno).
      subscribe((res: Response) => {
        this.bookingnamelist = res;
      });
  };

  getDetails(value) {
    this.modelTruckNo = value.truckno;
    this.modelOwnerName = value.OwnerName;
    this.modelPAN = value.PAN;
    this.modelPartyName = value.nop;
    this.modelPartyGST = value.ToPartyGST;
  }

  back() {
    this.show = false;
  }
}
