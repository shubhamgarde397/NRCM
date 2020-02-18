import { Component, OnInit } from '@angular/core';
import { odata } from './odata';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-odadd',
  templateUrl: './odadd.component.html',
  styleUrls: ['./odadd.component.css'],
  providers: [ApiCallsService]
})
export class OdaddComponent implements OnInit {
  public mobilenoauto;
  public myFormGroup: FormGroup;
  public model: odata; // mapped it to a variable
  public modelSubmitted: odata;
  public submitted = false;
  public response: any;
  public TruckNo: string; // declared 3 variables
  public Name: string;
  public Pan: string;
  public MobileNo: string;

  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder, public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.model = new odata(this.TruckNo, this.Name, this.Pan, this.MobileNo);
    this.myFormGroup = this.formBuilder.group({
      truckno: [this.model.TruckNo, [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[ ]{0,1}[A-Z]{0,2}[ ][0-9]{4}')]],
      oname: [this.model.OwnerName, Validators.required],
      pan: [this.model.PAN, [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      mobileno: [this.model.MobileNo, [Validators.required, Validators.pattern('^[9|8|7|6]{1}[0-9]{9}')]]
    });
  }

  storeOwnerDetailsData({ value, valid }: { value: odata, valid: boolean }) {
    this.submitted = true;
    value['newDB'] = this.securityCheck.saveFinancialYear;
    this.apiCallservice.handleData_New('NRCM_Information', 'ownerDetails/addownerdetailsdata', 1, 0, value)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['ownerdetails'] = [];
        this.securityCheck.commonArray['ownerdetails'] = res;
      });
  }

  back() {
    this.submitted = false;
  }

  appendContact() {
    this.mobilenoauto = '9999999999';
  }
}
