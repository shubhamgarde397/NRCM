import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-regular-party-disp',
  templateUrl: './regular-party-disp.component.html',
  styleUrls: ['./regular-party-disp.component.css'],
  providers: [ApiCallsService]
})
export class RegularPartyDispComponent implements OnInit {

  public regulardatalist;
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
    console.log(this.commonArray);
    this.regulardatalist = this.commonArray.regularparty;
  };

  deleteRegularPartyDetails = function (id) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'regularparty';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response: Response) => {
          let bb;
          let j = 0;
          this.regulardatalist.forEach((res) => {
            if (res._id == id) { bb = j; }
            j = j + 1;
          })
          this.regulardatalist.splice(bb, 1);
        });
    }
  };

  showDatabyid = function (yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.found = yo;
    this.router.navigate(['Navigation/Information/REGULAR_PARTY_HANDLER/RegularPartyUpdate']);
  };

  ngOnInit() {
    this.fetchData();
  }
}

