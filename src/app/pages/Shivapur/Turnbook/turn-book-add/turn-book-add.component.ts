import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Http } from '@angular/http';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';

@Component({
  selector: 'app-turn-book-add',
  templateUrl: './turn-book-add.component.html',
  styleUrls: ['./turn-book-add.component.css']
})
export class TurnBookAddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;
  public date = new Date();
  public commonArray;
  public days = [];
  public yearNames = [];
  public m;
  public y;
  public role;
  public method;
  public turnbookDate;
  public generatedTruckNo='';
  arr=['01', '02', '03', '04', '05', '06', '07', '08', '09']
  constructor(public apiCallservice: ApiCallsService, public handlefunction: handleFunction,
    public http: Http, public formBuilder: FormBuilder, public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService, public obs: ObsServiceService, public handledata: HandleDataService) {
    this.days = this.handlefunction.generateDays();
    this.yearNames = this.securityCheck.yearNames;
  }



  ngOnInit() {
    for(let i=10;i<100;i++){
      this.arr.push(String(i))
  }
    this.turnbookDate = this.handlefunction.getDate(this.handlefunction.generate2DigitNumber(this.date.getDate()), (this.date.getMonth() + 1), this.date.getFullYear());
    this.obs.dateService.subscribe((res: any) => {
      let arr = res.split('_');
      this.m = this.handlefunction.generateMonthName(arr[0]);
      this.y = arr[1];
    })

    this.myFormGroup = this.formBuilder.group({
      turnbookDate: ['', Validators.required],
      // truckNo: ['', [Validators.required]],
      truckRC:['', [Validators.required]],
      truckDistrict:['', [Validators.required]],
      truckABC:[''],
      truckNo:['', [Validators.required,Validators.pattern('[0-9]{3,4}')]],
    });

    this.role = this.securityCheck.role;
  }

  generateMyTruck(){
    if(this.myFormGroup.value.truckABC===''){
    this.generatedTruckNo=
    this.myFormGroup.value.truckRC+
    this.myFormGroup.value.truckDistrict+
    ' '+
    this.myFormGroup.value.truckNo
    }else{
      this.generatedTruckNo=
    this.myFormGroup.value.truckRC+
    this.myFormGroup.value.truckDistrict+
    ' '+
    this.myFormGroup.value.truckABC.toUpperCase()+
    ' '+
    this.myFormGroup.value.truckNo
    }
  }


  revert() {
    this.myFormGroup.patchValue({ truckRC: '' });
    this.myFormGroup.patchValue({ truckDistrict: '' });
    this.myFormGroup.patchValue({ truckABC: '' });
    this.myFormGroup.patchValue({ truckNo: '' });

  }

  storeTurnBookData() {
    this.submitted = true;
    let tempobj = {};
    tempobj['truckno'] = this.generatedTruckNo;
    tempobj['turnbookDate'] = this.turnbookDate;
    tempobj['entryDate'] = this.date.getFullYear() + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getMonth() + 1)) + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getDate()));
    tempobj['tablename'] = '';
    tempobj['method'] = 'insertTB';
    tempobj["user"]= "rohit";
    tempobj["typeofuser"]= 1;

      this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, 1)
        .subscribe((res: any) => {
          alert(res.Status)
          this.myFormGroup.patchValue({ truckNo: '' })
          
          this.spinnerService.hide();
          this.reset();
        });
  }

  

  reset() {
    this.submitted = false;
    this.myFormGroup.patchValue({ truckNo: '' });

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