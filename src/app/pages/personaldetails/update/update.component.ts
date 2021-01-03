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
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public villagenamelist: any;

  public show = false;
  public name: string;
  public pan: string;
  public mobileno: number;
  public myFormGroup: FormGroup;
  public submitted = false;
  public contactA;
  public contactArray = [];
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      name: [this.handledata.Data.name, Validators.required],
      pan: [this.handledata.Data.pan, [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      contact: [this.handledata.Data.contact]
    });
    this.contactArray = this.handledata.Data.contact;
  }

  back() {
    this.show = !this.show;
    this._location.back();
  }

  addMore() {
    this.contactArray.push(this.contactA)
  }

  deleteOne(i, j) {
    this.contactArray.splice(j, 1);

  }

  change = function (data) {
    this.submitted = true;

    let formbody = {}
    formbody['name'] = data.value.name;
    formbody['pan'] = data.value.pan;
    formbody['contact'] = this.contactArray;
    formbody['_id'] = this.handledata.Data._id;
    formbody['method'] = 'update';
    formbody['tablename'] = 'personaldetails';

    this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
      .subscribe((response: Response) => {
        alert(response['Status']);
        this.sec.commonArray['personaldetails'].forEach((res) => {
          if (res._id == this.handledata.Data._id) {
            res['name'] = data.value.name;
            res['pan'] = data.value.pan;
            res['contact'] = data.value.contact;
          }
        })

        this.show = !this.show;
        this._location.back();
      });

  };

}
