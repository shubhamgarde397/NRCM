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
  selector: 'app-regular-party-update',
  templateUrl: './regular-party-update.component.html',
  styleUrls: ['./regular-party-update.component.css'],
  providers: [ApiCallsService]
})
export class RegularPartyUpdateComponent implements OnInit {

  public show = false;
  public list;
  public name: string;
  public myFormGroup: FormGroup;

  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      name: [this.handledata.Data.name, [Validators.required]]
    });
  }
  change = function (data) {
    const name = data.value.name;
    const id = this.handledata.Data._id;
    this.arr = { name, id };
    this.apiCallservice.handleData_New('NRCM_Information', 'regularParty/updateregularparty', 3, 0, this.arr)
      .subscribe((response: Response) => {
        alert('done');
        this.sec.commonArray['regularparty'] = [];
        this.sec.commonArray['regularparty'] = response;
        this.show = !this.show;
        this._location.back();
      });
  };

  back() {
    this.show = !this.show;
    this._location.back();
  }

}
