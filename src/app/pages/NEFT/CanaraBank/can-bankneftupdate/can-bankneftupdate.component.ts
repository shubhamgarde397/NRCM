import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-can-bankneftupdate',
  templateUrl: './can-bankneftupdate.component.html',
  styleUrls: ['./can-bankneftupdate.component.css'],
  providers: [ApiCallsService]
})
export class CanBANKNEFTUpdateComponent implements OnInit {
  truckbankdetailslist: any;
  IFSC: any;
  showBankNameIFSC: boolean;
  bankuniqudetaillist: any;
  banknamepart;
  showBankName: boolean;
  bankdetaillist: any;
  namepart;
  trucknopart;
  showPersonName: boolean;
  listofnames: any;
  public villagenamelist: any;
  public show = false;
  public name: string;
  public gst: string;
  public dest: string;
  public myFormGroup: FormGroup;
  public truckNo;
  public bankName;
  public dbName = 1;
  public submitted = false;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {


    this.myFormGroup = this.formBuilder.group({
      accType: [this.handledata.Data.accType, [Validators.required]],
      accDate: [this.handledata.Data.accDate, [Validators.required]],
      truckNo: [this.handledata.Data.truckNo, [Validators.required]],
      name: [this.handledata.Data.name, [Validators.required]],
      bankName: [this.handledata.Data.bankName, [Validators.required]],
      IFSC: [this.handledata.Data.IFSC, [Validators.required]],
      accno: [this.handledata.Data.accno, [Validators.required]],
      amt: [this.handledata.Data.amt, [Validators.required]],
      summary: [this.handledata.Data.summary, [Validators.required]],
      transferType: [this.handledata.Data.transferType, [Validators.required]],
      paymentDate: [this.handledata.Data.paymentDate],
      mobileNo: [this.handledata.Data.mobileNo]
    });
    this.truckNo = this.handledata.Data.truckNo;
    this.bankName = this.handledata.Data.bankName;
    this.IFSC = this.handledata.Data.IFSC;
    this.name = this.handledata.Data.name;
    this.dest = this.handledata.Data.dest;

    this.fetchTruckBankDetails();
  }

  fetchTruckBankDetails() {
    this.apiCallservice.handleData_New(0, 'truckBankDetails/getTruckBankDetails', 1, 0).
      subscribe((res: Response) => {
        this.truckbankdetailslist = res;
      });
  }

  findbd() {
    this.apiCallservice.handleData_New(0, 'truckBankDetails/getTruckBankDetailsbyid', 1, 1, {}, this.trucknopart)
      .subscribe((res: Response) => {
        this.listofnames = res;
        this.myFormGroup.patchValue({ bankName: '' });
        this.myFormGroup.patchValue({ IFSC: '' });
        this.myFormGroup.patchValue({ accno: '' });
        this.showPersonName = true;
      });
  }

  findbankdetails() {
    this.apiCallservice.handleData_New(0, 'bankDetails/getBankDetailsbyid', 1, 1, {}, this.namepart)
      .subscribe((res: Response) => {
        this.bankdetaillist = res;
        this.showBankName = true;
      });
  }

  finduniquebankdetails() {
    this.apiCallservice.handleData_New(0, 'bankDetails/getUniqueBankDetailsbyid',
      1, 2, {}, this.banknamepart, this.namepart)
      .subscribe((res: Response) => {
        this.bankuniqudetaillist = res;
        this.showBankNameIFSC = true;
        if (!this.bankuniqudetaillist[0]) {
          this.myFormGroup.patchValue({ IFSC: '' });
          this.myFormGroup.patchValue({ accno: '' });
        } else {
          this.myFormGroup.patchValue({ IFSC: this.bankuniqudetaillist[0].IFSC });
          this.myFormGroup.patchValue({ accno: this.bankuniqudetaillist[0].Accno });
        }
      });
  }

  change = function (data) {
    this.submitted = true;
    data.value.id = this.handledata.Data._id;
    this.apiCallservice.handleData_New(this.dbName, 'CanaraBankNEFT/updateCanBankNEFTDetails', 3, 0, data.value)
      .subscribe((response: Response) => {
        this.show = !this.show;
        this._location.back();
      });
  };
  back() {
    this.show = !this.show;
    this._location.back();
  }

}
