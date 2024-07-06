import { Component, OnInit } from '@angular/core';
import { Router } from 'node_modules/@angular/router';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-balance-hire-handler',
  templateUrl: './balance-hire-handler.component.html',
  styleUrls: ['./balance-hire-handler.component.css']
})
export class BalanceHireHandlerComponent implements OnInit {
public nrcmid=0;
  constructor(
    public sec:SecurityCheckService,
    public router:Router
  ) { if(!this.sec.login){
    this.router.navigate([''])
  }}

  ngOnInit() {
this.nrcmid=this.sec.nrcmid;
  }

}
