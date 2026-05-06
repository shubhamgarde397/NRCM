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
   public lrnoSep=0;
   public lrnos=[];
   public bills=[];
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

delBill(index){
        if (confirm('Are you sure?')) {

          this.bills.splice(index,1);
          
      }
    }

addlrArray(){
  
 this.bills.push(this.lrnoSep);
        this.lrnoSep = 0;
}
viewQRSeperate(){

          this.lrnoQTY = this.bills.length;
          this.lrnoStart = Number(this.bills[0]);
  let temp={};
  this.qrcodes=[];
  let qrcodesinner=[];
  
  for(let i=0;i<this.lrnoQTY;i=i+12){
   qrcodesinner=[] 
    for(let ii=i;ii<i+12&&ii<this.lrnoQTY;ii++){
      temp={}
      temp['qrcode']='https://www.nitinroadways.in/#/QL?d='+(this.bills[ii]).toString(16)
      temp['lrno']=1+ii;
      qrcodesinner.push(temp)
  }
  this.qrcodes.push(qrcodesinner)
  }
  
  this.qrViewer=true;

  setTimeout(() => {
  this.func2();    
  }, 1);
  
}

       viewQR(){
        
    
          this.lrnoQTY = this.lrnoQTY%20 + this.lrnoQTY;
  let temp={};
  this.qrcodes=[];
  let qrcodesinner=[];
  
  for(let i=0;i<this.lrnoQTY;i=i+12){
   qrcodesinner=[] 
    for(let ii=i;ii<i+12&&ii<this.lrnoQTY;ii++){
      temp={}
      temp['qrcode']='https://www.nitinroadways.in/#/QL?d='+(this.lrnoStart+ii).toString(16)
      temp['lrno']=1+ii;
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
// lines
      let y = 0;
      let innerI=0;
       for(let i=0;i<qrCodeElements.length;i++){
          const qrCodeImage = qrCodeElements[i] as HTMLImageElement;
          let  qrCodeImage1 = qrCodeElements[i+1] as HTMLImageElement;
          if(qrCodeImage1==undefined){
            qrCodeImage1=qrCodeElements[i] as HTMLImageElement;;
          }
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
                  var img = new Image();
                  img.src = '../../../assets/images/NLOGO.png';
                  var w=8;
                  var h= 6;
              //
               doc.addImage(img, 'PNG', 21, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 21, (30*innerI)+x+13, h,w);

               doc.addImage(img, 'PNG', 46, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 46, (30*innerI)+x+13, h,w);

               doc.addImage(img, 'PNG', 72.5, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 72.5, (30*innerI)+x+13, h,w);

               doc.addImage(img, 'PNG', 98.5, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 98.5, (30*innerI)+x+13, h,w);


               doc.addImage(img, 'PNG', 105+20, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 105+20, (30*innerI)+x+13, h,w);


               doc.addImage(img, 'PNG', 105+46, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 105+46, (30*innerI)+x+13, h,w);

               doc.addImage(img, 'PNG', 105+72.5, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 105+72.5, (30*innerI)+x+13, h,w);

               doc.addImage(img, 'PNG', 105+97.5, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 105+97.5, (30*innerI)+x+13, h,w);

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

         func2(){

      

    let lrno=this.lrnoStart;
    const qrCodeElements = document.querySelectorAll('qrcode img');
       var doc = new jsPDF()//x : y : 290
// lines
      let y = 0;
      let innerI=0;
       for(let i=0;i<qrCodeElements.length;i++){
          const qrCodeImage = qrCodeElements[i] as HTMLImageElement;
          let qrCodeImage1 = qrCodeElements[i+1] as HTMLImageElement;
          if(qrCodeImage1==undefined){
            qrCodeImage1=qrCodeElements[i] as HTMLImageElement;
            this.bills.push(this.bills[this.bills.length-1]);
          }
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
                  var img = new Image();
                  img.src = '../../../assets/images/NLOGO.png';
                  var w=8;
                  var h= 6;
              //
               doc.addImage(img, 'PNG', 21, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 21, (30*innerI)+x+13, h,w);

               doc.addImage(img, 'PNG', 46, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 46, (30*innerI)+x+13, h,w);

               doc.addImage(img, 'PNG', 72.5, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 72.5, (30*innerI)+x+13, h,w);

               doc.addImage(img, 'PNG', 98.5, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 98.5, (30*innerI)+x+13, h,w);


               doc.addImage(img, 'PNG', 105+20, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 105+20, (30*innerI)+x+13, h,w);


               doc.addImage(img, 'PNG', 105+46, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 105+46, (30*innerI)+x+13, h,w);

               doc.addImage(img, 'PNG', 105+72.5, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 105+72.5, (30*innerI)+x+13, h,w);

               doc.addImage(img, 'PNG', 105+97.5, (30*innerI)+x, h,w);
               doc.addImage(img, 'PNG', 105+97.5, (30*innerI)+x+13, h,w);

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
            
            doc.text('Scan QR : '+(this.bills[i]),3,(30*innerI)+x+21)
            doc.text('Scan QR : '+(this.bills[i]),28,(30*innerI)+x+21)

            doc.text('Scan QR : '+(this.bills[i]),54.5,(30*innerI)+x+21)
            doc.text('Scan QR : '+(this.bills[i]),80.5,(30*innerI)+x+21)

            doc.text('Scan QR : '+(this.bills[i+1]),105+2,(30*innerI)+x+21)
            doc.text('Scan QR : '+(this.bills[i+1]),105+28,(30*innerI)+x+21)

            doc.text('Scan QR : '+(this.bills[i+1]),105+54.5,(30*innerI)+x+21)
            doc.text('Scan QR : '+(this.bills[i+1]),105+79.5,(30*innerI)+x+21)

    
            y = 30+30*innerI;
            innerI = innerI+1;
            i = i + 1;
       
    };
    doc.save('T.pdf');
    
    
    
    
    
       }

}
