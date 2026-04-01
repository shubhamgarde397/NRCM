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
public billno=''
public bills=[];
public contactOA=''
public trucknodata='';
public tableDataTF4=false;
public truckOA='';
public villagedetailslist=[];
public nA;
public villagedetails=[];
public trucks2=[];
public billnoArray='';
public contactArray=[];
public myFormGroup: FormGroup;
public contactA=''
public nrcmid=0;
public partyVar19='';
  public transportlist;
  public commonArray;
  public considerArray;
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

      this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infotpt')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.transportlist = this.commonArray.transport;


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

  addbillno(){
        this.bills.push(String(this.billno));
        this.billno = ''
      }

      addbillnoArray(){
         
          this.billnoArray.split(',').forEach(r=>{this.bills.push(r)})
        
        this.billnoArray = ''

      }
      delBill(index){
        if (confirm('Are you sure?')) {

          this.bills.splice(index,1);
          
      }
    }

     getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.sec.commonArray['transport'] = Object.keys(res.transport[0]).length > 0 ? res.transport : this.sec.commonArray['transport'];;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }
   fetchBasic() {
    this.commonArray = this.sec.commonArray;
    this.transportlist = [];
    this.transportlist = this.commonArray.transport;
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

  sendToSetMain(){
    let tempObj={}
    tempObj['method']='setbilltotpt'
    tempObj['billnos']=this.bills;
    tempObj['transportid']=this.partyVar19;
    tempObj['tablename']=''
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
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

refresh(){
    this.considerArray=[0,0,0,0,0,0,1,0]
    this.getInformationData()
  }

// tn31bb9574
formatTruckNo(a){
  a=a.toUpperCase();
	let newtruck=[]
	let raw=a.replace(/ /g, "");
	newtruck.push(raw.slice(0,2))
	newtruck.push(raw.slice(2,4))
	
	if(raw.length==10){
			newtruck.push(' ')
			newtruck.push(raw.slice(4,6))	
			newtruck.push(' ')
			newtruck.push(raw.slice(6,10))	
	}
	if(raw.length==9){

			newtruck.push(' ')
			newtruck.push(raw.slice(4,5))	
			newtruck.push(' ')
			newtruck.push(raw.slice(5,9))	
	}
	if(raw.length==8){
			newtruck.push(' ')
			newtruck.push(raw.slice(4,8))	
	}
	return newtruck.join('')
}

addMore() {
  this.contactArray.push(this.contactA)
  this.contactA = '';
}


}

