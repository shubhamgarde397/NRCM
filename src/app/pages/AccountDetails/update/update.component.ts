import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public villagenamelist: any;

  public show = false;
  public name: string;
  public pan: string;
  public mobileno: number;
  public myFormGroup: FormGroup;
  public submitted = false;
  public accountA;
  public accountArray = [];
  public pdid;
  public tdid;
  public personaldetailslistid;
  public truckdetailslistid;
  public personaldetailslist;
  public truckdetailslist;
  public commonArray;
  public refTruck;
  public pdpan;
  public pdcontact;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService, public handlefunction: handleFunction) { }

  ngOnInit() {
    this.commonArray = this.sec.commonArray;
    this.personaldetailslist = this.commonArray.personaldetails;
    this.truckdetailslist = this.commonArray.truckdetails;
    this.myFormGroup = this.formBuilder.group({
      truckno: [this.handledata.Data.truckno, [Validators.required]],
      tempname: [this.handledata.Data.name],
      name: [this.personaldetailslist[this.handledata.Data.index].name],
      accountName: '',
      accountNumber: '',
      bankName: '',
      ifsc: '',
      nametdid: ''
    });
    this.accountArray = this.handledata.Data.accountDetails;
    this.truckdetailslistid = this.truckdetailslist === undefined ? "" : this.truckdetailslist.find(element => element._id == this.handledata.Data.reference);
    let tempFinder = this.personaldetailslist.find(element => element._id == this.handledata.Data.personalDetails);
    this.personaldetailslistid = tempFinder === undefined ? { _id: "", pan: "", name: "", preferences: Array(0), contact: Array(0) } : tempFinder;
    this.tdid = this.truckdetailslistid === undefined ? "" : this.truckdetailslistid.truckno;
    this.pdid = this.personaldetailslistid === undefined ? "" : this.personaldetailslistid.name;
  }

  back() {
    this.show = !this.show;
    this._location.back();
  }

  addaccount() {
    if (this.myFormGroup.value.accountnumber === '' || this.myFormGroup.value.accountname === '' || this.myFormGroup.value.bankname === '' || this.myFormGroup.value.ifsc === '') { alert('Cant enter empt entries!') } else {

      let tempObj = {};
      tempObj['accountName'] = this.myFormGroup.value.accountName;
      tempObj['accountNumber'] = this.myFormGroup.value.accountNumber;
      tempObj['bankName'] = this.myFormGroup.value.bankName;
      tempObj['ifsc'] = this.myFormGroup.value.ifsc;
      this.accountArray.push(tempObj)
    }
  }

  deleteOne(i, j) {
    if (confirm('Are you sure?')) {
      this.accountArray.splice(j, 1);
    }
  }

  change = function (data) {
    this.submitted = true;

    let formBody = {}

    formBody['truckno'] = this.handledata.Data.truckno;
    formBody['personalDetails'] = this.personaldetailslistid['_id'];

    formBody['accountDetails'] = this.accountArray;
    formBody['reference'] = this.truckdetailslistid === undefined ? "" : this.truckdetailslistid['_id'];
    formBody['_id'] = this.handledata.Data._id;
    formBody['method'] = 'update';
    formBody['tablename'] = 'truckdetails';

    this.apiCallservice.handleData_New_python('commoninformation', 1, formBody, 0)
      .subscribe((response: Response) => {
        alert(response['Status']);
        this.sec.commonArray['truckdetails'].forEach((res) => {
          if (res._id == this.handledata.Data._id) {
            res['reference'] = this.truckdetailslistid === undefined ? "" : this.truckdetailslistid['_id'];
            res['accountDetails'] = this.accountArray;
            res['personalDetails'] = this.personaldetailslistid['_id'];
          }
        })

        this.show = !this.show;
        this._location.back();
      });

  };
  findpd() {

    this.personaldetailslistid = this.handlefunction.findowner(this.pdid, this.personaldetailslist, 'Select Name');
  }
  findtd() {

    this.truckdetailslistid = this.handlefunction.findowner(this.tdid, this.truckdetailslist, 'Select Truck');
  }
}
