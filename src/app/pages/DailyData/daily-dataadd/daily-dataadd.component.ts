import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { dailydata } from './dailydata';
import { FormsModule } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-daily-dataadd',
  templateUrl: './daily-dataadd.component.html',
  styleUrls: ['./daily-dataadd.component.css'],
  providers: [ApiCallsService]
})
export class DailyDataaddComponent implements OnInit {
  fullCount: any;
  public myFormGroup: FormGroup;
  public model: dailydata;
  public modelSubmitted: dailydata;
  public submitted = false;
  public response: any;
  public regulartrucklist: any;
  public regularpartylist;
  public villagelist;
  public Date: string;
  public nofp: string;
  public TruckNo: string;
  public hamt: string;
  public Dest: string;
  public OwnerName: string;
  public PAN?: string;
  public advamt: string;
  public togglemenu = true;
  public dbName;
  public commonArray;
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.model = new dailydata();
    this.myFormGroup = this.formBuilder.group({
      Date: [this.model.Date, Validators.required],
      nofp: [this.model.nofp, Validators.required],
      TruckNo: [this.model.TruckNo, Validators.required],
      Dest: [this.model.Dest, Validators.required],
      hamt: [this.model.hamt, Validators.required],
      advamt: [this.model.advamt]
    });
    this.fetchBasic();
  }

  fetchBasic() {
    this.regularpartylist = this.commonArray.regularparty;
    this.regulartrucklist = this.commonArray.RegularTruck;
    this.villagelist = this.commonArray.villagenames;

    this.apiCallservice.handleData_New(this.dbName, 'dailyData/dailyDataCountAll', 1, 0)
      .subscribe((res: Response) => {
        this.fullCount = res;
      });
  }
  storeDailyData({ value, valid }: { value: dailydata, valid: boolean }) {
    this.submitted = true;
    this.apiCallservice.handleData_New(this.dbName, 'dailyData/adddailydata', 1, 0, value)
      .subscribe((x) => {
        this.storeTPTData(value);
        this.apiCallservice.handleData_New(this.dbName, 'dailyData/dailyDataCountAll', 1, 0)
          .subscribe((res: Response) => {
            this.fullCount = res;
            { alert('Data entered Successfully'); }
          });
      });
  }


  storeTPTData(value) {

    const new_value = {
      date: value.Date, nameOfParty: value.nofp, truckNo: value.TruckNo,
      place: value.Dest, hireAmount: value.hamt, advance: value.advamt
    };
    this.apiCallservice.handleData_New(this.dbName, 'TPTHireDetails/addTPTHireDetails', 1, 0, new_value)
      .subscribe((x) => {
      });
  }


  back() {
    this.submitted = !this.submitted;
  }
  toggle() {
    this.togglemenu = !this.togglemenu;
    this.fetchBasic();
  }
}
