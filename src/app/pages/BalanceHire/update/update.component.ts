import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public villagenamelist: any;

  public show = false;
  public truckno: string;
  public oname: string;
  public pan: string;
  public mobileno: number;
  public myFormGroup: FormGroup;
  public submitted = false;
  public commonArray;
  public considerArray;
  public truckdetailslist;
  public trucknoid;
  public accountData = false;
  public truckArray;
  public accountdetailslist;
  public accountid;
  public accountNumber;
  public ifsc;
  public bankName;
  public editOption;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infoonlyowner')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchData();
    this.fetchData();

    this.myFormGroup = this.formBuilder.group({
      truckNo: '',
      bankName: this.handledata.Data.bankName,
      ifsc: this.handledata.Data.ifsc,
      accountNumber: this.handledata.Data.accountNumber,
      accountName: this.handledata.Data.accountName
    });
    this.editOption = this.handledata.Data.editOption;
  }
  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.truckdetailslist = this.commonArray.ownerdetails;
    this.truckArray = this.handledata.Data.truckData;
  };

  findAccountDetails() {
    this.accountData = true;
    this.accountdetailslist = [];
    this.accountdetailslist = this.truckdetailslist.find(r => r.truckno === this.trucknoid).accountDetails;
    this.myFormGroup.patchValue({ accountName: '' });
    this.myFormGroup.patchValue({ accountNumber: '' });
    this.myFormGroup.patchValue({ bankName: '' });
    this.myFormGroup.patchValue({ ifsc: '' });
  }
  findAccountDetails2() {
    let tempData = {};
    tempData = this.accountdetailslist.find(r => r.accountName === this.accountid);
    this.myFormGroup.patchValue({ accountName: tempData['accountName'] });
    this.myFormGroup.patchValue({ accountNumber: tempData['accountNumber'] });
    this.myFormGroup.patchValue({ bankName: tempData['bankName'] });
    this.myFormGroup.patchValue({ ifsc: tempData['ifsc'] });
  }


  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.sec.commonArray['ownerdetails'] = Object.keys(res.ownerdetails[0]).length > 0 ? res.ownerdetails : this.sec.commonArray['ownerdetails'];
        this.fetchData();
        this.spinnerService.hide();
      });
  }

  back() {
    this.show = !this.show;
    this._location.back();
  }
  change = function (data) {
    this.submitted = true;

    let tempObj = {}
    tempObj['method'] = 'update';
    tempObj['tablename'] = 'BalanceHire';
    tempObj['todayDate'] = this.handledata.Data.todayDate;
    tempObj['truckData'] = this.handledata.Data.truckData;
    tempObj['bankName'] = this.myFormGroup.value.bankName;
    tempObj['ifsc'] = this.myFormGroup.value.ifsc;
    tempObj['accountNumber'] = this.myFormGroup.value.accountNumber;
    tempObj['accountName'] = this.myFormGroup.value.accountName;
    tempObj['comments'] = this.handledata.Data.comments;
    tempObj['_id'] = this.handledata.Data._id;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((response: Response) => {
        let tempObj = this.sec.commonBalanceHire[this.handledata.Data.index];
        tempObj['bankName'] = this.myFormGroup.value.bankName;
        tempObj['ifsc'] = this.myFormGroup.value.ifsc;
        tempObj['accountNumber'] = this.myFormGroup.value.accountNumber;
        tempObj['accountName'] = this.myFormGroup.value.accountName;
        this.show = !this.show;
        this._location.back();
      });
  };

  makeFieldEditable(j){

  }

  enableInternalAddition(i,j){
    this.truckArray[j]['field']=false;
  }


}
