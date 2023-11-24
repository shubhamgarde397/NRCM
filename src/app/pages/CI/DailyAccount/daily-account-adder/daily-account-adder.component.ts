import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-daily-account-adder',
  templateUrl: './daily-account-adder.component.html',
  styleUrls: ['./daily-account-adder.component.css'],
  providers: [ApiCallsService]
})
export class DailyAccountAdderComponent implements OnInit {

  public turn=[];
  public showdues=false;
public nrcmid=0;
public dueChangeValue;
public advamt;
public advdate;
public extra=[];a
public admin=false;
public truckno=''
public remark='';
public amount = 0;
public bigI='';
public Dues=[];
public DuesT=[];
public addDueDetailsTF=false;
public dueInfo;
public dueInfoPending;
public duesButton = true;
public dueMAmt;
public dueMDate;
  constructor(public apiCallservice: ApiCallsService,public handledata: HandleDataService,public sec:SecurityCheckService) { }

  ngOnInit() {
    this.nrcmid=this.sec.nrcmid;
    this.admin=true?this.nrcmid==1:false;
  }

  find(){
    
    this.duesButton=true;
    let tempObj={
      'tablename':'',
      'method':'getDailyAdvanceEmpty'
    }

    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      this.turn=res.balanceData
      this.Dues=res.Dues;
        this.DuesT=res.DuesT;
        this.findDues(res);
      this.showdues=true;
    });
  }   

  findDues(data){
    let boids=[]
    let doids=[]
    data.balanceData.forEach(r=>{boids.push(r['ownerid'])})


    data.Dues.forEach(r=>{doids.push(r['ownerid'])})

    doids.every(r=>{
      boids.every(y=>{
          if(r===y){
            this.duesButton=false;
              return false;
          }
          return true;//means continue the loop
      })
      return true;//means continue the loop
    })
// if data is true it means no dues, if data is false it means dues are there
  }

  dueChange(){
    let a=this.dueChangeValue.split('_')
    console.log(a);
    console.log(this.turn);
    
    this.addDueDetailsTF=true;
    this.dueInfo=this.turn[a[0]]['dues'][a[1]]
    this.dueInfoPending=this.turn[a[0]]['dues'][a[1]]['pending']
      }

  getDues(){
    this.turn.forEach(r=>{
          r['dues']=this.Dues.filter(t=>{
              return t.truckno===r.truckno 
          })
  })
  console.log(this.turn)
  }

  toModal(index){
    this.truckno=this.turn[index]['truckno']
    this.bigI=index;
  }
  calcTotalRent(index){
    let sum=0;
    sum=parseInt((<HTMLInputElement>document.getElementById('rent_'+index)).value);
    this.turn[index]['extra'].forEach(r=>{sum=sum+parseInt(r.extraAdvanceamt)})
    this.turn[index]['totalRent']=sum;

    this.turn[index]['tentativeBalance']=this.turn[index]['totalRent']-parseInt((<HTMLInputElement>document.getElementById('adv_'+index)).value);
  }

  calcTent(index){
    this.turn[index]['tentativeBalance']=
    this.turn[index]['totalRent']
    -this.turn[index]['advanceArray'].reduce((partialSum, a) => partialSum + a.amount, 0);
  }
  addToArray(){
    let temp={'extraAdvanceamt':this.amount,'extraAdvancemsg':this.remark};
  this.turn[this.bigI]['extra'].push(temp);
  this.calcTotalRent(this.bigI);
  }
  addToArrayAdv(){
    console.log(this.bigI);
    
    let temp={'amount':this.advamt,'date':this.advdate};
  this.turn[this.bigI]['advanceArray'].push(temp);
  console.log(this.turn[this.bigI]);
  
  this.calcTent(this.bigI);//work on this
  }
  update(){
let temp=[];
    for(let i=0;i<this.turn.length;i++){

    if(
      (<HTMLInputElement>document.getElementById('rent_'+i)).value===''
      ||
      (<HTMLInputElement>document.getElementById('tBal_'+i)).value===''
      ||
      (<HTMLInputElement>document.getElementById('wgt_'+i)).value===''
      ||
      (<HTMLInputElement>document.getElementById('cash_'+i)).value===''
      ||
      (<HTMLInputElement>document.getElementById('less_'+i)).value===''
      ||
      (<HTMLInputElement>document.getElementById('hamali_'+i)).value===''
      ||
      (<HTMLInputElement>document.getElementById('comm_'+i)).value===''

      ){}
    else{
      temp.push(
        {
          'ownerid':this.turn[i]['ownerid'],
          '_id':this.turn[i]['_id'],
          'rent':parseInt((<HTMLInputElement>document.getElementById('rent_'+i)).value),
          'advanceArray':this.turn[i]['advanceArray'],
          'tBal':parseInt((<HTMLInputElement>document.getElementById('tBal_'+i)).value),
          'w':parseInt((<HTMLInputElement>document.getElementById('wgt_'+i)).value),
          'cash':parseInt((<HTMLInputElement>document.getElementById('cash_'+i)).value),
          'less':parseInt((<HTMLInputElement>document.getElementById('less_'+i)).value),
          'hamali':parseInt((<HTMLInputElement>document.getElementById('hamali_'+i)).value),
          'comm':parseInt((<HTMLInputElement>document.getElementById('comm_'+i)).value),
          'extra':this.turn[i]['extra'],
          'advancecheck':(<HTMLInputElement>document.getElementById('check_'+i)).checked
        }
      )
    }
  }
    let tempObj={
      'tablename':'',
      'method':'storeDailyAdvanceAccId',
      'data':temp
    }

    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
      alert(res.Status)
    });
  }
tempDelete(i,j){
  this.turn[i]['extra'].splice(j,1)
}


storeDue(){
  
  
  
  if(this.dueMAmt>this.dueInfoPending){
    alert('Due amount cant be greater than pending amount.')
  }
  else if(this.dueMAmt===0){alert('Due amount cant be 0.')}
  else if(this.dueMAmt<=this.dueInfoPending){
  let a=this.dueChangeValue.split('_')
  console.log(this.turn);
  console.log(a);
let tbid=this.turn[a[0]]['_id']
let oid=this.turn[a[0]]['ownerid']
let duesid=this.turn[a[0]]['dues'][a[1]]['_id']
let duesdate=this.turn[a[0]]['dues'][a[1]]['date']

  let tempObj={
    'tbid':tbid,
    'oid':oid,
    'duesid':duesid,
    'dueDate':this.dueMDate,
    'dueAmt':this.dueMAmt,
    'totalDue':this.turn[a[0]]['dues'][a[1]]['amt'],
    'duesDate':duesdate,
    'type':'due',
    'msg':'Loan',
    'tablename':'',
    'method':'DuesUpdateFromAdvAcc'
  }

  this.apiCallservice.handleData_New_python
  ('commoninformation', 1, tempObj, true)
  .subscribe((res: any) => {
    alert(res.Status)
  });
}
}

}
