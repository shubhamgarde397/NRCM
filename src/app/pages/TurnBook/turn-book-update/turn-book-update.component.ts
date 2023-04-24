import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { log } from 'console';

@Component({
  selector: 'app-turn-book-update',
  templateUrl: './turn-book-update.component.html',
  styleUrls: ['./turn-book-update.component.css'],
  providers: [ApiCallsService]
})
export class TurnBookUpdateComponent implements OnInit {
  public commonArray;
  public considerArray;
  public data = [];
  public data2=[];
  public selectedDate='';
  public options = [
    { 'viewValue': 'LRNO', 'value': '1', 'caller': 'lrno' },
    { 'viewValue': 'Type Of Load', 'value': '2' , 'caller': 'typeOfLoad' },
    { 'viewValue': 'Place 1', 'value': '3' , 'caller': 'placeName1' },
    { 'viewValue': 'Place 2', 'value': '4' , 'caller': 'placeName2' }
  ]
  public showButton = false;
  public buttonOption = '';
  public displayType = '';
  public buttonValue = '';
  public places = [];
  public parties=[];
  public caller='';
  public mainTable=false;
  public mainTable2=false;
  constructor(
    public handledata: HandleDataService,
    public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService, public handlefunction: handleFunction) {
  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
  }
  getDoubts() {
    let tempObj1 = {};
    tempObj1['tablename'] = ''
    tempObj1['method'] = 'getDoubtsfromTB'
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
      .subscribe((res: any) => {
        this.data = res.Data;
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
    this.showButton = true;
    this.buttonOption = this.displayType;
    this.buttonValue = this.options[parseInt(this.displayType) - 1].viewValue;
    this.caller = this.options[parseInt(this.displayType) - 1].caller;
  }

  getData(data) {
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
    
    for(let i=0;i<this.data.length;i++){
      let dataaa=(<HTMLInputElement>document.getElementById(this.caller+'_' + i)).value;
      this.data[i]['N']=dataaa;
      if(this.displayType==='1'){
        this.data[i]['U']=dataaa==''?false:true;
      }
      else{
        this.data[i]['U']=dataaa=='Select'?false:true;
      }
      delete(this.data[i]['check'])
      delete(this.data[i]['datetruck'])
      delete(this.data[i]['loadingDate'])
      delete(this.data[i]['lrno'])
      delete(this.data[i]['party'])
      delete(this.data[i]['place1'])
      delete(this.data[i]['turnbookDate'])
      delete(this.data[i]['partyType'])
      delete(this.data[i]['typeOfLoad'])
      }
      let tempobj={
        'method':'updateAnilsWork',
        'tablename':'',
        'newData':this.data,
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
