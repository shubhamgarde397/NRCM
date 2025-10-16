import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-register-qr',
  templateUrl: './register-qr.component.html',
  styleUrls: ['./register-qr.component.css'],
  providers: [ApiCallsService, HandleDataService]
})
export class RegisterQRComponent implements OnInit {


  public s='';

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
        alert('Error with the link.')
      }
      else{
      this.s=data['i']
    }
     })
   }

   call(){
    let a = prompt('Enter Password');
    let login = false;
    switch (a) {
      case 'NRCMSHUB':
        login=true;
        break;
      case 'NRCMANIL':
        login=true;
        break;
      case 'NRCMROHI':
        login=true;
        break;
    }
    if(login){
    let temp={}
            temp={
              lr:parseInt(this.s,16),
              tablename:'',
              method:'registerFinal2'
            }   
  
            this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
            .subscribe((res: any) => {
              alert(res.Status);
              window.open("https://www.nitinroadways.in/#/QL?d="+(this.s),'_self')
              });
   }
   else{
    alert('Wrong Password!')
  }
  }
  
  
 }
