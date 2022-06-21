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
public paymentlist;

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

delete(i,j){
  if(confirm('Are you sure to delete?')){
    let tempObj={}
    tempObj['method']='deleteP';
    tempObj['_id']=i['_id'];
    tempObj['tablename']='';
    this.apiCallservice.handleData_New_python('commoninformation',1,tempObj,1)
    .subscribe((res:any)=>{
      alert(res.Status);
      this.paymentlist.splice(j, 1);
    })
}
}


}
