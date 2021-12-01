import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-missing-display',
  templateUrl: './missing-display.component.html',
  styleUrls: ['./missing-display.component.css']
})
export class MissingDisplayComponent implements OnInit {
// tablename=missingLRNOS
public lrlist;
public show = false;
public dbName = 'NRCM_Information';
public commonArray;
public considerArray;
public missing=[];
public ReasonSelected={};

constructor(
  public apiCallservice: ApiCallsService,
  public handledata: HandleDataService,
  public router: Router,
  public sec: SecurityCheckService,
  public spinnerService: Ng4LoadingSpinnerService
) {
}

ngOnInit() {
  this.commonArray = this.sec.commonArray;
  this.considerArray = this.handledata.createConsiderArray('infolrlist')
  this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
  this.lrlist = this.commonArray.lrlist;
  this.getmissingLR();
}

setReason(){
}

update(){
  let tempObj={}
let k=Object.keys(this.ReasonSelected)
let v=Object.values(this.ReasonSelected)
// tempObj['Data']=this.ReasonSelected;
tempObj['tablename']='missinglrnos';
tempObj['method']='updatemissingLRNO'
let Data={keys:[],values:[]}
for(let i=0;i<v.length;i++){
Data['keys'].push(k[i])
Data['values'].push(v[i])
    
}
tempObj['Data']=Data;

}

getmissingLR(){
  let tempobj={}
  tempobj['tablename']='missingLR';
  tempobj['method']='lrnos';
  
  this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, 0)
  .subscribe((res: any) => {
    this.missing=res.Data;
    this.spinnerService.hide();
  });
}

showDatabyid = function (data) {

};
getInformationData() {
  this.spinnerService.show();
  let tempObj = { "method": "displaynew", "consider": this.considerArray };
  this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
    .subscribe((res: any) => {
      this.sec.commonArray['lrlist'] = Object.keys(res.lrlist[0]).length > 0 ? res.lrlist : this.sec.commonArray['lrlist'];;
      this.fetchBasic();
      this.spinnerService.hide();
    });
}

fetchBasic() {
  this.commonArray = this.sec.commonArray;
  this.lrlist = [];
  this.lrlist = this.commonArray.lrlist;
}
}
