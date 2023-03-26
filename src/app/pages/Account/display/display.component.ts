import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  providers: [ApiCallsService]
})
export class DisplayComponent implements OnInit {
  public data=[];
  public table=false;
  public refreshButton="I'm Old!";
  public selectedData=   {
    "_id": "",
    "truckno": "",
    
    "accountDetails": [
        {
            "accountName": "",
            "accountNumber": 0,
            "bankName": "",
            "ifsc": "",
            "acc12": true,
            "acc363": true,
            "acc65": false
        }
    ]
};
  public bigJ;

  constructor(public apiCallservice: ApiCallsService,public handledata: HandleDataService) { }

  ngOnInit() {
    this.fetchBasic();
  }

  fetchBasic(){
    let temp={
      "turnbookDate":"2021-04-01",
      "tablename":"commoninformation",
      "method":"displayTB",
      "display":"1",
    }
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, temp, 0)
      .subscribe((res: any) => {
        this.data=res.Data
        this.table=true;
        this.refreshButton="I'm New!"
      });
  }

  details(i,j){
    this.selectedData=i;
    this.bigJ=j;
  }

  update(type){
    let tempObj = { "method": "updateacc12363TF", "tablename": '','type':type,'id':this.selectedData['_id']};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        alert(res.Status);
        this.refreshButton="I'm Old!"
      });
  }



}
