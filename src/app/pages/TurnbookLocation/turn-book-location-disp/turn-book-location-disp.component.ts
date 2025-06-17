import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
@Component({
  selector: 'app-turn-book-location-disp',
  templateUrl: './turn-book-location-disp.component.html',
  styleUrls: ['./turn-book-location-disp.component.css']
})
export class TurnBookLocationDispComponent implements OnInit {
  public bigI;
  public bigJ;
  public tbl;
  public tblShow=false;
  public firstModal=true;
  public timeOfDay=''
  public location='';
  public nd= new Date();
  public todayDate = ''



  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService,public hf:handleFunction, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService,public router:Router) { 
      if(!this.securityCheck.login){
        this.router.navigate([''])
      }
    }

  ngOnInit() {
   this.todayDate=this.hf.createDate(this.nd);
  }

  setBigJ(i,j){
    this.bigI=i;
    this.bigJ=j;
    this.firstModal=true;
  }

  backtoModal1(){
    this.firstModal=true;
  }


  fetchBasicData(){
    let tempObj= {"tablename":"","method":"pendinglocation"}
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      this.tbl=res.Data;
      this.tblShow=this.tbl.length>0?true:false;
    });
  }

  setTime(data){
    switch (data) {case 'm':this.timeOfDay='Morning';break;case 'a':this.timeOfDay='Afternoon';break;case 'e':this.timeOfDay='Evening';break;}
    this.firstModal=!this.firstModal;
  }

  back(){
    this.firstModal=!this.firstModal;
  }

  update(){
    let tempObj={}
    tempObj['tablename'] = '';
    tempObj['location'] = this.location;;
    tempObj['timeOfDay']=this.getCodedName(this.timeOfDay);
    tempObj['date'] = this.todayDate;
    tempObj['_id'] = this.bigI._id;
    tempObj['method'] = 'updatetbl';
    tempObj['tbltype'] = 'update';
    this.apiCallservice.handleData_New_python('turnbook', 1,tempObj , true)
    .subscribe((res: any) => {
      alert(res.Status);
      this.tbl[this.bigJ]['currentLocation'].push({'location':this.location,'date':this.todayDate,'timeOfDay':this.timeOfDay})
    });
  }

  completeTrip(){
    let tempObj={};
    tempObj['_id']=this.bigI['_id'];
    tempObj['method'] = 'tripComplete';
    tempObj['tablename'] = 'turnbook';
    
    this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, true)
    .subscribe((res: any) => {
      alert('Updated');
    });
  }

  findName(data){
    switch (data) {
      case 'M':return 'Morning';
      case 'A':return 'Afternoon';
      case 'E':return 'Evening';
    }
  }
    getCodedName(data){
    switch (data) {
      case 'Morning':return 'M';
      case 'Afternoon':return 'A';
      case 'Evening':return 'E';
    }
  }
  getName(data){
    switch (data) {
      case '1':return 'M';
      case '2':return 'A';
      case '3':return 'E';
    }
  }

  changeInner(i,j,l,data){
    let tempObj={}
    let d;
    switch (data) {
      case 'time':
        d = parseInt(prompt('Current Time is '+this.findName(l.timeOfDay)+', Enter one option.\n1.Morning\n2.Afternoon\n3.Evening'));
        if(d>3||d<1||isNaN(d)){alert('Enter values in range.')}
        else{
          console.log(d);
          
          tempObj={}
          tempObj['tablename'] = '';
          tempObj['data'] = this.getName(d);
          tempObj['_id'] = i._id;
          tempObj['l']=l;
          tempObj['method'] = 'updatetbl';
          tempObj['tbltype'] = 'edit';
          tempObj['type'] = 'timeOfDay'
          console.log(tempObj);
          
          this.apiCallservice.handleData_New_python('turnbook', 1,tempObj , true)
          .subscribe((res: any) => {
            alert(res.Status);
            this.tbl[this.bigJ]['currentLocation'][j]=d;
          });
      }
      break;

      case 'loc':
        d = prompt('Current Location is '+l.location+', Enter other city to update.');
        if(d==null||d==undefined){}
        else{
        tempObj={}
        tempObj['tablename'] = '';
        tempObj['data'] = d;
        tempObj['_id'] = i._id;
        tempObj['l']=l;
        tempObj['method'] = 'updatetbl';
        tempObj['tbltype'] = 'edit';
        tempObj['type'] = 'location'
        this.apiCallservice.handleData_New_python('turnbook', 1,tempObj , true)
        .subscribe((res: any) => {
          alert(res.Status);
          this.tbl[this.bigJ]['currentLocation'][j]=d;
        });
      }
      break;
    }
  }

  delete(i,p,j){
    if(confirm('Are you sure?')){
    let tempObj={}
    tempObj['tablename'] = '';
    tempObj['index'] = p;
    tempObj['_id'] = i;
    tempObj['method'] = 'updatetbl';
    tempObj['tbltype'] = 'delete';
    this.apiCallservice.handleData_New_python('turnbook', 1,tempObj , true)
    .subscribe((res: any) => {
      alert(res.Status);
      this.tbl[j]['currentLocation'].splice(p, 1);
      let a = this.tbl.filter(r=>{return r._id==i})[0]
      a['updateTBL']=a.currentLocation.at(-1).location===a.location?true:false
    });
    }else{}
  }

  download(){
         let bigValueofY=0;
         var doc = new jsPDF()
         doc.setFontSize('20');
         doc.setFontType('bold');
         doc.setTextColor(234, 1, 0);
         doc.text('NITIN ROADWAYS AND CARGO MOVERS', 30, 8)//partyname
         doc.setFontSize('15');
         doc.setTextColor(215, 6, 9);
         doc.text('Tracking of Vehicles', 60, 15)//partyname
         doc.setFontSize('10');
         doc.setTextColor(0, 0, 0);
         doc.setFontSize('10');
         doc.text('Details For : ', 165, 15)
         doc.text(this.hf.getDateddmmyy(this.hf.createDate(new Date)), 165, 19)//date
         doc.setFontSize('25');
         doc.setLineWidth(0.5);
         doc.line(0, 20, 210, 20);//line after main header
         doc.line(20, 20, 20, 300);//punching area line
         //headers
         doc.setFontSize('10');
         let y = 30;
         doc.line(0, 148.2, 5, 148.2);//punching line helper
         doc.text('Now', 8, y-6)//partyname
         doc.text('Sr', 21, y-6)//partyname
         doc.text('Date', 30, y-6)//partyname
         doc.text('Truck No.', 50, y-6)//partyname
         doc.text('Party', 78, y-6)//partyname
         doc.text('Place', 98, y-6)//partyname
         doc.text('Current Location', 135, y-6)//partyname
        doc.text('Contact', 185, y-6)//partyname
        doc.line(0, 25, 210, 25);//line after header
         for (let i = 0; i < this.tbl.length; i++) {
     
          
           if(y>290){
              doc.line(25, 20, 25, bigValueofY);//srno
              doc.line(47, 20, 47, bigValueofY);//date
              doc.line(75, 20, 75, bigValueofY);//truckno
              doc.line(92, 20, 92, bigValueofY);//lrno
              doc.line(120, 20, 120, bigValueofY);//credit
              doc.line(179, 20, 179, bigValueofY);//balance
              doc.line(20, bigValueofY, 210, bigValueofY);//line after header
  
             y=30;
             bigValueofY=0;
             doc.addPage();
             doc.setFontSize('20');
         doc.setFontType('bold');
    
         doc.setTextColor(234, 1, 0);
         doc.text('NITIN ROADWAYS AND CARGO MOVERS', 30, 8)//partyname
         doc.setFontSize('15');
         doc.setTextColor(215, 6, 9);
         doc.text('Tracking of Vehicles', 60, 15)//partyname
         doc.setFontSize('10');
         doc.setTextColor(0, 0, 0);
         doc.setFontSize('10');
         doc.text('Details For Date : ', 165, 15)
         doc.text(this.hf.getDateddmmyy(this.hf.createDate(new Date)), 165, 19)//date
         doc.setFontSize('25');
         doc.setLineWidth(0.5);
         doc.line(0, 20, 210, 20);//line after main header
         doc.line(20, 20, 20, 300);//punching area line
         //headers
         doc.line(0, 148.2, 5, 148.2);//punching line helper
         doc.setFontSize('10');
         doc.text('Now', 8, y-6)//partyname
         doc.text('Sr', 21, y-6)//partyname
         doc.text('Date', 30, y-6)//partyname
         doc.text('Truck No.', 50, y-6)//partyname
         doc.text('Party', 78, y-6)//partyname
         doc.text('Place', 98, y-6)//partyname
         doc.text('Current Location', 135, y-6)//partyname
          doc.text('Contact', 185, y-6)//partyname
    doc.line(0, 25, 210, 25);//line after header
         
         //headers
          doc.line(0, 24, 210, 24);//line after header
          doc.line(0, 29, 210, 29);//line after header
         }
  
          doc.text(String(i+1), 20.5, y-1)//partyname
          doc.text(this.hf.getDateddmmyy(this.tbl[i].loadingDate), 27, y-1)//partyname
          doc.text(this.tbl[i].truckno, 48, y-1)//truckno
          doc.text(this.tbl[i].partys, 78, y-1)//truckno
          doc.text(this.tbl[i].place, 94, y-1)//truckno
          doc.text(this.tbl[i].contacttb, 185, y-1)//truckno
          for(let ii=0;ii<this.tbl[i].currentLocation.length;ii++){
            doc.text(this.hf.getDateddmmyy(this.tbl[i].currentLocation[ii]['date'],'ddmmyy')+'-'+ this.findName(this.tbl[i].currentLocation[ii]['timeOfDay'])+'-'+this.tbl[i].currentLocation[ii]['location'], 122, y-1+(ii*5))//truckno
          }
          y=y+(5*this.tbl[i].currentLocation.length===0?5:5*this.tbl[i].currentLocation.length);
            doc.line(0, y -5, 210, y -5);//line after header
          bigValueofY=y-5;
         }
    
      
         doc.line(25, 20, 25, bigValueofY);//srno
         doc.line(47, 20, 47, bigValueofY);//date
         doc.line(75, 20, 75, bigValueofY);//truckno
         doc.line(92, 20, 92, bigValueofY);//lrno
         doc.line(120, 20, 120, bigValueofY);//credit
         doc.line(179, 20, 179, bigValueofY);//balance
         doc.line(20, bigValueofY, 210, bigValueofY);//line after header
  
         doc.save('Tracking.pdf')
       }

}
