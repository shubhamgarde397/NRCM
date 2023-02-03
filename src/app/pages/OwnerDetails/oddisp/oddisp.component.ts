import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import 'jspdf-autotable';
import * as  jsPDF from 'jspdf';

@Component({
  selector: 'app-oddisp',
  templateUrl: './oddisp.component.html',
  styleUrls: ['./oddisp.component.css'],
  providers: [ApiCallsService]
})
export class OddispComponent implements OnInit {
  public ownerdetailslist = [];
  public ownerdetailslist2 = [];
  public date3month;
  public todayDate;
  public show = false;
  public found;
  public arr;
  public data;
  public commonArray;
  public lambdaArr = [];
  public index = 0;
  public considerArray;
  public whichType='0';
  public editTruck;
  public editTruckAcc;
  public tableDate=false;
  public tableDate2=false;
  public tableDate3=false;
  public villagedetailslist = [];

  // 
  public tableDate4=false;
  public editTruckTPT='';
  public ownerdetailslist4=[];
  public tptlist=[]
  // 

  // 
  public tableDate5=false;
  public ownerdetailslist5=[];
  // 

  // 
  public editTrucklocation='';
  public tableDate6=false;
  public ownerdetailslist6=[]
  // 

  // 
  public editname='';
  public tableDate7=false;
  public ownerdetailslist7=[]
  public fromsrno=0;
  public selected7=false;
  // 

  constructor(
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public spinnerService: Ng4LoadingSpinnerService,
    public handleF:handleFunction

  ) { }

  ngOnInit() {
    this.todayDate=this.handleF.createDate(new Date());
    this.commonArray = this.sec.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infoowner')
   
  }

  getWhichType(data){
this.whichType=data;
this.selected7=false;
switch(data){
  case '1':
    
    this.tableDate2=false;
    this.tableDate=false;
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    break;
    case '2':
      this.tableDate=false;
      this.fetchBasic();
      break;
      case '3':
        this.tableDate=false;
        this.fetchBasic();
        break;
        case '4':
        this.tableDate=false;
        this.considerArray = this.handledata.createConsiderArray('infotpt')
        this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
        this.fetchBasic();
        break;

        case '5':
          this.tableDate=false;
          this.considerArray = this.handledata.createConsiderArray('infotpt')
          this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
          this.fetchBasic();
          break;
          case '6':
            this.considerArray=[0,0,0,1,0,0,0,0]
          this.getInformationData()
          this.fetchBasic();
            break;
        
}
  }

  copyAcc(data){
    console.log(data);
    
    let msg=''
    msg=msg+'*'+data.truckno+'*\n\n';
    msg=msg+'*Accname*-'+(data.accountDetails[0].accountName)+'\n';
    msg=msg+'*AccNo*-'+(data.accountDetails[0].accountNumber)+'\n';
    msg=msg+'*IFSC*-'+(data.accountDetails[0].ifsc)
    console.log(msg);
    
    window.navigator['clipboard'].writeText(msg)
  }


  // tn05bd9099
  // 9840296064



