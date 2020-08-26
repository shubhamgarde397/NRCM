import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { impgst } from './impgst';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-impgstadd',
  templateUrl: './impgstadd.component.html',
  styleUrls: ['./impgstadd.component.css'],
  providers: [ApiCallsService]
})
export class ImpgstaddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public model: impgst;
  public modelSubmitted: impgst;
  public submitted = false;
  public response: any;
  public Name: string;
  public Gst: string;
  public Dest: string;
  public dbName = 'NRCM_Information';
  public commonArray;
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.model = new impgst(this.Name, this.Gst, this.Dest);
    this.myFormGroup = this.formBuilder.group({
      name: [this.model.Name, Validators.required],
      gst: [this.model.GST, [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9]{1}[A-Z]{1}[0-9|A-Z]{1}')]],
      dest: [this.model.Dest, Validators.required]
    });
  }

  storeImpGstDetailsData({ value, valid }: { value: impgst, valid: boolean }) {
    this.submitted = true;
    this.apiCallservice.handleData_New(this.dbName, 'impGstDetails/addimpgstdetailsdata', 1, 0, value)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['impgstdetails'] = [];
        this.securityCheck.commonArray['impgstdetails'] = res;
      });
  }

  back() {
    this.submitted = false;
  }
}
