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
  selector: 'app-turn-book-add',
  templateUrl: './turn-book-add.component.html',
  styleUrls: ['./turn-book-add.component.css'],
  providers: [ApiCallsService]
})
export class TurnBookAddComponent implements OnInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;
  public date = new Date();
  public alertBoxSuccess = false;
  public dbName = 1;
  public truckNamesOwner = [];
  public commonArray;
  public trucklist: any;
  public hireExtendingMoney = [];
  public days = [];
  public yearNames = [];
  public m;
  public y;
  public considerArray;
  public role;
  public ownerdetailslist;
  public ownerid;
  public partyid;
  public placeid;
  public partyType;
  public method;
  public turnArray = [];
  public truckdetailslist = [

    {
      "_id": "5ff97b640622860524c9ee75",
      "truckno": "TN92 C 2619",
      "name": "Sarvanan A Lagirisamy",
      "reference": [],
      "accountDetails": [],
      "personalDetails": "5ff92ecaf63deb177c231e2d"
    },
    {
      "_id": "5ff97b640622860524c9ee76",
      "truckno": "TN92 C 5315",
      "name": "Anand Selvaraj",
      "reference": [],
      "accountDetails": [],
      "personalDetails": "5ff92ecaf63deb177c231e2e"
    },
    {
      "_id": "5ff97b640622860524c9ee77",
      "truckno": "TN92 C 7044",
      "name": "Veeraputhiran Poranal",
      "reference": [],
      "accountDetails": [],
      "personalDetails": "5ff92ecaf63deb177c231e2f"
    },
    {
      "_id": "5ff97b640622860524c9ee78",
      "truckno": "TN93 5927",
      "name": "S Subashini",
      "reference": [],
      "accountDetails": [],
      "personalDetails": "5ff92ecaf63deb177c231e30"
    }
  ];
  public gstdetailslist;
  public gstdetailslistid;
  public villagelist;
  public trucknoid;
  public villageData;
  constructor(public apiCallservice: ApiCallsService, public handlefunction: handleFunction,
    public http: Http, public formBuilder: FormBuilder, public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService, public obs: ObsServiceService, public handledata: HandleDataService) {
    this.days = this.handlefunction.generateDays();
    this.yearNames = this.securityCheck.yearNames;
  }



  ngOnInit() {

    this.obs.dateService.subscribe((res: any) => {
      let arr = res.split('_');
      this.m = this.handlefunction.generateMonthName(arr[0]);
      this.y = arr[1];
    })

    this.commonArray = this.securityCheck.commonArray;
    this.hireExtendingMoney = this.handlefunction.getMoney();

    this.myFormGroup = this.formBuilder.group({
      turnbookDate: ['', Validators.required],
      truckNo: ['', Validators.required],
      partyType: '',
      place: '',

    });
    this.considerArray = this.handledata.createConsiderArray('turnbook')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();

    this.role = this.securityCheck.role;
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.securityCheck.commonArray['truckdetails'] = Object.keys(res.truckdetails[0]).length > 0 ? res.truckdetails : this.securityCheck.commonArray['truckdetails'];;
        this.truckdetailslist = this.commonArray.truckdetails;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.gstdetailslist = [];
    this.villagelist = [];
    this.gstdetailslist = this.commonArray.gstdetails;
    this.villagelist = this.commonArray.villagenames;
    console.log(this.villagelist);

  }

  findtruckdetails() {
    console.log(this.truckdetailslist);

    console.log(this.trucknoid.split('.) '));

    let tf = this.trucknoid.split('.) ').length > 1 ? true : false;
    if (tf) {
      this.ownerid = this.truckdetailslist[(this.trucknoid.split('.) ')[0]) - 1]['_id'];
      this.method = "insert,old";
    }
    else {
      this.ownerid = '';
      this.method = "insert,new";
    }

  }

  storeTurnBookData({ value, valid }: { value: [{}], valid: boolean }) {
    this.submitted = true;
    let tempobj = {};

    tempobj['truckno'] = this.trucknoid.split('.) ').length > 1 ? this.trucknoid.split('.) ')[1] : this.trucknoid.split('.) ')[0];
    tempobj['ownerid'] = this.ownerid;
    tempobj['placeid'] = this.villageData === undefined ? '' : this.villageData.split('+')[0];
    tempobj['partytype'] = value['partyType'];
    tempobj['turnbookDate'] = value['turnbookDate'];
    tempobj['entryDate'] = this.date.getFullYear() + '-' + this.handlefunction.generate2DigitNumber((this.date.getMonth() + 1)) + '-' + this.date.getDate();
    tempobj['tablename'] = 'turnbook';
    tempobj['method'] = this.method;
    this.submitted = true;
    this.apiCallservice.handleData_New_python('turnbook', 1, tempobj, 1)
      .subscribe((res: any) => {
        this.spinnerService.hide();
        this.fetchBasic();
        if (res.status === "Duplicate Entry Found.") {
          alert(res.status);
        } else {
          if (this.method === "insert,new") {
            let tempObj1 = {};
            tempObj1['personalDetails'] = "";
            tempObj1['truckno'] = this.trucknoid.split('.) ').length > 1 ? this.trucknoid.split('.) ')[1] : this.trucknoid.split('.) ')[0];
            tempObj1['accountDetails'] = "";
            tempObj1['reference'] = "";
            tempObj1['_id'] = res['_id'].split('+')[1];
            this.securityCheck.commonArray['truckdetails'].push(tempObj1);
          } else {
            alert('Inserted Successfullt!');
          }
        }

        this.reset();
      });
  }
  reset() {
    this.submitted = false;
    this.myFormGroup.patchValue({ truckNo: '' });
    this.myFormGroup.patchValue({ partyType: '' });
    this.myFormGroup.patchValue({ place: '' });

    document.getElementById('truckNoone').focus();
  }
  delete(data) {
    if (confirm('Are you sure?')) {
      this.turnArray.splice(data, 1);
    }
  }

  back() {
    this.submitted = false;
  }
}
