# Full Text Search Demo

The application showcases the Full Text Search feature using the Data API of the SingleStore database.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

# Running the Test

## Setup a SingleStore database

## Quickstart: SingleStore Managed Service

1. [Sign up][try-free] for $500 in free managed service credits.
2. Create a S-2 sized cluster in [the portal][portal]
3. Open the [Full Text Search Demo][demo] in Chrome or Firefox


| Key         | Value                          |
|-------------|--------------------------------|
| Host & Port | https://CLUSTER_CONNECTION_URL |
| Username    | admin                          |
| Password    | CLUSTER_ADMIN_PASSWORD         |


## Setup and Load a Table
```bash
create database fulltext_db; 
use fulltext_db;
CREATE TABLE `orders` (
   `o_orderkey` bigint(11) NOT NULL,
   `o_custkey` int(11) NOT NULL,
   `o_orderstatus` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   `o_totalprice` decimal(15,2) NOT NULL,
   `o_orderdate` date NOT NULL,
   `o_orderpriority` char(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   `o_clerk` char(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   `o_shippriority` int(11) NOT NULL,
   `o_comment` varchar(79) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   SHARD KEY (`o_orderkey`) USING CLUSTERED COLUMNSTORE,
   unique key(o_orderkey) using hash,
   fulltext(o_comment));
CREATE OR REPLACE PIPELINE tpch_100_orders
  AS LOAD DATA S3 'memsql-tpch-dataset/sf_100/orders/'
  config '{"region":"us-east-1"}'
  SKIP DUPLICATE KEY ERRORS
  INTO TABLE orders
  FIELDS TERMINATED BY '|'
  LINES TERMINATED BY '|\n';
START PIPELINE tpch_100_orders FOREGROUND;
 ```
## Live Application

Application can be run from github via https://johnrturner.github.io The directions to run are on the About page.


[try-free]: https://www.singlestore.com/try-free/
[demo]: https://johnrturner.github.io
[data-api]: https://docs.singlestore.com/managed-service/en/reference/data-api.html
[ciab]: https://github.com/memsql/deployment-docker
[portal]: https://portal.singlestore.com/
