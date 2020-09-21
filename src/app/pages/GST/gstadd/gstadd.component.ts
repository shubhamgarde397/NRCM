import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { gstdata } from './gstdata';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-gstadd',
  templateUrl: './gstadd.component.html',
  styleUrls: ['./gstadd.component.css'],
  providers: [ApiCallsService]
})
export class GstaddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public model: gstdata;
  public modelSubmitted: gstdata;
  public submitted = false;
  public villagenamelist: any;
  public response: any;
  public Name: string;
  public Gst: string;
  public Dest: string;
  public village_name: string;
  public alertBoxSuccess = false;
  public dbName = 'NRCM_Information';
  public commonArray;
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) { }



  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.model = new gstdata(this.Name, this.Gst, this.Dest);
    this.myFormGroup = this.formBuilder.group({
      name: [this.model.Name, Validators.required],
      gst: [this.model.GST_No, [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9]{1}[A-Z]{1}[0-9|A-Z]{1}')]],
      dest: [this.model.Village, Validators.required]
    });

    this.villagenamelist = this.commonArray.villagenames;
  }

  storeGstDetailsData({ value, valid }: { value: gstdata, valid: boolean }) {
    this.submitted = true;
    value['method'] = 'insert';
    value['tablename'] = 'gstdetails';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, 0)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['gstdetails'].push(res);
      });
  }

  back() {
    this.submitted = false;
  }
}
