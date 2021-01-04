import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder, PatternValidator } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

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
  public commonArray;
  public considerArray;
  public personaldetailslist;
  public truckdetailslist;
  public personaldetailslistid;
  public truckdetailslistid;
  public PID = false;
  public pdid;
  public tdid;
  public accountArray = [];
  constructor(public apiCallservice: ApiCallsService, public handlefunction: handleFunction, public spinnerService: Ng4LoadingSpinnerService, public handledata: HandleDataService, public formBuilder: FormBuilder, public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.myFormGroup = this.formBuilder.group({
      truckno: ['', [Validators.required]],
      name: ['', [Validators.required]],
      accountName: '',
      accountNumber: '',
      bankName: '',
      ifsc: ''
    });
    this.considerArray = this.handledata.createConsiderArray('infotruckpersonal')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['personaldetails'] = Object.keys(res.personaldetails[0]).length > 0 ? res.personaldetails : this.securityCheck.commonArray['personaldetails'];
        this.securityCheck.commonArray['truckdetails'] = Object.keys(res.truckdetails[0]).length > 0 ? res.truckdetails : this.securityCheck.commonArray['truckdetails'];
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.personaldetailslist = this.commonArray.personaldetails;
    this.truckdetailslist = this.commonArray.truckdetails;
  }

  addaccount() {

    if (this.myFormGroup.value.accountNumber === '' || this.myFormGroup.value.accountName === '' || this.myFormGroup.value.bankName === '' || this.myFormGroup.value.ifsc === '') { alert('Cant enter empt entries!') } else {
      let tempObj = {};
      tempObj['accountName'] = this.myFormGroup.value.accountName;
      tempObj['accountNumber'] = this.myFormGroup.value.accountNumber;
      tempObj['bankName'] = this.myFormGroup.value.bankName;
      tempObj['ifsc'] = this.myFormGroup.value.ifsc;
      this.accountArray.push(tempObj);
      this.myFormGroup.patchValue({ accountname: '' });
      this.myFormGroup.patchValue({ accountnumber: '' });
      this.myFormGroup.patchValue({ bankname: '' });
      this.myFormGroup.patchValue({ ifsc: '' });
    }

  }


  add({ value, valid }: { value: [{}], valid: boolean }) {
    let formBody = {}
    formBody['method'] = 'insert';
    formBody['tablename'] = 'truckdetails';
    formBody['personalDetails'] = this.personaldetailslistid['_id'];
    formBody['truckno'] = value['truckno'];
    formBody['accountDetails'] = this.accountArray;
    formBody['reference'] = this.truckdetailslistid['_id'];

    this.submitted = true;
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, formBody, 0)
      .subscribe((res: any) => {
        alert('Added Successfully');
        let tempObj = {};
        tempObj['personalDetails'] = this.personaldetailslistid['_id'];
        tempObj['truckno'] = value['truckno'];
        tempObj['accountDetails'] = this.accountArray;
        tempObj['reference'] = this.truckdetailslistid['_id'];
        tempObj['_id'] = res._id;
        this.securityCheck.commonArray['truckdetails'].push(tempObj);
      });
  }
  findpd() {
    this.personaldetailslistid = this.handlefunction.findowner(this.pdid, this.personaldetailslist, 'Select Name');
    this.PID = true;
  }
  findtd() {
    this.truckdetailslistid = this.handlefunction.findowner(this.tdid, this.truckdetailslist, 'Select Truck');
  }

  back() {
    this.submitted = false;
  }
}
