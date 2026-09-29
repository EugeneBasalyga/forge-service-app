# @forge/forge-service-app

## Overview

  * Depends on **forge-ws-common** via `link:../forge-ws-common` — run ```yarn``` in **forge-ws-common** first.

  * The service runs locally via pm2 from **forge-ws-infra** (```yarn start:dev``` there), which also provides all env variables from its **.env** file.

  * To run the service standalone, uncomment the dotenv block in **src/config.js**, create **.env** in this folder and run ```yarn watch```.
