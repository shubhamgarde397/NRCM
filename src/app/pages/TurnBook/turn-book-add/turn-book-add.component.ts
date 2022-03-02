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
  public partyid='5fff37a31f4443d6ec77e078';
  public placeid='5bcdecdab6b821389c8abde0';
  public partyType;
  public method;
  public turnArray = [];
  public truckdetailslist = [];
  public villagelist;
  public trucknoid;
  public villageData = "";
  public trucknoidno;
  public manualTruck = false;
  public trucknoM;
  public turnbookDate;
  public parties;
  constructor(public apiCallservice: ApiCallsService, public handlefunction: handleFunction,
    public http: Http, public formBuilder: FormBuilder, public spinnerService: Ng4LoadingSpinnerService,
    public securityCheck: SecurityCheckService, public obs: ObsServiceService, public handledata: HandleDataService) {
    this.days = this.handlefunction.generateDays();
    this.yearNames = this.securityCheck.yearNames;
  }



  ngOnInit() {
    this.turnbookDate = this.handlefunction.getDate(this.handlefunction.generate2DigitNumber(this.date.getDate()), (this.date.getMonth() + 1), this.date.getFullYear());
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
      trucknoM: ['', [Validators.required]],
      waitLocation:['',[Validators.required]],
      partyName :'',
      place:'',
      partyType:'',
      loadingDate:'',
      parentAccNo:0
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
        this.securityCheck.commonArray['ownerdetails'] = Object.keys(res.ownerdetails[0]).length > 0 ? res.ownerdetails : this.securityCheck.commonArray['ownerdetails'];;
        this.truckdetailslist = this.commonArray.ownerdetails;
        this.villagelist = this.commonArray.villagenames;
        this.parties = this.commonArray.gstdetails;
        this.fetchBasic();
        this.spinnerService.hide();
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

  revert() {
    this.manualTruck = false;
    this.myFormGroup.patchValue({ trucknoM: '' });
    this.trucknoid = '';

  }

  findtruckdetails() {
    let tf = this.trucknoid.split('+')[0] === 'Other' ? true : false;
    if (tf) {
      this.manualTruck = true;
      this.ownerid = '';
      this.method = "insert.new";
    } else {
      this.manualTruck = false;
      this.myFormGroup.patchValue({ trucknoM: this.trucknoid.split('+')[1] })
      this.ownerid = this.trucknoid.split('+')[0];
      this.method = "insert.old";
    }
  }

  storeTurnBookData({ value, valid }: { value: [{}], valid: boolean }) {
    this.submitted = true;
    let tempobj = {};
    tempobj['truckno'] = this.trucknoid.split('+')[0] === 'Other' ? this.trucknoM : this.trucknoid.split('+')[1];
    tempobj['ownerid'] = this.ownerid;
    tempobj['placeid'] = this.placeid;
    tempobj['partyid'] = this.partyid;
    tempobj['partyType'] = value['partyType'];
    tempobj['parentAccNo'] = value['parentAccNo'];
    tempobj['loadingDate'] = value['loadingDate'];
    tempobj['turnbookDate'] = this.turnbookDate;
    tempobj['entryDate'] = this.date.getFullYear() + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getMonth() + 1)) + '-' + this.handlefunction.generate2DigitNumber(String(this.date.getDate()));
    tempobj['tablename'] = 'turnbook';
    tempobj['method'] = this.method;
    tempobj["user"]= "shubham";
    tempobj["typeofuser"]= 1;
    tempobj["lrno"]= 0;
    tempobj["hamt"]= 0;
    tempobj["pochDate"]= "";
    tempobj["invoice"]= "";
    tempobj["pochPayment"]= false;
    tempobj["pgno"]= 999;
    tempobj["paymentid"]= "617114b7baa1bf3b9386a6a9";
    tempobj["input"]= "manual";
    tempobj["waitLocation"]= value['waitLocation'];
    tempobj["complete"]= false;
    tempobj["typeOfLoad"]= value['partyType']==='NR'?'Others':'';
