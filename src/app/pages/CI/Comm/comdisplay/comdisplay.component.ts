import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
@Component({
  selector: 'app-comdisplay',
  templateUrl: './comdisplay.component.html',
  styleUrls: ['./comdisplay.component.css'],
  providers: [ApiCallsService]
})
export class ComdisplayComponent implements OnInit {

public billno='';
public data=[];
public table=false;
public billamt=0;

  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService,
    public handleF:handleFunction

  ) { }

  ngOnInit() {
   
  }

  

  find(){
    let tempObj = {}
    tempObj['tablename'] = ''
    tempObj['method'] = 'getCommission'
    tempObj['billno'] = this.billno;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.data=res.Data;
        this.table=true;
      });
  }

  edit(){
    let a=prompt('Enter the new amount');
    let tempObj = {}
    tempObj['tablename'] = ''
    tempObj['method'] = 'editCommission'
    tempObj['billno'] = this.billno;
    tempObj['billamt']=parseInt(a);

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
      });
  }




}


