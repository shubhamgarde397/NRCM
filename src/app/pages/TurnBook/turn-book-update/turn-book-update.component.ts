import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { log } from 'console';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from 'node_modules/@angular/router';

@Component({
  selector: 'app-turn-book-update',
  templateUrl: './turn-book-update.component.html',
  styleUrls: ['./turn-book-update.component.css'],
  providers: [ApiCallsService]
})
export class TurnBookUpdateComponent implements OnInit {
  public commonArray;
  public considerArray;
  public methoddisplay='';
  public data = [];
  public data2=[];
  public partyid='';
  public party='';
  public partyToUI=''
  public submitted=false;
  public selectedDate='';
  public options = [
    { 'viewValue': 'LRNO', 'value': '1', 'caller': 'lrno' },
    { 'viewValue': 'Type Of Load', 'value': '2' , 'caller': 'typeOfLoad' },
    { 'viewValue': 'Place 1', 'value': '3' , 'caller': 'placeName1' },
    { 'viewValue': 'Place 2', 'value': '4' , 'caller': 'placeName2' }
  ]
  public partyType='';
  public showData=[];
  public showButton = false;
  public buttonOption = '';
  public displayType = '';
  public buttonValue = '';
  public truckVar='';
  public unique11turnbooklist=[];
  public byTruckName=false;
  public turnbooklist=[];
  public villagelist=[];
  public trucknoid11;
  public wala11;
  public places = [];
  public parties=[];
  public caller='';
  public mainTable=false;
  public mainTable2=false;
  public selectDate=false;
  public turn11=[];
  public myFormGroup: FormGroup;
  constructor(public router:Router,
    public handledata: HandleDataService,
    public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService, public handlefunction: handleFunction,
    public formBuilder:FormBuilder) {if(!this.securityCheck.login){
      this.router.navigate([''])
    }
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.myFormGroup = this.formBuilder.group({
      truckno: '',
      place: '',
      place2: '',
      partyName: '',
      partyid:'',
      loadingDate: '',
      lrno:0,
      _id:''
    });
  }

  find(event){
    if(event==='11'){
      this.wala11=true;
    }
    else{
      this.wala11=false;
      if(event==='11new'){
        this.methoddisplay='11new'
      }
      else if(event==='11newnr'){
        this.methoddisplay='11newnr'
      }
    }
          let tempObj1={};
      tempObj1['tablename'] = 'turnbook'
      tempObj1['method'] = 'singleTruck'
      tempObj1['display'] = event;
      tempObj1['truckno'] = this.truckVar;
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
        .subscribe((res: any) => {
          if(res.Data.length>0){
          this.unique11turnbooklist=res.Data;
          this.byTruckName=true;
          this.turnbooklist = res.Data;
          // this.unique11turnbooklist= res.Data.map(r=>r.truckName.truckno).filter(function(item, pos) {return res.Data.map(r=>r.truckName.truckno).indexOf(item) == pos;})
          if(event==='11new'){
            this.trucknoid11=res.Data[0].truckName.truckno
            this.myFormGroup.patchValue({
              truckno: res.Data[0].truckName.truckno,
              place: res.Data[0].placeName.village_name,
              place2: res.Data[0].placeName2?res.Data[0].placeName2.village_name:'',
              partyName: res.Data[0].partyName.name,
              partyid: res.Data[0].partyName._id,
              loadingDate: res.Data[0].loadingDate,
              lrno: res.Data[0].lrno,
              _id:res.Data[0]._id
            })
          }
          else if(event==='11newnr'){
            this.trucknoid11=res.Data[0].truckName.truckno
            this.myFormGroup.patchValue({
              truckno: res.Data[0].truckName.truckno,
              place: res.Data[0].placeName.village_name,
              place2: res.Data[0].placeName2?res.Data[0].placeName2.village_name:'',
              partyid: res.Data[0].partyName._id,
              partyName: res.Data[0].partyName.name,
              loadingDate: res.Data[0].loadingDate,
              lrno: res.Data[0].nrlrno,
              _id:res.Data[0]._id
            })
          }
          this.considerArray = this.handledata.createConsiderArray('infogstonly')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
         
        }
        });
  
  }
  find11UniqueTruck(){
    if(this.trucknoid11!=='Default'){
      this.selectDate=false;
      this.byTruckName=true;
    this.turn11=this.turnbooklist.filter(r=>{return r._id==this.trucknoid11});
    this.myFormGroup.patchValue({
      truckno: this.turn11[0]['truckName'].truckno,
      place: this.turn11[0]['placeName'].village_name,
      place2: this.turn11[0]['placeName2']?this.turn11[0]['placeName2'].village_name:'',
      partyName: this.turn11[0]['partyName'].name,
      loadingDate: this.turn11[0]['loadingDate'],
      lrno: this.turn11[0]['lrno'],
      _id:this.turn11[0]['_id']
    })
    }
  }

