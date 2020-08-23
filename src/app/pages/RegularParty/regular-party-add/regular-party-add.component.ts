import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { data } from './data';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-regular-party-add',
  templateUrl: './regular-party-add.component.html',
  styleUrls: ['./regular-party-add.component.css'],
  providers: [ApiCallsService]
})
export class RegularPartyAddComponent implements OnInit {

  public nopid: string;
  public myFormGroup: FormGroup;
  public model: data;
  public modelSubmitted: data;
  public submitted = false;
  public response: any;
  public name: string;

  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder, public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.model = new data(this.name);
    this.myFormGroup = this.formBuilder.group({
      name: [this.model.name, Validators.required]
    });
  }

  storeRegularPartyData({ value, valid }: { value: data, valid: boolean }) {
    this.submitted = true;
    this.apiCallservice.handleData_New(0, 'regularParty/addregularpartydata', 1, 0, value)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['regularparty'] = [];
        this.securityCheck.commonArray['regularparty'] = res;
      });
  }

  back() {
    this.submitted = !this.submitted;
  }
}
