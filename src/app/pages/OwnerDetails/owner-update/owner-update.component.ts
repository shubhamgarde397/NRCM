import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Router } from 'node_modules/@angular/router';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css'],
  providers: [ApiCallsService]
})
export class OwnerUpdateComponent implements OnInit {
  public villagenamelist: any;
public typeOfVehicle;
  public show = false;
  public truckno: string;
  public oname: string;
  public pan: string;
  public mobileno: number;
  public myFormGroup: FormGroup;
  public myFormGroup1: FormGroup;
  public submitted = false;
  public contactArray = [];
  public contactOArray = [];v
  public accountArray = [];
  public contactA;
  public contactOA;
  public preferenceArray = [];
  public pA='';
  public nA='';
  public type;
  public villagedetailslist;
  public commonArray;
  public considerArray = [];
  public no;
  public preferenceArrayName=[]
  public ownerdetailslist;
  public transportsArray=[];
public selectedTransport;
public selectedTransportid;
public transportsArrayList=[];
public selectedTransportNo;
  constructor(
    public router:Router,
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) {if(!this.sec.login){
      this.router.navigate([''])
    } }

  ngOnInit() {
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infoowner')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.myFormGroup = this.formBuilder.group({
      truckno: [this.handledata.Data.truckno],
      oname: [this.handledata.Data.oname],
      pan: [this.handledata.Data.pan],
      typeOfVehicle: [this.handledata.Data.typeOfVehicle],
      aadhar: [this.handledata.Data.aadhar],
      contact: [this.handledata.Data.contact],
      accountName: '',
      accountNumber: '',
      ifsc: '',
      r: [this.handledata.Data.r],
      d: [this.handledata.Data.d],
      P: [this.handledata.Data.P],
      h: [this.handledata.Data.h],
      b: [this.handledata.Data.b],
      l: [this.handledata.Data.l],
      weight: [this.handledata.Data.weight],
      transports:[this.handledata.Data.transports],
      regFee:[this.handledata.Data.regFee],
      regFeeDate:[this.handledata.Data.regFeeDate]
      
    });

    this.myFormGroup1 = this.formBuilder.group({
      truckno: [this.handledata.Data.truckno],
      newtruckno:''
    });
    
    this.contactArray = this.handledata.Data.contact;
    this.accountArray = this.handledata.Data.accountDetails;
    this.preferenceArray = this.handledata.Data.preferences;
    this.transportsArray = this.handledata.Data.transports;
    this.selectedTransport=this.transportsArray[0]['tptName'];
    this.selectedTransportid=this.transportsArray[0]['_id'];
    this.type=this.handledata.Data.typeOfVehicle;
    this.no=this.handledata.Data.updateNumber
  }

  getInformationData() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.sec.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.sec.commonArray['villagenames'];
        this.fetchBasic();
      });
  }

  fetchBasic() {
    this.villagedetailslist=[];
    this.transportsArray = [];
    this.commonArray = this.sec.commonArray;
    this.villagedetailslist = this.commonArray.villagenames;
    this.transportsArrayList = this.commonArray.transport;
  }

  

  getTransports(){
    this.considerArray = this.handledata.createConsiderArray('infotpt')
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.sec.commonArray['transport'] = Object.keys(res.transport[0]).length > 0 ? res.transport : this.sec.commonArray['transport'];;
        this.fetchBasic();
      });
  }

  findTramsportDetails(){
    this.selectedTransport=this.transportsArrayList[this.selectedTransportNo]['tptName']
    this.selectedTransportid=this.transportsArrayList[this.selectedTransportNo]['_id']
  }

  back() {
    this.show = !this.show;
    this._location.back();
  }
  change = function (data) {
    this.submitted = true;
    let formbody = {}
    formbody['truckno'] = data.value.truckno;
    formbody['oname'] = data.value.oname;
    formbody['pan'] = data.value.pan;
    formbody['typeOfVehicle'] = data.value.typeOfVehicle===undefined?this.handledata.Data.typeOfVehicle:data.value.typeOfVehicle;
    formbody['aadhar'] = data.value.aadhar;
    formbody['contact'] = this.contactArray;
    formbody['_id'] = this.handledata.Data._id;
    formbody['accountDetails'] = this.accountArray;
    formbody['preferences'] = this.preferenceArray;
    formbody['reference'] = this.handledata.Data.reference;
    formbody['method'] = 'updateOwner';
    formbody['tablename'] = 'ownerdetails';
    formbody['h'] = data.value.h;
    formbody['b'] = data.value.b;
    formbody['l'] = data.value.l;
    formbody['weight'] = data.value.weight;
    formbody['transportid'] = this.selectedTransportid;
    formbody['update']=this.handledata.Data.update;


    this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
      .subscribe((response: Response) => {
        if (response['Status'] === 'Updated') {
          alert(response['Status']);
          this.sec.commonArray['ownerdetails'].forEach((res) => {
            if (res._id == this.handledata.Data._id) {
              res['truckno'] = data.value.truckno;
              res['oname'] = data.value.oname;
              res['pan'] = data.value.pan;
              res['typeOfVehicle'] = data.value.typeOfVehicle===undefined?this.handledata.Data.typeOfVehicle[0]:data.value.typeOfVehicle;
              res['aadhar'] = data.value.aadhar;
              res['contact'] = this.contactArray;
              res['accountDetails'] = this.accountArray;
              res['preferences'] = this.preferenceArray;
              res['reference'] = "";
              res['h'] = data.value.h;
              res['b'] = data.value.b;
              res['l'] = data.value.l;
              res['weight'] = data.value.weight;
            }
          })

          this.show = !this.show;
          this._location.back();
        }
      });

  };

  addMore() {
    this.contactArray.push(this.contactA)
    this.contactA = '';
  }

  deleteOne(i, j) {
    this.contactArray.splice(j, 1);
  }

  addMoreO() {
    this.contactOArray.push(this.contactOA)
    this.contactOA = '';
  }

  deleteOOne(i, j) {
    this.contactOArray.splice(j, 1);
  }

  addaccount() {
    if (this.myFormGroup.value.accountnumber === '' || this.myFormGroup.value.accountname === ''  || this.myFormGroup.value.ifsc === '') { alert('Cant enter empt entries!') } else {

      let tempObj = {};
      tempObj['accountName'] = this.myFormGroup.value.accountName;
      tempObj['accountNumber'] = this.myFormGroup.value.accountNumber;
      tempObj['ifsc'] = this.myFormGroup.value.ifsc;
      this.accountArray.push(tempObj);
      this.myFormGroup.patchValue({ accountName: '' });
      this.myFormGroup.patchValue({ accountNumber: '' });
      this.myFormGroup.patchValue({ ifsc: '' });
    }
  }

  copyaccount(){
    this.myFormGroup.patchValue({ accountName: this.accountArray[0]['accountName'] });
      this.myFormGroup.patchValue({ accountNumber: this.accountArray[0]['accountNumber'] });
      this.myFormGroup.patchValue({ ifsc: this.accountArray[0]['ifsc'] });
  }

  deleteOneA(i, j) {
    if (confirm('Are you sure?')) {
      this.accountArray.splice(j, 1);
    }
  }


  findvillagedetails(){
    this.preferenceArray.push(this.pA.split('+')[0])
    this.preferenceArrayName.push(this.pA.split('+')[1])
    this.pA=''

  }


  deleteOneP(i, j) {
    this.preferenceArray.splice(j, 1);
    this.preferenceArrayName.splice(j, 1);
  }


  changeTruck(){
    let tempObj={}
    tempObj['method']='changeTnoInDateTruckAndTruckDetails';
    tempObj['tablename']='';
    tempObj['ownerid']=this.handledata.Data['_id']
    tempObj['newtruckno']=this.myFormGroup1.value.newtruckno;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
      this._location.back();
    });    
  }

}
