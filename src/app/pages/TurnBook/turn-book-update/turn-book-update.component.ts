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
import { Router } from '@angular/router';
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
  public myFormGroup1: FormGroup;
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
  public placeid;
  public partyid;
  public tempVNAME;
  public tempPNAME;
  public trucknoid;
  public trucknoM;
  public ownerid;
  public updateOption = 1;
  public oldTruckNo;
  public truckdetailslist;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService, public handlefunction: handleFunction, public router: Router) {
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
    this.myFormGroup1 = this.formBuilder.group({
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
      pochPayment: this.handledata.Data.pochPayment,
      entryDate: this.handledata.Data.entryDate,
      truckNo: ['', Validators.required],
    });
    this.place = this.handledata.Data.place;
    this.placeid = this.handledata.Data.placeid;
    this.party = this.handledata.Data.partyName;
    this.partyid = this.handledata.Data.partyid;
    this.hireExtendingMoney = this.handlefunction.getMoney();
    this.commonArray = this.securityCheck.commonArray;
    this.updateOption = this.handledata.Data.number;
    this.oldTruckNo = this.handledata.Data.truckno;
  }

  findtruckdetails() {


    this.myFormGroup.patchValue({ trucknoM: this.trucknoid.split('+')[1] })
    this.ownerid = this.trucknoid.split('+')[0];

  }

  setPartyName() {
    this.partyid = this.parties[this.myFormGroup.value.partyName.split('+')[1]]._id;
    this.tempPNAME = this.parties[this.myFormGroup.value.partyName.split('+')[1]].name;
    this.myFormGroup.value.partyName = this.tempPNAME;
  }
  setPlaceName() {
    this.placeid = this.villagelist[this.myFormGroup.value.place.split('+')[1]]._id;
    this.tempVNAME = this.villagelist[this.myFormGroup.value.place.split('+')[1]].village_name;
    this.myFormGroup.value.place = this.tempVNAME;
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
    this.truckdetailslist = [];
    this.parties = this.commonArray.gstdetails;
    this.villagelist = this.commonArray.villagenames;
    this.truckdetailslist = this.commonArray.ownerdetails;
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
    tempObj["placeid"] = this.placeid,//what if we already have entry of thios
      tempObj["partyid"] = this.partyid,//what if we already have entry of thios
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
        alert(res.Status);
        if (res.Status === 'Updated') {
          let tempData = this.handledata.giveTurn();
          tempData[this.handledata.Data.index]["turnbookDate"] = this.handledata.Data.turnbookDate,
            tempData[this.handledata.Data.index]["entryDate"] = this.handledata.Data.entryDate,
            // tempData[this.handledata.Data.index]["placeid"] = this.placeid,//what if we already have entry of thios
            tempData[this.handledata.Data.index]['villageDetails'][0]['_id'] = this.placeid,
            tempData[this.handledata.Data.index]['villageDetails'][0]['village_name'] = this.handledata.Data.place,
            // tempData[this.handledata.Data.index]["partyid"] = this.partyid,//what if we already have entry of thios
            tempData[this.handledata.Data.index]['partyDetails'][0]['_id'] = this.partyid,
            tempData[this.handledata.Data.index]['partyDetails'][0]['name'] = this.handledata.Data.partyName,
            // tempData[this.handledata.Data.index]["ownerid"] = this.handledata.Data.ownerid,//what if we already have entry of thios
            tempData[this.handledata.Data.index]['ownerDetails'][0]['_id'] = this.handledata.Data.ownerid,
            tempData[this.handledata.Data.index]["loadingDate"] = this.myFormGroup.value.loadingDate,
            tempData[this.handledata.Data.index]["lrno"] = this.myFormGroup.value.lrno,
            tempData[this.handledata.Data.index]["partyType"] = this.myFormGroup.value.partyType,
            tempData[this.handledata.Data.index]["hamt"] = this.myFormGroup.value.hamt,
            tempData[this.handledata.Data.index]["advance"] = this.myFormGroup.value.advance,
            tempData[this.handledata.Data.index]["balance"] = this.myFormGroup.value.balance,
            tempData[this.handledata.Data.index]["pochDate"] = this.myFormGroup.value.pochDate,
            tempData[this.handledata.Data.index]["pochPayment"] = this.myFormGroup.value.pochPayment
          this.handledata.saveTurn([]);
          let tempArray = []
          tempArray = tempData;
          // tempArray.splice(this.handledata.Data.index, 1)
          this.handledata.saveTurn(tempArray);
        }
        this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookDispHandler']);
      });

  };

  change2 = function (data) {
    console.log(data);
    console.log(this.trucknoid);

    let tempObj = {};
    tempObj['ownerid'] = data.value.truckNo.split('+')[0];
    tempObj['turnbookDate'] = data.value.turnbookDate;
    tempObj['method'] = 'update';
    tempObj['part'] = 2;
    tempObj['truckno'] = data.value.truckNo.split('+')[1];
    tempObj["user"] = "shubham";
    tempObj["tablename"] = "turnbook";
    tempObj['_id'] = this.handledata.Data._id;


    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 0)
      .subscribe((res: any) => {
        alert(res.Status);
        if (res.Status === 'Updated') {
          let tempData = this.handledata.giveTurn();
          tempData[this.handledata.Data.index]["turnbookDate"] = this.handledata.Data.turnbookDate,
            tempData[this.handledata.Data.index]["entryDate"] = this.handledata.Data.entryDate,
            // tempData[this.handledata.Data.index]["placeid"] = this.placeid,//what if we already have entry of thios
            tempData[this.handledata.Data.index]['villageDetails'][0]['_id'] = this.placeid,
            tempData[this.handledata.Data.index]['villageDetails'][0]['village_name'] = this.tempVNAME,
            // tempData[this.handledata.Data.index]["partyid"] = this.partyid,//what if we already have entry of thios
            tempData[this.handledata.Data.index]['partyDetails'][0]['_id'] = this.partyid,
            tempData[this.handledata.Data.index]['partyDetails'][0]['name'] = this.tempPNAME,
            // tempData[this.handledata.Data.index]["ownerid"] = this.handledata.Data.ownerid,//what if we already have entry of thios
            tempData[this.handledata.Data.index]['ownerDetails'][0]['_id'] = data.value.truckNo.split('+')[0],
            tempData[this.handledata.Data.index]["loadingDate"] = this.myFormGroup.value.loadingDate,
            tempData[this.handledata.Data.index]["lrno"] = this.myFormGroup.value.lrno,
            tempData[this.handledata.Data.index]["partyType"] = this.myFormGroup.value.partyType,
            tempData[this.handledata.Data.index]["hamt"] = this.myFormGroup.value.hamt,
            tempData[this.handledata.Data.index]["advance"] = this.myFormGroup.value.advance,
            tempData[this.handledata.Data.index]["balance"] = this.myFormGroup.value.balance,
            tempData[this.handledata.Data.index]["pochDate"] = this.myFormGroup.value.pochDate,
            tempData[this.handledata.Data.index]["pochPayment"] = this.myFormGroup.value.pochPayment
          this.handledata.saveTurn([]);
          let tempArray = []
          tempArray = tempData;
          // tempArray.splice(this.handledata.Data.index, 1)
          this.handledata.saveTurn(tempArray);
        }
        this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookDispHandler']);
      });

  }

  back() {
    this.show = !this.show;
    this._location.back();
  }
}
