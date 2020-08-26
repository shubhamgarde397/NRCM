import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Consts } from '../../../../common/constants/const';
import { handleFunction } from '../../../../common/services/functions/handleFunctions';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-finolexdisplay',
  templateUrl: './finolexdisplay.component.html',
  styleUrls: ['./finolexdisplay.component.css'],
  providers: [ApiCallsService, handleFunction]
})
@Input()
export class FinolexdisplayComponent implements OnInit {
  modelPartyName: any;
  modelPartyGST: any;
  modelPAN: any;
  modelOwnerName: any;
  modelTruckNo: any;
  public ownerdetailslistid: Promise<any>;
  public ownerdetailslist: Promise<any>;
  public yearNames: any[];
  public response: any;
  public finolexdetailslist;
  public id: number;
  public show = false;
  public found;
  public arr;
  public monthNames = [];
  public tabledata = false;
  public now = new Date();
  public m;
  public y;
  public showdate = false;
  public current_count: string;
  public year = '';
  public month = '';
  public dbName = 1;

  constructor(public apiCallservice: ApiCallsService, public handlefunction: handleFunction,
    public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.yearNames = this.securityCheck.yearNames;
    this.m = this.monthNames[this.now.getMonth()];
    this.y = this.now.getFullYear();
  }

  getMonthsLocal() {
    if (this.year === this.yearNames.slice(0, 1)[0]) {
      this.monthNames = Consts.monthNames.slice(3, 12);
    } else if (this.year === this.yearNames.slice(1, 2)[0]) {
      this.monthNames = Consts.monthNames.slice(0, 3);
    }
  }

  find = function () {
    this.showdate = true;
    let date = this.year + '-' + this.handlefunction.generate2DigitNumber(String(this.handlefunction.getMonthNumber(this.month)));
    this.apiCallservice.handleData_New(this.dbName, 'Finolex/getFinolexDetails', 1, 0, { Date: date })
      .subscribe((res: Response) => {
        this.finolexdetailslist = res;
        if (this.finolexdetailslist.length > 0) {
          this.tabledata = true;
        } else {
          this.tabledata = false;
        }
      });
  };

  deleteFinolexDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'Finolex/delFinolexdetailsdata', 1, 2, {}, id, this.month + this.year)
        .subscribe((response: Response) => {
          this.find(this.month, this.year);
        });
    }
  };

  showDatabyid = function (yo) {
    this.show = true;
    this.found = yo;

  };

  back() {
    this.show = false;
  }

  change = function (ndate, lrno, nfromparty, nfrompartygst, nop, ntopartygst, ntruckno, hamt, place, amt, ownername, pan, month, year) {
    const id = this.found._id;
    this.apiCallservice.handleData_New(this.dbName, 'Finolex/updatefinolexdetailsdata', 3, 1,
      {
        id, ndate, lrno, nfromparty, nfrompartygst, nop, ntopartygst, ntruckno, hamt, place, amt, ownername, pan
      },
      month + '' + year)
      .subscribe((x) => {
        this.response = x;
        this.show = false;
        this.find(month, year);

      });
  };
  getTruckDetails(value) {
    this.modelTruckNo = value.truckno;
    this.modelOwnerName = value.OwnerName;
    this.modelPAN = value.PAN;
  }
  getPartyDetails(value) {
    this.modelPartyName = value.nop;
    this.modelPartyGST = value.ToPartyGST;
  }


}
