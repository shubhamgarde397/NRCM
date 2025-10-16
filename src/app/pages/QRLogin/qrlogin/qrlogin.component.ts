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

public todaysDate = ''
  public data=''
  public date=new Date();
public ewaybill=0;
    public myFormGroup: FormGroup;
    public myFormGroup1:FormGroup;
  public list=[];
  public qr='https://www.nitinroadways.in/#/QL?d=4efg';
 
  public qrcodes1=[];
  public whichUser='';
  public div2=1;
  public s='';
  public qrlr='';
  public ss=''
  public dataofNR=[];
  public userid=0;

  
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
   ) {
    this.todaysDate=this.hF.getDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
   }

   office(){
    let login=false;
    let pwd = prompt('Enter Password');
    switch (pwd) {
      case 'NRCMSHUB':
        this.userid=1;
        login=true;
        break;
      case 'NRCMANIL':
        this.userid=7;
        login=true;
        break;
      case 'NRCMROHI':
        this.userid=3;
        login=true;
        break;
      case 'NRCMPOOJ':
        this.userid=2;
        login=true;
        break;
    }
    if(login){
      this.div2=3;
    }
    else{
      login=false;
      alert('Wrong Password!')
    }
   }

   setPOD(data){
    let tempObj = {}
    tempObj['method'] = 'BHInserttoProcessingByQR';
    tempObj['tablename'] = '';
    tempObj['remark']=data,
    tempObj['lrno']=parseInt(this.qrlr),
      tempObj['pageno']=this.userid,
      tempObj['nrcmid']=this.userid,
    tempObj['todayDate'] = this.todaysDate;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true,this.todaysDate)//check this function
      .subscribe((res: any) => {
        alert(res.Status);
        this.router.navigate[''];
      });
   }

   ngOnInit() {

     this.myFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      lrno:['', Validators.required]
    });

    this.myFormGroup1 = this.formBuilder.group({
      truckNo: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordC: ['', Validators.required],
      contact:['', Validators.required]
    });
    
     this.activatedRoute.queryParams.subscribe(data=>{

      if(Object.keys(data).length===0){
        alert('Please scan a valid the QR Code!');
        this.div2=-1;
      }
      else{
        this.qrlr = atob(data.d)

        this.myFormGroup.patchValue({
    lrno:'LRNO : '+String(this.qrlr)
  })

          }

      
     })
    
   }

   backToLogin(){
    this.div2=1;
   }

      register(){
    this.div2=2;
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
            alert('Password Wrong. Please contact Nitin Roadways!')
          }
        });
  }

       registerFinal() {
      let value = this.myFormGroup1.value;

      value['method'] = 'registerforqr';
      value['truckNo']=this.formatTruckNo(value.truckNo);
      value['username']=value.username
      value['password']=value.password
      value['passwordC']=value.passwordC
      value['contact']=value.contact
      value['lrno'] = parseInt(this.qrlr);
      value['tablename']=''
      
      this.apiCallservice.handleData_New_python
        ('commoninformation', 1, value, true)
        .subscribe((res: any) => {
          alert(res.Status)
          if(res.Status == 'Registered'){
            window.open("https://wa.me/+918529275757/?text=Hi,%0A%0ARegister my details.%0A%0AMy vehicle no is "+value.truckno+"%0A%0AClick on the link to confirm : %0Ahttps://www.nitinroadways.in/%23/Register?i="+btoa((this.qrlr).toString()),'_blank');
            
          }
          else{
          this.router.navigate(['']);
          }
        });
  }

     formatTruckNo(a){
  a=a.toUpperCase();
	let newtruck=[]
	let raw=a.replace(/ /g, "");
	newtruck.push(raw.slice(0,2))
	newtruck.push(raw.slice(2,4))
	
	if(raw.length==10){
			newtruck.push(' ')
			newtruck.push(raw.slice(4,6))	
			newtruck.push(' ')
			newtruck.push(raw.slice(6,10))	
	}
	if(raw.length==9){

			newtruck.push(' ')
			newtruck.push(raw.slice(4,5))	
			newtruck.push(' ')
			newtruck.push(raw.slice(5,9))	
	}
	if(raw.length==8){
			newtruck.push(' ')
			newtruck.push(raw.slice(4,8))	
	}
	return newtruck.join('')
}
 
 }
