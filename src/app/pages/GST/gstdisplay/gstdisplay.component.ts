import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Consts } from 'src/app/common/constants/const';

@Component({
  selector: 'app-gstdisplay',
  templateUrl: './gstdisplay.component.html',
  styleUrls: ['./gstdisplay.component.css'],
  providers: [ApiCallsService]
})

export class GstdisplayComponent implements OnInit {
  public objectKeys = Object.keys;
  public notall=false;
  public gstdetailslist;
  public show = false;
  public found;
  public dbName = 'NRCM_Information';
  public commonArray;
  public considerArray;
  constructor(
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public router: Router,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService
  ) {
    if(!this.sec.login){
      this.router.navigate([''])
    }
  }

  ngOnInit() {
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogst')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.gstdetailslist = this.commonArray.gstdetails;
  }
  msgs(data){
    
    window.open('https://messages.google.com/web/conversations/'+data,'_blank');    
  }
  refresh(){
    this.considerArray=[0,1,0,0,0,0,0,0]
    this.getInformationData()
  }

  pdf(i){
    var doc = new jsPDF('l','mm',[110,220])
    doc.setFontSize('5')
    doc.setFontType('Open Sans')
    doc.text('From,',23, 28)
    doc.setTextColor(224,0,0);
    doc.text('Nitin Roadways,',25, 30)
    doc.setTextColor(0,0,0);
    doc.text('Shop No. 253, Opp. Katraj Police Station,',25, 32)
    doc.text('Pune Satara Road,Pune - 411046',25, 34)
    doc.text('Co : 9766707061',25, 36)
    doc.text('www.nitinroadways.in',25, 38)
    doc.addImage(Consts.goldennr, 'PNG', 2, 20, 20, 20);//add if else



    doc.text('To,',28, 8)
    doc.setTextColor(224,0,0);
    doc.text(i.name,30,10)
    doc.setTextColor(0,0,0);
    doc.text(i.addr1,30, 12)
    doc.text(i.addr2,30, 14)
    doc.text(String(i.contact.length>0?i.contact[0]:''),30, 16)


    doc.save(i.name+'.pdf')

  }
  deleteGSTDetails = function (id) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'gstdetails';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: any) => {
          alert(response.Status)
          let bb;
          let j = 0;
          this.gstdetailslist.forEach((res) => {
            if (res._id == id) { bb = j; }
            j = j + 1;
          })
          this.gstdetailslist.splice(bb, 1);
        });
    }
  };

  copyEmail(data){
    window.navigator['clipboard'].writeText(data)
  }

  showDatabyid = function (data) {
    console.log(data);
    
    this.handledata.saveData(data);
    this.show = true;
    this.found = data;
    this.router.navigate(['Navigation/GST_HANDLER/GSTUpdate']);
  };
  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray ,'notall':this.notall};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.sec.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.sec.commonArray['gstdetails'];;
        this.sec.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.sec.commonArray['villagenames'];;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.sec.commonArray;
    this.gstdetailslist = [];
    this.gstdetailslist = this.commonArray.gstdetails;
  }
}
