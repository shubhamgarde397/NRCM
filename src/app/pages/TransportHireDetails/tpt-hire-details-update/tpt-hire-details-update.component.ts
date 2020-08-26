import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormsModule } from '@angular/forms';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-tpt-hire-details-update',
  templateUrl: './tpt-hire-details-update.component.html',
  styleUrls: ['./tpt-hire-details-update.component.css'],
  providers: [ApiCallsService]
})
export class TptHireDetailsUpdateComponent implements OnInit {

  regulartrucklist: any;
  regularpartylist: any;
  villagelist: any;
  public show = false;
  public list;
  public village_name: string;
  public myFormGroup: FormGroup;
  nameOfParty;
  truckNo;
  place;
  public dbName = 1;
  public submitted = false;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public router: Router,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      date: [this.handledata.Data.date, Validators.required],
      nameOfParty: [this.handledata.Data.nameOfParty, Validators.required],
      truckNo: [this.handledata.Data.truckNo, Validators.required],
      place: [this.handledata.Data.place, Validators.required],
      hireAmount: [this.handledata.Data.hireAmount, Validators.required],
      advance: [this.handledata.Data.advance]
    });
    this.nameOfParty = this.handledata.Data.nameOfParty;
    this.truckNo = this.handledata.Data.truckNo;
    this.place = this.handledata.Data.place;
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
    const date = data.value.date;
    const nameOfParty = data.value.nameOfParty;
    const truckNo = data.value.truckNo;
    const place = data.value.place;
    const hireAmount = data.value.hireAmount;
    const advance = data.value.advance;
    const id = this.handledata.Data._id;
    this.arr = { date, nameOfParty, truckNo, place, hireAmount, advance, id };
    this.apiCallservice.handleData_New(0, 'TPTHireDetails/updateTPTHireDetails', 3, 0, this.arr)
      .subscribe((response: Response) => {
        this.router.navigate(['Navigation/DailyData_HANDLER']);
      });
  };

  back() {
    this.show = !this.show;
    this._location.back();
  }
}
