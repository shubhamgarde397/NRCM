import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-pmt-msg',
  templateUrl: './pmt-msg.component.html',
  styleUrls: ['./pmt-msg.component.css'],
  providers: [ApiCallsService, HandleDataService]
})
export class PmtMsgComponent implements OnInit {

  public data=''
  public list=[];
  public s='';
  public birthday = new Date().getFullYear() - 2004;
  public ss=''
  public sstab=false;
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
        this.ss='lc';
      }
      else{
      let temp={}
      this.s=data['i'].split('_');
      this.ss=this.s[0]
      switch (this.s[0]) {
        case 'q':
          temp={
            billno:this.s[1],
            tablename:'',
            method:'getbybillno2'
          }   

          this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
          .subscribe((res: any) => {
            this.data=res.Status;
              if(confirm('Click Ok to open Whatsapp')){
                window.open(this.data,'_blank');    
              }
            });
          break;
          case 'i':
            temp={
              i:this.s[1],
              tablename:'',
              method:'empinfo'
            }   
  
            this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
            .subscribe((res: any) => {
              this.data=res.Data[0];
              this.sstab=true;
              });
            break;
    
         case 'test': 
        
         window.open('tel://+91'+this.htd(this.s[1])+'','_blank');
           break;
      }
       
    }


      
     })
    
   }

   call(){
    if(this.s[1].length===10){
      window.open('tel://+91'+this.s[1]+'','_blank');
    }else{
      window.open('tel://+91'+this.htd(this.s[1])+'','_blank');
    }
    
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

   call2(data){
    switch (data) {
      case 1:
        window.open('https://wa.me/+918529275757/?text=*Finolex Pipes*%0A%0Ahttps://maps.app.goo.gl/bqwhwzfUVPhCe29r6','_blank');
        
        break;

        case 2:
        window.open('https://wa.me/+918529275757/?text=*Finolex Fittings*%0A%0Ahttps://maps.app.goo.gl/NfKpt7FD72vuK521A','_blank');
        break;

        case 3:
        window.open('https://wa.me/+918529275757/?text=*Prince Dhaba*%0A*Nitin Roadways*%0A%0Ahttps://maps.app.goo.gl/WjNDtUGFVZJLRxyd9','_blank');
        break;

        case 4:
        window.open('https://wa.me/+918529275757/?text=*Nitin Roadways Pune*%0A%0Ahttps://maps.app.goo.gl/vTyjKAVJBoZPm27E8','_blank');
        break;

        case 5:
        window.open('https://wa.me/+918529275757/?text=*Nitin Roadways Pondicherry*%0A%0Ahttps://maps.app.goo.gl/5jeSNE4bvqVB19b1A','_blank');
        break;
    
      
    }
   }

   
 
 }



