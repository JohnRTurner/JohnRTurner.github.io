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
      this.singlestore.queryTupple({sql: this.queryInfo.getSearchStr(),
                                               args: [this.searchString,this.searchString],
                                               database: this.queryInfo.getDatabase()}
                                  ).subscribe((response:SinglestoreTuppleResponse) => {
        this.resultString = "";
        response.results.forEach((result) =>{
          result.rows.forEach( (row) => {
            row.forEach((col) => {
              if(typeof col === "string")
                this.resultString = this.resultString.concat(col, "<br\>");
              else
                this.resultString = this.resultString.concat(JSON.stringify(col), "<br\>");
            })
            this.resultString = this.resultString.concat("<br\>");
          })
        });
        if(this.resultString.length < 1){
          this.resultString = "No results found."
        }
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
      this.singlestore.queryTupple({sql: this.queryInfo.getLikeStr(),
                                                args: [this.searchString],
                                                database: this.queryInfo.getDatabase()
                                               }).subscribe((response:SinglestoreTuppleResponse) => {
        this.resultString = "";
        response.results.forEach((result) =>{
          result.rows.forEach( (row) => {
            row.forEach((col) => {
              if(typeof col === "string")
                this.resultString = this.resultString.concat(col, "<br\>");
              else
                this.resultString = this.resultString.concat(JSON.stringify(col), "<br\>");
            })
            this.resultString = this.resultString.concat("<br\>");
          })
        });
        if(this.resultString.length < 1){
          this.resultString = "No results found."
        }
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
      this.singlestore.queryTupple({sql: this.queryInfo.getHighlightStr(),
                                                args: [this.searchString,this.searchString,this.searchString],
                                                database: this.queryInfo.getDatabase()
                                               }).subscribe((response:SinglestoreTuppleResponse) => {
        this.resultString = "";
        response.results.forEach((result) =>{
          result.rows.forEach( (row) => {
            row.forEach((col) => {
              if(typeof col === "string")
                this.resultString = this.resultString.concat(col, "<br\>");
              else
                this.resultString = this.resultString.concat(JSON.stringify(col), "<br\>");
            })
            this.resultString = this.resultString.concat("<hr\>");
          })
        });
        if(this.resultString.length < 1){
          this.resultString = "No results found."
        }
      },error => {
        this.resultString = error.error;
      });
    } else {
      this.resultString = "";
    }
  }
}
