import { Component, OnInit } from '@angular/core';
import { driverdata } from './driverdata';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styleUrls: ['./driver-add.component.css'],
  providers: [ApiCallsService]
})
export class DriverAddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public model: driverdata;
  public modelSubmitted: driverdata;
  public submitted = false;
  public response: any;
  public TruckNo: string;
  public DriverName: string;
  public MobileNo: number;

  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.model = new driverdata(this.TruckNo, this.DriverName, this.MobileNo);
    this.myFormGroup = this.formBuilder.group({
      truckno: [this.model.TruckNo, [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[ ][A-Z]{2}[ ][0-9]{4}')]],
      dname: [this.model.DriverName, Validators.required],
      mobileno: [this.model.MobileNo, [Validators.required, Validators.pattern('^[9|8|7|6]{1}[0-9]{9}')]]
    });
  }

  storeDriverDetailsData({ value, valid }: { value: driverdata, valid: boolean }) {
    this.submitted = true;
    this.apiCallservice.handleData_New(0, 'driverDetails/adddriverdetailsdata', 1, 0, value)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['driverdetails'] = [];
        this.securityCheck.commonArray['driverdetails'] = res;
      });
  }

  back() {
    this.submitted = false;
  }
}
