# Full Text Search Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.  The code is written to execute against a SingleStore database.

## Live Application

Application can be run from github via https://johnrturner.github.io The directions to run are on the About page.

## Code

The code is written in Angular using the BootStrap library.  It showcases the Text Search feature using the Data API of a SingleStore database.

## Quickstart: Docker Image

**This will not work on a Mac M1 or ARM hardware**

1. [Sign up][try-free] for a free SingleStore license. This allows you to run up to 4 nodes up to 32 gigs each for free. Grab your license key from [SingleStore portal][portal] and set it as an environment variable.

   ```bash
   export SINGLESTORE_LICENSE="singlestore license"
   ```

2. Start a SingleStore [cluster-in-a-box][ciab] using Docker:

   ```bash
   docker run -it \
       --name ciab \
       -e LICENSE_KEY=${SINGLESTORE_LICENSE} \
       -e ROOT_PASSWORD=test \
       -e HTTP_API=on \
       -p 3306:3306 -p 9000:9000 -p 8080:8080 \
       singlestore/cluster-in-a-box
   docker start ciab
   ```

3. Open the [Full Text Search Demo][demo] in Chrome or Firefox
4. Plug in the connection details:

| Key         | Value                 |
|-------------|-----------------------|
| Host & Port | http://localhost:9000 |
| Username    | root                  |
| Password    | test                  |

## Quickstart: SingleStore Managed Service

1. [Sign up][try-free] for $500 in free managed service credits.
2. Create a S-00 sized cluster in [the portal][portal]
3. Open the [Full Text Search Demo][demo] in Chrome or Firefox
4. Plug in the connection details (replacing placeholders as needed):

| Key         | Value                          |
|-------------|--------------------------------|
| Host & Port | https://CLUSTER_CONNECTION_URL |
| Username    | admin                          |
| Password    | CLUSTER_ADMIN_PASSWORD         |

[try-free]: https://www.singlestore.com/try-free/
[demo]: https://johnrturner.github.io
[data-api]: https://docs.singlestore.com/managed-service/en/reference/data-api.html
[ciab]: https://github.com/memsql/deployment-docker
[portal]: https://portal.singlestore.com/
