import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SingelstoreRequest} from "./singelstore-request";
import {SinglestoreExecResponse} from "./singlestore-exec-response";
import {ConnectInfoService} from "./connect-info.service";
import {SinglestoreQueryResponse} from "./singlestore-query-response";
import {SinglestoreTuppleResponse} from "./singlestore-tupple-response";

@Injectable({
  providedIn: 'root'
})
export class SinglestoreService {
  constructor( private http: HttpClient, private conInfo: ConnectInfoService) { }

  exec(execRequest: SingelstoreRequest){
    return this.http.post<SinglestoreExecResponse>(this.conInfo.getUrl() + '/api/v2/exec',
      execRequest,
      this.conInfo.getSinglestoreOptions());
  }
/*
  ping(){
    return this.http.get(this.conInfo.getUrl() + '/api/v2/ping', {responseType: 'text'} );
  }

  pingTest(tConInfo: ConnectInfoService){
    return this.http.get(tConInfo.getUrl() + '/api/v2/ping', {responseType: 'text'});
  }
*/
  ping(){
    return this.http.post<SinglestoreQueryResponse>(this.conInfo.getUrl() + '/api/v2/query/rows',
      {sql: "select \"pong\""},
      this.conInfo.getSinglestoreOptions() );
  }

  pingTest(tConInfo: ConnectInfoService){
    return this.http.post<SinglestoreQueryResponse>(tConInfo.getUrl() + '/api/v2/query/rows',
      {sql: "select \"pong\""},
      tConInfo.getSinglestoreOptions() );
  }


  query(execRequest: SingelstoreRequest){
    return this.http.post<SinglestoreQueryResponse>(this.conInfo.getUrl() + '/api/v2/query/rows',
      execRequest,
      this.conInfo.getSinglestoreOptions());
  }

  queryTupple(execRequest: SingelstoreRequest){
    return this.http.post<SinglestoreTuppleResponse>(this.conInfo.getUrl() + '/api/v2/query/tuples',
      execRequest,
      this.conInfo.getSinglestoreOptions());
  }

}
