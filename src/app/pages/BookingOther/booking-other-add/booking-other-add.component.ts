import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-booking-other-add',
  templateUrl: './booking-other-add.component.html',
  styleUrls: ['./booking-other-add.component.css']
})
@Input()
export class BookingOtherAddComponent implements OnInit {


  public myFormGroup: FormGroup;
  public submitted = false;
  public togglemenu = true;

  public villagenamelist: any;
  public regularpartylist: any;
  public regulartrucklist: any;
  public fullCount: any;

  public Name: string;
  public Gst: string;
  public Dest: string;
  public commonArray;
  public hireamount;
  public advanceamount;
  public pendingAmount = 0;
  constructor(
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService,
    public handlefunction: handleFunction
  ) {
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.myFormGroup = this.formBuilder.group({
      Date: ['', Validators.required],
      nop: ['', Validators.required],
      truckno: ['', Validators.required],
      place: ['', Validators.required],
      hireamt: [0, Validators.required],
      advance: [0, Validators.required],
      pending_amount: [0],
      adv_recDate: [''],
      adv_Check: [''],
      poch_givenDate: [''],
      poch_Check: [''],
      cash_recDate: [''],
    });
    this.find();
  }

  find() {
    this.regulartrucklist = this.commonArray.RegularTruck;
    this.regularpartylist = this.commonArray.regularparty;
    this.villagenamelist = this.commonArray.villagenames;
  }

  // https://wxbwagxbqh.execute-api.ap-south-1.amazonaws.com/dev
  store({ value, valid }: { value: {}, valid: boolean }) {
    let formbody = {};
    formbody['partyid'] = value['nop'];
    formbody['truckid'] = value['truckno'];
    formbody['placeid'] = value['place'];
    formbody['Date'] = value['Date']
    formbody['hireamt'] = value['hireamt']
    formbody['advance'] = value['advance']
    formbody['pending_amount'] = this.pendingAmount;
    formbody['adv_recDate'] = value['adv_recDate']
    formbody['adv_Check'] = value['adv_Check']
    formbody['poch_givenDate'] = value['poch_givenDate']
    formbody['poch_Check'] = value['poch_Check']
    formbody['cash_recDate'] = value['cash_recDate']
    formbody['method'] = 'insert';
    this.submitted = true;
    console.log(formbody);
    this.apiCallservice.handleData_New_python('otherbooking', 1, formbody, 1)
      .subscribe((res: any) => {
        alert('Added Successfully');
      });
  }

  pendingAmountCalculate() {
    this.pendingAmount = this.hireamount - this.advanceamount;
  }

  back() {
    this.submitted = false;
  }

}
