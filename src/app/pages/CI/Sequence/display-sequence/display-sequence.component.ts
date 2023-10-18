import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(public apiCallservice: ApiCallsService,public handledata: HandleDataService,public sec:SecurityCheckService,public formBuilder: FormBuilder) { }

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
    console.log(this.usersArray);
    console.log(j);
    
    this.nrcmids.push(this.usersArray[this.myFormGroup.value.nrcmid]);
    // console.log(this.nrcmids);
    
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

  store(){
    let temp={
    name:this.myFormGroup.value.name,
    isParent:this.myFormGroup.value.isParent,
    hasChildren:this.myFormGroup.value.hasChildren,
    children:this.myFormGroup.value.children,
    position:this.myFormGroup.value.position,
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

