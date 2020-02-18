import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { advance } from './advance';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-advance-account-add',
  templateUrl: './advance-account-add.component.html',
  styleUrls: ['./advance-account-add.component.css'],
  providers: [ApiCallsService]
})
@Input()
export class AdvanceAccountAddComponent implements OnInit {


  public myFormGroup: FormGroup;
  public model: advance;
  public submitted = false;
  public togglemenu = true;

  public villagenamelist: any;
  public regularpartylist: any;
  public regulartrucklist: any;
  public fullCount: any;

  public Name: string;
  public Gst: string;
  public Dest: string;
  public dbName;
  public commonArray;
  constructor(
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService
  ) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.model = new advance(this.Name, this.Gst, this.Dest);
    this.myFormGroup = this.formBuilder.group({
      Date: [this.model.Date, Validators.required],
      nop: [this.model.FromParty, Validators.required],
      truckno: [this.model.TruckNo, Validators.required],
      place: [this.model.Dest, Validators.required],
      hamt: [this.model.HireAmount, Validators.required],
      adv: [this.model.Advance, Validators.required],
      recDate: [this.model.RecDate],
      Check: [this.model.Check]
    });
    this.find();
  }

  find() {

    this.apiCallservice.handleData_New(this.dbName, 'advanceAccount/AdvanceDataDetailsCountAll', 1, 0)
      .subscribe((res: Response) => {
        this.fullCount = res;
      });

    this.regulartrucklist = this.commonArray.RegularTruck;
    this.regularpartylist = this.commonArray.regularparty;
    this.villagenamelist = this.commonArray.villagenames;
  }

  store({ value, valid }: { value: advance, valid: boolean }) {
    if (value.Check == null) {
      value.Check = false;
    }
    this.submitted = true;
    this.apiCallservice.handleData_New(this.dbName, 'advanceAccount/addAdvanceData', 1, 0, value)
      .subscribe((res) => {
        this.apiCallservice.handleData_New(this.dbName, 'advanceAccount/AdvanceDataDetailsCountAll', 1, 0)
          .subscribe((res1: Response) => {
            { alert('Data entered Successfully'); }
            this.fullCount = res1;
          });
      });
  }

  back() {
    this.submitted = false;
  }

  toggle() {
    this.togglemenu = !this.togglemenu;
    this.find();
  }
}
