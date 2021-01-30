import { Component, OnInit } from '@angular/core';
import { odata } from './odata';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder, PatternValidator } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-odadd',
  templateUrl: './odadd.component.html',
  styleUrls: ['./odadd.component.css'],
  providers: [ApiCallsService]
})
export class OdaddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public model: odata; // mapped it to a variable
  public modelSubmitted: odata;
  public submitted = false;
  public response: any;
  public TruckNo: string; // declared 3 variables
  public Name: string;
  public Pan: string;
  public MobileNo: string;
  public commonArray;
  public considerArray;
  public contactA: any;
  public contactArray: any = [];
  public accountArray = [];
  public villageArray = [];
  public preferenceArray;
  public preferenceA;
  public truckdetailslistid;
  public ownerdetailslist;
  public villagedetailslist;
  public tdid;
  public vid;
  public role = 6;
  constructor(public apiCallservice: ApiCallsService, public handlefunction: handleFunction, public spinnerService: Ng4LoadingSpinnerService, public handledata: HandleDataService, public formBuilder: FormBuilder, public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infoowner')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.model = new odata(this.TruckNo, this.Name, this.Pan, this.MobileNo);
    this.myFormGroup = this.formBuilder.group({
      truckno: [this.model.TruckNo, [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[ ]{0,1}[A-Z]{0,2}[ ][0-9]{4}')]],
      oname: [this.model.OwnerName,],
      pan: [this.model.PAN],
      contact: [],
      accountName: '',
      accountNumber: '',
      bankName: '',
      ifsc: '',
      reference: '',
      preferences: []
    });
    this.role = this.securityCheck.role;
  }
  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['ownerdetails'] = Object.keys(res.ownerdetails[0]).length > 0 ? res.ownerdetails : this.securityCheck.commonArray['ownerdetails'];
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.ownerdetailslist = this.commonArray.ownerdetails;
    this.villagedetailslist = this.commonArray.villagenames;
    console.log(this.villagedetailslist);

  }

  storeOwnerDetailsData({ value, valid }: { value: odata, valid: boolean }) {
    this.submitted = true;
    let formBody = {};
    formBody['method'] = 'insert';
    formBody['tablename'] = 'ownerdetails';
    formBody['truckno'] = value['truckno'];
    formBody['oname'] = value['oname'];
    formBody['pan'] = value['pan'];
    formBody['contact'] = this.contactArray;
    formBody['accountDetails'] = this.accountArray;
    formBody['preferences'] = this.villageArray;
    formBody['reference'] = this.truckdetailslistid === undefined ? "" : this.truckdetailslistid['_id'];
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, formBody, 0)
      .subscribe((res: any) => {
        alert('Added Successfully');
        let formres = {};
        formres['_id'] = value['res._id'];
        formres['truckno'] = value['truckno'];
        formres['oname'] = value['oname'];
        formres['pan'] = value['pan'];
        formres['contact'] = this.contactArray;
        formres['accountDetails'] = this.accountArray;
        formres['preferences'] = this.villageArray;
        formres['reference'] = this.truckdetailslistid === undefined ? "" : this.truckdetailslistid['_id'];
        this.securityCheck.commonArray['ownerdetails'].push(formres);
        this.reset();
      });
  }

  back() {
    this.submitted = false;
  }


  addMore() {
    this.contactArray.push(this.contactA)
    this.contactA = '';
  }
  addMoreV() {
    this.villageArray.push(this.vid)
    this.vid = '';
  }

  addaccount() {

    if (this.myFormGroup.value.accountNumber === '' || this.myFormGroup.value.accountName === '' || this.myFormGroup.value.bankName === '' || this.myFormGroup.value.ifsc === '') { alert('Cant enter empt entries!') } else {
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

  findtd() {
    this.truckdetailslistid = this.handlefunction.findowner(this.tdid, this.ownerdetailslist, 'Select Truck');
  }

  deleteArray(i, array) {
    switch (array) {
      case 1:
        this.contactArray.splice(i, 1);
        break;
      case 2:
        this.accountArray.splice(i, 1);
        break;
      case 3:
        this.villageArray.splice(i, 1);
        break;
    }
  }
  reset() {
    this.accountArray = [];
    this.villageArray = [];
    this.contactArray = [];
    this.submitted = false;
    this.myFormGroup.patchValue({ truckno: '' });
    this.myFormGroup.patchValue({ oname: '' });
    this.myFormGroup.patchValue({ pan: '' });
    this.myFormGroup.patchValue({ contact: [] });
    this.myFormGroup.patchValue({ accountName: '' });
    this.myFormGroup.patchValue({ accountNumber: '' });
    this.myFormGroup.patchValue({ bankName: '' });
    this.myFormGroup.patchValue({ ifsc: '' });
    this.myFormGroup.patchValue({ reference: '' });
    this.myFormGroup.patchValue({ preferences: [] });
  }
}
