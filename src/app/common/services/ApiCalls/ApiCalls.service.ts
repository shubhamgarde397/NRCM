import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { getFullApi } from './getFullApi.service';
import { handleFunction } from '../functions/handleFunctions';
import {
  CognitoUser, CognitoUserPool,
  CognitoUserSession, AuthenticationDetails
} from 'amazon-cognito-identity-js'
import { BehaviorSubject, Observable } from 'rxjs';
import { SecurityCheckService } from '../Data/security-check.service';
import { MatLineSetter } from '@angular/material';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { ObsServiceService } from '../Data/obs-service.service';

const PoolData = {
  UserPoolId: 'ap-south-1_ZzgcCts3f',
  ClientId: '7bkru6bi0c03bm2280b38tv5da'
}
const userPoolData = new CognitoUserPool(PoolData);


@Injectable()
export class ApiCallsService {
  private authService = new BehaviorSubject('false');
  public authSuccess = this.authService.asObservable();
  public headerPost: HttpHeaders;
  public URL = '';
  constructor(public http: Http, public httpClient: HttpClient, public obs: ObsServiceService, public getfullapi: getFullApi, public handlefunction: handleFunction, public security: SecurityCheckService, public router: Router) { }
  handleAWS(api, formBody = {}) {
    this.getAuthenticatedUser().getSession((err, session) => {
      let headers = new Headers({ 'Authorization': session.getIdToken().getJwtToken() })
      if (err) { alert(err); return err; }
      else {
        return this.http.post(this.getfullapi.getFullAPI(api), formBody, { headers: headers })
          .subscribe((res: any) => {
            if (JSON.parse(res._body.replace(/ /g, '').replace(/\n/g, '')).Status === 'Done') {
              alert('Added!');
            } else {
              alert('Error')
            }
          }, (err) => { alert(err) });
      }
    })

  }
  handleData_New(code, api, apiCall, noOfIDs: number, formBody = {}, id1?, id2?, id3?) {
    this.headerPost = new HttpHeaders();
    this.headerPost.append('Content-Type', 'application/json');
    formBody['code'] = code;
    switch (noOfIDs) {
      case 0: this.URL = this.getfullapi.appendAPIwithIDS(api, noOfIDs); break;
      case 1: this.URL = this.getfullapi.appendAPIwithIDS(api, noOfIDs, id1); break;
      case 2: this.URL = this.getfullapi.appendAPIwithIDS(api, noOfIDs, id1, id2); break;
      case 3: this.URL = this.getfullapi.appendAPIwithIDS(api, noOfIDs, id1, id2, id3); break;
    }

    switch (apiCall) {
      case 0: return this.http.get(this.URL).pipe(map((res) => res));
      case 1: return this.httpClient.post(this.URL, formBody, { headers: this.headerPost }).pipe(map((res) => res));
      case 2: return this.http.delete(this.URL).pipe(map((res) => res));
      case 3: return this.httpClient.put(this.URL, formBody, { headers: this.headerPost }).pipe(map((res) => res));
      case 4: return this.httpClient.post(this.URL, formBody, { headers: this.headerPost, responseType: 'text' }).pipe(map((res) => res));
    }
  }

  handleData_New_Temp(api, apiCall, formBody = {}, code) {
    formBody['code'] = code;
    this.getAuthenticatedUser().getSession((err, session) => {
      const headers = {
        headers: new Headers({ 'Authorization': session.getIdToken().getJwtToken() })
      }
      if (err) { console.log(err); return err }
      else {
        this.URL = this.getfullapi.getFullAPI(api);
        console.log(this.URL);
        switch (apiCall) {
          case 0: this.http.get(this.URL).pipe(map((res) => res));
          case 1: this.http.post(this.URL, formBody, headers).subscribe((res) => { alert('Done') }, (err) => { console.log(err) });
          case 2: this.http.delete(this.URL).pipe(map((res) => res));
          case 3: this.httpClient.put(this.URL, formBody, { headers: this.headerPost }).pipe(map((res) => res));
          case 4: this.httpClient.post(this.URL, formBody, { headers: this.headerPost, responseType: 'text' }).pipe(map((res) => res));
          case 5: this.http.post(this.URL, formBody, headers).subscribe((res) => { this.obs.savePipe(res.json()) }, (err) => { console.log(err) });
        }
      }
    })

  }

  handleImage(formBody, api) {
    // this.handlefunction.createHeader();
    this.URL = this.getfullapi.appendAPIwithIDS(api, 0);
    return this.httpClient.post(this.URL, formBody, { headers: this.headerPost }).pipe(map((res) => res));
  }

  handleData_Pyhon(api, apiCall, formBody) {
    // this.handlefunction.createHeader();
    this.URL = this.getfullapi.appendAPIwithIDS(api, 0);
    switch (apiCall) {

      case 0: return this.http.post(`${'http://localhost:5000/' + api}`, formBody).pipe(map((res: any) => res));
      // case 0: return this.http.post(`${'http://18.219.49.104:5000/' + api}`, formBody).pipe(map((res: any) => res));
    }
  }
  signIn(username: string, password: string): void {
    const authData = {
      Username: username,
      Password: password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: username,
      Pool: userPoolData
    }
    const cognitoUSer = new CognitoUser(userData);
    const that = this;
    cognitoUSer.authenticateUser(authDetails, {
      onSuccess(res: CognitoUserSession) {
        console.log(res);
        that.setter('true');
        that.security.AUTH = true;
        that.router.navigate(['Navigation']);
      }, onFailure(err) {
        alert('There was an error signing u in');
        that.setter('false');
        that.security.AUTH = false;
      }
    })
    return;
  }
  getAuthenticatedUser() {
    return userPoolData.getCurrentUser();
  }
  logout() {
    this.getAuthenticatedUser().signOut();
    this.authService.next('false');
  }
  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    const obs = Observable.create((observer) => {
      if (!user) {
        observer.next(false);
      } else {
        user.getSession((err, session) => {
          if (err) {
            observer.next(false);
          } else {

            if (session.isValid()) {
              observer.next(true);
            } else {
              observer.next(false);
            }
          }
        })
      }
      observer.complete();
    });
    return obs;
  }
  setter(val) {
    this.authService.next(val);
  }
  initAuth() {
    this.isAuthenticated().subscribe(
      (auth) => this.authService.next(String(auth))
    );
  }

}
