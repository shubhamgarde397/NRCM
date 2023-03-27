import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [ApiCallsService]
})
export class MainPageComponent implements OnInit {
  public date3month;
  public unique11turnbooklist=[];
  public todayDate;
  public data=[];
  public trucknoid11=''
  public selectDate=false;
  public byTruckName=false;
  public villagenamelist=[];
  public whichType='0';
  public tableDate=false;
  public turnbooklist=[]
  public turn11=[];
  public myFormGroup: FormGroup;
  public commonArray;
  public considerArray;
  public truckVar;

  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService,
    public handleF:handleFunction,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    

    this.todayDate=this.handleF.createDate(new Date());
    this.myFormGroup = this.formBuilder.group({
      location: '',
      typeOfLoad: '',
      value:''
    });
  }

  getWhichType(data){
this.whichType=data;
let tempObj={}
switch(data){
    case '1':
      this.tableDate=false;
      tempObj['tablename'] = ''
    tempObj['method'] = 'getRent'
      break;
      case '2':
        tempObj['tablename'] = ''
        tempObj['method'] = 'getVillages'
      break;
}
this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        switch(data){
          case '1':
            this.tableDate=true;
            this.data=res.Data;
          break;
          case '2':
            this.villagenamelist=res.Data;
          break;
        }
      });
  }
find(){


        let tempObj1={};
    tempObj1['tablename'] = 'turnbook'
    tempObj1['method'] = 'singleTruck'
    tempObj1['display'] = "11";
    tempObj1['truckno'] = this.truckVar;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true,this.handleF.createDate(new Date()),'nrcm')
      .subscribe((res: any) => {
        this.unique11turnbooklist=res.Data;
        this.byTruckName=true;
        this.turnbooklist = res.Data;
        this.unique11turnbooklist= res.Data.map(r=>r.truckName.truckno).filter(function(item, pos) {return res.Data.map(r=>r.truckName.truckno).indexOf(item) == pos;})

      });

}

  store(data) {
    data.value['method'] = 'insert';
    this.apiCallservice.handleData_New_python
      ('commoninformation',
       1, data.value, true)
      .subscribe((res: any) => {
        alert(res['Status']);
        this.myFormGroup.patchValue({
          location:'',
          typeOfLoad:'',
          value:''
        })
      });
  }
  find11UniqueTruck(){
    if(this.trucknoid11!=='Default'){
      this.selectDate=false;
      this.byTruckName=true;
    this.turn11=this.turnbooklist.filter(r=>{return r.truckName.truckno==this.trucknoid11});
    this.turn11.forEach(r=>{
      let ad=r.advanceArray
      for(let i=0;i<ad.length;i++){
          if(ad[i]['reason']==='Balance'){
              r['BHamt']=ad[i]['advanceAmt']
              r['BHAccNo']=ad[i]['BHAccNo']
              r['BHAccName']=ad[i]['BHAccname']
          }
      }
  })
    
    }
  }
}

