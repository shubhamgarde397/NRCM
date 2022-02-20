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

@Component({
  selector: 'app-automated-msg',
  templateUrl: './automated-msg.component.html',
  styleUrls: ['./automated-msg.component.css']
})
export class AutomatedMsgComponent implements OnInit {

  public myFormGroup: FormGroup;
public trucklist;
public partylist;
public villagelist;
public commonArray;

public mtruckno='';
public mcontact='';
public mparty='';
public mplace='';
public considerArray;

constructor(public apiCallservice: ApiCallsService, public handlefunction: handleFunction,
  public formBuilder: FormBuilder, public spinnerService: Ng4LoadingSpinnerService,
  public securityCheck: SecurityCheckService, public handledata: HandleDataService) {
}

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.myFormGroup = this.formBuilder.group({
      truckNo: '',
      partyName :'',
      place:'',
      contact:''
    });
    this.considerArray = this.handledata.createConsiderArray('turnbook')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.getNewInformation()
  }

  getNewInformation() {
    this.spinnerService.show();
    let tempObj = { "method": "automatedMsg","tablename":""};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.trucklist = res.Data;
        this.partylist = this.commonArray.gstdetails;
        this.villagelist = this.commonArray.villagenames;
        this.spinnerService.hide();
      });
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.villagelist = this.commonArray.villagenames;
        this.partylist = this.commonArray.gstdetails;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.partylist = [];
    this.villagelist = [];
    this.partylist = this.commonArray.gstdetails;
    this.villagelist = this.commonArray.villagenames;
  }


  findtruckdetails(){
    let temp=this.trucklist[parseInt(this.myFormGroup.value.truckNo)]
    console.log(this.trucklist[parseInt(this.myFormGroup.value.truckNo)])
    this.mtruckno=temp.truckno;
    this.mcontact=temp.contact[0]===undefined?'':temp.contact[0];
  };
  setPartyName(){
   let temp=this.partylist[parseInt(this.myFormGroup.value.partyName)];
    console.log(this.partylist[parseInt(this.myFormGroup.value.partyName)]);
    this.mparty=temp.name;
  }
  setPlaceName(){
    let temp=this.villagelist[parseInt(this.myFormGroup.value.place)];
    console.log(this.villagelist[parseInt(this.myFormGroup.value.place)]);
    this.mplace=temp.village_name;
  }

  store(){
    window.open('sms:+919822492193?body='+this.mtruckno+'\n'+this.mparty+'\n'+this.mplace+'\n'+this.mcontact+'\n\nNitin Roadways','_blank');    
    this.myFormGroup.patchValue({
      truckNo: '',
      partyName :'',
      place:'',
      contact:''
    });

    this.mtruckno='';
this.mcontact='';
this.mparty='';
this.mplace='';
  }

}
