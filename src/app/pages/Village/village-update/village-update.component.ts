import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Http, Response } from '@angular/http';
import { Validators, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-village-update',
  templateUrl: './village-update.component.html',
  styleUrls: ['./village-update.component.css'],
  providers: [ApiCallsService]
})
@Input()
export class VillageUpdateComponent implements OnInit {

  public show = false;
  public village_name: string;
  public myFormGroup: FormGroup;
  public dbName = '0';
  public submitted = false;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      village_name: this.handledata.Data.village_name
    });
  }
  change = function (data) {
    this.submitted = true;
    const village_name = data.value.village_name;
    const id = this.handledata.Data._id;
    this.arr = { village_name, id };
    this.apiCallservice.handleData_New(this.dbName, 'Village/updatevillagedata', 3, 0, this.arr)
      .subscribe((response: Response) => {
        this.sec.commonArray['villagenames'] = [];
        this.sec.commonArray['villagenames'] = response;
        this.show = !this.show;
        this._location.back();
      });
  };

  back() {
    this.show = !this.show;
    this._location.back();
  }

}
