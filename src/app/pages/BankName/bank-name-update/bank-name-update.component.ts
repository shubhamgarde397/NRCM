import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule, Validators } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-bank-name-update',
  templateUrl: './bank-name-update.component.html',
  styleUrls: ['./bank-name-update.component.css'],
  providers: [ApiCallsService]
})
export class BankNameUpdateComponent implements OnInit {
  public banknames: any;
  public truckbankdetailslist: any;

  public show = false;
  public bankname: string;
  public myFormGroup: FormGroup;
  public submitted = false;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      bankname: [this.handledata.Data.bankname, Validators.required],
      IFSCode: [this.handledata.Data.IFSCode, Validators.required],
    });
  }

  back() {
    this.show = !this.show;
    this._location.back();
  }

  change = function (data) {
    this.submitted = true;
    const id = this.handledata.Data._id;
    const bankname = data.value.bankname;
    const IFSCode = data.value.IFSCode;
    this.arr = { bankname, IFSCode, id };
    this.apiCallservice.handleData_New('NRCM_Information', 'bankName/updateBankNamedata', 3, 0, this.arr)
      .subscribe((response: Response) => {
        this.sec.commonArray['BankNames'] = [];
        this.sec.commonArray['BankNames'] = response;
        this.show = !this.show;
        this._location.back();
      });
  };

}
