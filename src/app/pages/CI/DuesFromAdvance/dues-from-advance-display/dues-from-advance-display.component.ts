import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Router } from '@angular/router';

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
  public considerArray;
  public commonArray;

  constructor(public router:Router, public apiCallservice: ApiCallsService,public handledata: HandleDataService,public sec:SecurityCheckService) {if(!this.sec.login){
    this.router.navigate([''])
  } }

  ngOnInit() {
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infodues')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchData();
    this.fetchData();
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
        ('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          alert(res.Status)
        });
      }
      }
      getInformationData() {
        let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
          .subscribe((res: any) => {
            this.sec.commonArray['dues'] = Object.keys(res.dues[0]).length > 0 ? res.dues : this.sec.commonArray['dues'];;
            this.fetchData();
          });
      }
    
      fetchData = function () {
        this.commonArray = this.sec.commonArray;
        this.dues = this.commonArray.dues;
        this.showdues=true;
      };
    
      refresh(){
        this.considerArray=[0,0,0,0,0,0,0,1]
        this.getInformationData()
      }
      
}
