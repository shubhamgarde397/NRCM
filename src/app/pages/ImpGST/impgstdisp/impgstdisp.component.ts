import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-impgstdisp',
  templateUrl: './impgstdisp.component.html',
  styleUrls: ['./impgstdisp.component.css'],
  providers: [ApiCallsService]
})
export class ImpgstdispComponent implements OnInit {
  public gstdetailslist;
  constructor(
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public router: Router,
    public sec: SecurityCheckService,
  ) {
  }

  ngOnInit() {
  }

 
  deleteGSTDetails = function (id,j) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'impgstdetails';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: any) => {
          alert(response.Status)
          this.gstdetailslist.splice(j,1)
        });
    }
  };
  
  getInformationData() {
    let tempObj = { "method": "getimp",'tablename':''};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.gstdetailslist=res.Data;
      });
  }

}
