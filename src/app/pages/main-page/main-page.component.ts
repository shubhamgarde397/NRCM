import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { handleFunction } from '../../common/services/functions/handleFunctions';
import { Consts } from '../../common/constants/const';
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
  public changed = false;
  public morseIS = '';
  public clue = false;
  public bigI=0;
  public mailSendButton=true;
public partyids=[{'name':'LOL'}]
public fromloading=''
public toloading=''
public balanceFollowArr=[]
public typeOfCols='default';
  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService,
    public router: Router, public handleF: handleFunction,public security:SecurityCheckService) {
    localStorage.clear();
    }


    dateSetter() {
      if (this.dateFromUI === undefined || this.dateFromUI === '') {
        return '';
      }
      return this.dateFromUI.slice(8, 11) + '-' + this.dateFromUI.slice(5, 7) + '-' + this.dateFromUI.slice(0, 4)
    }
  
 

  login(data) {
    this.security.setBranch(data);
    
    this.router.navigate(['Login']);
    this.loginV = true;
    
  }

  track(){
    this.security.setBranch('nrcm');
    this.router.navigate(['TRACK']);
    this.loginV = true;
  }
  sendMsg(type,typo){

    switch (typo) {
      case 'wa':
        switch (type) {
          case 'nitin':
            window.open('https://wa.me/+919822288257/?text=Hi','_blank');    
            break;
            case 'shubham':
            window.open('https://wa.me/+919766707061/?text=Hi','_blank');    
            break;
        }
        break;
        case 'txt':
        switch (type) {
          case 'nitin':
            window.open('sms:+919822288257?body=Hi','_blank');    
            break;
            case 'shubham':
            window.open('sms:+919766707061?body=Hi','_blank');    
            break;
        }
        break;
    
      
    }
    
    
      }
    
  whatsapp() {
    this.router.navigate(['Whatsapp']);
    this.loginV = true;
  }

  whysapp() {
    this.router.navigate(['WhysApp']);
    this.loginV = true;
  }

  // incomingFile(file) {

  //   this.selectedFile = file.target.files[0]
  //   if (file) {
  //     this.fileFormData.append('image', file.target.files[0]);

  //   }
  // }





  getMorse(data) {
    this.morseIS = this.handleF.normalMorseCode(data);
  }

  clueCall() {
    this.clue = true;
  }
  ngOnInit() {
    setInterval(() => {
      this.now = new Date();
      if (this.now.getSeconds() % 10 === 0) {
        this.changed = true;
      } else {
        this.changed = false;
      }
    }, 1000);
  }




  ls(no){
    if(no<6){
      return 3;
    }
    else if(no>=6){
      return no-5+this.ls(no-1);
    }
  }

}
