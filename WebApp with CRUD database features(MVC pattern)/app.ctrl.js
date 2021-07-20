// include express
const express = require('express');
const app = express();

// include the mustache template engine for express
const mustacheExpress = require('mustache-express');

// include the model so the controller can use its functions
const Model = require('./app.model.js')

// registers the mustache engine with express
app.engine("mustache", mustacheExpress());

// sets mustache to be the view engine
app.set('view engine', 'mustache');

// sets /views to be the /views folder
// files should have the extension filename.mustache
app.set('views', __dirname + '/views');

// ************************* CONTROLLER ACTIONS ****************************

// delete an employee action (given an id parameter)
app.get('/delete/:id', function(req,res) {

  // 3. render the page with the employee data
  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }

  // 2. Get all the employees, then render the page
  function getEmployees() { Model.getAllEmployees(renderPage); }

  // 1. delete the employee first, then get all the employees
  Model.deleteEmployee(req.params.id, getEmployees);

});

// Layoff employees
app.get('/layoff', function(req,res) {

  function getEmployees() { Model.getAllEmployees(renderPage); }
  Model.layoffEmployees(getEmployees);

  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }
  Model.getAllEmployees(renderPage);

});
//----------sorting-----------
app.get('/asc/:col', function(req,res){
  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }

  Model.ascending(req.params.col, renderPage);
});

app.get('/desc/:col', function(req,res){
  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }

  Model.descending(req.params.col, renderPage);
});
//----------------------------

// Randon generator-------------------
app.get('/random', function(req, res) {

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
  }

  function randomRole(){
    var myArray = [
      "Tester",
      "Developer",
      "Manager"
    ];

    var randomItem = myArray[Math.floor(Math.random()*myArray.length)];
    return randomItem
  }


const salary = getRandom(10000, 100000);
const f = getRandom(3, 10);
const l = getRandom(3, 10);


function makestr(length) {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;

  result += characters.charAt(Math.floor(Math.random() * (charactersLength))+0).toUpperCase()

  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));

  }
  return result;
}

Model.random(makestr(f),makestr(l),salary,randomRole())

function renderPage(employeeArray) {
  res.render('main_page', { employees: employeeArray});
}
Model.getAllEmployees(renderPage);

});
//-------------


// addform action puts the add employee form on the page
app.get('/addform', function(req,res) {

  // 2. render the page with the employee data AND display the add form
  function renderPage(employeeArray)
  {
    res.render('main_page', {addemployee: true, employees: employeeArray});
  }

  // 1. get all the employees, then render the page
  Model.getAllEmployees(renderPage);

});

// addemployee action handles add form submit, inserts new employee into table
app.get('/addemployee', function(req,res) {

  var errors = {
      "success" : false,
      "firstname" : '',
      "lastname" : '',
      "salary" : ''}

    if(req.query.firstname == ""){
      errors["firstname"] = "First Name is blank" ;
      errors["success"] = true; }

    if(req.query.lastname == ""){
      errors["lastname"] = "Last Name is blank";
      errors["success"] = true;}

    if(req.query.salary == ""){
      errors["salary"] = "Salary is blank" ;
      errors["success"] = true;}

  function renderError(employeeArray) {
    res.render('main_page', {updateemployee: true, updateid: req.params.id, formdata : req.query
      ,errors: errors, employees: employeeArray  });
  }

  // 3. render the page with the employee data
  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }

  // 2. Get all the employees, then render the page
  function getEmployees() { Model.getAllEmployees(renderPage); }


  if(errors.success == true){Model.getAllEmployees(renderError);}
  else{
   // 1. Insert employee into table using form data, then get all the employees
   Model.addEmployee(req.query, getEmployees);}

});

// Promot an employee action (given an id parameter)
app.get('/promote/:id', function(req,res) {
  // 3. render the page with the employee data
  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }

  // 2. Get all the employees, then render the page
  function getEmployees() { Model.getAllEmployees(renderPage); }

  // 1. Promote the employee first, then get all the employees
  Model.promoteEmployee(req.params.id, getEmployees);

});

// updateform action puts the update employee form on the page
app.get('/updateform/:id', function(req,res) {

  // 2. render the page with the employee data AND display update form
  function renderPage(employeeArray)
  {
    // filter the employeeArray for the employee with the id parameter, that's
    // the employee that we want to populate the form with (see: formdata)
    res.render('main_page',
      {updateemployee: true
      ,updateid: req.params.id
      ,formdata : employeeArray.filter(x => (x.rowid == req.params.id))[0]
      ,employees: employeeArray
      });
  }

  // 1. get all the employees, then render the page
  Model.getAllEmployees(renderPage);

});

// updateemployee action handles updating the employee in the database
app.get('/updateemployee/:id', function(req,res) {
  //orsva errors ={};
  var errors = {
      "success" : false,
      "firstname" : '',
      "lastname" : '',
      "salary" : ''}

    if(req.query.firstname == ""){
      errors["firstname"] = "First Name is blank" ;
      errors["success"] = true; }

    if(req.query.lastname == ""){
      errors["lastname"] = "Last Name is blank";
      errors["success"] = true;}

    if(req.query.salary == ""){
      errors["salary"] = "Salary is blank" ;
      errors["success"] = true;}

    function renderError(employeeArray) {
      res.render('main_page', {updateemployee: true, updateid: req.params.id, formdata : req.query
          ,errors: errors, employees: employeeArray  });
        }
  // 3. render the page with the employee data
  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }


  // 2. Get all the employees, then render the page
  function getEmployees() { Model.getAllEmployees(renderPage); }

  if(errors.success == true){Model.getAllEmployees(renderError);}
  else{
    // 1. update the employee in the database, then get all the employees
    Model.updateEmployee(req.query, req.params.id, getEmployees);}

});

// default action: render the page with employee data
app.get('/', function(req,res) {

  // 2. render the page with the employee data
  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }

  // 1. get all the employees, then render the page
  Model.getAllEmployees(renderPage);

});

// catch-all router case intended for static files
app.get(/^(.+)$/, function(req,res) {
  res.sendFile(__dirname + req.params[0]);
});

app.listen(8081, function() { console.log("server listening..."); } );
