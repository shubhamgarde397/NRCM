import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { ExcelService } from '../../../common/services/sharedServices/excel.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-balance-hire-add',
  templateUrl: './balance-hire-add.component.html',
  styleUrls: ['./balance-hire-add.component.css']
})
export class BalanceHireAddComponent implements OnInit {
  public show = false;
  public found;
  public date = new Date();
  public balanceDate = [];
  public selectedDate;
  public role = 6;
  public printed: Boolean = true;
  public years = [];
  public createdDate = '';
  public uitodayDate=''
  public months = [
    { '1': 'Jan' },
    { '2': 'Feb' },
    { '3': 'Mar' },
    { '4': 'Apr' },
    { '5': 'May' },
    { '6': 'Jun' },
    { '7': 'Jul' },
    { '8': 'Aug' },
    { '9': 'Sep' },
    { '10': 'Oct' },
    { '11': 'Nov' },
    { '12': 'Dec' },
  ]
  public actualMonths = [];
  public yeardiv = true;
  public monthdiv = false;
  public daydiv = false;
  
  public buttonValue: any = 'Balance Hire';
  public buttonOption = '0';
  public displayType;
  public data;
  public finalAdd=false;
  public dayData;
  public givenTrucks;
  public givenTrucksPayment;
  public givenPaymentTable=false;
  public givenDate;
  public GPPMsg='Loading... Please Wait!'

  public selectedPochDate;
  public actualPayment=false;
  public fullpendingPayment=[];
  public paymentSettings=false;
  public saveArray=[
  ]
  public saveArrayData=false;
  public selectedPaymentDate='';
  public selectedPaymentAmount=0;
  public statusOfPoch='';
  public showpaymentButton=false;
  public defaultAmt=0;
  public ownerdetailslist;
  public showPDFButton=false;
  public sentComments=[];
  public nrcmid=0;
public bigI;
public todaysDate;
  constructor(public apiCallservice: ApiCallsService, public spinnerService: Ng4LoadingSpinnerService, public router: Router,
    public handledata: HandleDataService, public excelService: ExcelService,
    public securityCheck: SecurityCheckService, public handleF: handleFunction) {
     
  }

  ngOnInit() {
    this.nrcmid = this.securityCheck.nrcmid;
    this.uitodayDate = this.handleF.getDate(this.handleF.generate2DigitNumber(this.date.getDate()), (this.date.getMonth() + 1), this.date.getFullYear());
    this.todaysDate = this.handleF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    this.role = this.securityCheck.role;
    this.balanceDate = this.securityCheck.commonBalanceHire.length > 0 ? this.securityCheck.commonBalanceHire : [];
    for (let i = 0; i < new Date().getFullYear() - 2020; i++) {
      this.years.push(i + 2021)
    }
    this.givenDate=this.handleF.createDate(new Date());
  }

  find = function () {
    let tempObj = {};
    tempObj['method'] = 'BHInserttoProcessingDisplay';
    tempObj['tablename'] = 'BalanceHire';
    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        if(res.balanceData.length>0){
        this.balanceDate = [];
           this.balanceDate = res.balanceData;
           this.finalAdd=true;
        this.securityCheck.commonBalanceHire = res.balanceData;
        }
        else{
          alert('No Data Available!')
          this.balanceDate = [];
        }
      });
  };

  addtoBH(){
    this.finalAdd=false;
      let tempObj = {}
      tempObj['method'] = 'BHInsertNew1';
      tempObj['tablename'] = 'BalanceHire';
      tempObj['bhTrucks']=this.balanceDate
      tempObj['todayDate'] = this.uitodayDate;
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true,this.uitodayDate)
        .subscribe((res: any) => {
          alert(res.Status);
        });
  }


  deleteBHComplete(data, j) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = data._id;
      formbody['method'] = 'deleteBHProcess';
      formbody['tablename'] = 'BalanceHire';
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, formbody,true)
        .subscribe((res: any) => {
          this.balanceDate.splice(j, 1);
        });
    }
  }

  showDatabyidEditForm(data, j) {
    this.show = true;
    this.found = data;
    data['index'] = j;
    data['editOption'] = 1;
    data['truckData'].map(r=>{r.field=true;})
    data['commentToTruck']=data['commentToTruck']

    
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/BALANCE_HIRE_HANDLER/UpdateSingle']);
  }

}