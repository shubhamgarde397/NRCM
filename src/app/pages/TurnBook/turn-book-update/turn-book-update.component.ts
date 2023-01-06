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
  public place2;
  public considerArray = [];
  public placeid;
  public placeid2;
  public partyid;
  public tempVNAME;
  public tempVNAME2;
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
  public sum=0;
  public typeToUI='';
  public partyToUI='';
  public paymentDisabled=true;
  public Loadarr=[];
  public retHireAmt;
  public retTruckAmt;
  constructor(
    public handledata: HandleDataService,
    public _location: Location,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService, public handlefunction: handleFunction, public router: Router) {
  }

  ngOnInit() {
    this.paymentDisabled=this.handledata.Data.paymentDisabled;
    this.commonArray = this.securityCheck.commonArray;
    this.considerArray = this.handledata.createConsiderArray('turnbookadd')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.myFormGroup = this.formBuilder.group({
      turnbookDate: this.handledata.Data.turnbookDate,
      truckno: this.handledata.Data.truckno,
      place: this.handledata.Data.place,
      place2: this.handledata.Data.place2,
      partyName: this.handledata.Data.partyName,
      loadingDate: this.handledata.Data.loadingDate,
      lrno: this.handledata.Data.lrno,
      partyType: this.handledata.Data.partyType,
      hamt: this.handledata.Data.hamt,
      rent: this.handledata.Data.rent,
      invoice:this.handledata.Data.invoice,
      balance: 0,
      pochDate: this.handledata.Data.pochDate,
      pgno: this.handledata.Data.pgno,
      complete: this.handledata.Data.complete,
      typeOfLoad: this.handledata.Data.typeOfLoad,
      pochPayment: this.handledata.Data.pochPayment,
      waitLocation:this.handledata.Data.waitLocation,
      givenDate:this.handledata.Data.givenDate,
      partyPayment: this.handledata.Data.payment[0]['_id'],
      paymentName:this.handledata.Data.payment[0]['date']+'_'+this.handledata.Data.payment[0]['amount'],
      advanceAmt:'',
      advanceDate:'',
      parentAccNo:this.handledata.Data.parentAccNo,
      reason:'Advance',
      typeOfTransfer:'',
      BHAccname:'',
      BHAccNo:'',
      BHIFSC:'',
      pochAmount:this.handledata.Data.pochAmount
    });
    this.myFormGroup1 = this.formBuilder.group({
      turnbookDate: this.handledata.Data.turnbookDate,
      truckno: this.handledata.Data.truckno,
      place: this.handledata.Data.place,
      place2: this.handledata.Data.place2,
      partyName: this.handledata.Data.partyName,
      loadingDate: this.handledata.Data.loadingDate,
      lrno: this.handledata.Data.lrno,
      partyType: this.handledata.Data.partyType,
      hamt: this.handledata.Data.hamt,
      rent: this.handledata.Data.rent,
      balance: 0,
      parentAccNo:this.handledata.Data.parentAccNo,
      invoice:this.handledata.Data.invoice,
      pochDate: this.handledata.Data.pochDate,
      pochPayment: this.handledata.Data.pochPayment,
      givenDate:this.handledata.Data.givenDate,
      pgno: this.handledata.Data.pgno,
      complete: this.handledata.Data.complete,
      entryDate: this.handledata.Data.entryDate,
      waitLocation:this.handledata.Data.waitLocation,
      truckNo: ['', Validators.required],
      pochAmount:this.handledata.Data.pochAmount
    });
    this.place = this.handledata.Data.place;
    this.place2 = this.handledata.Data.place2;
    this.placeid = this.handledata.Data.placeid;
    this.placeid2 = this.handledata.Data.placeid2;
    this.party = this.handledata.Data.partyName;
    this.partyid = this.handledata.Data.partyid;
    this.paymentid = this.handledata.Data.payment[0]._id;
    this.paymentName=this.handledata.Data.payment[0].date+'_'+this.handledata.Data.payment[0].amount
    this.hireExtendingMoney = this.handlefunction.getMoney();
    this.commonArray = this.securityCheck.commonArray;
    this.updateOption = this.handledata.Data.number;
    this.oldTruckNo = this.handledata.Data.truckno;
    this.advanceArray = this.handledata.Data.advanceArray;
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
    let partyDetails=this.parties[this.myFormGroup.value.partyName.split('+')[1]]
    this.Loadarr=[]
    for(let i=0;i<Object.keys(partyDetails.load).length;i++){
    let temp={}
        temp['loadSingle']=Object.keys(partyDetails.load)[i]
        temp['loadAmount']=Object.values(partyDetails.load)[i]
        // temp['rentAmount']=Object.values(partyDetails.load)[i]
        this.Loadarr.push(temp)
    }

    this.Loadarr=[]
for(let i=0;i<partyDetails.load.length;i++){
  let temp={}
    temp['loadSingle']=Object.keys(partyDetails.load[i])[0]
    temp['loadHire']=Object.values(partyDetails.load[i])[0]['Hire']
    temp['loadAdvance']=Object.values(partyDetails.load[i])[0]['Advance']
    this.Loadarr.push(temp)
  }
    this.partyid = this.parties[this.myFormGroup.value.partyName.split('+')[1]]._id;
    this.tempPNAME = this.parties[this.myFormGroup.value.partyName.split('+')[1]].name;
    this.myFormGroup.value.partyName = this.tempPNAME;
  }
  setPlaceName() {
    this.placeid = this.villagelist[this.myFormGroup.value.place.split('+')[1]]._id;
    this.tempVNAME = this.villagelist[this.myFormGroup.value.place.split('+')[1]].village_name;
    this.myFormGroup.value.place = this.tempVNAME;
  }

  setPlaceName2() {
    this.placeid2 = this.villagelist[this.myFormGroup.value.place2.split('+')[1]]._id;
    this.tempVNAME2 = this.villagelist[this.myFormGroup.value.place2.split('+')[1]].village_name;
    this.myFormGroup.value.place2 = this.tempVNAME2;
  }

  getInformationData() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.securityCheck.commonArray['ownerdetails'] = Object.keys(res.ownerdetails[0]).length > 0 ? res.ownerdetails : this.securityCheck.commonArray['ownerdetails'];
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
    else if(this.myFormGroup.value.partyType==='SNL'){
   
      this.myFormGroup.patchValue({
        parentAccNo:65,
      })
 
    
  }
    else{
      this.myFormGroup.patchValue({
        parentAccNo:0,
      })
    }
    this.parties = this.commonArray.gstdetails;
    this.parties=this.parties.filter(r=>r.partyType==this.myFormGroup.value.partyType)

  }

  infoFromtypeOfLoad(){
    let typeOfLoad;
    typeOfLoad=this.myFormGroup.value.typeOfLoad.split('+');
    this.typeToUI=this.myFormGroup.value.typeOfLoad.split('+')[0]
    this.myFormGroup.patchValue({
      typeOfLoad:typeOfLoad[0],
      hamt:typeOfLoad[1],
      rent:typeOfLoad[2]
    })
  }

  change = function (data) {
    let tempObj = {};
    tempObj["turnbookDate"] = this.handledata.Data.turnbookDate,
      tempObj["entryDate"] = this.handledata.Data.entryDate,
      tempObj['method'] = 'update';
    tempObj['tablename'] = 'turnbook';
    tempObj["placeid"] = this.placeid,//what if we already have entry of thios
    tempObj["placeid2"] = this.placeid2,//what if we already have entry of thios
      tempObj["partyid"] = this.partyid,//what if we already have entry of thios
      tempObj["ownerid"] = this.handledata.Data.ownerid,//what if we already have entry of thios
      tempObj['_id'] = this.handledata.Data._id;
    tempObj["loadingDate"] = this.myFormGroup.value.loadingDate,
      tempObj["lrno"] = this.myFormGroup.value.lrno,
      tempObj["partyType"] = this.myFormGroup.value.partyType,
      tempObj["hamt"] = this.myFormGroup.value.hamt,
      tempObj["parentAccNo"] = this.myFormGroup.value.parentAccNo,
      tempObj["rent"] = this.myFormGroup.value.rent,
      tempObj["pochDate"] = this.myFormGroup.value.pochDate,
      tempObj["givenDate"] = this.myFormGroup.value.givenDate,
      tempObj["pochPayment"] = this.myFormGroup.value.pochPayment;
      tempObj["pgno"] = this.myFormGroup.value.pgno;
      tempObj["invoice"]=this.myFormGroup.value.invoice;
      tempObj["complete"]=this.myFormGroup.value.complete;
      tempObj["typeOfLoad"]=this.myFormGroup.value.typeOfLoad;
      tempObj["paymentid"] = this.paymentid;//Make changes in backend
      tempObj["waitLocation"]=this.myFormGroup.value.waitLocation;
      tempObj["advanceArray"]=this.advanceArray;
      tempObj["pochAmount"]=parseInt(this.myFormGroup.value.pochAmount)===null?0:parseInt(this.myFormGroup.value.pochAmount);
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
          if(this.handledata.updateTurn()){
          let tempPlace2Object;
          tempData[this.handledata.Data.index]["turnbookDate"] = this.handledata.Data.turnbookDate,
            tempData[this.handledata.Data.index]["entryDate"] = this.handledata.Data.entryDate,
            tempData[this.handledata.Data.index]['villageDetails'][0]['_id'] = this.placeid,
            tempPlace2Object=tempData[this.handledata.Data.index]['villageDetails2'].length===0?this.giveVillage2Object():tempData[this.handledata.Data.index]['villageDetails2'];
            tempPlace2Object[0]['_id'] = this.placeid2,
            tempData[this.handledata.Data.index]['villageDetails'][0]['village_name'] = this.tempVNAME,
            tempPlace2Object[0]['village_name'] = this.tempVNAME2,
            tempData[this.handledata.Data.index]['villageDetails2']=tempPlace2Object;
            tempData[this.handledata.Data.index]['partyDetails'][0]['_id'] = this.partyid,
            tempData[this.handledata.Data.index]['partyDetails'][0]['name'] = this.tempPNAME,
            tempData[this.handledata.Data.index]['ownerDetails'][0]['_id'] = this.handledata.Data.ownerid,
            tempData[this.handledata.Data.index]["loadingDate"] = this.myFormGroup.value.loadingDate,
            tempData[this.handledata.Data.index]["lrno"] = this.myFormGroup.value.lrno,
            tempData[this.handledata.Data.index]["partyType"] = this.myFormGroup.value.partyType,
            tempData[this.handledata.Data.index]["hamt"] = this.myFormGroup.value.hamt,
            tempData[this.handledata.Data.index]["rent"] = this.myFormGroup.value.rent,
            tempData[this.handledata.Data.index]["pochDate"] = this.myFormGroup.value.pochDate,
            tempData[this.handledata.Data.index]["givenDate"] = this.myFormGroup.value.givenDate,
            tempData[this.handledata.Data.index]["pochPayment"] = this.myFormGroup.value.pochPayment
            tempData[this.handledata.Data.index]["pgno"] = this.myFormGroup.value.pgno
            tempData[this.handledata.Data.index]["paymentid"] = this.paymentid;
            tempData[this.handledata.Data.index]["invoice"] = this.myFormGroup.value.invoice;
            tempData[this.handledata.Data.index]["complete"] = this.myFormGroup.value.complete;
            tempData[this.handledata.Data.index]["typeOfLoad"] = this.myFormGroup.value.typeOfLoad;
            tempData[this.handledata.Data.index]["waitLocation"] = this.myFormGroup.value.waitLocation;
            tempData[this.handledata.Data.index]["advanceArray"] = this.advanceArray;
            tempData[this.handledata.Data.index]["pochAmount"] = this.myFormGroup.value.pochAmount;
          this.handledata.saveTurn([]);
          let tempArray = []
          tempArray = tempData;
          this.handledata.saveTurn(tempArray);
        }


        }
        this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookDispHandler']);
      });

  };

  giveVillage2Object(){
    return [{
      village_name:'',
      _id:'',
    }]
  }

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
            tempData[this.handledata.Data.index]['ownerDetails'][0]['_id'] = data.value.truckNo.split('+')[0],
            tempData[this.handledata.Data.index]['ownerDetails'][0]['truckno'] = data.value.truckNo.split('+')[1],
          this.handledata.saveTurn([]);
          let tempArray = []
          tempArray = tempData;
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
