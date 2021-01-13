import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Location } from '@angular/common';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-turn-book-update',
  templateUrl: './turn-book-update.component.html',
  styleUrls: ['./turn-book-update.component.css'],
  providers: [ApiCallsService]
})
export class TurnBookUpdateComponent implements OnInit {

  regulartrucklist: any;
  regularpartylist: any;
  villagelist: any;
  public show = false;
  public list;
  public village_name: string;
  public myFormGroup: FormGroup;
  public truckNamesOwner = [];
  public commonArray;
  public trucklist: any;
  public parties: any;
  public hireExtendingMoney = [];
  public dbName = 1;
  public submitted = false;
  public truckno;
  public party;
  public place;
  public considerArray = [];
  public role = 6;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService, public handlefunction: handleFunction) {
  }

  ngOnInit() {

    this.role = this.securityCheck.role;

    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('turnbookadd')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.role = this.securityCheck.role;

    this.myFormGroup = this.formBuilder.group({
      turnbookDate: this.handledata.Data.turnbookDate,
      truckno: this.handledata.Data.truckno,
      place: this.handledata.Data.place,
      partyName: this.handledata.Data.partyName,
      loadingDate: this.handledata.Data.loadingDate,
      lrno: this.handledata.Data.lrno,
      partyType: this.handledata.Data.partyType,
      hamt: this.handledata.Data.hamt,
      advance: this.handledata.Data.advance,
      balance: this.handledata.Data.balance,
      pochDate: this.handledata.Data.pochDate,
      pochPayment: this.handledata.Data.pochPayment
    });
    this.place = this.handledata.Data.place;
    this.party = this.handledata.Data.partyName;

    this.hireExtendingMoney = this.handlefunction.getMoney();
    this.commonArray = this.securityCheck.commonArray;
  }

  getInformationData() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.fetchBasic();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.parties = [];
    this.villagelist = [];
    this.parties = this.commonArray.gstdetails;
    this.villagelist = this.commonArray.villagenames;
  }


  balance() {
    this.myFormGroup.patchValue({ balance: this.myFormGroup.value.hamt - this.myFormGroup.value.advance })
  }

  change = function (data) {
    let tempObj = {};
    tempObj["turnbookDate"] = this.handledata.Data.turnbookDate,
      tempObj["entryDate"] = this.handledata.Data.entryDate,
      tempObj['method'] = 'update';
    tempObj['tablename'] = 'turnbook';
    tempObj["placeid"] = this.myFormGroup.value.place,//what if we already have entry of thios
      tempObj["partyid"] = this.myFormGroup.value.partyName,//what if we already have entry of thios
      tempObj["ownerid"] = this.handledata.Data.ownerid,//what if we already have entry of thios
      tempObj['_id'] = this.handledata.Data._id;
    tempObj["loadingDate"] = this.myFormGroup.value.loadingDate,
      tempObj["lrno"] = this.myFormGroup.value.lrno,
      tempObj["partyType"] = this.myFormGroup.value.partyType,
      tempObj["hamt"] = this.myFormGroup.value.hamt,
      tempObj["advance"] = this.myFormGroup.value.advance,
      tempObj["balance"] = this.myFormGroup.value.balance,
      tempObj["pochDate"] = this.myFormGroup.value.pochDate,
      tempObj["pochPayment"] = this.myFormGroup.value.pochPayment
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 0)
      .subscribe((res: any) => {
        alert(res.Status)
      });
  };

  back() {
    this.show = !this.show;
    this._location.back();
  }
}
