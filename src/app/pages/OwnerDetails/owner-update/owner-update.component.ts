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
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css'],
  providers: [ApiCallsService]
})
export class OwnerUpdateComponent implements OnInit {
  public villagenamelist: any;

  public show = false;
  public truckno: string;
  public oname: string;
  public pan: string;
  public mobileno: number;
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
      truckno: [this.handledata.Data.truckno, [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[ ]{0,1}[A-Z]{0,2}[ ][0-9]{4}')]],
      oname: [this.handledata.Data.oname, Validators.required],
      pan: [this.handledata.Data.pan, [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      mobileno: [this.handledata.Data.mobileno, [Validators.required, Validators.pattern('^[9|8|7|6]{1}[0-9]{9}')]]
    });
  }

  back() {
    this.show = !this.show;
    this._location.back();
  }
  change = function (data) {
    this.submitted = true;

    let formbody = {}
    formbody['truckno'] = data.value.truckno;
    formbody['oname'] = data.value.oname;
    formbody['pan'] = data.value.pan;
    formbody['mobileno'] = data.value.mobileno;
    formbody['_id'] = this.handledata.Data._id;
    formbody['method'] = 'update';
    formbody['tablename'] = 'ownerdetails';

    this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
      .subscribe((response: Response) => {
        alert(response['Status']);
        this.sec.commonArray['ownerdetails'].forEach((res) => {
          if (res._id == this.handledata.Data._id) {
            res['truckno'] = data.value.truckno;
            res['oname'] = data.value.oname;
            res['pan'] = data.value.pan;
            res['mobileno'] = data.value.mobileno;
          }
        })

        this.show = !this.show;
        this._location.back();
      });

  };

}
