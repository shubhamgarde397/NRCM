import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { handleFunction } from '../../../../../common/services/functions/handleFunctions';
import { SecurityCheckService } from '../../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-canara-display-truck',
  templateUrl: './canara-display-truck.component.html',
  styleUrls: ['./canara-display-truck.component.css'],
  providers: [ApiCallsService]
})
export class CanaraDisplayTruckComponent implements OnInit {
  trucknopart: any;
  uniqueTrucks: any;
  public date;
  public modelaccno: any;
  public modelIFSC: any;
  public modelBankName: any;
  public modelMobileNumber: any;
  public modelName: any;
  public modelSummary: any;
  public canBankNeftdetailslist;
  public show = false;
  public myFormGroup: FormGroup;
  public newData;
  public truckDataFound = false;
  public dbName;
  constructor(public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public router: Router,
    public formBuilder: FormBuilder,
    public handlefunction: handleFunction,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  find() {
    this.apiCallservice.handleData_New('NRCM_Information', 'CanaraBankNEFT/getCanBankNEFTTrucks', 1, 0)
      .subscribe((res: Response) => {
        this.uniqueTrucks = res;
        console.log(this.uniqueTrucks);
        // this.uniqueTrucks = this.handlefunction.reduceData2(res);
      });
  }

  findNEFTTruck() {
    this.apiCallservice.handleData_New(this.dbName, 'CanaraBankNEFT/getCanBankNEFTDetailsByTruck', 1, 1, {}, this.trucknopart)
      .subscribe((res: Response) => {
        this.truckDataFound = true;
        this.canBankNeftdetailslist = res;
      });
  }

  deleteOwnerDetails = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'CanaraBankNEFT/delCanBankNEFTDetails', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.find();
        });
    }
  };

  showDatabyid(yo) {
    this.handledata.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/CanaraBankNeft_HANDLER/CanaraBankNeftUpdate']);
  }

  getMobileNumber(i) {
    this.modelName = i.name;
    this.modelMobileNumber = i.mobileNo;
    this.modelBankName = i.bankName;
    this.modelIFSC = i.IFSC;
    this.modelaccno = i.accno;
    this.modelSummary = i.summary;
  }
  ngOnInit() {
    this.find();
  }
}
