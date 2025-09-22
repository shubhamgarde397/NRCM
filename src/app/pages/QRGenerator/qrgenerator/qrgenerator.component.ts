import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-qrgenerator',
  templateUrl: './qrgenerator.component.html',
  styleUrls: ['./qrgenerator.component.css']
})
export class QRGeneratorComponent implements OnInit {
  public lrnoStart=0;
   public qrcodes=[];
  public qrViewer=false;
public logoUrl = 'assets/images/N.png';
  constructor() { }

  ngOnInit() {
  }


  viewQR(){
  let temp={};
  this.qrcodes=[];
  let qrcodesinner=[];
  
  for(let i=0;i<50;i=i+12){
   qrcodesinner=[] 
    for(let ii=i;ii<i+12&&ii<50;ii++){
      temp={}
      // temp['qrcode']='https://www.nitinroadways.com/#/QL?d='+btoa((this.lrnoStart+ii).toString())
      temp['qrcode']='http://192.168.0.194:4200/#/QL?d='+btoa((this.lrnoStart+ii).toString())
      temp['lrno']=this.lrnoStart+ii;
      qrcodesinner.push(temp)
  }
  this.qrcodes.push(qrcodesinner)
  }
  
  this.qrViewer=true;

  setTimeout(() => {
  this.func1();    
  }, 1);
  
  
  
  }
  
  func1(){
  let lrno=this.lrnoStart;
  const qrCodeElements = document.querySelectorAll('qrcode img');
     var doc = new jsPDF()//x : y : 290
    let y = 0;
      
     for(let i=0;i<qrCodeElements.length;i++){
  const qrCodeImage = qrCodeElements[i] as HTMLImageElement;
  
     
    
    if(i%5===0){
      if(i==0){}
      else{
      doc.addPage();
      y = 0;
    }
  }
  
          doc.addImage(qrCodeImage.src, 'PNG', 10, y+10, 40, 40);
          doc.addImage(qrCodeImage.src, 'PNG', 60, y+10, 40, 40);
          doc.addImage(qrCodeImage.src, 'PNG', 110, y+10, 40, 40);
          doc.addImage(qrCodeImage.src, 'PNG', 160,y+10, 40, 40);
          
          doc.setFontSize('8')
          doc.setFontType('bold');
          doc.setFontType('italic');
          console.log(lrno);
          console.log(typeof(lrno));
          console.log(i);
          console.log(typeof(i));
          doc.text('Scan QR : '+(lrno+i),20,y+55)
          doc.text('Scan QR : '+(lrno+i),70,y+55)
          doc.text('Scan QR : '+(lrno+i),120,y+55)
          doc.text('Scan QR : '+(lrno+i),170,y+55)
  
          y = y + 50;
     
  };
  doc.save('qrCodes_'+this.lrnoStart+'_to_'+this.lrnoStart+50+'.pdf');
  
  
  
  
  
     }

}
