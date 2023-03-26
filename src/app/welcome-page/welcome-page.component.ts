import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from '../common/services/Data/security-check.service';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  public avatar: any;
  public bin: number;
  binNumber = [];
  public arr=[];
  public lrStatusTF=false;
  constructor(public apiCallservice: ApiCallsService, public router: Router, public handledata: HandleDataService,
    public securityCheck: SecurityCheckService, public spin: Ng4LoadingSpinnerService, public sec: SecurityCheckService) { }

  ngOnInit() {
  }

  getLRStatus(){
    this.arr=this.handledata.getLRStatus();
    this.lrStatusTF=true;
  }

  findBin() {
    let number = this.bin;
    let tempBin = 0;
    let arr = [];
    while (number !== 1) {
      tempBin = number % 2;
      arr.push(tempBin);
      number = Math.floor(number / 2);
    }
    tempBin = number % 2;
    arr.push(tempBin);
    this.binNumber = arr.reverse();
    tempBin = 0;
    arr = [];
  }


  storeImage(image) {
  }

  moveTo(data) {
    switch (data) {
      case 'partyAdd':
        this.router.navigate(['Navigation/PARTY_PAYMENT_HANDLER/Add'])
        break;
      case 'partyDisplay':
        this.router.navigate(['Navigation/PARTY_PAYMENT_HANDLER/Display'])
        break;
      case 'turnAdd':
        this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookAdd'])
        break;
      case 'turnDisplay':
        this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookDispHandler'])
        break;
      case 'truckdetails':
        this.router.navigate(['Navigation/OWNER_HANDLER'])
        break;
    }

  }
}
