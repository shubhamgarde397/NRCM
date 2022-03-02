import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-gstupdate',
  templateUrl: './gstupdate.component.html',
  styleUrls: ['./gstupdate.component.css'],
  providers: [ApiCallsService]
})
export class GstupdateComponent implements OnInit {
  public villagenamelist: any;
  public show = false;
  public name: string;
  public gst: string;
  public dest: string;
  public myFormGroup: FormGroup;
  public submitted = false;
  public commonArray;
  public cities;
  public city;
  public pT;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }
  public dbName = 'NRCM_Information';
  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      name: this.handledata.Data.name,
      gst: this.handledata.Data.gst,
      dest: this.handledata.Data.dest,
      addr1: this.handledata.Data.addr1,
      addr2: this.handledata.Data.addr2,
      cities:[],
      accNo:this. handledata.Data.accNo,
      partyType:this.handledata.Data.partyType
    });
    this.dest = this.handledata.Data.dest;
    this.pT = this.handledata.Data.partyType;
    this.commonArray = this.sec.commonArray;
    this.villagenamelist = this.commonArray.villagenames;
    this.cities=this.handledata.Data.cities;
  }

  addCity(){
    this.cities.push(this.city);
  }

  change = function (data) {
    this.submitted = true;

    let formbody = {}
    formbody['name'] = data.value.name;
    formbody['gst'] = data.value.gst;
    formbody['dest'] = data.value.dest;
    formbody['addr2'] = data.value.addr1;
    formbody['addr3'] = data.value.addr2;
    formbody['accNo'] = data.value.accNo;
    formbody['partyType'] = data.value.partyType;
    formbody['cities'] = this.cities;
    formbody['_id'] = this.handledata.Data._id;
    formbody['method'] = 'update';
    formbody['tablename'] = 'gstdetails';

    this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
      .subscribe((response: Response) => {
        alert(response['Status']);
        this.sec.commonArray['gstdetails'].forEach((res) => {
          if (res._id == this.handledata.Data._id) {
            res['name'] = data.value.name;
            res['gst'] = data.value.gst;
            res['dest'] = data.value.dest;
          }
        })

        this.show = !this.show;
        this._location.back();
      });
  };
  deletecity(i,j){
    this.cities.splice(j,1);
  }
  back() {
    this.show = !this.show;
    this._location.back();
  }

}
