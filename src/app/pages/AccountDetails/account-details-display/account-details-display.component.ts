import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-account-details-display',
  templateUrl: './account-details-display.component.html',
  styleUrls: ['./account-details-display.component.css']
})
export class AccountDetailsDisplayComponent implements OnInit {

  public tbl;
  public tblShow=false;
  public myFormGroup: FormGroup;

  public show=false;

  constructor(public apiCallservice: ApiCallsService, 
    public securityCheck: SecurityCheckService, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getInformationData();
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "acc12363TF", "tablename": ''};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.tblShow=true;
        this.tbl=res.Data;
        console.log(this.tbl);
        
        this.spinnerService.hide();
        
      });
  }
  update(type,i,j){
    let tempObj = { "method": "updateacc12363TF", "tablename": '','type':type,'id':i._id};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        alert(res.Status);
        switch (type) {
          case 'both':
            this.tbl.splice(j,1)
            break;
            case '12':
            this.tbl[j]['accountDetails'][0]['acc12']=true;
            this.tbl[j]['accountDetails'][0]['acc363']?this.tbl.splice(j,1):null;
            break;
            case '363':
              this.tbl[j]['accountDetails'][0]['acc363']=true;
              this.tbl[j]['accountDetails'][0]['acc12']?this.tbl.splice(j,1):null;
            break;
        
          default:
            break;
        }
      });
  }
}
