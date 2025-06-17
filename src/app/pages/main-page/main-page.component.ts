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
  public changed = false;
  public morseIS = '';
  public clue = false;
  public bigI=0;
  public file;
  public mailSendButton=true;
public partyids=[{'name':'LOL'}]
public fromloading=''
public toloading=''
public balanceFollowArr=[]
public typeOfCols='default';
  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService,
    public router: Router, public hf: handleFunction,public security:SecurityCheckService) {
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

  findName(data){
    switch (data) {
      case 'M':return 'Morning';
      case 'A':return 'Afternoon';
      case 'E':return 'Evening';
    }
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

  sent2() {

    const file =(<HTMLInputElement>document.getElementById('image')).files[0];

console.log(file);
// Create a reader
// const reader = new FileReader();
const reader = new (window as any).FileReader();

// Convert the image to Base64
reader.onload = () => {

    const base64String = reader.result.split(',')[1];
};

// Read the file as a data URL
reader.readAsDataURL(file);
console.log(reader.readAsDataURL(file));


  }

sent(){

  const file =(<HTMLInputElement>document.getElementById('image')).files[0];
    const reader = new (window as any).FileReader();

    reader.onload = () => {
        const base64String = reader.result.split(',')[1];


        let tempObj = {}
        tempObj['method'] = 'tp'
        tempObj['tablename']=''
        tempObj['base64']= base64String
        tempObj['name'] = 'testing'
    
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
          .subscribe((res: any) => {

          });




    };

    reader.readAsDataURL(file);


}




  getMorse(data) {
    this.morseIS = this.hf.normalMorseCode(data);
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
