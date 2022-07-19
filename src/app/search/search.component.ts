import { Component, OnInit } from '@angular/core';
import {SinglestoreService} from "../singlestore/singlestore.service";
import {SinglestoreTuppleResponse} from "../singlestore/singlestore-tupple-response";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchString: string = "";
  resultString: string = "";

  constructor(private singlestore: SinglestoreService) { }

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
      this.singlestore.queryTupple({sql: "select o_comment, match(o_comment) against (?) as relevancy from orders where match(o_comment) against (?) limit 1000",
                                               args: [this.searchString,this.searchString], database: 'fulltext_db'}).subscribe((response:SinglestoreTuppleResponse) => {
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
      this.singlestore.queryTupple({sql: "select o_comment from orders where o_comment like (?) limit 1000",
        args: [this.searchString], database: 'fulltext_db'}).subscribe((response:SinglestoreTuppleResponse) => {
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

  highlite() {
    if(this.searchString.length > 0){
      this.resultString = "Searching...";
      this.singlestore.queryTupple({sql: "select HIGHLIGHT(o_comment) against (?), match(o_comment) against (?) as relevancy from orders where match(o_comment) against (?) limit 1000",
        args: [this.searchString,this.searchString,this.searchString], database: 'fulltext_db'}).subscribe((response:SinglestoreTuppleResponse) => {
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
