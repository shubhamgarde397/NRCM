import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-regular-truck-disp',
  templateUrl: './regular-truck-disp.component.html',
  styleUrls: ['./regular-truck-disp.component.css'],
  providers: [ApiCallsService]
})
export class RegularTruckDispComponent implements OnInit {
  public regulartrucklist;
  public show = false;
  public found;
  public arr;

  public commonArray;
  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService
  ) { }

  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.regulartrucklist = this.commonArray.RegularTruck;
  };

  deleteRegularTruckDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New('NRCM_Information', 'regularTruck/delregulartruckdata', 1, 0, { id: id })
        .subscribe((response: Response) => {
          this.sec.commonArray['RegularTruck'] = [];
          this.sec.commonArray['RegularTruck'] = response;
          this.regulartrucklist = response;
        });
    }
  };

  showDatabyid = function (yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.found = yo;
    this.router.navigate(['Navigation/Information/REGULAR_TRUCK_HANDLER/RegularTruckUpdate']);
  };

  ngOnInit() {
    this.fetchData();
  }
}
