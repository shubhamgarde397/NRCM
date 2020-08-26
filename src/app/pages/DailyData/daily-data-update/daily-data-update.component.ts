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
  selector: 'app-daily-data-update',
  templateUrl: './daily-data-update.component.html',
  styleUrls: ['./daily-data-update.component.css'],
  providers: [ApiCallsService]
})
export class DailyDataUpdateComponent implements OnInit {

  regulartrucklist: any;
  regularpartylist: any;
  villagelist: any;
  public show = false;
  public list;
  public village_name: string;
  public myFormGroup: FormGroup;
  nofp;
  TruckNo;
  Dest;
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
      Date: [this.handledata.Data.Date, Validators.required],
      nofp: [this.handledata.Data.nofp, Validators.required],
      TruckNo: [this.handledata.Data.TruckNo, Validators.required],
      Dest: [this.handledata.Data.Dest, Validators.required],
      hamt: [this.handledata.Data.hamt, Validators.required],
      advamt: [this.handledata.Data.advamt]
    });
    this.nofp = this.handledata.Data.nofp;
    this.TruckNo = this.handledata.Data.TruckNo;
    this.Dest = this.handledata.Data.Dest;
    this.fetchBasic();

  }

  fetchBasic() {
    this.apiCallservice.handleData_New(0, 'Village/getVillageData', 1, 0)
      .subscribe((res: Response) => {
        this.villagelist = res;
      });

    this.apiCallservice.handleData_New(0, 'regularParty/getRegularPartyData', 1, 0)
      .subscribe((res: Response) => {
        this.regularpartylist = res;
      });

    this.apiCallservice.handleData_New(0, 'regularTruck/getregulartruckdata', 1, 0)
      .subscribe((res: Response) => {
        this.regulartrucklist = res;
      });
  }

  change = function (data) {
    this.submitted = true;
    const Date = data.value.Date;
    const nofp = data.value.nofp;
    const TruckNo = data.value.TruckNo;
    const Dest = data.value.Dest;
    const hamt = data.value.hamt;
    const advamt = data.value.advamt;
    const id = this.handledata.Data._id;
    this.arr = { Date, nofp, TruckNo, Dest, hamt, advamt, id };
    this.apiCallservice.handleData_New(this.dbName, 'dailyData/updateDailyDataDetails', 3, 0, this.arr)
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
