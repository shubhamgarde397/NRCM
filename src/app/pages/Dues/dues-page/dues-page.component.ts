import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-dues-page',
  templateUrl: './dues-page.component.html',
  styleUrls: ['./dues-page.component.css'],
  providers: [ApiCallsService]
})
export class DuesPageComponent implements OnInit {
  public myFormGroup: FormGroup;
  public dues=[];
  public showdues=false;

public tbdata={"advanceArray": [{"advanceAmt": '',"advanceDate": "",}],"loadingDate": "2023-10-31","dueInfo": [{"dueWholeAmt": 0,"dueAmtTaken": 0,"date": ""}]};
public bhdata={"truckData": [],"commentToTruck2": []};
public whichData=false;
public truckVar='';
public turnbooklist=[];
public trucknoid11;
public turn11=[];
public gotData18=false;

  constructor(public apiCallservice: ApiCallsService,public formBuilder: FormBuilder,public handledata: HandleDataService) { }



  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      truckno:'',
      date:'',
      amt:'',
      reason:'',
      from:''
    });
  }
  deleteOne(j,z){


let temp1=this.dues;

let temp={
  'tbid':temp1[j]['info'][z]['tbid'],
  '_id':temp1[j]['_id'],
  'method':'deleteInternalDue',
  'tablename':'',
  'deleteIndex':z
}
this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
      .subscribe((res: any) => {
        alert(res.Status);
        alert('Please Refresh!')
      });

  }
  find(){
    let tempObj = {}

  if(this.myFormGroup.value.from === 'Truck'){
    if (this.myFormGroup.value.truckno === '') { alert('Select a '+this.myFormGroup.value.from);  }
        else {
          tempObj['truckno'] = this.myFormGroup.value.truckno;
          tempObj['method'] = 'displayEditTruckD'
    }
  }
  else{
    if (this.myFormGroup.value.truckno === '') { alert('Select a '+this.myFormGroup.value.from);  }
        else {
          tempObj['truckno'] = this.myFormGroup.value.truckno;
          tempObj['method'] = 'displayEditTruckDT'
    }
  }

  tempObj['tablename'] = ''
  this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.turnbooklist = res.Data;
      });
  }

  find11UniqueTruck(){
    if(this.trucknoid11!=='Default'){
    this.turn11=this.turnbooklist.filter(r=>{return r.truckno==this.trucknoid11})[0]; 
          this.gotData18=true;

    }
  }

  store({ value, valid }: { value: [{}], valid: boolean }) {
    value['method'] = 'DuesInsert';
    value['tablename'] = 'dues';
    value['truckno'] = this.trucknoid11;
    
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        alert(res['Status']);
      });
  }

  fetchBasic(){
    let temp={"method": "DuesDisplay","tablename": ""}
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, temp, true)
      .subscribe((res: any) => {
        this.dues=res.Data
        this.showdues=true;
      });
  }

  delete = function (id,j) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'dues';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: any) => {
          alert(response.Status);
          this.dues.splice(j, 1);
        });
    }
  };

  details(type,i,j){
    this.whichData=type;
    let temp={
      'method':'displayDueDeepDetails',
      'tablename':'',
      'tbid':i['info'][j]['tbid'],
      'bhid':i['info'][j]['bhid']
    }
    this.apiCallservice.handleData_New_python('turnbook', 1, temp, true)
        .subscribe((response: any) => {
          this.bhdata=response.Data[0]
          this.tbdata=response.Data2[0]
          setTimeout(() => {
            this.whichData=response.Data.length>0?true:false;  
          }, 2000);
          
        });
    

  }



}
