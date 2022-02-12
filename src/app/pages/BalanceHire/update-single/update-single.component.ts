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
    public router: Router) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      date: ['',[Validators.required]],
      truckno: ['', [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[ ]{0,1}[A-Z]{0,2}[ ][0-9]{4}')]],
      pageno: ['',[Validators.required]],
      amount: ['',[Validators.required]]
    });
    this.fetchData();
  }
  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.truckdetailslist = this.commonArray.ownerdetails;
    this.truckArray = this.handledata.Data.truckData;  
    this.truckArray2=this.handledata.giveBHData()
  };

  submit(){
    let date=(<HTMLInputElement>document.getElementById('date'+this.index)).value;
    let truckno=(<HTMLInputElement>document.getElementById('truckno'+this.index)).value;
    let pageno=(<HTMLInputElement>document.getElementById('pageno'+this.index)).value;
    let amount=(<HTMLInputElement>document.getElementById('amount'+this.index)).value;
    let tempObj={}
    tempObj['method']='BalanceHireSingleUpdate';
    tempObj['tablename']='BalanceHire';
    tempObj['id']=this.handledata.Data._id;
    tempObj['date']=date;
    tempObj['truckno']=truckno;
    tempObj['pageno']=pageno;
    tempObj['amount']=amount;
    tempObj['index']=String(this.index);
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
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
    tempObj['id']=this.handledata.Data._id;
    tempObj['index']=String(j);
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
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

  addInternalAddition(data){
    let tempObj={}
    tempObj['date']=data.value.date;
    tempObj['truckno']=data.value.truckno;
    tempObj['amount']=data.value.amount;
    tempObj['pageno']=data.value.pageno;
tempObj['method']='BalanceHireSingleUpdateToAdd';
tempObj['tablename']='BalanceHire';
tempObj['id']=this.handledata.Data._id;
this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
    .subscribe((response: Response) => {
      alert(response['Status']);
    });

  }


}
