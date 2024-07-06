import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Http, Response } from '@angular/http';
import { Validators, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Router } from 'node_modules/@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
@Input()
export class UpdateComponent implements OnInit {



    public show = false;
    public reason: string;
    public myFormGroup: FormGroup;
    public dbName = '0';
    public submitted = false;
    constructor(
      public router:Router,
      public handledata: HandleDataService,
      public _location: Location,
      public formBuilder: FormBuilder,
      public apiCallservice: ApiCallsService,
      public sec: SecurityCheckService) {if(!this.sec.login){
        this.router.navigate([''])
      } }
  
    ngOnInit() {
      this.myFormGroup = this.formBuilder.group({
        reason: this.handledata.Data.reason
      });
    }
    change = function (data) {
      this.submitted = true;
      let formbody = {}
      formbody['reason'] = data.value.reason;
      formbody['_id'] = this.handledata.Data._id;
      formbody['method'] = 'update';
      formbody['tablename'] = 'missingLRReason';
  
      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: Response) => {
          alert(response['Status']);
          this.sec.commonArray['lrlist'].forEach((res) => {
            if (res._id == this.handledata.Data._id) { res['reason'] = data.value.reason }
          })
  
          this.show = !this.show;
          this._location.back();
        });
    };
  
    back() {
      this.show = !this.show;
      this._location.back();
    }
  
  }
  