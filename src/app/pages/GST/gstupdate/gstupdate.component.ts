import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-gstupdate',
  templateUrl: './gstupdate.component.html',
  styleUrls: ['./gstupdate.component.css'],
  providers: [ApiCallsService]
})
export class GstupdateComponent implements OnInit {
  public villagenamelist: any;
  public show = false;
  public name: string;
  public gst: string;
  public dest: string;
  public myFormGroup: FormGroup;
  public submitted = false;
  public commonArray;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }
  public dbName = 'NRCM_Information';
  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      name: this.handledata.Data.name,
      gst: this.handledata.Data.gst,
      dest: this.handledata.Data.dest,
      addr2: this.handledata.Data.addr2,
      addr3: this.handledata.Data.addr3
    });
    this.dest = this.handledata.Data.dest;
    this.commonArray = this.sec.commonArray;
    this.villagenamelist = this.commonArray.villagenames;
  }

  change = function (data) {
    this.submitted = true;

    let formbody = {}
    formbody['name'] = data.value.name;
    formbody['gst'] = data.value.gst;
    formbody['dest'] = data.value.dest;
    formbody['addr2'] = data.value.addr2;
    formbody['addr3'] = data.value.addr3;
    formbody['_id'] = this.handledata.Data._id;
    formbody['method'] = 'update';
    formbody['tablename'] = 'gstdetails';

    this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
      .subscribe((response: Response) => {
        alert(response['Status']);
        this.sec.commonArray['gstdetails'].forEach((res) => {
          if (res._id == this.handledata.Data._id) {
            res['name'] = data.value.name;
            res['gst'] = data.value.gst;
            res['dest'] = data.value.dest;
          }
        })

        this.show = !this.show;
        this._location.back();
      });
  };
  back() {
    this.show = !this.show;
    this._location.back();
  }

}
