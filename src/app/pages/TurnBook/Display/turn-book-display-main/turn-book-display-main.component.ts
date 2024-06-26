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
  public buttonValue: any = 'Avaliable Trucks';
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
    0,0,0,0,
    0,0,0,0,
    0,0,0,1
  ]
  public addis19=true;
  public tons=[];
  public displayoptions = [
    { 'value': '1', 'viewvalue': 'Avaliable Trucks' ,'disabled':false},
    { 'value': '2', 'viewvalue': 'Truck Arrival' ,'disabled':false},
    { 'value': '3', 'viewvalue': 'Truck Dispatched' ,'disabled':false},
    { 'value': '4', 'viewvalue': 'To From' ,'disabled':true},
    { 'value': '8', 'viewvalue': 'Monthly By Series' ,'disabled':false},
    { 'value': '9', 'viewvalue': 'Cancelled Vehicles' ,'disabled':false},
    { 'value': '10', 'viewvalue': 'By Party' ,'disabled':false},
    { 'value': '11', 'viewvalue': 'Details By Truck' ,'disabled':false},
    { 'value': '13', 'viewvalue': 'LRNO' ,'disabled':false},
    { 'value': '17', 'viewvalue': 'Double Loading' ,'disabled':false},
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
public types={'None':0,'Open':0,'Container':0}
public Locationtypes={'None':0,'Shivapur':0,'Dhaba':0}
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
    public securityCheck: SecurityCheckService, public formBuilder: FormBuilder,) {
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
          1,1,1,1,
          1,1,1,1,
          1,1,1,1]
        break;
        case 7:
          this.displayoptionsarray=[
            1,0,0,0,
            1,0,0,1,
            1,0,0,1]
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
        obj['partyhamali']=parseInt((<HTMLInputElement>document.getElementById('partyhamali_'+j)).value)
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

  getVehicleTypeList(){
    this.turnbooklist = [];
    this.turnbooklist = this.handleData.giveTurn(); 
    if(this.buttonOptionVehicleType==='All'){

    }
    else{
      this.turnbooklist=this.turnbooklist.filter(r=>{return r.ownerDetails[0].typeOfVehicle===this.buttonOptionVehicleType})
    }
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

  showDatabyidTurn = function (data) {
    this.show = true;
    this.found = data;
    data['updateNumber']=true;
    this.handleData.saveData(data);
    this.router.navigate(['Navigation/OWNER_HANDLER/OwnerUpdate']);
  };
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
      case '1':
        tempObj['turnbookDate'] = '2021-04-01';
        break;
      case '2':
        tempObj['turnbookDate'] = this.dynDate;
        break;
      case '3':
        tempObj['turnbookDate'] = this.dynDate;
        break;
      case '4':
        tempObj['turnbookDate'] = this.dynDate;
        tempObj['turnbookDateFrom'] = this.dynDate2;
        break;
      case '8':
        tempObj['date'] = this.selectedmy;
        tempObj['partyType']=this.buttonOptionPartyType;
        break;
        case '18':
        tempObj['date'] = this.selectedmy;
        tempObj['partyType']=this.buttonOptionPartyType;
        break;
        case '10':
        if (this.partyVar === '') { alert('Select a Party Name'); break; }
        else {
          tempObj['partyid'] = this.partyid['_id'];
        }
        break;
        case '11':
        if (this.truckVar === '') { alert('Select a Truck'); break; }
        else {
          tempObj['truckno'] = this.truckVar;
        }
        case '13':
          tempObj['lrno']=this.bylrno;
        break;
        case '19':
          this.showbuttonOption19=true;
          
        break;
      default:
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
if(this.buttonOption !== '11'){

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
      
    }
    else if(this.buttonOption==='11'){
let tempObj1={};
    tempObj1['tablename'] = 'turnbook'
    tempObj1['method'] = 'singleTruck'
    tempObj1['display'] = this.buttonOption;
    tempObj1['truckno'] = this.truckVar;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
      .subscribe((res: any) => {
        
        this.byTruckName=true;
        this.selectDate=false;
        this.reportPDF=false;

        this.turnbooklist = res.Data;
        this.unique11turnbooklist= res.Data.map(r=>r.truckName.truckno).filter(function(item, pos) {return res.Data.map(r=>r.truckName.truckno).indexOf(item) == pos;})
        this.tableSelected=true;
      });
      
    }

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

  sendBalanceData(data,j,type){
    let bal=data.advanceArray.find(r=>{return r.reason==='Balance'})
  let msg=''
  msg=msg+'*****%20%20*Balance%20Payment%20Details*%20%20*****%0A%0A'
  msg=msg+'*TruckNo*%20:%20'+data.truckName.truckno.replace(/\s/g, "%20")+'%0A'
  msg=msg+'*Loading*%20Date%20:%20'+this.handleF.getDateddmmyy(data.loadingDate)+'%0A'
  msg=msg+'*Load*%20:%20'+data.typeOfLoad+'%0A'
  msg=msg+'*Destination*%20:%20'+data.placeName.village_name +'%20'+(data.placeName.village_name2?data.placeName.village_name2:'')+'%0A'
  msg=msg+'*Status%20of%20Delivery*%20:%20'+data.statusOfPoch+'%0A'
  msg=msg+'*Balance%20Amount*%20:%20'+(bal?bal.advanceAmt:'')+'%0A%0A'
  msg=msg+'*%20*Payment%20Details*%20*%0A%0A'
  msg=msg+'*Payment%20Amount*%20:%20'+data.actualPaymentAmount+'%0A'
  msg=msg+'*Payment%20Date*%20:%20'+this.handleF.getDateddmmyy(data.actualPaymentDate)+'%0A%0A%0A'
  msg=msg+'*%20*Account%20Details*%20*%0A%0A'
  msg=msg+'*Accname*%20:%20'+(bal?bal.BHAccname.replace(/\s/g, "%20"):'')+'%0A'
  msg=msg+'*AccNo*%20:%20'+(bal?bal.BHAccNo:'')+'%0A'
  msg=msg+'*IFSC*%20:%20'+(bal?bal.BHIFSC:'')+'%0A%0A'
  msg=msg+'*Nitin%20Roadways%20and%20Cargo%20Movers*%0A'
  msg=msg+'*Pune*%0A'
  msg=msg+'9822288257%0A'
  msg=msg+'9766707061%0A'
  switch (type) {
    case 'truck':
      window.open('https://wa.me/+91'+data.truckName.contact[0]+'/?text='+msg,'_blank');      
      break;
      case 'shubham':
      window.open('https://wa.me/+919766707061/?text='+msg,'_blank');      
      break;
  
      case 'dad':
      window.open('https://wa.me/+919822288257/?text='+msg,'_blank');      
      break;
  
    default:
      break;
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
   
    if(data.value.weight==='0'||data.value.lrno===0||data.value.typeOfLoad===''){alert('Missing Entries!')}
    else{
    tempData['rc'] = this.tempDate[0].truckno.slice(0,2);
    tempData['lrno'] = data.value.lrno===0?parseInt(this.tempDate[0]['lrno']):parseInt(data.value.lrno);
    tempData['partyType']=this.buttonOptionPartyType;
    tempData['typeOfLoad'] = data.value.typeOfLoad===''?this.tempDate[0]['typeOfLoad']:data.value.typeOfLoad;
    tempData['weight'] = data.value.weight;
    tempData['partyid'] = data.value.partyid===''?this.tempDate[0].party['_id']:data.value.partyid;
    tempData['placeid'] = data.value.placeid===''?this.tempDate[0].place['_id']:data.value.placeid;
    tempData['placeid2'] = data.value.placeid2===''?this.tempPlaceid:data.value.placeid2;
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
        this.myFormGroup1.patchValue({typeOfLoad:'' })
        this.myFormGroup1.patchValue({turnbookDate: '' })
        this.myFormGroup1.patchValue({truckno: '' })
        this.myFormGroup1.patchValue({loadingDate: '' })
        this.myFormGroup1.patchValue({lrno: 0 })
        this.myFormGroup1.patchValue({partyid:'' })
        this.myFormGroup1.patchValue({placeid:'' })
        this.myFormGroup1.patchValue({placeid2:'' })
        this.myFormGroup1.patchValue({weight:0 })

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
      case 'uncancel':
        newdate = '';
        newtype = '';
        newpochDate = '';
        newgivenDate='';
        pgno = 999;
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
  deleteTB() {
    let data=this.updateTruckTB;
    let id=data;
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id._id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'turnbook';
      formbody['turnbookDate'] = id.turnbookDate;

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: Response) => {
          alert(response['Status'])
          this.turnbooklist.splice(this.indexBig, 1);
        });
    }
  }
  edit2() {
    this.show = true;
    let tempObj={}    
    tempObj['_id']=this.updateTruckTB._id;
    tempObj['ownerid']=this.updateTruckTB.ownerid;
    tempObj['loadingDate']=this.myFormGroupTB.value.loadingDate;
    tempObj['partyid']=this.partyid;//send name
    tempObj['placeid']=this.myFormGroupTB.value.place;//send name
    tempObj['placeid2']=this.myFormGroupTB.value.place2;//send name
    tempObj['method'] = 'updateTurnSingle';
    tempObj['tablename'] = '';
    tempObj['partyType'] = this.myFormGroupTB.value.partyType;
    tempObj['number']=0
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((response: Response) => {
      alert(response['Status'])
      this.turnbooklist.splice(this.indexBig, 1);
    });
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



  downloadAvailableData(){//threshhold is 295
 
 
    let data=this.turnbooklist;
    let pager=1;
     let bigValueofY=0;
     var doc = new jsPDF()
     doc.setFontSize('25');
     doc.line(0, 148.2, 5, 148.2);//punching line helper
     doc.setFontType('bold');
     doc.text(data[0]['partyDetails'][0]['name'], 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     //headers
     doc.setFontSize('10');
     let y = 24;
     let starty = 25;
     doc.text('Sr', 2, y)//partyname
     doc.text('TruckNo', 8, y)//partyname
     doc.text('Date', 34, y)//partyname
     doc.text('Destination', 56, y)//partyname
     doc.text('Notes', 105, y)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(7, 20, 7, 25);//srno
     doc.line(33, 20, 33, 25);//truck
     doc.line(55, 20, 55, 25);//date
     doc.line(81, 20, 81, 25);//village
     //vertical lines
     let startforI=0;
     y = y + 6;
     startforI=0;
     for (let i = startforI; i < data.length; i++) {
 
       if(y>290){
        
         y=30;
     starty = 25;
     doc.line(7, starty, 7, 292);//date
        doc.line(33, starty,33, 292);//truckno
        doc.line(55, starty, 55, 292);//credit
        doc.line(81, starty, 81, 292);//village
         doc.addPage();
         doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text(data[0]['partyDetails'][0]['name'], 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 2, y-6)//partyname
     doc.text('TruckNo', 8, y-6)//partyname
     doc.text('Date', 34, y-6)//partyname
     doc.text('Destination', 56, y-6)//partyname
     doc.text('Notes', 105, y-6)//partyname
     //headers
     //vertical lines
     doc.line(7, 20, 7, 25);//srno
     doc.line(33, 20, 33, 25);//truck
     doc.line(55, 20, 55, 25);//date
     doc.line(81, 20, 81, 25);//village
     //vertical lines
     doc.line(0, 25, 210, 25);//line after header
     }
     
    doc.text(this.handleF.generate2DigitNumber(String(i+1)), 2, y-1)//partyname
    doc.text(data[i].ownerDetails[0].truckno.split(' ')[0]+''+data[i].ownerDetails[0].truckno.split(' ')[1]+''+data[i].ownerDetails[0].truckno.split(' ')[2], 8, y-1)//partyname
    doc.text(this.handleF.getDateddmmyy(data[i].loadingDate), 34, y-1)//Date              
    doc.text(data[i].villageDetails[0]['village_name'], 56, y-1)//Destination
    doc.line(0, y +2, 210, y +2);//line after header
       y = y + 10;
       
     }
        //vertical lines//getting applied for every loop, make it happen once only
        doc.line(7, starty, 7, y-8);//date
        doc.line(33, starty,33, y-8);//truckno
        doc.line(55, starty, 55, y-8);//credit
        doc.line(81, starty, 81, y-8);//village
        //vertical lines

    //  doc.save('Available-Data.pdf')
     doc.save(data[0]['partyDetails'][0]['name']+'.pdf')//partyname
   }

   downloadDeepData(){
    let tempObj1={};
    tempObj1['tablename'] = 'turnbook'
    tempObj1['method'] = 'deepDetails'
    tempObj1['ownerid'] = this.truckid['_id'];
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
    .subscribe((res: any) => {
    //  this.downloadDeepData2(res)
    });
  }
 downloadAvailable(){//threshhold is 295
  let data=this.turnbooklist;

    let pager=1;
     var doc = new jsPDF()
     doc.setFontSize('25');
     doc.line(0, 148.2, 5, 148.2);//punching line helper
     doc.setFontType('bold');
     doc.text('Available Trucks : '+this.todaysDate, 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     //headers
     doc.setFontSize('10');
     let y = 24;
     let starty = 25;
     doc.text('Sr', 2, y)//partyname
     doc.text('TruckNo', 8, y)//partyname
     doc.text('Personal Details', 36, y)//partyname
     doc.text('Account Details', 105, y)//partyname
     doc.text('Docs', 166, y)//partyname
     doc.text('Registration', 188, y)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(7, 20, 7, 25);//srno
     doc.line(33, 20, 33, 25);//date
     doc.line(103, 20, 103, 25);//date
    //  doc.line(161, 20, 161, 25);//date
     doc.line(165, 20, 165, 25);//date
    //  doc.line(175, 20, 175, 25);//date
     doc.line(187, 20, 187, 25);//date
     //vertical lines
     let startforI=0;
     y = y + 6;
     startforI=0;
     for (let i = startforI; i < data.length; i++) {
 
       if(y>276){
        doc.line(7, starty, 7, y-4);//srno
        doc.line(33, starty, 33, y-4);//date 
        doc.line(103, starty, 103, y-4);//date
        doc.line(161, starty, 161, y-4);//date
        doc.line(165, starty, 165, y-4);//date
        doc.line(175, starty, 175, y-4);//date
        doc.line(187, starty, 187, y-4);//date
         y=24;
         y=y+6;
     starty = 25;
         doc.addPage();
         doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Available Trucks : '+this.todaysDate, 15, 15)//partyname
     doc.setFontSize('10');
    //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 2, y-6)//partyname
     doc.text('TruckNo', 8, y-6)//partyname
     doc.text('Personal Details', 36, y-6)//partyname
     doc.text('Account Details', 105, y-6)//partyname
     doc.text('Docs', 166, y-6)//partyname
     doc.text('Registration', 188, y-6)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(7, 20, 7, 25);//srno
     doc.line(33, 20, 33, 25);//date
     doc.line(103, 20, 103, 25);//date
     doc.line(161, 20, 161, 25);//date
     doc.line(165, 20, 165, 25);//date
    //  doc.line(175, 20, 175, 25);//date
     doc.line(187, 20, 187, 25);//date
     //vertical lines
     }
     doc.text(this.handleF.generate2DigitNumber(String(i+1)), 2, y-1)//partyname
      doc.text(data[i].ownerDetails[0].truckno.split(' ')[0]+''+data[i].ownerDetails[0].truckno.split(' ')[1]+''+data[i].ownerDetails[0].truckno.split(' ')[2], 8, y-1)//partyname
      doc.text(data[i]['ownerDetails'][0]['pan']===""?'Name : ':'Name : '+data[i]['ownerDetails'][0]['oname'], 34, y)//Name
      doc.text(data[i]['ownerDetails'][0]['pan']===""?'Pan : ':'Pan : '+data[i]['ownerDetails'][0]['pan'], 34, y+5)//Pan
      doc.text(data[i]['ownerDetails'][0]['contact'][0]===undefined?'Contact : ':'Contact : '+data[i]['ownerDetails'][0]['contact'][0]+(data[i]['ownerDetails'][0]['contactO'][0]===undefined?'':','+data[i]['ownerDetails'][0]['contactO'][0]), 34, y+10)//Contact
      doc.text(data[i]['ownerDetails'][0]['accountDetails'].length<1?'Name : ':'Name : '+data[i]['ownerDetails'][0]['accountDetails'][0]['accountName'], 105, y)//Name
      doc.text(data[i]['ownerDetails'][0]['accountDetails'].length<1?'No : ':'No : '+data[i]['ownerDetails'][0]['accountDetails'][0]['accountNumber'], 105, y+5)//Pan
      doc.text(data[i]['ownerDetails'][0]['accountDetails'].length<1?'IFSC : ':'IFSC : '+data[i]['ownerDetails'][0]['accountDetails'][0]['ifsc'], 105, y+10)//Contact

      doc.text('RC',167,y)
      doc.text('Pan',167,y+5)
      doc.text('DL',167,y+10)

      doc.text(data[i]['ownerDetails'][0].r?'Ok':'',177,y)
      doc.text(data[i]['ownerDetails'][0].P?'Ok':'',177,y+5)
      doc.text(data[i]['ownerDetails'][0].d?'Ok':'',177,y+10)

      doc.text(data[i]['ownerDetails'][0].regFee?'Ok':'',188,y)



                
       doc.line(0, y + 11, 210, y + 11);//line after header
       y = y + 15;
 
     
     
     }
//vertical lines//getting applied for every loop, make it happen once only
doc.line(7, starty, 7, y-4);//srno
        doc.line(33, starty, 33, y-4);//date 
        doc.line(103, starty, 103, y-4);//date
        doc.line(165, starty, 165, y-4);//date
        doc.line(175, starty, 175, y-4);//date
        doc.line(187, starty, 187, y-4);//date
//vertical lines
     doc.save('Available-Details.pdf')
   }



   getAllTruckData(){
     this.reportPDF=true;
     this.turn12=this.turn11.filter(r => (r.loadingDate >= this.fdate)&&(r.loadingDate <= this.tdate))
     this.turn12.forEach(element => {
       element['considerForPayment']=true;
     });
   }

   downloadThePDF(){

    let pager=1;
    let bigValueofY=0;
    var doc = new jsPDF()
    doc.setFontSize('25');
    doc.setFontType('bold');
    doc.text('Payment Details', 15, 15)//partyname
    doc.setFontSize('10');
    doc.text(this.fdate+' to '+this.tdate, 165, 19)//date
    doc.text(String(pager), 180, 5)//pageno
    pager=pager+1;
    doc.setFontSize('25');
    doc.setLineWidth(0.5);
    doc.line(0, 20, 210, 20);//line after main header
    doc.line(20, 20, 20, 300);//punching area line
    //headers
    doc.setFontSize('10');
    let y = 24;
    let starty = 24;
    doc.line(0, 148.2, 5, 148.2);//punching line helper
    doc.text('Sr', 23, y)//partyname
    doc.text('Date', 38, y)//partyname
    doc.text('Truck No.', 60, y)//partyname
    doc.text('Balance', 86, y)//partyname
    doc.text('Pmt. Date', 101, y)//partyname
    doc.text('Pmt. Amt', 128, y)//partyname
    doc.text('Account', 146, y)//partyname
  
     doc.line(30, 20, 30, 25);//srno
     doc.line(55, 20, 55, 25);//date
     doc.line(83, 20, 83, 25);//truckno
     doc.line(100, 20, 100, 25);//lrno
     doc.line(127, 20, 127, 25);//credit
     doc.line(145, 20, 145, 25);//debit
  
    //headers
    doc.line(0, 25, 210, 25);//line after header
  
    let startforI=0;
      y = y + 6;
      startforI=0;
  
    for (let i = startforI; i < this.turn12.length; i++) {
  
     
      if(y>290){
        
        y=30;
       doc.line(30, starty, 30, 291);//srno
       doc.line(55, starty, 55, 291);//date
       doc.line(83, starty, 83, 291);//truckno
       doc.line(100, starty, 100, 291);//lrno
       doc.line(127, starty, 127, 291);//credit
       doc.line(145, starty, 145, 291);//debit
  
       starty = 20;
        doc.addPage();
        doc.setFontSize('25');
    doc.setFontType('bold');
    doc.text('Payment Details', 15, 15)//partyname
    doc.setFontSize('10');
    doc.text(this.fdate+' to '+this.tdate, 165, 19)//date
    doc.text(String(pager), 180, 5)//pageno
    pager=pager+1;
    doc.setFontSize('25');
    doc.setLineWidth(0.5);
    doc.line(0, 20, 210, 20);//line after main header
    doc.line(20, 20, 20, 300);//punching area line
    //headers
    doc.setFontSize('10');
    doc.text('Sr', 23, y-6)//partyname
    doc.text('Date', 38, y-6)//partyname
    doc.text('Truck No.', 60, y-6)//partyname
    doc.text('Balance', 86, y-6)//partyname
    doc.text('Pmt. Date', 101, y-6)//partyname
    doc.text('Pmt. Amt', 128, y-6)//partyname
    doc.text('Account', 146, y-6)//partyname
     
    
    //headers
    doc.line(0, 25, 210, 25);//line after header
  
    //vertical lines
    doc.line(30, 20, 30, 25);//srno
    doc.line(55, 20, 55, 25);//date
    doc.line(83, 20, 83, 25);//truckno
    doc.line(100, 20, 100, 25);//lrno
    doc.line(127, 20, 127, 25);//credit
    doc.line(145, 20, 145, 25);//debit
    //vertical lines
    }
       doc.text(String(i+1), 23, y)//partyname
      doc.text(this.handleF.getDateddmmyy(this.turn12[i]['loadingDate']), 32, y)//partyname
        doc.text(this.turn12[i]['truckName']['truckno'], 57, y)//truckno
        doc.text(this.turn12[i]['advanceArray'][0]?String(this.turn12[i]['advanceArray'][0]['advanceAmt']):'', 88, y)//truckno
        doc.text(this.handleF.getDateddmmyy(this.turn12[i]['actualPaymentDate']), 101, y)//truckno
        doc.text(this.turn12[i]['actualPaymentDate']!=''?String(this.turn12[i]['actualPaymentAmount']):'', 129, y)//truckno
        doc.text(this.turn12[i]['actualPaymentDate']!=''?(this.turn12[i]['advanceArray'][0]?String(this.turn12[i]['advanceArray'][0]['BHAccname']):''):'', 146, y)//truckno
        doc.text(this.turn12[i]['actualPaymentDate']!=''?(this.turn12[i]['advanceArray'][0]?String(this.turn12[i]['advanceArray'][0]['BHAccNo']):''):'', 146, y+5)//truckno
        doc.text(this.turn12[i]['statusOfPoch']==='Okay'?'':this.turn12[i]['statusOfPoch'],185,y);
        doc.text(this.turn12[i]['statusOfPoch']===('Okay'&&'')?'':'No Payment',185,y+5);
  
  
         y = y + 12;
         doc.line(20, y-5 , 210, y-5 );//line after header
    bigValueofY=y-5;
    doc.setFontSize('10');
  }
  doc.line(30, starty, 30, bigValueofY);//srno
  doc.line(55, starty, 55, bigValueofY);//date
  doc.line(83, starty, 83, bigValueofY);//truckno
  doc.line(100, starty, 100, bigValueofY);//lrno
  doc.line(127, starty, 127, bigValueofY);//credit
  doc.line(145, starty, 145, bigValueofY);//debit

// 
// 
// 
// 
// 

bigValueofY=0;
doc.addPage();

doc.setFontSize('25');
doc.setFontType('bold');
doc.text('Payment Details', 15, 15)//partyname
doc.setFontSize('10');
doc.text(this.fdate+' to '+this.tdate, 165, 19)//date
doc.text(String(pager), 180, 5)//pageno
pager=pager+1;
doc.setFontSize('25');
doc.setLineWidth(0.5);
doc.line(0, 20, 210, 20);//line after main header
doc.line(20, 20, 20, 300);//punching area line
//headers
doc.setFontSize('10');
y = 24;
starty = 24;
doc.line(0, 148.2, 5, 148.2);//punching line helper
doc.text('Sr', 23, y)//partyname
doc.text('Date', 38, y)//partyname
doc.text('Truck No.', 60, y)//partyname
doc.text('Balance', 86, y)//partyname
let balanceY=y+2;
 doc.line(30, 20, 30, 25);//srno
 doc.line(55, 20, 55, 25);//date
 doc.line(83, 20, 83, 25);//truckno
 doc.line(100, 20, 100, 25);//lrno

//headers
doc.line(0, 25, 100, 25);//line after header

startforI=0;
  y = y + 6;
  startforI=0;
let srno=0
for (let i = startforI; i < this.turn12.length; i++) {

 
  if(y>290){
    
    y=30;
   doc.line(30, starty, 30, 291);//srno
   doc.line(55, starty, 55, 291);//date
   doc.line(83, starty, 83, 291);//truckno
   doc.line(100, starty, 100, 291);//lrno

   starty = 20;
    doc.addPage();
    doc.setFontSize('25');
doc.setFontType('bold');
doc.text('Payment Details', 15, 15)//partyname
doc.setFontSize('10');
doc.text(this.fdate+' to '+this.tdate, 165, 19)//date
doc.text(String(pager), 180, 5)//pageno
pager=pager+1;
doc.setFontSize('25');
doc.setLineWidth(0.5);
doc.line(0, 20, 210, 20);//line after main header
doc.line(20, 20, 20, 300);//punching area line
//headers
doc.setFontSize('10');
doc.text('Sr', 23, y-6)//partyname
doc.text('Date', 38, y-6)//partyname
doc.text('Truck No.', 60, y-6)//partyname
doc.text('Balance', 86, y-6)//partyname
 

//headers
doc.line(0, 25, 100, 25);//line after header

//vertical lines
doc.line(30, 20, 30, 25);//srno
doc.line(55, 20, 55, 25);//date
doc.line(83, 20, 83, 25);//truckno
doc.line(100, 20, 100, 25);//lrno
//vertical lines
}
if(this.turn12[i]['advanceArray'][0]){

    doc.text(String(srno+1), 23, y)//partyname
    doc.text(this.handleF.getDateddmmyy(this.turn12[i]['loadingDate']), 32, y)//partyname
    doc.text(this.turn12[i]['truckName']['truckno'], 57, y)//truckno
    doc.text(String(this.turn12[i]['advanceArray'][0]['advanceAmt']), 88, y)//truckno

      y = y + 5;
    doc.line(20, y-4 , 100, y-4 );//line after header
      bigValueofY=y-4;
      doc.setFontSize('10');
      srno=srno+1;
}
}
    doc.text('Total', 57, y)//partyname
    doc.text(this.totalLorryHire(), 88, y)//truckno
    y = y + 5;
    doc.line(20, y-4 , 100, y-4 );//line after header
    bigValueofY=y-4;

doc.line(30, starty, 30, bigValueofY);//srno
doc.line(55, starty, 55, bigValueofY);//date
doc.line(83, starty, 83, bigValueofY);//truckno
doc.line(100, starty, 100, bigValueofY);//lrno

// 
// 
// 
// 
srno=1;
doc.text('Sr', 23, y)//partyname
doc.text('Pmt Date', 32, y)//partyname
doc.text('Truck No.', 60, y)//partyname
doc.text('Pmt Amt', 85, y)//partyname

 doc.line(30, 20, 30, 25);//srno
 doc.line(55, 20, 55, 25);//date
 doc.line(83, 20, 83, 25);//truckno
 doc.line(100, 20, 100, 25);//lrno

//headers
doc.line(0, y+1, 100, y+1);//line after header

startforI=0;
  y = y + 6;
  startforI=0;
for (let i = startforI; i < this.turn12.length; i++) {

 
  if(y>290){
    
    y=30;
   doc.line(30, starty, 30, 291);//srno
   doc.line(55, starty, 55, 291);//date
   doc.line(83, starty, 83, 291);//truckno
   doc.line(100, starty, 100, 291);//lrno

   starty = 20;
    doc.addPage();
    doc.setFontSize('25');
doc.setFontType('bold');
doc.text('Payment Details', 15, 15)//partyname
doc.setFontSize('10');
doc.text(this.fdate+' to '+this.tdate, 165, 19)//date
doc.text(String(pager), 180, 5)//pageno
pager=pager+1;
doc.setFontSize('25');
doc.setLineWidth(0.5);
doc.line(0, 20, 210, 20);//line after main header
doc.line(20, 20, 20, 300);//punching area line
//headers
doc.setFontSize('10');
doc.text('Sr', 23, y-6)//partyname
doc.text('Pmt Date', 32, y-6)//partyname
doc.text('Truck No.', 60, y-6)//partyname
doc.text('Pmt Amt', 85, y-6)//partyname
 

//headers
doc.line(0, 25, 100, 25);//line after header

//vertical lines
doc.line(30, 20, 30, 25);//srno
doc.line(55, 20, 55, 25);//date
doc.line(83, 20, 83, 25);//truckno
doc.line(100, 20, 100, 25);//lrno
//vertical lines
}
if(this.turn12[i]['actualPaymentDate']!==''){
if(this.turn12[i]['considerForPayment']){
    doc.text(String(srno+1), 23, y)//partyname
    doc.text(this.handleF.getDateddmmyy(this.turn12[i]['actualPaymentDate']), 32, y)//truckno
    doc.text(this.turn12[i]['truckName']['truckno'], 57, y)//truckno
    doc.text(String(this.turn12[i]['actualPaymentAmount']), 88, y)//truckno



      y = y + 5;
    doc.line(20, y-4 , 100, y-4 );//line after header
      bigValueofY=y-4;
      doc.setFontSize('10');
      srno=srno+1;
}
}
}
    doc.text('Total Payment', 57, y)//partyname
    doc.text(this.totatPaymentHire(), 88, y)//truckno
    y = y + 5;
    doc.line(20, y-4 , 100, y-4 );//line after header

    doc.text('Balance', 57, y)//partyname
    doc.text(String(parseInt(this.totalLorryHire())-parseInt(this.totatPaymentHire())), 88, y)//truckno
    y = y + 5;
    doc.line(20, y-4 , 100, y-4 );//line after header


    bigValueofY=y-4;

doc.line(30, starty, 30, bigValueofY);//srno
doc.line(55, starty, 55, bigValueofY);//date
doc.line(83, starty, 83, bigValueofY);//truckno
doc.line(100, starty, 100, bigValueofY);//lrno
doc.setFontSize('15');
doc.text('BALANCE : ',105,balanceY);
doc.text(String(parseInt(this.totalLorryHire()))+'-'+String(parseInt(this.totatPaymentHire()))+'='+String(parseInt(this.totalLorryHire())-parseInt(this.totatPaymentHire())),105,balanceY+10);
  doc.save(this.turn12[0]['truckName']['truckno']+'.pdf')
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

    getpdfcomplex2(){
      let pager=1;
      let bigValueofY=0;
      var doc = new jsPDF()
      doc.setFontSize('25');
      doc.setFontType('bold');
      doc.text('Payment Details', 15, 15)//partyname
      doc.setFontSize('10');
      doc.text(this.fdate+' to '+this.tdate, 165, 19)//date
      doc.text(String(pager), 180, 5)//pageno
      pager=pager+1;
      doc.setFontSize('25');
      doc.setLineWidth(0.5);
      doc.line(0, 20, 210, 20);//line after main header
      doc.line(20, 20, 20, 300);//punching area line
      //headers
      doc.setFontSize('10');
      let y = 24;
      let starty = 24;
      doc.line(0, 148.2, 5, 148.2);//punching line helper
      doc.text('Sr', 23, y)//partyname
      doc.text('Loading Date', 32, y)//partyname
      doc.text('Truck No.', 60, y)//partyname
      doc.text('Balance', 86, y)//partyname
      doc.text('Pmt. Date', 101, y)//partyname
      doc.text('Pmt. Amt', 128, y)//partyname
      doc.text('Account', 146, y)//partyname
    
       doc.line(30, 20, 30, 25);//srno
       doc.line(55, 20, 55, 25);//date
       doc.line(83, 20, 83, 25);//truckno
       doc.line(100, 20, 100, 25);//lrno
       doc.line(127, 20, 127, 25);//credit
       doc.line(145, 20, 145, 25);//debit
    
      //headers
      doc.line(0, 25, 210, 25);//line after header
    
      let startforI=0;
        y = y + 6;
        startforI=0;
    let index=0;
      for (let i = startforI; i < this.turn12.length; i++) {
        if(y>290){
          
          y=30;
         doc.line(30, starty, 30, 291);//srno
         doc.line(55, starty, 55, 291);//date
         doc.line(83, starty, 83, 291);//truckno
         doc.line(100, starty, 100, 291);//lrno
         doc.line(127, starty, 127, 291);//credit
         doc.line(145, starty, 145, 291);//debit
    
         starty = 20;
          doc.addPage();
          doc.setFontSize('25');
      doc.setFontType('bold');
      doc.text('Payment Details', 15, 15)//partyname
      doc.setFontSize('10');
      doc.text(this.fdate+' to '+this.tdate, 165, 19)//date
      doc.text(String(pager), 180, 5)//pageno
      pager=pager+1;
      doc.setFontSize('25');
      doc.setLineWidth(0.5);
      doc.line(0, 20, 210, 20);//line after main header
      doc.line(20, 20, 20, 300);//punching area line
      //headers
      doc.setFontSize('10');
      doc.text('Sr', 23, y-6)//partyname
      doc.text('Loading Date', 32, y-6)//partyname
      doc.text('Truck No.', 60, y-6)//partyname
      doc.text('Balance', 86, y-6)//partyname
      doc.text('Pmt. Date', 101, y-6)//partyname
      doc.text('Pmt. Amt', 128, y-6)//partyname
      doc.text('Account', 146, y-6)//partyname
       
      
      //headers
      doc.line(0, 25, 210, 25);//line after header
    
      //vertical lines
      doc.line(30, 20, 30, 25);//srno
      doc.line(55, 20, 55, 25);//date
      doc.line(83, 20, 83, 25);//truckno
      doc.line(100, 20, 100, 25);//lrno
      doc.line(127, 20, 127, 25);//credit
      doc.line(145, 20, 145, 25);//debit
      //vertical lines
      }
      if(this.turn12[i]['considerForPayment']==true){
         doc.text(String(index+1), 23, y)//partyname
         index=index+1;
         console.log(this.turn12[i]['pochAmount'])
         console.log(this.turn12[i]['loadingDate'])
        doc.text(this.handleF.getDateddmmyy(this.turn12[i]['loadingDate']), 32, y)//partyname
          doc.text(this.turn12[i]['truckName']['truckno'], 57, y)//truckno
          doc.text(this.turn12[i]['placeName']['village_name'], 57, y+5)//truckno
          doc.text(String(this.turn12[i]['pochAmount']), 88, y)//truckno
          doc.text(this.handleF.getDateddmmyy(this.turn12[i]['actualPaymentDate']), 101, y)//truckno
          doc.text(this.turn12[i]['actualPaymentDate']!=''?String(this.turn12[i]['actualPaymentAmount']):'', 129, y)//truckno
          // doc.text(this.turn12[i]['actualPaymentDate']!=''?(this.turn12[i]['advanceArray'].find(r=>{return r.reason=='Balance'})?String(this.turn12[i]['advanceArray'].find(r=>{return r.reason=='Balance'})['BHAccname']):''):'', 146, y)//truckno
          // doc.text(this.turn12[i]['actualPaymentDate']!=''?(this.turn12[i]['advanceArray'].find(r=>{return r.reason=='Balance'})?String(this.turn12[i]['advanceArray'].find(r=>{return r.reason=='Balance'})['BHAccNo']):''):'', 146, y+5)//truckno
          doc.text(this.turn12[i]['statusOfPoch']==='Okay'?'':this.turn12[i]['statusOfPoch'],185,y);
          let pmtx=this.turn12[i]['statusOfPoch']==='Okay'?'185':(this.turn12[i]['statusOfPoch']===''?(this.turn12[i]['pochDate']===''?'178':'178'):'185')

          if(this.turn12[i]['statusOfPoch']==='Okay'){
            doc.setTextColor(92,184,92);//green
          }
          else if(this.turn12[i]['statusOfPoch']===''){
            if(this.turn12[i]['pochDate']===''){
              doc.setTextColor(217,83,79);//red
            }
            
            else{
              doc.setTextColor(240,173,78);//orage
            }
          }
          else{
            doc.setTextColor(91,192,222);//blue
          }

          
          doc.text(this.turn12[i]['statusOfPoch']==='Okay'?'Balance Paid':(
            this.turn12[i]['statusOfPoch']===''?(
              this.turn12[i]['pochDate']===''?'PoD Not Received':'Payment Pending'):'No Payment'),pmtx,y+5);
              doc.setTextColor(0,0,0);
    
           y = y + 12;
           doc.line(20, y-5 , 210, y-5 );//line after header
      bigValueofY=y-5;
      doc.setFontSize('10');
    }
    }
    doc.line(30, starty, 30, bigValueofY);//srno
    doc.line(55, starty, 55, bigValueofY);//date
    doc.line(83, starty, 83, bigValueofY);//truckno
    doc.line(100, starty, 100, bigValueofY);//lrno
    doc.line(127, starty, 127, bigValueofY);//credit
    doc.line(145, starty, 145, bigValueofY);//debit
  
  
    doc.save(this.turn12[0]['truckName']['truckno']+'.pdf')
      }
}
