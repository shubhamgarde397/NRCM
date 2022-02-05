import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-oddisp',
  templateUrl: './oddisp.component.html',
  styleUrls: ['./oddisp.component.css'],
  providers: [ApiCallsService]
})
export class OddispComponent implements OnInit {
  public ownerdetailslist = [];
  public date3month;
  public todayDate;
  public show = false;
  public found;
  public arr;
  public data;
  public role = 6;
  public commonArray;
  public lambdaArr = [];
  public index = 0;
  public considerArray;
  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService,
    public handleF:handleFunction

  ) { }

  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.ownerdetailslist = this.commonArray.ownerdetails;
  };

  deleteOwnerDetails = function (id) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'show';
      formbody['show']=false;
      formbody['find']=false;
      formbody['tablename'] = 'ownerdetails';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response:any) => {
          alert(response.Status)
          let bb;
          let j = 0;
          this.sec.commonArray
          
          this.ownerdetailslist.forEach((res) => {
            if (res._id == id) { 
              bb = j; 
              this.sec.commonArray['hiddenownerdetails'].push(res);
            }
            j = j + 1;
          })
          this.ownerdetailslist.splice(bb, 1);
        });
    }
  };

  newData() {
    if (this.data === '' || this.data === null || this.data === undefined) {
      this.ownerdetailslist = [];
      this.ownerdetailslist = this.commonArray.ownerdetails;
    }
    else {
      let tempList = this.commonArray.ownerdetails;
      this.ownerdetailslist = this.commonArray.ownerdetails;
      this.ownerdetailslist = [];
      let tempData = [];
      tempList.filter((res, index) => {
        if (res['truckno'].includes(this.data.toUpperCase())) {
          tempData.push(res);
        }
      })
      this.ownerdetailslist = tempData;
    }
  }

  showDatabyid = function (data) {

    this.show = true;
    this.found = data;
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/OWNER_HANDLER/OwnerUpdate']);
  };

  ngOnInit() {
    this.todayDate=this.handleF.createDate(new Date());
    this.role = this.sec.role;
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infoowner')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.fetchData();
  }
  refresh(){
    this.considerArray=[0,0,1,0,0,0,0]
    this.getInformationData()
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.sec.commonArray['ownerdetails'] = Object.keys(res.ownerdetails[0]).length > 0 ? res.ownerdetails : this.sec.commonArray['ownerdetails'];;
        this.sec.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.sec.commonArray['villagenames'];
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.sec.commonArray;

    this.ownerdetailslist = [];

    this.ownerdetailslist = this.commonArray.ownerdetails;
  }

}