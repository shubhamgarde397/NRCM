import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { village } from './village';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Location } from '@angular/common';

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
    public securityCheck: SecurityCheckService,public location:Location) { }

  ngOnInit() {
    this.model = new village(this.name);
    this.myFormGroup = this.formBuilder.group({
      village_name: [this.model.village_name, Validators.required],
      shortName:''
    });
  }

  storeVillageData({ value, valid }: { value: village, valid: boolean }) {
    this.submitted = true;
    value['method'] = 'insert';
    value['tablename'] = 'villagenames';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['villagenames'].push(res);
        this.location.back();
      });
  }

  back() {
    this.submitted = !this.submitted;
  }
}

