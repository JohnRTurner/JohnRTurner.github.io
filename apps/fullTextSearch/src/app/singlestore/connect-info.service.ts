import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConnectInfoService {
  private singlestoreUrl = 'https://https://svc-fe26dcc3-9def-46f2-91e7-2608d73b8849-dml.aws-virginia-2.svc.singlestore.com';
  private singlestoreUser = 'admin';
  private singlestorePass = 'S1ngleSt0r31';
  private singlestoreOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' + Buffer.from(this.singlestoreUser + ':' + this.singlestorePass , 'utf8').toString('base64')
    })
  };
  constructor() { }
  setUrl(url: string){
    this.singlestoreUrl = url;
  }
  getUrl():string{
    return this.singlestoreUrl;
  }
  setUser(user: string){
    this.singlestoreUser = user;
    this.singlestoreOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + Buffer.from(this.singlestoreUser + ':' + this.singlestorePass , 'utf8').toString('base64')
      })
    };
  }
  getUser():string{
    return this.singlestoreUser;
  }
  setPass(pass: string){
    this.singlestorePass = pass;
    this.singlestoreOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + Buffer.from(this.singlestoreUser + ':' + this.singlestorePass , 'utf8').toString('base64')
      })
    };
  }
  getPass():string{
    return this.singlestorePass;
  }

  getSinglestoreOptions():{headers: HttpHeaders}{
    return this.singlestoreOptions;
  }



}
