import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-oddisp',
  templateUrl: './oddisp.component.html',
  styleUrls: ['./oddisp.component.css'],
  providers: [ApiCallsService]
})
export class OddispComponent implements OnInit {
  public ownerdetailslist = [];
  public show = false;
  public found;
  public arr;
  public data;

  public commonArray;

  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService

  ) { }

  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.ownerdetailslist = this.commonArray.ownerdetails;
  };

  deleteOwnerDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New('NRCM_Information', 'ownerDetails/deleteownerdetails', 1, 0, { id: id })
        .subscribe((response: Response) => {
          this.sec.commonArray['ownerdetails'] = [];
          this.sec.commonArray['ownerdetails'] = response;
          this.ownerdetailslist = response;
        });
    }
  };

  newData() {
    if (this.data === '' || this.data === null || this.data === undefined) {
      this.ownerdetailslist = [];
      this.ownerdetailslist = this.commonArray.ownerdetails;
    }
    else {
      let tempList = this.commonArray.ownerdetails;
      this.ownerdetailslist = this.commonArray.ownerdetails;
      this.ownerdetailslist = [];
      let tempData = [];
      tempList.filter((res, index) => {
        if (res['truckno'].includes(this.data)) {
          tempData.push(res);
        }
      })
      this.ownerdetailslist = tempData;

    }
  }

  showDatabyid = function (data) {
    this.show = true;
    this.found = data;
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/Information/OWNER_HANDLER/OwnerUpdate']);
  };

  ngOnInit() {
    this.fetchData();
  }
}