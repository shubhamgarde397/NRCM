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
  public lrnoQTY = 0;
  public sub = [
    {n:0,s:-1},
    {n:1,s:1},
    {n:2,s:1},
    {n:3,s:2},
    {n:4,s:1},
    {n:5,s:2},
    {n:6,s:2},
    {n:7,s:2},
    {n:8,s:2},
    {n:9,s:4},
  ]

  constructor() { }

  ngOnInit() {
  }


       viewQR(){
        if(this.lrnoQTY < 2){ 
          this.lrnoQTY = 2;
        }
        else{
  let temp={};
  this.qrcodes=[];
  let qrcodesinner=[];
  
  for(let i=0;i<this.lrnoQTY;i=i+12){
   qrcodesinner=[] 
    for(let ii=i;ii<i+12&&ii<this.lrnoQTY;ii++){
      temp={}
      temp['qrcode']='https://www.nitinroadways.in/#/QL?d='+btoa((this.lrnoStart+ii).toString())
      temp['lrno']=1+ii;
      qrcodesinner.push(temp)
  }
  this.qrcodes.push(qrcodesinner)
  }
  
  this.qrViewer=true;
console.log(this.qrcodes);

  setTimeout(() => {
  this.func1();    
  }, 1);
  
  
  
  }
}
  
  func1(){

      

    let lrno=this.lrnoStart;
    const qrCodeElements = document.querySelectorAll('qrcode img');
       var doc = new jsPDF()//x : y : 290
      //  var doc = new jsPDF('p','mm',[850,57])
// lines 210 , 300
      // doc.line(52.5,0,52.5,297)
      // doc.line(105,0,105,297)
      // doc.line(157.5,0,157.5,297)

      // for(let i=0;i<10;i++){
      //   doc.line(0,(30*i)-3,210,(30*i)-3)
      // }

      doc.setLineDash([0.5, 1],10);

      doc.line(25.50,0,25.50,297)
      doc.line(77.75,0,77.75,297)
      doc.line(105+25.25,0,105+25.25,297)
      doc.line(105+77.75,0,105+77.75,297)
      doc.setLineDash([]);
// lines
      let y = 0;
      let innerI=0;
       for(let i=0;i<qrCodeElements.length;i++){
          const qrCodeImage = qrCodeElements[i] as HTMLImageElement;
          const qrCodeImage1 = qrCodeElements[1] as HTMLImageElement;
      
                if(i%20===0){
                  if(i==0){}
                  else{
                    
                    
                  doc.addPage();
                  y = 0;
                  innerI=0;
                }
              }


              if(innerI>5){
                y=y+5
              }

    let x=this.sub[innerI]['n']-this.sub[innerI]['s']
    
            // 
            // 
            doc.addImage(qrCodeImage.src, 'PNG', 3, (30*innerI)+x, 18, 18);
            doc.addImage(qrCodeImage.src, 'PNG', 28, (30*innerI)+x, 18, 18);

            doc.addImage(qrCodeImage.src, 'PNG', 54.5, (30*innerI)+x, 18, 18);
            doc.addImage(qrCodeImage.src, 'PNG', 80.5, (30*innerI)+x, 18, 18);
// 105
            doc.addImage(qrCodeImage1.src, 'PNG', 105+2, (30*innerI)+x, 18, 18);
            doc.addImage(qrCodeImage1.src, 'PNG', 105+28, (30*innerI)+x, 18, 18);

            doc.addImage(qrCodeImage1.src, 'PNG', 105+54.5, (30*innerI)+x, 18, 18);
            doc.addImage(qrCodeImage1.src, 'PNG', 105+79.5, (30*innerI)+x, 18, 18);

            // 
            // 
            
            doc.setFontSize('8')
           doc.setFontType('bold');
            doc.setFontType('italic');

            //
            doc.text('Scan QR : '+(lrno+i),3,(30*innerI)+x+21)
            doc.text('Scan QR : '+(lrno+i),28,(30*innerI)+x+21)

            doc.text('Scan QR : '+(lrno+i),54.5,(30*innerI)+x+21)
            doc.text('Scan QR : '+(lrno+i),80.5,(30*innerI)+x+21)

            doc.text('Scan QR : '+(lrno+i+1),105+2,(30*innerI)+x+21)
            doc.text('Scan QR : '+(lrno+i+1),105+28,(30*innerI)+x+21)

            doc.text('Scan QR : '+(lrno+i+1),105+54.5,(30*innerI)+x+21)
            doc.text('Scan QR : '+(lrno+i+1),105+79.5,(30*innerI)+x+21)

    
            y = 30+30*innerI;
            innerI = innerI+1;
            i = i + 1;
       
    };
    doc.save('T.pdf');
    
    
    
    
    
       }

}
