import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-gstdisplay',
  templateUrl: './gstdisplay.component.html',
  styleUrls: ['./gstdisplay.component.css'],
  providers: [ApiCallsService]
})

export class GstdisplayComponent implements OnInit {
  public gstdetailslist;
  public show = false;
  public found;
  public dbName = 'NRCM_Information';
  public commonArray;
  constructor(
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public router: Router,
    public sec: SecurityCheckService
  ) {
  }

  ngOnInit() {
    this.commonArray = this.sec.commonArray;
    this.gstdetailslist = this.commonArray.gstdetails;
  }

  deleteGSTDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'gstDetails/delgstdetailsdata', 1, 0, { id: id })
        .subscribe((response: Response) => {
          this.sec.commonArray['gstdetails'] = [];
          this.sec.commonArray['gstdetails'] = response;
          this.gstdetailslist = response;
        });
    }
  };

  showDatabyid = function (data) {
    this.handledata.saveData(data);
    this.show = true;
    this.found = data;
    this.router.navigate(['Navigation/Information/GST_HANDLER/GSTUpdate']);
  };
}
