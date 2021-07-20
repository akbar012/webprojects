var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

// Return all of the users
function getAllUsers(callback)
{
  db.all("SELECT rowid, * FROM Users",
  	     function(err,results) { callback(results); });
}

// Create a new user------
function createUser(username,password,callback)
{
  db.run("INSERT INTO Users VALUES (?,?,?)", ['mem1', 'mem1', 'member']);
  db.run("INSERT INTO Articles VALUES (?,?,?)",
         [username, password, "member"],
         function(err)
         {
           callback();
         });
}
//-----------
function getUser(id, callback)
{
  db.each("SELECT * FROM Users WHERE rowid=?", id,
        function(err, results)
        {
          callback(results);
        });
}
//---------------
function deleteUser(id, callback){
  db.run("DELETE FROM Users WHERE rowid=?", id,
    function(err)
    {
       callback();
    });
}

module.exports = {getAllUsers
                 ,createUser
                  ,deleteUser
                  ,getUser};
