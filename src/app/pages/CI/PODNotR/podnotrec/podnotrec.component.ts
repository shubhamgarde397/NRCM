import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-podnotrec',
  templateUrl: './podnotrec.component.html',
  styleUrls: ['./podnotrec.component.css']
})
export class PODNOTRECComponent implements OnInit {
  public turnbooklist;
public todaysDate;
public date=new Date();
public uitodayDate=''
public tableSelected=false;

  constructor(public sec:SecurityCheckService,public handleF:handleFunction,public apiCallservice:ApiCallsService,public handleData:HandleDataService,public router:Router,public spinnerService:Ng4LoadingSpinnerService) { 
    if(!this.sec.login){
      this.router.navigate([''])
    }
  }

  ngOnInit() {
    this.uitodayDate = this.handleF.getDate(this.handleF.generate2DigitNumber(this.date.getDate()), (this.date.getMonth() + 1), this.date.getFullYear());
    this.todaysDate = this.handleF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    // this.find();
  }

  find = function () {
    this.spinnerService.show();
    let tempObj = {};
    tempObj['tablename'] = ''
    tempObj['method'] = 'pochNotReceivedNR'
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, true)
      .subscribe((res: any) => {
        this.bhTrucks=[];
          this.turnbooklist = res.Data;
          this.tableSelected=true;
          this.spinnerService.hide();
      });

  };
}

