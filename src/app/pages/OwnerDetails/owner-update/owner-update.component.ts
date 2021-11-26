import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css'],
  providers: [ApiCallsService]
})
export class OwnerUpdateComponent implements OnInit {
  public villagenamelist: any;

  public show = false;
  public truckno: string;
  public oname: string;
  public pan: string;
  public mobileno: number;
  public myFormGroup: FormGroup;
  public submitted = false;
  public role = 6;
  public contactArray = [];
  public accountArray = [];
  public contactA;
  public preferenceArray = [];
  public pA;
  public villagedetailslist;
  public commonArray;
  public considerArray = [];
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }

  ngOnInit() {
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infoowner')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.myFormGroup = this.formBuilder.group({
      truckno: [this.handledata.Data.truckno],
      oname: [this.handledata.Data.oname],
      pan: [this.handledata.Data.pan],
      drivingLic: [this.handledata.Data.drivingLic],
      drivingLicExpiry: [this.handledata.Data.drivingLicExpiry],
      policy: [this.handledata.Data.policy],
      policyExpiry: [this.handledata.Data.policyExpiry],
      regCardExpiry: [this.handledata.Data.regCardExpiry],
      fitnessExpiry: [this.handledata.Data.fitnessExpiry],
      aadhar: [this.handledata.Data.aadhar],
      dob: [this.handledata.Data.dob],
      engNo: [this.handledata.Data.engNo],
      chasisNo: [this.handledata.Data.chasisNo],
      contact: [this.handledata.Data.contact],
      accountName: '',
      accountNumber: '',
      bankName: '',
      ifsc: ''
    });
    this.contactArray = this.handledata.Data.contact;
    this.accountArray = this.handledata.Data.accountDetails;
    this.preferenceArray = this.handledata.Data.preferences;
    this.role = this.sec.role;

    // SBH56
  }

  getInformationData() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.sec.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.sec.commonArray['villagenames'];
        this.fetchBasic();
      });
  }

  fetchBasic() {
    this.commonArray = this.sec.commonArray;
    this.villagedetailslist = this.commonArray.villagenames;
  }

  back() {
    this.show = !this.show;
    this._location.back();
  }
  change = function (data) {
    this.submitted = true;
    let formbody = {}
    formbody['truckno'] = data.value.truckno;
    formbody['oname'] = data.value.oname;
    formbody['pan'] = data.value.pan;
    formbody['drivingLic'] = data.value.drivingLic;
    formbody['drivingLicExpiry'] = data.value.drivingLicExpiry;
    formbody['policy'] = data.value.policy;
    formbody['policyExpiry'] = data.value.policyExpiry;
    formbody['regCardExpiry'] = data.value.regCardExpiry;
    formbody['fitnessExpiry'] = data.value.fitnessExpiry;
    formbody['aadhar'] = data.value.aadhar;
    formbody['dob'] = data.value.dob;
    formbody['engNo'] = data.value.engNo;
    formbody['chasisNo'] = data.value.chasisNo;
    formbody['contact'] = this.contactArray;
    formbody['_id'] = this.handledata.Data._id;
    formbody['accountDetails'] = this.accountArray;
    formbody['preferences'] = this.preferenceArray;
    formbody['reference'] = this.handledata.Data.reference;
    formbody['method'] = 'update';
    formbody['tablename'] = 'ownerdetails';

    this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
      .subscribe((response: Response) => {
        if (response['Status'] === 'Updated') {
          alert(response['Status']);
          this.sec.commonArray['ownerdetails'].forEach((res) => {
            if (res._id == this.handledata.Data._id) {
              res['truckno'] = data.value.truckno;
              res['oname'] = data.value.oname;
              res['pan'] = data.value.pan;
              res['drivingLic'] = data.value.drivingLic;
              res['drivingLicExpiry'] = data.value.drivingLicExpiry;
              res['policy'] = data.value.policy;
              res['policyExpiry'] = data.value.policyExpiry;
              res['regCardExpiry'] = data.value.regCardExpiry;
              res['fitnessExpiry'] = data.value.fitnessExpiry;
              res['aadhar'] = data.value.aadhar;
              res['dob'] = data.value.dob;
              res['engNo'] = data.value.engNo;
              res['chasisNo'] = data.value.chasisNo;
              res['contact'] = this.contactArray;
              res['accountDetails'] = this.accountArray;
              res['preferences'] = this.preferenceArray;
              res['reference'] = "";
            }
          })

          this.show = !this.show;
          this._location.back();
        }
      });

  };

  addMore() {
    this.contactArray.push(this.contactA)
    this.contactA = '';
  }

  deleteOne(i, j) {
    this.contactArray.splice(j, 1);
  }

  addaccount() {
    if (this.myFormGroup.value.accountnumber === '' || this.myFormGroup.value.accountname === '' || this.myFormGroup.value.bankname === '' || this.myFormGroup.value.ifsc === '') { alert('Cant enter empt entries!') } else {

      let tempObj = {};
      tempObj['accountName'] = this.myFormGroup.value.accountName;
      tempObj['accountNumber'] = this.myFormGroup.value.accountNumber;
      tempObj['bankName'] = this.myFormGroup.value.bankName;
      tempObj['ifsc'] = this.myFormGroup.value.ifsc;
      this.accountArray.push(tempObj);
      this.myFormGroup.patchValue({ accountName: '' });
      this.myFormGroup.patchValue({ accountNumber: '' });
      this.myFormGroup.patchValue({ bankName: '' });
      this.myFormGroup.patchValue({ ifsc: '' });
    }
  }

  deleteOneA(i, j) {
    if (confirm('Are you sure?')) {
      this.accountArray.splice(j, 1);
    }
  }

  addMoreP() {
    this.preferenceArray.push(this.pA)
    this.pA = ''
  }

  deleteOneP(i, j) {
    this.preferenceArray.splice(j, 1);
  }

}
