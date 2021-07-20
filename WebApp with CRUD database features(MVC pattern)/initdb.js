// You can use this file to create your employee database and populate it
// with some initial data.  You can run it with: node initdb.js

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("employee.db");

db.serialize(function() {

  // create employees table
  db.run("DROP TABLE IF EXISTS Employees");
  db.run("CREATE TABLE Employees (firstname TEXT, lastname TEXT, salary REAL, role TEXT)");

  // insert records into the employee table
  db.run("INSERT INTO Employees VALUES (?,?,?,?)", ['Kevin','Browne','50000','Manager']);
  db.run("INSERT INTO Employees VALUES (?,?,?,?)", ['Mary','Yendt','65000','Tester']);
  db.run("INSERT INTO Employees VALUES (?,?,?,?)", ['Michael','Jordan','60000','Developer']);
  db.run("INSERT INTO Employees VALUES (?,?,?,?)", ['Sharon','Fuller','85000','Tester']);
  db.run("INSERT INTO Employees VALUES (?,?,?,?)", ['Ajit','Singh','43000','Developer']);

});
