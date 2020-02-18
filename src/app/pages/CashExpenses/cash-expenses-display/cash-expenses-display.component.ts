import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';

@Component({
  selector: 'app-cash-expenses-display',
  templateUrl: './cash-expenses-display.component.html',
  styleUrls: ['./cash-expenses-display.component.css'],
  providers: [ApiCallsService]
})

export class CashExpensesDisplayComponent implements OnInit {
  public dailydatalist;
  public show = false;
  public found;
  public tabledata = false;
  public PaymentArray = [];
  public DieselArray = [];
  public CashArray = [];
  public NEFTArray = [];
  public DataArray = [];
  options: any;
  chart: Highcharts.ChartObject;
  public dbName;
  @ViewChild('chartTarget') chartTarget: ElementRef;
  constructor(public apiCallservice: ApiCallsService, public handleData: HandleDataService, public router: Router,
    public securityCheck: SecurityCheckService) {
    this.dbName = this.securityCheck.saveFinancialYear;

  }

  ngOnInit() {
    this.getCashExpenses()
      .then((res) => {
        this.fetchData();
      });
  }

  getCashExpenses = function () {
    const promise = new Promise((resolve, reject) => {
      this.apiCallservice.handleData_New(this.dbName, 'cashExpenses/getCashExpenses', 1, 0)
        .subscribe((res: Response) => {
          this.cashDetails = res;
          this.cashDetails.forEach((element, index) => {
            this.PaymentArray.push(element.Payment);
            this.DieselArray.push(element.Diesel);
            this.CashArray.push(element.Cash);
            this.NEFTArray.push(element.NEFT);
          });
          this.DataArray.push(this.PaymentArray);
          this.DataArray.push(this.DieselArray);
          this.DataArray.push(this.CashArray);
          this.DataArray.push(this.NEFTArray);
          if (this.DataArray.length >= 1) {
            resolve(this.DataArray);
          }
        });
    });
    return promise;
  };

  fetchData = function () {
    this.apiCallservice.handleData_New(this.dbName, 'cashExpenses/getCashExpenses', 1, 0)
      .subscribe((res: Response) => {
        this.cashexpenses = res;
        this.tabledata = true;
      });
  };

  deleteCashExpenses = function (id) {
    if (confirm('Are you sure?')) {
      this.apiCallservice.handleData_New(this.dbName, 'cashExpenses/delCashExpenses', 1, 1, {}, id)
        .subscribe((response: Response) => {
          this.fetchData();
        });
    }
  };

  showDatabyid = function (yo) {
    this.handleData.saveData(yo);
    this.show = true;
    this.router.navigate(['Navigation/Truck_CASH_EXPENSES_HANDLER/Truck_CashExpenses_Update']);
  };

  back() {
    this.show = false;
  }

}
