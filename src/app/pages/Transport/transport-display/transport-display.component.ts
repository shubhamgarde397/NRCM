import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { Router } from '@angular/router';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-transport-display',
  templateUrl: './transport-display.component.html',
  styleUrls: ['./transport-display.component.css'],
  providers: [ApiCallsService]
})
export class TransportDisplayComponent implements OnInit {
  public transportlist;
  public show = false;
  public commonArray;
  public considerArray;
  constructor(
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public router: Router,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService
  ) {
  }

  ngOnInit() {
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infotpt')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    this.transportlist = this.commonArray.transport;
  }
  refresh(){
    this.considerArray=[0,0,0,0,0,0,1,0]
    this.getInformationData()
  }
  delete = function (id) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'delete';
      formbody['tablename'] = 'transport';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, true)
        .subscribe((response: any) => {
          alert(response.Status)
          let bb;
          let j = 0;
          this.transportlist.forEach((res) => {
            if (res._id == id) { bb = j; }
            j = j + 1;
          })
          this.transportlist.splice(bb, 1);
        });
    }
  };

  showDatabyid = function (data) {
    this.handledata.saveData(data);
    this.show = true;
    this.found = data;
    this.router.navigate(['Navigation/TRANSPORT_HANDLER/TRANSPORTUpdate']);
  };
  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.sec.commonArray['transport'] = Object.keys(res.transport[0]).length > 0 ? res.transport : this.sec.commonArray['transport'];;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.sec.commonArray;
    this.transportlist = [];
    this.transportlist = this.commonArray.transport;
  }

  downloadMail(){
    let data=this.transportlist;
  
    
       var doc = new jsPDF()
       
       doc.setFontType('bold')
       doc.setFontSize('15');
       doc.line(5,5,205,5)
       doc.line(5,5,5,292)
       doc.line(5,292,205,292)
       doc.line(205,5,205,292)

       let y = 5;

       for (let i = 0; i < data.length; i++) {
       
         if(y>276){

           y=5;
           doc.addPage();
           doc.setFontType('bold')
           doc.setFontSize('15');
           doc.line(5,5,205,5)
           doc.line(5,5,5,292)
           doc.line(5,292,205,292)
           doc.line(205,5,205,292)
      
       }
      
       doc.line(5,y+35,205,y+35)
       
       doc.setFontSize('12');
       doc.text('To,',7,y+5)
       doc.text(data[i]['tptName'],7,y+10)
       doc.text(data[i]['addr1'],7,y+15)
       doc.text(data[i]['addr2'],7,y+20)
       doc.text(data[i]['addr3'],7,y+25)
       doc.text(this.makeCo(data[i]),7,y+32)
       
       y=y+35
       
       
       }

       doc.save('Pending Payment Details.pdf')
     }

     makeCo(data){
      let str='Mo : '
for(let i=0;i<data.contact.length;i++){
    str=str+data.contact[i]
    if(data.contact[i+1]){str=str+','}
}
str=str+'.'
return str;
     }
     
}
