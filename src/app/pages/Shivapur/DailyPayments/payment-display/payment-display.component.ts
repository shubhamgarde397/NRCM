import { Component, OnInit, Input } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';

@Component({
  selector: 'app-payment-display',
  templateUrl: './payment-display.component.html',
  styleUrls: ['./payment-display.component.css'],
  providers: [ApiCallsService]
})
export class PaymentDisplayComponent implements OnInit {
// displayTodayAvailable
 
public show = false;
public date = new Date();
public role = 6;

constructor(public apiCallservice: ApiCallsService ) {
}

ngOnInit() {
}

find = function () {
  let tempObj = {};

  tempObj['tablename'] = ''
  tempObj['method'] = 'paymentDisplay';

  this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
    .subscribe((res: any) => {
      this.show=true;
        this.paymentlist = res.Data;
    });
};


}
