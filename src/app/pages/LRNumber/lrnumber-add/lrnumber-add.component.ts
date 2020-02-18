import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { lrnumber } from './lrnumber';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-lrnumber-add',
  templateUrl: './lrnumber-add.component.html',
  styleUrls: ['./lrnumber-add.component.css'],
  providers: [ApiCallsService]
})
export class LRNumberAddComponent implements OnInit {
  ownerdetailslist: any;
  public gstdetailslist: any;
  public villagelist: any;
  public fullCount: any;
  public myFormGroup: FormGroup;
  public model: lrnumber;
  public modelSubmitted: lrnumber;
  public submitted = false;
  public response: any;
  public dbName;

  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.model = new lrnumber();
    this.myFormGroup = this.formBuilder.group({
      date: [this.model.date, Validators.required],
      lrno: [this.model.lrno, [Validators.required, Validators.pattern('^[0-9]{4}')]],
      nameOfParty: [this.model.nameOfParty, Validators.required],
      truckNo: [this.model.truckNo, Validators.required],
      place: [this.model.place, Validators.required],
      recDate: [this.model.RecDate],
      Check: [this.model.Check]
    });
    this.find();
  }

  find() {
    this.apiCallservice.handleData_New('NRCM_Information', 'Village/getVillageData', 1, 0)
      .subscribe((res: Response) => {
        this.villagelist = res;
      });

    this.apiCallservice.handleData_New('NRCM_Information', 'gstDetails/getGSTDetails', 1, 0)
      .subscribe((res: Response) => {
        this.gstdetailslist = res;
      });

    this.apiCallservice.handleData_New(this.dbName, 'lrno/LRCountAll', 1, 0)
      .subscribe((res: Response) => {
        this.fullCount = res;
      });

    this.apiCallservice.handleData_New('NRCM_Information', 'gstDetails/getGSTDetails', 1, 0)
      .subscribe((res: Response) => {
        this.gstdetailslist = res;
      });

    this.apiCallservice.handleData_New('NRCM_Information', 'ownerDetails/getOwnerDetails', 1, 0)
      .subscribe((res: Response) => {
        this.ownerdetailslist = res;
      });
  }
  store({ value, valid }: { value: lrnumber, valid: boolean }) {
    this.submitted = true;
    if (value.Check == null) {
      value.Check = false;
    }
    this.apiCallservice.handleData_New(this.dbName, 'lrno/addLRDetails', 1, 0, value)
      .subscribe((x) => {
        this.apiCallservice.handleData_New(this.dbName, 'lrno/LRCountAll', 1, 0)
          .subscribe((res: Response) => {
            this.fullCount = res;
            { alert('Data entered Successfully'); }
          });
      });
  }

  back() {
    this.submitted = !this.submitted;
  }
}
