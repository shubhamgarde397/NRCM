import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lrset',
  templateUrl: './lrset.component.html',
  styleUrls: ['./lrset.component.css'],
  providers: [ApiCallsService]
})
export class LrsetComponent implements OnInit {
 
  public show = false;
  public tabledata: false;
  public today;
  public todaysDate;
  public myFormGroup: FormGroup;
  public byTruckName=false;
  public trucks=[];
  public qrs=[];
  public contacts=[];
  public nrcmid;
  public partys=[];
  public imps=[];
  public villages=[];
  public trucknoid11=''
  public data=[];
  public dataT=0;
  public msg= '';
public truckVar;
public turn11=[];
public turnbooklist=[];
public pan;
public table3=false;
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService, public formBuilder: FormBuilder,) {if(!this.securityCheck.login){
      this.router.navigate([''])
    }
  }

  ngOnInit() {
    this.nrcmid=this.securityCheck.nrcmid;
    this.myFormGroup = this.formBuilder.group({
      date:['',Validators.required],
      partyType:['',Validators.required],
      tbid:['',Validators.required],
      type:['',Validators.required],
      pid:['',Validators.required],
      fid:['',Validators.required],
      vid:['',Validators.required],
      vid2:[''],
    });

  }



  changer(data){
this.dataT=data;
  }

  getCI(data){
    let str=data+'setter';
    let value={}
    value['method'] = 'displayCI';
    value['code'] = data;
    value['tablename']='';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        switch(data){
          case 'f':
            return this.imps=res.Data;
          case 'p':
            return this.partys=res.Data;
          case 'v':
            return this.villages=res.Data;
        }
      });
  }

  submitAmt(){
    
    
    let truckss=this.trucks.find(r =>{return r.truckno == this.myFormGroup.value.tbid})
    truckss=truckss?truckss:{'_id':this.myFormGroup.value.tbid,'ownerid':'','new':true};
    let tempObj={
    'method':'setdigilr',
    'tablename':'',
    'id': truckss['_id'],
    'partyType':this.myFormGroup.value.partyType,
    'pid':this.myFormGroup.value.pid,
    'vid':this.myFormGroup.value.vid,
    'fid':this.myFormGroup.value.fid,
    'vid2':this.myFormGroup.value.vid2,
    'oid':truckss['ownerid'],
    'date':this.myFormGroup.value.date,    
    'type':this.myFormGroup.value.type,
    'new':truckss['new']

    }
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
      });
  }

  

}
