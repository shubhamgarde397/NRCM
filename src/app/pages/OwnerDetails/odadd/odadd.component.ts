import { Component, OnInit } from '@angular/core';
import { odata } from './odata';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder, PatternValidator } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-odadd',
  templateUrl: './odadd.component.html',
  styleUrls: ['./odadd.component.css'],
  providers: [ApiCallsService]
})
export class OdaddComponent implements OnInit {
  public mobilenoauto;
  public myFormGroup: FormGroup;
  public model: odata; // mapped it to a variable
  public modelSubmitted: odata;
  public submitted = false;
  public response: any;
  public TruckNo: string; // declared 3 variables
  public Name: string;
  public Pan: string;
  public MobileNo: string;

  public filePath = ''
  public fileFormData = new FormData();
  selectedFile = null;
  public commonArray;
  public considerArray;

  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public handledata: HandleDataService, public formBuilder: FormBuilder, public securityCheck: SecurityCheckService) { }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infoowner')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : null;
    this.model = new odata(this.TruckNo, this.Name, this.Pan, this.MobileNo);
    this.myFormGroup = this.formBuilder.group({
      truckno: [this.model.TruckNo, [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[ ]{0,1}[A-Z]{0,2}[ ][0-9]{4}')]],
      oname: [this.model.OwnerName,],
      pan: [this.model.PAN],
      mobileno: ['9999999999']
    });
  }
  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['ownerdetails'] = Object.keys(res.ownerdetails[0]).length > 0 ? res.ownerdetails : this.securityCheck.commonArray['ownerdetails'];;
        this.spinnerService.hide();
      });
  }

  storeOwnerDetailsData({ value, valid }: { value: odata, valid: boolean }) {
    this.submitted = true;
    value['method'] = 'insert';
    value['tablename'] = 'ownerdetails';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, value, 0)
      .subscribe((res: any) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['ownerdetails'].push(res);
      });
  }

  back() {
    this.submitted = false;
  }

  appendContact() {
    this.mobilenoauto = '9999999999';
  }
  incomingFile(file) {

    this.selectedFile = file.target.files[0]
    if (file) {
      this.fileFormData.append('name', file.target.files[0]);
    }
  }
  upload() {
    this.fileFormData.append('name', this.filePath);
    this.apiCallservice.handleImage(this.fileFormData, 'ownerDetails/bulkAdd')
      .subscribe((res) => {
        alert('Added Successfully');
        this.securityCheck.commonArray['ownerdetails'] = [];
        // this.securityCheck.commonArray['ownerdetails'] = res;
        this.fileFormData = new FormData();
      }, err => {
        console.log(err);
      })
  }
}
