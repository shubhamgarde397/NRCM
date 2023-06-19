import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Http } from '@angular/http';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';

@Component({
  selector: 'app-turn-book-add',
  templateUrl: './turn-book-add.component.html',
  styleUrls: ['./turn-book-add.component.css'],
  providers: [ApiCallsService]
})
export class TurnBookAddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;
  public date = new Date();
  public days = [];
  public yearNames = [];
  public m;
  public y;
  public role;
  public trucknoM;
  public turnbookDate;
  public turnAdd=[]
  public toAdd=[]
  constructor(public apiCallservice: ApiCallsService, public handlefunction: handleFunction,
    public http: Http, public formBuilder: FormBuilder, public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService, public obs: ObsServiceService, public handledata: HandleDataService) {
    this.days = this.handlefunction.generateDays();
    this.yearNames = this.securityCheck.yearNames;
  }



  ngOnInit() {
    this.turnbookDate = this.handlefunction.getDate(this.handlefunction.generate2DigitNumber(this.date.getDate()), (this.date.getMonth() + 1), this.date.getFullYear());
    this.getAvailable();
    this.myFormGroup = this.formBuilder.group({
      turnbookDate: ['', Validators.required],
      trucknoM: ['', [Validators.required]]
    });
    this.role = this.securityCheck.role;
  }


  storeTurnBookData() {
    this.submitted = true;
    let tempobj = {};
    tempobj['trucks'] = this.toAdd;
    tempobj['turnbookDate'] = this.turnbookDate;
    tempobj['entryDate'] = this.date.getFullYear() + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getMonth() + 1)) + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getDate()));
    tempobj['tablename'] = 'turnbook';
    tempobj['method'] = 'bulkTurnTrucks';
    tempobj["user"]= "shubham";
    tempobj["typeofuser"]= 1;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, true)
        .subscribe((res: any) => {
          alert(res.Status)
          this.myFormGroup.patchValue({ trucknoM: '' })
        });
  }

  getAvailable(){
    let tempobj = {};
      tempobj['tablename'] = 'turnbook';
      tempobj['method'] = 'getAvailable';
      tempobj["user"]= "shubham";
      tempobj["typeofuser"]= 1;
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, true)
          .subscribe((res: any) => {
            this.turnAdd=res.balanceData
            this.turnAdd.forEach(r=>{r['delete']=false});
          });
  }

  checkValidity(data){
    
    
    let c= this.turnAdd.find(r=>{return r.truckno==data})
    return c?false:true;
  }

  addToTurn(){
    if(this.checkValidity(this.myFormGroup.value.trucknoM)){
    let temp={}
    temp['turnbookDate']=this.turnbookDate;
    temp['truckno']=this.myFormGroup.value.trucknoM
    temp['delete']=true
    this.turnAdd.push(temp);
    this.toAdd.push(temp)
    this.myFormGroup.patchValue({trucknoM:''})
    }else{
      alert('Truck already present!')
    }
  }

  deleteFromTurn(data) {
    if (confirm('Are you sure?')) {
      this.turnAdd.splice(data, 1);
      this.toAdd.splice(data, 1);
    }
  }

  back() {
    this.submitted = false;
  }

  leftRight(LR) {
    let tempArray;
    let date;
    switch (LR) {
      case 'back':
        tempArray=this.turnbookDate.split('-');
        date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])-1)
        this.turnbookDate = this.handlefunction.createDate(date);
        break;
      case 'ahead':
        tempArray=this.turnbookDate.split('-');
        date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])+1)
        this.turnbookDate = this.handlefunction.createDate(date);
        break;
    }
  }

}

