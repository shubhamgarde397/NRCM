import { Injectable } from '@angular/core';
import { Consts } from '../../constants/const';
import { SecurityCheckService } from '../Data/security-check.service';
@Injectable({
  providedIn: 'root'
})
export class HandleDataService {

  public Data;
  public flag = false;
  public commonArray = {
    "gstdetails": [{}],
    "ownerdetails": [{}],
    "villagenames": [{}],
    "lrlist": [{}],
    "hiddenownerdetails": [{}],
    "transport":[{}],
    "dues":[{}],
    "Role": 6
  }
  public hugeData=[]
  public IP = [];
  public turnData = [];
  public BHData = [];
  public PPData=[];
  public PaymentData=[]
  public updateTurnData=false;
  public users
  public arr=[];
  constructor(public securityCheck: SecurityCheckService) { }

  saveLRStatus(data){
    
    this.arr=data;
  }

  getLRStatus(){
    return this.arr;
  }
  setUsers(data){
    this.users=[];
    this.users=data;

  }
  getUsers(){
    return this.users;
  }

  saveData(data) {
    this.Data = data;
  }
  giveBHData(){
    return this.Data;
  }

  saveTurn(data) {
    this.turnData = data;
  }

  giveTurn() { return this.turnData; }
  
  createConsiderArray(data) {
    let tempCArr = [];
    let tempArrofAPI = [];
    
    tempArrofAPI = this.getIndexes(data);
    
    for (let i = 0; i < tempArrofAPI.length; i++) {
      tempCArr[tempArrofAPI[i][0].index] = 1;//use here tempArrOfAPI[0].index
    }
    for (let i = 0; i < Object.keys(this.commonArray).length; i++) {
      if (tempCArr[i] == undefined) { tempCArr[i] = 0; }
    }
    return this.checkForData(tempCArr);
  }
  getIndexes(data) {
    switch (data) {
      case 'default':
        return [Consts.ROLE_INDEX];
      case 'turnbookadd':
        return [Consts.GST_INDEX, Consts.VILLAGE_INDEX]
      case 'infotpt':
        return [Consts.TRANSPORT_INDEX]
    }
  }

  resetArray(data) {
    switch (data) {
      case 'full':
        this.securityCheck.IP = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

  }

  checkForData2(Arr, API) {


    this.commonArray = this.securityCheck.commonArray;

    for (let j = 0; j < API.length; j++) {//this looping system is not working
      if (API[j][0]['name'] === 'Role') { }
      else if (Object.keys(this.commonArray[API[j][0]['name']][0]).length > 0) {
        Arr[API[j['index']]] = 0;
      }
    }
    return Arr;
  }
  checkForData(Arr) {
    this.IP = this.securityCheck.IP;
    let Answer = [];
    for (let i = 0; i < this.IP.length; i++) {
      if (Arr[i] == 0) {
        Answer.push(Arr[i]);
      }
      else if (Arr[i] === 1) {
        if (this.IP[i] === 0) {
          Answer.push(Arr[i]);
          this.IP[i] = 1;
        }
        else if (this.IP[i] === 1) {
          Answer.push(0)
        }
      }
    }
    this.securityCheck.IP = this.IP;
    return Answer;
  }

  goAhead(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 1) { return true; }
    }
    return false;
  }
}
