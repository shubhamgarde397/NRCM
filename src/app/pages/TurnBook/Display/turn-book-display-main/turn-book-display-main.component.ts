import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'jspdf-autotable';
import * as  jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-turn-book-display-main',
  templateUrl: './turn-book-display-main.component.html',
  styleUrls: ['./turn-book-display-main.component.css'],
  providers: [ApiCallsService]
})
export class TurnBookDisplayMainComponent implements OnInit {
  public place;
    public place2;
    public adminAmount=false;
    public placeid;
    public placeid2;
    public party;
    public partyType;
    public partyid;
      public showbuttonOption8211=false;
  public showbuttonOption82111=false;
public showbuttonOption821HA=true;
  public isAvailable=false;
  public indexBig;
  public showEditOtherDiv=false;
  public loadingDateDynamic;
  public showbuttonOption8 = false;
  public showbuttonOption82 = false;
  public showbuttonOption821 = false;
  public data: any;
  public show = false;
  public tabledata: false;
  public today;
  public packetNo=0;
  public todaysDate;
  public name: string;
  public dbName = 1;
  public commonArray;
  public date = new Date();
  public partyVar19='';
  public turnbooklist: any;
  public dateFromUI;
  public buttonValue: any = '';
  public buttonOption = '1';
  public trucknoid;
  public lrnos=[];
  public dynDate;
  public dynDate2;
  public dataTruck;
  public adminAccess = false;
  public trucklist;
  public dateFilter;
  public truckFilter;
  public truckFilter2;
  public dateFilterB = true;
  public truckFilterB = false;
  public turnbooklistnew = [];
  public tableSelected=false; 
  public sum=0;
  public advanceArray=[];
  public displayoptionsarray=[
    0,0,0,0,0
  ]
  public addis19=true;
  public tons=[];
  public displayoptions = [
    { 'value': '3', 'viewvalue': 'Truck Dispatched' ,'disabled':false},
    { 'value': '8', 'viewvalue': 'Monthly By Series' ,'disabled':false},
    { 'value': '13', 'viewvalue': 'LRNO' ,'disabled':false},
    { 'value': '18', 'viewvalue': 'Party Amount' ,'disabled':false},
    { 'value': '19', 'viewvalue': 'Packet' ,'disabled':false},
  ]
  // 18
  public lrStarter=0;
  public inProgress=true;
  public showbuttonOption18=false;
  public partyVar8='';
  public turn18;
  public turn18show;
  public index;
  public oldIndex;
  public bigData;
  public partyVar18;
  // 18
  public changeText=false;
  public trucknoid11;
  public years = []
  public buttons = []
  public balanceHireArrray = [];
  public tempPlaceid='';
  public tempArray = [];
  public finalObject = {};
  public finalArray = [];
  public tempObj = {};
  public saveToCheckArrayBoolean = true;
  public finalCheckDone = true;
  public pageno;
  public gAD;
  public trucks=[];
  public ids = [];
  public partyTypes=[];
  public pochDiv = true;
  public selectedMonth;
  public selectedYear;
  public selectedmy;
  public turnbooklist_trucks = [];
  public myFormGroup: FormGroup;
  public myFormGroupTB : FormGroup;
  public showbuttonOption19=false;
  public myFormGroup9: FormGroup;
  public myFormGroup1 : FormGroup;
  public considerArray;
  public villagelist: any;
  public parties: any;
  public tempVNAME;
  public tempPNAME;
  public toSendid;
  public show8Msg = "";
  public selectpartyType;
  public partyVar;
  public truckVar;
  public truckid;
  public byTruckName=false;
  public byInvoice;
  public bylrno;
  public turn11;
  public oids=[];
  public showprdfP=false;
  public truckSelected=false;
  public amountShow;
  public tempDate;
  public comment='';
  public buttonOptionPartyType;
public monthlybyseriesData={'place':'','typeOfLoad':'','weight':'','party':'','lrno':'','place2':''}
public monthlybyseriesDataU={'place':'','party':'','pochAmount':0}
public performActionButton='2';
public selectDate=false;
public reportPDF=false;
public turn12;
public fdate;
public tdate;
public buttonOptionVehicleType='';
public changeTextA=false;

public paymentDate='';
public paymentAmount=0;
public statusOfPoch='';
public updateTruck:any={'truckName':{'truckno':''}};
public updateTruckTB:any={'truckno':''};
public nrcmid;
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handleData: HandleDataService, public handleF: handleFunction,
    public securityCheck: SecurityCheckService, public formBuilder: FormBuilder,) {if(!this.securityCheck.login){
      this.router.navigate([''])
    }
  }

  ngOnInit() {
    this.considerArray = this.handleData.createConsiderArray('turnbookadd')
    this.handleData.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.buttons=this.getButtons()
    this.commonArray = this.securityCheck.commonArray;
    this.todaysDate = this.handleF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    this.turnbooklist = [];
    this.turnbooklist = this.handleData.giveTurn(); 
    this.nrcmid=this.securityCheck.nrcmid;
    this.tableSelected=this.turnbooklist.length>0?true:false;
    this.tabsetter();
    this.getTrucks();
    this.myFormGroupTB = this.formBuilder.group({
      truckno: '',
      place: '',
      place2: '',
      partyName: '',
      loadingDate: '',
      partyType: '',
    });
    this.myFormGroup9 = this.formBuilder.group({
      lrno:0
    })
  }


  tabsetter(){
    // this is for anil
    switch (this.nrcmid) {
      case 1:
        this.displayoptionsarray=[
          1,1,1,1,1]
        break;
        case 7:
          this.displayoptionsarray=[
            0,0,0,0,1]
        break;
    
      default:
        break;
    }

    
    
    this.setTabData(this.displayoptionsarray);
      }

      sendToSetMain(i){
        let temp={
          "lrnos":this.lrnos,
          "tablename":"",
          "method":"lrtoparty",
          "partyid":this.partyVar19
        }
    
        this.apiCallservice.handleData_New_python('turnbook', 1, temp, true)
        .subscribe((res: any) => {
          alert(res.Status);
          this.myFormGroup9.patchValue({'lrno':''});
          this.lrnos=[];
        })  
      }

      addlrno(data){
        this.lrnos.push(parseInt(String(data.value.lrno)));
        this.myFormGroup9.patchValue({'lrno':0})
      }

      delLR(index){
        if (confirm('Are you sure?')) {

          this.lrnos.splice(index,1);
          
      }
    }

      findPackets(){
        let tempObj1={};
        tempObj1['tablename'] = ''
        tempObj1['method'] = 'lrtopartyAnilDisplay'
          this.apiCallservice.handleData_New_python('turnbook', 1, tempObj1, true)
          .subscribe((res: any) => {
            this.turnbooklist = res.Data;
          });
      }
    
      setTabData(data){
       for(let i =0;i<data.length;i++){
        this.displayoptions[i]['disabled']=data[i]===0?true:false
    }
     
      
      }

  submitAmt(){
    let arr=[]
    let obj={}
    for(let j=0;j<this.turn18.length;j++){
      if(parseInt((<HTMLInputElement>document.getElementById('hamt_'+j)).value)!==0){
        obj['id']=this.turn18[j]['_id'];
        obj['amt']=parseInt((<HTMLInputElement>document.getElementById('hamt_'+j)).value)
        obj['weight']=parseInt((<HTMLInputElement>document.getElementById('weight_'+j)).value)
        arr.push(obj)
        obj={};
      }
    }
    let tempObj={}
    tempObj['method']='turn18amt';
    tempObj['tablename']='';
    tempObj['data']=arr;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status)
      });
  }

  aF(){ // remove by entry by partyid from turn18
    let arr=this.turn18show;

    while(arr.length--){
      if (arr[arr.length] && arr[arr.length].hasOwnProperty('partyid') && (arguments.length > 2 && arr[arr.length]['partyid'] === (this.handleF.findgst(this.partyVar18, this.parties))['_id'] ) )
      {
        arr.splice(arr.length,1);
      }}
    return arr;
}

  changeTextAF(){
    this.changeTextA=!this.changeTextA;
  }




  getInformationData() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];
        this.fetchBasic();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.parties = [];
    this.trucks=[]
    this.villagelist = [];
    this.parties = this.commonArray.gstdetails;
    this.trucks = this.commonArray.ownerdetails;
    this.villagelist = this.commonArray.villagenames;
  }


  getButtons() {
let buttons=[]
    for (let i = 0; i < new Date().getFullYear() - 2019; i++) {
      this.years.push(i + 2020)
    }
    for (let i = 0; i < this.years.length; i++) {
      let months = new Date().getFullYear() - this.years[i] == 0 ? new Date().getMonth() + 1 : 12;
      for (let j = 0; j < months; j++) {
        let date = new Date(String(i + 2020) + '-' + this.handleF.generate2DigitNumber(String(j + 1)) + '-01');
        let month = date.toLocaleString('default', { month: 'short' });
        this.tempObj['value'] = "^" + String(i + 2020) + "-" + this.handleF.generate2DigitNumber(String(j + 1)) + ".*";
        this.tempObj['viewValue'] = month + '-' + String(i + 2020).slice(-2);
        buttons.push(this.tempObj);
        this.tempObj = {}
      }
    }
    return buttons.reverse();
  }
  
  getAdminAccess() {
    this.adminAccess = !this.adminAccess;
  }

  findgst() {
    this.partyid = this.handleF.findgst(this.partyVar, this.parties);
  }
  findgst18() {
    this.turn18=this.turn18show;
     this.turn18=this.turn18.filter(r=>{return r.partyid===(this.handleF.findgst(this.partyVar18, this.parties))['_id']})
  }

  findgst8(){
     this.myFormGroup1.patchValue({partyid:this.myFormGroup1.value.partyid})
  }

  findvillage8(data){
    switch(data){
      case 1:
      this.myFormGroup1.patchValue({placeid:this.myFormGroup1.value.placeid});
      break;
      case 2:
      this.myFormGroup1.patchValue({placeid2:this.myFormGroup1.value.placeid2})
      break;
    }
    console.log(this.myFormGroup1);
    
 }

  findtruck() {
    this.truckid = this.handleF.findowner(this.truckVar, this.trucks,'Select Truck No');
  }

  findOption() {

    this.pochDiv = true;
    this.buttonOption =this.displayoptions[parseInt(this.trucknoid) ].value;
    this.buttonValue = this.displayoptions[parseInt(this.trucknoid) ].viewvalue;
    this.tableSelected=false;
  }

  findBillNo(){//only for data from 1st april 2021 and loading data is empty
    let tempObj = {};
    this.byTruckName=false;
    tempObj['lrno']=this.bylrno;
    tempObj['tablename'] = 'turnbook'
    tempObj['method'] = 'displayTBBill'
    tempObj['display'] = '20'
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, true)
      .subscribe((res: any) => {
        this.tableSelected=true;
        this.turnbooklist=res.Data;
      });

  };
  admin(){
    this.adminAmount=true;
  }

  changeAmt(data,i){
alert('Changing value from '+i[data]+' to ___');
var a= prompt('Enter new value of '+data);
    if(parseInt(a)>0){
let tempObj = {};
    this.byTruckName=false;
    tempObj['hrpValue']=parseInt(a);
    tempObj['hrpName']=data;
    tempObj['tablename'] = ''
    tempObj['_id'] = i._id;
    tempObj['method'] = 'changehrp'
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
      });
    }else{
      alert('Wrong Amount')
    }
  }

  find = function (data = null) {//only for data from 1st april 2021 and loading data is empty
    let tempObj = {};
    this.byTruckName=false;
    this.parties = this.commonArray.gstdetails;
    switch (this.buttonOption) {
      case '3':
        tempObj['turnbookDate'] = this.dynDate;
        break;
      case '8':
        tempObj['date'] = this.selectedmy;
        tempObj['partyType']=this.buttonOptionPartyType;
        break;
        case '18':
        tempObj['date'] = this.selectedmy;
        tempObj['partyType']=this.buttonOptionPartyType;
        tempObj['partyid']=this.partyVar18;
        break;
        case '13':
          tempObj['lrno']=this.bylrno;
        break;
        case '19':
          this.showbuttonOption19=true;
        break;
    }
    if (this.buttonOption !== '8') {
      this.showbuttonOption8 = false;
    }
    if(this.buttonOption !== '18'){
      this.showbuttonOption8 = false;
      this.showbuttonOption18 = true;
    }

    tempObj['tablename'] = 'turnbook'
    tempObj['method'] = 'displayTB'
    tempObj['display'] = this.displayoptions[parseInt(this.trucknoid) ].value;

    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, true)
      .subscribe((res: any) => {
        if(this.buttonOption!=='8'&&this.buttonOption!=='18'){
        this.types={'None':0,'Open':0,'Container':0}
        this.Locationtypes={'None':0,'Shivapur':0,'Dhaba':0}
        res.Data.forEach(r=>{
          this.types[r.ownerDetails[0].typeOfVehicle]=this.types[r.ownerDetails[0].typeOfVehicle]+1;
          this.Locationtypes[r.waitLocation]=this.Locationtypes[r.waitLocation]+1;
          r['typeOfVehiclefirst']=r.ownerDetails[0].typeOfVehicle.slice(0,1)
          });
        }
        if (this.buttonOption == '8') {
          if (res.Data.length > 0) {
            this.showbuttonOption8 = true;
            this.turnbooklistnew = res.Data;
            this.myFormGroup1 = this.formBuilder.group({
              loadingDateDynamic: '',
              typeOfLoad:'',
              turnbookDate: '',
              truckno: '',
              loadingDate: '',
              lrno: 0,
              partyid:'',
              placeid:'',
              placeid2:'',
              weight:0
            });
            if(this.buttonOptionPartyType==='NRCM'){
              this.showbuttonOption821HA=false;
              this.showbuttonOption8211=true;
              this.typeofloads=['Pipe','Fittings']
            }else{
                
                  this.typeofloads=['Others']
                
              this.showbuttonOption821HA=true;
              this.showbuttonOption8211=false;
            }
          } else {
            this.showbuttonOption8 = false;
            this.show8Msg = "All set for this month.";
          }
          this.parties = this.parties.filter(r=>{return r.partyType===this.buttonOptionPartyType})
        }
        else if (this.buttonOption == '18') {
          this.parties = this.parties.filter(r=>{return r.partyType===this.buttonOptionPartyType})
          if (res.Data.length > 0) {
            this.showbuttonOption18 = true;
            this.turn18 = res.Data;
            this.turn18show=res.Data;
          } else {
            this.showbuttonOption18 = false;
            this.show18Msg = "All set for this month.";
          }
        }
        else {
          this.turnbooklist = res.Data;
          this.isAvailable=true;
          this.handleData.saveTurn(this.turnbooklist);
          this.tableSelected=true;
        }
      });
  };

  checkTON(){
    this.tons=this.myFormGroup1.value.typeOfLoad==='Pipe'?['0','8','10','T']:['0','6','SXL-32','MXL-32'];
  }

  clearData(i,j){
    if(confirm('Do you want to clear the payment?')){
    let tempObj1={};
    tempObj1['tablename'] = ''
    tempObj1['method'] = 'uncheckActualPayment'
    tempObj1['_id']=i._id;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
      .subscribe((res: any) => {
        alert(res.Status);
      });
    }
  }
  
  clearBalanceAdd(i,j){
    if(confirm('Do you want to Uncheck Balance Add?')){
    let tempObj1={};
    tempObj1['tablename'] = ''
    tempObj1['method'] = 'uncheckBalanceAdded'
    tempObj1['_id']=i._id;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
      .subscribe((res: any) => {
        alert(res.Status);
      });
    }
  }

  getpdfcomplex(){
    this.selectDate=!this.selectDate;
    this.byTruckName=!this.byTruckName;
  }

  
  find11UniqueTruck(){
    if(this.trucknoid11!=='Default'){
      this.selectDate=false;
      this.byTruckName=true;
    this.turn11=this.turnbooklist.filter(r=>{return r.truckName.truckno==this.trucknoid11});
    this.showprdfP=true;
    this.turn11.forEach(r=>{
      let ad=r.advanceArray
      for(let i=0;i<ad.length;i++){
          if(ad[i]['reason']==='Balance'){
              r['BHamt']=ad[i]['advanceAmt']
              r['BHAccNo']=ad[i]['BHAccNo']
              r['BHAccName']=ad[i]['BHAccname']
          }
      }
  })
    
    }
  }

  getOtherDetails() {
    this.showbuttonOption82 = true;
    this.turnbooklist_trucks = this.turnbooklistnew.filter(r => r.loadingDate == this.myFormGroup1.value.loadingDateDynamic)
  }
  getOtherDetails2() {
    this.tempDate = this.turnbooklist_trucks.filter(r => r.truckno == this.myFormGroup1.value.truckno);
    
    this.monthlybyseriesData['typeOfLoad']=this.tempDate[0].typeOfLoad;
    this.monthlybyseriesData['weight']=this.tempDate[0].weight;
    this.monthlybyseriesData['lrno']=this.tempDate[0].lrno;
    this.monthlybyseriesData['party']=this.tempDate[0].party['name'];
    this.monthlybyseriesData['place']=this.tempDate[0].place['village_name'];
    this.monthlybyseriesData['place2']=this.tempDate[0].place2?this.tempDate[0].place2['village_name']:'';

    this.placeid=this.tempDate[0]['place']['_id'];
    this.placeid2=this.tempDate[0]['place2']?this.tempDate[0]['place2']['_id']:'';
    this.tempPlaceid=this.tempDate[0]['place2']?this.tempDate[0]['place2']['_id']:'';
    this.partyid=this.tempDate[0]['party']['_id'];

    this.toSendid = this.tempDate[0]._id;
    this.showbuttonOption821 = true;
    this.myFormGroup1.patchValue({ turnbookDate: this.tempDate[0]['turnbookDate'] })
    this.myFormGroup1.patchValue({ place: this.tempDate[0][''] })
    this.myFormGroup1.patchValue({ place2: this.tempDate[0][''] })
    this.myFormGroup1.patchValue({ partyName: this.tempDate[0][''] })
    this.myFormGroup1.patchValue({ lrno: this.tempDate[0]['lrno'] })
  }


  getOtherDetailsU() {
    this.showbuttonOption82 = true;
    this.turnbooklist_trucks = this.turnbooklistnew.filter(r => r.loadingDate == this.myFormGroup.value.loadingDateDynamic)
  }
  getOtherDetails2U() {
    this.tempDate = this.turnbooklist_trucks.filter(r => r.truckno == this.myFormGroup.value.truckno);
    this.monthlybyseriesDataU['party']='United Cargo';
    this.monthlybyseriesDataU['place']=this.tempDate[0].place['village_name'];

this.placeid=this.tempDate[0]['place']['_id']

    this.toSendid = this.tempDate[0]._id;
    this.showbuttonOption821 = true;
    this.myFormGroup.patchValue({ turnbookDate: this.tempDate[0]['turnbookDate'] })
    this.myFormGroup.patchValue({ place: this.tempDate[0][''] })
  }


  setPlaceName() {
    let filteredList=this.villagelist.filter(r=>{return r.village_name==this.myFormGroup.value.place})
    this.placeid= filteredList[0]['_id']
    this.tempVNAME = filteredList[0]['village_name']
    this.myFormGroup.value.place = this.tempVNAME

  }

  setPartyName() {
    this.partyid = this.parties[this.myFormGroupTB.value.partyName.split('+')[1]]._id;
    this.tempPNAME = this.parties[this.myFormGroupTB.value.partyName.split('+')[1]].name;
    this.myFormGroupTB.value.partyName = this.tempPNAME;
    this.villagelist=this.parties.filter(r=>r['_id']==this.partyid)[0]['cities']

    
  }


  change(data) {
    let tempData = {}
   
    if(data.value.lrno===0){alert('Missing Entries!')}
    else{
    tempData['rc'] = this.tempDate[0].truckno.slice(0,2);
    tempData['lrno'] = data.value.lrno===0?parseInt(this.tempDate[0]['lrno']):parseInt(data.value.lrno);
    tempData['partyType']=this.buttonOptionPartyType;
    tempData['_id'] = this.toSendid;
    tempData['tablename'] = 'turnbook'
    tempData['method'] = 'updateSeries1'
    
    this.apiCallservice.handleData_New_python('turnbook', 1, tempData, true)
      .subscribe((res: any) => {
        alert(res.Status);
        let newData = this.turnbooklistnew.filter(r => r._id !== this.toSendid);
        this.handleData.saveTurn([]);
        this.handleData.saveTurn(newData);
        this.turnbooklistnew = newData;
        
        this.myFormGroup1.patchValue({loadingDateDynamic: '' })
        this.myFormGroup1.patchValue({turnbookDate: '' })
        this.myFormGroup1.patchValue({truckno: '' })
        this.myFormGroup1.patchValue({loadingDate: '' })
        this.myFormGroup1.patchValue({lrno: 0 })

        this.showbuttonOption82 = false;
        this.showbuttonOption821 = false;
      });
    }
  }

  showDatabyid = function (data, j, number) {
 

      this.show = true;
      let tempObj = {};
      tempObj['place'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0].village_name;
      tempObj['place2'] = data.villageDetails2[0] === undefined ? '' : data.villageDetails2[0].village_name;
      tempObj['truckno'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0].truckno;
      tempObj['partyName'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0].name;
      tempObj['ownerid'] = data.ownerDetails[0] === undefined ? '' : data.ownerDetails[0]._id;
      tempObj['placeid'] = data.villageDetails[0] === undefined ? '' : data.villageDetails[0].village_name;
      tempObj['placeid2'] = data.villageDetails2[0] === undefined ? '' : data.villageDetails2[0].village_name;
      tempObj['partyid'] = data.partyDetails[0] === undefined ? '' : data.partyDetails[0]._id;
      tempObj['entryDate'] = data.entryDate;
      tempObj['_id'] = data._id;
      tempObj['partyType'] = data.partyType;
      tempObj['turnbookDate'] = data.turnbookDate;
      tempObj['loadingDate'] = data.loadingDate;
      tempObj['lrno'] = data.lrno === undefined ? '' : data.lrno;
      tempObj['index'] = j;
      this.indexBig=j;
      tempObj['number'] = number;
      tempObj['typeOfLoad'] = data.typeOfLoad;
      this.updateTruckTB=tempObj;
      this.partyid=data.partyDetails[0] === undefined ? '' : data.partyDetails[0]._id;
      this.SpartyType=data.partyType
      this.getForm();
    

  };

  getForm(){
    this.place = this.updateTruckTB.place;
    this.place2 = this.updateTruckTB.place2;
    this.placeid = this.updateTruckTB.placeid;
    this.placeid2 = this.updateTruckTB.placeid2;
    this.party = this.updateTruckTB.partyName;
    this.partyType = this.updateTruckTB.partyType;
    this.partyid = this.updateTruckTB.partyid;
    
    this.myFormGroupTB.patchValue({
      truckno: this.updateTruckTB.truckno,
      place: this.updateTruckTB.place,
      place2: this.updateTruckTB.place2,
      partyName: this.updateTruckTB.partyName,
      loadingDate: this.updateTruckTB.loadingDate,
      partyType: this.updateTruckTB.partyType,
    });    
  }

  showDatabyid2 = function (type,data=this.updateTruckTB) {
    let newdate;
    let newtype;
    let newpochDate;
    let newgivenDate;
    let pgno;
    switch (type) {
      case 'cancel':
        newdate = '2099-12-12';
        newtype = 'Cancel';
        newpochDate = '2099-12-12';
        newgivenDate='2099-12-12';
        pgno = 997;
        break;
    }
    if (confirm('Do you want to Cancel this Vehicle?')) {
      this.show = true;

      let tempObj = {};
      tempObj['_id'] = data._id;
      tempObj['loadingDate'] = newdate;
      tempObj['ownerid']=this.updateTruckTB.ownerid;
      tempObj['method'] = 'canuncanel';
      tempObj['tablename'] = 'turnbook';
      tempObj["partyType"] = newtype;
      tempObj["pochDate"] = newpochDate;
      tempObj["givenDate"] = newgivenDate;
      tempObj["pgno"] = pgno;
      tempObj['number'] = 2;
      this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, true)
        .subscribe((res: any) => {
          alert(res.Status);
          this.turnbooklist.splice(this.indexBig, 1);
        });
    }
  };

  delete(id, j) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id._id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'turnbook';
      formbody['turnbookDate'] = id.turnbookDate;

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: Response) => {
          alert(response['Status'])
          this.turnbooklist.splice(j, 1);
        });
    }
  }

  changeDivPartyWise(){
    if(this.myFormGroupTB.value.partyType==='NRCM'){
      this.showEditOtherDiv=false;
      this.villagelist = [];
    this.commonArray.villagenames.forEach(r=>{this.villagelist.push(r.village_name)})
    }else{
      this.showEditOtherDiv=true;
      this.villagelist=[];

    }
    this.parties = this.commonArray.gstdetails;
    


    this.parties=this.parties.filter(r=>r.partyType==this.myFormGroupTB.value.partyType)
  }

  edit(data) {
    this.show = true;
    data['index'] = 0;
    this.handleData.saveData(data);
    this.router.navigate(['Navigation/OWNER_HANDLER/OwnerUpdate']);
  }

  getTrucks() {
    this.trucklist = this.commonArray.ownerdetails;
  }

  getData(i,j){
this.updateTruck=i;
this.updateTruck['index']=j;

  }

  addActual(){
    let obj={}

    obj['id']=this.updateTruck['_id'];
    obj['paymentDate']=this.paymentDate;
    obj['paymentAmt']=this.paymentAmount;
    obj['statusOfPoch']=this.statusOfPoch;
    obj['tablename']='';
    obj['method']='updateActualPaymentDetailsSingly1'
    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, obj, true)
    .subscribe((res: any) => {
      alert(res.Status);
      this.statusOfPoch='';
      this.paymentAmount=0;
      this.paymentDate=''
    });
  }

   getAllTruckData(){
     this.reportPDF=true;
     this.turn12=this.turn11.filter(r => (r.loadingDate >= this.fdate)&&(r.loadingDate <= this.tdate))
     this.turn12.forEach(element => {
       element['considerForPayment']=true;
     });
   }
   

    totalLorryHire(){
      let sum=0
      this.turn12.forEach(r=>{
        let amt=r.advanceArray.length>0?r.advanceArray[0].advanceAmt:0
        sum=sum+amt;
    })
      return String(sum);
    }

    totatPaymentHire(){
      let sum=0
      this.turn12.forEach(r=>{
        if(r['considerForPayment']){
        sum=sum+r['actualPaymentAmount'];
        }
    })
      return String(sum);
    }

    considerForPaymentOption(data,index){
      this.turn12[index]['considerForPayment']=data;
    }
}
