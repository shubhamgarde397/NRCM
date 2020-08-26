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
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService, public handlefunction: handleFunction) {
  }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      date: [this.handledata.Data.date, Validators.required],
      truckNo: [this.handledata.Data.truckNo, Validators.required],
      hireAmount: [this.handledata.Data.hireAmount, Validators.required],
      partyName: [this.handledata.Data.partyName, Validators.required],
      place: [this.handledata.Data.place, Validators.required],
      check: [this.handledata.Data.check, Validators.required]


    });
    this.hireExtendingMoney = this.handlefunction.getMoney();
    this.commonArray = this.securityCheck.commonArray;
    this.trucklist = this.getTruckNames(this.commonArray.ownerdetails, 'owner').concat(this.getTruckNames(this.commonArray.RegularTruck, 'regulartruck'));
    this.parties = this.getPartyNames(this.commonArray.regularparty, 'regular').concat(this.getPartyNames(this.commonArray.gstdetails, 'pipe'));
    this.villagelist = this.commonArray.villagenames;
    this.truckno = this.handledata.Data.truckNo;
    this.party = this.handledata.Data.partyName;
    this.place = this.handledata.Data.place;
  }

  getTruckNames(data, type) {
    let truckData = []
    switch (type) {
      case 'owner':
        data.forEach(element => {
          truckData.push(element.truckno)
        });
        return truckData;
      case 'regulartruck':
        data.forEach(element => {
          truckData.push(element.regulartruck)
        });
        return truckData;
    }
  }

  getPartyNames(data, type) {
    let partyData = []
    switch (type) {
      case 'regular':
        data.forEach(element => {
          partyData.push(element.name)
        });
        return partyData;
      case 'pipe':
        data.forEach(element => {
          partyData.push(element.name)
        });
        return partyData;
    }
  }

  change = function (data) {
    this.submitted = true;
    const date = data.value.date;
    const truckNo = data.value.truckNo;
    const hireAmount = data.value.hireAmount;
    const partyName = data.value.partyName;
    const check = data.value.check;
    const place = data.value.place;
    const id = this.handledata.Data._id;
    this.arr = { date, truckNo, hireAmount, partyName, check, place, id };
    this.apiCallservice.handleData_New(this.dbName, 'turnBook/updateturnbookdata', 3, 0, this.arr)
      .subscribe((response: Response) => {
        this.show = !this.show;
        this._location.back();
      });
  };

  back() {
    this.show = !this.show;
    this._location.back();
  }
}
