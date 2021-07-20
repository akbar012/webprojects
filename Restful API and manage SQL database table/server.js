var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("restapi.db");
var express = require('express');
var app = express();

// use JSON middleware to parse request bodies and put result into req.body
app.use(express.json());

// startup a collection of data to manage
db.serialize(function(){

  // create a fresh version of the table
  db.run("DROP TABLE IF EXISTS Collection");
  db.run("CREATE TABLE Collection (item TEXT, description TEXT, " +
  	     "price INTEGER)");

  // insert initial records into the table
  var stmt = db.prepare("INSERT INTO Collection VALUES (?,?,?)");
  stmt.finalize();

});

// GET the entire collection, send it back as JSON data
app.get("/api", function(req,res)
  {
    console.log("GET REQUEST");

  	db.all("SELECT rowid as id, item, description, price FROM Collection",
  		   function(err, results)
  		   {
             // send debug info to console
             console.log(JSON.stringify(results));

             // send back table data as JSON data
             res.json(results);
  		   });
  });

  // GET the specific item from collection, send it back as JSON data
  app.get("/api/:id", function(req,res)
    {
      console.log("ID GET REQUEST RECEIVED");

    	db.run("SELECT rowid as id, item, description, price FROM Collection", req.params.id,
    		   function(err, r)
    		   {
               // send debug info to console
               console.log(JSON.stringify(r));
               // send back table data as JSON data
               res.json(r);
    		   });
    });

// PUT request to replace the entire collection
app.put("/api", function(req,res)
  {
  	console.log("COLLECTION UPDATE REQUEST");

    // make the update to the database
    db.serialize(function()
    {
      var stmt = db.prepare("INSERT INTO Collection VALUES (?,?,?)");
      stmt.run(req.body.item, req.body.description, req.body.price,
               // only send the response when we know the I/O has completed
               function()
               {
                 res.json({response: "COLLECTION UPDATED"});
               }
               );

      stmt.finalize();
    });
 });

// PUT request to change a specific item in the collection
app.put("/api/:id", function(req,res)
  {
  	console.log("ITEM UPDATE REQUEST");

    // make the update to the database
    db.serialize(function() {
      var stmt = db.prepare("UPDATE Collection set item=(?), description=(?), price=(?) WHERE rowid=(?)");
      stmt.run(req.body.item, req.body.description, req.body.price, req.params.id,
               // only send the response when we know the I/O has completed
               function()
               {
                 res.json({response: "ITEM UPDATED"});
               }
               );

      stmt.finalize();
    });
});

// DELETE the entire collection
app.delete("/api", function(req,res)
  {
  	console.log("COLLECTION DELETE REQUEST");

    db.run("DELETE FROM Collection",
           function()
           {
             res.json({response: "COLLECTION DELETED"});
           });
  });

// Delete the item in the collection with the supplied id
app.delete("/api/:id", function(req,res)
  {
  	console.log("ITEM DELETE REQUEST");

    db.run("DELETE FROM Collection WHERE rowid=?",req.params.id,
           function()
           {
             res.json({response: "ITEM DELETED"});
           });
  });

// POST request to insert ITEM into the collection

  app.post("/api", function(req,res)
    {
    	console.log("POST REQUEST");

      // make the update to the database
      db.serialize(function() {
        var stmt = db.prepare("INSERT INTO Collection VALUES (?,?,?)");
        stmt.run(req.body.item, req.body.description, req.body.price,
                 // only send the response when we know the I/O has completed
                 function(){
                   res.json({response: "ITEM INSERTED"});
                 });

        stmt.finalize();
      });
  });
  // Server
var server = app.listen(3000, function(){
  console.log("RESTful A7 API listening on port 3000!")
});
