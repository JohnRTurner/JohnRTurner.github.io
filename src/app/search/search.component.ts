import { Component, OnInit } from '@angular/core';
import {SinglestoreService} from "../singlestore/singlestore.service";
import {SinglestoreTuppleResponse} from "../singlestore/singlestore-tupple-response";
import {QueryInfoService} from "../singlestore/query-info.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchString: string = "";
  resultString: string = "";
  tablecols: string[] = [];
  tablerows: string[][] = [];

  constructor(private singlestore: SinglestoreService, private queryInfo: QueryInfoService) { }

  ngOnInit(): void {
  }
  /*
  this.singlestore.exec({sql: "create database mytestdb123"}).subscribe((response:SinglestoreExecResponse) => {
    this.resultString = "Last Inserted:" +  response.lastInsertId.toString() + " Rows Affected:" + response.rowsAffected.toString();
  },error => {
    this.resultString = error.error;
  });
  */

  search() {
    if(this.searchString.length > 0){
      this.resultString = "Searching...";
      this.tablerows = [];
      this.singlestore.queryTupple({sql: this.queryInfo.getSearchStr(),
                                               args: [this.searchString,this.searchString],
                                               database: this.queryInfo.getDatabase()}
                                  ).subscribe((response:SinglestoreTuppleResponse) => {
        this.parseData(response);
      },error => {
        this.resultString = error.error;
      });
    } else {
      this.resultString = "";
    }
  }

  searchLike() {
    if(this.searchString.length > 0){
      this.resultString = "Searching...";
      this.tablerows = [];
      this.singlestore.queryTupple({sql: this.queryInfo.getLikeStr(),
                                                args: [this.searchString],
                                                database: this.queryInfo.getDatabase()
                                               }).subscribe((response:SinglestoreTuppleResponse) => {
        this.parseData(response);
      },error => {
        this.resultString = error.error;
      });
    } else {
      this.resultString = "";
    }
  }

  highlight() {
    if(this.searchString.length > 0){
      this.resultString = "Searching...";
      this.tablerows = [];
      this.singlestore.queryTupple({sql: this.queryInfo.getHighlightStr(),
                                                args: [this.searchString,this.searchString,this.searchString],
                                                database: this.queryInfo.getDatabase()
                                               }).subscribe((response:SinglestoreTuppleResponse) => {
        this.parseData(response);
      },error => {
        this.resultString = error.error;
      });
    } else {
      this.resultString = "";
    }
  }

  parseData(response:SinglestoreTuppleResponse){
    this.resultString = "";
    response.results.forEach((result) =>{
      this.tablecols = [];
      result.columns.forEach((col) =>{
        this.tablecols.push(col.name);
      });
      this.tablerows = [];
      result.rows.forEach( (row) => {
        this.tablerows.push(row);
      });
    });

    if(this.tablerows.length < 1){
      this.resultString = "No results found."
    }

  }

  pretty(data: any) {
    if(typeof data === "object"){
      return JSON.stringify(data);
    }
    return data;
  }
}

