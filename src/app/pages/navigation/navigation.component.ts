import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { Location } from '@angular/common';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [ApiCallsService, HandleDataService],
})
@Input()
export class NavigationComponent implements OnInit {
  public data;
  public notRecievedCount;
  public now = new Date();
  public day = this.now.getDate();
  public month = this.now.getMonth();
  public year = this.now.getFullYear();
  public dbName = 'NRCM_Information';
  public AUTH;
  public date = new Date();
  public username;
  public role = 6;
  public nameOfUser = 'Guest';
  public URL = '';
  public showThisMsg = false
  public reportData=[];
  public myFormGroup: FormGroup;
  
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public location: Location,
    public handledata: HandleDataService,
    public securit: SecurityCheckService,
    public securityCheck: SecurityCheckService,
    public spin: Ng4LoadingSpinnerService,
    public obs: ObsServiceService,
    public hF: handleFunction,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.URL = window.location.href.split('/')[2];
    this.username = this.securityCheck.username;
    this.nameOfUser = this.username.slice(0, 1).toLocaleUpperCase() + this.username.slice(1, this.username.length)
    this.getInformationData();
    this.AUTH = this.securit.AUTH;
    this.month = this.date.getMonth() + 1
    this.year = this.date.getFullYear();
    this.obs.saveDate(this.hF.generate2DigitNumber(String(this.month)) + '_' + this.year)
    this.showThisMsg = this.securityCheck.typeofuser !== 1 ? true : false;

