import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-tpdf',
  templateUrl: './tpdf.component.html',
  styleUrls: ['./tpdf.component.css'],
  
  providers: [ApiCallsService, HandleDataService],
})
export class TpdfComponent implements OnInit {
public date = new Date();
public data=[];
 public list=[];
  constructor(
    public sec:SecurityCheckService,
    public router: Router,
    public apiCallservice: ApiCallsService,
    public handledata: HandleDataService,
    public spin: Ng4LoadingSpinnerService,
    public hf: handleFunction,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data=>{
      let temp={
        billno:data['i'],
        tablename:'',
        method:'getbybillnoPDF'
      }
      this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
      .subscribe((res: any) => {
      
      this.download(res.Data);
      });
    })
    // this.download(this.data);
  }

  download(data) {//threshhold is 295
    var doc = new jsPDF();
this.data=data;
    doc.setFontSize('22');
    doc.setFontType('bold');
    doc.setTextColor(224,0,0);
    doc.text('NITIN ROADWAYS AND CARGO MOVERS',25, 10)

    doc.setDrawColor(163,0,0);
    doc.setLineWidth(0.5);
    doc.line(15, 12, 195, 12);

    doc.setFontType('normal');
    doc.setFontSize('12');
    doc.setTextColor(0, 0, 0);
    doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 25, 17)
    doc.setFontSize('12');
    doc.text('Email : punenitinroadways@gmail.com    Website : www.nitinroadways.in', 25, 21)


    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.8);
    doc.line(15, 24, 195, 24);

    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.2);
    doc.line(15, 25, 195, 25);

    
    //Static head

    // 
    doc.text('Print Date : '+this.hf.getDateddmmyy(this.hf.createDate(this.date)), 141, 32)
    doc.setDrawColor(0,0,0);
    doc.line(14, 36, 195, 36);//above headers
    doc.line(14, 42, 195, 42);//below headers
    // 
    // vertical line between headers
    doc.line(14, 36, 14, 42);
    doc.line(43, 36, 43, 42);
    doc.line(76, 36, 76, 42);
    doc.line(93, 36, 93, 42);
    doc.line(128, 36, 128, 42);
    doc.line(195, 36, 195, 42);
    //
//Headers
doc.setFontSize('10');
doc.setFontType('bold');
doc.setTextColor(0, 0, 0);
doc.text('Date', 16, 40)
doc.text('Truckno', 45, 40)
doc.text('Balance', 78, 40)
doc.text('Payment Details', 95, 40)
doc.text('Account Details', 140, 40)

    let startilength=0;
    let midLength = 0;
    for(let i=0;i<this.data.length;i++){
      for(let j=0;j<this.data[i]['pochAmount'].length;j++){
        doc.text(this.hf.getDateddmmyy(this.data[i]['loadingDate'][j]),16,46+(j*5)+(5*startilength))
        doc.text(this.data[i]['truckno'][j],45,46+(j*5)+(5*startilength))
        doc.text(String(this.data[i]['pochAmount'][j]),78,46+(j*5)+(5*startilength))
        doc.line(14, 47+(j*5)+(5*startilength), 93, 47+(j*5)+(5*startilength))
      }
      
      
      doc.text(this.hf.getDateddmmyy(this.data[i]['actualPaymentDate']),95,46+5*startilength)
      doc.text(String(this.data[i]['actualPaymentAmount']),95,46+5*startilength+5)

      doc.text('Account Name : '+this.data[i]['accdetail']['accountName'],130,46+5*startilength)
      doc.text('Account No : '+String(this.data[i]['accdetail']['accountNumber']),130,46+5*startilength+5)
      doc.line(14,46+5*startilength-4,195,46+5*startilength-4)
      startilength=startilength+this.data[i]['pochAmount'].length+1;
    }
    doc.line(14, 46+(5*startilength), 195, 46+(5*startilength))

    doc.line(14, 42, 14,46+(5*startilength))
    doc.line(43, 42, 43,46+(5*startilength))
    doc.line(76, 42, 76,46+(5*startilength))
    doc.line(93, 42, 93,46+(5*startilength))
    doc.line(128, 42, 128,46+(5*startilength))
    doc.line(195, 42, 195,46+(5*startilength))
    // 
    doc.save('Payment Details.pdf')
  }

}



