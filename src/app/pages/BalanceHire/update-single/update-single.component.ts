import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-update-single',
  templateUrl: './update-single.component.html',
  styleUrls: ['./update-single.component.css']
})
export class UpdateSingleComponent implements OnInit {

  public myFormGroup;
  public truckArray;
  public index;
  public oldIndex;
  public inProgress=true;
  public commonArray;
  public trucklist;
  public truckdetailslist;
  constructor(
    public handledata: HandleDataService,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService,
    public router: Router) { if(!this.sec.login){
      this.router.navigate([''])
    }}

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      pageno: ['',[Validators.required]],
      amount: ['',[Validators.required]]
    });
    this.fetchData();
  }
  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.truckdetailslist = this.commonArray.ownerdetails;
    this.truckArray = this.handledata.Data.truckData;  
    console.log(this.truckArray);
    
    this.truckArray2=this.handledata.giveBHData()
  };

  submit(){
    let remark=(<HTMLInputElement>document.getElementById('remark'+this.index)).value;
    let amount=(<HTMLInputElement>document.getElementById('amount'+this.index)).value;

    console.log(this.truckArray);
    console.log(this.index);
      console.log(this.oldIndex);

    let tempObj={}
    tempObj['method']='BalanceHireSingleUpdateNew';
    tempObj['tablename']='BalanceHire';
    tempObj['id']=this.truckArray[this.index]['tbid'];
    tempObj['remark']=remark;
    tempObj['amount']=amount;
    tempObj['index']=String(this.index);
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((response: Response) => {
      alert(response['Status']);
      this.router.navigate(['Navigation/BALANCE_HIRE_HANDLER/BalanceHireDisp']);
    });
    this.truckArray[this.oldIndex]['field']=true;
    this.inProgress=true;
    
  }
  clear(){
    this.truckArray[this.oldIndex]['field']=true;
    this.inProgress=true;
  }

  deleteInternalElement(i,j){
    let tempObj={}
    tempObj['method']='BalanceHireSingleUpdateToDelete';
    tempObj['tablename']='BalanceHire';
    tempObj['id']=this.truckArray[j]['tbid'];
    // tempObj['index']=String(j);
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((response: Response) => {
      alert(response['Status']);
      this.router.navigate(['Navigation/BALANCE_HIRE_HANDLER/BalanceHireDisp']);
    });
  }

  enableInternalAddition(i,j){
    if(this.inProgress){
    this.truckArray[j]['field']=false;
    this.index=j;
    this.oldIndex=j;
    this.inProgress=false;
    }else{
      alert('Submit or Cancel the edit field.')
    }
  }

}
