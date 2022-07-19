import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryInfoService {
  private database = 'fulltext_db';
  private tableName = 'orders';
  private columnName = 'o_comment';
  private searchStr = '';
  private likeStr = '';
  private highlightStr = '';
  constructor() {
    this.update();
  }
  setDatabase(database: string){
    this.database = database;
  }
  getDatabase():string{
    return this.database;
  }
  setTable(tableName: string){
    this.tableName = tableName;
    this.update();
  }
  getTable():string{
    return this.tableName;
  }
  setColumn(columnName: string){
    this.columnName = columnName;
    this.update();
  }
  getColumn():string{
    return this.columnName;
  }
  getSearchStr():string{
    return this.searchStr;
  }
  getLikeStr():string{
    return this.likeStr;
  }
  getHighlightStr(): string{
    return this.highlightStr;
  }
  private update(){
    this.searchStr = 'select ' + this.columnName + ', match(' + this.columnName + ') against (?) as Relevancy from ' +
      this.tableName + ' where match(' + this.columnName + ') against (?) order by 2 desc limit 1000';
    this.likeStr = 'select ' + this.columnName + ' from ' + this.tableName +
      ' where ' + this.columnName + ' like (?) limit 1000';
    this.highlightStr = 'select HIGHLIGHT(' + this.columnName + ') against (?) as Highlight, match(' + this.columnName +
      ') against (?) as Relevancy from ' + this.tableName + ' where match(' + this.columnName + ') against (?) order by 2 desc limit 1000';
  }
}
