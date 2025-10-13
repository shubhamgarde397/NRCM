import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { handleFunction } from '../../common/services/functions/handleFunctions';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [ApiCallsService]
})
export class MainPageComponent implements OnInit {
  public showPochData=false;
  public admin=false;
  public contact;
  public dateFromUI='';
  public modalData;
  public loginV = false;
  public hoverThis = false;
  public now = new Date();
  public morseIS = '';
  public clue = false;
  public bigI=0;
  public file;
public typeOfCols='default';
  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService,
    public router: Router, public hf: handleFunction,public security:SecurityCheckService) {
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
    
  whatsapp() {
    this.router.navigate(['Whatsapp']);
    this.loginV = true;
  }

  getMorse(data) {
    this.morseIS = this.hf.normalMorseCode(data);
  }

  ngOnInit() {
  }
}
