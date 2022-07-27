import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConnectInfoService {
  private singlestoreUrl = 'https://svc-0379b673-486a-4fa9-bb6f-d51a9ba9be1a-dml.aws-oregon-2.svc.singlestore.com';
  private singlestoreUser = 'admin';
  private singlestorePass = '';
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
