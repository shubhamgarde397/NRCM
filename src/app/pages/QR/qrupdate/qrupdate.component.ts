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
import { resolve } from 'dns';

@Component({
  selector: 'app-qrupdate',
  templateUrl: './qrupdate.component.html',
  styleUrls: ['./qrupdate.component.css']
})
export class QRUpdateComponent implements OnInit {
  public villagenamelist: any;
  public parties;
  public partyid;
  public placeid;
  public tempVNAME;
  public tempPNAME;
  public show = false;
  public myFormGroup: FormGroup;
  public submitted = false;
  public commonArray;
  public considerArray;
  public party;
  public place;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public sec: SecurityCheckService) { }
  public dbName = 'NRCM_Information';
  ngOnInit() {

    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogst')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();


    this.myFormGroup = this.formBuilder.group({
      date:this.handledata.Data.entryDate,
      qr:this.handledata.Data.qr,
      dest:this.handledata.Data.place,
      partyName:this.handledata.Data.party,
      type:this.handledata.Data.type
    });

    this.party=this.handledata.Data.party;
    this.place=this.handledata.Data.place
    this.partyid=this.parties.filter(r=>r.name===this.party)[0]['_id']
    this.placeid=this.villagenamelist.filter(r=>r.village_name===this.place)[0]['_id']
  }

  getInformationData() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.sec.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.sec.commonArray['gstdetails'];;
        this.sec.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.sec.commonArray['villagenames'];;
        this.fetchBasic();
      });
  }

  fetchBasic() {
    this.commonArray = this.sec.commonArray;
    this.parties = [];
    this.villagenamelist = [];
    this.parties = this.commonArray.gstdetails;
    this.villagenamelist = this.commonArray.villagenames;
    
  }

  change = function (data) {
    this.submitted = true;

    let formbody = {}
    formbody['date'] = data.value.date;
    formbody['qr'] = data.value.qr;
    formbody['placeid'] = this.placeid;
    formbody['partyid'] = this.partyid;
    formbody['date'] = data.value.date;
    formbody['type'] = data.value.type;
    formbody['_id'] = this.handledata.Data._id;
    formbody['method'] = 'updateQR';
    formbody['tablename'] = 'qrCode';

    this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
      .subscribe((response: Response) => {
        alert(response['Status']);
        this.sec.commonArray['qr'].forEach((res) => {
          if (res._id == this.handledata.Data._id) {
            res['date'] = data.value.date;
            res['qr'] = data.value.qr;
            res['place'] = this.tempVNAME;
            res['party'] = this.tempPNAME;
            res['type'] = data.value.type;
            res['_id'] = res._id;
          }
        })

        this.show = !this.show;
        this._location.back();
      });
  };


  setPartyName() {
    this.partyid = this.parties[this.myFormGroup.value.partyName.split('+')[1]]._id;
    this.tempPNAME = this.parties[this.myFormGroup.value.partyName.split('+')[1]].name;
    
  }
  setPlaceName() {
    this.placeid = this.villagenamelist[this.myFormGroup.value.dest.split('+')[1]]._id;
    this.tempVNAME = this.villagenamelist[this.myFormGroup.value.dest.split('+')[1]].village_name;
  }
  back() {
    this.show = !this.show;
    this._location.back();
  }

}
