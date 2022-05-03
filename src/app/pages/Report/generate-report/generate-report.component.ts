import { Component, OnInit } from '@angular/core';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css'],
  providers: [ApiCallsService]
})
export class GenerateReportComponent implements OnInit {
public options=[
  {value:'1',viewValue:'Pan'},
  {value:'2',viewValue:'Account'},
  {value:'3',viewValue:'Contact'},
  {value:'4',viewValue:'Truck Payment PDF C'}
]
public selectedOption;
public buttonOption;
public buttonValue;
public tempObj={};
public years=[];
public selectedMY;
public buttons=[];
public emptyData;
public toFillData=[];
public selectDate=false;
public showTable=false;
public truckid='';
public trucks;
public fdate;
public tdate;
public truckAllData;
  constructor(
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public sec: SecurityCheckService,
    public handleF:handleFunction
  ) {
  }

  ngOnInit() {
  this.buttons=this.getButtons();
  }

  getTruckId(){
    this.selectDate=true
  }

  getAllTruckData(){
    this.showTable=true;
    let temp={
      'method':'getAllTrucksTEMP',
      'tablename':'',
      'ownerid':this.truckid,
      'from':this.fdate,
      'to':this.tdate
    }
    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, temp, 0)
    .subscribe((res: any) => {
      this.truckAllData=res.Data;
      this.showTable=true;
    });
  }

  getAllTrucks(){
    let temp={
      'method':'getAllTrucks',
      'tablename':''
    }
    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, temp, 0)
    .subscribe((res: any) => {
      this.trucks=res.Data
    });
  }

  setOptionValues(){
    this.buttonOption = this.selectedOption;
    this.buttonValue = this.options[parseInt(this.selectedOption) - 1].viewValue;
    if(this.buttonOption==='2'){
      this.getData(5)
    }
    if(this.buttonOption==='3'){
      this.getData(98)
    }
    if(this.buttonOption==='4'){
      this.getAllTrucks()
    }
  }

  getButtons() {
    let buttons=[]
    let index=0;
        for (let i = 0; i < new Date().getFullYear() - 2019; i++) {
          this.years.push(i + 2020)
        }
        for (let i = 0; i < this.years.length; i++) {
          let months = new Date().getFullYear() - this.years[i] == 0 ? new Date().getMonth() + 1 : 12;
          for (let j = 0; j < months; j++) {
            let date = new Date(String(i + 2020) + '-' + this.handleF.generate2DigitNumber(String(j + 1)) + '-01');
            let month = date.toLocaleString('default', { month: 'short' });
            this.tempObj['value'] =  String(i + 2020) + "-" + this.handleF.generate2DigitNumber(String(j + 1)) + "-01_"+String(i + 2020) + "-" + this.handleF.generate2DigitNumber(String(j + 1)) + "-31";
            this.tempObj['viewValue'] = month + '-' + String(i + 2020).slice(-2);
            this.tempObj['option']=1;
            this.tempObj['index']=index;
            buttons.push(this.tempObj);
            this.tempObj = {}
            index=index+1;
          }
          
        }
        buttons.push({'value':'""_""','viewValue':'All','option':2,'index':index});
        return buttons;
      }

      getData(option){
        let tempObj={};
        tempObj['from']=this.buttonOption==='1'?(this.buttons[parseInt(this.selectedMY)]['option']===1?this.buttons[parseInt(this.selectedMY)]['value'].split('_')[0]:null):null;
        tempObj['to']=this.buttonOption==='1'?(this.buttons[parseInt(this.selectedMY)]['option']===1?this.buttons[parseInt(this.selectedMY)]['value'].split('_')[1]:null):null;
        tempObj['method']='pipelinePan'
        tempObj['tablename']='';
        tempObj['option']=this.buttonOption==='1'?this.buttons[parseInt(this.selectedMY)]['option']:option;
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
        .subscribe((res: any) => {
        this.emptyData=res.chartData;
        });
      }
      downloadPanReport(data,option){
        let tempObj={};
        tempObj['from']=this.buttonOption==='1'? (this.buttons[parseInt(this.selectedMY)]['option']===1?this.buttons[parseInt(this.selectedMY)]['value'].split('_')[0]:null):this.handleF.reverseArray(data['_id'],'-')+'-01';
        tempObj['to']=this.buttonOption==='1'? (this.buttons[parseInt(this.selectedMY)]['option']===1?this.buttons[parseInt(this.selectedMY)]['value'].split('_')[1]:null):this.handleF.reverseArray(data['_id'],'-')+'-31';
        tempObj['partyType']=this.buttonOption==='1'?data['_id']:'';
        tempObj['method']='pipelinePan'
        tempObj['tablename']='';
        tempObj['option']=this.buttonOption==='1'?(this.buttons[parseInt(this.selectedMY)]['option']===2?3:4):option;
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
        .subscribe((res: any) => {
          this.toFillData=res.chartData;
          if(this.buttonOption==='1'){
          this.generateReport(this.toFillData);
          }else if(this.buttonOption==='2'){
          this.generateReportAccount(this.toFillData)
          }
        });
      }

      downloadContactReport(data){
        let tempObj={};
        tempObj['from']=this.handleF.reverseArray(data['_id'],'-')+'-01';
        tempObj['to']=this.handleF.reverseArray(data['_id'],'-')+'-31';
        tempObj['partyType']='';
        tempObj['method']='pipelineContact'
        tempObj['tablename']='';
        tempObj['option']=986;
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
        .subscribe((res: any) => {
          this.toFillData=res.chartData;
          this.generateReportContact(this.toFillData)
        });
      }

      generateReport(data){//threshhold is 295
        let pager=1;
         let bigValueofY=0;
         var doc = new jsPDF()
         doc.setFontSize('25');
         doc.setFontType('bold');
         doc.text('PAN DETAILS : '+this.buttons[parseInt(this.selectedMY)]['value'], 15, 15)//partyname
         doc.setFontSize('10');
        //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
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
         doc.text('Date', 32, y)//partyname
         doc.text('TruckNo', 56, y)//partyname
         doc.text('Owner Name', 86, y)//partyname
         doc.text('PAN', 150, y)//partyname
         //headers
         doc.line(0, 25, 210, 25);//line after header
     
         //vertical lines
         doc.line(30, 20, 30, 25);//srno
         doc.line(55, 20, 55, 25);//date
         doc.line(83, 20, 83, 25);//truckno
         doc.line(148, 20, 148, 25);//credit
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
         doc.text('PAN DETAILS : '+this.buttons[parseInt(this.selectedMY)]['value'], 15, 15)//partyname
         doc.setFontSize('10');
        //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
         doc.text(String(pager), 180, 5)//pageno
         pager=pager+1;
         doc.setFontSize('25');
         doc.setLineWidth(0.5);
         doc.line(0, 20, 210, 20);//line after main header
         doc.line(20, 20, 20, 300);//punching area line
         //headers
         doc.setFontSize('10');
         doc.text('Sr', 23, y-6)//partyname
         doc.text('Date', 32, y-6)//partyname
         doc.text('TruckNo', 56, y-6)//partyname
         doc.text('Owner Name', 86, y-6)//partyname
         doc.text('PAN', 150, y-6)//partyname
         //headers
         doc.line(0, 25, 210, 25);//line after header
     
         //vertical lines
         doc.line(30, 20, 30, 25);//srno
         doc.line(55, 20, 55, 25);//date
         doc.line(83, 20, 83, 25);//truckno
         doc.line(148, 20, 148, 25);//credit
         //vertical lines
         }
         
          doc.text(String(i+1), 23, y)//partyname
          doc.text(this.handleF.getDateddmmyy(data[i].loadingDate), 32, y)//partyname
         doc.text(data[i].truckno, 56, y)//partyname
         doc.text('', 86, y)//partyname
         doc.text('', 150, y)//partyname
                    
           doc.line(20, y + 1, 210, y + 1);//line after header
           y = y + 5;
     
           
         //vertical lines//getting applied for every loop, make it happen once only
         doc.line(30, starty, 30, y - 4);//srno
         doc.line(55, starty, 55, y - 4);//date
         doc.line(83, starty, 83, y - 4);//truckno
         doc.line(148, starty, 148, y - 4);//credit
         //vertical lines
         bigValueofY=y;
         }
    
         doc.save('PAN-Details.pdf')
       }


       generateReportAccount(data){//threshhold is 295
        data=this.handleF.removeDuplicates(data)
        let pager=1;
         let bigValueofY=0;
         var doc = new jsPDF()
         doc.setFontSize('25');
         doc.setFontType('bold');
         doc.text('Account Details : ', 15, 15)//partyname
         doc.setFontSize('10');
        //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
         doc.text(String(pager), 180, 5)//pageno
         pager=pager+1;
         doc.setFontSize('25');
         doc.setLineWidth(0.5);
         doc.line(0, 20, 210, 20);//line after main header
         //headers
         doc.setFontSize('10');
         let y = 24;
         let starty = 24;
         doc.text('Sr', 3, y)//partyname
         doc.text('Date', 22, y)//partyname
         doc.text('TruckNo', 36, y)//partyname
         doc.text('Account', 66, y)//partyname
         doc.text('Contact', 130, y)//partyname
         //headers
         doc.line(0, 25, 210, 25);//line after header
     
         //vertical lines
         doc.line(10, 20, 10, 25);//srno
         doc.line(35, 20, 35, 25);//date
         doc.line(63, 20, 63, 25);//truckno
         doc.line(128, 20, 128, 25);//credit
         //vertical lines
         let startforI=0;
         y = y + 6;
         startforI=0;
         for (let i = startforI; i < data.length; i++) {
     
           if(y>290){
             y=24;
             y=y+6;
         starty = 24;
             doc.addPage();
             doc.setFontSize('25');
         doc.setFontType('bold');
         doc.text('Account Details : ', 15, 15)//partyname
         doc.setFontSize('10');
        //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
         doc.text(String(pager), 180, 5)//pageno
         pager=pager+1;
         doc.setFontSize('25');
         doc.setLineWidth(0.5);
         doc.line(0, 20, 210, 20);//line after main header
         //headers
         doc.setFontSize('10');
         doc.text('Sr', 3, y-6)//partyname
         doc.text('Date', 22, y-6)//partyname
         doc.text('TruckNo', 36, y-6)//partyname
         doc.text('Account', 66, y-6)//partyname
         doc.text('Contact', 130, y-6)//partyname
         //headers
         doc.line(0, 25, 210, 25);//line after header
     
         //vertical lines
         doc.line(10, 20, 10, 25);//srno
         doc.line(35, 20, 35, 25);//date
         doc.line(63, 20, 63, 25);//truckno
         doc.line(128, 20, 128, 25);//credit
         //vertical lines
         }
         
          doc.text(String(i+1), 3, y)//partyname
          doc.text(this.handleF.getDateddmmyy(data[i].loadingDate), 12, y)//partyname
         doc.text(data[i].truckno, 36, y)//partyname
         if(data[i].accountDetails[0]!==undefined){
         doc.text(data[i].accountDetails[0].accountName, 66, y)//partyname
         doc.text(String(data[i].accountDetails[0].accountNumber), 66, y+4)//partyname
         doc.text(data[i].accountDetails[0].ifsc, 66, y+8)//partyname
         }
         if(data[i].contactDetails[0]!==undefined){
          doc.text(data[i].contactDetails[0], 130, y)//partyname
          }
                    
           doc.line(0, y + 11, 210, y + 11);//line after header
           y = y + 15;
     
           
         //vertical lines//getting applied for every loop, make it happen once only
         doc.line(10, starty, 10, y-4);//srno
         doc.line(35, starty, 35, y-4);//date
         doc.line(63, starty, 63, y-4);//truckno
         doc.line(128, starty, 128, y-4);//credit
         //vertical lines
         }
    
         doc.save('Account-Details.pdf')
       }
       generateReportContact(data){//threshhold is 295
        var doc = new jsPDF()
        doc.setFontType('bold');
        doc.setFontSize('10');
        doc.setLineWidth(0.5);
        //headers
        let y = 4;
        doc.text('Sr', 0.5, y)//partyname
        doc.text('Date', 10.5, y)//partyname
        doc.text('TruckNo', 10.5, y+4)//partyname
        doc.text('Name', 45, y)//partyname
        doc.text('Contact', 78, y)//partyname
    
        doc.text('Sr', 105.5, y)//partyname
        doc.text('Date', 115.5, y)//partyname
        doc.text('TruckNo', 115.5, y+4)//partyname
        doc.text('Name', 150, y)//partyname
        doc.text('Contact', 183, y)//partyname
    
        doc.line(0, 9, 210, 9);//line after main header
        //headers
    
        y=10
        let newpage=0;
        for (let i = 0; i < data.length; i++) {
    
         if(y>290){
           newpage=newpage+1;
           doc.line(105, 0, 105, 300);//mid line
           doc.line(8, 0, 8, 300);//mid line
           doc.line(40, 0, 40, 300);//mid line
           doc.line(75, 0, 75, 300);//mid line
           doc.line(113, 0, 113, 300);//mid line
           doc.line(145, 0, 145, 300);//mid line
           doc.line(180, 0, 180, 300);//mid line
           if(newpage===2){
           doc.addPage();
           newpage=0;
           doc.setFontType('bold');
           doc.setFontSize('10');
           doc.setLineWidth(0.5);
           //headers
           y = 4;
           doc.text('Sr', 0.5, y)//partyname
           doc.text('Date', 10.5, y)//partyname
           doc.text('TruckNo', 10.5, y+4)//partyname
           doc.text('Name', 45, y)//partyname
           doc.text('Contact', 78, y)//partyname
    
           doc.text('Sr', 105.5, y)//partyname
           doc.text('Date', 115.5, y)//partyname
           doc.text('TruckNo', 115.5, y+4)//partyname
           doc.text('Name', 150, y)//partyname
           doc.text('Contact', 183, y)//partyname
    
           doc.line(0, 9, 210, 9);//line after main header
           //headers
           y=10
           //vertical lines
           }
    y=10
       }
       if(newpage===0){
        doc.text(this.handleF.generate2DigitNumber(String(i+1)), 0.5, y+4)//partyname
        doc.text(data[i].truckno, 10.5, y+4)//partyname
         doc.text(this.handleF.getDateddmmyy(data[i].loadingDate), 10.5, y+8)//partyname
           
         doc.line(0, y+9, 105, y+9);//line after main header
         y = y + 9;
       }
    if(newpage===1){
      doc.text(this.handleF.generate2DigitNumber(String(i+1)), 105.5, y+4)//partyname
      doc.text(data[i].truckno, 115.5, y+4)//partyname
      doc.text(this.handleF.getDateddmmyy(data[i].loadingDate),115.5 , y+8)//partyname
        
      doc.line(105, y+9, 210, y+9);//line after main header
      y = y + 9;
    }
      
        }
    
        doc.line(105, 0, 105, y);//mid line
        doc.line(8, 0, 8, y);//mid line
        doc.line(40, 0, 40, y);//mid line
        doc.line(75, 0, 75, y);//mid line
        doc.line(113, 0, 113, y);//mid line
        doc.line(145, 0, 145, y);//mid line
        doc.line(180, 0, 180, y);//mid line
        doc.save('Contact-Details.pdf')
      }
      selectDatesNow(){
        this.selectDate=true;
        this.showTable=false;
      }
      getTruckPaymentPDFComplex(){

      }

      // download(){//threshhold is 295
      //   let data=this.temp;
      
      //     let pager=1;
      //      var doc = new jsPDF()
      //      doc.setFontSize('25');
      //      doc.line(0, 148.2, 5, 148.2);//punching line helper
      //      doc.setFontType('bold');
      //      doc.text('Account : ', 15, 15)//partyname
      //      doc.setFontSize('10');
      //      doc.text(String(pager), 180, 5)//pageno
      //      pager=pager+1;
      //      doc.setFontSize('25');
      //      doc.setLineWidth(0.5);
      //      doc.line(0, 20, 210, 20);//line after main header
      //      //headers
      //      doc.setFontSize('10');
      //      let y = 24;
      //      let starty = 25;
      //      doc.text('Sr', 2, y)//partyname
      //      doc.text('TruckNo', 8, y)//partyname
      //      doc.text('Account Details', 36, y)//partyname
      //      doc.text('12', 166, y)//partyname
      //      doc.text('363', 188, y)//partyname
      //      //headers
      //      doc.line(0, 25, 210, 25);//line after header
       
      //      //vertical lines
      //      doc.line(7, 20, 7, 25);//srno
      //      doc.line(33, 20, 33, 25);//date
      //      doc.line(100, 20, 100, 25);//date
      //      doc.line(165, 20, 165, 25);//date
      //      doc.line(187, 20, 187, 25);//date
      //      //vertical lines
      //      let startforI=0;
      //      y = y + 6;
      //      startforI=0;
      //      for (let i = startforI; i < data.length; i++) {
       
      //        if(y>276){
      //         doc.line(7, starty, 7, y-4);//srno
      //         doc.line(33, starty, 33, y-4);//date 
      //         doc.line(100, starty, 100, y-4);//date
      //         doc.line(165, starty, 165, y-4);//date
      //         doc.line(187, starty, 187, y-4);//date
      //          y=24;
      //          y=y+6;
      //      starty = 25;
      //          doc.addPage();
      //          doc.setFontSize('25');
      //      doc.setFontType('bold');
      //      doc.text('Account : ', 15, 15)//partyname
      //      doc.setFontSize('10');
      //      doc.text(String(pager), 180, 5)//pageno
      //      pager=pager+1;
      //      doc.setFontSize('25');
      //      doc.setLineWidth(0.5);
      //      doc.line(0, 20, 210, 20);//line after main header
      //      //headers
      //      doc.setFontSize('10');
      //      doc.text('Sr', 2, y-6)//partyname
      //      doc.text('TruckNo', 8, y-6)//partyname
      //      doc.text('Account Details', 36, y-6)//partyname
      //      doc.text('12', 166, y-6)//partyname
      //      doc.text('363', 188, y-6)//partyname
      //      //headers
      //      doc.line(0, 25, 210, 25);//line after header
       
      //      //vertical lines
      //      doc.line(7, 20, 7, 25);//srno
      //      doc.line(33, 20, 33, 25);//date
      //      doc.line(100, 20, 100, 25);//date
      //      doc.line(165, 20, 165, 25);//date
      //      doc.line(187, 20, 187, 25);//date
      //      //vertical lines
      //      }
      //      doc.text(this.handleF.generate2DigitNumber(String(i+1)), 1, y-1)//partyname
      //      doc.text(data[i]['truckno'], 8, y)//Name
      //       doc.text('Name : '+data[i]['accountDetails'][0]['accountName'], 36, y)//Name
      //       doc.text('No   : '+data[i]['accountDetails'][0]['accountNumber'], 36, y+5)//Pan
      //       doc.text('IFSC  : '+data[i]['accountDetails'][0]['ifsc'], 36, y+10)//Contact
                      
      //        doc.line(0, y + 11, 210, y + 11);//line after header
      //        y = y + 15;
       
           
           
      //      }
      // //vertical lines//getting applied for every loop, make it happen once only
      // doc.line(7, starty, 7, y-4);//srno
      //         doc.line(33, starty, 33, y-4);//date 
      //         doc.line(100, starty, 100, y-4);//date
      //         doc.line(165, starty, 165, y-4);//date
      //         doc.line(187, starty, 187, y-4);//date
      // //vertical lines
      //      doc.save('Account-Details.pdf')
      //    }
}
