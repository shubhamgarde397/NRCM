import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { village } from './village';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-villageadd',
  templateUrl: './villageadd.component.html',
  styleUrls: ['./villageadd.component.css'],
  providers: [ApiCallsService]
})

export class VillageaddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public model: village;
  public modelSubmitted: village;
  public submitted = false;
  public response: any;
  public name: string;
  public dbName = 'NRCM_Information';
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.model = new village(this.name);
    this.myFormGroup = this.formBuilder.group({
      village_name: [this.model.village_name, Validators.required]
    });
  }

  storeVillageData({ value, valid }: { value: village, valid: boolean }) {
    this.submitted = true;
    value['method'] = 'insert';
    value['tablename'] = 'villagenames';
    this.apiCallservice.handleData_New_python
      ('commoninformation/commonmethods', 1, value, 0)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['villagenames'].push(res);
      });
  }

  back() {
    this.submitted = !this.submitted;
  }
}

