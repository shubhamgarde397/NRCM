import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QRCodeComponent implements OnInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public villagenamelist: any;
  public gstdetailslist: any;
  public response: any;
  public Name: string;
  public Gst: string;
  public Dest: string;
  public village_name: string;
  public alertBoxSuccess = false;
  public dbName = 'NRCM_Information';
  public commonArray;
  public considerArray;
  public qrlist;
  public partyid;
  public tempPNAME;
  public placeid;
  public tempVNAME;
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,public location:Location,public handlefunction:handleFunction,
    public securityCheck: SecurityCheckService, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService) { }



  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infoqr')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.myFormGroup = this.formBuilder.group({
      qr:'',
      dest:'',
      partyName:'',
      consider: true
    });
  }

  setPartyName() {
    this.partyid = this.gstdetailslist[this.myFormGroup.value.partyName.split('+')[1]]._id;
  }
  setdest() {
    this.placeid = this.villagenamelist[this.myFormGroup.value.dest.split('+')[1]]._id;
  }

  refresh(){
    this.considerArray=[0,0,0,0,0,0,1]
    this.getInformationData()
  }
  
  store({ value, valid }: { value: [{}], valid: boolean }) {
    this.submitted = true;
    console.log(this.myFormGroup.value);
    
    value['partyid']=this.partyid;
    value['placeid']=this.placeid;
    value['method'] = 'insert';
    value['tablename'] = 'qrCode';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, 0)
      .subscribe((res: any) => {
        alert(res['Status']);
        let tempObj={}
        tempObj['qr']=value['qr']
        tempObj['_id']=res['_id'];
        tempObj['party']=this.gstdetailslist[this.myFormGroup.value.partyName.split('+')[1]].name;
        tempObj['place']=this.villagenamelist[this.myFormGroup.value.dest.split('+')[1]].village_name;
        tempObj['entryDate']=this.handlefunction.createDate(new Date());
        this.securityCheck.commonArray['qr'].push(tempObj);

      });
  }

  delete = function (id) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'qrCode';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response: any) => {
          alert(response.Status)
          let bb;
          let j = 0;
          this.qrlist.forEach((res) => {
            if (res._id == id) { bb = j; }
            j = j + 1;
          })
          this.qrlist.splice(bb, 1);
        });
    }
  };

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.securityCheck.commonArray['qr'] = Object.keys(res.qr[0]).length > 0 ? res.qr : this.securityCheck.commonArray['qr'];;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    console.log(this.commonArray);
    
    this.gstdetailslist = [];
    this.villagenamelist = [];
    this.qrlist = [];
    this.gstdetailslist = this.commonArray.gstdetails;
    this.villagenamelist = this.commonArray.villagenames;
    this.qrlist = this.commonArray.qr;
  }

  back() {
    this.submitted = false;
  }
}
