import { Component, OnInit } from '@angular/core';
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
@Component({
  selector: 'app-declaration',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PDFComponent implements OnInit {
  title = 'Chatting';
  public newAuthor: any;
  public dateFromUI;
  public timeLog;
  public addr1 = '';
  public addr2 = '';
  public addr3 = '';
  public yearDrop;
  bankArray = [];
  tabber = '';
  public nop;
  public amt;
  gstdetailslist = [];
  commonArray;
  constructor(
    public securityCheck: SecurityCheckService) {

  }

  ngOnInit() {
    this.commonArray = this.securityCheck.commonArray;
    this.gstdetailslist = this.commonArray.gstdetails;
  }
  changeTab(tabs) {
    this.tabber = tabs;
  }
  addDetails() {
    if (this.nop.slice(0, 12) === 'ALS And T Co')
      this.bankArray.push({ 'Name': this.nop.slice(0, 12), 'Amount': this.amt });
    else {
      this.bankArray.push({ 'Name': this.nop, 'Amount': this.amt });
    }
    this.nop = '';
    this.amt = '';
  }
  downloadBank() {

    var doc = new jsPDF()

    doc.setFontSize('30');
    doc.setFontType('bold');
    doc.setTextColor(234, 1, 0);
    doc.text('Nitin Roadways And Cargo Movers', 15, 25)

    doc.setFontSize('16');
    doc.setFontType('bold');
    doc.setFontType('italic');
    doc.setTextColor(0, 0, 0);
    doc.text('(TRANSPORT CONTRACTOR & COMMISSION AGENT)', 30, 35)

    doc.setDrawColor(153, 29, 39);
    doc.setLineWidth(0.5);
    doc.line(15, 38, 195, 38);

    doc.setFontSize('15');
    doc.setFontType('bold');
    doc.setTextColor(215, 6, 9);
    doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 15, 43)

    doc.setDrawColor(153, 29, 29);
    doc.setLineWidth(0.5);
    doc.line(15, 44, 195, 44);

    doc.setFontType('normal');
    doc.setFontSize('15');
    doc.setTextColor(0, 0, 0);
    doc.text('Cell :- 9822288257, 8459729293, 9423580221. Tel :- 020-26959222', 25, 51)
    doc.text('Email :- punenitinroadways@gmail.com', 25, 58)


    doc.setFontType('italic');
    doc.setFontSize('14');
    doc.setTextColor(0, 0, 0);
    doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 25, 65)


    doc.setDrawColor(153, 29, 29);
    doc.setLineWidth(0.8);
    doc.line(15, 67, 195, 67);

    doc.setDrawColor(153, 29, 29);
    doc.setLineWidth(0.2);
    doc.line(15, 68, 195, 68);

    doc.setFontSize('12');
    doc.setFontType('normal');
    doc.setTextColor(0, 0, 0);

    doc.text(this.timeLog.toString(), 50, 73)
    doc.text('Date :- ' + this.dateSetter(), 141, 73)
    doc.text('To,', 25, 80)
    doc.text('Branch Manager,', 40, 85)
    doc.text('Canara Bank,', 40, 90)
    doc.text('Dhankawadi Branch,', 40, 95)
    doc.text('Pune.', 40, 100)

    doc.setFontSize('15');
    let totalAmt = 0;
    for (let i = 0; i < this.bankArray.length; i++) {
      doc.text(this.bankArray[i].Name, 70, (110 + (i * 6)))
      doc.text(this.bankArray[i].Amount.toString(), 140, (110 + (i * 6)))
      totalAmt = totalAmt + this.bankArray[i].Amount;
    }
    doc.text('Total', 70, (110 + ((this.bankArray.length + 1) * 6)))
    doc.text(totalAmt.toString(), 140, (110 + ((this.bankArray.length + 1) * 6)))

    doc.text('Declarant', 150, 268)
    doc.save(this.timeLog.toString() + '.pdf')
  }


  dateSetter() {
    return this.dateFromUI.slice(8, 11) + '-' + this.dateFromUI.slice(5, 7) + '-' + this.dateFromUI.slice(0, 4)
  }
  download() {

    if (this.addr1.slice(0, 12) === 'ALS And T Co')
      this.addr1 = this.addr1.slice(0, 12)
    else {
      this.addr1 = this.addr1;
    }


    var doc = new jsPDF()

    doc.setFontSize('30');
    doc.setFontType('bold');
    doc.setTextColor(234, 1, 0);
    doc.text('Nitin Roadways And Cargo Movers', 15, 25)

    doc.setFontSize('16');
    doc.setFontType('bold');
    doc.setFontType('italic');
    doc.setTextColor(0, 0, 0);
    doc.text('(TRANSPORT CONTRACTOR & COMMISSION AGENT)', 30, 35)

    doc.setDrawColor(153, 29, 39);
    doc.setLineWidth(0.5);
    doc.line(15, 38, 195, 38);

    doc.setFontSize('15');
    doc.setFontType('bold');
    doc.setTextColor(215, 6, 9);
    doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 15, 43)

    doc.setDrawColor(153, 29, 29);
    doc.setLineWidth(0.5);
    doc.line(15, 44, 195, 44);

    doc.setFontType('normal');
    doc.setFontSize('15');
    doc.setTextColor(0, 0, 0);
    doc.text('Cell :- 9822288257, 8459729293, 9423580221. Tel :- 020-26959222', 25, 51)
    doc.text('Email :- punenitinroadways@gmail.com', 25, 58)


    doc.setFontType('italic');
    doc.setFontSize('14');
    doc.setTextColor(0, 0, 0);
    doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 25, 65)


    doc.setDrawColor(153, 29, 29);
    doc.setLineWidth(0.8);
    doc.line(15, 67, 195, 67);

    doc.setDrawColor(153, 29, 29);
    doc.setLineWidth(0.2);
    doc.line(15, 68, 195, 68);

    doc.setFontSize('10');
    doc.setFontType('normal');
    doc.setTextColor(0, 0, 0);
    // doc.text('Date :- ' + this.dateSetter(), 141, 73)
    doc.text('Date :- ', 141, 73)

    doc.setFontSize('10');
    doc.setTextColor(0, 0, 0);
    doc.setFontType('bold');
    doc.text('Declaration/undertaking u/s 194C (6) by Transporter now owning more than ten heavy', 25, 90)
    doc.text('goods carriages/trucks during the Financial Year ' + this.yearDrop, 25, 94)

    doc.setFontType('normal');
    doc.text('To,', 25, 101)
    doc.text(this.addr1 + ',', 40, 106)
    doc.text(this.addr2 + ',', 40, 111)
    doc.text(this.addr3 + '.', 40, 116)

    doc.setFontSize('11');
    doc.setFontType('bold')
    doc.text('Declaration', 25, 126)

    doc.setFontType('normal')
    doc.text('I,', 25, 133)
    doc.setFontType('bold')
    doc.text('Nitin Garde', 28, 133)
    doc.setFontType('normal')
    doc.text('Proprietor/Partner/Director of M/s', 50, 133)
    doc.setFontType('bold')
    doc.text('NITIN ROADWAYS AND CARGO MOVERS', 108, 133)

    doc.setFontType('normal')
    doc.text('(hereinafter "the contractor") do hereby make the following declaration as required by sub', 25, 138)
    doc.text('section (6) of Section 194C of the Income Tax Act,1961 for receiving payments from the', 25, 143)
    doc.text('payer without deduction of tax at source.', 25, 148)

    doc.text('1.  That I/We am/are authorized to make this declaration in the capacity as', 30, 158)
    doc.text('Proprietor/Partner/Director.', 36, 163)

    doc.text('2.  That the contractor is engaged by the payer for playing, hiring or leasing of goods', 30, 173)
    doc.text('carraige for its business.', 36, 178)

    doc.text('3.  That the contractor does not own more than ten goods carraige as on date.', 30, 188)

    doc.text('4.  That if the number of goods carraige owned by the contractor exceeds ten at any', 30, 198)
    doc.text('time during the previous year ' + this.yearDrop + ', the contractor shall forthwith, in writing', 36, 203)
    doc.text('intimate the payer of this fact', 36, 208)

    doc.text('5.  That the income Tax Permanent Account Number', 30, 218)
    doc.setFontType('bold')
    doc.setFontSize('10')
    doc.text('(PAN)', 122, 218)
    doc.setFontType('normal')
    doc.setFontSize('11')
    doc.text('of the contractor is', 133, 218)
    doc.setFontType('bold')
    doc.text('AFGPG3657L.', 36, 223)
    doc.setFontType('normal')
    doc.text('A photocopy of the same is furnished to the payer along with this', 63, 223)
    doc.text('declaration', 36, 228)


    doc.text('Place : PUNE', 25, 248)
    doc.text('Declarant', 150, 268)
    doc.text('Date : ', 25, 258)
    doc.save('Declaration_' + this.addr1 + '.pdf')
  }
}
