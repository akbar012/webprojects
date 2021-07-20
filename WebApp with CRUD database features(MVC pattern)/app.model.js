var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("employee.db");

// select all the employees, call the callback with them as a parameter
function getAllEmployees(callback)
{
  db.all("SELECT rowid, * FROM Employees",
         function(err,results) { callback(results); });
}

// delete an employee with a given id
function deleteEmployee(id,callback)
{
  db.run("DELETE FROM Employees WHERE rowid=?", id,
         function(err) { callback(); });
}

// promote an employee with a given id
function promoteEmployee(id,callback)
{
  db.run("UPDATE Employees SET role='Manager' WHERE rowid=?", id,
          function(err) { callback(); });
}

// Layoff employees
function layoffEmployees(callback)
{
  db.run("DELETE FROM Employees WHERE role in ('Tester','Developer')")

}

// Random employees
function random(fname, lname, sal, rol,callback)
{
  db.run("INSERT INTO Employees VALUES (?,?,?,?)", fname, lname, sal, rol)
}

// insert an employee into the table
function addEmployee(employee,callback)
{
  db.run("INSERT INTO Employees VALUES (?,?,?,?)",
         [employee.firstname, employee.lastname, employee.salary, employee.role],
         function(err) { callback(); });
}

// update an employee with a given id
function updateEmployee(employee,id,callback)
{
  db.run("UPDATE Employees SET firstname=?,lastname=?,salary=?, role=? WHERE rowid=?",
         [employee.firstname, employee.lastname, employee.salary, employee.role, id],
         function(err) { callback(); });
}

// sorting
function ascending(col, callback){
  db.all("SELECT rowid, * FROM Employees ORDER BY " + col + " " + "ASC",
        function(err, results){callback(results); });
}

function descending(col, callback){
  db.all("SELECT rowid, * FROM Employees ORDER BY " + col + " " + "DESC",
        function(err, results){callback(results); });
}
// export the functions we have defined
module.exports = {getAllEmployees, deleteEmployee, layoffEmployees, random, addEmployee, updateEmployee, ascending, descending, promoteEmployee};
