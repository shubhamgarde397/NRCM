import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-truck-details',
  templateUrl: './truck-details.component.html',
  styleUrls: ['./truck-details.component.css'],
  providers: [ApiCallsService]
})
export class TruckDetailsComponent implements OnInit {
  public ownerdetailslist = [];
 public display=true;
 public display2=false;
  public todayDate;
  public show = false;
  public selectedTruck={}
  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService,
    public handleF:handleFunction

  ) { }

  ngOnInit() {
    this.todayDate=this.handleF.createDate(new Date());
  this.fetchBasic()
  }

  fetchBasic() {
    this.ownerdetailslist = [];
    this.ownerdetailslist = this.sec.arr;
  }

  getTruckDetails(data,index){//_id,index
    this.display2=true;
    this.selectedTruck=this.ownerdetailslist[index];
    console.log(this.selectedTruck);
    
  }


}


