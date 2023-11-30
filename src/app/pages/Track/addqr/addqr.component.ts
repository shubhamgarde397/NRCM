import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addqr',
  templateUrl: './addqr.component.html',
  styleUrls: ['./addqr.component.css'],
  providers: [ApiCallsService]
})
export class AddqrComponent implements OnInit {

  public show = false;
  public tabledata: false;
  public today;
  public todaysDate;
  public myFormGroup: FormGroup;
  public myFormGroup1: FormGroup;
  public myFormGroup2: FormGroup;
  public trucks=[];
  public qrs=[];
  public contacts=[];
  public nrcmid;
  public partys=[];
  public village=[];
  public data=[];
  public dataDispatch=[];
  public dataT=0;
  public locationData=[];
  public msg= '';

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService, public formBuilder: FormBuilder,) {
  }

  ngOnInit() {
    this.nrcmid=this.securityCheck.nrcmid;
    this.myFormGroup = this.formBuilder.group({
      qr:'',
      tbid:'',
      type:'',
      pid:'',
      vid:'',
      contact:''
    });
    this.myFormGroup1 = this.formBuilder.group({
      tbid:'',
      status:''
    });
    this.myFormGroup2 = this.formBuilder.group({
      tbid:'',
      status:''
    });

  }

  getDataa(){
    this.locationData=this.dataDispatch.find(r=>{return r._id===this.myFormGroup2.value.tbid})['currentVehicleStatus'];
  }

  getDataaa(){
    this.locationData=this.data.find(r=>{return r._id===this.myFormGroup1.value.tbid})['currentVehicleStatusforLoading'];
  }

  changer(data){
this.dataT=data;
  }

getData(data){
  let tempObj={}
  switch (data) {
    case 1:
      tempObj['method']='findbyqr';    
      break;
      case 2:
        tempObj['method']='findbyqrforLoadingStatus';
      break;
      case 3:
        tempObj['method']='findbyqrforMessageSend';
      break;
  }
  
  
  tempObj['tablename']='';

  this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      switch (data) {
        case 1:
          this.trucks=res.Data[0]['trucks'];
      this.partys=res.Data[1]['party'];
      this.village=res.Data[2]['village'];
          break;
          case 2:
            this.data=res.Data;
          break;
          case 3:
          this.dataDispatch=this.setMsg(res.Data);
          break;
      }
      
    });
}

setMsg(data){
  data.forEach(r => {
    r['textMsg']=this.copyAcc(r)
  });
return data;
}

copyAcc(data){
  let msg=''
  msg=msg+'*TruckNo*-'+(data.truckno)+'\n';
  msg=msg+'*Destination*-'+(data.v1)+'\n';
  msg=msg+'*Contact*-'+(data.contacttb[0])+'\n'
  msg=msg+'*QR*-'+(data.qr[0])+'\n\n'
  msg=msg+'*The above truck has been dispatched from '+ this.typeOfLoad(data.typeOfLoad) +' Plant.*\n\n';
  msg=msg+'*Nitin Roadways*\n';
  msg=msg+'*Pune*\n';
  return msg;
  // window.navigator['clipboard'].writeText(this.msg)
}

typeOfLoad(data){
  if(data==='Pipe'){return 'Urse';}
  else if(data==='Fittings'){return 'Talegaon';}
  else if(data==='Ratnagiri'){return 'Ratnagiri';}
}

addlrno(){
  this.qrs.push(parseInt(String(this.myFormGroup.value.qr)));
}
addcontact(){
  this.contacts.push(parseInt(String(this.myFormGroup.value.contact)));
}
deleteQR(i,j){
  this.qrs.splice(j,1);
}
deleteContact(i,j){
  this.contacts.splice(j,1);
}

  submitAmt(){
    let tempObj={
    'method':'addqrtotruck',
    'tablename':'',
    'id':this.myFormGroup.value.tbid,
    'pid':this.myFormGroup.value.pid,
    'vid':this.myFormGroup.value.vid,
    'oid':this.trucks.find(r=>{return r._id===this.myFormGroup.value.tbid})['ownerid'],
    'qrs':this.qrs,
    'contacts':this.contacts,
    'type':this.myFormGroup.value.type

    }


    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);

        this.myFormGroup.patchValue({
          qr:'',
          tbid:'',
          type:'',
          pid:'',
          contact:''
        });
        this.qrs=[];
        this.contacts=[];
      });
  }
  submitLoadingStatus(){
    let tempObj={
    'method':'addloadingstatustotruck',
    'tablename':'',
    'id':this.myFormGroup1.value.tbid,
    'status':this.myFormGroup1.value.status

    }

  


    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status)
        this.data[this.data.findIndex(r=>r._id==this.myFormGroup1.value.tbid)]['currentVehicleStatusforLoading'].push(this.myFormGroup1.value.status)
        this.myFormGroup1.patchValue({
          tbid:'',
          status:''
        })
      });
  }

  submitLoadingStatus2(){
    let tempObj={
    'method':'addloadingstatustotruck',
    'tablename':'',
    'id':this.myFormGroup2.value.tbid,
    'status':this.myFormGroup2.value.status

    }
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
      this.myFormGroup1.patchValue({
        tbid:'',
        status:''
      })
    });
  }

  submitDispatchStatus(){
    let tempObj={
      'method':'adddispatchstatustotruck',
      'tablename':'',
      'id':this.myFormGroup.value.tbid,
      'date':this.myFormGroup.value.locDate,
      'location':this.myFormGroup.value.location
  
      }
  
  
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          let temp={'locations':this.myFormGroup.value.locDate,'locationDate':this.myFormGroup.value.location}
          this.dataDispatch[this.dataDispatch.findIndex(r=>r._id==this.myFormGroup1.value.tbid)]['currentVehicleStatus'].push(temp)
          alert(res.Status)
        });
  }
}
