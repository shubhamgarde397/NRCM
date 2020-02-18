import { Component, OnInit } from '@angular/core';
import { truckbank } from './truckbank';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-bank-truck-details',
  templateUrl: './add-bank-truck-details.component.html',
  styleUrls: ['./add-bank-truck-details.component.css'],
  providers: [ApiCallsService]
})
export class AddBankTruckDetailsComponent implements OnInit {

  public myFormGroup: FormGroup;
  public model: truckbank;
  public modelSubmitted: truckbank;
  public submitted = false;
  public response: any;
  public TruckNo: string;
  public AccountName: string;

  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.model = new truckbank(this.TruckNo, this.AccountName);
    this.myFormGroup = this.formBuilder.group({
      truckno: [this.model.TruckNo, [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[ ]{0,1}[A-Z]{0,2}[ ][0-9]{4}')]],
      accountname: [this.model.AccountName, Validators.required],
    });
  }

  storeTruckBankDetailsData({ value, valid }: { value: truckbank, valid: boolean }) {
    this.submitted = true;
    this.apiCallservice.handleData_New('NRCM_Information', 'truckBankDetails/addtruckbankdetailsdata', 1, 0, value)
      .subscribe(x => { alert('Data entered Successfully'); });
  }

  back() {
    this.submitted = false;
  }
}
