import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Router } from 'node_modules/@angular/router';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  public QRCode: any;
  public turnbooklist=[];
  public turnbooklist1=[];
  public whichqr=0
  public gotData18=true;
  public balrefno='';
  public apa='';
  public apd='';
  public billno=''
  public todaypassword=String(new Date().getDate())+String(new Date().getMonth()+1);
  public admin=false;
  
    constructor(
      public apiCallservice: ApiCallsService, 
      public securityCheck: SecurityCheckService,
       public handledata: HandleDataService,
       public handleF:handleFunction,
       public formBuilder: FormBuilder,
       public router:Router
       ) {if(!this.securityCheck.login){
        this.router.navigate([''])
      } }
  
    ngOnInit() {
  
    }
  
    adminF(){
      if(String(prompt('Enter code!'))==String(this.todaypassword)){
        this.admin=true;
      }
      else{
        alert('Wrong Code!')
        this.admin=false;
      }
      
    }

  
  
    get(){

  this.turnbooklist1=[];
      let tempObj = {}
      tempObj['tablename'] = ''
      tempObj['billno'] = this.billno
      tempObj['method'] = 'getbybillnoReceipt' 
  
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          let a=Object.keys(res)[0];
          if(a==='Data'){
          this.turnbooklist1=res.Data;
          }
          else{
            alert(res.Status)
          }
        });  
  }

  getA(){

    this.turnbooklist=[];
        let tempObj = {}
        tempObj['tablename'] = ''
        tempObj['method'] = 'getBalMsg' 
    
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
          .subscribe((res: any) => {
            this.turnbooklist=res.Data;
            this.apa=this.turnbooklist[0]['total'];
          });  
    }

    qrF(data){
      let qr=''
      for(let i=0 ;i<data['pochAmount'].length;i++){
          qr=qr+'*Truck No* :'+data['truckno'][i]+'%0A'
          qr=qr+'*Date* :'+this.handleF.getDateddmmyy(data['loadingDate'][i])+'%0A'
          qr=qr+'*Balance* :'+String(data['pochAmount'][i])+'%0A%0A'
      }
      qr=qr+'*Total* :'+String(data['actualPaymentAmount'])+'%0A%0A'
      qr=qr+'*Payment Date* :'+this.handleF.getDateddmmyy(data['actualPaymentDate'])+'%0A'
      qr=qr+'*Payment Amount* :'+String(data['actualPaymentAmount'])+'%0A'
      qr=qr+'*Account Name* :'+data['accdetail']['accountName']+'%0A'
      qr=qr+'*Account No* :'+data['accdetail']['accountNumber']+'%0A%0A'
      qr=qr+'*************%0A%0A'
  
      qr=qr+"%0A%0A*Nitin Roadways*%0A*Pune*%0A*Mo : 9766707061*%0A"
      // AOR%0AClick on below link to download pdf.%0Ahttp://www.nitinroadways.in/%23/PDF%3Fi%3D"+String(data.billno.split('_')[0]==='nrcm'?1:2)+parseInt(data.billno.split('_')[1]).toString(16)
      qr='https://wa.me/+91'+data.contact+'/?text='+qr

      let tempObj = {'tablename': '','method': 'updatebalmsg','billnos': data['billnos']}
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true).subscribe((res: any) => {});
      window.open(qr,'_blank');    
  }

  addContact(i){
    let tempObj = {}
    tempObj['tablename'] = '';
    tempObj['method'] = 'contactOforBal';
    tempObj['ownerids'] = i['ownerid']
    tempObj['contact']=(<HTMLInputElement>document.getElementById('a')).value;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.turnbooklist[0]['contact']=(<HTMLInputElement>document.getElementById('a')).value;
      });
  }

  save(){
    let tempObj = {}
      tempObj['tablename'] = ''
      tempObj['balrefno'] = this.balrefno;
      tempObj['apa'] = this.apa;
      tempObj['apd'] = this.apd;
      tempObj['billno'] = this.turnbooklist1[0]['billno']
      tempObj['method'] = 'saverefNo' 
  
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          
            alert(res.Status)
          
        });  
    
  }

  
}