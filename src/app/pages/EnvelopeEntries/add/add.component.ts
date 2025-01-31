import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [ApiCallsService]
})
export class AddComponent implements OnInit {

public tableData=[]
public alltransports=[]
public tableDataTF=false;
public whichType;
public todayDate;
public data='';
public attachToListA=[];

public contactOA=''
public trucknodata='';
public tableDataTF4=false;
public truckOA='';
public villagedetailslist=[];
public nA;
public villagedetails=[];
public trucks2=[];
public contactArray=[];
public myFormGroup: FormGroup;
public contactA=''
public nrcmid=0;
  constructor(
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService,
    public handleF:handleFunction

  ) {if(!this.sec.login){
    this.router.navigate([''])
  } }

  ngOnInit() {
    this.todayDate=this.handleF.createDate(new Date());
    this.myFormGroup = this.formBuilder.group({
      tptName:'',
      contact:[],
      addr1:'',
      addr2:'',
      addr3:'',
      email:''
    });
    this.nrcmid = this.sec.nrcmid;
  }

  store(data) {
    data.value['contact']=this.contactArray
    data.value['method'] = 'insertT';
    data.value['tablename'] = 'transport';
    this.apiCallservice.handleData_New_python
      ('commoninformation',
       1, data.value, true)
      .subscribe((res: any) => {
        alert(res['Status']);
        this.contactArray=[];
      });
  }

  getWhichType(data){
this.whichType=data;
switch(data){
  case '2':
    
    this.tableDataTF=false;
    this.tableData=[];
    this.getalltransports()
    break;

    case '4':
    

    let tempObj = {}
    tempObj['tablename'] = 'villagenames'
    tempObj['method'] = 'display'
    tempObj['code'] = 'v'

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.villagedetails=res.Data;
      });
    break;

}
  }

  getalltransports(){
    let tempObj={}
    tempObj['method']='gettpts'
    tempObj['truckno']=this.trucknodata;
    tempObj['tablename']='transport'
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      this.tableData=res.Data;
      this.alltransports=res.Data;
      this.tableDataTF=true;
    });
  }

  attachToList(i,j){
    this.attachToListA.push(i);

    this.alltransports.filter((res, index) => {
      if (res['tptName'].includes(i.tptName)) {
        res['attach']=true;
      }
    })
  
}

sendAllTrucksForAttachment(){
  
  let arr=[]
  for(let i=0;i<this.attachToListA.length;i++){
    if((<HTMLInputElement>document.getElementById('' + i)).value!==''){
      let tempo={'transportid':this.attachToListA[i]['_id'],'truckno':(<HTMLInputElement>document.getElementById('' + i)).value}
      arr.push(tempo);
    }
  }
  let temp={}
  temp['method']='attachTrucksToTransports'
  temp['tablename']='';
  temp['arr']=arr;

  if(arr.length>0){
    this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
    .subscribe((res: any) => {
      alert(res.Status);
      
for(let i=0;i<this.attachToListA.length;i++){
  
    if(res['Data'][i]===1){
      
     this.attachToListA[i]['color']='green'

    }
      else{
       this.attachToListA[i]['color']='red'
        
      }
}
    });
  }else{
    alert('No Trucks Entered!')
  }
  
}


// tn31bb9574


addMoreT(j) {
  this.tableData[j]['trucks2'].push((<HTMLInputElement>document.getElementById('truck_' + j)).value)
  this.truckOA = '';
}
addMore() {
  this.contactArray.push(this.contactA)
  this.contactA = '';
}
addToDB(){
  let Data=[]
  for(let i=0;i<this.tableData.length;i++){
    let temp={}
    if(this.tableData[i].trucks2.length>0){
      temp['_id']=this.tableData[i]['_id']
      temp['trucks2']=this.tableData[i]['trucks2']
      Data.push(temp)
    }

  }
  if(Data.length>0){

  let temp={}
  temp['method']='attachTrucksToTransports'
  temp['tablename']='';
  temp['Data']=Data;

    this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
    .subscribe((res: any) => {
      alert(res.Status);
    });
  }
  
}





deleteOOne( j,jj) {
  this.tableData[j]['trucks2'].splice(jj, 1);
}

}

