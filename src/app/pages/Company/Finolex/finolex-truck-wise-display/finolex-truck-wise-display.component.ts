import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { handleFunction } from '../../../../common/services/functions/handleFunctions';
import { environment } from '../../../../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Consts } from '../../../../common/constants/const';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-finolex-truck-wise-display',
  templateUrl: './finolex-truck-wise-display.component.html',
  styleUrls: ['./finolex-truck-wise-display.component.css'],
  providers: [ApiCallsService, handleFunction]
})
@Input()
export class FinolexTruckWiseDisplayComponent implements OnInit {
  modelPartyGST: any;
  modelPartyName: any;
  public trucknumbers;
  public show = false;
  public found;
  public bookingnamelist;
  public arr;
  public api;
  public newAuthor: any;
  public nameToBeDisplayed: any;
  public tabledata: false;
  public tablename: string;
  public monthNames = Consts.monthNames;
  public yearNames: any[];
  public now = new Date();
  public m = this.monthNames[this.now.getMonth()];
  public y = this.now.getFullYear();
  public year = '';
  public month = '';
  public dbName;
  public truckno;
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService,
    public handlefunction: handleFunction,
    public securityCheck: SecurityCheckService) { }

  getMonthsLocal() {
    if (this.year === this.yearNames.slice(0, 1)[0]) {
      this.monthNames = Consts.monthNames.slice(3, 12);
    } else if (this.year === this.yearNames.slice(1, 2)[0]) {
      this.monthNames = Consts.monthNames.slice(0, 3);
    }
  }

  ngOnInit() {
    this.yearNames = this.securityCheck.yearNames;
    this.dbName = this.securityCheck.saveFinancialYear;
    this.m = this.monthNames[this.now.getMonth()];
    this.y = this.now.getFullYear();

    this.apiCallservice.handleData_New('NRCM_Information', 'ownerDetails/getOwnerDetails', 1, 0)
      .subscribe((res: Response) => {
        this.trucknumbers = res;
      });
  }

  find = function () {
    this.apiCallservice.handleData_New(this.dbName, 'Finolex/getFinolexDetailsAllTrucks', 1, 2, {},
      this.month + '' + this.year, this.truckno).
      subscribe((res: Response) => {
        this.finolextrucklist = res;
        if (this.finolextrucklist.length > 0) {
          this.tabledata = true;
        } else {
          this.tabledata = false;
        }
      });

    this.apiCallservice.handleData_New(this.dbName, 'Finolex/getFinolexDetailsTruckWiseCount', 1,
      2, {}, this.month + '' + this.year, this.truckno).
      subscribe((res: Response) => {
        this.countOfTrucks = res;
      });
  };

  deleteFinolexDetails = function (id, i) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'Finolex/delFinolexdetailsdata', 1, 2, {}, id, this.month + this.year)
        .subscribe((response: Response) => {
          this.find();
        });
    }
  };

  getPartyDetails(value) {
    this.modelPartyName = value.nop;
    this.modelPartyGST = value.ToPartyGST;
  }

  back() {
    this.show = false;
  }

}
