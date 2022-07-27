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
        this.parseError(error);
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
        this.parseError(error);
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
        this.parseError(error);
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
  parseError(error?:any){
    if(typeof error.error === "string"){
      this.resultString = error.error;
    } else if(typeof error.message ==="string") {
      this.resultString = error.message;
    } else{
      this.resultString = "Undefined error!!! Check browser console for more information.";
      console.log(error);
    }
  }

  viewsql() {
    this.resultString = "<p><b>Match: </b><code>".concat(this.queryInfo.getSearchStr(),
                        "</code><BR><BR><b>Highlight: </b><code>", this.queryInfo.getHighlightStr(),
                        "</code><BR><BR><b>Like: </b><code>", this.queryInfo.getLikeStr(),"</code></p>");
  }

  pretty(data: any) {
    if(typeof data === "object"){
      return JSON.stringify(data);
    }
    return data;
  }

}

