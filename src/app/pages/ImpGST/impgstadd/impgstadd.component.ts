import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-impgstadd',
  templateUrl: './impgstadd.component.html',
  styleUrls: ['./impgstadd.component.css'],
  providers: [ApiCallsService]
})
export class ImpgstaddComponent implements OnInit {
  public myFormGroup: FormGroup;
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,public location:Location,
    public securityCheck: SecurityCheckService, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService) { }



  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      gst: '',
      custCode:'',
      dest: '',
      addr:'',
      lrshort:''
    });
  }

  storeGstDetailsData({}) {
    let temp={};
    temp['name']=this.myFormGroup.value.name;
    temp['gstno']=this.myFormGroup.value.gst;
    temp['addr']=this.myFormGroup.value.addr;
    temp['dest']=this.myFormGroup.value.dest;
    temp['lrshort']=this.myFormGroup.value.lrshort;
    temp['custcode']=this.myFormGroup.value.custCode;
    temp['method'] = 'impinsert';
    temp['tablename'] = 'impgstdetails';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, temp, true)
      .subscribe((res: any) => {
        alert(res['Status']);
      });
  }

}
