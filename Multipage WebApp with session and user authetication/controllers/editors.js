const express = require('express');
var router = express.Router()

// Display the editors page
router.get("/", function(req, res)
{
  redirect(req, res);
//  res.render("editors", req.TPL);
});

router.get("/deleteUser/:id", function(req, res){

  var a =  redirect(req, res);

  //function deleteUserArticles(user){
  var user;
  var am =  ArticlesModel.deleteUserArticles(user.username);
  //}
  UsersModel.getUser(req.params.id, am);
  UsersModel.deleteUser(req.params.id, a);
});

router.get("/deleteArticle/:id", function(req, res){
  var  a =  redirect(req, res);


  ArticlesModel.deleteArticle(req.params.id, a);
});


function redirect(req, res)
{
  var users = [];
  var u='';

  u = users;
  function set()
  {
    var articles;
    req.TPL.users = users;
    req.TPL.articles = articles;
    res.render("editors", req.TPL);
  }


  UsersModel.getAllUsers(users);
  ArticlesModel.getAllArticles(set);
}



module.exports = router;
