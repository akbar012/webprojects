const express = require('express');
var router = express.Router();
const UsersModel = require('../models/user.js');

router.get("/", function(req, res)
{
  // if we had an error during form submit, display it, clear it from session
  req.TPL.acc_created = req.session.acc_created;
  req.TPL.signup_error = req.session.signup_error;
  req.session.signup_error = "";
  req.session.acc_created = 0;

  // render the signup page
  res.render("signup-page", req.TPL);
});

// Attempts to signup a user
// - The action for the form submit on the signup page.
router.post("/attemptsignup", function(req, res){

  if((req.body.username.length < 2) && (req.body.password.length < 2))
  {
    req.session.signup_error = "Username/password cannot be blank!";
    res.redirect("/signup-page");
  }

  else
  {
    function renderPage()
    {
      req.session.acc_created = 1;
      res.redirect("/signup-page");
    }

    UsersModel.createUser(req.body.username, req.body.password, renderPage);

  }
});

module.exports = router;
