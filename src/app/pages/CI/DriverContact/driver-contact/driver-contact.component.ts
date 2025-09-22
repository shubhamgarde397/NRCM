import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Router } from 'node_modules/@angular/router';

@Component({
  selector: 'app-driver-contact',
  templateUrl: './driver-contact.component.html',
  styleUrls: ['./driver-contact.component.css']
})
export class DriverContactComponent implements OnInit {

  public tab=1;
  public considerArray;
  public turnbooklist1=[];
  public contact=[];
  public qr=[];
  public qrsetter=0;
  public pts=[
    {value:'NRCM',viewValue:'NRCM'},
    {value:'NR',viewValue:'NR'},
    {value:'SNL',viewValue:'SNL'}
  ]
  public tols=[
    {value:'Pipe',viewValue:'Pipe_Urse'},
    {value:'Fittings',viewValue:'Fittings'},
    {value:'Ratnagiri',viewValue:'Pipe_Ratnagiri'}
  ]

public tols2=[]
public submitButton=false;
public tons=[]
public submission=[];
public commonArray;
public parties=[]
public parties2=[]
public villages=[]
public todayDate=new Date().toLocaleDateString();
public pmts=[]
public pmts3=[]
public trucks=[]

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
      this.considerArray = this.handledata.createConsiderArray('infogsthidden')
    this.handledata.goAhead(this.considerArray) ? this.get() : this.fetchBasic();
    this.commonArray = this.securityCheck.commonArray;
    }

    tabF(data){
      this.tab=data;
    }

    get2(){
      let tempObj = { "method": "getpartymsgtosend", 'tablename':''};
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.pmts=res.Data;
          this.pmts.forEach(r=>{
            r.contactp=r['contactp1'].filter(rr=>{return rr.village==r['destination']})[0]['contact']
        })
        });
    }

    get3(){
      let tempObj = { "method": "sendOfcLocation", 'tablename':''};
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.pmts3=res.Data;
        });
    }
    setTrue3(){
      let tempObj = { "method": "setOfcLocation", 'tablename':'','ownerids':this.pmts3.map(r=>{return r.ownerid})};
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          alert(res.Status)
        });
    }

    qrCoder(data){
      window.open(data,'_blank');  
    }

    LocationSender(data){
      window.open("https://wa.me/+91"+data.contacttb+"/?text=*Nitin Roadways*%0A%0Ahttps://maps.app.goo.gl/6i4xkLQUbeGXXh3y8?g_st=awb",'_blank');
    }


    get() {
      this.securityCheck.commonArray['hiddenownerdetails']=[];
      this.trucks=[];
      let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          this.securityCheck.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.securityCheck.commonArray['gstdetails'];;
          this.securityCheck.commonArray['villagenames'] = Object.keys(res.villagenames[0]).length > 0 ? res.villagenames : this.securityCheck.commonArray['villagenames'];
          this.securityCheck.commonArray['hiddenownerdetails'] = Object.keys(res.hiddenownerdetails[0]).length > 0 ? res.hiddenownerdetails : this.securityCheck.commonArray['hiddenownerdetails'];
          
          this.fetchBasic();
        });
    }
    fetchBasic() {
      this.commonArray = this.securityCheck.commonArray;
      this.parties = [];
      this.trucks=[]
      this.villages = [];
      this.parties = this.commonArray.gstdetails;
      this.villages = this.commonArray.villagenames;
      this.trucks = this.commonArray.hiddenownerdetails;
    }

    checkTON(index){     
      if((<HTMLInputElement>document.getElementById('tol_' + index)).value==='Fittings')
        {
          this.turnbooklist1[index].tons=['0','6','SXL-32','MXL-32']
        }
        else
        {
          this.turnbooklist1[index].tons=['0','7','8','10','T'];
        }
    }
  
    setParty(index){
      let data=(<HTMLInputElement>document.getElementById('pt_' + index)).value;
      switch (data) {
        case 'NRCM':
          this.turnbooklist1[index].parties2=this.parties.filter(r=>{return r.partyType=='NRCM'});
          this.turnbooklist1[index]['qrs'].push({qr:(<HTMLInputElement>document.getElementById('qrsetter')).value});
          this.turnbooklist1[index]['otherbuttons']=true;
          this.turnbooklist1[index].tons=['0','7','8','10','T'];
          break;
          case 'NR':
            this.turnbooklist1[index].parties2=this.parties.filter(r=>{return r.partyType=='NR'})
            this.turnbooklist1[index]['otherbuttons']=false;
            this.turnbooklist1[index]['qrs']=[];
          break;
          case 'SNL':
            this.turnbooklist1[index].parties2=this.parties.filter(r=>{return r.partyType=='SNL'})
            this.turnbooklist1[index]['otherbuttons']=false;
            this.turnbooklist1[index]['qrs']=[];
          break;
      
        
        
      }
    }

  addRow(data,index){
    switch (data) {
      case 'r':
        let temp={
          loadingDate:(<HTMLInputElement>document.getElementById('datesetter')).value,
          contacts:[{co:''}],
          lul:'lock',
          parties2:[],
          tol:'',
          tons:[]
        }
        this.turnbooklist1.push(temp);
        this.submission.push(0);
        this.submitButton=this.submission.every((value)=>{return value>0})
        break;
    
      case 'c':
        this.turnbooklist1[index]['contacts'].push({co:''})
        break;

      case 'q':
        this.turnbooklist1[index]['qrs'].push({qr:(<HTMLInputElement>document.getElementById('qrsetter')).value});
        
        // (<HTMLInputElement>document.getElementById('qr_'+this.turnbooklist1.length+this.turnbooklist1[index]['qrs'].length)).value
        break;
    }
    
  }

  checker(index){
    let pt = (<HTMLInputElement>document.getElementById('pt_' + index)).value;
    

    if(pt==='NRCM'){
      let date = (<HTMLInputElement>document.getElementById('date_' + index)).value;
      let tno = (<HTMLInputElement>document.getElementById('truckno_' + index)).value;
      let pn = (<HTMLInputElement>document.getElementById('pn_' + index)).value;
      let p1 = (<HTMLInputElement>document.getElementById('p1_' + index)).value;
      let c = this.turnbooklist1[index]['contacts'];
      let q = this.turnbooklist1[index]['qrs'];
      let pac=12;
      let tol = (<HTMLInputElement>document.getElementById('tol_' + index)).value;
      let weight=(<HTMLInputElement>document.getElementById('weight_' + index)).value;
      let r = this.handleF.checkme([date,tno,pn,p1,c,q,tol,weight],['string','string','string','string','object','object','string','string'],[]);

      return r.every((value)=>{return value>0})
    }
    if(pt==='NR'){
      let date = (<HTMLInputElement>document.getElementById('date_' + index)).value;
      let tno = (<HTMLInputElement>document.getElementById('truckno_' + index)).value;
      let pn = (<HTMLInputElement>document.getElementById('pn_' + index)).value;
      let p1 = (<HTMLInputElement>document.getElementById('p1_' + index)).value;
      let c = this.turnbooklist1[index]['contacts'];
      let r = this.handleF.checkme([date,tno,pn,p1,c],['string','string','string','string','object'],[]);
      let pac=363;

      return r.every((value)=>{return value>0})
    }
    if(pt==='SNL'){
      let pac=65;
      let date = (<HTMLInputElement>document.getElementById('date_' + index)).value;
      let tno = (<HTMLInputElement>document.getElementById('truckno_' + index)).value;
      let pn = (<HTMLInputElement>document.getElementById('pn_' + index)).value;
      let p1 = (<HTMLInputElement>document.getElementById('p1_' + index)).value;
      let c = this.turnbooklist1[index]['contacts'];
      let r = this.handleF.checkme([date,tno,pn,p1,c],['string','string','string','string','object'],[]);

      return r.every((value)=>{return value>0})
    }
    else{
      alert('Cannot Lock Select Party Type!');
      return false;
    }

  }
