import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';

@Component({
  selector: 'app-disp-bank-truck-details',
  templateUrl: './disp-bank-truck-details.component.html',
  styleUrls: ['./disp-bank-truck-details.component.css'],
  providers: [ApiCallsService]
})
export class DispBankTruckDetailsComponent implements OnInit {
  public truckbankdetailslist;
  public show = false;
  public found;
  public arr;

  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService
  ) { }

  fetchData = function () {
    this.apiCallservice.handleData_New('NRCM_Information', 'truckBankDetails/getTruckBankDetails', 1, 0).
      subscribe((res: Response) => {
        this.truckbankdetailslist = res;
      });
  };

  deleteBankTruckDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New('NRCM_Information', 'truckBankDetails/deleteTruckBankdetails', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.fetchData();
        });
    }
  };

  showDatabyid = function (data) {
    this.show = true;
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/Information/TRUCKBANKDETAILS_HANDLER/TruckBankDetailsUpdate']);
  };

  ngOnInit() {
    this.fetchData();
  }
}
