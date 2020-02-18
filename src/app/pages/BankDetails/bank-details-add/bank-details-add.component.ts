import { Component, OnInit } from '@angular/core';
import { bankdetails } from './bankdetails';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Consts } from '../../../common/constants/const';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-bank-details-add',
  templateUrl: './bank-details-add.component.html',
  styleUrls: ['./bank-details-add.component.css'],
  providers: [ApiCallsService]
})
export class BankDetailsAddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public model: bankdetails;
  public modelSubmitted: bankdetails;
  public submitted = false;
  public response: any;
  public truckbankdetailslist: any;
  public banknames: any;
  public Name: string;
  public Accno: number;
  public BankName: string;
  public IFSC: string;

  public banknameC: string;
  public ifscC: string;
  public dbName;
  public commonArray;
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder, public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.banknames = this.commonArray.BankNames;
    this.truckbankdetailslist = this.commonArray.TruckBankDetails;

    this.model = new bankdetails(this.Name, this.Accno, this.BankName, this.IFSC);
    this.myFormGroup = this.formBuilder.group({
      Name: [this.model.Name, Validators.required],
      Accno: [this.model.Accno, Validators.required],
      BankName: [this.model.BankName, Validators.required],
      IFSC: [this.model.IFSC, Validators.required],
    });

  }

  setIFSC() {
    this.ifscC = this.banknameC;
  }

  storeBankDetailsData({ value, valid }: { value: bankdetails, valid: boolean }) {
    this.submitted = true;
    this.apiCallservice.handleData_New('NRCM_Information', 'bankDetails/addBankDetails', 1, 0, value)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['BankDetails'] = [];
        this.securityCheck.commonArray['BankDetails'] = res;
      });
  }

  back() {
    this.submitted = false;
  }
}
