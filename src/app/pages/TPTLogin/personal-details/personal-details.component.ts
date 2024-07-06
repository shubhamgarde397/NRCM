import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
  providers: [ApiCallsService]
})
export class PersonalDetailsComponent implements OnInit {
  public options=[
    {value:'1',viewValue:'Personal Details'},
    {value:'2',viewValue:'Login Details'},
  ]
  public personaldetailslist = [];
  public display=true;
  public display2=false;
  public display1=false;
   public todayDate;
   public show = false;

   public uname;
   public pword;
   public opword;
   public ouname;
   public dname;
   public contactA;
   public pD;
  public tptName;
  public name;
  public addr1;
  public addr2;
  public addr3;
  public email;
   constructor(
     public apiCallservice: ApiCallsService,
     public router: Router,
     public handledata: HandleDataService,
     public sec: SecurityCheckService,
     public handleF:handleFunction
 
   ) { if(!this.sec.login){
    this.router.navigate([''])
  }}
 
   ngOnInit() {
     this.todayDate=this.handleF.createDate(new Date());
     this.uname = this.sec.username2;
     this.ouname=this.sec.username2;
     this.dname=this.sec.dname
   this.fetchBasic()
   }
 
   fetchBasic() {
     this.personaldetailslist = [];
     this.personaldetailslist = this.sec.arr;
   }
 
   getOptionDetails(data){//_id,index
    
     switch (data) {
      case '1':
        this.display1=true;
        this.display2=false;
        this.getPDetails()
        break;
        case '2':
        this.display2=true;
        this.display1=false;

        break;
     }
   }

   getPDetails(){
    let tempObj = {};
    tempObj['method']='getPDetails';
    tempObj['tablename']='';
    tempObj['uid']=this.sec.userid;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.pD=res.Data[0];
        this.contactA=this.pD.contact[0]?this.pD.contact[0]:'';
        this.tptName=this.pD.tptName
        this.name=this.pD.name
        this.addr1=this.pD.addr1
        this.addr2=this.pD.addr2
        this.addr3=this.pD.addr3
        this.email=this.pD.email
      });
   }
   changePassword(){
    let tempObj = {};
    tempObj['method']='changepassword';
    tempObj['tablename']='';
    tempObj['uname']=this.uname;
    tempObj['pword']=this.pword;
    tempObj['ouname']=this.ouname;
    tempObj['opword']=this.opword;
    tempObj['dname']=this.dname;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        alert(res.Status);
        alert('You will now be signed out! Login in Again.')
        this.router.navigate(['']);
      });
   }

   changeDetails(){
    let tempObj={}
    tempObj['tptName']=this.tptName;
    tempObj['name']=this.name;
    tempObj['addr1']=this.addr1;
    tempObj['addr2']=this.addr2;
    tempObj['addr3']=this.addr3;
    tempObj['email']=this.email;
    tempObj['method']='changepd';
    tempObj['tablename']='';
    tempObj['contact']=[this.contactA];
    tempObj['uid']=this.sec.userid;
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status);
    });
   }


 }
 
 
 

