import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-driver-disp',
  templateUrl: './driver-disp.component.html',
  styleUrls: ['./driver-disp.component.css'],
  providers: [ApiCallsService]
})
export class DriverDispComponent implements OnInit {
  public ownerdetailslist;
  public show = false;
  public found;

  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService
  ) { }

  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.driverdetailslist = this.commonArray.driverdetails;
  };

  deleteDriverDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New('NRCM_Information', 'driverDetails/deletedriverdetails', 1, 0, { id: id })
        .subscribe((response: Response) => {
          this.sec.commonArray['driverdetails'] = [];
          this.sec.commonArray['driverdetails'] = response;
          this.driverdetailslist = response;
        });
    }
  };

  showDatabyid = function (data) {
    this.show = !this.show;
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/Information/DRIVER_HANDLER/DriverUpdate']);
  };



  ngOnInit() {
    this.fetchData();
  }
}
