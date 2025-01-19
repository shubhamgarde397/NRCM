import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from 'node_modules/@angular/router';

@Component({
  selector: 'app-display-sequence',
  templateUrl: './display-sequence.component.html',
  styleUrls: ['./display-sequence.component.css'],
  providers: [ApiCallsService]
})
export class DisplaySequenceComponent implements OnInit {
  public myFormGroup: FormGroup;
  public usersArray=[];
  public show=false;
  public tptIdU;
  public nrcmids=[];
  public seqArray=[];
  public display;
  public sacha=[];

  constructor(public router:Router,public apiCallservice: ApiCallsService,public handledata: HandleDataService,public sec:SecurityCheckService,public formBuilder: FormBuilder) { 
    if(!this.sec.login){
      this.router.navigate([''])
    }
  }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      name: '',
      isParent:false,
      hasChildren:false,
      children:0,
      position:0,
      parentid:'',
      nrcmid:0,
      link:''
    });
  }

  addtonrcmids(j){
    this.nrcmids.push(this.usersArray[this.myFormGroup.value.nrcmid]);
  }

  delete(j){
this.nrcmids.splice(j,1);
  }
  
  switcher(data){
    
    switch (data) {
      case 'add':
        let tempObj={}

        tempObj = { "method": "getUserandSeq", "tablename": ''};    

        
        this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
          .subscribe((res: any) => {
              this.usersArray=res.Data[0];
              this.seqArray=res.Data[1];
              this.display=data; 
          });
          
        break;
        // getSequenceSacha
        case 'display':
          this.getUsers();
          let tempObj1={}

          tempObj1 = { "method": "getSequenceSacha", "tablename": ''};    
  
          
          this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj1, true)
            .subscribe((res: any) => {
                this.sacha=res.Data;
                this.display=data;
            });

            
        break;
    }
  }
