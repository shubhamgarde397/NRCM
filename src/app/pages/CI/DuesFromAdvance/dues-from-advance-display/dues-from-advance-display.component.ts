import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';

@Component({
  selector: 'app-dues-from-advance-display',
  templateUrl: './dues-from-advance-display.component.html',
  styleUrls: ['./dues-from-advance-display.component.css'],
  providers: [ApiCallsService]
  
})
export class DuesFromAdvanceDisplayComponent implements OnInit {

  public dues=[];
  public showdues=false;
  public dueInfoPending;
  public dueMDate;
  public dueMAmt;
  public whichData=false;
  public bigI;

  constructor(public apiCallservice: ApiCallsService,public handledata: HandleDataService) { }

  ngOnInit() {
    this.fetchBasic();
  }

  fetchBasic(){
    let temp={"method": "DuesDisplayAd","tablename": ""}
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, temp, 0)
      .subscribe((res: any) => {
        this.dues=res.Data
        this.showdues=true;
      });
  }

  update(i,j){
    this.bigI=i;
    this.dueInfoPending=this.dues[j]['pending']
      }

      storeDue(){
        if(this.dueMAmt>this.dueInfoPending){
          alert('Due amount cant be greater than pending amount.')
        }
        else if(this.dueMAmt===0){alert('Due amount cant be 0.')}
        else if(this.dueMAmt<=this.dueInfoPending){
    let duesid=this.bigI['_id']
    
        let tempObj={
          'duesid':duesid,
          'dueDate':this.dueMDate,
          'dueAmt':this.dueMAmt,
          'tablename':'',
          'method':'DuesUpdateFromAd'
        }
    
        this.apiCallservice.handleData_New_python
        ('commoninformation', 1, tempObj, 0)
        .subscribe((res: any) => {
          alert(res.Status)
        });
      }
      }

      
}
