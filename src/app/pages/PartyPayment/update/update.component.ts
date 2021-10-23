import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public loadingDate;
  public allData;
  constructor(public hd:HandleDataService,public apiCallservice:ApiCallsService,public router:Router) { }

  ngOnInit() {
    this.loadingDate=this.hd.givePPData()[0]['loadingDate'];
    this.allData=this.hd.givePPData();
  }

  delete(index){
    let tempobj={}
    tempobj['index']=index+1;
    tempobj['truckid']=this.loadingDate[index].split('_')[0];
    tempobj['id']=this.allData[0]['_id'];
    tempobj['method']='PartyDeleteSingleId';
    tempobj['tablename']='partyPayment';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, 0)
        .subscribe((response: Response) => {
          alert(response['Status']);
          this.router.navigate(['Navigation/PARTY_PAYMENT_HANDLER/Display']);
        });
    
  }

}
