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
  public personaldetailslist = [];
  public show = false;
  public found;
  public arr;
  public data;

  public commonArray;
  public lambdaArr = [];
  public index = 0;
  public considerArray;
  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService

  ) { }

  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.personaldetailslist = this.commonArray.personaldetails;
    console.log(this.personaldetailslist);

  };



  newData() {
    if (this.data === '' || this.data === null || this.data === undefined) {
      this.personaldetailslist = [];
      this.personaldetailslist = this.commonArray.personaldetails;
    }
    else {
      let tempList = this.commonArray.personaldetails;
      this.personaldetailslist = this.commonArray.personaldetails;
      this.personaldetailslist = [];
      let tempData = [];
      tempList.filter((res, index) => {
        if (res['name'].includes(this.data.toUpperCase())) {
          tempData.push(res);
        }
      })
      this.personaldetailslist = tempData;

    }
  }


  ngOnInit() {
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infopersonaldetails')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.fetchBasic();
  }

  delete = function (id) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'personaldetails';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response: Response) => {
          let bb;
          let j = 0;
          this.personaldetailslist.forEach((res) => {
            if (res._id == id) { bb = j; }
            j = j + 1;
          })
          this.personaldetailslist.splice(bb, 1);
        });
    }
  };


  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.sec.commonArray['personaldetails'] = Object.keys(res.personaldetails[0]).length > 0 ? res.personaldetails : this.sec.commonArray['personaldetails'];;
        this.fetchBasic();
        this.spinnerService.hide();

      });
  }

  fetchBasic() {
    this.commonArray = this.sec.commonArray;
    this.personaldetailslist = [];
    this.personaldetailslist = this.commonArray.personaldetails;
    console.log(this.personaldetailslist);
  }

  showDatabyid = function (data) {
    this.show = true;
    this.found = data;
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/Information/PERSONAL_DETAILS_HANDLER/Update']);
  };


}