import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  example: any;
  public villageslist;
  public show = false;
  public found;
  public arr;
  public dbName = 'NRCM_Information';
  public commonArray;
  public considerArray;
  public role = 6;
  constructor(public apiCallservice: ApiCallsService, public router: Router, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService,
    public sec: SecurityCheckService
  ) { }
  fetchData = function () {
    this.role = this.sec.role;
    this.commonArray = this.sec.commonArray;
    this.lrlist = this.commonArray.lrlist;
  };
  refresh(){
    this.considerArray=[0,0,0,0,1,0]
    this.getInformationData()
  }

  delete = function (id) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'missingLRReason';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response: any) => {
          alert(response.Status)
          let bb;
          let j = 0;
          this.lrlist.forEach((res) => {
            if (res._id == id) { bb = j; }
            j = j + 1;
          })
          this.lrlist.splice(bb, 1);
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/REASON_HANDLER/REASONUpdate']);
  }

  ngOnInit() {
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infolrlist')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchData();
    this.fetchData();

  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.sec.commonArray['lrlist'] = Object.keys(res.lrlist[0]).length > 0 ? res.lrlist : this.sec.commonArray['lrlist'];;
        this.fetchData();
        
        this.spinnerService.hide();
      });
  }



}
