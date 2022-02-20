import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { register } from './register';
import { FormsModule } from '@angular/forms';
import { SecurityCheckService } from '../../common/services/Data/security-check.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ApiCallsService]
})

export class RegisterComponent implements OnInit {
  public myFormGroup: FormGroup;
  public model: register;
  public modelSubmitted: register;
  public submitted = false;
  public response: any;
  public confirm_register = false;
  public new_value;
  public name: string;
  public dbName = 1;
  constructor(public router: Router, public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) {
  }

  ngOnInit() {
    this.model = new register(this.name);
    this.myFormGroup = this.formBuilder.group({
      username: [this.model.username, Validators.required],
      password: [this.model.password, Validators.required],
      confirm_password: [this.model.confirm_password, Validators.required]
    });
  }

  confirmNewUser({ value, valid }: { value: register, valid: boolean }) {
    if (value.password === value.confirm_password) {
      this.new_value = { username: value.username, password: value.password };
      this.submitted = true;
      this.confirm_register = true;
    } else {
      alert('Check your passwoord');
    }
  }

  storeNewUser(adminUname, adminPassword) {
 
  }

  back() {
    this.submitted = !this.submitted;
  }
}
