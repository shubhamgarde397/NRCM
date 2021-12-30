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

  public regulartrucklist: any;
  public regularpartylist: any;
  public villagelist: any;
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
  public date=new Date();
  public newPayment;
  public partyPayment;
  public partyPaymentValue;
  public paymentid;
  public paymentName;
  public tempPaymentNAME;
  public addtoTB=false;
  public advanceArray=[]
  public qrArray;
  public sum=0;
  public qr;
  public typeToUI='';
  public partyToUI='';
  public qrHit=false;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService, public handlefunction: handleFunction, public router: Router) {
  }

  ngOnInit() {
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
      ohamt: this.handledata.Data.ohamt,
      invoice:this.handledata.Data.invoice,
      balance: 0,
      pochDate: this.handledata.Data.pochDate,
      pgno: this.handledata.Data.pgno,
      complete: this.handledata.Data.complete,
      typeOfLoad: this.handledata.Data.typeOfLoad,
      pochPayment: this.handledata.Data.pochPayment,
      waitLocation:this.handledata.Data.waitLocation,
      partyPayment: this.handledata.Data.payment[0]['_id'],
      paymentName:this.handledata.Data.payment[0]['date']+'_'+this.handledata.Data.payment[0]['amount'],
      advanceAmt:'',
      advanceDate:'',
      reason:'Advance',
      typeOfTransfer:'',
      BHAccname:'',
      BHAccNo:'',
      BHIFSC:'',
      qr:this.handledata.Data.qr
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
      ohamt: this.handledata.Data.ohamt,
      balance: 0,
      invoice:this.handledata.Data.invoice,
      pochDate: this.handledata.Data.pochDate,
      pochPayment: this.handledata.Data.pochPayment,
      pgno: this.handledata.Data.pgno,
      complete: this.handledata.Data.complete,
      entryDate: this.handledata.Data.entryDate,
      waitLocation:this.handledata.Data.waitLocation,
      truckNo: ['', Validators.required],
      qr:this.handledata.Data.qr
    });
    this.place = this.handledata.Data.place;
    this.placeid = this.handledata.Data.placeid;
    this.party = this.handledata.Data.partyName;
    this.partyid = this.handledata.Data.partyid;
    this.paymentid = this.handledata.Data.payment[0]._id;
    this.paymentName=this.handledata.Data.payment[0].date+'_'+this.handledata.Data.payment[0].amount
    this.hireExtendingMoney = this.handlefunction.getMoney();
    this.commonArray = this.securityCheck.commonArray;
    this.updateOption = this.handledata.Data.number;
    this.oldTruckNo = this.handledata.Data.truckno;
    this.advanceArray = this.handledata.Data.advanceArray;
    this.qr=this.handledata.Data.qr;
    this.balance();
    this.paymentid==='617114b7baa1bf3b9386a6a9'?this.fetchPaymentData(this.handledata.Data.loadingDate,this.handledata.Data.partyid):this.myFormGroup.controls.partyPayment.disable();
  }

  addPaymentDetails(){
    let tempObj={}
    tempObj['advanceAmt']=this.myFormGroup.value.advanceAmt;
    tempObj['advanceDate']=this.myFormGroup.value.advanceDate;
    tempObj['reason']=this.myFormGroup.value.reason;
    tempObj['typeOfTransfer']=this.myFormGroup.value.typeOfTransfer;
    tempObj['consider']=true;
    tempObj['BHAccname']=this.myFormGroup.value.BHAccname;
    tempObj['BHAccNo']=this.myFormGroup.value.BHAccNo;
    tempObj['BHIFSC']=this.myFormGroup.value.BHIFSC;
    this.advanceArray.push(tempObj);
    this.balance()
    this.myFormGroup.patchValue({
      BHAccNo:'',
      BHAccname:'',
      BHIFSC:''
       })
  }
  deleteOneA(i, j) {
    if (confirm('Are you sure?')) {
      this.advanceArray.splice(j, 1);
    }
  }

  fetchPaymentData(loadingDate,partyid){
let tempObj={}
tempObj['from']=loadingDate;
tempObj['to']=this.handlefunction.createDate(this.date);
    tempObj['partyid']=[partyid];
    tempObj['method'] = 'displayPP';
    tempObj['tablename'] = 'partyPayment'
    tempObj['display']=3;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.newPayment=res.paymentData;
      });
  }

  findtruckdetails() {
    this.myFormGroup.patchValue({ trucknoM: this.trucknoid.split('+')[1] })
    this.ownerid = this.trucknoid.split('+')[0];
  }
  setPaymentName(){
    this.paymentid = this.newPayment[this.myFormGroup.value.partyPayment.split('+')[1]]._id;
    this.tempPaymentNAME = this.newPayment[this.myFormGroup.value.partyPayment.split('+')[1]].date+'_'+this.newPayment[this.myFormGroup.value.partyPayment.split('+')[1]].amount;
    this.paymentName=this.tempPaymentNAME;
    this.myFormGroup.value.paymentName = this.tempPaymentNAME;
    this.addtoTB=true;
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
    
    this.qrArray=this.qrArray.filter(r=>r.place===this.tempVNAME);
    
  }

  QRDetails(){
    this.typeToUI=this.qrArray.filter(r=>r.qr==parseInt(this.myFormGroup.value.qr))[0].type;
    this.partyToUI=this.qrArray.filter(r=>r.qr==parseInt(this.myFormGroup.value.qr))[0].party;
    this.qrHit=true;
  }

  getInformationData() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.securityCheck.commonArray['qr'] = Object.keys(res.qr[0]).length > 0 ? res.qr : this.securityCheck.commonArray['qr'];;
        this.fetchBasic();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.parties = [];
    this.villagelist = [];
    this.qrArray = [];
    this.truckdetailslist = [];
    this.parties = this.commonArray.gstdetails;
    this.villagelist = this.commonArray.villagenames;
    this.qrArray = this.commonArray.qr;
    this.truckdetailslist = this.commonArray.ownerdetails;
  }


  balance() {
    this.myFormGroup.patchValue({
       balance:
       this.myFormGroup.value.hamt -
         this.getAdvances()
        })
  }

  getAdvances(){
    this.sum=0;
    this.advanceArray.forEach(r=>{
      if(r.consider){
      this.sum = r.advanceAmt + this.sum
      }
    })
    return this.sum===(NaN||undefined)?0:this.sum;
  }

  addAccountDetails(){
    this.myFormGroup.patchValue({
      BHAccNo:this.handledata.Data.accountDetails[0].accountNumber?this.handledata.Data.accountDetails[0].accountNumber:'',
      BHAccname:this.handledata.Data.accountDetails[0].accountName?this.handledata.Data.accountDetails[0].accountName:'',
      BHIFSC:this.handledata.Data.accountDetails[0].ifsc?this.handledata.Data.accountDetails[0].ifsc:''
       })
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
      tempObj["ohamt"] = this.myFormGroup.value.ohamt,
      tempObj["pochDate"] = this.myFormGroup.value.pochDate,
      tempObj["pochPayment"] = this.myFormGroup.value.pochPayment;
      tempObj["pgno"] = this.myFormGroup.value.pgno;
      tempObj["invoice"]=this.myFormGroup.value.invoice;
      tempObj["complete"]=this.myFormGroup.value.complete;
      tempObj["typeOfLoad"]=this.myFormGroup.value.typeOfLoad;
      tempObj["paymentid"] = this.paymentid;//Make changes in backend
      tempObj["waitLocation"]=this.myFormGroup.value.waitLocation;
      tempObj["advanceArray"]=this.advanceArray;
      tempObj["qr"]=parseInt(this.myFormGroup.value.qr);
      tempObj["qrid"]=this.qrHit?(this.myFormGroup.value.qr===0?'61c082b87dcfd6ecb7f02b90':this.qrArray.filter(r=>r.qr==parseInt(this.myFormGroup.value.qr))[0]._id):'61c082b87dcfd6ecb7f02b90';
      this.addtoTB===true?tempObj['addtotbids']=true:false
      if(this.handledata.Data.locations.length===0){
        tempObj["locationDate"]=[this.myFormGroup.value.loadingDate===''?this.handlefunction.createDate(new Date()):this.myFormGroup.value.loadingDate];
        tempObj["locations"]=['5bcdecdab6b821389c8abde0'];
        tempObj['updateTruck']=true;
        tempObj['show']=false;
      }else{
        tempObj["locationDate"]=this.handledata.Data.locationDate;
        tempObj["locations"]=this.handledata.Data.locations;
      }
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
            tempData[this.handledata.Data.index]['partyDetails'][0]['name'] = this.tempPNAME,
            // tempData[this.handledata.Data.index]["ownerid"] = this.handledata.Data.ownerid,//what if we already have entry of thios
            tempData[this.handledata.Data.index]['ownerDetails'][0]['_id'] = this.handledata.Data.ownerid,
            tempData[this.handledata.Data.index]["loadingDate"] = this.myFormGroup.value.loadingDate,
            tempData[this.handledata.Data.index]["lrno"] = this.myFormGroup.value.lrno,
            tempData[this.handledata.Data.index]["partyType"] = this.myFormGroup.value.partyType,
            tempData[this.handledata.Data.index]["hamt"] = this.myFormGroup.value.hamt,
            tempData[this.handledata.Data.index]["ohamt"] = this.myFormGroup.value.ohamt,
            tempData[this.handledata.Data.index]["pochDate"] = this.myFormGroup.value.pochDate,
            tempData[this.handledata.Data.index]["pochPayment"] = this.myFormGroup.value.pochPayment
            tempData[this.handledata.Data.index]["pgno"] = this.myFormGroup.value.pgno
            tempData[this.handledata.Data.index]["paymentid"] = this.paymentid;
            tempData[this.handledata.Data.index]["invoice"] = this.myFormGroup.value.invoice;
            tempData[this.handledata.Data.index]["complete"] = this.myFormGroup.value.complete;
            tempData[this.handledata.Data.index]["typeOfLoad"] = this.myFormGroup.value.typeOfLoad;
            tempData[this.handledata.Data.index]["waitLocation"] = this.myFormGroup.value.waitLocation;
            tempData[this.handledata.Data.index]["advanceArray"] = this.advanceArray;
            tempData[this.handledata.Data.index]["qr"] = this.myFormGroup.value.qr;
          this.handledata.saveTurn([]);
          let tempArray = []
          tempArray = tempData;
          // tempArray.splice(this.handledata.Data.index, 1)
          this.handledata.saveTurn(tempArray);
          if(parseInt(this.myFormGroup.value.qr)!==0){
            this.securityCheck.commonArray['qr']=this.securityCheck.commonArray['qr'].filter(r=>{return r.qr!=parseInt(this.myFormGroup.value.qr)});
          }
        }
        this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookDispHandler']);
      });

  };

  change2 = function (data) {
    let tempObj = {};
    tempObj['ownerid'] = data.value.truckNo.split('+')[0];
    tempObj['turnbookDate'] = data.value.turnbookDate;
    tempObj['method'] = 'update';
    tempObj['part'] = 3;//imp
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
            tempData[this.handledata.Data.index]["ohamt"] = this.myFormGroup.value.ohamt,
            tempData[this.handledata.Data.index]["pochDate"] = this.myFormGroup.value.pochDate,
            tempData[this.handledata.Data.index]["pochPayment"] = this.myFormGroup.value.pochPayment
            tempData[this.handledata.Data.index]["pgno"] = this.myFormGroup.value.pgno
            tempData[this.handledata.Data.index]["invoice"] = this.myFormGroup.value.invoice
            tempData[this.handledata.Data.index]["complete"] = this.myFormGroup.value.complete
            tempData[this.handledata.Data.index]["typeOfLoad"] = this.myFormGroup.value.typeOfLoad
            tempData[this.handledata.Data.index]["waitLocation"] = this.myFormGroup.value.waitLocation
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
