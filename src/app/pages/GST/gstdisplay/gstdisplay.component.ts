import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-gstdisplay',
  templateUrl: './gstdisplay.component.html',
  styleUrls: ['./gstdisplay.component.css'],
  providers: [ApiCallsService]
})

export class GstdisplayComponent implements OnInit {
  public objectKeys = Object.keys;
  public gstdetailslist;
  public show = false;
  public found;
  public dbName = 'NRCM_Information';
  public commonArray;
  public considerArray;
  constructor(
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public router: Router,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService
  ) {
  }

  ngOnInit() {
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogst')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.gstdetailslist = this.commonArray.gstdetails;
  }
  refresh(){
    this.considerArray=[0,1,0,0,0,0,0,0]
    this.getInformationData()
  }
  deleteGSTDetails = function (id) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'gstdetails';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response: any) => {
          alert(response.Status)
          let bb;
          let j = 0;
          this.gstdetailslist.forEach((res) => {
            if (res._id == id) { bb = j; }
            j = j + 1;
          })
          this.gstdetailslist.splice(bb, 1);
        });
    }
  };

  showDatabyid = function (data) {
    this.handledata.saveData(data);
    this.show = true;
    this.found = data;
    this.router.navigate(['Navigation/GST_HANDLER/GSTUpdate']);
  };
  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.sec.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.sec.commonArray['gstdetails'];;
        this.sec.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.sec.commonArray['villagenames'];;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.sec.commonArray;
    this.gstdetailslist = [];
    this.gstdetailslist = this.commonArray.gstdetails;
  }
}
