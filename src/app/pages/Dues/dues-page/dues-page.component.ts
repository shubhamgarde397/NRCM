import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';

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
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,public handledata: HandleDataService) { }



  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      truckno:'',
      date:'',
      amt:'',
      reason:'',
      showto:''
    });
    this.fetchBasic();
  }

  store({ value, valid }: { value: [{}], valid: boolean }) {
    value['method'] = 'DuesInsert';
    value['tablename'] = 'dues';
    
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, 0)
      .subscribe((res: any) => {
        alert(res['Status']);
      });
  }

  fetchBasic(){
    let temp={"method": "DuesDisplay","tablename": ""}
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, temp, 0)
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

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response: any) => {
          alert(response.Status);
          this.dues.splice(j, 1);
        });
    }
  };



}
