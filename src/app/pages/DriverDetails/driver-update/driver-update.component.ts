import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-driver-update',
  templateUrl: './driver-update.component.html',
  styleUrls: ['./driver-update.component.css'],
  providers: [ApiCallsService]
})
export class DriverUpdateComponent implements OnInit {
  public show = false;
  public bankname: string;
  public myFormGroup: FormGroup;
  public submitted = false;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      truckno: [this.handledata.Data.truckno, [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[ ][A-Z]{2}[ ][0-9]{4}')]],
      dname: [this.handledata.Data.dname, [Validators.required]],
      mobileno: [this.handledata.Data.mobileno, [Validators.required, Validators.pattern('^[9|8|7|6]{1}[0-9]{9}')]]
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
    const dname = data.value.dname;
    const mobileno = data.value.mobileno;
    this.arr = { truckno, dname, mobileno, id };
    this.apiCallservice.handleData_New(0, 'driverDetails/updatedriverdetailsdata', 3, 0, this.arr)
      .subscribe((response: Response) => {
        this.sec.commonArray['driverdetails'] = [];
        this.sec.commonArray['driverdetails'] = response;
        this.show = !this.show;
        this._location.back();
      });
  };

}
