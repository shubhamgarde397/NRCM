import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [ApiCallsService]
})
export class AddComponent implements OnInit {
  public data=[];
  public table=false;
  public bigJ;

  constructor(public apiCallservice: ApiCallsService,public handledata: HandleDataService) { }

  ngOnInit() {
    this.fetchBasic();
  }

  fetchBasic(){
    let temp={
      "tablename":"",
      "method":"getRentsfrom20221125"
    }
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, temp, 0)
      .subscribe((res: any) => {
        this.data=res.Data
      });
  }

  shootDate(data){
    let temp={
      "tablename":"",
      "method":"getRentsfrom20221125withdate",
      "date":data
    }
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, temp, 0)
      .subscribe((res: any) => {
        this.data=res.Data
        this.table=true;
      });
  }


}
