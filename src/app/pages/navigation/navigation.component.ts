import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { Location } from '@angular/common';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [ApiCallsService, HandleDataService],
})
@Input()
export class NavigationComponent implements OnInit {
  public data;

  public now = new Date();
  public day = this.now.getDate();
  public month = this.now.getMonth();
  public year = this.now.getFullYear();
  public date = new Date();
  public username;
  public role = 0;
  public nameOfUser = 'Guest';
  public arr=[];
  public turnbooklist;

  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public location: Location,
    public hd:HandleDataService,
    public securityCheck: SecurityCheckService,
    public spin: Ng4LoadingSpinnerService,
    public obs: ObsServiceService,
    public hF: handleFunction,
    public spinnerService: Ng4LoadingSpinnerService,
  ) { }

  ngOnInit() {
    this.username = this.securityCheck.dname;
    this.month = this.date.getMonth() + 1
    this.year = this.date.getFullYear();
    }

    makeAllFalse(){
    }

 
  logout() {
    this.router.navigate(['']);
  }
getData(){
  let temp={
    "turnbookDate":"2021-04-01",
    "tablename":"commoninformation",
    "method":"displayTB",
    "display":"1",
  }
  this.apiCallservice.handleData_New_python
    ('commoninformation', 1, temp, 0)
    .subscribe((res: any) => {
      this.turnbooklist=res.Data
      this.downloadAvailable();
    });
 
}
  downloadAvailable(){//threshhold is 295
    let data=this.turnbooklist;
  console.log(this.turnbooklist);
  
      let pager=1;
       var doc = new jsPDF()
       doc.setFontSize('25');
       doc.line(0, 148.2, 5, 148.2);//punching line helper
       doc.setFontType('bold');
       doc.setFontSize('10');
       doc.text(String(pager), 180, 5)//pageno
       pager=pager+1;
       doc.setFontSize('25');
       doc.setLineWidth(0.5);
       doc.line(0, 10, 210, 10);//line after main header
       //headers
       doc.setFontSize('10');
       let y = 14;
       let starty = 15;
       doc.text('Sr', 2, y)//partyname
       doc.text('TruckNo', 8, y)//partyname
       doc.text('Account Details', 36, y)//partyname
       doc.text('Docs', 105, y)//partyname
       doc.text('No', 120, y)//partyname
       //headers
       doc.line(0, 15, 210, 15);//line after header
   
       //vertical lines
       doc.line(7, 10, 7, 15);//srno
       doc.line(33, 10, 33, 15);//date
       doc.line(103, 10, 103, 15);//date
       doc.line(118, 10, 118, 15);//date
       //vertical lines
       let startforI=0;
       y = y + 6;
       startforI=0;
       for (let i = startforI; i < data.length; i++) {
   
         if(y>205){
          doc.line(7, starty, 7, y-4);//srno
          doc.line(33, starty, 33, y-4);//date 
          doc.line(103, starty, 103, y-4);//date
          doc.line(118, starty, 118, y-4);//date
           y=14;
           y=y+6;
       starty = 15;
           doc.addPage();
           doc.setFontSize('25');
       doc.setFontType('bold');
       doc.setFontSize('10');
       doc.text(String(pager), 180, 5)//pageno
       pager=pager+1;
       doc.setFontSize('25');
       doc.setLineWidth(0.5);
       doc.line(0, 10, 210, 10);//line after main header
       //headers
       doc.setFontSize('10');
       doc.text('Sr', 2, y-6)//partyname
       doc.text('TruckNo', 8, y-6)//partyname
       doc.text('Account Details', 36, y-6)//partyname
       doc.text('Docs', 105, y-6)//partyname
       doc.text('No', 120, y-6)//partyname
       //headers
       doc.line(0, 15, 210, 15);//line after header
   
       //vertical lines
       doc.line(7, 10, 7, 15);//srno
       doc.line(33, 10, 33, 15);//date
       doc.line(103, 10, 103, 15);//date
       doc.line(118, 10, 118, 15);//date
       //vertical lines
       }
       doc.text(this.hF.generate2DigitNumber(String(i+1)), 2, y)//partyname
        doc.text(data[i].truckno.split(' ')[0]+''+data[i].truckno.split(' ')[1]+''+data[i].truckno.split(' ')[2], 8, y)//partyname
       if(data[i]['update']){}
       else{
        doc.text(data[i]['accountDetails'].length<1?'Name : ':'Name : '+data[i]['accountDetails'][0]['accountName'], 34, y)//Name
        doc.text(data[i]['accountDetails'].length<1?'No : ':'No : '+data[i]['accountDetails'][0]['accountNumber'], 34, y+5)//Pan
        doc.text(data[i]['accountDetails'].length<1?'IFSC : ':'IFSC : '+data[i]['accountDetails'][0]['ifsc'], 34, y+10)//Contact
       }
  
        doc.text(data[i].r?'':'RC',105,y)
        doc.text(data[i].P?'':'Pan',105,y+5)
        doc.text(data[i].d?'':'DL',105,y+10)

        doc.text(data[i]['accountDetails'][0]['acc12']?'':'1',122,y)
        doc.text(data[i]['accountDetails'][0]['acc363']?'':'3',122,y+5)
        doc.text(data[i]['accountDetails'][0]['acc65']?'':'5',122,y+10)
  
  
  
  
                  
         doc.line(0, y + 11, 210, y + 11);//line after header
         y = y + 15;
   
       
       
       }
  //vertical lines//getting applied for every loop, make it happen once only
  doc.line(7, starty, 7, y-4);//srno
          doc.line(33, starty, 33, y-4);//date 
          doc.line(103, starty, 103, y-4);//date
          doc.line(118, starty, 118, y-4);//date
  //vertical lines
       doc.save('Available-Details.pdf')
     }
}