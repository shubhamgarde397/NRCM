import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-poch-account-disp',
  templateUrl: './poch-account-disp.component.html',
  styleUrls: ['./poch-account-disp.component.css'],
  providers: [ApiCallsService]
})
@Input()
export class PochAccountDispComponent implements OnInit {
  public show = false;
  public dbName = 1;

  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService, public router: Router,
    public securityCheck: SecurityCheckService) { }

  fetchData = function () {
    this.apiCallservice.handleData_New(this.dbName, 'pochAccount/getPochDetails', 1, 0)
      .subscribe((res: Response) => {
        this.advancedetails = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'pochAccount/PochDetailsCount', 1, 0)
      .subscribe((res: Response) => {
        this.notRecievedCount = res;
      });

  };

  deletePochDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'pochAccount/delPochdetailsdata', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.fetchData();
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/PochAccount/PochAccountUpdate']);
  }


  ngOnInit() {
    this.fetchData();
  }
}
