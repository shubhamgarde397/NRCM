import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule, Validators } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-regular-truck-update',
  templateUrl: './regular-truck-update.component.html',
  styleUrls: ['./regular-truck-update.component.css'],
  providers: [ApiCallsService]
})
@Input()
export class RegularTruckUpdateComponent implements OnInit {

  public show = false;
  public list;
  public regulartruck: string;
  public myFormGroup: FormGroup;

  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      regulartruck: [this.handledata.Data.regulartruck,
      [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[ ][A-Z]{2}[ ][0-9]{4}')]]
    });
  }
  change = function (data) {
    this.submitted = true;
    let formbody = {}
    formbody['regulartruck'] = data.value.regulartruck;
    formbody['_id'] = this.handledata.Data._id;
    formbody['method'] = 'update';
    formbody['tablename'] = 'RegularTruck';

    this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
      .subscribe((response: Response) => {
        alert(response['Status']);
        this.sec.commonArray['RegularTruck'].forEach((res) => {
          if (res._id == this.handledata.Data._id) { res['regulartruck'] = data.value.regulartruck }
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
