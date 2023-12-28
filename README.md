# license-comparison-reasoner
This repository contains some of the source code that accompanies my master-thesis regarding open-data-licenses in the context of open-data-pipelines at FAU Erlangen-Nürnberg.
One approach we are trying in this context is to implement a reasoner that can compare and aggregate multiple open-data-licenses.

> [!IMPORTANT]
> The contents of this repository are a prove-of-concept! The recommendations given are not guaranteed to be correct and have not been reviewed by a law office or other institutions.
> I strongly recommend that you always consult a lawyer or ask your company attourney in case you need legal advice. I will not assume any liability, warranty, etc. for any damages that occur by using this proof-of-concept.

## Technologies used
* [SQLite](https://sqlite.org/index.html) for the backend
* [Logica](https://logica.dev/) for the reasoning

## Get started

To get started, you first have to install the necessary tools(listed above). Simply follow the official how-to's to install them.

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

## Run the scripts

```pwsh
.\run.ps1 src/{filename}.l {predicate}
```