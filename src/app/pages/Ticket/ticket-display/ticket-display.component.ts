import { Component, OnInit,  } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';

@Component({
  selector: 'app-ticket-display',
  templateUrl: './ticket-display.component.html',
  styleUrls: ['./ticket-display.component.css'],
  providers: [ApiCallsService]
})
export class TicketDisplayComponent implements OnInit {
  public today;
  public date ;
  public role = 6;
  public table=false;
  public tickets=[];
  public msg='Click Get Tickets.'
  constructor(public apiCallservice: ApiCallsService) {
  }

  ngOnInit() {
  }

  find = function () {//only for data from 1st april 2021 and loading data is empty
    this.msg='Please Wait! Loading...'
    let tempObj = {};
    tempObj['tablename'] = ''
    tempObj['method'] = 'myticket_pending';

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
          this.tickets = res.Data;
          this.table=res.Data.length>0?true:false;
          this.msg=this.table?'':'No Pending Tickets!'
      });
  };

  update(i,j,type){
    let tempObj = {};
    tempObj['tablename'] = ''
    tempObj['method'] = 'ownerlastcheck';
    tempObj['type']=type;
    tempObj['oid']=i.oid;
    tempObj['_id']=i._id;
    tempObj['date']=i.date;
    tempObj['truckno']=i.truckno;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
         alert(res.Status);
         this.tickets.splice(j,1)
      });
    
  }
}
