import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
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
  public submitted = false;
  public date = new Date();
  public truckno = '';
  public truckDate = '';
  public todayDate;
  public today;
  public dateFromUI;
  public truckArray = [];
  public commonArray;
  public trucklist;
  constructor(public apiCallservice: ApiCallsService, public handleF: handleFunction, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;

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
    });//todayDate

  }
  getTrucks() {
    this.trucklist = this.commonArray.ownerdetails;
  }
  addtrucks(data) {
    console.log(this.myFormGroup);

    //add trucks to an array say truckArray
    /**
     * truckarray=[]//declare in ngoninit()
     * truckarray.push(data)
     */
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

  saveBalanceHire({ value, valid }: { value: {}, valid: boolean }) {

    //send mainarrray to be inserted in db
    this.submitted = true;
    let tempObj = {}
    tempObj['method'] = 'insert';
    tempObj['tablename'] = 'BalanceHire';
    tempObj['todayDate'] = this.today;
    tempObj['truckData'] = this.truckArray;
    tempObj['bankname'] = '';
    tempObj['ifsc'] = '';
    tempObj['accountNumber'] = '';
    tempObj['accountName'] = '';
    console.log(tempObj);


    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.truckArray = [];
      });
  }

  leftRight(LR) {
    switch (LR) {
      case 'back':
        this.todayDate = this.todayDate - 1;
        this.today = this.handleF.getDate(this.todayDate, (this.date.getMonth() + 1), this.date.getFullYear());
        break;
      case 'ahead':
        this.todayDate = this.todayDate + 1;
        this.today = this.handleF.getDate(this.todayDate, (this.date.getMonth() + 1), this.date.getFullYear());
        break;
      case 'realDate':
        this.today = this.dateFromUI;
        break;
    }
  }

  back() {
    this.submitted = !this.submitted;
  }
}

