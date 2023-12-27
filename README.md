# license-comparison-reasoner
This repository contains some of the source code that accompanies my master-thesis regarding open-data-licenses in the context of open-data-pipelines.
One approach we are trying in this context is to implement a reasoner that can compare and aggregate multiple open-data-licenses.


### Create the SQLITE-backend
Start by creating a new sqlite-table in the data-folder:
```pwsh
sqlite3 data/backend.sqlite
```

After connecting to it, use the SQL-scripts in the data-folder to create and populate the needed tables:
```pwsh
.read data/tables.sql
.read data/values.sql
.quit
```