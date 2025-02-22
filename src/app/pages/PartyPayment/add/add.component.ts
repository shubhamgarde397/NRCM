import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;
  public date = new Date();
  public paymentDate;
  public alertBoxSuccess = false;
  public dbName = 1;
  public partyType;
  public truckNamesOwner = [];
  public commonArray;
  public considerArray;
  public partyid;
  public nopid;
  public method;
  public gstdetailslist;
  public gstdetailslistid;
  public partyData = [];
  constructor(public apiCallservice: ApiCallsService, public handlefunction: handleFunction, public formBuilder: FormBuilder, public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService, public obs: ObsServiceService, public handledata: HandleDataService, public router: Router) {
      if(!this.securityCheck.login){
        this.router.navigate([''])
      }
  }

  ngOnInit() {
    this.paymentDate = this.handlefunction.getDate(this.handlefunction.generate2DigitNumber(this.date.getDate()), (this.date.getMonth() + 1), this.date.getFullYear());
    this.commonArray = this.securityCheck.commonArray;
    this.myFormGroup = this.formBuilder.group({
      partyName: ['', Validators.required],
      partyType:['',Validators.required],
      paymentDate: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.considerArray = this.handledata.createConsiderArray('infogstonly')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
  }


  findgst() {
    this.gstdetailslistid = this.handlefunction.findgst(this.nopid, this.gstdetailslist);

  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.gstdetailslist = [];
    this.gstdetailslist = this.commonArray.gstdetails;
  }

  sortgst(){
    this.fetchBasic();
    this.gstdetailslist=this.gstdetailslist.filter(r=>{return r.partyType===this.partyType})
  }

  storeTurnBookData({ value, valid }: { value: [{}], valid: boolean }) {
    this.submitted = true;
    let tempobj = {};
    tempobj['partyid'] = this.gstdetailslistid._id;
    tempobj['partyType']=this.partyType;
    tempobj['date'] = value['paymentDate'];
    tempobj['partyName']=this.gstdetailslistid.name;
    tempobj['done']=false;
    tempobj['amount'] = value['amount'];
    tempobj['tbids']=["61739cccd00acebeefa834e1"];
    tempobj['entryDate'] = this.date.getFullYear() + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getMonth() + 1)) + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getDate()));
    this.partyData.push(tempobj);//before pushing, check if it is duplicate or not.. write a function
    this.reset();

  }
  reset() {
    this.submitted = false;
    this.myFormGroup.patchValue({ partyName: '' });
    this.myFormGroup.patchValue({ amount: '' });
  }

  delete(data) {
    if (confirm('Are you sure?')) {
      this.partyData.splice(data, 1);
    }
  }
  submit() {
    this.submitted = true;
    let tempobj = {};
    tempobj['partyData'] = this.partyData;
    tempobj['entryDate'] = this.date.getFullYear() + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getMonth() + 1)) + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getDate()));
    tempobj['tablename'] = 'partyPayment';
    tempobj['method'] = 'partyPaymentInsert';
    tempobj['partyData'].map(r=>delete r['partyName']);
    this.submitted = true;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, true)
      .subscribe((res: any) => {
        alert(res.Status);
        this.router.navigate(['Navigation/PARTY_PAYMENT_HANDLER']);
        this.reset();
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
        tempArray=this.paymentDate.split('-');
        date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])-1)
        this.paymentDate = this.handlefunction.createDate(date);
        break;
      case 'ahead':
        tempArray=this.paymentDate.split('-');
        date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])+1)
        this.paymentDate = this.handlefunction.createDate(date);
        break;
    }
  }
}
