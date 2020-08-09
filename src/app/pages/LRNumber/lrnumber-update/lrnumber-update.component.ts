import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Validators, FormsModule } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-lrnumber-update',
  templateUrl: './lrnumber-update.component.html',
  styleUrls: ['./lrnumber-update.component.css'],
  providers: [ApiCallsService]
})
export class LRNumberUpdateComponent implements OnInit {
  ownerdetailslist: any;
  truckNo: any;
  public nameOfParty: any;
  public place: any;
  public gstdetailslist: any;
  public villagelist: any;
  public fullCount: any;
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;
  public dbName = 1;

  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      date: [this.handledata.Data.date, Validators.required],
      lrno: [this.handledata.Data.lrno, [Validators.required, Validators.pattern('^[0-9]{4}')]],
      nameOfParty: [this.handledata.Data.nameOfParty, Validators.required],
      truckNo: [this.handledata.Data.truckNo, Validators.required],
      place: [this.handledata.Data.place, Validators.required],
      recDate: [this.handledata.Data.recDate],
      Check: [this.handledata.Data.Check]
    });
    this.nameOfParty = this.handledata.Data.nameOfParty;
    this.truckNo = this.handledata.Data.truckNo;
    this.place = this.handledata.Data.place;
    this.find();
  }

  find() {
    this.apiCallservice.handleData_New(0, 'Village/getVillageData', 1, 0)
      .subscribe((res: Response) => {
        this.villagelist = res;
      });

    this.apiCallservice.handleData_New(0, 'gstDetails/getGSTDetails', 1, 0)
      .subscribe((res: Response) => {
        this.gstdetailslist = res;
      });

    this.apiCallservice.handleData_New(0, 'lrno/LRCountAll', 1, 0)
      .subscribe((res: Response) => {
        this.fullCount = res;
      });
    this.apiCallservice.handleData_New(0, 'ownerDetails/getOwnerDetails', 1, 0)
      .subscribe((res: Response) => {
        this.ownerdetailslist = res;
      });
  }

  change = function (data) {
    data.value.id = this.handledata.Data._id;
    this.apiCallservice.handleData_New(this.dbName, 'lrno/updateLRDetails', 3, 0, data.value)
      .subscribe((response: Response) => {
        this.show = !this.show;
        this._location.back();
      });
  };

  back() {
    this.submitted = !this.submitted;
  }
}
