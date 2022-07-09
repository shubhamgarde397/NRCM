import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-transport-update',
  templateUrl: './transport-update.component.html',
  styleUrls: ['./transport-update.component.css'],
  providers: [ApiCallsService]
})
export class TransportUpdateComponent implements OnInit {
  public show = false;
  public myFormGroup: FormGroup;
  public submitted = false;
  public contactArray=[]
  public contactA;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }
  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      tptName:this.handledata.Data.tptName,
      name: this.handledata.Data.name,
      pan:this.handledata.Data.pan,
      P:this.handledata.Data.P,
      contact:[this.handledata.Data.contact],
      addr1:this.handledata.Data.addr1,
      addr2:this.handledata.Data.addr2,
      addr3:this.handledata.Data.addr3,
      email:this.handledata.Data.email
    });
    this.contactArray = this.handledata.Data.contact;
    
  }

  change = function (data) {
    this.submitted = true;

    let formbody = {}
    formbody['tptName'] = data.value.tptName;
    formbody['name'] = data.value.name;
    formbody['pan'] = data.value.pan;
    formbody['P'] = data.value.P;
    formbody['contact'] = this.contactArray;
    formbody['addr1'] = data.value.addr1;
    formbody['addr2'] = data.value.addr2;
    formbody['addr3'] = data.value.addr3;
    formbody['email'] = data.value.email;
    formbody['_id'] = this.handledata.Data._id;
    formbody['method'] = 'update';
    formbody['tablename'] = 'transport';

    this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
      .subscribe((response: Response) => {
        alert(response['Status']);
        this.sec.commonArray['transport'].forEach((res) => {
          if (res._id == this.handledata.Data._id) {
            res['tptName'] = data.value.tptName;
            res['name'] = data.value.name;
            res['pan'] = data.value.pan;
            res['P']=data.value.P;
            res['contact'] = this.contactArray;
            res['addr1'] = data.value.addr1;
            res['addr2'] = data.value.addr2;
            res['addr3'] = data.value.addr3;
            res['email'] = data.value.email;
          }
        })

        this.show = !this.show;
        this._location.back();
      });
  };
  deleteOne(i,j) {
    this.contactArray.splice(j, 1);
}

addMore() {
this.contactArray.push(this.contactA)
this.contactA = '';
}
  back() {
    this.show = !this.show;
    this._location.back();
  }

}
