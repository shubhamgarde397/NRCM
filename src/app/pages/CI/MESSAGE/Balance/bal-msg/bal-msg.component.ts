import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { ActivatedRoute } from '@angular/router';
import { P } from '@angular/core/src/render3';

@Component({
  selector: 'app-bal-msg',
  templateUrl: './bal-msg.component.html',
  styleUrls: ['./bal-msg.component.css']
})
export class BalMsgComponent implements OnInit {
  public QRCode: any;
public turnbooklist=[];
public gotData18=true;

  constructor(
    public apiCallservice: ApiCallsService, 
    public securityCheck: SecurityCheckService,
     public handledata: HandleDataService,
     public handleF:handleFunction,
     public formBuilder: FormBuilder,
     ) { }

  ngOnInit() {
    // var qrcode = new QRCode("qrcode",
    //   "tel:+91 9822288257");

  }
  find(){
    let tempObj = {}
    tempObj['tablename'] = ''
    tempObj['method'] = 'PCMNS' 

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.turnbooklist = res.Data;
        this.gotData18=false;
      });
  }


}
