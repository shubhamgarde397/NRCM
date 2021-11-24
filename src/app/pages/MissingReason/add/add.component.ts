import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;
  public name: string;
  public dbName = 'NRCM_Information';
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService,public _location: Location) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      reason: ['', Validators.required]
    });
  }

  store({ value, valid }: { value: [{}], valid: boolean }) {
    this.submitted = true;
    value['method'] = 'insert';
    value['tablename'] = 'missingLRReason';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, 0)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['lrlist'].push({'reason':value['reason'],'_id':res._id});
        this._location.back();
      });
  }

  back() {
    this.submitted = !this.submitted;
  }
}

