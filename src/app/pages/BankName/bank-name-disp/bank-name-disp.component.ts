import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-bank-name-disp',
  templateUrl: './bank-name-disp.component.html',
  styleUrls: ['./bank-name-disp.component.css'],
  providers: [ApiCallsService]
})
export class BankNameDispComponent implements OnInit {
  public banknamelist;
  public show = false;
  public found;
  public arr;

  public commonArray;
  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService
  ) { }

  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.banknamelist = this.commonArray.BankNames;
  };

  delete = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(0, 'bankName/deleteBankNamedetails', 1, 0, { id: id })
        .subscribe((response: Response) => {
          this.sec.commonArray['BankNames'] = [];
          this.sec.commonArray['BankNames'] = response;
          this.banknamelist = response;
        });
    }
  };

  showDatabyid = function (data) {
    this.show = true;
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/Information/BANKNAME_HANDLER/BankNameUpdate']);
  };



  ngOnInit() {
    this.fetchData();
  }
}
