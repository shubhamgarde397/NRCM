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
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'RegularTruck';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response: Response) => {
          let bb;
          let j = 0;
          this.regulartrucklist.forEach((res) => {
            if (res._id == id) { bb = j; }
            j = j + 1;
          })
          this.regulartrucklist.splice(bb, 1);
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
