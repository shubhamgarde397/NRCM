import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-gsthandler',
  templateUrl: './gsthandler.component.html',
  styleUrls: ['./gsthandler.component.css']
})
export class GsthandlerComponent implements OnInit {

  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) { }

  ngOnInit() {
  }

  indexing() {
    this.apiCallservice.handleData_New(this.securityCheck.saveFinancialYear, 'addIndex/createIndex', 1, 0)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
