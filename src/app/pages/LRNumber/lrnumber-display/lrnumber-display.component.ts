import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-lrnumber-display',
  templateUrl: './lrnumber-display.component.html',
  styleUrls: ['./lrnumber-display.component.css'],
  providers: [ApiCallsService]
})
export class LRNumberDisplayComponent implements OnInit {
  public show = false;
  public dbName = 1;

  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService, public router: Router,
    public securityCheck: SecurityCheckService) {
  }

  find = function () {
    this.apiCallservice.handleData_New(this.dbName, 'lrno/getLRDetails', 1, 0)
      .subscribe((res: Response) => {
        this.lrdetails = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'lrno/LRCountAll', 1, 0)
      .subscribe((res: Response) => {
        this.fullCount = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'lrno/LRDetailsFalseCount', 1, 0)
      .subscribe((res: Response) => {
        this.notRecievedCount = res;
      });
  };

  delete = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'lrno/deleteLRDetails', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.find();
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/LRNumber_HANDLER/LRNumberUpdate']);
  }


  ngOnInit() {
    this.find();
  }
}
