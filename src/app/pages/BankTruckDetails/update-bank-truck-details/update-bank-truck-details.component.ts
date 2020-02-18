import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-bank-truck-details',
  templateUrl: './update-bank-truck-details.component.html',
  styleUrls: ['./update-bank-truck-details.component.css'],
  providers: [ApiCallsService]
})
export class UpdateBankTruckDetailsComponent implements OnInit {

  public show = false;
  public bankname: string;
  public myFormGroup: FormGroup;
  public submitted = false;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      truckno: [this.handledata.Data.truckno, Validators.required],
      accountname: [this.handledata.Data.accountname, Validators.required],
    });
  }

  back() {
    this.show = !this.show;
    this._location.back();
  }

  change = function (data) {
    this.submitted = true;
    const id = this.handledata.Data._id;
    const truckno = data.value.truckno;
    const accountname = data.value.accountname;
    this.arr = { truckno, accountname, id };
    this.apiCallservice.handleData_New('NRCM_Information', 'truckBankDetails/updateTruckBankdetailsdata', 3, 0, this.arr)
      .subscribe((response: Response) => {
        this.show = !this.show;
        this._location.back();
      });
  };
}
