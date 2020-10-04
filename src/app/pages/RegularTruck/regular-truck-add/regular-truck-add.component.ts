import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { regulartruck } from './regulartruck';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-regular-truck-add',
  templateUrl: './regular-truck-add.component.html',
  styleUrls: ['./regular-truck-add.component.css'],
  providers: [ApiCallsService]
})
export class RegularTruckAddComponent implements OnInit {

  public myFormGroup: FormGroup;
  public model: regulartruck;
  public modelSubmitted: regulartruck;
  public submitted = false;
  public response: any;
  public name: string;

  constructor(
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService
  ) { }

  ngOnInit() {
    this.model = new regulartruck(this.name);
    this.myFormGroup = this.formBuilder.group({
      regulartruck: [this.model.regulartruck, [Validators.required, Validators.pattern(('^[A-Z]{2}[0-9]{2}[ ]{0,1}[A-Z]{0,2}[ ][0-9]{4}'))]]
    });
  }

  storeRegularTruckData({ value, valid }: { value: regulartruck, valid: boolean }) {
    this.submitted = true;
    value['method'] = 'insert';
    value['tablename'] = 'RegularTruck';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, 0)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['RegularTruck'].push(res);
      });
  }
  back() {
    this.submitted = !this.submitted;
  }
}
