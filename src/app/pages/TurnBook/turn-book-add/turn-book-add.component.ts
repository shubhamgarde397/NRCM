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
import { Router } from 'node_modules/@angular/router';

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
  constructor(public router:Router,public apiCallservice: ApiCallsService, public handlefunction: handleFunction,
    public http: Http, public formBuilder: FormBuilder, public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService, public obs: ObsServiceService, public handledata: HandleDataService) {
    this.days = this.handlefunction.generateDays();
    this.yearNames = this.securityCheck.yearNames;
    if(!this.securityCheck.login){
      this.router.navigate([''])
    }
  }



  ngOnInit() {
    this.turnbookDate = this.handlefunction.getDate(this.handlefunction.generate2DigitNumber(this.date.getDate()), (this.date.getMonth() + 1), this.date.getFullYear());
    this.getAvailable();
    this.myFormGroup = this.formBuilder.group({
      turnbookDate: ['', Validators.required],
      // trucknoM: ['', [Validators.required]],
      trucknoM: ['', [Validators.required]],
      type:['None',[Validators.required]],
    });
    this.role = this.securityCheck.role;
  }

getType(a){
  let raw=a.replace(/ /g, "");
  return [raw.split('.')[0],raw.split('.')[1]===undefined?'O':raw.split('.')[1]]
}

  addToTurn(){
    let truckNo='';
    let data=this.getType(this.myFormGroup.value.trucknoM);
    data[0]=data[0].toUpperCase();
    data[1]=data[1].toUpperCase();
    truckNo=this.formatTruckNo(data[0])
    if(this.checkValidity(truckNo)){
    let temp={}
    temp['turnbookDate']=this.turnbookDate;
    temp['truckno']=truckNo;
    temp['type']=data[1]==='O'?'Open':'Container';
    temp['delete']=true
    this.turnAdd.push(temp);
    this.toAdd.push(temp)
    this.myFormGroup.patchValue({trucknoM:''})
    }else{
      alert('Truck already present!')
      this.myFormGroup.patchValue({trucknoM:''})
      this.myFormGroup.patchValue({type:'None'})
    }
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

