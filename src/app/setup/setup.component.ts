import { Component, OnInit } from '@angular/core';
import {SinglestoreService} from "../singlestore/singlestore.service";
import {ConnectInfoService} from "../singlestore/connect-info.service";
import {SinglestoreExecResponse} from "../singlestore/singlestore-exec-response";
import {SinglestoreQueryResponse} from "../singlestore/singlestore-query-response";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  url: any;
  username: any;
  password: any;
  resultString: string = '';

  constructor( private conInfo: ConnectInfoService, private singlestore: SinglestoreService) {

  }

  ngOnInit(): void {
    this.url = this.conInfo.getUrl();
    this.username = this.conInfo.getUser();
    this.password = this.conInfo.getPass();
  }

  test() {
    let oConInfo: ConnectInfoService = new ConnectInfoService();
    oConInfo.setUrl(this.url);
    oConInfo.setUser(this.username);
    oConInfo.setPass(this.password);
    this.resultString = 'Testing'
    this.singlestore.pingTest(oConInfo).subscribe((response: SinglestoreQueryResponse) => {
      // @ts-ignore
      this.resultString = "Ping Response:" +  response.results.pop().rows.pop().pong;
    },error => {
      this.resultString = error.error;
    });
  }


  save() {
    this.conInfo.setUrl(this.url);
    this.conInfo.setUser(this.username);
    this.conInfo.setPass(this.password);
    this.resultString = 'Saved.'
  }
}
