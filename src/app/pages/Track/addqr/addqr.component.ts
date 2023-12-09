import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public byTruckName=false;
  public myFormGroup2: FormGroup;
  public trucks=[];
  public qrs=[];
  public contacts=[];
  public nrcmid;
  public partys=[];
  public village=[];
  public wala11=false;
  public trucknoid11=''
  public data=[];
  public dataDispatch=[];
  public dataT=0;
  public unique11turnbooklist=[];
  public locationData=[];
  public msg= '';
  public accName;
public accNo;
public truckVar;
public ifsc;
public bname;
public name;
public bigI={'truckno':''};
public bigJ;
public turn11=[];
public turnbooklist=[];
public pan;
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService, public formBuilder: FormBuilder,) {
  }

  ngOnInit() {
    this.nrcmid=this.securityCheck.nrcmid;
    this.myFormGroup = this.formBuilder.group({
      qr:['',Validators.required],
      tbid:['',Validators.required],
      type:['',Validators.required],
      pid:['',Validators.required],
      vid:['',Validators.required],
      contact:['',Validators.required]
    });
    this.myFormGroup2 = this.formBuilder.group({
      tbid:'',
      status:''
    });

  }

  getDataa(){
    this.locationData=this.dataDispatch.find(r=>{return r._id===this.myFormGroup2.value.tbid})['currentVehicleStatus'];
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
            this.data=this.setMsg1(res.Data);
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

setMsg1(data){
  data.forEach(r => {
    r['textMsg']=this.littleDetail(r)
  });
return data;
}



copyAcc(data){
  let msg=''
  msg=msg+'*TruckNo*-'+(data.truckno)+'\n';
  msg=msg+'*Destination*-'+(data.v1)+'\n';
  msg=msg+'*Contact*-'+(data.contacttb[0])+'\n'
  msg=msg+'*QR*-'+(data.qr[0])+'\n\n'
  msg=msg+'*Vehicle dispatched from '+ this.typeOfLoad(data.typeOfLoad) +' Plant.*\n\n';
  msg=msg+'*Nitin Roadways*';
  return msg;
}

littleDetail(data){
  let msg=''
  msg=msg+'*TruckNo*-'+(data.truckno)+'\n';
  msg=msg+'*Destination*-'+(data.v1)+'\n';
  msg=msg+'*Contact*-'+(data.contacttb[0])+'\n'
  msg=msg+'*QR*-'+(data.qr[0])+'\n\n'
  msg=msg+''+(data.v1)+'-'+this.typeOfLoad(data.typeOfLoad)+'\n';
  msg=msg+'*Nitin Roadways*';
  return msg;
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
    let truckss=this.trucks.find(r =>{return r.truckno == this.myFormGroup.value.tbid})
    truckss=truckss?truckss:{'_id':this.myFormGroup.value.tbid,'ownerid':'','new':true};
    let tempObj={
    'method':'addqrtotruck',
    'tablename':'',
    'id': truckss['_id'],
    'pid':this.myFormGroup.value.pid,
    'vid':this.myFormGroup.value.vid,
    'oid':truckss['ownerid'],
    'qrs':this.qrs,
    'contacts':this.contacts,
    'type':this.myFormGroup.value.type,
    'new':truckss['new']

    }


    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);

        this.myFormGroup.patchValue({
          qr:'',
          tbid:'',
          type:'',
          pid:'',
          vid:'',
          contact:''
        });
        this.qrs=[];
        this.contacts=[];
      });
  }
  submitLoadingStatus(j,data){
    let tempObj={
    'method':'addloadingstatustotruck',
    'tablename':'',
    'id':this.data[j]['_id'],
    'status':data

    }

  


    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status)
        this.data[j]['currentVehicleStatusforLoading'].push(data)
      });
  }

  submitLoadingStatus2(i,j){
    let tempObj={
    'method':'addloadingstatustotruck',
    'tablename':'',
    'id':this.dataDispatch[j]._id,
    'status':'Message Sent_blue'
    }
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status);
      this.dataDispatch.splice(j,1);
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
          this.dataDispatch[this.dataDispatch.findIndex(r=>r._id==this.myFormGroup.value.tbid)]['currentVehicleStatus'].push(temp)
          alert(res.Status)
        });
  }
  accAdder(i,j){
    this.bigI=i;
    this.bigJ=j;
  }
  getBankName(){
    this.bname=this.ifsc.slice(0,4);
  }

  storeAcc(){
    this.bigI;
    if(
      (this.accName==='') 
      ||
      (this.accNo==='') 
      ||
      (this.ifsc==='') 
      ||
      (this.bname==='') 
      ){
      alert('Fields Cannot be empty')
    }
    
    else{
    let tempObj={
      'ownerid':this.data[this.bigJ]['ownerid'],
      'name':this.accName,
      'no':this.accNo,
      'ifsc':this.ifsc,
      'bname':this.bname,
      'tablename':'',
      'method':'updateSimpleAccNo'
      // updateSimplepan
    }

    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
      let temp=[
        {
          "accountName": tempObj.name,
          "accountNumber":tempObj.no,
          "bankName":tempObj.bname,
          "ifsc":tempObj.ifsc,
          "acc12": false,
          "acc65": false,
          "acc363": false
      }
    ]
      this.data[this.bigJ]['update']=false;
      this.data[this.bigJ]['account']=temp;
      
    });
  }
  }

  storePan(){
    this.bigI;
    if(
      (this.name==='') 
      ||
      (this.pan==='') 
      ){
      alert('Fields Cannot be empty')
    }
    
    else{
    let tempObj={
      'ownerid':this.data[this.bigJ]['ownerid'],
      'name':this.name,
      'pan':this.pan,
      'tablename':'',
      'method':'updateSimplepan'
    }

    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
      this.data[this.bigJ]['pan']='green';
    });
  }
  }

  setMsg2(data){
    data.forEach(r => {
      r['textMsg']=this.littleDetail2(r)
    });
  return data;
  }
  
  littleDetail2(data){
    let msg=''
    msg=msg+'*TruckNo*-'+(data.truckName.truckno)+'\n';
    msg=msg+'*Contact*-'+(data.contacttb[0])+'\n'
    msg=msg+'*QR*-'+(data.qr[0])+'\n\n'
    msg=msg+''+(data.placeName.village_name)+'-'+this.typeOfLoad(data.typeOfLoad)+'\n';
    msg=msg+'*Nitin Roadways*';
    console.log(msg)
    return msg;
  }

  find11UniqueTruck(){
    if(this.trucknoid11!=='Default'){
      this.byTruckName=true;
    this.turn11=this.turnbooklist.filter(r=>{return r.truckName.truckno==this.trucknoid11});  
    }
  }

  find(event){
    if(event==='11'){
      this.wala11=true;
    }
    else{
      this.wala11=false;
    }
          let tempObj1={};
      tempObj1['tablename'] = 'turnbook'
      tempObj1['method'] = 'singleTruck'
      tempObj1['display'] = event;
      tempObj1['truckno'] = this.truckVar;
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
        .subscribe((res: any) => {
          if(res.Data.length>0){
          this.unique11turnbooklist=res.Data;
          this.byTruckName=true;
          this.turnbooklist = res.Data;
          this.unique11turnbooklist= res.Data.map(r=>r.truckName.truckno).filter(function(item, pos) {return res.Data.map(r=>r.truckName.truckno).indexOf(item) == pos;})
          this.data=this.setMsg2(res.Data);
          if(event==='11new'){
            this.trucknoid11=res.Data[0].truckName.truckno
            this.find11UniqueTruck();
            this.data=this.setMsg2(res.Data);
          }
          if(event==='qr'){
            this.trucknoid11=res.Data[0].truckName.truckno
            this.find11UniqueTruck();
            this.data=this.setMsg2(res.Data);
          }
        }
        });
  
  }
}
