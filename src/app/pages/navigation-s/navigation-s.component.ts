import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { Location } from '@angular/common';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PassDataService } from 'src/app/pass-data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation-s.component.html',
  styleUrls: ['./navigation-s.component.css'],
  providers: [ApiCallsService, HandleDataService],
})
@Input()
@Component({
  selector: 'app-navigation-s',
  templateUrl: './navigation-s.component.html',
  styleUrls: ['./navigation-s.component.css']
})
export class NavigationSComponent implements OnInit {
  public data;

  public now = new Date();
  public day = this.now.getDate();
  public month = this.now.getMonth();
  public year = this.now.getFullYear();
  public AUTH;
  public date = new Date();
  public username;
  public nameOfUser = 'Guest';
  
public loginUsers=[]
public disabledUsername=''
public Basic=false;
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public location: Location,
    public hd:HandleDataService,
    public securityCheck: SecurityCheckService,
    public spin: Ng4LoadingSpinnerService,
    public obs: ObsServiceService,
    public hF: handleFunction,
    private obsp:PassDataService,
    public formBuilder: FormBuilder,
    public spinnerService: Ng4LoadingSpinnerService,
  ) { }

  ngOnInit() {
    this.username = this.securityCheck.username;
    this.month = this.date.getMonth() + 1
    this.year = this.date.getFullYear();
    this.obs.saveDate(this.hF.generate2DigitNumber(String(this.month)) + '_' + this.year)

    this.Basic=true;
  }


  
  logoutS() {
    this.router.navigate(['']);
  }

  basic(){
    this.Basic=false;
  }
}


