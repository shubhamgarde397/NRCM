import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Router } from 'node_modules/@angular/router';

@Component({
  selector: 'app-bal-msg',
  templateUrl: './bal-msg.component.html',
  styleUrls: ['./bal-msg.component.css']
})
export class BalMsgComponent implements OnInit {
  public QRCode: any;
public turnbooklist=[];
public turnbooklist1=[];
public whichqr=0
public gotData18=true;

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


  addContact(i,j,data){
    let tempObj = {}
    tempObj['tablename'] = '';
    tempObj['method'] = 'PCMNSaddContact';
    tempObj['billnos'] = i['billnos']
    tempObj['contactqr']=(<HTMLInputElement>document.getElementById('a_' + j)).value;

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.turnbooklist1[j]['contactqr']=(<HTMLInputElement>document.getElementById('a_' + j)).value;
        this.turnbooklist1.forEach(r=>{
          r['wq']=true;
          r['wqr']=this.qrF(r)         
        })  
      });
  }

  qr(data){
    this.whichqr=data;
switch (data) {
  case 1:
    let tempObj1 = {}
    tempObj1['tablename'] = ''
    tempObj1['method'] = 'PCMNS' 

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
      .subscribe((res: any) => {
        this.turnbooklist = res.Data;
        this.whichqr=1;
      });
    break;
    case 2:

    let tempObj = {}
    tempObj['tablename'] = ''
    tempObj['method'] = 'PCMNSW' 

    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.turnbooklist1=res.Data;
        this.turnbooklist1.forEach(r=>{
          r['wq']=true;
          r['wqr']=this.qrF(r)         
        })  
        this.whichqr=2;
      });

    break;
    case 3:
      if(confirm('Are you sure you want to send QR Codes Home?')){
        let arr=[];
        let tempObj3 = {}
        this.turnbooklist1.forEach(r=>{if(r.contactqr!==''){arr.push(r.billnos)}});
        tempObj3['tablename'] = ''
        tempObj3['method'] = 'updatePCMNSQR'
        tempObj3['billnos'] = arr;
        
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj3, true)
          .subscribe((res: any) => {
            alert(res.Status)
            alert('Please Refresh!')
          });
      }
      break;

}
  }


  qrF(data){
    if(data.contactqr===''){}
    else{
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

    qr=qr+"%0A%0A*Nitin Roadways*%0A*Pune*%0A*Mo : 9766707061*%0A%0AOR%0AClick on below link to download pdf.%0Ahttp://www.nitinroadways.in/%23/PDF%3Fi%3D"+String(data.billno.split('_')[0]==='nrcm'?1:2)+parseInt(data.billno.split('_')[1]).toString(16)
    qr='https://wa.me/+91'+data.contactqr+'/?text='+qr
    console.log(qr)
    return qr

  }
}

}
