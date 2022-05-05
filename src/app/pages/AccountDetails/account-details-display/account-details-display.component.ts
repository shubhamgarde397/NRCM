import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
@Component({
  selector: 'app-account-details-display',
  templateUrl: './account-details-display.component.html',
  styleUrls: ['./account-details-display.component.css']
})
export class AccountDetailsDisplayComponent implements OnInit {
  // $BASIC $
  public options = [
    {'viewValue':'Accounts','value':'1'},
    {'viewValue':'Pan','value':'2'}
  ]
  public displayType;
  public buttonOption;
  public buttonValue;
  public showButton=false;
  public myFormGroup: FormGroup;
  public show=false;
// #BASIC #

  //$ Account $
  public tbl;
  public tblShow=false;
//# Account #
// $PAN $
  public panarray=[];
  public pantable=false;
  public buttons=[];
  public years=[];
  public tempObj={};
  public selectedMY;
  public emptyData;
// #PAN #

  constructor(
    public apiCallservice: ApiCallsService, 
    public securityCheck: SecurityCheckService,
     public handledata: HandleDataService,
     public handleF:handleFunction,
     public spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  }
  findOption() {
    this.showButton=true;
    this.buttonOption = this.displayType;
    this.buttonValue = this.options[parseInt(this.displayType) - 1].viewValue;
  }

  callOptionAPI(){
    this.resetAllDivs();
switch (this.buttonOption) {
  case '1':
    this.getInformationData()
    break;
    case '2':
    this.getPanInfoData();
    break;
}
  }

  resetAllDivs(){
    this.tblShow=false;
    this.pantable=false;
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "acc12363TF", "tablename": ''};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.tblShow=true;
        this.tbl=res.Data;
        this.spinnerService.hide();
        
      });
  }

  getPanInfoData(){
    this.buttons=this.getButtons();
// getpan infor from other reports, i want same ui
  }

  getButtons() {
    let buttons=[]
    let index=0;
        for (let i = 0; i < new Date().getFullYear() - 2019; i++) {
          this.years.push(i + 2020)
        }
        for (let i = 0; i < this.years.length; i++) {
          let months = new Date().getFullYear() - this.years[i] == 0 ? new Date().getMonth() + 1 : 12;
          for (let j = 0; j < months; j++) {
            let date = new Date(String(i + 2020) + '-' + this.handleF.generate2DigitNumber(String(j + 1)) + '-01');
            let month = date.toLocaleString('default', { month: 'short' });
            this.tempObj['value'] =  String(i + 2020) + "-" + this.handleF.generate2DigitNumber(String(j + 1)) + "-01_"+String(i + 2020) + "-" + this.handleF.generate2DigitNumber(String(j + 1)) + "-31";
            this.tempObj['viewValue'] = month + '-' + String(i + 2020).slice(-2);
            this.tempObj['option']=1;
            this.tempObj['index']=index;
            buttons.push(this.tempObj);
            this.tempObj = {}
            index=index+1;
          }
          
        }
        buttons.push({'value':'""_""','viewValue':'All','option':2,'index':index});
        return buttons;
      }


  getData(option){
    let tempObj={};
    tempObj['from']=this.buttonOption==='2'?(this.buttons[parseInt(this.selectedMY)]['option']===1?this.buttons[parseInt(this.selectedMY)]['value'].split('_')[0]:null):null;
    tempObj['to']=this.buttonOption==='2'?(this.buttons[parseInt(this.selectedMY)]['option']===1?this.buttons[parseInt(this.selectedMY)]['value'].split('_')[1]:null):null;
    tempObj['method']='pipelinePan'
    tempObj['tablename']='';
    tempObj['option']=1;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {
    this.emptyData=res.chartData;
    });
  }

  update(type,i,j){
    let tempObj = { "method": "updateacc12363TF", "tablename": '','type':type,'id':i._id};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        alert(res.Status);
        switch (type) {
          case 'both':
            this.tbl.splice(j,1)
            break;
            case '12':
            this.tbl[j]['accountDetails'][0]['acc12']=true;
            this.tbl[j]['accountDetails'][0]['acc363']?this.tbl.splice(j,1):null;
            break;
            case '363':
              this.tbl[j]['accountDetails'][0]['acc363']=true;
              this.tbl[j]['accountDetails'][0]['acc12']?this.tbl.splice(j,1):null;
            break;
        
          default:
            break;
        }
      });
  }
  downloadPan(data,option){
    let tempObj={};
    tempObj['from']=this.buttons[parseInt(this.selectedMY)]['option']===1?this.buttons[parseInt(this.selectedMY)]['value'].split('_')[0]:null;
    tempObj['to']=this.buttons[parseInt(this.selectedMY)]['option']===1?this.buttons[parseInt(this.selectedMY)]['value'].split('_')[1]:null;
    tempObj['partyType']=data['_id'];
    tempObj['method']='pipelinePan'
    tempObj['tablename']='';
    tempObj['option']=this.buttons[parseInt(this.selectedMY)]['option']===2?3:4;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {
      this.panarray=res.chartData;
      this.pantable=true;
    });
  }

  updatePan(i,j){
    console.log(i);
    console.log(j);
    
    let pan=(<HTMLInputElement>document.getElementById('pan_' + j)).value;
    let name=(<HTMLInputElement>document.getElementById('name_' + j)).value;
    if(pan===''||name===''){
      alert('Cannot add empty fields')
    }
    else if(pan.length<10){
      alert('Bad PAN Number!')
    }
    else{
      let tempObj={}
      tempObj['pan']=pan;
      tempObj['name']=name;
      tempObj['ownerid']=i['ownerid'];
      tempObj['tablename']='';
      tempObj['method']='SMARTPAN';
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
      .subscribe((res: any) => {
        alert(res.Status);
        this.panarray.splice(j,1);
      });
    }
  }
}
