import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  providers: [ApiCallsService]
})
export class DisplayComponent implements OnInit {

  public dataArray=[];
  public table=false;
  public truckno='';
  public new=false;

  public whichType='1';
  constructor(public apiCallservice: ApiCallsService,public handledata: HandleDataService,public sec:SecurityCheckService) { }

  ngOnInit() {
  }

  getWhichType(data){
    this.whichType=data;
    this.table=false;
    this.dataArray=[];
      }
      getVehicleDetails(){
        let tempObj={}
        switch (this.whichType) {
          case '1':
            tempObj = { "method": "getVehicleDetailsJG", "tablename": '','truckno':this.truckno};    
            break;
            case '2':
            tempObj = { "method": "getVehicleDetailsAllJG", "tablename": ''};    
            break;
        
          default:
            break;
        }
        
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
          .subscribe((res: any) => {
              this.dataArray=res.Data;
              this.new=this.dataArray.length==0?true:false;
              this.table=true;
          });
      }

      addToJG(){
        let tempObj = { "method": "addToJG", "tablename": '','new':this.new,'truckno':this.truckno};
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
          .subscribe((res: any) => {
            alert(res.Status)
            this.truckno='';
          });
      }
      
}

