import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { getFullApi } from './getFullApi.service';
import { handleFunction } from '../functions/handleFunctions';
import { SecurityCheckService } from '../Data/security-check.service';
import { Router } from '@angular/router';
import { ObsServiceService } from '../Data/obs-service.service';
import { HandleDataService } from '../Data/handle-data.service';


@Injectable()
export class ApiCallsService {
  public headerPost: HttpHeaders;
  public URL = '';

  constructor(public hs: HandleDataService, public http: Http, public httpClient: HttpClient, public securityCheck: SecurityCheckService, public obs: ObsServiceService, public getfullapi: getFullApi, public handlefunction: handleFunction, public security: SecurityCheckService, public router: Router) {

  }

  handleData_New_python(api, apiCall, formBody = {},shallI=true,todayDate=this.handlefunction.createDate(new Date())) {
    formBody['user'] = this.securityCheck.username;
    formBody['todayDate']=todayDate;
    formBody['website'] = this.securityCheck.getBranch();
    formBody['nrcmid'] = this.securityCheck.nrcmid;
    this.headerPost = new HttpHeaders();
    this.headerPost.append('Content-Type', 'application/json');
    this.URL = this.getfullapi.getFullAPI(api);
   if(this.shallIGoForward(shallI,formBody)){
    switch (apiCall) {
      case 0: return this.http.get(this.URL).pipe(map((res) => res));
      case 1: return this.httpClient.post(this.URL, formBody, { headers: this.headerPost }).pipe(map((res) => res));
      case 2: return this.http.delete(this.URL).pipe(map((res) => res));
      case 3: return this.httpClient.put(this.URL, formBody, { headers: this.headerPost }).pipe(map((res) => res));
      case 4: return this.httpClient.post(this.URL, formBody, { headers: this.headerPost, responseType: 'text' }).pipe(map((res) => res));
    }
   }
   else{alert('Request Denied! Some entries are wrong. Correct it or Redo it.')}
  }

  shallIGoForward(shallI,data){
    if(shallI){
    return true;
    }
    else{
      switch (data['method']) {
        case 'gstinsert':
          return true;

      
      }
      return false;
    }
  }

}
