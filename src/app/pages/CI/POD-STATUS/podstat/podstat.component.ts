import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-podstat',
  templateUrl: './podstat.component.html',
  styleUrls: ['./podstat.component.css']
})
export class PODSTATComponent implements OnInit {

  public tbl;
  public tblShow=false;
  public myFormGroup: FormGroup;
  public commonArray;
  public considerArray;
  public villagenamelist;
  public id;
  public data;
  public tempVNAME;
  public placeid;
  public show=false;
  public locationDate='';

  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,public location:Location,
    public securityCheck: SecurityCheckService, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService,public router:Router) { 
      if(!this.securityCheck.login){
        this.router.navigate([''])
      }
    }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infovillage')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();

    this.myFormGroup = this.formBuilder.group({
      date: ['', Validators.required],
      location: ['', Validators.required]
    });
    this.fetchBasicData();
  }
  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.villagenamelist = [];
    this.villagenamelist = this.commonArray.villagenames;
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasicData(){
    let tempObj= {"turnbookDate":"2024-06-01","tablename":"turnbook","method":"displayTB","display":"15"}
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, true)
    .subscribe((res: any) => {
      this.tbl=res.Data;
      this.show=this.tbl.length>0?true:false;
    });
  }


  showDatabyid(data,i){
    this.id=i;
    this.data=data;

  }

  update(data){
    if(data.value.location===this.data.destination){
      this.newEdit(this.data,this.id)
    }else{
    let tempObj={}
    tempObj['tablename'] = 'turnbook';
    tempObj['location'] = data.value.location;
    tempObj['date'] = data.value.date;
    tempObj['_id'] = this.data._id;
    tempObj['method'] = 'updatetbl';
    tempObj['tbltype'] = 'update';
    this.apiCallservice.handleData_New_python('turnbook', 1,tempObj , true)
    .subscribe((res: any) => {
      alert(res.Status);
      this.tbl[this.id]['currentVehicleStatus'].push({'location':data.value.location,'locationDate':data.value.date})
      let a = this.tbl.filter(r=>{return r._id==this.data._id})[0]
      a['updateTBL']=a.currentVehicleStatus.at(-1).location===a.destination?true:false
    });
  }
  }

  addContact(i,j){
    alert('Hi')
    var contact=prompt('Enter Contact No.');
    if(contact===undefined||contact===null){}
    else{
    let tempObj={}
    tempObj['tablename'] = '';
    tempObj['_id'] = i._id;
    tempObj['method'] = 'updatetbcontact';
    tempObj['contacttb']=contact;
    this.apiCallservice.handleData_New_python('turnbook', 1,tempObj , true)
    .subscribe((res: any) => {
      alert(res.Status);
    });
  }
  }

  newEdit(i,j){
    this.tempVNAME = this.villagenamelist.find(r=>{return r.village_name == i.destination})['village_name']
    
    let tempObj={}
    tempObj['tablename'] = 'turnbook';
    tempObj['location'] = this.myFormGroup.value.location;
    tempObj['locationDate'] = this.myFormGroup.value.date;
    tempObj['_id'] = i._id;
    tempObj['method'] = 'updatetblnew';
    tempObj['tbltype'] = 'update';

    tempObj['part']=4;
    tempObj['updateTruck']=true;
    tempObj['show']=true;
    tempObj['ownerid']=i['ownerid'];


    this.apiCallservice.handleData_New_python('turnbook', 1,tempObj , true)
    .subscribe((res: any) => {
      alert('Updated!!!')
      this.tbl.splice(j,1);
      
    });
  }

  courier(i,index){
    if(confirm('Driver sent the courier and you got the courier?')){
    let tempObj={};
    tempObj['part']=5;
    tempObj['_id']=i._id;
    tempObj['method'] = 'update';
    tempObj['tablename'] = 'turnbook';
    
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, true)
    .subscribe((res: any) => {
      alert('Updated');
      this.tbl.splice(index,1);
    });
  }
  }

  setPlaceName() {
    this.tempVNAME = this.villagenamelist[this.myFormGroup.value.location.split('+')[1]].village_name;
    this.myFormGroup.value.place = this.tempVNAME;
  }

  delete(i,p,j){
    if(confirm('Are you sure?')){
    let tempObj={}
    tempObj['tablename'] = 'turnbook';
    tempObj['index'] = p;
    tempObj['_id'] = i;
    tempObj['method'] = 'updatetbl';
    tempObj['tbltype'] = 'delete';
    this.apiCallservice.handleData_New_python('turnbook', 1,tempObj , true)
    .subscribe((res: any) => {
      alert(res.Status);
      this.tbl[j]['currentVehicleStatus'].splice(p, 1);
      let a = this.tbl.filter(r=>{return r._id==i})[0]
      a['updateTBL']=a.currentVehicleStatus.at(-1).location===a.destination?true:false
    });
    }else{}
  }
  
}
