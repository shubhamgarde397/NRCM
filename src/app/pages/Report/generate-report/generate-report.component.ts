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
  {value:'4',viewValue:'Truck Payment PDF C'},
  {value:'5',viewValue:'Format Trucks'},
  {value:'6',viewValue:'Poch Bill Book'},
  {value:'7',viewValue:'Dues Report'}
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
public formatDate;
public from;
public to;
public acknowledgement=false;
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

  PochBill(){//threshhold is 295
    var doc = new jsPDF()
      for(let i=this.from;i<=this.to;i++)
      {
        this.pdfData(doc,false,i);
        this.pdfData(doc,true,i);
      }

    doc.save('pochbillmain.pdf')
  }

  pdfData(doc,acknowledgement,i){
    doc.setLineDash([0.5, 1], 10);
    doc.line(0, 16, 295, 16);
    doc.setLineDash([1, 0], 10);
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
    doc.text('Bill No. :    '+String(i),10,75)
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
    if(acknowledgement){
      doc.text("Receiver's Signature ___________________",68.5,165)
    }else{
      doc.text("Signature ___________________",87,165)
    }
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
    // Acknowledgement
    if(acknowledgement){
      doc.setFontSize('12');
      doc.setFontType('bold');
      doc.text('ACKNOWLEDGEMENT SLIP',49,205)
      }
      // Acknowledgement
    doc.addPage()
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
    if(this.buttonOption==='5'){
      this.getIncorrectFormatTrucks();
    }
    if(this.buttonOption==='7'){
      this.generateDuesReport();
    }
  }

  getIncorrectFormatTrucks(){
        let tempObj={};
        tempObj['method']='pipelinePan'
        tempObj['tablename']='';
        tempObj['option']=987;
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, 1)
        .subscribe((res: any) => {
        this.formatDate=res.chartData;
        });
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

      generateDuesReport(){
        let tempObj={};
        tempObj['method']='DuePDFforTransport'
        tempObj['tablename']='';
        this.apiCallservice.handleData_New_python('turnbook', 1, tempObj, 1)
        .subscribe((res: any) => {
          this.generateDuesReportPDF(res.Data)
        });
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
  
          let y=24;
         doc.setFontSize('10');
         
         for (let i = 0; i < data.length; i++) {
     
              if(y>200){
                y=30;
  
                doc.addPage();
  
                var doc = new jsPDF()
                doc.setFontSize('25');
                doc.setFontType('bold');
                doc.text('DUES', 15, 15)//partyname
       
                doc.setFontSize('10');
                doc.text(String(pager), 180, 5)//pageno
       
                pager=pager+1;
                doc.setFontSize('25');
                doc.setLineWidth(0.5);
                doc.line(0, 20, 210, 20);//line after main header
                doc.line(12, 20, 12, 300);//punching area line
                //headers
       
       
                doc.setFontSize('10');
              
                }
  // 146 horizontal threshhold
                  doc.setLineDash([0,0], y);
                    doc.text('Name : '+data[i]['tpt'][0]['tptName'], 15, y)//partyname
                  y=y+10;
  
                    doc.text('Total Loan', 15, y)//partyname
                    doc.text('Reason', 45, y)//partyname
                    doc.text('Loan Taken', 65, y)//partyname
                    doc.text('Loan Date', 95, y)//partyname
                    doc.text('Pending', 125, y)//partyname
  
                    doc.text(String(data[i]['amt']), 15, y+5)//partyname
                    doc.text(data[i]['reason'], 45, y+5)//partyname
                    doc.text(String(data[i]['totalTaken']), 65, y+5)//partyname
                    doc.text(String(data[i]['date']), 95, y+5)//partyname
                    doc.text(String(data[i]['totalPending']), 125, y+5)//partyname
  
                            
                    //vertical lines
                    doc.line(43, y-5, 43, y +6);//srno
                    doc.line(63, y-5, 63, y +6);//date
                    doc.line(93, y-5, 93, y +6);//truckno
                    doc.line(123, y-5, 123, y +6);//credit
  
                    doc.line(12, y-5, 150, y-5);//credit
                    doc.line(12, y+1, 150, y+1);//credit
                    doc.line(12, y+6, 150, y+6);//credit
  
                    //vertical lines
  
                    
                    y = y + 15;
                    if(data[i]['info'].length>0){
                    let smally=y
                        doc.setLineDash([0,0], y);
                        doc.text('Sr', 15, y)//partyname
                        doc.text('Truckno', 21, y)//partyname
                        doc.text('Date', 51, y)//partyname
                        doc.text('Amt Taken', 81, y)//partyname
                        doc.line(12, y+1, 110, y+1);//truckno 
                      //vertical lines
                        doc.line(12, smally-5, 110, smally-5);//srno
                        doc.line(50, smally-5, 110, smally-5);//date
                        doc.line(80, smally-5, 110, smally-5);//truckno
                        //vertical lines
  
          for(let l=0;l<data[i]['info'].length;l++){
  
            doc.text(String(l+1), 15, y+5);//partyname
            doc.text(data[i]['info'][l]['tbid'], 21, y+5)//partyname
            doc.text(data[i]['info'][l]['date'], 51, y+5)//partyname
            doc.text(String(data[i]['info'][l]['dueAmtTaken']), 81, y+5)//partyname
            doc.line(12, y+6, 110, y+6);//truckno 
            y = y + 5;
  
          }
  
          //vertical lines
  
          doc.line(20, smally-5, 20, y);//srno
          doc.line(50, smally-5, 50, y);//date
          doc.line(80, smally-5, 80, y);//truckno
          doc.line(110, smally-5, 110, y+1);//credit
  
        }else{
          doc.text('Dues not taken yet',15,y);
          y=y+5;
        }
  
          //vertical lines
  
          
          y = y + 3;
          doc.setLineDash([2, 1], y);
          doc.line(12, y + 1, 210, y + 1);//line after header
          doc.line(12, y + 2, 210, y + 2);//line after header
          doc.setLineDash([0,0], y);
          y = y + 10;
    
  
        }
  
  
    
         doc.save('Dues.pdf')
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
             doc.line(30, 25, 30, 295);//srno
             doc.line(55, 25, 55, 295);//date
             doc.line(83, 25, 83, 295);//truckno
             doc.line(148, 25, 148, 295);//credit
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
                    
           doc.line(20, y + 5, 210, y + 5);//line after header
           y = y + 9;
     
           
         //vertical lines//getting applied for every loop, make it happen once only

         //vertical lines
         bigValueofY=y;
         }

         doc.line(30, starty, 30, y - 4);//srno
         doc.line(55, starty, 55, y - 4);//date
         doc.line(83, starty, 83, y - 4);//truckno
         doc.line(148, starty, 148, y - 4);//credit
    
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