    this.myFormGroup = this.formBuilder.group({
      amountShow: this.securityCheck.getAmountShow()
    });
  }

  amount(data){
  }

  getInformationData() {
    this.spin.show();
    let caller = this.URL === 'www.nitinroadways.in' ? 'first' : 'default';
    let tempObj = { "method": "displaynew", "username": this.username, "consider": this.handledata.createConsiderArray(caller) };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.securityCheck.commonArray = res;
        this.securityCheck.commonArray['Role'] = res.Role;
        this.securityCheck.role = res.Role;
        this.role = res.Role;
        this.spin.hide();
        this.router.navigate(['Navigation/NRCM_HOME'])
      });
  }

  receivedReport(){
    let tempObj={};
    let today=new Date();
    let last7Days=new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
    tempObj['method']='receivedReport';
    tempObj['tablename']='turnbook';
    tempObj['date']=last7Days.getFullYear()+'-'+this.hF.generate2DigitNumber(String(last7Days.getMonth()+1))+'-'+this.hF.generate2DigitNumber(String(last7Days.getDate()));
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
this.reportData=res.chartData;
this.download(this.reportData);

      });
  }

  latestLoadedTrucks(){
    let tempObj={
      "method": "fetchLastLoadedTrucks",
      "tablename": "",
      "option": 8
    }
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
    .subscribe((res: any) => {
      this.reportData=res.chartData;
this.downloadLoaded(this.reportData);

    });
  }

  downloadLoaded(data) {//threshhold is 295
    let pager=1;
     
     var doc = new jsPDF()
     doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Last Loaded', 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     doc.line(20, 20, 20, 300);//punching area line
     //headers
     doc.setFontSize('10');
     let y = 24;
     let starty = 24;
     doc.text('Sr', 23, y)//partyname
     doc.text('TruckNo', 32, y)//partyname
     doc.text('Contact', 58, y)//partyname
     doc.text('Date', 85, y)//partyname
     doc.text('Places', 110, y)//partyname
     doc.text('Notes', 165, y)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(30, 20, 30, 25);//srno
     doc.line(57, 20, 57, 25);//date
     doc.line(83, 20, 83, 25);//truckno
     doc.line(109, 20, 109, 25);//truckno
     doc.line(140, 20, 140, 25);//lrno
     //vertical lines
     let startforI=0;
       y = y + 6;
       startforI=0;
     
 
     for (let i = startforI; i < data.length; i++) {
 
       if(y>290){
         
         starty = 20;

         doc.line(30, starty, 30, y-4);//srno
     doc.line(57, starty, 57, y-4);//date
     doc.line(83, starty, 83, y-4);//truckno
     doc.line(109, starty, 109, y-4);//truckno
     doc.line(140, starty, 140, y-4);//lrno
     y=30;
         doc.addPage();
         doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Report', 15, 15)//partyname
     doc.setFontSize('10');
    //  doc.text(this.hF.getDateddmmyy(this.date1)+' to '+this.hF.getDateddmmyy(this.date2), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     doc.line(20, 20, 20, 300);//punching area line
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 23, y-6)//partyname
     doc.text('TruckNo', 32, y-6)//partyname
     doc.text('Contact', 58, y-6)//partyname
     doc.text('Date', 85, y-6)//partyname
     doc.text('Places', 110, y-6)//partyname
     doc.text('Notes', 165, y-6)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(30, 20, 30, 25);//srno
     doc.line(57, 20, 57, 25);//date
     doc.line(83, 20, 83, 25);//truckno
     doc.line(109, 20, 109, 25);//truckno
     doc.line(140, 20, 140, 25);//lrno
     //vertical lines
     }
        doc.text(String(i+1), 23, y)//partyname
        doc.text(String(data[i].truckno), 31, y)//lrno
        doc.text('Count : '+String(data[i].sum), 31, y+4)//lrno

        doc.text(data[i].contact['contact']===undefined?'':String(data[i].contact['contact']), 58, y)//truckno

        doc.text(String(this.hF.getDateddmmyy(data[i].turnbookDate)), 85, y)//partyname
        doc.text(String(this.hF.getDateddmmyy(data[i].loadingDate)), 85, y+4)//partyname
        let yer=1
        for(let o=0;o<data[i].placeArray.length;o++){
        doc.text(String(data[i].placeArray[o]), 110, y)//partyname
        y=y+4;
      }
      if(data[i].placeArray.length>1){
        y=y-4;
        }
      doc.line(20, (y+1), 210, (y+1));//line after each entry
       y = y  +5;
     }
     doc.line(30, 20, 30, y-4);//srno
     doc.line(57, 20, 57, y-4);//date
     doc.line(83, 20, 83, y-4);//truckno
     doc.line(109, 20, 109, y-4);//truckno
     doc.line(140, 20, 140, y-4);//lrno
     doc.save('Report.pdf')
   }
  
  download(data) {//threshhold is 295
    let pager=1;
     
     var doc = new jsPDF()
     doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Poch Details', 15, 15)//partyname
     doc.setFontSize('10');
     doc.text(new Date().getFullYear()+'-'+this.hF.generate2DigitNumber(String(new Date().getMonth()+1))+'-'+this.hF.generate2DigitNumber(String(new Date().getDate())), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     doc.line(20, 20, 20, 300);//punching area line
     //headers
     doc.setFontSize('10');
     let y = 24;
     let starty = 24;
     doc.text('Sr', 23, y)//partyname
     doc.text('Date', 38, y)//partyname
     doc.text('TruckNo', 57, y)//partyname
     doc.text('Party', 88, y)//partyname
     doc.text('Village', 136, y)//partyname
     doc.text('Contact', 165, y)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(30, 20, 30, 25);//srno
     doc.line(55, 20, 55, 25);//date
     doc.line(83, 20, 83, 25);//truckno
     doc.line(109, 20, 109, 25);//truckno
     doc.line(135, 20, 135, 25);//lrno
     doc.line(163, 20, 163, 25);//credit
     //vertical lines
     let startforI=0;
       y = y + 6;
       startforI=0;
     
 
     for (let i = startforI; i < data.length; i++) {
 
       if(y>290){
         y=30;
         
     starty = 20;
         doc.addPage();
         doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('Report', 15, 15)//partyname
     doc.setFontSize('10');
    //  doc.text(this.hF.getDateddmmyy(this.date1)+' to '+this.hF.getDateddmmyy(this.date2), 165, 19)//date
     doc.text(String(pager), 180, 5)//pageno
     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 20, 210, 20);//line after main header
     doc.line(20, 20, 20, 300);//punching area line
     //headers
     doc.setFontSize('10');
     doc.text('Sr', 23, y-6)//partyname
     doc.text('Date', 38, y-6)//partyname
     doc.text('TruckNo', 57, y-6)//partyname
     doc.text('Party', 88, y-6)//partyname
     doc.text('Village', 136, y-6)//partyname
     doc.text('Contact', 165, y-6)//partyname
     //headers
     doc.line(0, 25, 210, 25);//line after header
 
     //vertical lines
     doc.line(30, 20, 30, 25);//srno
     doc.line(55, 20, 55, 25);//date
     doc.line(83, 20, 83, 25);//truckno
     doc.line(135, 20, 135, 25);//lrno
     doc.line(163, 20, 163, 25);//credit
     //vertical lines
     }
       doc.text(String(i+1), 23, y)//partyname
       doc.text(this.hF.getDateddmmyy(data[i].loadingDate), 32, y)//partyname
  
         doc.text(String(data[i].party_name.split('_')[0]), 88, y)//lrno
         doc.text(data[i].truck_no, 57, y)//truckno
      
         doc.text(String(data[i].village_name), 136, y)//partyname
 
       doc.text(String(data[i].contact[0]), 164, y)//partyname
       doc.line(20, y + 1, 210, y + 1);//line after header
       y = y + 5;
 
       
     //vertical lines//getting applied for every loop, make it happen once only
     doc.line(30, starty, 30, y - 4);//srno
     doc.line(55, starty, 55, y - 4);//date
     doc.line(83, starty, 83, y - 4);//truckno
     doc.line(135, starty, 135, y - 4);//lrno
     doc.line(163, starty, 163, y - 4);//credit
     //vertical lines
 
     }
     doc.save('Report.pdf')
   }

   tasks(){//threshhold is 295

    var doc = new jsPDF()
    doc.setFontType('bold');
    doc.setFontSize('10');
    doc.setLineWidth(0.5);
    let yaxis=0.2
    let xaxis=1
    //headers
   //  ṣtart side
 

    doc.line(105+yaxis, 0+xaxis, 105+yaxis, 300+xaxis);//mid line
    doc.line(5+yaxis, 0+xaxis, 5+yaxis, 300+xaxis);//mid line
    doc.line(40+yaxis, 0+xaxis, 40+yaxis, 300+xaxis);//mid line
    doc.line(75+yaxis, 0+xaxis, 75+yaxis, 300+xaxis);//mid line
    doc.line(110+yaxis, 0+xaxis, 110+yaxis, 300+xaxis);//mid line
    doc.line(145+yaxis, 0+xaxis, 145+yaxis, 300+xaxis);//mid line
    doc.line(180+yaxis, 0+xaxis, 180+yaxis, 300+xaxis);//mid line
   //  end side

    doc.text('Sr', 0.5+yaxis, 4+xaxis-1)//partyname
    doc.text('Sr', 105.5+yaxis, 4+xaxis-1)//partyname
    doc.text('In', 17.5+yaxis, 4+xaxis-1)//partyname
    doc.text('In', 122.5+yaxis, 4+xaxis-1)//partyname
    doc.text('What', 52+yaxis, 4+xaxis-1)//partyname
    doc.text('What',157+yaxis , 4+xaxis-1)//partyname
    doc.text('When', 85+yaxis, 4+xaxis-1)//partyname
    doc.text('When',190+yaxis , 4+xaxis-1)//partyname
    //headers

// A loop for 10 line counter
let j=1
let counter = 0;
for(let i=5;i<300;i=i+5){
 if(j==11){
   j=1

   doc.line(0+yaxis, i+xaxis, 210+yaxis, i+xaxis);//line after main header
   doc.text('Sr', 0.5+yaxis, i+4+xaxis)//partyname
   doc.text('Sr', 105.5+yaxis, i+4+xaxis)//partyname
   doc.text('In', 17.5+yaxis, i+4+xaxis)//partyname
   doc.text('In', 122.5+yaxis, i+4+xaxis)//partyname
   doc.text('What', 52+yaxis, i+4+xaxis)//partyname
   doc.text('What',157 +yaxis, i+4+xaxis)//partyname
   doc.text('When', 85+yaxis, i+4+xaxis)//partyname
   doc.text('When',190+yaxis , i+4+xaxis)//partyname



   i=i+5+xaxis
 }
 doc.text(this.hF.generate2DigitNumber(String(j)), 0.5+yaxis, i+3+xaxis)//partyname
 doc.text(this.hF.generate2DigitNumber(String(j)), 105.5+yaxis, i+3+xaxis)//partyname
 doc.line(0, i, 210, i);//line after main header
 j=j+1
 counter=counter + 1
}

 
   //  doc.save('Available-Data.pdf')
    doc.save('Tasks.pdf')//partyname
  }
 


  logout() {
    this.router.navigate(['']);
    this.apiCallservice.logout();
  }

  Prdfp(){
    if(confirm('Do you want pdf of missing Prdfp?')){
      let tempObj={
        "method": "missingprdfp",
        "tablename": "",
        "option": 9
      }

      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
    .subscribe((res: any) => {
      this.reportData=res.chartData;
this.PrdfpReport(this.reportData);

    });
    }
  }

  PrdfpReport(data){//threshhold is 295
    let pager=1;
    var doc = new jsPDF()
    doc.setFontSize('25');
    doc.setFontType('bold');
    doc.text('Prdfp', 15, 15)//partyname
    doc.setFontSize('10');
    doc.text(String(pager), 180, 5)//pageno
    pager=pager+1;
    doc.setFontSize('25');
    doc.setLineWidth(0.5);
    doc.line(0, 20, 210, 20);//line after main header
    doc.line(20, 20, 20, 300);//punching area line
    //headers
    doc.setFontSize('10');
    let y = 24;
    let starty = 24;
    doc.text('Sr', 23, y)//partyname
    doc.text('TruckNo', 38, y)//partyname
    doc.text('Contact', 57, y)//partyname
    doc.text('Pan', 79, y)//partyname
    doc.text('Lic', 92, y)//partyname
    doc.text('RC', 105, y)//partyname
    doc.text('Notes', 118, y)//partyname
    doc.text('Notes', 131, y)//partyname
    doc.text('Name', 150, y)//partyname
    //headers
    doc.line(0, 25, 210, 25);//line after header

    //vertical lines
    doc.line(30, 20, 30, 25);//srno
    doc.line(56, 20, 56, 25);//date
    doc.line(78, 20, 78, 25);//truckno
    doc.line(91, 20, 91, 25);//truckno
    doc.line(104, 20, 104, 25);//lrno
    doc.line(117, 20, 117, 25);//credit
    doc.line(130, 20, 130, 25);//credit
    doc.line(145, 20, 145, 25);//credit
    //vertical lines
    let startforI=0;
      y = y + 6;
      startforI=0;
    

    for (let i = startforI; i < data.length; i++) {

      if(y>290){
        y=24;
        
    starty = 20;
    doc.line(30, y, 30, 291 );//srno
    doc.line(56, y, 56, 291 );//date
    doc.line(78, y, 78, 291 );//truckno
    doc.line(91, y, 91, 291 );//truckno
    doc.line(104, y, 104, 291 );//lrno
    doc.line(117, y, 117, 291 );//credit
    doc.line(130, y, 130, 291 );//credit
    doc.line(145, y, 145, 291 );//credit
        doc.addPage();
        doc.setFontSize('25');
    doc.setFontType('bold');
    doc.text('Prdfp', 15, 15)//partyname
    doc.setFontSize('10');
    doc.text(String(pager), 180, 5)//pageno
    pager=pager+1;
    doc.setFontSize('25');
    doc.setLineWidth(0.5);
    doc.line(0, 20, 210, 20);//line after main header
    doc.line(20, 20, 20, 300);//punching area line
    //headers
    doc.setFontSize('10');
    doc.text('Sr', 23, y)//partyname
    doc.text('TruckNo', 38, y)//partyname
    doc.text('Contact', 57, y)//partyname
    doc.text('Pan', 79, y)//partyname
    doc.text('Lic', 92, y)//partyname
    doc.text('RC', 105, y)//partyname
    doc.text('Notes', 118, y)//partyname
    doc.text('Notes', 131, y)//partyname
    doc.text('Name', 150, y)//partyname
    //headers
    doc.line(0, 25, 210, 25);//line after header

    //vertical lines
    doc.line(30, 20, 30, 25);//srno
    doc.line(56, 20, 56, 25);//date
    doc.line(78, 20, 78, 25);//truckno
    doc.line(91, 20, 91, 25);//truckno
    doc.line(104, 20, 104, 25);//lrno
    doc.line(117, 20, 117, 25);//credit
    doc.line(130, 20, 130, 25);//credit
    doc.line(145, 20, 145, 25);//credit
    y=30
    //vertical lines
    }
      doc.text(String(i+1), 21, y)//partyname
        doc.text(data[i].truckno, 31, y)//truckno
        doc.text(data[i].contact, 57, y)//truckno


      doc.line(20, y + 1, 210, y + 1);//line after header
      y = y + 5;

      
    //vertical lines//getting applied for every loop, make it happen once only

    
    //vertical lines

    }
    
    doc.line(30, starty, 30, y-4 );//srno
    doc.line(56, starty, 56, y-4 );//date
    doc.line(78, starty, 78, y-4 );//truckno
    doc.line(91, starty, 91, y-4 );//truckno
    doc.line(104, starty, 104, y-4 );//lrno
    doc.line(117, starty, 117, y-4 );//credit
    doc.line(130, starty, 130, y-4 );//credit
    doc.line(145, starty, 145, y-4 );//credit
    doc.save('Missing-Prdfp.pdf')
  }
}
