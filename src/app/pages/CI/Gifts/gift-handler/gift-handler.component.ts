import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gift-handler',
  templateUrl: './gift-handler.component.html',
  styleUrls: ['./gift-handler.component.css'],
  providers: [ApiCallsService]
})
export class GiftHandlerComponent implements OnInit {
  public myFormGroup: FormGroup;
  public dataArray=[];
  public table=false;
  public new=false;

  public date;
  public name;
  public reason;
  public show;
  public I;
  public tableDate2=false;

  public selectedGift='';
  public selectedDate='';
  public editTruck='';
  public ownerdetailslist=[];

  public whichType=0;
  constructor(public apiCallservice: ApiCallsService,public handledata: HandleDataService,public sec:SecurityCheckService,public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      name: '',
      date:'',
      show:false,
      reason:''
    });
  }
  addGifts(){
    this.whichType=2;
  }
  giveGifts(){
    this.getGifts();
    this.whichType=3;
  }

  getSingleTruck(){
    let tempObj = {}
    tempObj['tablename'] = 'ownerdetails'
    tempObj['method'] = 'displayEditTruckG'
    tempObj['truckno'] = this.editTruck;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.tableDate2=true;
        this.ownerdetailslist=res.Data;
      });

  }


  store(data) {
    data.value['show'] = Boolean(data.value['show'])
    data.value['method'] = 'giftinsert';
    data.value['tablename'] = 'gifts';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, data.value, true)
      .subscribe((res: any) => {
        alert(res['Status']);
      });
  }

      getGifts(){
        this.whichType=1;
        let tempObj={}

        tempObj = { "method": "getGifts", "tablename": ''};    

        
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
          .subscribe((res: any) => {
              this.dataArray=res.Data;
              this.new=this.dataArray.length==0?true:false;
              this.table=true;
          });
      }

      update(i){
        this.date=i.date;
        this.reason=i.reason;
        this.name=i.name;
        this.I=i._id;
      }

      update2(){
        let temp={}
        temp['show'] = Boolean(this.show)
        temp['name']=this.name;
        temp['_id']=this.I;
        temp['date']=this.date;
        temp['reason']=this.reason;
        temp['method'] = 'giftupdate';
        temp['tablename'] = 'gifts';
        this.apiCallservice.handleData_New_python
          ('commoninformation', 1, temp, true)
          .subscribe((res: any) => {
            alert(res['Status']);
          });
      }
      
      give(data){
        this.selectedGift;
        let temp={}
        temp['_id']=data._id;
        temp['gifts']=[{'giftid':this.selectedGift,'date':this.selectedDate}]
        temp['method'] = 'giftupdate2';
        temp['tablename'] = 'gifts';
        this.apiCallservice.handleData_New_python
          ('commoninformation', 1, temp, true)
          .subscribe((res: any) => {
            alert(res['Status']);
          });

      }
}

