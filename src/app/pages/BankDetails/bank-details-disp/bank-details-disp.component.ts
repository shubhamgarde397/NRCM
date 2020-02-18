import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-bank-details-disp',
  templateUrl: './bank-details-disp.component.html',
  styleUrls: ['./bank-details-disp.component.css'],
  providers: [ApiCallsService]
})
export class BankDetailsDispComponent implements OnInit {
  public Bankdetailslist;
  public show = false;
  public found;

  constructor(
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public router: Router,
    public sec: SecurityCheckService
  ) { }


  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.Bankdetailslist = this.commonArray.BankDetails;
  };

  deleteBankDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New('NRCM_Information', 'bankDetails/deleteBankDetails', 1, 0, { id: id })
        .subscribe((response: Response) => {
          this.sec.commonArray['BankDetails'] = [];
          this.sec.commonArray['BankDetails'] = response;
          this.Bankdetailslist = response;
        });
    }
  };

  showDatabyid = function (data) {
    this.show = true;
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/Information/BANKDETAILS_HANDLER/BankDetailsUpdate']);
  };

  ngOnInit() {
    this.fetchData();
  }
}
