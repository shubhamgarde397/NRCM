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
    "qr": [{}],
    // "regularparty": [{}],
    // "RegularTruck": [{}],
    // "thoughts": [{}],
    "Role": 6
  }
  public IP = [];
  public turnData = [];
  public BHData = [];
public PPData=[];
  public PaymentData=[]

  constructor(public securityCheck: SecurityCheckService) { }

  savePaymentData(data){
    this.PaymentData=data;
  }
  givePaymentData(){
    return this.PaymentData;
  }
  savePPData(data){
    this.PPData=data;
  }
  givePPData(){
    return this.PPData;
  }
  
  notification(value) {
    this.flag = value;
  }

  checkNotification() {
    return this.flag;
  }

  saveData(data) {
    this.Data = data;
  }
  saveTurn(data) {
    this.turnData = data;
  }

  giveTurn() { return this.turnData; }

  saveBH(data) {
    this.BHData = [];
    this.BHData = data;
  }

  giveBH() { return this.BHData; }

 

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
    // return this.checkForData(tempCArr, tempArrofAPI);
    return this.checkForData(tempCArr);
    // return tempCArr;
  }
  getIndexes(data) {
    switch (data) {
      case 'default':
        return [Consts.ROLE_INDEX];
      case 'first':
        return [Consts.ROLE_INDEX, Consts.OWNER_INDEX];//send everything not sprecific to index
      case 'booking':
        return [Consts.GST_INDEX, Consts.VILLAGE_INDEX];
      case 'infogst':
        return [Consts.GST_INDEX, Consts.VILLAGE_INDEX];
      case 'infogstonly':
        return [Consts.GST_INDEX];
      case 'infoowner':
        return [Consts.OWNER_INDEX, Consts.VILLAGE_INDEX];
      case 'infoonlyowner':
        return [Consts.OWNER_INDEX];
      case 'infovillage':
        return [Consts.VILLAGE_INDEX];
      case 'turnbook':
        return [Consts.VILLAGE_INDEX, Consts.OWNER_INDEX];
      case 'turnbookadd':
        return [Consts.GST_INDEX, Consts.VILLAGE_INDEX,Consts.QR_INDEX]
      case 'infolrlist':
        return [Consts.LRLIST_INDEX]
      case 'infohiddenlist':
        return [Consts.HIDDEN_TRUCK_INDEX]
      case 'infoqr':
        return [Consts.GST_INDEX, Consts.VILLAGE_INDEX,Consts.QR_INDEX]

    }
  }

  resetArray(data) {
    switch (data) {
      // case 'turnbook':
      //   this.securityCheck.IP[Consts.TRUCKDETAILS_INDEX[0].index] = 0;
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