lulAll(){
  for(let i = 0;i<this.turnbooklist1.length;i++){
    this.turnbooklist1[i]['lul']='unlock'
    this.submission[i]=1;
  }
  this.submitButton=this.submission.every((value)=>{return value>0})
}

  lul(index,data){
  if(this.checker(index)){

    switch (data) {
      case 'lock':
        this.turnbooklist1[index]['lul']='unlock'
        this.submission[index]=1;
        
        this.submitButton=this.submission.every((value)=>{return value>0})
      break;
    
      case 'unlock':
        this.turnbooklist1[index]['lul']='lock'
        this.submission[index]=0;
        this.submitButton=this.submission.every((value)=>{return value>0})
      break;
    }
  }
  else{
alert('Incomplete Fields! Cannot Lock!')
  }
  }

  delete(index,data,index2){
    switch (data) {
      case 'r':
      if(confirm('Do you want to delete entire row?')){
        this.turnbooklist1.splice(index,1);
        this.submitButton=this.submission.every((value)=>{return value>0})
      }
        break;
    
      case 'c':
        this.turnbooklist1[index]['contacts'].splice(index2,1);
        this.submitButton=this.submission.every((value)=>{return value>0})
        break;

      case 'q':
        this.turnbooklist1[index]['qrs'].splice(index2,1);
        this.submitButton=this.submission.every((value)=>{return value>0})
        break;
    }
  }


  save(){
    let array=[]
    for(let i =0;i<this.turnbooklist1.length;i++){
      let temp={};
      let c = []
      let q=[]
      let date = (<HTMLInputElement>document.getElementById('date_' + i)).value;
      let tno = (<HTMLInputElement>document.getElementById('truckno_' + i)).value;
      let pt = (<HTMLInputElement>document.getElementById('pt_' + i)).value;
      let pn = (<HTMLInputElement>document.getElementById('pn_' + i)).value;
      let p1 = (<HTMLInputElement>document.getElementById('p1_' + i)).value;
      let p2 = (<HTMLInputElement>document.getElementById('p2_' + i)).value;
      let tol = pt==='NRCM'?(<HTMLInputElement>document.getElementById('tol_' + i)).value:'Other';
      let weight = pt==='NRCM'?(<HTMLInputElement>document.getElementById('weight_' + i)).value:0;
      let pac = pt==='NRCM'?12:(pt==='NR'?363:65)
      let tb = pt==='NRCM'?2950:0;
      for(let j=0;j<this.turnbooklist1[i]['contacts'].length;j++){
        c.push((<HTMLInputElement>document.getElementById('co_' + i+j)).value)
      }
      for(let j=0;j<this.turnbooklist1[i]['qrs'].length;j++){
        q.push((<HTMLInputElement>document.getElementById('qr_' + i+j)).value)
      }
      temp={
        'date' :date,
        'pac':pac,
        'tno' :tno,
        'pt' :pt,
        'pn' :pn,
        'p1' :p1,
        'p2' :p2==='Default'?'':p2,
        'tol' :tol==='Ratnagiri'?'Pipe':tol,
        'weight':weight,
        'c':c,
        'q':q,
        'tb':tb,
        'plant':tol==='Ratnagiri'?'Ratnagiri':(tol==='Pipe'?'Urse':'Talegaon')
      }
      array.push(temp);
    }
    let tempObj = { "method": "addnewturn",'array':array,tablename:'' };
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          alert(res.Status);
          this.turnbooklist1=[];
        });
  }

  partyOk(){
    
    let tempObj = { "method": "setPartyOk",tablename:'' };
      this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
        .subscribe((res: any) => {
          alert(res.Status);
        });
  }

  
}