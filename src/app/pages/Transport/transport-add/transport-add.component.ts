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
  public myFormGroup: FormGroup;
  public submitted = false;
  public contactA;
  public contactArray=[];
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,public location:Location,
    public securityCheck: SecurityCheckService, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService) { }



  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      tptName:'',
      name: '',
      pan:'',
      P:false,
      contact:[],
      addr1:'',
      addr2:'',
      addr3:'',
      email:''
    });
  }



  store(data) {
    data.value['contact']=this.contactArray
    this.submitted = true;
    data.value['method'] = 'insert';
    data.value['tablename'] = 'transport';
    this.apiCallservice.handleData_New_python
      ('commoninformation',
       1, data.value, true)
      .subscribe((res: any) => {
        alert(res['Status']);
        this.location.back()
      });
  }

  back() {
    this.submitted = false;
  }

  deleteArray(i) {
        this.contactArray.splice(i, 1);
  }

  addMore() {
    this.contactArray.push(this.contactA)
    this.contactA = '';
  }
}
