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
  styles:['.hide{display:none}'],
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
  public nrcmid=0;
  public todayDate;
  public username;
  public nameOfUser = 'Guest';
  public URL = '';
  public showThisMsg = false
  public reportData=[];
  public myFormGroup: FormGroup;
  public arr=[];
  public from;
  public to;
  public noti=[]
  public notiC=0;
  public acknowledgement=false;
public tabsarray=[
  [0,[0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
  [0,[0,0,0,0,0,0,0]],
  [0,[]],
  [0,[0,0,0,0,0,0,0,0,0,0,0,0]],
  [0,[0,0]],
  [0,[]],
  [0,[]],
  [0,[]],
  [0,[]],
  [0,[]],
]
public seq=[];
  public tabs=[]
  //   {
  //     parent:'Information',
  //     link:'',
    
  //     children:[
  //       {name:'GST',link:'GST_HANDLER'},
  //       {name:'Truck',link:'OWNER_HANDLER'},
  //       {name:'Transport',link:'TRANSPORT_HANDLER'},
  //       {name:'Dues',link:'DUES_PAGE'},
  //       {name:'Dues Advance',link:'DUES_PAGE_ADVANCE'},
  //       {name:'Gifts',link:'GIFTS'},
  //       {name:'FROD',link:'FROD'},
  //       {name:'Village',link:'VILLAGE_HANDLER'},
  //       {name:'LR Reason',link:'REASON_HANDLER'},
  //       {name:'Party GST',link:'IMP_GST_HANDLER'},
  //       {name:'Hidden Trucks',link:'HIDDEN_OWNER_HANDLER'},
  //       {name:'SMART UPDATE',link:'ACCOUNT_DETAILS_DISPLAY'},
  //       {name:'Pending Payment Display',link:'PENDING_PAYMENT_DISPLAY'},
  //       {name:'Sequence',link:'SEQUENCE'}
  //     ]
  //   },
  //   {
  //     parent:'Daily Truck Details',
  //     link:'',
  //     children:[
  //       {name:'Turn Book',link:'TURN_BOOK_HANDLER'},
  //       {name:'Balance Hire',link:'BALANCE_HIRE_HANDLER'},
  //       {name:'Poch Collection',link:'POCH_COLLECTION_HANDLER'},
  //       {name:'Load Details',link:'Load_HANDLER'},
  //       {name:'Payment',link:'PARTY_PAYMENT_HANDLER',},
  //       {name:'Turnbook Location',link:'TURN_BOOK_LOCATION_DISP'},
  //       {name:'Daily Account Details',link:'DAILY_ACCOUNT_ADDER'},
  //     ]
  //   },
  //   {
  //     parent:'Link Truck',
  //     link:'LINK_TRUCK',
  //     children:[]
  //   },
  //   {
  //     parent:'Reports',
  //     link:'',
  //     children:[
  //       {name:'Charts',link:'CHART'},
  //       {name:'Received Report',link:'F1'},
  //       {name:'RC DL Expiry',link:'F2'},
  //       {name:'Task Page',link:'F3'},
  //       {name:'Last Loaded Trucks',link:'F4'},
  //       {name:'Last Loaded NRCM & FROD',link:'F5'},
  //       {name:'Last Loaded FROD',link:'F6'},
  //       {name:'Missing Prdfp',link:'F7'},
  //       {name:'Rent Slip',link:'F8'},
  //       {name:'Other Report',link:'OTHER_REPORT'},
  //       {name:'Mail Display',link:'MAIL_DISPLAY'},
  //       {name:'Missing Lrno',link:'MISSING_LR'}
  //     ]
  //   },
  //   {
  //     parent:'Details',
  //     link:'',
  //     children:[
  //       {
  //         name:'PDF',
  //         link:'PDF',
  //         },
  //       {
  //         name:'Envelope Entries',
  //         link:'NRCM_TRANSPORT_ENVELOPE',
  //         }
  //     ]
  //   },
  //   {
  //     parent:'Load Details',

  //     link:'Load_HANDLER',
  //     children:[]
  //   },
  //   {
  //     parent:'LR Send',

  //     link:'LR_Display',
  //     children:[]
  //   },
  //   {
  //     parent:'Payment',
  //     link:'PAYMENT_HANDLER',
  //     children:[]
  //   },
  //   {
  //     parent:'Logout',
  //     link:'F9',
  //     children:[]
  //   },
  //   {
  //     parent:'Welcome'+this.nameOfUser,
  //     link:'',
  //     children:[]
  //   },

  // ]

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
  ) { if(!this.securit.login){
    this.router.navigate([''])
  }}

  ngOnInit() {
    this.tabs=this.securityCheck.seq  
    this.todayDate = this.hF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
    this.URL = window.location.href.split('/')[2];
    this.username = this.securityCheck.dname;
    this.nameOfUser = this.username.slice(0, 1).toLocaleUpperCase() + this.username.slice(1, this.username.length);
    this.tabs[this.tabs.length-1]['parent']='Welcome '+this.nameOfUser;
    this.getInformationData();
    this.AUTH = this.securit.AUTH;
    this.nrcmid=this.securit.nrcmid;
    this.month = this.date.getMonth() + 1
    this.year = this.date.getFullYear();
    // this.tabsetter();
    this.obs.saveDate(this.hF.generate2DigitNumber(String(this.month)) + '_' + this.year)

    this.myFormGroup = this.formBuilder.group({
      amountShow: this.securityCheck.getAmountShow()
    });
  }

  routeR(data){
    // document.getElementsByClassName('navbar-brand')[0].setAttribute("data-toggle","modal")
    // undefined
    // document.getElementsByClassName('navbar-brand')[0].setAttribute("data-target","#myModalDD")

    if(data==''){}
    else if(data.slice(0,1)==='F'){
      switch(data.slice(1)){
        case '1':
          this.receivedReport();
          break;
          case '3':
          this.tasks();
          break;
          case '4':
          this.latestLoadedTrucks();
          break;
          case '5':
          this.latestLoadedTrucksNRCMandFROD();
          break;
          case '6':
          this.latestLoadedTrucksFROD();
          break;
          case '9':
          this.logout();
          break;
      }
    }
    else{
      this.router.navigate(['Navigation/'+data])
    }
  }

  tabsetter(){
// this is for anil
switch (this.nrcmid) {
  case 1:
    this.tabsarray=[
      [1,[1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
      [1,[1,1,1,1,1,0,1]],
      [1,[]],
      [1,[1,1,1,1,1,1,1,1,1,1,1,1]],
      [1,[1,1]],
      [1,[]],
      [1,[]],
      [1,[]],
      [1,[]],
    ]
    break;
    case 7:
      this.tabsarray=[
        [1,[0,1,0,1,1,0,0,1,0,0,0,1,0,0]],
        [1,[1,1,1,0,0,0,0]],
        [0,[]],
        [0,[0,0,0,0,0,0,0,0,0,0,0,0]],
        [1,[0,1]],
        [1,[]],
        [1,[]],
        [1,[]],
        [1,[]],
        [1,[]],
      ]    
    break;
    case 4:
      this.tabsarray=[
        [0,[0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
        [0,[0,0,0,0,0,0,1]],
        [0,[]],
        [0,[0,0,0,0,0,0,0,0,0,0,0,0]],
        [0,[0,0]],
        [0,[]],
        [0,[]],
        [0,[]],
        [1,[]],
        [1,[]],
      ]    
    break;
    case 3:
      this.tabsarray=[
        [0,[0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
        [0,[0,0,0,0,0,0,1]],
        [0,[]],
        [0,[0,0,0,0,0,0,0,0,0,0,0,0]],
        [0,[0,0]],
        [0,[]],
        [0,[]],
        [1,[]],
        [1,[]],
        [1,[]],
      ]    
    break;

  default:
    break;
}

// this.setTabData(this.tabsarray);
  }

  setTabData(data){
   for(let i =0;i<data.length;i++){
    this.tabs[i]['hideFlag']=data[i][0]===0?true:false
    for(let j=0;j<this.tabs[i]['children'].length;j++){
      this.tabs[i]['children'][j]['hideFlag']=data[i][1][j]===0?true:false
    }
}
 
  
  }

  amount(data){
  }
  getInformationData() {
    // this.spin.show();
    // let tempObj = { "method": "displaynew",'notall':false, "username": this.username, "consider": this.handledata.createConsiderArray('default') };
    // this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    //   .subscribe((res: any) => {
    //     this.securityCheck.commonArray = res;
    //     this.securityCheck.commonArray['Role'] = res.Role;
    //     this.securityCheck.role = res.Role;
    //     this.spin.hide();
    //     let k=Object.keys(res.lrsend[0])
    //     let v=Object.values(res.lrsend[0])
    //     for(let i=0;i<2;i++){
    //       let obj={}
    //       obj['location']=k[i]
    //       obj['value']=v[i]
    //       obj['color']=v[2+i]
    //       this.arr.push(obj);
    //       this.handledata.saveLRStatus(this.arr);
    //   }
    //     this.router.navigate(['Navigation/NRCM_HOME'])
    //   });
      this.arr=this.handledata.getLRStatus()
      this.noti=this.securit.getNoti();
      this.notiC=this.noti.length;
        this.router.navigate(['Navigation/NRCM_HOME'])
  }

  generateDuesReportPDF(data){//threshhold is 295
    let pager=1;
     var doc = new jsPDF()
     doc.setFontSize('25');
     doc.setFontType('bold');
     doc.text('DUES', 15, 12)//partyname

     doc.setFontSize('10');
     doc.text(String(pager), 180, 5)//pageno

     pager=pager+1;
     doc.setFontSize('25');
     doc.setLineWidth(0.5);
     doc.line(0, 15, 210, 15);//line after main header
     doc.line(12, 15, 12, 300);//punching area line
     //headers

     doc.setFontSize('10');
              doc.setLineDash([0,0], 20);
                doc.text('Name : '+data['truckno'], 15, 20)//partyname
                doc.text('Loan : '+data['amt'], 15, 25)//partyname
                doc.text('Reason : '+data['reason'], 15, 30)//partyname
                doc.text('Loan Date : '+data['date'], 15, 35)//partyname
        doc.line(0, 40, 210, 40);//line after main header
        
        doc.text('Sr', 13, 45)//partyname
        doc.text('Date', 28, 45)//partyname
        doc.text('Msg', 55, 45)//partyname
        doc.text('Amt Taken',76, 45)//partyname
        doc.text('S',100, 45)//partyname

        // doc.line(0, 46, 210, 46);//line after main header
        for(let k=0;k<20;k++){
          doc.line(0, 46+(k*6), 210, 46+(k*6));//line after main header
        }

        //vertical lines
       doc.line(18, 40, 18, 200);//srno
       doc.line(47, 40, 47, 200);//date
       doc.line(74, 40, 74, 200);//date
       doc.line(99, 40, 99, 200);//truckno
       //vertical lines
              



     doc.save('Dues.pdf')
   }

  receivedReport(){
    let tempObj={};
    let today=new Date();
    let last7Days=new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
    tempObj['method']='receivedReport';
    tempObj['tablename']='turnbook';
    tempObj['date']=last7Days.getFullYear()+'-'+this.hF.generate2DigitNumber(String(last7Days.getMonth()+1))+'-'+this.hF.generate2DigitNumber(String(last7Days.getDate()));
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
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
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      this.reportData=res.chartData;
this.downloadLoaded(this.reportData);

    });
  }
  
  latestLoadedTrucksNRCMandFROD(){
    let tempObj={
      "method": "fetchnrcmandfrodtrucks",
      "tablename": "",
    }
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      this.reportData=res.chartData;
this.downloadLoadedNandJ(this.reportData);

    });
  }
  latestLoadedTrucksFROD(){
    let tempObj={
      "method": "fetchfrodtrucks",
      "tablename": "",
    }
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      this.reportData=res.chartData;
this.downloadLoadedJ(this.reportData);

    });
  }
    
  downloadLoadedJ(data) {//threshhold is 295
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
        doc.text(data[i].contact['contact']===undefined?'':String(data[i].contact['contact']), 58, y)//truckno

        doc.text(String(this.hF.getDateddmmyy(data[i].loadingDate)), 85, y)//partyname
        doc.text(String(data[i].places+' : '+String(data[i].sum)), 110, y)//partyname
        doc.text(data[i].frod?'FROD':'', 110, y)//partyname
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

  downloadLoadedNandJ(data) {//threshhold is 295
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
        doc.text(data[i].contact['contact']===undefined?'':String(data[i].contact['contact']), 58, y)//truckno

        doc.text(String(this.hF.getDateddmmyy(data[i].loadingDate)), 85, y)//partyname
        doc.text(String(data[i].places+' : '+String(data[i].sum)), 110, y)//partyname
        doc.text(data[i].frod?'FROD':'', 110, y)//partyname
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
     doc.text('Poch Details', 15, 15)//partyname
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
  PochBill(){//threshhold is 295
    var doc = new jsPDF()
for(let i=0;i<=100;i++){
doc.setFontSize('30');
doc.setFontType('bold');
doc.setTextColor(224,0,0);
doc.text('NITIN ROADWAYS',28, 38)
doc.line(0, 106, 5, 106);//punching line helper
doc.setDrawColor(163,0,0);
doc.setLineWidth(0.5);
doc.line(3, 43, 146, 43);

doc.setFontSize('11');
doc.setFontType('bold');
doc.setTextColor(224,0,0);
doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 8,47)
doc.setDrawColor(163,0,0);
doc.setLineWidth(0.5);
doc.line(3, 48, 146, 48);

doc.setFontType('normal');
doc.setFontSize('12');
doc.setTextColor(0, 0, 0);
doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 10, 55)
doc.setFontSize('12');
doc.text('Email : punenitinroadways@gmail.com  Website : www.nitinroadways.in', 10, 60)


doc.setFontType('italic');
doc.setFontSize('11');
doc.setTextColor(0, 0, 0);
doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 10, 65)

doc.setDrawColor(224,0,0);
doc.setLineWidth(0.8);
doc.line(3, 67, 146, 67);

doc.setDrawColor(224,0,0);
doc.setLineWidth(0.2);
doc.line(3, 68, 146, 68);

doc.setFontSize('12');
doc.setFontType('normal');
doc.setTextColor(0, 0, 0);

doc.setFontType('bold');
doc.setDrawColor(0,0,0);
doc.text('Bill No. :    '+String(i+1000),10,75)
doc.text('Date : ________',110,75)

doc.text("We Nitin Roadways are submitting ____ PODs to",20,86)
doc.text("______________________________________________",20,92.5)

// Table
// Table square
doc.line(17, 103, 140, 103);
doc.line(17, 103, 17, 145);
doc.line(140, 103, 140, 145);
doc.line(17, 145, 140, 145);
// Table square
// Table rows
doc.line(17, 110, 140, 110);
doc.line(17, 117, 140, 117);
doc.line(17, 124, 140, 124);
doc.line(17, 131, 140, 131);
doc.line(17, 138, 140, 138);
// Table rows
// Table heading
doc.line(25, 103, 25, 145);//srno
doc.line(47, 103, 47, 145);//date
doc.line(79, 103, 79, 145);//truckno
doc.line(115, 103, 115, 145);//destination

doc.setFontSize('8');
doc.setFontType('bold');

doc.text('Sr.',19,108)
doc.setFontSize('10');
doc.text('1',20,115)
doc.text('2',20,122)
doc.text('3',20,129)
doc.text('4',20,136)
doc.text('5',20,143)
doc.setFontSize('8');
doc.text('Loading Date',27,108)
doc.text('Truck No',53,108)
doc.text('Destination',87,108)
doc.text('Balance',120,108)
// Table heading
// Table
// Signature
doc.setFontSize('10');
doc.text("Receiver's Signature ___________________",68.5,165)
// Signature
doc.setFontSize('10');
doc.setFontType('bold');
doc.text('Please check and pay the pending balance to : ',35,178)

 // Account
// Account square
doc.line(17, 181, 140, 181);
doc.line(17, 181, 17, 195);
doc.line(140, 181, 140, 195);
doc.line(17, 195, 140, 195);
// Account square
// Account rows
doc.line(17, 188, 140, 188);
// Account rows
// Account heading
doc.line(47, 181, 47, 195);//date
doc.line(79, 181, 79, 195);//truckno
doc.line(109, 181, 109, 195);//truckno

doc.setFontSize('10');
doc.setFontType('bold');

doc.text('Account Name',19.5,186)
doc.text('Account Number',49,186)
doc.text('Bank Name',85,186)
doc.text('IFSC',120,186)

doc.text('Nitin Roadways',19,193)
doc.text('3265201000363',50,193)
doc.text('Canara Bank',83,193)
doc.text('CNRB0003265',112,193)
// Account heading
// Table
if(this.acknowledgement){
  doc.setFontSize('12');
  doc.setFontType('bold');
  doc.text('ACKNOWLEDGEMENT SLIP',49,205)
  }
doc.addPage()
}
    
   
    doc.save('pochbillmain.pdf')
  }




  logout() {
    this.router.navigate(['']);
  }



 }
