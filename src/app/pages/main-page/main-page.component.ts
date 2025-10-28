import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public loginV = false;


  constructor(
    public router: Router,
    public security:SecurityCheckService,
    public handleF : handleFunction
  ) {
    localStorage.clear();
    }

 

  login(data) {
    this.security.setBranch(data);
    this.router.navigate(['Login']);
    this.loginV = true;
    
  }


  sendMsg(type,typo,no){

    switch (typo) {
      case 'wa':
            window.open('https://wa.me/+91'+no+'/?text=Hi','_blank'); 

        break;
        case 'txt':
            window.open('sms:+91'+no+'?body=Hi','_blank');  
        break;
    
      
    }
    
      }
  

  ngOnInit() { 
  }
}
