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
  selector: 'app-bank-details-update',
  templateUrl: './bank-details-update.component.html',
  styleUrls: ['./bank-details-update.component.css'],
  providers: [ApiCallsService]
})
export class BankDetailsUpdateComponent implements OnInit {
  public banknames: any;
  public truckbankdetailslist: any;

  public show = false;
  public Name: string;
  public Accno: string;
  public BankName: string;
  public IFSC: number;
  public myFormGroup: FormGroup;
  public submitted = false;
  public commonArray;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      Name: [this.handledata.Data.Name, Validators.required],
      Accno: [this.handledata.Data.Accno, Validators.required],
      BankName: [this.handledata.Data.BankName, Validators.required],
      IFSC: [this.handledata.Data.IFSC, Validators.required],
    });
    this.Name = this.handledata.Data.Name;
    this.BankName = this.handledata.Data.BankName;

    this.commonArray = this.sec.commonArray;
    this.banknames = this.commonArray.villagenames;
    this.truckbankdetailslist = this.commonArray.villagenames;
  }

  back() {
    this.show = !this.show;
    this._location.back();
  }

  change = function (data) {
    this.submitted = true;
    const id = this.handledata.Data._id;
    const Name = data.value.Name;
    const Accno = data.value.Accno;
    const BankName = data.value.BankName;
    const IFSC = data.value.IFSC;
    this.arr = { Name, Accno, BankName, IFSC, id };

    this.apiCallservice.handleData_New(0, 'bankDetails/updateBankDetails', 3, 0, this.arr)
      .subscribe((response: Response) => {
        this.show = !this.show;
        this._location.back();
      });
  };
}
