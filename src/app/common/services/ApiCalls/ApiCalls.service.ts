import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { getFullApi } from './getFullApi.service';
import { handleFunction } from '../functions/handleFunctions';

@Injectable()
export class ApiCallsService {

  public headerPost: HttpHeaders;
  public URL = '';

  constructor(public http: Http, public httpClient: HttpClient, public getfullapi: getFullApi, public handlefunction: handleFunction) { }

  handleData_New(dbName, api, apiCall, noOfIDs: number, formBody = {}, id1?, id2?, id3?) {
    this.handlefunction.createHeader();
    switch (noOfIDs) {
      case 0: this.URL = this.getfullapi.appendAPIwithIDS(api, noOfIDs); break;
      case 1: this.URL = this.getfullapi.appendAPIwithIDS(api, noOfIDs, id1); break;
      case 2: this.URL = this.getfullapi.appendAPIwithIDS(api, noOfIDs, id1, id2); break;
      case 3: this.URL = this.getfullapi.appendAPIwithIDS(api, noOfIDs, id1, id2, id3); break;
    }
    if (Object.keys(formBody).length === 0) {
      formBody['dbName'] = dbName;
    } else if (Object.keys(formBody).length > 0) {
      formBody['dbName'] = dbName;
    }
    switch (apiCall) {
      case 0: return this.http.get(this.URL).pipe(map((res) => res));
      case 1: return this.httpClient.post(this.URL, formBody, { headers: this.headerPost }).pipe(map((res) => res));
      case 2: return this.http.delete(this.URL).pipe(map((res) => res));
      case 3: return this.httpClient.put(this.URL, formBody, { headers: this.headerPost }).pipe(map((res) => res));
      case 4: return this.httpClient.post(this.URL, formBody, { headers: this.headerPost, responseType: 'text' }).pipe(map((res) => res));
    }
  }

  handleImage(formBody) {
    // const httpOption1 = {
    //   headers: new HttpHeaders({})
    // };
    this.handlefunction.createHeader();
    return this.httpClient.post('http://localhost:3000/image/addImage', formBody, { headers: this.headerPost }).pipe(map((res) => res));
  }

  handleData_Pyhon(api, apiCall, formBody) {
    this.handlefunction.createHeader();
    this.URL = this.getfullapi.appendAPIwithIDS(api, 0);
    switch (apiCall) {
      case 0: return this.http.post(`${'http://localhost:5000/' + api}`, formBody).pipe(map((res: any) => res));
      // case 0: return this.http.post(`${'http://18.219.49.104:5000/' + api}`, formBody).pipe(map((res: any) => res));
    }
  }



}
