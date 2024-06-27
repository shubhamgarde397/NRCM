import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-payment-pending-display',
  templateUrl: './payment-pending-display.component.html',
  styleUrls: ['./payment-pending-display.component.css']
})
export class PaymentPendingDisplayComponent implements OnInit {

  public tbl;
  public tblShow=false;
  public myFormGroup: FormGroup;

  public show=false;

  constructor(public apiCallservice: ApiCallsService, public handleF:handleFunction,
    public securityCheck: SecurityCheckService, public handledata: HandleDataService, public spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getInformationData();
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "pendingPaymentJustDisplay", "tablename": ''};
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.tblShow=true;
        this.tbl=res.Data;
        this.spinnerService.hide();
        
      });
  }

  downloadReport(){//threshhold is 295
    let data=this.tbl;
  
      let pager=1;
       var doc = new jsPDF()
       doc.setFontSize('25');
       doc.line(0, 148.2, 5, 148.2);//punching line helper
       doc.setFontType('bold');
       doc.text('Pending Payment : ', 15, 15)//partyname
       doc.setFontSize('10');
       doc.text(String(pager), 180, 5)//pageno
       pager=pager+1;
       doc.setFontSize('25');
       doc.setLineWidth(0.5);
       doc.line(0, 20, 210, 20);//line after main header
       //headers
       doc.setFontSize('10');
       let y = 24;
       let starty = 25;
      //  srno pochdate truckno accdetails accno loading date
       doc.text('Sr', 2, y)//partyname
       doc.text('Poch Date', 8, y)//partyname
       doc.text('Truckno', 36, y)//partyname
      //  doc.text('Account Details', 81, y)//partyname
       doc.text('AccNo', 166, y)//partyname
       doc.text('LoadingDate', 188, y)//partyname
       //headers
       doc.line(0, 25, 210, 25);//line after header
   
       //vertical lines
       doc.line(7, 20, 7, 25);//srno
       doc.line(33, 20, 33, 25);//date
       doc.line(80, 20, 80, 25);//date
       doc.line(165, 20, 165, 25);//date
      //  doc.line(175, 20, 175, 25);//date
       doc.line(187, 20, 187, 25);//date
       //vertical lines
       let startforI=0;
       y = y + 1;
       startforI=0;
       for (let i = startforI; i < data.length; i++) {
   
         if(y>276){
          doc.line(7, starty, 7, y-4);//srno
          doc.line(33, starty, 33, y-4);//date 
          doc.line(80, starty, 80, y-4);//date
          doc.line(165, starty, 165, y-4);//date
          doc.line(175, starty, 175, y-4);//date
          doc.line(187, starty, 187, y-4);//date
           y=24;
           y=y+1;
       starty = 20;
           doc.addPage();
           doc.setFontSize('25');
       doc.setFontType('bold');
       doc.text('Pending Payment : ', 15, 15)//partyname
       doc.setFontSize('10');
      //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
       doc.text(String(pager), 180, 5)//pageno
       pager=pager+1;
       doc.setFontSize('25');
       doc.setLineWidth(0.5);
       doc.line(0, 20, 210, 20);//line after main header
       //headers
       doc.setFontSize('10');
       doc.text('Sr', 2, y-6)//partyname
       doc.text('Poch Date', 8, y-6)//partyname
       doc.text('Truckno', 36, y-6)//partyname
      //  doc.text('Account Details', 81, y-6)//partyname
       doc.text('AccNo', 166, y-6)//partyname
       doc.text('LoadingDate', 188, y-6)//partyname
       //headers
       doc.line(0, 25, 210, 25);//line after header
   
       //vertical lines
       doc.line(7, 20, 7, 25);//srno
       doc.line(33, 20, 33, 25);//date
       doc.line(80, 20, 80, 25);//date
       doc.line(165, 20, 165, 25);//date
      //  doc.line(175, 20, 175, 25);//date
       doc.line(187, 20, 187, 25);//date
       //vertical lines
       }
       doc.text(this.handleF.generate2DigitNumber(String(i+1)), 2, y-1)//partyname
        doc.text(this.handleF.getDateddmmyy(data[i]['pochDate']), 8, y-1)//partyname
        doc.text(data[i]['truckno'], 34, y)//Name
        // doc.text('Name : '+data[i]['aD'][0]['accountName'], 81, y)//Name
        // doc.text('Number : '+data[i]['aD'][0]['accountNumber'], 81, y+5)//Name
        // doc.text('IFSC : '+data[i]['aD'][0]['ifsc'], 81, y+10)//Name
        doc.text(String(data[i]['parentAccNo']), 166, y)//Name
        doc.text(this.handleF.getDateddmmyy(data[i]['loadingDate']), 188, y)//Name

                  
         doc.line(0, y + 11, 210, y + 11);//line after header
         y = y + 5;
   
       
       
       }
  //vertical lines//getting applied for every loop, make it happen once only
  doc.line(7, starty, 7, y-4);//srno
          doc.line(33, starty, 33, y-4);//date 
          doc.line(80, starty, 80, y-4);//date
          doc.line(165, starty, 165, y-4);//date
          doc.line(175, starty, 175, y-4);//date
          doc.line(187, starty, 187, y-4);//date
  //vertical lines
       doc.save('Pending Payment Details.pdf')
     }
}

