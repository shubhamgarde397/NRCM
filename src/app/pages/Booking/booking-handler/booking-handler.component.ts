import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/ApiCalls.service';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-booking-handler',
  templateUrl: './booking-handler.component.html',
  styleUrls: ['./booking-handler.component.css'],
})
export class BookingHandlerComponent implements OnInit {
  public check = true;
  public passwordCheck: string;
  public role = 6;
  public securityCheck;
  constructor(
    public security: SecurityCheckService, public apiCallservice: ApiCallsService, public spin: Ng4LoadingSpinnerService,
  ) { }

  login() {
    var data = this.security.authenticate(this.passwordCheck);
    if (data) {
      this.check = !this.check;
    }
    else {
      alert("You are not authorized to enter this page!");
    }
  }

  ngOnInit() {
    this.role = this.security.role;
  }



}
