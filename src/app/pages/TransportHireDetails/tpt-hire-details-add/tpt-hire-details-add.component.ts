import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { tpthire } from './tpthire';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-tpt-hire-details-add',
  templateUrl: './tpt-hire-details-add.component.html',
  styleUrls: ['./tpt-hire-details-add.component.css'],
  providers: [ApiCallsService]
})
export class TptHireDetailsAddComponent implements OnInit {
  fullCount: any;
  public myFormGroup: FormGroup;
  public model: tpthire;
  public modelSubmitted: tpthire;
  public submitted = false;
  public response: any;
  public regulartrucklist: any;
  public regularpartylist;
  public villagelist;
  public Date: string;
  public nofp: string;
  public TruckNo: string;
  public hamt: string;
  public Dest: string;
  public OwnerName: string;
  public PAN?: string;
  public advamt: string;
  public togglemenu = true;
  public dbName;
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.model = new tpthire();
    this.myFormGroup = this.formBuilder.group({
      date: [this.model.date, Validators.required],
      nameOfParty: [this.model.nameOfParty, Validators.required],
      truckNo: [this.model.truckNo, Validators.required],
      place: [this.model.place, Validators.required],
      hireAmount: [this.model.hireAmount, Validators.required],
      advance: [this.model.advance, Validators.required]
    });
    this.fetchBasic();
  }

  fetchBasic() {
    this.apiCallservice.handleData_New('NRCM_Information', 'Village/getVillageData', 1, 0)
      .subscribe((res: Response) => {
        this.villagelist = res;
      });

    this.apiCallservice.handleData_New('NRCM_Information', 'regularParty/getRegularPartyData', 1, 0)
      .subscribe((res: Response) => {
        this.regularpartylist = res;
      });

    this.apiCallservice.handleData_New('NRCM_Information', 'regularTruck/getregulartruckdata', 1, 0)
      .subscribe((res: Response) => {
        this.regulartrucklist = res;
      });

  }
  storeDailyData({ value, valid }: { value: tpthire, valid: boolean }) {
    this.submitted = true;
    this.apiCallservice.handleData_New(this.dbName, 'TPTHireDetails/addTPTHireDetails', 1, 0, value)
      .subscribe((x) => {
        this.apiCallservice.handleData_New(this.dbName, 'TPTHireDetails/TPTHireDetailsCountAll', 1, 0)
          .subscribe((res: Response) => {
            this.fullCount = res;
            { alert('Data entered Successfully'); }
          });
      });
  }

  back() {
    this.submitted = !this.submitted;
  }
  toggle() {
    this.togglemenu = !this.togglemenu;
    this.fetchBasic();
  }
}
