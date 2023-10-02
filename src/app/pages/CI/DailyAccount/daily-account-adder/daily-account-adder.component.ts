import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-daily-account-adder',
  templateUrl: './daily-account-adder.component.html',
  styleUrls: ['./daily-account-adder.component.css'],
  providers: [ApiCallsService]
})
export class DailyAccountAdderComponent implements OnInit {

  public turn=[];
  public showdues=false;
public nrcmid=0;
public admin=false;

  constructor(public apiCallservice: ApiCallsService,public handledata: HandleDataService,public sec:SecurityCheckService) { }

  ngOnInit() {
    this.nrcmid=this.sec.nrcmid;
    this.admin=true?this.nrcmid==1:false;
  }

  find(){
    let tempObj={
      'tablename':'',
      'method':'getDailyAdvanceEmpty'
    }

    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      this.turn=res.Data
      this.showdues=true;
    });
  }     
  update(){
let temp=[];
    for(let i=0;i<this.turn.length;i++){

    if(
      (<HTMLInputElement>document.getElementById('rent_'+i)).value===''
      ||
      (<HTMLInputElement>document.getElementById('adv_'+i)).value===''
      ||
      (<HTMLInputElement>document.getElementById('advDate_'+i)).value===''
      ||
      (<HTMLInputElement>document.getElementById('tBal_'+i)).value===''
      ||
      (<HTMLInputElement>document.getElementById('wgt_'+i)).value===''
      ){}
    else{
      temp.push(
        {
          'ownerid':this.turn[i]['ownerid'],
          '_id':this.turn[i]['_id'],
          'rent':(<HTMLInputElement>document.getElementById('rent_'+i)).value,
          'adv':(<HTMLInputElement>document.getElementById('adv_'+i)).value,
          'advDate':(<HTMLInputElement>document.getElementById('advDate_'+i)).value,
          'tBal':(<HTMLInputElement>document.getElementById('tBal_'+i)).value,
          'w':(<HTMLInputElement>document.getElementById('wgt_'+i)).value,
        }
      )
    }
  }
    let tempObj={
      'tablename':'',
      'method':'storeDailyAdvanceAccId',
      'data':temp
    }

    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
    });
  }

}
