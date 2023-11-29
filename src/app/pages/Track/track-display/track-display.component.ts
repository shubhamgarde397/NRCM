import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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

  public now = new Date();
  public day = this.now.getDate();
  public month = this.now.getMonth();
  public year = this.now.getFullYear();
  public date = new Date();
  public nrcmid=0;
  public todayDate;
  public username;
  public nameOfUser = 'Guest';
  public myFormGroup: FormGroup;
  public qrdata={};
  public qrs=[];
  public data=false;
  public locationData=[];
 
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public securit: SecurityCheckService,
    public spin: Ng4LoadingSpinnerService,
    public hF: handleFunction,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    
    this.todayDate = this.hF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    this.username = this.securit.dname;
    this.nameOfUser = this.username.slice(0, 1).toLocaleUpperCase() + this.username.slice(1, this.username.length);
    this.month = this.date.getMonth() + 1
    this.year = this.date.getFullYear();


    this.myFormGroup = this.formBuilder.group({
      qr: ['']
    });
  }

  find() {
    let value={};
    value['method'] = 'findbyqrforparty';
    value['qrs']=this.qrs;
    value['partyid']=this.securit.userid;
    value['tablename'] = '';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        this.qrdata=res.Data;
        this.data=true;
      });

      
  }

 
  

  addlrno(){
    this.qrs.push(parseInt(String(this.myFormGroup.value.qr)));
    this.myFormGroup.patchValue({qr:''})
    
  }
  
  deleteQR(i,j){
    this.qrs.splice(j,1);
  }

  logout() {
    this.router.navigate(['']);
  }
}
