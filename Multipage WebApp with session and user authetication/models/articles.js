var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

// Return all of the articles
function getAllArticles(callback)
{
  db.all("SELECT * FROM Articles",
  	     function(err,results) { callback(results); });
}

// Create a new article given a title, content and username
function createArticle(article,username,callback)
{
  db.run("INSERT INTO Articles VALUES (?,?,?)",
         [article.title, username, article.content],
         function(err)
         {
           callback();
         });
}

module.exports = {getAllArticles
                 ,createArticle};
