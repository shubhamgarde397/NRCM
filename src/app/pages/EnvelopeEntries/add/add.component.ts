import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

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

public tableData4=[]
public contactOA=''
public trucknodata='';
public tableDataTF4=false;
public villagedetailslist=[];
public nA;
public nativeArray=[]
public nativeArrayName=[]
public villagedetails=[];

  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService,
    public handleF:handleFunction

  ) { }

  ngOnInit() {
    this.todayDate=this.handleF.createDate(new Date());

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

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.villagedetails=res.Data;
      });
    break;

}
  }

  getsingleTrucks(){
    let tempObj = {}
    tempObj['tablename'] = 'ownerdetails'
    tempObj['method'] = 'displayEditTruck'
    tempObj['truckno'] = this.trucknodata;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.tableData4=res.Data;
        this.tableDataTF4=true;
      });
  }

  getalltransports(){
    let tempObj={}
    tempObj['method']='gettpts'
    tempObj['truckno']=this.trucknodata;
    tempObj['tablename']='transport'
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {
      this.tableData=res.Data;
      this.alltransports=res.Data;
      this.tableDataTF=true;
    });
  }


  newData() {
    console.log(this.data);
    
    if (this.data === '' || this.data === null || this.data === undefined) {
      this.tableData = [];
      this.tableData = this.alltransports;
    }
    else {
      let tempList = this.alltransports;
      this.tableData = this.alltransports;
      this.tableData = [];
      let tempData = [];
      tempList.filter((res, index) => {
        if (res['tptName'].includes(this.data)) {
          tempData.push(res);
        }
      })
      this.tableData = [];
      this.tableData = tempData;
    }
  }

  attachToList(i,j){
    this.attachToListA.push(i);
    console.log(this.attachToListA);

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
    this.apiCallservice.handleData_New_python('commoninformation', 1, temp, 1)
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

attachToOwner3(i,j){
  

  let temp={}
  temp['method']='attachTrucksDetails'
  temp['tablename']='';
  temp['contact']=i['contact']
  temp['nativeplaces']=i['nativeplaces']
  temp['_id']=i['_id']

    this.apiCallservice.handleData_New_python('commoninformation', 1, temp, 1)
    .subscribe((res: any) => {
      alert(res.Status);
      

    });

  
}


addMoreO(j) {
  this.tableData4[j]['contact'].push(this.contactOA)
  this.contactOA = '';
}

deleteOOne( j,jj) {
  this.tableData4[j]['contact'].splice(jj, 1);
}

  findvillagedetailsN(j){
    this.tableData4[j]['nativeplaces'].push(this.nA)
    this.nA=''
  }

  deleteOneN(j,jj) {
    this.tableData4[j]['nativeplaces'].splice(jj, 1);
  }



}

