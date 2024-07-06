import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { updateStyleProp } from '@angular/core/src/render3/styling';

@Component({
  selector: 'app-lrdisplay',
  templateUrl: './lrdisplay.component.html',
  styleUrls: ['./lrdisplay.component.css'],
  providers: [ApiCallsService]
})
export class LRDisplayComponent implements OnInit {

  public show = false;
  public today;
  public todaysDate;
  public date = new Date();
  public myFormGroup: FormGroup;
  public lrlist=[];
  public updateLR={'to':'','givenBy':''};
  public index;
  public toF='';
  public lrmissTable=false;
public lrmissdata=[];

public given:Boolean;
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService, public formBuilder: FormBuilder,) {if(!this.securityCheck.login){
      this.router.navigate([''])
    }
  }

  ngOnInit() {
    this.todaysDate = this.handleF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    this.myFormGroup = this.formBuilder.group({
      lrvalue: '',
      to: '',
      date: '',
      givenBy: ''
    });
  }

  find = function (data = null) {//only for data from 1st april 2021 and loading data is empty
    let tempObj = {};
    tempObj['tablename'] = ''
    tempObj['method'] = 'getEmptyLRBooks'

    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, true)
      .subscribe((res: any) => {
          this.lrlist = res.Data[0]['lrnos'];
      });
  };


  showDatabyid = function (data,j,given) {
    if(given){
    this.show = true;
    this.index=j;
    this.given=given;
    this.updateLR['to']=data.to;
    this.updateLR['givenBy']=data.givenBy;
    this.myFormGroup.patchValue({
      lrvalue: data.lrvalue,
      to: data.to,
      date: data.date,
      givenBy: data.givenBy
    });
  }else{
    this.myFormGroup.patchValue({
      lrvalue: data.lrvalue,
      to: '',
      date:'',
      givenBy:''
    });
    this.toF=data.to
    this.index=j;
    this.given=given;
    this.edit();
  }
  };

  edit() {
    if(confirm('Are you sure?')){
    let tempObj={}
    tempObj['method']='updateLRSend_'+this.given;
    tempObj['tablename']=''
    tempObj['lrvalue']=this.myFormGroup.value.lrvalue;
    tempObj['date']=this.myFormGroup.value.date;
    tempObj['to']=this.myFormGroup.value.to;
    tempObj['givenBy']=this.myFormGroup.value.givenBy;
    tempObj['index']=this.index;
    tempObj['given']=this.given;
    tempObj['toF']=this.toF;
    this.show = true;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((response: Response) => {
      alert(response['Status'])
    });
  }
  }

  getLRMISS(){
    let temp={
    'lr':this.myFormGroup.value.lrvalue,
    'method':'missingLRnotInTB',
    'tablename':''
    }
    this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
    .subscribe((response:any) => {
      this.lrmissTable=true;
      this.lrmissdata=response.Data;
    });
  }
}
