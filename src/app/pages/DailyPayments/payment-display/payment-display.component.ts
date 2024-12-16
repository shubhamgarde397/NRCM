import { Component, OnInit, Input } from '@angular/core';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from 'node_modules/@angular/router';

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

constructor(public router:Router,public apiCallservice: ApiCallsService,public sec : SecurityCheckService ) {
  if(!this.sec.login){
    this.router.navigate([''])
  }
}

ngOnInit() {
}

find = function () {
  let tempObj = {};

  tempObj['tablename'] = ''
  tempObj['method'] = 'paymentDisplay';
  tempObj['userid'] = this.sec.userid;
  
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
    this.apiCallservice.handleData_New_python('commoninformation',1,tempObj,true)
    .subscribe((res:any)=>{
      alert(res.Status);
      this.paymentlist.splice(j, 1);
    })
}
}


}
