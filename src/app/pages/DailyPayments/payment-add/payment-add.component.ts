import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Http } from '@angular/http';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css']
})
export class PaymentAddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;
  public date = new Date();
  public commonArray;
  public days = [];
  public yearNames = [];
  public m;
  public y;
  public role;
  public method;
  public cashFlowDate;
  constructor(public apiCallservice: ApiCallsService, public handlefunction: handleFunction,
    public http: Http, public formBuilder: FormBuilder, public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService, public obs: ObsServiceService, public handledata: HandleDataService,
    public router:Router) {
    this.days = this.handlefunction.generateDays();
    this.yearNames = this.securityCheck.yearNames;
  }



  ngOnInit() {
    this.cashFlowDate = this.handlefunction.getDate(this.handlefunction.generate2DigitNumber(this.date.getDate()), (this.date.getMonth() + 1), this.date.getFullYear());
    this.obs.dateService.subscribe((res: any) => {
      let arr = res.split('_');
      this.m = this.handlefunction.generateMonthName(arr[0]);
      this.y = arr[1];
    })

    this.myFormGroup = this.formBuilder.group({
      cashFlowDate:['',Validators.required],
      cashFlowAmount:[0,Validators.required],
      cashFlowReason:['',Validators.required],
    });

    this.role = this.securityCheck.role;
  }


  revert() {
    this.myFormGroup.patchValue({ truckNo: '' });

  }

  store(data) {
    this.submitted = true;
    let tempobj = {};
    tempobj['cashFlowDate'] = this.cashFlowDate;
    tempobj['cashFlowAmount'] = this.myFormGroup.value.cashFlowAmount;
    tempobj['cashFlowReason'] = this.myFormGroup.value.cashFlowReason;
    tempobj['entryDate'] = this.date.getFullYear() + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getMonth() + 1)) + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getDate()));
    tempobj['tablename'] = '';
    tempobj['method'] = 'insertPayment';
    tempobj['option'] = data;
    tempobj['userid'] = this.securityCheck.userid;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, true)
        .subscribe((res: any) => {
          alert(res.Status)
        });
  }

  back() {
    this.submitted = false;
  }

  leftRight(LR) {
    let tempArray;
    let date;
    switch (LR) {
      case 'back':
        tempArray=this.cashFlowDate.split('-');
        date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])-1)
        this.cashFlowDate = this.handlefunction.createDate(date);
        break;
      case 'ahead':
        tempArray=this.cashFlowDate.split('-');
        date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])+1)
        this.cashFlowDate = this.handlefunction.createDate(date);
        break;
    }
  }
}