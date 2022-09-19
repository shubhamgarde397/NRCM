import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
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
  public table=false;
  public tickets=[];
  public msg='Click Get Tickets.'

  public tabletransport=false;
  constructor(public apiCallservice: ApiCallsService,public handledata:HandleDataService,public router:Router) {
  }

  ngOnInit() {
  }

  showDatabyid = function (data) {
    this.show = true;
    data=data['truck'];
    data['updateNumber']=true;    
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/OWNER_HANDLER/OwnerUpdate']);
  };

  find = function () {//only for data from 1st april 2021 and loading data is empty
    this.msg='Please Wait! Loading...'
    let tempObj = {};
    tempObj['tablename'] = ''
    tempObj['method'] = 'myticket_pending';
    tempObj['type']='truck'

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        this.tickets=[];
          this.tickets = res.Data;
          this.table=res.Data.length>0?true:false;
          this.tabletransport=false;
          this.msg=this.table?'':'No Pending Tickets!'
      });
  };

  findTransport(){
    this.msg='Please Wait! Loading...'
    let tempObj = {};
    tempObj['tablename'] = ''
    tempObj['method'] = 'myticket_pending';
    tempObj['type']='transport'

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        this.tickets=[];
          this.tickets = res.Data;
          this.tabletransport=res.Data.length>0?true:false;
          this.table=false;
          this.msg=this.tabletransport?'':'No Pending Tickets!'
      });
  }

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

  accept(data,i){
    let tempObj={}
    tempObj['method']='acceptTptTicket';
    tempObj['tablename']='';
    tempObj['_id']=this.tickets[data]['oid']
    tempObj['tptName']=(<HTMLInputElement>document.getElementById('tptName_'+data)).value;
    tempObj['name']=(<HTMLInputElement>document.getElementById('name_'+data)).value;
    tempObj['addr1']=(<HTMLInputElement>document.getElementById('addr1_'+data)).value;
    tempObj['addr2']=(<HTMLInputElement>document.getElementById('addr2_'+data)).value;
    tempObj['addr3']=(<HTMLInputElement>document.getElementById('addr3_'+data)).value;
    tempObj['email']=(<HTMLInputElement>document.getElementById('email_'+data)).value;
    tempObj['contact']=[(<HTMLInputElement>document.getElementById('contact_'+data)).value];
 this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
         alert(res.Status);
         this.tickets.splice(data,1)
      });
    
  }
  reject(data,i){
    let tempObj={}
    tempObj['method']='rejectTptTicket';
    tempObj['tablename']='';
    tempObj['_id']=this.tickets[data]['oid']
 this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
         alert(res.Status);
         this.tickets.splice(data,1)
      });
  }
}

