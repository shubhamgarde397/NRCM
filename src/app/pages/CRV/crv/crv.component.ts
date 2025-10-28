import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import * as  jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-crv',
  templateUrl: './crv.component.html',
  styleUrls: ['./crv.component.css'],
  providers: [ApiCallsService, HandleDataService]
})
export class CRVComponent implements OnInit {
  public urlData = '';
  public birthday = new Date().getFullYear() - 2004;
  public msg = ''
  public arr = []
   constructor(
     public sec:SecurityCheckService,
     public router: Router,
     public apiCallservice: ApiCallsService,
     public handledata: HandleDataService,
     public spin: Ng4LoadingSpinnerService,
     public hF: handleFunction,
     public activatedRoute: ActivatedRoute
   ) {}
 
   ngOnInit() {
    
    
     this.activatedRoute.queryParams.subscribe(data=>{
      if(Object.keys(data).length===0){
        alert('Error with scanning! Please scan valid QR Code!')
      }
      else{
      
      let a = Object.keys(data)[0]
         if(a=='d'){
          this.msg = 'Please wait we are updating the POD Status.'
    let dataa = String(this.htd(data['d']))
        
     let tempObj = {};

    tempObj['method'] = 'updateCRVStatus';
    tempObj['tablename'] = '';
    tempObj['crvNo'] = parseInt(dataa.slice(8));
    tempObj['givenDate']= dataa.slice(4,8)+'-'+dataa.slice(2,4)+'-'+dataa.slice(0,2)

    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj, true)
      .subscribe((res:any) => {
        this.msg=res.Status;
        window.open("https://wa.me/+918529275757/?text="+this.urlMaker(res.Data),'_blank');
      })
    }

if(a=='c'){

    let dataa = String(this.htd(data['c']))
        let date = dataa.slice(1);
     let tempObj = {};

    tempObj['method'] = 'downloadPDFofLRNO';
    tempObj['tablename'] = '';
    tempObj['crvNo'] = this.htd(dataa.slice(0,1));
    tempObj['givenDate']= this.hF.getDate(date.slice(6),date.slice(4,6),date.slice(0,4));

    this.apiCallservice.handleData_New_python
      ('commoninformation', 1, tempObj, true)
      .subscribe((res:any) => {
        let a = res.Data
        
        let pics = ['raw_F','stamp_F','stamp_B','courier_D2T','courier_T2B','bill_F']
        for(let i=0;i<a.length;i++){//2

          for(let j=0;j<pics.length;j++){//6

            if(a[i]['podImage'][j]['setter']==1){

                let link = 'https://truckdriverdocuments.s3.ap-south-1.amazonaws.com/pod/';

                link = link + a[i]['p'].replaceAll(' ', '')+'/'
                link = link + (a[i]['datetruck'].split('_')[1]).split(' ').join('') + '/'
                link = link + a[i]['nrlrno']+'/'
                link = link + pics[j]+'.'+a[i]['podImage'][j]['fileType']
                this.arr.push(link);
            }
        }
      }

      this.download(res.Data,this.arr);
        
        
      })
    }
  }
  })
 }



    download(data,arr) {
       
   
       
   console.log(data);
   console.log(arr);
   
   
       var doc = new jsPDF()
   
       for(let i=0;i<arr.length;i++){//link

        let imgData=this.returnBase(arr[i])
   
       doc.setFontSize('28');
       doc.setFontType('bold');
       doc.setTextColor(234, 1, 0);
       if(data['partyType']==='NR'){
         doc.text('NITIN ROADWAYS', 60, 25)  
       }
       else if(data['partyType']==='NRCM'){
         doc.text('NITIN ROADWAYS AND CARGO MOVERS', 7, 25)  
       }
       else if(data['partyType']==='SNL'){
         doc.text('SHRI NITIN LOGISTICS', 50, 25)  
       }
   
       doc.setFontSize('16');
       doc.setFontType('bold');
       doc.setFontType('italic');
       doc.setTextColor(0, 0, 0);
   
       doc.setDrawColor(153, 29, 39);
       doc.setLineWidth(0.5);
       doc.line(15, 33, 195, 33);
   
       doc.setFontSize('15');
       doc.setFontType('bold');
       doc.setTextColor(215, 6, 9);
       doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 15,38)
   
       doc.setDrawColor(153, 29, 29);
       doc.setLineWidth(0.5);
       doc.line(15, 39, 195, 39);
   
       doc.setFontType('normal');
       doc.setFontSize('15');
       doc.setTextColor(0, 0, 0);
       doc.text('Cell :- 9822288257, 8459729293, 8529275757', 25, 51)
       doc.setFontSize('12');
       doc.text('Email : punenitinroadways@gmail.com    Website : www.nitinroadways.in', 25, 58)
   
   
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
       doc.text(data[i]['datetruck'].split('_')[1].split(' ').join(''), 80, 75)
   
setTimeout(() => {
  doc.addImage(imgData,arr[i].split('.').at(-1),10,80,100,100)
}, 1000);
     
         

         doc.addPage();
      
       
     }
     doc.save('NRCM_LRPHOTO.pdf')
    }

    returnBase(url){
      const urlToBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = (error) => {
      reject(error);
    };
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.send();
  });
};

// Example usage:
urlToBase64(url).then((base64String) => {
  console.log(base64String);
}).catch((error) => {
  console.error(error);
});
    }

    format(data){
      switch(data){
        case 'jpg':
          return 'JPEG'
        case 'png':
          return 'PNG'
      }
    }

        dth36(a){
 
    let hex_characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (a == 0)
    {return "0"}
    let remainder = 0;
    let hexadecimal = ""
    while (a > 0){
        remainder = a % 62
        hexadecimal = hex_characters[remainder] + hexadecimal
        a = Math.trunc(a/62)
    }
    return hexadecimal;

    }

 urlMaker(data){
  let month = this.hF.genaratemonthNames()[parseInt(data[0]['givenDate'].slice(5,7))-1].slice(0,1);
  


  let str = '';
str =str+'Hi,%0A%0A'
str =str+'We received '+ data.length +'POD with LRNO as%0A%0A'
for(let i=0;i<data.length;i++){
  str =str + (i+1)+'. '+data[i]['nrlrno'] + '%0A'
}
str= str + '%0A';
str= str + 'Bill no : '+month+data[0]['givenDate'].split('-').join('')+'%0A%0A'

// str= str + 'Click on the link to view the submitted LR%0A';
// str= str + 'https://www.nitinroadways.in/%23/C?c='+this.dth36(parseInt(data[0]['crvNo']+(data[0]['givenDate'].split('-').join(''))));

return str;

 }

       htd(hexVal)
   {
       var len = hexVal.length;
       var base = 1;
       var dec_val = 0;
   
       for (var i = len - 1; i >= 0; i--) {
           if (hexVal.charAt(i) >= '0'&& hexVal.charAt(i) <= '9') {
               dec_val += (hexVal.charAt(i).charCodeAt(0) - 48) * base;
               base = base * 62;
           }
           else if (hexVal.charAt(i) >= 'A'&& hexVal.charAt(i) <= 'Z') {
               dec_val += (hexVal.charAt(i).charCodeAt(0) - 55) * base;
               base = base * 62;
           }
           else if (hexVal.charAt(i) >= 'a'&& hexVal.charAt(i) <= 'z') {
               dec_val += (hexVal.charAt(i).charCodeAt(0) - 61) * base;
               base = base * 62;
           }
       }
       return dec_val;
   }
}