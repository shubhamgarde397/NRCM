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
public extra=[];
public admin=false;
public truckno=''
public remark='';
public amount = 0;
public bigI='';
public Dues=[];
public DuesT=[];
public duesButton = true;
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
  
  getDues(){
    this.turn.forEach(r=>{
      r.truckData.forEach(s=>{
          s['dues']=this.Dues.filter(t=>{
              return t.truckno===s.truckno 
          })
          
      })
      
  })
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
    this.turn[index]['tentativeBalance']=this.turn[index]['totalRent']-parseInt((<HTMLInputElement>document.getElementById('adv_'+index)).value);
  }
  addToArray(){
    let temp={'extraAdvanceamt':this.amount,'extraAdvancemsg':this.remark};
  this.turn[this.bigI]['extra'].push(temp);
  this.calcTotalRent(this.bigI);
  }
  update(){
let temp=[];
    for(let i=0;i<this.turn.length;i++){

    if(
      (<HTMLInputElement>document.getElementById('rent_'+i)).value===''
      ||
      (<HTMLInputElement>document.getElementById('adv_'+i)).value===''
      ||
      (<HTMLInputElement>document.getElementById('advDate_'+i)).value===''
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
          'adv':parseInt((<HTMLInputElement>document.getElementById('adv_'+i)).value),
          'advDate':(<HTMLInputElement>document.getElementById('advDate_'+i)).value,
          'tBal':parseInt((<HTMLInputElement>document.getElementById('tBal_'+i)).value),
          'w':parseInt((<HTMLInputElement>document.getElementById('wgt_'+i)).value),
          'cash':parseInt((<HTMLInputElement>document.getElementById('cash_'+i)).value),
          'less':parseInt((<HTMLInputElement>document.getElementById('less_'+i)).value),
          'hamali':parseInt((<HTMLInputElement>document.getElementById('hamali_'+i)).value),
          'comm':parseInt((<HTMLInputElement>document.getElementById('comm_'+i)).value),
          'extra':this.turn[i]['extra']
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
}
