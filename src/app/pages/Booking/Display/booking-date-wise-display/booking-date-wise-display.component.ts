import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { environment } from '../../../../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-booking-date-wise-display',
  templateUrl: './booking-date-wise-display.component.html',
  styleUrls: ['./booking-date-wise-display.component.css'],
  providers: [ApiCallsService]
})
@Input()
export class BookingDateWiseDisplayComponent implements OnInit {

  modelPAN: any;
  modelOwnerName: any;
  modelTruckNo: any;
  gstdetailslist;
  show = false;
  found;
  bookingnamelist;
  arr;
  api;
  newAuthor: any;
  nameToBeDisplayed: any;
  tabledata: false;
  public dbName;
  public partyname;
  public commonArray;
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
    this.commonArray = this.securityCheck.commonArray;
  }

  ngOnInit() {
    this.gstdetailslist = this.commonArray.gstdetails;
  }

  find = function (startdate, enddate) {
    this.apiCallservice.handleData_New(this.dbName, 'booking/getBookingDetailsDateWise', 1, 3, {}, this.partyname, startdate, enddate).
      subscribe((res: Response) => {
        this.bookingnamelist = res;
        this.nameToBeDisplayed = name;
        this.tabledata = true;
      });
  };

  getTruckDetails(value) {
    this.modelTruckNo = value.truckno;
    this.modelOwnerName = value.OwnerName;
    this.modelPAN = value.PAN;
  }

  back() {
    this.show = false;
  }

}
