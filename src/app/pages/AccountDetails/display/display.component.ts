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
  public ownerdetailslist = [];
  public show = false;
  public found;
  public arr;
  public data;

  public commonArray;
  public lambdaArr = [];
  public index = 0;
  public considerArray;
  public personaldetailslist;
  public truckdetailslist;
  public role = 6;
  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService
  ) { }

  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.truckdetailslist = this.commonArray.truckdetails;
  };

  newData() {
    if (this.data === '' || this.data === null || this.data === undefined) {
      this.truckdetailslist = [];
      this.truckdetailslist = this.commonArray.truckdetails;
    }
    else {
      let tempList = this.commonArray.truckdetails;
      this.truckdetailslist = this.commonArray.truckdetails;
      this.truckdetailslist = [];
      let tempData = [];
      tempList.filter((res, index) => {
        if (res['truckno'].includes(this.data.toUpperCase())) {
          tempData.push(res);
        }
      })
      this.truckdetailslist = tempData;

    }
  }

  showDatabyid = function (data, j) {
    this.show = true;
    this.found = data;
    data['index'] = j;
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/Information/ACCOUNT_DETAILS_HANDLER/Update']);
  };

  ngOnInit() {
    this.role = this.sec.role;
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infotruckpersonal')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.fetchData();
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.sec.commonArray['personaldetails'] = Object.keys(res.personaldetails[0]).length > 0 ? res.personaldetails : this.sec.commonArray['personaldetails'];
        this.sec.commonArray['truckdetails'] = Object.keys(res.truckdetails[0]).length > 0 ? res.truckdetails : this.sec.commonArray['truckdetails'];
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.sec.commonArray;
    this.personaldetailslist = this.commonArray.personaldetails;
    this.truckdetailslist = this.commonArray.truckdetails;
  }
  delete = function (id) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'truckdetails';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response: Response) => {
          let bb;
          let j = 0;
          this.truckdetailslist.forEach((res) => {
            if (res._id == id) { bb = j; }
            j = j + 1;
          })
          this.truckdetailslist.splice(bb, 1);
        });
    }
  };

}