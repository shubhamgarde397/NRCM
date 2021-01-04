import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder, PatternValidator } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;
  public contactA: any;
  public contactArray: any = [];
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public handledata: HandleDataService, public formBuilder: FormBuilder, public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Z]*[a-z]*')]],
      pan: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      contact: []
    });
  }


  add({ value, valid }: { value: [{}], valid: boolean }) {
    let formBody = {}
    formBody['method'] = 'insert';
    formBody['tablename'] = 'personaldetails';
    formBody['name'] = value['name'];
    formBody['pan'] = value['pan'];
    formBody['contact'] = this.contactArray;

    this.submitted = true;
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, formBody, 0)
      .subscribe((res: any) => {
        alert('Added Successfully');

        let tempObj = {}
        tempObj['name'] = value['name'];
        tempObj['pan'] = value['pan'];
        tempObj['contact'] = this.contactArray;
        tempObj['_id'] = res._id;
        this.securityCheck.commonArray['personaldetails'].push(tempObj);
      });
  }

  addMore() {
    this.contactArray.push(this.contactA)
  }
  back() {
    this.submitted = false;
  }
}
