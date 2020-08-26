import { Component, OnInit } from '@angular/core';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-finolex-handler',
  templateUrl: './finolex-handler.component.html',
  styleUrls: ['./finolex-handler.component.css'],
})
export class FinolexHandlerComponent implements OnInit {
  public check = true;
  public passwordCheck: string;
  constructor(
    public security: SecurityCheckService
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
  }

}
