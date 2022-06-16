import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

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
  public role = 6;
  public contactArray = [];
  public accountArray = [];
  public contactA;
  public preferenceArray = [];
  public pA='';
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
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }

  ngOnInit() {
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infoowner')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.myFormGroup = this.formBuilder.group({
      truckno: [this.handledata.Data.truckno],
      oname: [this.handledata.Data.oname],
      pan: [this.handledata.Data.pan],
      drivingLicExpiry: [this.handledata.Data.drivingLicExpiry],
      regCardExpiry: [this.handledata.Data.regCardExpiry],
      typeOfVehicle: [this.handledata.Data.typeOfVehicle],
      aadhar: [this.handledata.Data.aadhar],
      dob: [this.handledata.Data.dob],
      contact: [this.handledata.Data.contact],
      accountName: '',
      accountNumber: '',
      bankName: '',
      ifsc: '',
      acc12: false,
      acc363: false,
      r: [this.handledata.Data.r],
      d: [this.handledata.Data.d],
      P: [this.handledata.Data.P],
      hbl: [this.handledata.Data.hbl],
      weight: [this.handledata.Data.weight],
      transports:[this.handledata.Data.transports]
      
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
    this.role = this.sec.role;
    this.type=this.handledata.Data.typeOfVehicle;
    this.no=this.handledata.Data.updateNumber
  }

  getInformationData() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
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
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
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
    formbody['drivingLicExpiry'] = data.value.drivingLicExpiry;
    formbody['regCardExpiry'] = data.value.regCardExpiry;
    formbody['typeOfVehicle'] = data.value.typeOfVehicle===undefined?this.handledata.Data.typeOfVehicle:data.value.typeOfVehicle;
    formbody['aadhar'] = data.value.aadhar;
    formbody['dob'] = data.value.dob;
    formbody['contact'] = this.contactArray;
    formbody['_id'] = this.handledata.Data._id;
    formbody['accountDetails'] = this.accountArray;
    formbody['preferences'] = this.preferenceArray;
    formbody['reference'] = this.handledata.Data.reference;
    formbody['method'] = 'update';
    formbody['tablename'] = 'ownerdetails';
    formbody['r'] = data.value.r;
    formbody['d'] = data.value.d;
    formbody['P'] = data.value.P;
    formbody['hbl'] = data.value.hbl;
    formbody['weight'] = data.value.weight;
    formbody['acc12'] = data.value.acc12;
    formbody['acc363'] = data.value.acc363;
    formbody['transportid'] = this.selectedTransportid;
    formbody['document'] = this.handledata.Data.document;
    

    this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
      .subscribe((response: Response) => {
        if (response['Status'] === 'Updated') {
          alert(response['Status']);
          this.sec.commonArray['ownerdetails'].forEach((res) => {
            if (res._id == this.handledata.Data._id) {
              res['truckno'] = data.value.truckno;
              res['oname'] = data.value.oname;
              res['pan'] = data.value.pan;
              res['drivingLicExpiry'] = data.value.drivingLicExpiry;
              res['regCardExpiry'] = data.value.regCardExpiry;
              res['typeOfVehicle'] = data.value.typeOfVehicle===undefined?this.handledata.Data.typeOfVehicle[0]:data.value.typeOfVehicle;
              // res['typeOfVehiclefirst'] = data.value.typeOfVehicle===undefined?this.handledata.Data.typeOfVehicle[0]:data.value.typeOfVehicle[0];
              res['aadhar'] = data.value.aadhar;
              res['dob'] = data.value.dob;
              res['contact'] = this.contactArray;
              res['accountDetails'] = this.accountArray;
              res['preferences'] = this.preferenceArray;
              res['reference'] = "";
              res['r'] = data.value.r;
              res['d'] = data.value.d;
              res['P'] = data.value.P;
              res['hbl'] = data.value.hbl;
              res['weight'] = data.value.weight;
              res['acc12'] = data.value.acc12;
              res['acc363'] = data.value.acc363;
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

  addaccount() {
    if (this.myFormGroup.value.accountnumber === '' || this.myFormGroup.value.accountname === '' || this.myFormGroup.value.bankname === '' || this.myFormGroup.value.ifsc === '') { alert('Cant enter empt entries!') } else {

      let tempObj = {};
      tempObj['accountName'] = this.myFormGroup.value.accountName;
      tempObj['accountNumber'] = this.myFormGroup.value.accountNumber;
      tempObj['bankName'] = this.myFormGroup.value.bankName;
      tempObj['ifsc'] = this.myFormGroup.value.ifsc;
      tempObj['acc12'] = this.myFormGroup.value.acc12;
      tempObj['acc363'] = this.myFormGroup.value.acc363;
      this.accountArray.push(tempObj);
      this.myFormGroup.patchValue({ accountName: '' });
      this.myFormGroup.patchValue({ accountNumber: '' });
      this.myFormGroup.patchValue({ bankName: '' });
      this.myFormGroup.patchValue({ ifsc: '' });
      this.myFormGroup.patchValue({ acc12: false });
      this.myFormGroup.patchValue({ acc363: false });
    }
  }

  copyaccount(){
    this.myFormGroup.patchValue({ accountName: this.accountArray[0]['accountName'] });
      this.myFormGroup.patchValue({ accountNumber: this.accountArray[0]['accountNumber'] });
      this.myFormGroup.patchValue({ bankName: this.accountArray[0]['bankName'] });
      this.myFormGroup.patchValue({ ifsc: this.accountArray[0]['ifsc'] });
      this.myFormGroup.patchValue({ acc12: this.accountArray[0]['acc12'] });
      this.myFormGroup.patchValue({ acc363: this.accountArray[0]['acc363'] });
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
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
    .subscribe((res: any) => {
      alert(res.Status)
      this._location.back();
    });    
  }

}
