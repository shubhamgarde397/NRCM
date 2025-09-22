import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-qrlogin',
  templateUrl: './qrlogin.component.html',
  styleUrls: ['./qrlogin.component.css'],
  providers: [ApiCallsService, HandleDataService]
})
export class QRLoginComponent implements OnInit {


  @ViewChild('qrCode') qrCode: ElementRef;


  public data=''
public ewaybill=0;
    public myFormGroup: FormGroup;
  public list=[];
  public qr='https://www.nitinroadways.com/#/QL?d=4efg';
 
  public qrcodes1=[];
  public whichUser='';
  public div2=0;
  public s='';
  public qrlr='';
  public ss=''
  public dataofNR=[];


  
   constructor(
     public sec:SecurityCheckService,
     public router: Router,
     public apiCallservice: ApiCallsService,
     public handledata: HandleDataService,
     public spin: Ng4LoadingSpinnerService,
     public hF: handleFunction,
     public activatedRoute: ActivatedRoute,

    public formBuilder: FormBuilder,
    public security: SecurityCheckService
   ) {}

   ngOnInit() {

     this.myFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      lrno:['', Validators.required]
    });
    
     this.activatedRoute.queryParams.subscribe(data=>{

      if(Object.keys(data).length===0){
        alert('Please scan a valid the QR Code!');
        this.div2=-1;
      }
      else{
        this.qrlr = atob(data.d)
        

          }

      
     })
    
   }

   back(){
    this.div2=0;
   }

     login() {
let value = this.myFormGroup.value;
      this.security.setUsername(value['username']);

      value['method'] = 'loginforqr';
      value['username']=value.username
      value['password']=value.password
      value['lrno'] = this.qrlr;
      value['tablename']=''
      
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, value, true)
        .subscribe((res: any) => {
          this.data=res.Data[0];
          if(this.data['Login']){
            this.whichUser=this.data['LoginType'];
            this.ewaybill = this.data['ewaybill']
            this.div2=-2;
          }
          else{
            alert('Password Wrong,Contact Admin!')
          }
        });
  }


buttonAction2(data){
 this.div2=data;
 if(data==1){
  this.myFormGroup.patchValue({
    lrno:'LRNO : '+String(this.qrlr)
  })
 }
}
   
 
 }

   
 
//  function (){
//         let temp={}
//       this.s=data['d']
//           temp={
//             lrno:this.s,
//             tablename:'',
//             method:'getbyqrlrno'
//           }   

//           this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
//           .subscribe((res: any) => {
//             console.log(res);
            
//             });
//  }



