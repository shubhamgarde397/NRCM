import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityCheckService {
  public yearNames = [];
  public monthNames;
  public IP = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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
  public nrcmid;
  public commonBalanceHire = [];

  public AUTH = false;
  public username;
  public dname;
  public userid;
  public username2;
  public role = 6;
  public typeofuser = 3;
  public amountShow=false;
  constructor() {
    this.yearNames = this.generateYears();
  }

  setAmountShow(data){
this.amountShow=data;
  }
  getAmountShow(){
    return this.amountShow;
  }


  authenticate(a) {
    if (a === 'hi') {
      return true;
    } else {
      return false;
    }
  }

  generateYears() {
    let startYear = 2019
    let currentYear = new Date().getFullYear();
    let toAdd = currentYear - startYear;
    let arr = [2019];
    for (let i = 0; i < toAdd; i++) {
      arr.push(startYear + i + 1)
    }
    return arr;
  }
  setUsername(username) {
    this.username = username;
  }

  setDisplayname(name){
    this.dname = name;
  }
  setUserid(_id){
    this.userid=_id;
  }
  setUserName(data){
    this.username2=data;
  }
  setNRCMid(data){
    this.nrcmid=data;
  }

  setRole(role) {
    this.role = role;
  }

  setTypeOfUser(data) {
    this.typeofuser = data;
  }
  getTypeOfUser() {
    return this.typeofuser
  }

}
