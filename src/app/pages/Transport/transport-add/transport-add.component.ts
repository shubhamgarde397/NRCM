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
  selector: 'app-transport-add',
  templateUrl: './transport-add.component.html',
  styleUrls: ['./transport-add.component.css'],
  providers: [ApiCallsService]
})
export class TransportAddComponent implements OnInit {
  // public myFormGroup: FormGroup;
  // public submitted = false;
  // public villagenamelist: any;
  // public gstdetailslist: any;
  // public response: any;
  // public Name: string;
  // public Gst: string;
  // public Dest: string;
  // public village_name: string;
  // public alertBoxSuccess = false;
  // public dbName = 'NRCM_Information';
  // public commonArray;
  // public considerArray;
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,public location:Location,
    public securityCheck: SecurityCheckService, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService) { }



  ngOnInit() {
    // this.commonArray = this.securityCheck.commonArray;
    // this.considerArray = this.handledata.createConsiderArray('infogst')
    // this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    // this.myFormGroup = this.formBuilder.group({
    //   tptName:'',
    //   tptLocation:'',
    //   name: '',
    //   pan:'',
    //   contact:[],
    //   address:'',
    //   location:''
    // });
  }

  // storeGstDetailsData(data) {
  //   let value={}
  //   this.submitted = true;
  //   value['method'] = 'insert';
  //   value['tablename'] = 'transportdetails';
  //   this.apiCallservice.handleData_New_python
  //     ('commoninformation', 1, value, 0)
  //     .subscribe((res: any) => {
  //       alert(res['Status']);
  //       this.securityCheck.commonArray['gstdetails'].push(res);
  //       this.location.back()
  //     });
  // }

  // getInformationData() {
  //   this.spinnerService.show();
  //   let tempObj = { "method": "displaynew", "consider": this.considerArray };
  //   this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
  //     .subscribe((res: any) => {
  //       this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
  //       this.fetchBasic();
  //       this.spinnerService.hide();
  //     });
  // }

  // fetchBasic() {
  //   this.commonArray = this.securityCheck.commonArray;
  //   this.villagenamelist = [];
  //   this.villagenamelist = this.commonArray.villagenames;
  // }

  // back() {
  //   this.submitted = false;
  // }
}