  getSingleTruck(){
    this.tableDate2=true;
    this.spinnerService.show();
    let tempObj = {}
    tempObj['tablename'] = 'ownerdetails'
    tempObj['method'] = 'displayEditTruck'
    tempObj['truckno'] = this.editTruck;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.ownerdetailslist2=res.Data;
        this.spinnerService.hide();
      });

  }

  getSingleTruckAcc(){
    this.tableDate3=true;
    this.spinnerService.show();
    let tempObj = {}
    tempObj['tablename'] = 'ownerdetails'
    tempObj['method'] = 'displayEditTruckAcc'
    tempObj['accNo'] = this.editTruckAcc;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.ownerdetailslist2=res.Data;
        this.spinnerService.hide();
      });
  }

  getSingleAccName(){
    this.tableDate7=true;
    this.spinnerService.show();
    let tempObj = {}
    tempObj['tablename'] = 'ownerdetails'
    tempObj['method'] = 'displayTruckbyAccName'
    tempObj['accName'] = this.editname;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.ownerdetailslist7=res.Data;
        this.selected7=true;
        this.spinnerService.hide();
      });
  }

  getTruckbyTPT(){
    this.tableDate4=true;
    this.spinnerService.show();
    let tempObj = {}
    tempObj['tablename'] = 'ownerdetails'
    tempObj['method'] = 'displaybyTPT'
    tempObj['tptid'] = this.tptlist.find(r=>r.tptName==this.editTruckTPT)['_id']

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.ownerdetailslist4=res.chartData;
        this.spinnerService.hide();
      });
  }

  getTruckbyTPTTB(){
    this.tableDate4=true;
    this.spinnerService.show();
    let tempObj = {}
    tempObj['tablename'] = 'ownerdetails'
    tempObj['method'] = 'displaybyTPTTB'
    tempObj['tptid'] = this.tptlist.find(r=>r.tptName==this.editTruckTPT)['_id']

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.ownerdetailslist5=res.chartData;
        this.tableDate5=true;
        this.spinnerService.hide();
      });
  }

  getTruckbyTPTLoc(){
    this.tableDate6=true;
    this.spinnerService.show();
    let tempObj = {}
    tempObj['tablename'] = 'ownerdetails'
    tempObj['method'] = 'displaybyTPTLoc'
    tempObj['placeid'] = this.editTrucklocation;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.ownerdetailslist6=res.chartData;
        this.tableDate6=true;
        this.spinnerService.hide();
      });
  }



  deleteOwnerDetails = function (id) {
    if (confirm('Are you sure?')) {
      let formbody = {}
      formbody['_id'] = id;
      formbody['method'] = 'show';
      formbody['show']=false;
      formbody['find']=false;
      formbody['tablename'] = 'ownerdetails';

      this.apiCallservice.handleData_New_python('commoninformation', 1, formbody, 0)
        .subscribe((response:any) => {
          alert(response.Status)
          let bb;
          let j = 0;
          this.sec.commonArray
          
          this.ownerdetailslist.forEach((res) => {
            if (res._id == id) { 
              bb = j; 
              this.sec.commonArray['hiddenownerdetails'].push(res);
            }
            j = j + 1;
          })
          this.ownerdetailslist.splice(bb, 1);
        });
    }
  };

  newData() {
    if (this.data === '' || this.data === null || this.data === undefined) {
      this.ownerdetailslist = [];
      this.ownerdetailslist = this.commonArray.ownerdetails;
    }
    else {
      let tempList = this.commonArray.ownerdetails;
      this.ownerdetailslist = this.commonArray.ownerdetails;
      this.ownerdetailslist = [];
      let tempData = [];
      tempList.filter((res, index) => {
        if (res['truckno'].includes(this.data.toUpperCase())) {
          tempData.push(res);
        }
      })
      this.ownerdetailslist = tempData;
    }
  }

  showDatabyid = function (data,no) {

    this.show = true;
    this.found = data;
    
    data['updateNumber']=no
    this.handledata.saveData(data);
    this.router.navigate(['Navigation/OWNER_HANDLER/OwnerUpdate']);
  };

  showPreference(i,j,data){
    switch(data){
      case 'single':
        let t=this.ownerdetailslist2.find(r=>r._id===i)['preferences']
   this.ownerdetailslist2[j]['preferenceChk']=true;
   this.ownerdetailslist2[j]['preferences']=[]
   for(let v=0;v<t.length;v++){
    let yo=this.villagedetailslist.find(r=>r._id===t[v])
    this.ownerdetailslist2[j]['preferences'].push(yo['village_name'])
}
        break;
        case 'all':
          let y=this.ownerdetailslist.find(r=>r._id===i)['preferences']
   this.ownerdetailslist[j]['preferenceChk']=true;
   this.ownerdetailslist[j]['preferences']=[]
   for(let v=0;v<y.length;v++){
    let yo=this.villagedetailslist.find(r=>r._id===y[v])
    this.ownerdetailslist[j]['preferences'].push(yo['village_name'])
}
          break;
    }
   
  }

  shownative(i,j,data){
    switch(data){
      case 'single':
        let t=this.ownerdetailslist2.find(r=>r._id===i)['nativeplaces']
   this.ownerdetailslist2[j]['nativeplaces']=[]
   for(let v=0;v<t.length;v++){
    let yo=this.villagedetailslist.find(r=>r._id===t[v])
    this.ownerdetailslist2[j]['nativeplaces'].push(yo['village_name'])
}
        break;
        case 'all':
          let y=this.ownerdetailslist.find(r=>r._id===i)['nativeplaces']
   this.ownerdetailslist[j]['nativeplaces']=[]
   for(let v=0;v<y.length;v++){
    let yo=this.villagedetailslist.find(r=>r._id===y[v])
    this.ownerdetailslist[j]['nativeplaces'].push(yo['village_name'])
}
          break;
    }
   
  }

  showPreference2(i,j,data){
    switch(data){
      case 'single':
        let t=this.ownerdetailslist6.find(r=>r._id===i)['preferences']
   this.ownerdetailslist6[j]['preferenceChk']=true;
   this.ownerdetailslist6[j]['preferences']=[]
   for(let v=0;v<t.length;v++){
    let yo=this.villagedetailslist.find(r=>r._id===t[v])
    this.ownerdetailslist6[j]['preferences'].push(yo['village_name'])
}
        break;
        case 'all':
          let y=this.ownerdetailslist.find(r=>r._id===i)['preferences']
   this.ownerdetailslist[j]['preferenceChk']=true;
   this.ownerdetailslist[j]['preferences']=[]
   for(let v=0;v<y.length;v++){
    let yo=this.villagedetailslist.find(r=>r._id===y[v])
    this.ownerdetailslist[j]['preferences'].push(yo['village_name'])
}
          break;
    }
   
  }


  refresh(){
    this.considerArray=[0,0,1,0,0,0,0,0]
    this.getInformationData()
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 0)
      .subscribe((res: any) => {
        this.sec.commonArray['ownerdetails'] = Object.keys(res.ownerdetails[0]).length > 0 ? res.ownerdetails : this.sec.commonArray['ownerdetails'];
        this.sec.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.sec.commonArray['villagenames'];
        this.sec.commonArray['transport'] = Object.keys(res.transport[0]).length > 0 ? res.transport : this.sec.commonArray['transport'];
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.sec.commonArray;
    this.ownerdetailslist = [];
    this.villagedetailslist = [];
    this.tptlist=[]
    this.ownerdetailslist = this.commonArray.ownerdetails;
    this.villagedetailslist = this.commonArray.villagenames;
    this.tptlist = this.commonArray.transport;
    this.tableDate=this.ownerdetailslist.length>0?true:false;
  }

  getTBPDF(data){
    let selectedData=this.ownerdetailslist7;
    switch (data) {
      case 'all':this.ownerdetailslist7=selectedData.filter(r=>{return r.partyType!=='Cancel'});break;
      case 'pending':this.ownerdetailslist7=selectedData.filter(r=>{return (r.statusOfPoch!=='Okay')&&(r.partyType!=='Cancel')});break;
      case 'done':this.ownerdetailslist7=selectedData.filter(r=>{return (r.statusOfPoch==='Okay')&&(r.partyType!=='Cancel')});break;
    }
    
  }

  newData2(){
    this.ownerdetailslist7=this.ownerdetailslist7.slice(this.fromsrno-1);
  }

  tempDelete(index){
    this.ownerdetailslist7.splice(index,1);
  }

  downloadLoanReport(){
    let data=this.ownerdetailslist7;
    let pager=1;
    let bigValueofY=0;
    var doc = new jsPDF()
    doc.setFontSize('25');
    doc.setFontType('bold');
    doc.text('Payment Details', 15, 15)//partyname
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
    doc.line(0, 148.2, 5, 148.2);//punching line helper
    doc.text('Sr', 23, y)//partyname
    doc.text('Loading Date', 32, y)//partyname
    doc.text('Truck No.', 60, y)//partyname
    doc.text('Balance', 84, y)//partyname
    doc.text('Status', 105, y)//partyname
    doc.text('Poch', 135, y)//partyname
    doc.text('Party', 162, y)//partyname
  


     doc.line(30, 20, 30, 25);//srno
     doc.line(55, 20, 55, 25);//date
     doc.line(83, 20, 83, 25);//truckno
     doc.line(100, 20, 100, 25);//lrno
     doc.line(133, 20, 133, 25);//credit
     doc.line(160, 20, 160, 25);//debit
     doc.line(188, 20, 188, 25);//debit
  
    //headers
    doc.line(0, 25, 210, 25);//line after header
  
    let startforI=0;
      y = y + 6;
      startforI=0;
  
    for (let i = startforI; i < data.length; i++) {
  
     
      if(y>290){
        
        y=30;
       doc.line(30, starty, 30, 291);//srno
       doc.line(55, starty, 55, 291);//date
       doc.line(83, starty, 83, 291);//truckno
       doc.line(100, starty, 100, 291);//lrno
       doc.line(133, starty, 133, 291);//credit
       doc.line(160, starty, 160, 291);//debit
       doc.line(188, starty, 188, 291);//debit
  
       starty = 20;
        doc.addPage();
        doc.setFontSize('25');
    doc.setFontType('bold');
    doc.text('Payment Details', 15, 15)//partyname
    doc.setFontSize('10');
    doc.text(String(pager), 180, 5)//pageno
    pager=pager+1;
    doc.setFontSize('25');
    doc.setLineWidth(0.5);
    doc.line(0, 20, 210, 20);//line after main header
    doc.line(20, 20, 20, 300);//punching area line
    //headers
    doc.setFontSize('10');
    doc.text('Sr', 23, y-6)//partyname
    doc.text('Loading Date', 32, y-6)//partyname
    doc.text('Truck No.', 60, y-6)//partyname
    doc.text('Balance', 84, y-6)//partyname
    doc.text('Status', 105, y-6)//partyname
    doc.text('Poch', 135, y-6)//partyname
    doc.text('Party', 162, y-6)//partyname
     

    
    //headers
    doc.line(0, 25, 210, 25);//line after header
  
    //vertical lines
    doc.line(30, 20, 30, 25);//srno
    doc.line(55, 20, 55, 25);//date
    doc.line(83, 20, 83, 25);//truckno
    doc.line(100, 20, 100, 25);//lrno
    doc.line(133, 20, 133, 25);//credit
    doc.line(160, 20, 160, 25);//debit
    doc.line(188, 20, 188, 25);//debit
    //vertical lines
    }
        doc.text(String(i+1), 23, y)//partyname

        doc.text(this.handleF.getDateddmmyy(data[i]['loadingDate']), 32, y)//partyname

        doc.text(data[i]['truckName']['truckno'], 57, y)//truckno

        doc.text(data[i]['advanceArray'][0]?String(data[i]['advanceArray'][0]['advanceAmt']):'', 88, y)//truckno

        doc.text(data[i]['statusOfPoch']==='Okay'?'Okay':(data[i]['statusOfPoch']===''?(data[i]['pochDate']===''?'Received Pending':'Payment Pending'):data[i]['statusOfPoch']),101,y);

        doc.text(this.handleF.getDateddmmyy(data[i]['pochDate']),135,y);
        doc.text(String(data[i]['pgno']),135,y+6);

        doc.text(data[i]['partyType']+'-'+data[i]['psname'],162,y);
        doc.text(data[i]['vsname'],162,y+6);
  
  
         y = y + 12;
         doc.line(20, y-5 , 210, y-5 );//line after header
    bigValueofY=y-3;
    doc.setFontSize('10');
  }
  doc.line(30, starty, 30, bigValueofY);//srno
  doc.line(55, starty, 55, bigValueofY);//date
  doc.line(83, starty, 83, bigValueofY);//truckno
  doc.line(100, starty, 100, bigValueofY);//lrno
  doc.line(133, starty, 133, bigValueofY);//credit
  doc.line(160, starty, 160, bigValueofY);//debit
  doc.line(188, starty, 188, bigValueofY);//debit


  doc.save('Data.pdf')
    }

}


