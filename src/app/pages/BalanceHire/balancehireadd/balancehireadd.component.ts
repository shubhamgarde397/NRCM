import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-balancehireadd',
  templateUrl: './balancehireadd.component.html',
  styleUrls: ['./balancehireadd.component.css']
})
export class BalancehireaddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public date = new Date();
  public truckno = '';
  public truckDate = '';
  public todayDate;
  public today;
  public truckArray = [];
  public commonArray;
  public trucklist;
  public gAD;
  constructor(public apiCallservice: ApiCallsService, public handleF: handleFunction, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.trucklist = this.commonArray.ownerdetails;
    this.todayDate = this.date.getDate();
    this.today = this.handleF.getDate(this.date.getDate(), (this.date.getMonth() + 1), this.date.getFullYear());

    this.myFormGroup = this.formBuilder.group({
      truckno: ['', Validators.required],
      pageno: ['', Validators.required],
      amount: ['', Validators.required],
      truckDate: ['', Validators.required],
      bankname: '',
      ifsc: '',
      accountNumber: '',
      accountName: ''
    });
  }

  addtrucks() {
    if (this.truckDate === '' || this.truckno === '' || this.myFormGroup.value.pageno === '' || this.myFormGroup.value.amount === '') { alert('Cant enter empt entries!') } else {
      let tempObj = {};
      tempObj['date'] = this.truckDate;
      tempObj['truckno'] = this.truckno;
      tempObj['pageno'] = this.myFormGroup.value.pageno;
      tempObj['amount'] = this.myFormGroup.value.amount;
      this.truckArray.push(tempObj);
      this.myFormGroup.patchValue({ truckno: '' });
      this.myFormGroup.patchValue({ truckDate: '' });
      this.myFormGroup.patchValue({ pageno: '' });
      this.myFormGroup.patchValue({ amount: '' });
    }

  }

  getADD() {
    this.truckArray.forEach((res) => {
      this.gAD = this.trucklist.find(r => r.truckno === res.truckno);
      if (this.gAD !== undefined) {
        return this.gAD;
      } else {
        this.gAD = { 'accountDetails': [] };
        return this.gAD;
      }
    });
  }

  saveBalanceHire({ value, valid }: { value: {}, valid: boolean }) {
    let tempObj = {}
    tempObj['method'] = 'insert';
    tempObj['tablename'] = 'BalanceHire';
    tempObj['todayDate'] = this.today;
    tempObj['truckData'] = this.truckArray;
    this.getADD();
    tempObj['bankName'] = (this.gAD['accountDetails'].length > 1 || this.gAD['accountDetails'].length == 0) ? '' : this.gAD['accountDetails'][0]['bankName'];
    tempObj['ifsc'] = (this.gAD['accountDetails'].length > 1 || this.gAD['accountDetails'].length == 0) ? '' : this.gAD['accountDetails'][0]['ifsc'];
    tempObj['accountNumber'] = (this.gAD['accountDetails'].length > 1 || this.gAD['accountDetails'].length == 0) ? '' : this.gAD['accountDetails'][0]['accountNumber'];
    tempObj['accountName'] = (this.gAD['accountDetails'].length > 1 || this.gAD['accountDetails'].length == 0) ? '' : this.gAD['accountDetails'][0]['accountName'];
    tempObj['comments'] = '';
    tempObj['print'] = false;
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        alert(res['Status']);
        this.truckArray = [];
      });
  }

  leftRight(LR) {
    switch (LR) {
      case 'back':
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        this.todayDate = this.todayDate - 1;
        this.today = this.handleF.getDate(this.todayDate, (this.date.getMonth() + 1), this.date.getFullYear());
        break;
      case 'ahead':
        this.todayDate = this.todayDate + 1;
        this.today = this.handleF.getDate(this.todayDate, (this.date.getMonth() + 1), this.date.getFullYear());
        break;
    }
  }

  deleteRow(j) {
    if (confirm('Are you sure?')) {
      this.truckArray.splice(j, 1);
    }
  }
}

