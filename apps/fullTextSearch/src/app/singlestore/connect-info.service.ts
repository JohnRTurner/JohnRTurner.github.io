import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConnectInfoService {
  private singlestoreUrl = 'https://svc-322a7cb4-02ec-4cd2-b9e7-7c091669dcd7-dml.aws-virginia-3.svc.singlestore.com';
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
