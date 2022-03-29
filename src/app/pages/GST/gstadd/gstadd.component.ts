import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { gstdata } from './gstdata';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gstadd',
  templateUrl: './gstadd.component.html',
  styleUrls: ['./gstadd.component.css'],
  providers: [ApiCallsService]
})
export class GstaddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public model: gstdata;
  public modelSubmitted: gstdata; 8180957829
  public submitted = false;
  public villagenamelist: any;
  public gstdetailslist: any;
  public response: any;
  public Name: string;
  public Gst: string;
  public Dest: string;
  public village_name: string;
  public alertBoxSuccess = false;
  public dbName = 'NRCM_Information';
  public commonArray;
  public considerArray;
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,public location:Location,
    public securityCheck: SecurityCheckService, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService) { }



  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogst')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.model = new gstdata(this.Name, this.Gst, this.Dest);
    this.myFormGroup = this.formBuilder.group({
      name: [this.model.Name, Validators.required],
      gst: [this.model.GST_No, [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9]{1}[A-Z]{1}[0-9|A-Z]{1}')]],
      dest: [this.model.Village, Validators.required],
      addr2:'',
      addr3:'',
      cities:[],
      accNo:0,
      partyType:'',
      shortName:''
    });
  }

  storeGstDetailsData({ value, valid }: { value: gstdata, valid: boolean }) {
    this.submitted = true;
    value['method'] = 'insert';
    value['tablename'] = 'gstdetails';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, 0)
      .subscribe((res: any) => {
        alert(res['Status']);
        this.securityCheck.commonArray['gstdetails'].push(res);
        this.location.back()
      });
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.gstdetailslist = [];
    this.villagenamelist = [];
    this.gstdetailslist = this.commonArray.gstdetails;
    this.villagenamelist = this.commonArray.villagenames;
  }

  back() {
    this.submitted = false;
  }
}
