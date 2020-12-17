import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-advance-account-update',
  templateUrl: './advance-account-update.component.html',
  styleUrls: ['./advance-account-update.component.css'],
  providers: [ApiCallsService]
})
export class AdvanceAccountUpdateComponent implements OnInit {

  public regulartrucklist: any;
  public regularpartylist: any;
  public villagenamelist: any;
  public show = false;
  public list;
  public village_name: string;
  public myFormGroup: FormGroup;
  public nop;
  public truckno;
  public place;
  public pmode;
  public submitted = false;
  public commonArray;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.myFormGroup = this.formBuilder.group({
      Date: [this.handledata.Data.Date, Validators.required],
      nop: [this.handledata.Data.nop, Validators.required],
      truckno: [this.handledata.Data.truckno, Validators.required],
      place: [this.handledata.Data.place, Validators.required],
      hamt: [this.handledata.Data.hamt, Validators.required],
      adv: [this.handledata.Data.adv, Validators.required],
      recDate: [this.handledata.Data.recDate],
      Check: [this.handledata.Data.Check],
      pmode: [this.handledata.Data.paymentMode],
      tamt: [this.handledata.Data.tamt]
    });
    this.nop = this.handledata.Data.nop;
    this.truckno = this.handledata.Data.truckno;
    this.place = this.handledata.Data.place;
    this.pmode = this.handledata.Data.pmode;
    this.find();
  }

  find() {
    this.villagenamelist = this.commonArray.villagenames;
    this.regularpartylist = this.commonArray.regularparty;
    this.regulartrucklist = this.commonArray.RegularTruck;
  }

  update = function (data) {
    this.submitted = true;
    data.value.id = this.handledata.Data._id;
    this.apiCallservice.handleData_New(1, 'advanceAccount/updateAdvanceAccountdata', 3, 0, data.value)
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
