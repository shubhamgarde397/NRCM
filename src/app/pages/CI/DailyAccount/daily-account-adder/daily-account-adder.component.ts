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
    this.find();
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
  update(id,index){
    if((<HTMLInputElement>document.getElementById('name_'+index)).value==='Default'){
      alert('Select an account')
    }
    else{
    let tempObj={
      'tablename':'',
      'method':'storeDailyAdvanceAccId',
      '_id':id['_id'],
      'ownerid':id['newownerid'],
      'accid':parseInt((<HTMLInputElement>document.getElementById('name_'+index)).value)
    }

    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
      this.turn.splice(index, 1)
    });
  }
}
}
