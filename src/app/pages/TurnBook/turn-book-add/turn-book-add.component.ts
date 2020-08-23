import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { turn } from './turn';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-turn-book-add',
  templateUrl: './turn-book-add.component.html',
  styleUrls: ['./turn-book-add.component.css'],
  providers: [ApiCallsService]
})
export class TurnBookAddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public model: turn;
  public modelSubmitted: turn;
  public submitted = false;

  public response: any;
  public date;
  public truckNo: string;
  public hireAmount: string;
  public village_name: string;
  public alertBoxSuccess = false;
  public dbName = 1;
  public truckNamesOwner = [];
  public commonArray;
  public trucklist: any;
  public hireExtendingMoney = [];
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService, public handlefunction: handleFunction) {
  }



  ngOnInit() {
    this.hireExtendingMoney = this.handlefunction.getMoney();
    this.commonArray = this.securityCheck.commonArray;
    this.trucklist = this.getTruckNames(this.commonArray.ownerdetails, 'owner').concat(this.getTruckNames(this.commonArray.RegularTruck, 'regulartruck'));

    this.model = new turn(this.date, this.truckNo, this.hireAmount);
    this.myFormGroup = this.formBuilder.group({
      date: [this.model.date, Validators.required],
      truckNo: [this.model.truckNo, Validators.required],
      hireAmount: [this.model.hireAmount, [Validators.required]],
    });
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
  storeTurnBookData({ value, valid }: { value: turn, valid: boolean }) {
    this.submitted = true;
    value['partyName'] = "";
    value['place'] = "";
    value['check'] = false;
    this.apiCallservice.handleData_New(this.dbName, 'turnBook/addturnbookdata', 1, 0, value)
      .subscribe((res: any) => {
        alert('Added Successfully');
      });
  }

  back() {
    this.submitted = false;
  }
}
