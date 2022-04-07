import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-turn-book-location-disp',
  templateUrl: './turn-book-location-disp.component.html',
  styleUrls: ['./turn-book-location-disp.component.css']
})
export class TurnBookLocationDispComponent implements OnInit {

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
    public securityCheck: SecurityCheckService, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService,public router:Router) { }

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
  showDatabyidoD = function (data) {
    this.show = true;
    this.found = data;
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/OWNER_HANDLER/OwnerUpdate']);
  };


  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasicData(){
    let tempObj= {"turnbookDate":"2021-04-01","tablename":"turnbook","method":"displayTB","display":"14"}
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 0)
    .subscribe((res: any) => {
      this.tbl=res.Data;
      this.show=this.tbl.length>0?true:false;
      this.tbl.forEach(r=>{
        let temp=[]
        for(let i=0;i<r.locationsArray.length;i++){
            let tempObj={};
            tempObj['location']=r.locationsArray[i];
            tempObj['date']=r.locationDate[i];
            temp.push(tempObj)
        }
        r['locationData']=temp;
    })
      this.tblShow=this.tbl.length>0?true:false;
    });
  }


  showDatabyid(data,i){
    this.id=i;
    this.data=data;

  }

  update(data){
    let tempObj={}
    tempObj['tablename'] = 'turnbook';
    tempObj['location'] = this.placeid;
    tempObj['date'] = data.value.date;
    tempObj['_id'] = this.data._id;
    tempObj['method'] = 'updatetbl';
    tempObj['tbltype'] = 'update';
    this.apiCallservice.handleData_New_python('turnbook', 1,tempObj , 0)
    .subscribe((res: any) => {
      alert(res.Status);
      this.tbl[this.id]['locationData'].push({'location':this.tempVNAME,'date':data.value.date})
      let a = this.tbl.filter(r=>{return r._id==this.data._id})[0]
      a['updateTBL']=a.locationData.at(-1).location===a.destination?true:false
    });
  }

  newEdit(i,j){
    this.tempVNAME = this.villagenamelist.find(r=>{return r.village_name == i.destination})['_id']
    
    let tempObj={}
    tempObj['tablename'] = 'turnbook';
    tempObj['location'] = this.tempVNAME;
    tempObj['date'] = this.locationDate;
    tempObj['_id'] = i._id;
    tempObj['method'] = 'updatetbl';
    tempObj['tbltype'] = 'update';
    this.apiCallservice.handleData_New_python('turnbook', 1,tempObj , 0)
    .subscribe((res: any) => {
      this.updateTurnLocationTruck(i,j)
    });
  }

  updateTurnLocationTruck(i,index){
    let tempObj={};
    tempObj['part']=4;
    tempObj['_id']=i._id;
    tempObj['method'] = 'update';
    tempObj['tablename'] = 'turnbook';
    tempObj['updateTruck']=true;
    tempObj['show']=true;
    tempObj['ownerid']=i['oD']['_id'];
    
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 0)
    .subscribe((res: any) => {
      alert('Updated');
      this.tbl.splice(index,1);
      this.securityCheck.commonArray['ownerdetails'].push(res.Data[0]);
    });
    
  }

  setPlaceName() {
    this.placeid = this.villagenamelist[this.myFormGroup.value.location.split('+')[1]]._id;
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
    this.apiCallservice.handleData_New_python('turnbook', 1,tempObj , 0)
    .subscribe((res: any) => {
      alert(res.Status);
      this.tbl[j]['locationData'].splice(p, 1);
      let a = this.tbl.filter(r=>{return r._id==i})[0]
      a['updateTBL']=a.locationData.at(-1).location===a.destination?true:false
    });
    }else{}
  }
  
}
