import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-villagedisp',
  templateUrl: './villagedisp.component.html',
  styleUrls: ['./villagedisp.component.css'],
  providers: [ApiCallsService]
})
export class VillagedispComponent implements OnInit {
  example: any;
  public villageslist;
  public show = false;
  public found;
  public arr;
  public dbName = 'NRCM_Information';
  public commonArray;
  public considerArray;
  constructor(public apiCallservice: ApiCallsService, public router: Router, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService,
    public sec: SecurityCheckService
  ) { if(!this.sec.login){
    this.router.navigate([''])
  }}
 
  deleteVillageDetails = function (id) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'villagenames';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: any) => {
          alert(response.Status)
          let bb;
          let j = 0;
          this.villageslist.forEach((res) => {
            if (res._id == id) { bb = j; }
            j = j + 1;
          })
          this.villageslist.splice(bb, 1);
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/VILLAGE_HANDLER/VillageUpdate']);
  }

  ngOnInit() {
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infovillage')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchData();
    this.fetchData();

  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.sec.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.sec.commonArray['villagenames'];;
        this.fetchData();
        this.spinnerService.hide();
      });
  }

  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.villageslist = this.commonArray.villagenames;
  };

  refresh(){
    this.considerArray=[0,0,0,1,0,0,0,0]
    this.getInformationData()
  }



}
