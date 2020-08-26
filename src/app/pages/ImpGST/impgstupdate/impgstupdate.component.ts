import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { Validators, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-impgstupdate',
  templateUrl: './impgstupdate.component.html',
  styleUrls: ['./impgstupdate.component.css'],
  providers: [ApiCallsService]
})
export class ImpgstupdateComponent implements OnInit {

  public show = false;
  public name: string;
  public gst: string;
  public dest: string;
  public myFormGroup: FormGroup;
  public submitted = false;
  public dbName = 'NRCM_Information';
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      name: this.handledata.Data.name,
      gst: this.handledata.Data.gst,
      dest: this.handledata.Data.dest
    });
    this.dest = this.handledata.Data.dest;
  }

  change = function (data) {
    this.submitted = true;
    const name = data.value.name;
    const gst = data.value.gst;
    const dest = data.value.dest;
    const id = this.handledata.Data._id;
    this.arr = { name, gst, dest, id };
    this.apiCallservice.handleData_New(this.dbName, 'impGstDetails/updateImpgstdetailsdata', 3, 0, this.arr)
      .subscribe((response: Response) => {
        this.sec.commonArray['impgstdetails'] = [];
        this.sec.commonArray['impgstdetails'] = response;
        this.show = !this.show;
        this._location.back();
      });
  };
  back() {
    this.show = !this.show;
  }

}




