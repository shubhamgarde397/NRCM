import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-track-display',
  templateUrl: './track-display.component.html',
  styleUrls: ['./track-display.component.css'],
  providers: [ApiCallsService, HandleDataService],
})
export class TrackDisplayComponent implements OnInit {

  
  public data=''
 public list=[];
  constructor(
    public sec:SecurityCheckService,
    public router: Router,
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public spin: Ng4LoadingSpinnerService,
    public hF: handleFunction,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data=>{
      let temp={
        billno:data['i'],
        tablename:'',
        method:'getbybillno'
      }
      this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
      .subscribe((res: any) => {
      
      this.data=res.Status;

      if(confirm('Click Ok to open Whatsapp')){
      window.open(this.data,'_blank');    
      }else{
        
      }
        
      });
    })
  }

}
