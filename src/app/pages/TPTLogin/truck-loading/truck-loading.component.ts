import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-truck-loading',
  templateUrl: './truck-loading.component.html',
  styleUrls: ['./truck-loading.component.css'],
  providers: [ApiCallsService]
})
export class TruckLoadingComponent implements OnInit {
  public today;
  public date ;
  public alltrucks=[];
  public alltrucks2=[];
  public alltrucks3={};
  public mainData=false;
  public mainData2=false;
  public mainData3=false;
  public ownerdetailslist;
  public selectedDate;
  public selectedTruck;
  constructor(public apiCallservice: ApiCallsService,public handledata:HandleDataService,public router:Router,public sec:SecurityCheckService) {if(!this.sec.login){
    this.router.navigate([''])
  }
  }

  ngOnInit() {
    this.fetchBasic()
  }

  fetchBasic() {
    this.ownerdetailslist = [];
    this.ownerdetailslist = this.sec.arr;
  }
  fetchMain(){
    let tempObj = {};
    tempObj['tablename'] = ''
    tempObj['method'] = 'getTruckDetailsbyoid';
    tempObj['id']=this.sec.userid;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.alltrucks=[];
          this.alltrucks = res.Data;
          this.mainData=res.Data.length>0?true:false;
      });
  }

  getTruckDetails(data,index){//_id,index
    this.mainData2=true;
    this.selectedTruck=data;
    this.alltrucks2=this.alltrucks.filter(r=>{return r.truckName==this.selectedTruck})
  }

  getTruckDetailsDate(){
    this.mainData3=true;
    this.alltrucks3=this.alltrucks2.filter(r=>{return r.loadingDate==this.selectedDate})
  }
  downloadDetailsPDF(){
    let tempObj={}
    tempObj['method']='tptBHPDFSingle'
    tempObj['tablename']='';
    tempObj['tptPochDate']=this.alltrucks3[0]['pochDate'];
    tempObj['tptPochAmount']=this.alltrucks3[0]['actualPaymentAmount'];
    tempObj['accNo']=this.alltrucks3[0]['accNumber']
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      
        res.chartData.length>0?this.downloadPDF(res.chartData):alert('Cannot fetch Data!');
    });
  }

  downloadPDF(data){
    {
      {
        var doc = new jsPDF()
        doc.setFontSize('30');
        doc.setFontType('bold');
        doc.setTextColor(224,0,0);
        doc.text('Nitin Roadways And Cargo Movers',15, 15)
    
        doc.setFontSize('16');
        doc.setFontType('bold');
        doc.setFontType('italic');
        doc.setTextColor(0, 0, 0);
    
        doc.setDrawColor(163,0,0);
        doc.setLineWidth(0.5);
        doc.line(15, 23, 195, 23);
    
        doc.setFontSize('15');
        doc.setFontType('bold');
        doc.setTextColor(224,0,0);
        doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 15, 28)
    
        doc.setDrawColor(163,0,0);
        doc.setLineWidth(0.5);
        doc.line(15, 29, 195, 29);
    
        doc.setFontType('normal');
        doc.setFontSize('15');
        doc.setTextColor(0, 0, 0);
        doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 25, 36)
        doc.setFontSize('12');
        doc.text('Email : punenitinroadways@gmail.com    Website : www.nitinroadways.in', 25, 43)
    
    
        doc.setFontType('italic');
        doc.setFontSize('14');
        doc.setTextColor(0, 0, 0);
        doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 25, 50)
    
        doc.setDrawColor(224,0,0);
        doc.setLineWidth(0.8);
        doc.line(15, 52, 195, 52);
        doc.setFontType('bold');
        doc.text('* Details of '+data[0].amt+' *',75,63)
    
        doc.setFontType('bold');
        doc.setFontSize('15');
        doc.text('Lorry Details',25,75)
        doc.setFontSize('10');
           doc.text('Sr', 25, 84)//partyname
           doc.text('TruckNo', 40, 84)//partyname
           doc.text('Loading Date', 72, 84)//partyname
           doc.text('Destination',115,84)
           doc.text('Balance',170,84)
           //headers
       
           //vertical lines
           doc.setDrawColor(0,0,0);
           doc.setFontType('normal');
           doc.setLineWidth(0.3);
           doc.line(22, 80, 22, 85);//srno
           doc.line(31, 80, 31, 85);//date
           doc.line(68, 80, 68, 85);//truckno
           doc.line(100,80, 100,85);//credit
           doc.line(155, 80,155, 85);//credit
           doc.line(190, 80,190, 85);//credit
    
           doc.line(22, 80,190, 80);//credit
           doc.line(22, 85,190, 85);//credit
           //vertical lines
          let y=90
    
           for (let i = 0; i < data[0]['truckData'].length; i++) {
       
           doc.text(String(i+1), 25, y)//partyname
           doc.text(data[0]['truckData'][i].truckno, 38, y)//partyname
           doc.text(data[0]['truckData'][i].date, 75, y)//partyname
           doc.text(data[0]['truckData'][i].shortDetails, 115, y)//partyname
           doc.text(String(data[0]['truckData'][i].amount), 170, y)//partyname
     
            doc.line(22, y + 1, 190, y + 1);//line after header
            y = y + 6;
      
          }
          doc.line(22, 85, 22, y-5);//srno
           doc.line(31, 85, 31, y-5);//date
           doc.line(68, 85, 68, y-5);//truckno
           doc.line(100,85, 100,y-5);//credit
           doc.line(155, 85,155, y-5);//credit
           doc.line(190, 85,190, y-5);//credit
        
    
       
        doc.save('test.pdf')
      }
    }

  }
}
