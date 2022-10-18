import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from '../common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';
import { handleFunction } from '../common/services/functions/handleFunctions';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  public avatar: any;
  public bin: number;
  binNumber = [];
  public arr=[];
  public commonArray;
public dues;
  constructor(public apiCallservice: ApiCallsService, public router: Router, public handledata: HandleDataService,public hF:handleFunction,
    public securityCheck: SecurityCheckService, public spin: Ng4LoadingSpinnerService, public sec: SecurityCheckService) { }

  ngOnInit() {
this.arr=this.handledata.getLRStatus();
this.fetchData();
  }

  fetchData = function () {
    this.commonArray = this.sec.commonArray;
    this.dues = this.commonArray.dues;
  };

  findBin() {
    let number = this.bin;
    let tempBin = 0;
    let arr = [];
    while (number !== 1) {
      tempBin = number % 2;
      arr.push(tempBin);
      number = Math.floor(number / 2);
    }
    tempBin = number % 2;
    arr.push(tempBin);
    this.binNumber = arr.reverse();
    tempBin = 0;
    arr = [];
  }


  storeImage(image) {
  }

  moveTo(data) {
    switch (data) {
      case 'partyAdd':
        this.router.navigate(['Navigation/PARTY_PAYMENT_HANDLER/Add'])
        break;
      case 'partyDisplay':
        this.router.navigate(['Navigation/PARTY_PAYMENT_HANDLER/Display'])
        break;
      case 'turnAdd':
        this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookAdd'])
        break;
      case 'turnDisplay':
        this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookDispHandler'])
        break;
      case 'truckdetails':
        this.router.navigate(['Navigation/OWNER_HANDLER'])
        break;
    }

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
                doc.text('Loan Date : '+this.hF.getDateddmmyy(data['date']), 15, 35)//partyname
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
              



     doc.save(data['truckno']+'.pdf')
   }

}
