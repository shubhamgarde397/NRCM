import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule, Validators } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { bankname } from './bankname';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-bank-name-add',
  templateUrl: './bank-name-add.component.html',
  styleUrls: ['./bank-name-add.component.css'],
  providers: [ApiCallsService]
})
export class BankNameAddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public model: bankname;
  public modelSubmitted: bankname;
  public submitted = false;
  public response: any;
  public name: string;
  public IFSCode: string;

  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.model = new bankname(this.name, this.IFSCode);
    this.myFormGroup = this.formBuilder.group({
      bankname: [this.model.bankname, Validators.required],
      IFSCode: [this.model.IFSCode, Validators.required]
    });
  }

  storeBankNameData({ value, valid }: { value: bankname, valid: boolean }) {
    this.submitted = true;
    this.apiCallservice.handleData_New('NRCM_Information',
      'bankName/addbanknamedata', 1, 0, value)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['BankNames'] = [];
        this.securityCheck.commonArray['BankNames'] = res;
      });
  }

  back() {
    this.submitted = !this.submitted;
  }
}