//   {
//     "parent": "Daily Truck Details",
//     "link": "",
//     "children": [
//         {
//             "name": "Turn Book",
//             "link": "TURN_BOOK_HANDLER",
//             "childid": "6522b0ace703b28599cf0744",
//             "nrcmids": [
//                 "Shubham",
//                 "Anil Jamadar"
//             ],
//             "position": 21,
//             "isParent": false,
//             "hasChildren": false,
//             "children": 0
//         },
//         {
//             "name": "Balance Hire",
//             "link": "BALANCE_HIRE_HANDLER",
//             "childid": "6522b0bde703b28599cf0748",
//             "nrcmids": [
//                 "Shubham",
//                 "Anil Jamadar"
//             ],
//             "position": 22,
//             "isParent": false,
//             "hasChildren": false,
//             "children": 0
//         },
//         {
//             "name": "Poch Collection",
//             "link": "POCH_COLLECTION_HANDLER",
//             "childid": "6522b0c8e703b28599cf074c",
//             "nrcmids": [
//                 "Shubham",
//                 "Anil Jamadar"
//             ],
//             "position": 23,
//             "isParent": false,
//             "hasChildren": false,
//             "children": 0
//         },
//         {
//             "name": "Payment",
//             "link": "PARTY_PAYMENT_HANDLER",
//             "childid": "6522b0e1e703b28599cf0754",
//             "nrcmids": [
//                 "Shubham"
//             ],
//             "position": 25,
//             "isParent": false,
//             "hasChildren": false,
//             "children": 0
//         },
//         {
//             "name": "Turnbook Location",
//             "link": "TURN_BOOK_LOCATION_DISP",
//             "childid": "6522b0eee703b28599cf0758",
//             "nrcmids": [
//                 "Shubham"
//             ],
//             "position": 26,
//             "isParent": false,
//             "hasChildren": false,
//             "children": 0
//         },
//         {
//             "name": "Daily Account Details",
//             "link": "DAILY_ACCOUNT_ADDER",
//             "childid": "6522b0f8e703b28599cf075c",
//             "nrcmids": [
//                 "Shubham",
//                 "Jyoti Garde"
//             ],
//             "position": 27,
//             "isParent": false,
//             "hasChildren": false,
//             "children": 0
//         }
//     ],
//     "parentid": "6522afc9e703b28599cf071d",
//     "nrcmids": [
//         "Shubham",
//         "Anil Jamadar",
//         "Jyoti Garde"
//     ],
//     "position": 2,
//     "isParent": true,
//     "hasChildren": true,
//     "nochildren": 7
// }
  check(){
    let newsacha=[]
   
    for(let i=0;i<this.sacha.length;i++){
      let tempPS={}
      tempPS['parent']=(<HTMLInputElement>document.getElementById('parent_'+i)).value
      tempPS['link']=(<HTMLInputElement>document.getElementById('link_'+i)).value
      tempPS['children']=[]
      tempPS['parentid']=this.sacha[i]['parentid']
      tempPS['nrcmids']=this.sacha[i]['nrcmids']
      tempPS['position']=(<HTMLInputElement>document.getElementById('position_'+i)).value
      tempPS['isParent']=(<HTMLInputElement>document.getElementById('isParent_'+i)).checked
      tempPS['hasChildren']=(<HTMLInputElement>document.getElementById('hasChildren_'+i)).checked
      tempPS['nochildren']=parseInt((<HTMLInputElement>document.getElementById('children_'+i)).value);
      
      for(let j=0;j<this.sacha[i]['children'].length;j++){
        let tempCS={}
        tempCS['name']=(<HTMLInputElement>document.getElementById('name_'+i+'_'+j)).value
        tempCS['link']=(<HTMLInputElement>document.getElementById('link_'+i+'_'+j)).value
        tempCS['childid']=this.sacha[i]['children'][j]['childid'];
        tempCS['nrcmids']=this.sacha[i]['children'][j]['nrcmids'];
        tempCS['position']=(<HTMLInputElement>document.getElementById('position_'+i+'_'+j)).value
        
        
        
        tempCS['isParent']=(<HTMLInputElement>document.getElementById('isParent_'+i+'_'+j)).checked
        tempCS['hasChildren']=(<HTMLInputElement>document.getElementById('hasChildren_'+i+'_'+j)).checked
        tempCS['children']=parseInt((<HTMLInputElement>document.getElementById('children_'+i+'_'+j)).value)
        tempPS['children'].push(tempCS);
      }
      newsacha.push(tempPS);
    }

    let temp={
      Data:newsacha,
      method:'updatesequencesacha',
      tablename:''
  
      }
      this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
      .subscribe((res: any) => {
          alert(res.Status)
      });
  }

  addPid(indexParent,rev,y){
    if(rev==='parent'){
    this.sacha[indexParent]['nrcmids'].push((<HTMLInputElement>document.getElementById('nrcmid_'+indexParent)).value);
    }
    else if(rev==='child'){
      this.sacha[indexParent]['children'][y]['nrcmids'].push((<HTMLInputElement>document.getElementById('nrcmid_'+indexParent+'_'+y)).value);
    }
  }

  deletePid(j,s,rev,y){
    if(rev==='parent'){
    this.sacha[s]['nrcmids'].splice(j,1);
    }
    else if(rev==='child'){
      this.sacha[s]['children'][y]['nrcmids'].splice(j,1);
      }
  }

  store(){
    let temp={
    name:this.myFormGroup.value.name,
    isParent:this.myFormGroup.value.isParent,
    hasChildren:this.myFormGroup.value.hasChildren,
    children:this.myFormGroup.value.children,
    position:String(this.myFormGroup.value.position),
    parentid:this.myFormGroup.value.parentid,
    nrcmids:this.nrcmids.map(r=>{return r.nrcmid}),
    link:this.myFormGroup.value.link,
    method:'sequnceInsert',
    tablename:''

    }
    this.apiCallservice.handleData_New_python('commoninformation', 1, temp, true)
    .subscribe((res: any) => {
        alert(res.Status)
    });
    
  }

 
  getUsers(){
    let tempObj={}

    tempObj = { "method": "getTptUsersLogin", "tablename": ''};    

    
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
          this.usersArray=res.Data;
          this.show=this.usersArray.length==0?true:false;
      });
  }
}

