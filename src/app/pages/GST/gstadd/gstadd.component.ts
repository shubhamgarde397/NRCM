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
import { Router } from 'node_modules/@angular/router';

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
  constructor(public router:Router,public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,public location:Location,
    public securityCheck: SecurityCheckService, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService) { if(!this.securityCheck.login){
      this.router.navigate([''])
    }}



  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogst')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.model = new gstdata(this.Name, this.Gst, this.Dest);
    this.myFormGroup = this.formBuilder.group({
      name: [this.model.Name, Validators.required],
      gst: [this.model.GST_No],
      dest: [this.model.Village, Validators.required],
      addr2:'',
      addr3:'',
      cities:[],
      accNo:0,
      partyType:'',
      shortName:'',
      email:[],
      contact:[],
      show:true
    });
  }

  storeGstDetailsData({ value, valid }: { value: gstdata, valid: boolean }) {
    this.submitted = true;
    value['method'] = 'gstinsert';
    value['tablename'] = 'gstdetails';
    // value['load']=value['partyType']=='NRCM'?[
    //   {
    //     "Pipe": {
    //       "Hire": 0,
    //       "Advance": 0
    //     }
    //   },
    //   {
    //     "Fittings": {
    //       "Hire": 0,
    //       "Advance": 0
    //     }
    //   }
    // ]:[
    //   {
    //     "Other": {
    //       "Hire": 0,
    //       "Advance": 0
    //     }
    //   }
    // ]
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        alert(res['Status']);
        this.securityCheck.commonArray['gstdetails'].push(res);
        this.location.back()
      });
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
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
