# Artifact 01 - License-Reasoner
The idea for this artifact was to write a reasoner using the logic described under [../logic](../logic) using the programming language [Logica](https://logica.dev/).

## Technologies used
* [SQLite](https://sqlite.org/index.html) for the backend
* [Logica](https://logica.dev/) for the reasoning
* [Jupyter Notebooks](https://jupyter-tutorial.readthedocs.io/de/stable/notebook/index.html) for the evaluation


## Run the scripts
After installing the necessary local dependencies, you can run the predicates by using the following script:
```pwsh
.\run.ps1 src/{filename}.l {predicate}
```

## Evaluation
The evaluation was done using two jupyter notebooks that visualize the results of the queries. At the end of each notebook, there is a short feedback section describing problems with the current iteration.

Here is a short TL/DR:
* It was quiet hard to model some of the simpler queries, which resulted in the code getting complicated really quickly.
* The results did not match what was expected (incomplete or wrong).

Some of this is, with certainty, caused by errors in the code, but some parts of this are also a result of choosing Logica. It is a great language and is great for finding information in a big dataset. But since we want to argue over the data this is not really suited for the task. I am also not as familiar with it as with other programming languages and its documentation is incomplete. For example the SQLite integration is only mentioned in some examples and issues. Since what we are doing is very simple logic, it should be possible to rewrite the code in a programming language.