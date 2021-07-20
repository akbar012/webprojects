const express = require('express');
var router = express.Router()
const ArticlesModel = require('../models/articles.js')
const UsersModel = require('../models/user.js');

// Displays the login page
router.get("/", function(req, res)
{
  // if we had an error during form submit, display it, clear it from session
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  // render the login page
  res.render("login", req.TPL);
});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/attemptlogin", function(req, res)
{


 function logincheck(user)
 {
   var username = req.body.username;
   var password = req.body.password;
   var setuser= 0;

  user.forEach((i, j) => {if (username == i.username){setuser = j;  }});

  if(setuser != 0 && password == user[setuser].password)
  {
    req.session.username = req.body.username;
    req.session.level = user[setuser].level;

    if(user[setuser].level == "member")
    {
      res.redirect("/members");
    }


    else if(user[setuser].level == "editor")
    {
      res.redirect("/editors");
    }
 }
 else
 {
    req.session.login_error = "Invalid username and/or password!";
    res.redirect("/login");
  }
}

  UsersModel.getUser(logincheck);
});

// Logout a user
// - Destroys the session key username that is used to determine if a user
// is logged in, re-directs them to the home page.
router.get("/logout", function(req, res)
{
  delete(req.session.username);
  res.redirect("/home");
});

module.exports = router;
