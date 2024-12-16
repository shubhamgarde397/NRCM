import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-pmt-msg',
  templateUrl: './pmt-msg.component.html',
  styleUrls: ['./pmt-msg.component.css'],
  providers: [ApiCallsService, HandleDataService]
})
export class PmtMsgComponent implements OnInit {

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
      
      let temp={}
      let s=data['i'].split('_');
      console.log(s);
      
      switch (s[0]) {
        case 'q':
          temp={
            billno:s[1],
            tablename:'',
            method:'getbybillno2'
          }   

          this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
          .subscribe((res: any) => {
            this.data=res.Status;
              if(confirm('Click Ok to open Whatsapp')){
                window.open(this.data,'_blank');    
              }
            });
          break;
    
        case 'c': 
        console.log('tel://+91'+s[1]+'','_blank');
        
          window.open('tel://+91'+s[1]+'','_blank');
          break;
      }
       



      
     })
   }
 
 }