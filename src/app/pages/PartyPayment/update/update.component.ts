import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public loadingDate;
  public allData;
  public show=1;
  public pendingTrucks;
  public addToArrayVar=[]
  public pp;
  constructor(public hd:HandleDataService,public apiCallservice:ApiCallsService,public router:Router,public hf:handleFunction) { }

  ngOnInit() {
    this.loadingDate=this.hd.givePPData()[0]['loadingDate'];
    this.allData=this.hd.givePPData();
    console.log(this.allData);
    
  }

  trucks(data){
    data===0?this.router.navigate(['Navigation/PARTY_PAYMENT_HANDLER/Display']):this.show=data;
    data===2?this.getAllTBPendingTrucks():null
  }

  getAllTBPendingTrucks(){
    let tempobj={}
    console.log(this.allData);
    
      tempobj['partyid']=this.allData[0]['partyid'];
      tempobj["method"]= "pendingPayment",
      tempobj["tablename"]= "partyPayment",
      tempobj["user"]= "shubham",
      tempobj["typeofuser"]= 1
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, 0)
      .subscribe((response: Response) => {
        this.pendingTrucks=response['Data'];
        console.log(this.pendingTrucks);
        
      });

  }

  addToArray(){
    let tempObj={}
    console.log(this.pp);
    
    tempObj['truckno']=this.pendingTrucks[this.hf.findpayment(this.pp)]['data'].split('_')[2]
    tempObj['date']=this.pendingTrucks[this.hf.findpayment(this.pp)]['data'].split('_')[0]
    tempObj['lrno']=this.pendingTrucks[this.hf.findpayment(this.pp)]['lrno']
    tempObj['id']=this.pendingTrucks[this.hf.findpayment(this.pp)]['_id']
    this.addToArrayVar.push(tempObj)
  }

  addToSave(){
    console.log(this.addToArrayVar);
    let tempobj={}
    tempobj['tbids']=this.addToArrayVar.map(r=>r.id);
    tempobj['id']=this.allData[0]['_id'];
    tempobj['method']='addIdsToPartyAndTB';
    tempobj['tablename']='partyPayment';
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, 0)
        .subscribe((response: Response) => {
          alert(response['Status']);
        });
    
  }

  tempDelete(j){
    this.addToArrayVar.splice(j,1)
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
          this.loadingDate.splice(index,1);
        });
    
  }

}
