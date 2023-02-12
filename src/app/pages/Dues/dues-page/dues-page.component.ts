import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-dues-page',
  templateUrl: './dues-page.component.html',
  styleUrls: ['./dues-page.component.css'],
  providers: [ApiCallsService]
})
export class DuesPageComponent implements OnInit {
  public myFormGroup: FormGroup;
  public dues=[];
  public showdues=false;

public tbdata={"advanceArray": [{"advanceAmt": '',"advanceDate": "",}],"loadingDate": "2023-10-31","dueInfo": [{"dueWholeAmt": 0,"dueAmtTaken": 0,"date": ""}]};
public bhdata={"truckData": [],"commentToTruck2": []};
public whichData=false;

  constructor(public apiCallservice: ApiCallsService,public formBuilder: FormBuilder,public handledata: HandleDataService) { }



  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      truckno:'',
      date:'',
      amt:'',
      reason:'',
      from:''
    });
    this.fetchBasic();
  }

  store({ value, valid }: { value: [{}], valid: boolean }) {
    value['method'] = 'DuesInsert';
    value['tablename'] = 'dues';
    
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        alert(res['Status']);
      });
  }

  fetchBasic(){
    let temp={"method": "DuesDisplay","tablename": ""}
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, temp, true)
      .subscribe((res: any) => {
        this.dues=res.Data
        this.showdues=true;
      });
  }

  delete = function (id,j) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'dues';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: any) => {
          alert(response.Status);
          this.dues.splice(j, 1);
        });
    }
  };

  details(type,i,j){
    console.log(type);
    console.log(i);
    console.log(j);
    this.whichData=type;
    let temp={
      'method':'displayDueDeepDetails',
      'tablename':'',
      'tbid':i['info'][j]['tbid'],
      'bhid':i['info'][j]['bhid']
    }
    this.apiCallservice.handleData_New_python('turnbook', 1, temp, true)
        .subscribe((response: any) => {
          this.bhdata=response.Data[0]
          this.tbdata=response.Data2[0]
          setTimeout(() => {
            this.whichData=response.Data.length>0?true:false;  
          }, 2000);
          
        });
    

  }



}