  getInformationData() {
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];
        this.fetchBasic();
      });
  }

  fetchBasic() {
    this.commonArray = this.securityCheck.commonArray;
    this.parties = [];
    this.parties = this.commonArray.gstdetails;
  }

  change(data){
    console.log(data);
    let tempObj1={};
    tempObj1['tablename'] = ''
    tempObj1['methoddisplay']=this.methoddisplay
    tempObj1['method'] = 'updatelrparty'
    tempObj1['partyid'] = data.value._id;
    tempObj1['lrno'] = data.value.lrno;
    tempObj1['_id'] = data.value._id;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
      .subscribe((res: any) => {
        alert(res.Status)
      });
  }

  setPartyid(){
    this.myFormGroup.patchValue({partyid:this.myFormGroup.value.partyName});
  }


  getDoubts() {
    let tempObj1 = {};
    tempObj1['tablename'] = ''
    tempObj1['method'] = 'getDoubtsfromTB'
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
      .subscribe((res: any) => {
        this.handledata.saveAnilsWorkData(res.Data)
        this.mainTable=true;
        this.mainTable2=false;
      });
  }
  getDoubtsOD() {
    let tempObj1 = {};
    tempObj1['tablename'] = ''
    tempObj1['method'] = 'getDoubtsfromOD'
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
      .subscribe((res: any) => {
        this.data = res.Data;
        this.mainTable=false;
        this.mainTable2=true;
      });
  }
  findOption() {

  }
  findData(){
    this.showButton = true;
    this.buttonOption = this.displayType;
    this.buttonValue = this.options[parseInt(this.displayType) - 1].viewValue;
    this.caller = this.options[parseInt(this.displayType) - 1].caller;
    this.showData=this.handledata.AnilData;
    this.showData=this.showData.filter(r=>{if((!r.check[parseInt(this.buttonOption)-1])&&(r.partyType==this.partyType)){return r}})
  }
  getData() {
    let tempobj = {};
        this.considerArray = [0, 0, 0, 1, 0, 0, 0, 0]
        tempobj = { "method": "displaynew", "consider": this.considerArray, 'notall': false };
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, true)
          .subscribe((res: any) => {
                this.fetchData(res);

          });
            }
  fetchData = function (res) {
        this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];;
        this.commonArray = this.securityCheck.commonArray;
        this.places = this.commonArray.villagenames;
    }
  updatetruckformat(){
    let tempo=[]
    for(let i=0;i<this.showData.length;i++){
      let dataaa=(<HTMLInputElement>document.getElementById(this.caller+'_' + i)).value;
      this.showData[i]['N']=dataaa;
      if(this.displayType==='1'){
        this.showData[i]['U']=dataaa==''?false:true;
      }
      else{
        this.showData[i]['U']=dataaa=='Select'?false:true;
      }
      delete(this.showData[i]['check'])
      delete(this.showData[i]['datetruck'])
      delete(this.showData[i]['loadingDate'])
      delete(this.showData[i]['lrno'])
      delete(this.showData[i]['party'])
      delete(this.showData[i]['place1'])
      delete(this.showData[i]['turnbookDate'])
      delete(this.showData[i]['partyType'])
      delete(this.showData[i]['typeOfLoad'])
      }
      let tempobj={
        'method':'updateAnilsWork',
        'tablename':'',
        'newData':this.showData,
        'displayType':String(parseInt(this.displayType)-1),
        'caller':this.caller
      }
      this.mainTable=false;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, true)
      .subscribe((res: any) => {
            alert(res.Status)

      });

  }
  updateAllOKAY(){
    let tempo=[]
    for(let i=0;i<this.showData.length;i++){
      tempo.push(this.showData[i]['_id'])
      }
      let tempobj={
        'method':'updateAnilsWorkAll',
        'tablename':'',
        'newData':tempo,
        'displayType':String(parseInt(this.displayType)-1),
        'caller':this.caller
      }
      this.mainTable=false;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, true)
      .subscribe((res: any) => {
            alert(res.Status)

      });

  }
  updatetruckformat1(){
    for(let i=0;i<this.data.length;i++){
      let dataaa=(<HTMLInputElement>document.getElementById(this.caller+'_' + i)).value;
      this.data[i]['N']=dataaa;
        this.data[i]['U']=dataaa==''?false:true;
      delete(this.data[i]['truckno'])
      }
      let tempobj={
        'method':'updateAnilsWorkOD',
        'tablename':'',
        'newData':this.data
      }
      this.mainTable=false;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempobj, true)
      .subscribe((res: any) => {
            alert(res.Status)

      });
  }
 

}
