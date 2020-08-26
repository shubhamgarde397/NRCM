import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

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
  constructor(public apiCallservice: ApiCallsService, public router: Router, public handledata: HandleDataService,
    public sec: SecurityCheckService
  ) { }
  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.villageslist = this.commonArray.villagenames;
  };

  deleteVillageDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'Village/deletevillagedatadetails', 1, 0, { id: id })
        .subscribe((response: Response) => {
          this.sec.commonArray['villagenames'] = [];
          this.sec.commonArray['villagenames'] = response;
          this.villageslist = response;
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/Information/VILLAGE_HANDLER/VillageUpdate']);
  }

  ngOnInit() {
    this.fetchData();

  }

}
