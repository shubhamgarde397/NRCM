import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { poch } from './poch';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { handleFunction } from '../../../common/services/functions/handleFunctions';
import { Consts } from '../../../common/constants/const';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-poch-account-add',
  templateUrl: './poch-account-add.component.html',
  styleUrls: ['./poch-account-add.component.css'],
  providers: [ApiCallsService, handleFunction]
})
export class PochAccountAddComponent implements OnInit {

  fullCount: any;
  public myFormGroup: FormGroup;
  public model: poch;
  public modelSubmitted: poch;
  public submitted = false;
  public villagenamelist: any;
  public response: any;
  public Name: string;
  public Gst: string;
  public Dest: string;
  public days = [];
  public yearNames = [];
  public monthNames = [];
  public regularpartylist: any;
  public regulartrucklist: any;
  public now = new Date();
  public d = this.days[this.now.getDate()];
  public m = this.monthNames[this.now.getMonth()];
  public y = this.now.getFullYear();
  public togglemenu = true;
  public dbName;

  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public handlefunction: handleFunction,
    public securityCheck: SecurityCheckService) {
    this.days = this.handlefunction.generateDays();
    this.yearNames = this.handlefunction.generateYears();
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.model = new poch(this.Name, this.Gst, this.Dest);
    this.myFormGroup = this.formBuilder.group({
      Date: [this.model.Date, Validators.required],
      nop: [this.model.FromParty, Validators.required],
      truckno: [this.model.TruckNo, Validators.required],
      place: [this.model.Dest, Validators.required],
      amt: [this.model.BalAmount, Validators.required],
      recDate: [this.model.RecDate],
      Check: [this.model.Check]
    });
    this.fetchBasic();
  }

  fetchBasic() {
    this.apiCallservice.handleData_New('NRCM_Information', 'Village/getVillageData', 1, 0)
      .subscribe((res: Response) => {
        this.villagenamelist = res;
      });

    this.apiCallservice.handleData_New('NRCM_Information', 'regularParty/getRegularPartyData', 1, 0)
      .subscribe((res: Response) => {
        this.regularpartylist = res;
      });

    this.apiCallservice.handleData_New('NRCM_Information', 'regularTruck/getregulartruckdata', 1, 0)
      .subscribe((res: Response) => {
        this.regulartrucklist = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'pochAccount/PochDetailsbyNameCountAll', 1, 0)
      .subscribe((res: Response) => {
        this.fullCount = res;
      });
  }

  storePochData({ value, valid }: { value: poch, valid: boolean }) {
    if (value.Check == null) {
      value.Check = false;
    }
    this.submitted = true;
    this.apiCallservice.handleData_New(this.dbName, 'pochAccount/addPochData', 1, 0, value)
      .subscribe((x) => {
        this.apiCallservice.handleData_New(this.dbName, 'pochAccount/PochDetailsbyNameCountAll', 1, 0)
          .subscribe((res: Response) => {
            this.fullCount = res;
            { alert('Data entered Successfully'); }
          });
      });
  }

  back() {
    this.submitted = false;
  }
  toggle() {
    this.togglemenu = !this.togglemenu;
    this.fetchBasic();
  }
}
