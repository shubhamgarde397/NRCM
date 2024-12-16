import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: [ApiCallsService]
})
export class TicketComponent implements OnInit {
  public today;
  public date ;
  public tickets=[];
  public msg='Click Get Tickets.'
  public tabletransport=false;
  constructor(public apiCallservice: ApiCallsService,public handledata:HandleDataService,public router:Router,public sec:SecurityCheckService) {if(!this.sec.login){
    this.router.navigate([''])
  }
  }

  ngOnInit() {
  }

  find(){
    this.msg='Please Wait! Loading...'
    let tempObj = {};
    tempObj['tablename'] = ''
    tempObj['method'] = 'myticket_pending';
    tempObj['type']='tptowner'
    tempObj['id']=this.sec.userid;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.tickets=[];
          this.tickets = res.Data;
          this.tabletransport=res.Data.length>0?true:false;
          this.msg=this.tabletransport?'':'No Pending Tickets!'
      });
  }
  reject(data,i){
    let tempObj={}
    tempObj['method']='rejectTptTicket';
    tempObj['tablename']='';
    tempObj['_id']=this.tickets[data]['oid']
 this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
         alert(res.Status);
         this.tickets.splice(data,1)
      });
  }
}