let toAdd=true;
let toAddData;
    let tempObj={};
    let today=new Date();
    let last14Days=new Date(today.getFullYear(), today.getMonth(), today.getDate()-14);
    tempObj['tablename'] = 'turnbook'
    tempObj['method'] = 'displayA14Days'
    tempObj['display'] = '0';
    tempObj['turnbookDate'] = today.getFullYear()+'-'+this.handlefunction.generate2DigitNumber(String(today.getMonth()+1))+'-'+this.handlefunction.generate2DigitNumber(String(today.getDate()));
    tempObj['turnbookDateS14']=last14Days.getFullYear()+'-'+this.handlefunction.generate2DigitNumber(String(last14Days.getMonth()+1))+'-'+this.handlefunction.generate2DigitNumber(String(last14Days.getDate()));
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 1)
      .subscribe((res: any) => {
      toAddData=res.Data.filter(r=>r.truckid===this.ownerid);
      toAdd=toAddData.length>0?true:false;
      if(toAdd){
        alert('Entry Already Present.\nTurnbook Date : '+this.handlefunction.getDateddmmyy(String(toAddData[0].turnbookDate))+'.\nTruck No : '+toAddData[0].truckno+'.\nLoading Date : '+this.handlefunction.getDateddmmyy(String(toAddData[0].loadingDate))+'.\nParty Name : ' +toAddData[0].partyName);
        toAdd=!confirm('Do you still Want to add?');
       }
       if(!toAdd){
      this.submitted = true;
      this.apiCallservice.handleData_New_python('turnbook', 1, tempobj, 1)
        .subscribe((res: any) => {
          if (res.hidden) {
            alert(res.Status);
            var question=confirm('Vehicle present but its hidden, do you want to unhide and add?');
            if(question){
            tempobj['truckno'] = this.trucknoM;
            tempobj['method'] = 'showAndAdd';
            tempobj['show']=true;
            tempobj['find']=true;
            tempobj['tablename'] = 'ownerdetails';
            this.apiCallservice.handleData_New_python('turnbook', 1, tempobj, 1)
            .subscribe((res: any) => {
              alert(res.Status);
              this.securityCheck.commonArray['ownerdetails'].push(res.Data[0]);
              this.manualTruck = false;
          this.myFormGroup.patchValue({ place: '' });
          this.myFormGroup.patchValue({ trucknoM: '' })
          this.villageData = "";
          this.spinnerService.hide();
          this.fetchBasic();
          this.reset();
            })
            }
          }else if(res.empty){
            alert(res.Status);
          }
          else if(!res.hidden){alert(res.Status)}
          else{
            if (this.method === "insert.new") {
              let tempObj1 = {};
              tempObj1['oname'] = "";
              tempObj1['pan'] = "";
              tempObj1['contact'] = [];
              tempObj1['truckno'] = this.trucknoid.split('+')[0] === 'Other' ? this.trucknoM : this.trucknoid.split('+')[1];
              tempObj1['accountDetails'] = [];
              tempObj1['reference'] = "";
              tempObj1['preferences'] = [];
              tempObj1['_id'] = res['_id'].split('+')[1];
              this.securityCheck.commonArray['ownerdetails'].push(tempObj1);
              alert('Inserted Successfully!');
            } else {
              alert('Inserted Successfully!');
            }
          }
          this.manualTruck = false;
          this.myFormGroup.patchValue({ place: '' });
          this.myFormGroup.patchValue({ trucknoM: '' })
          this.villageData = "";
          this.spinnerService.hide();
          this.fetchBasic();
          this.reset();
        });
      }
    });
 
    
  }

  setPartyName() {
    this.partyid = this.parties[this.myFormGroup.value.partyName.split('+')[1]]._id;
    this.myFormGroup.patchValue({parentAccNo:this.parties[this.myFormGroup.value.partyName.split('+')[1]].accNo})
    this.myFormGroup.patchValue({partyType:this.parties[this.myFormGroup.value.partyName.split('+')[1]].partyType})
    this.myFormGroup.value.partyName = this.partyid;
      }
  setPlaceName() {
    this.placeid = this.villagelist[this.myFormGroup.value.place.split('+')[1]]._id;
    this.myFormGroup.value.place = this.placeid;
  }

  findParentAccNo(){
    if(this.myFormGroup.value.partyType==='NRCM'){
      this.myFormGroup.patchValue({
        parentAccNo:12,
      })
    }
    else if(this.myFormGroup.value.partyType==='NR'){
   
        this.myFormGroup.patchValue({
          parentAccNo:363,
        })
   
      
    }
    else{
      this.myFormGroup.patchValue({
        parentAccNo:0,
      })
    }
  }

  reset() {
    this.manualTruck = false;
    this.submitted = false;
    this.myFormGroup.patchValue({ truckNo: '' });
    this.myFormGroup.patchValue({ partyType: '' });
    this.myFormGroup.patchValue({ place: '' });
    this.placeid='5bcdecdab6b821389c8abde0';
    this.partyid='5fff37a31f4443d6ec77e078';
    this.ownerid='';

  }
  delete(data) {
    if (confirm('Are you sure?')) {
      this.turnArray.splice(data, 1);
    }
  }

  back() {
    this.submitted = false;
  }

  leftRight(LR) {
    let tempArray;
    let date;
    switch (LR) {
      case 'back':
        tempArray=this.turnbookDate.split('-');
        date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])-1)
        this.turnbookDate = this.handlefunction.createDate(date);
        break;
      case 'ahead':
        tempArray=this.turnbookDate.split('-');
        date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])+1)
        this.turnbookDate = this.handlefunction.createDate(date);
        break;
    }
  }
}