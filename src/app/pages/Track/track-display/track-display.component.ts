import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    public router: Router,
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public spin: Ng4LoadingSpinnerService,
    public hF: handleFunction,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data=>{
      let temp={
        billno:data['i'],
        tablename:'',
        method:'getbybillno'
      }
      this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
      .subscribe((res: any) => {
        this.list=res.Data;
        if(res.Data[0].contacttb=== ''){
          alert('Contact No. Missing')
        }
        else{
        let qr='';
      qr=qr+"*Received Payment Done*%0A%0A"
      qr=qr+'*Date* :'+String(this.hF.getDateddmmyy(res.Data[0]['loadingDate']))+'%0A'
      qr=qr+'*Truck No* :'+res.Data[0]['truckno']+'%0A'
      qr=qr+'*Loading To* :'+res.Data[0]['destination']+'%0A'
      qr=qr+'*Payment Date* :'+String(this.hF.getDateddmmyy(res.Data[0]['actualPaymentDate']))+'%0A'
      qr=qr+'*Payment Amount* :'+res.Data[0]['actualPaymentAmount']+'%0A'
      qr=qr+"%0A%0A*Nitin Roadways*%0A*Pune*%0A*Mo : 9766707061*"  
      
      this.data='https://wa.me/+91'+res.Data[0]['contacttb']+'/?text='+qr
      if(confirm('Click Ok to open Whatsapp')){
      window.open(this.data,'_blank');    
      }else{
        
      }
        }
      });
    })
  }

}
