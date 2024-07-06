import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityCheckService {
  public yearNames = [];
  public monthNames;
  public login=false;
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
  public commonBalanceHire = [];

  public AUTH = false;
  public username;
  public username2;
  public role = 6;
  public amountShow=false;
  public branch='';
  public dname;
  public userid;
  public arr;
  public nrcmid;
  public firstTime;
  public seq=[];
  public noti=[];
  constructor() {
    this.yearNames = this.generateYears();
  }

  setAmountShow(data){
this.amountShow=data;
  }
  getAmountShow(){
    return this.amountShow;
  }
  setLoginTrue(){
    this.login=true;
  }
  setBranch(data){
    this.branch=data;
  }
  getBranch(){
    return this.branch;
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
  setSequence(data){
    this.seq=data;
  }
  setNotifications(data){
    this.noti=data;
  }
  getNoti(){
    return this.noti;
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
  getNRCMid(){
    return this.nrcmid;
  }
  setTruckData(data){
    this.arr=data;
  }

  setRole(role) {
    this.role = role;
  }


}
