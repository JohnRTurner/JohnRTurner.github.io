import { Component, OnInit } from '@angular/core';
import {SinglestoreService} from "../singlestore/singlestore.service";
import {ConnectInfoService} from "../singlestore/connect-info.service";
import {SinglestoreQueryResponse} from "../singlestore/singlestore-query-response";
import {QueryInfoService} from "../singlestore/query-info.service";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  url: any;
  username: any;
  password: any;
  database: any;
  tableName: any;
  columnName: any;
  resultString: string = '';

  constructor( private conInfo: ConnectInfoService, private queryInfo: QueryInfoService, private singlestore: SinglestoreService) {
  }

  ngOnInit(): void {
    this.url = this.conInfo.getUrl();
    this.username = this.conInfo.getUser();
    this.password = this.conInfo.getPass();
    this.database = this.queryInfo.getDatabase();
    this.tableName = this.queryInfo.getTable();
    this.columnName = this.queryInfo.getColumn();
  }

  testAndSave() {
    let oConInfo: ConnectInfoService = new ConnectInfoService();
    let oQueryInfo: QueryInfoService = new QueryInfoService();
    oConInfo.setUrl(this.url);
    oConInfo.setUser(this.username);
    oConInfo.setPass(this.password);
    oQueryInfo.setDatabase(this.database);
    oQueryInfo.setTable(this.tableName);
    oQueryInfo.setColumn(this.columnName);
    this.resultString = 'Testing'
    this.singlestore.pingTest(oConInfo).subscribe((response: SinglestoreQueryResponse) => {
      this.conInfo.setUrl(this.url);
      this.conInfo.setUser(this.username);
      this.conInfo.setPass(this.password);
      this.queryInfo.setDatabase(this.database);
      this.queryInfo.setTable(this.tableName);
      this.queryInfo.setColumn(this.columnName);
      // @ts-ignore
      this.resultString = "Ping Response:" +  response.results.pop().rows.pop().pong + " Saved: true";
    },error => {
      this.resultString = error.error;
    });
  }
}
