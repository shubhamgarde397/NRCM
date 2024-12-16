import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from 'node_modules/@angular/router';

@Component({
  selector: 'app-rentdisplay',
  templateUrl: './rentdisplay.component.html',
  styleUrls: ['./rentdisplay.component.css'],
  providers: [ApiCallsService]
})
export class RentdisplayComponent implements OnInit {

  public myFormGroup: FormGroup;
  public display;
  public whichType='add';
public villagenamelist=[];
public parties=[];
  constructor(public router:Router,public apiCallservice: ApiCallsService,public handledata: HandleDataService,public sec:SecurityCheckService,public formBuilder: FormBuilder) { 
    if(!this.sec.login){
      this.router.navigate([''])
    }
  }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      location: '',
      location2: '',
      party:'',
      typeOfLoad: '',
      rent:0,
      hamt:0,
      ton:0
    });
  }

  
  switcher(data){
    
    switch (data) {
      case 'add':
       this.whichType=data;
          
        break;
        // getSequenceSacha
        case 'display':
          let tempObj1={}
          
          tempObj1 = { "method": "getRent", "tablename": ''};    
  
          
          this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
            .subscribe((res: any) => {
                this.display=res.Data;
                this.whichType=data;
            });

            
        break;
    }
  }

  getVillages(){
    let value={}
    value['method'] = 'display';
    value['code'] = 'v';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        this.villagenamelist=res.Data;
        this.sec.commonArray['places'] = res.Data.length > 0 ? res.Data : this.sec.commonArray['places'];
      });
  }
  getparties(){
    let value={}
    value['method'] = 'display';
    value['code'] = 'p';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, true)
      .subscribe((res: any) => {
        this.parties=res.Data;
        this.sec.commonArray['parties'] = res.Data.length > 0 ? res.Data : this.sec.commonArray['parties'];
      });
  }
 


  store(data) {
    data.value['method'] = 'insertRent';
    data.value['tablename'] = '';
    this.apiCallservice.handleData_New_python
      ('commoninformation',
       1, data.value, true)
      .subscribe((res: any) => {
        alert(res['Status']);
        this.myFormGroup.patchValue({
          location:'',
          location2:'',
          typeOfLoad:'',
          rent:0,
          hamt:0,
          party:''
        })
      });
  }

  delete(i,j){
    let data={}
    data['method'] = 'deleteRent';
    data['id'] = i._id;
    data['tablename'] = '';
    this.apiCallservice.handleData_New_python
      ('commoninformation',
       1, data, true)
      .subscribe((res: any) => {
        alert(res['Status']);
        this.display.splice(j,1)
      });
  }

}
