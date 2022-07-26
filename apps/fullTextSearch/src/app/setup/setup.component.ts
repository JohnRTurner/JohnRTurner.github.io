import {Component, OnDestroy, OnInit} from '@angular/core';
import {SinglestoreService} from "../singlestore/singlestore.service";
import {ConnectInfoService} from "../singlestore/connect-info.service";
import {SinglestoreQueryResponse} from "../singlestore/singlestore-query-response";
import {QueryInfoService} from "../singlestore/query-info.service";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit, OnDestroy {
  url: any;
  username: any;
  password: any;
  database: any;
  tableName: any;
  columnName: any;
  resultString: string = '';
  connected:boolean = false;
  tschema: tst_schema|undefined = undefined;
  updatable: boolean=true;
  progress: number|undefined;

  constructor( private conInfo: ConnectInfoService, private queryInfo: QueryInfoService, private singlestore: SinglestoreService) {
  }

  ngOnInit(): void {
    this.url = this.conInfo.getUrl();
    this.username = this.conInfo.getUser();
    this.password = this.conInfo.getPass();
    this.database = this.queryInfo.getDatabase();
    this.tableName = this.queryInfo.getTable();
    this.columnName = this.queryInfo.getColumn();
    this.connected = false;
    this.tschema = undefined;
    this.progress = undefined;
    this.updatable = true;
  }

  ngOnDestroy(): void {
    this.progress = -1;
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
    this.resultString = 'Testing...'
    this.tschema = undefined;
    this.progress = undefined;
    this.connected = false;
    this.singlestore.pingTest(oConInfo).subscribe((response: SinglestoreQueryResponse) => {
      this.connected = true;
      this.conInfo.setUrl(this.url);
      this.conInfo.setUser(this.username);
      this.conInfo.setPass(this.password);
      this.queryInfo.setDatabase(this.database);
      this.queryInfo.setTable(this.tableName);
      this.queryInfo.setColumn(this.columnName);
      let res = response.results.pop();
      if(res && res.rows){
        let row = res.rows.pop();
        if(row){
          //let fld = Object.values(row)[0];
          let fld = Object.values(row)[Object.keys(row).findIndex((element) => element === 'pong')];
          if(fld) {
            this.resultString = "Connection successful and settings are saved.";
            console.log("Ping Response:" + fld + " Saved: true")
            this.check_schema();
          }
        }
      }
    },error => {
      // console.log(JSON.stringify(error));
      if(typeof error.error === "string"){
        this.resultString = error.error;
      } else if(typeof error.message ==="string") {
        this.resultString = error.message;
      } else{
        this.resultString = "Undefined error!!! Check browser console for more information.";
        console.log(error);
      }
    });
  }

  private check_schema() {
    this.tschema = undefined;
    this.progress = undefined;
    this.singlestore.query({args: [this.database, this. tableName, this.columnName], sql: "with t as (select ? tschema, ? ttab, ? tcol) " +
        "select d.database_name as db, t2.table_name as tbl, c.column_name as col " +
        "from t left outer join information_schema.DISTRIBUTED_DATABASES d on (d.database_name = tschema) " +
        "left outer join information_schema.tables t2 on (t2.table_schema = tschema and t2.table_name = ttab) " +
        "left outer join information_schema.STATISTICS c on (c.table_schema = tschema and c.table_name = ttab  and c.column_name = tcol and c.index_type = 'FULLTEXT')"}).subscribe((response:SinglestoreQueryResponse) => {
      let res = response.results.pop();
      if(res && res.rows){
        let row = res.rows.pop();
        if(row){
          //let fld = Object.values(row)[0];
          let db = Object.values(row)[Object.keys(row).findIndex((element) => element === 'db')];
          let tbl = Object.values(row)[Object.keys(row).findIndex((element) => element === 'tbl')];
          let col = Object.values(row)[Object.keys(row).findIndex((element) => element === 'col')];
          // this.resultString = this.resultString + " database: " + db + " table: " + tbl + " column: " + col;
          this.tschema = {database_name:(db == null)?'Not Found':db,
            table_name:(tbl == null)?'Not Found':tbl,
            column_name:(col == null)?'Not Found':col };
          if(col !== null){
            this.pipelineStatus();
          }
        }
      }
    },error => {
      if(typeof error.error === "string"){
        this.resultString = this.resultString + error.error;
      } else if(typeof error.message ==="string") {
        this.resultString = this.resultString + error.message;
      } else{
        this.resultString = this.resultString + "Undefined error!!! Check browser console for more information.";
        console.log(error);
      }
    });
  }

  createAll() {
    this.updatable = false;
    this.tschema = undefined;
    this.resultString = 'Create and Load Data.'
    this.generateSchema();
  }

  private generateSchema(){
    this.singlestore.exec({args: [this.database], sql: "create database ?"}).subscribe( (data) =>{
      this.resultString = this.resultString + " Database Created.";
      this.generateTable();
    },error => {
      if(typeof error.error === "string"){
        this.resultString = this.resultString + error.error;
      } else if(typeof error.message ==="string") {
        this.resultString = this.resultString + error.message;
      } else{
        this.resultString = this.resultString + "Undefined error!!! Check browser console for more information.";
        console.log(error);
      }
      this.updatable = true;
    });
  }

  createTable() {
    this.updatable = false;
    this.tschema = undefined;
    this.resultString = 'Create and Load Data.'
    this.generateTable();
  }

  private generateTable() {
    /* set table and column names to the default */
    let nqueryInfo = new QueryInfoService();
    this.tableName = nqueryInfo.getTable();
    this.columnName = nqueryInfo.getColumn();
    this.queryInfo.setTable(this.tableName);
    this.queryInfo.setColumn(this.columnName);

    this.singlestore.exec({ database: this.database, sql: "CREATE TABLE `orders` (\n" +
        "   `o_orderkey` bigint(11) NOT NULL,\n" +
        "   `o_custkey` int(11) NOT NULL,\n" +
        "   `o_orderstatus` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,\n" +
        "   `o_totalprice` decimal(15,2) NOT NULL,\n" +
        "   `o_orderdate` date NOT NULL,\n" +
        "   `o_orderpriority` char(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,\n" +
        "   `o_clerk` char(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,\n" +
        "   `o_shippriority` int(11) NOT NULL,\n" +
        "   `o_comment` varchar(79) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,\n" +
        "   SHARD KEY (`o_orderkey`) USING CLUSTERED COLUMNSTORE,\n" +
        "   unique key(o_orderkey) using hash,\n" +
        "   fulltext(o_comment))"}).subscribe( (data) =>{

      this.resultString = this.resultString + " Table Created.";
      this.generatePipeline();
    },error => {
      if(typeof error.error === "string"){
        this.resultString = this.resultString + error.error;
      } else if(typeof error.message ==="string") {
        this.resultString = this.resultString + error.message;
      } else{
        this.resultString = this.resultString + "Undefined error!!! Check browser console for more information.";
        console.log(error);
      }
      this.updatable = true;
    });
  }

  private generatePipeline(){
    this.singlestore.exec({ database: this.database, sql: "CREATE OR REPLACE PIPELINE tpch_100_orders\n" +
        "  AS LOAD DATA S3 'memsql-tpch-dataset/sf_100/orders/'\n" +
        "  config '{\"region\":\"us-east-1\"}'\n" +
        "  SKIP DUPLICATE KEY ERRORS\n" +
        "  INTO TABLE orders\n" +
        "  FIELDS TERMINATED BY '|'\n" +
        "  LINES TERMINATED BY '|\\n'"}).subscribe( (data) =>{
      this.resultString = this.resultString + " Pipeline Created.";
      this.startPipeline();
    },error => {
      if(typeof error.error === "string"){
        this.resultString = this.resultString + error.error;
      } else if(typeof error.message ==="string") {
        this.resultString = this.resultString + error.message;
      } else{
        this.resultString = this.resultString + "Undefined error!!! Check browser console for more information.";
        console.log(error);
      }
      this.updatable = true;
    });
  }

  private startPipeline(){
    this.singlestore.exec({ database: this.database, sql: "START PIPELINE tpch_100_orders "}).subscribe( (data) =>{
      this.resultString = this.resultString + " Pipeline Starting. Please Allow Time for Data to Load.";
      this.sleepPipelineStarting();
    },error => {
      if(typeof error.error === "string"){
        this.resultString = this.resultString + error.error;
      } else if(typeof error.message ==="string") {
        this.resultString = this.resultString + error.message;
      } else{
        this.resultString = this.resultString + "Undefined error!!! Check browser console for more information.";
        console.log(error);
      }
      this.updatable = true;
    });
  }

  private sleepPipelineStarting(){
    this.singlestore.exec({ sql: "SELECT SLEEP(60)"}).subscribe( (data) =>{
      this.resultString = this.resultString + "";
     this.pipelineStatus();
     this.updatable = true;
    },error => {
      if(typeof error.error === "string"){
        this.resultString = this.resultString + error.error;
      } else if(typeof error.message ==="string") {
        this.resultString = this.resultString + error.message;
      } else{
        this.resultString = this.resultString + "Undefined error!!! Check browser console for more information.";
        console.log(error);
      }
      this.updatable = true;
    });
  }

  private pipelineStatus(){
    this.singlestore.query({args: [this.database], sql: "select round(sum(rows_streamed)/1500000.0) progress,\n" +
        "       round(max(time_to_sec(start_time) + batch_time) - min(time_to_sec(start_time))) seconds, \n" +
        "       sum(rows_streamed) rows, \n" +
        "       sum(rows_streamed) / round(max(time_to_sec(start_time) + batch_time) - min(time_to_sec(start_time))) rowspersecond,\n" +
        "       round((time_to_sec(current_timestamp) - max(time_to_sec(start_time) + batch_time)) + 1) secondssinceupdate\n" +
        "from information_schema.PIPELINES_BATCHES_SUMMARY " +
        "where database_name = ? and pipeline_name = 'tpch_100_orders' and batch_state in ('Succeeded', 'In Progress') and num_partitions > 0"}).subscribe((response:SinglestoreQueryResponse) => {
      if(this.progress && this.progress < 0){
        return;
      }
      let res = response.results.pop();
      if(res && res.rows){
        let row = res.rows.pop();
        if(row) {
          //let fld = Object.values(row)[0];
          let progress = Object.values(row)[Object.keys(row).findIndex((element) => element === 'progress')];
          let seconds = Object.values(row)[Object.keys(row).findIndex((element) => element === 'seconds')];
          let tblrows = Object.values(row)[Object.keys(row).findIndex((element) => element === 'rows')];
          let rowspersecond = Object.values(row)[Object.keys(row).findIndex((element) => element === 'rowspersecond')];
          let secondssinceupdate = Object.values(row)[Object.keys(row).findIndex((element) => element === 'secondssinceupdate')];
          this.progress = progress;
          if (progress && progress < 100) {
            this.pipelineStatusLoop();
          }
        }
      }
    },error => {
      if(typeof error.error === "string"){
        this.resultString = this.resultString + error.error;
      } else if(typeof error.message ==="string") {
        this.resultString = this.resultString + error.message;
      } else{
        this.resultString = this.resultString + "Undefined error!!! Check browser console for more information.";
        console.log(error);
      }
    });
  }

  private pipelineStatusLoop(){
    this.singlestore.exec({ database: this.database, sql: "SELECT SLEEP(10)"}).subscribe( (data) =>{
      this.pipelineStatus();
    },error => {
      if(typeof error.error === "string"){
        this.resultString = this.resultString + error.error;
      } else if(typeof error.message ==="string") {
        this.resultString = this.resultString + error.message;
      } else{
        this.resultString = this.resultString + "Undefined error!!! Check browser console for more information.";
        console.log(error);
      }
      this.updatable = true;
    });
  }

}

interface tst_schema {
  database_name: string
  table_name: string
  column_name: string
}
