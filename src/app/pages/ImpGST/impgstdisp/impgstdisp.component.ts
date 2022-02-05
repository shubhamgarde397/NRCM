import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-impgstdisp',
  templateUrl: './impgstdisp.component.html',
  styleUrls: ['./impgstdisp.component.css'],
  providers: [ApiCallsService]
})
export class ImpgstdispComponent implements OnInit {

  public impgstdetailslist;
  public show = false;
  public found;
  public arr;
  public dbName = 'NRCM_Information';
  public commonArray;
  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService
  ) { }

  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.impgstdetailslist = this.commonArray.impgstdetails;
  };

  deleteImpGSTDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'impGstDetails/delImpgstdetailsdata', 1, 0, { id: id })
        .subscribe((response: Response) => {
          this.sec.commonArray['impgstdetails'] = [];
          this.sec.commonArray['impgstdetails'] = response;
          this.impgstdetailslist = response;
        });
    }
  };

  showDatabyid = function (data) {
    this.show = true;
    this.found = data;
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/IMP_GST_HANDLER/ImpGSTUpdate']);
  };

  ngOnInit() {
    this.fetchData();
  }
}
