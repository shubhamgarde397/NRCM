import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lrnumber-display',
  templateUrl: './lrnumber-display.component.html',
  styleUrls: ['./lrnumber-display.component.css'],
  providers: [ApiCallsService]
})
export class LRNumberDisplayComponent implements OnInit {
  public show = false;
  public dbName = 1;
  public myFormGroup: FormGroup;
  public twotypes = 'date';
  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService, public router: Router,
    public securityCheck: SecurityCheckService, public formBuilder: FormBuilder) {
  }

  find = function () {
    this.apiCallservice.handleData_New(this.dbName, 'lrno/getLRDetails', 1, 0)
      .subscribe((res: Response) => {
        this.lrdetails = res;
      });
  };

  getDetails({ value, valid }: { value: {}, valid: boolean }) {
    this.apiCallservice.handleData_New(this.dbName, 'lrno/getLRDetails', 1, 0, value)
      .subscribe((res: Response) => {

      });
  }
  check() {
    this.twotypes = this.myFormGroup.value.twotypes;

  }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      lrno: [],
      twotypes: []
    });
  }
}
