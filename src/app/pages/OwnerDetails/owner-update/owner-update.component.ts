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
public typeOfVehicle;
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
  public type;
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
      drivingLicExpiry: [this.handledata.Data.drivingLicExpiry],
      policyExpiry: [this.handledata.Data.policyExpiry],
      regCardExpiry: [this.handledata.Data.regCardExpiry],
      fitnessExpiry: [this.handledata.Data.fitnessExpiry],
      typeOfVehicle: [this.handledata.Data.typeOfVehicle],
      aadhar: [this.handledata.Data.aadhar],
      dob: [this.handledata.Data.dob],
      contact: [this.handledata.Data.contact],
      accountName: '',
      accountNumber: '',
      bankName: '',
      ifsc: '',
      p: [this.handledata.Data.p],
      r: [this.handledata.Data.r],
      d: [this.handledata.Data.d],
      f: [this.handledata.Data.f],
      P: [this.handledata.Data.P],
      hbl: [this.handledata.Data.hbl],
      weight: [this.handledata.Data.weight]
    });
    
    this.contactArray = this.handledata.Data.contact;
    this.accountArray = this.handledata.Data.accountDetails;
    this.preferenceArray = this.handledata.Data.preferences;
    this.role = this.sec.role;
    this.type=this.handledata.Data.typeOfVehicle;
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
    formbody['drivingLicExpiry'] = data.value.drivingLicExpiry;
    formbody['policyExpiry'] = data.value.policyExpiry;
    formbody['regCardExpiry'] = data.value.regCardExpiry;
    formbody['fitnessExpiry'] = data.value.fitnessExpiry;
    formbody['typeOfVehicle'] = data.value.typeOfVehicle===undefined?this.handledata.Data.typeOfVehicle:data.value.typeOfVehicle;
    formbody['aadhar'] = data.value.aadhar;
    formbody['dob'] = data.value.dob;
    formbody['contact'] = this.contactArray;
    formbody['_id'] = this.handledata.Data._id;
    formbody['accountDetails'] = this.accountArray;
    formbody['preferences'] = this.preferenceArray;
    formbody['reference'] = this.handledata.Data.reference;
    formbody['method'] = 'update';
    formbody['tablename'] = 'ownerdetails';
    formbody['p'] = data.value.p;
    formbody['r'] = data.value.r;
    formbody['d'] = data.value.d;
    formbody['f'] = data.value.f;
    formbody['P'] = data.value.P;
    formbody['hbl'] = data.value.hbl;
    formbody['weight'] = data.value.weight;

    this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
      .subscribe((response: Response) => {
        if (response['Status'] === 'Updated') {
          alert(response['Status']);
          this.sec.commonArray['ownerdetails'].forEach((res) => {
            if (res._id == this.handledata.Data._id) {
              res['truckno'] = data.value.truckno;
              res['oname'] = data.value.oname;
              res['pan'] = data.value.pan;
              res['drivingLicExpiry'] = data.value.drivingLicExpiry;
              res['policyExpiry'] = data.value.policyExpiry;
              res['regCardExpiry'] = data.value.regCardExpiry;
              res['fitnessExpiry'] = data.value.fitnessExpiry;
              res['typeOfVehicle'] = data.value.typeOfVehicle===undefined?this.handledata.Data.typeOfVehicle[0]:data.value.typeOfVehicle;
              res['typeOfVehiclefirst'] = data.value.typeOfVehicle===undefined?this.handledata.Data.typeOfVehicle[0]:data.value.typeOfVehicle[0];
              res['aadhar'] = data.value.aadhar;
              res['dob'] = data.value.dob;
              res['contact'] = this.contactArray;
              res['accountDetails'] = this.accountArray;
              res['preferences'] = this.preferenceArray;
              res['reference'] = "";
              res['p'] = data.value.p;
              res['r'] = data.value.r;
              res['d'] = data.value.d;
              res['f'] = data.value.f;
              res['P'] = data.value.P;
              res['hbl'] = data.value.hbl;
              res['weight'] = data.value.weight;
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
