const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


//------------------------------------------

app.get('/', function(req, res)
{
  res.sendFile(__dirname + "/StudentSubmitForm.html")
});

function getRandom(min, max) {
  return Math.floor(Math.random() * (max-min+1)) + min;
}

app.get('/random', function(req, res)
{
  // possible random first names
  const firstname = ["Kevin", "John", "Sally", "Larissa",
                     "Zhang", "Li", "Ying", "Wang",
                     "Nayla", "Nawal", "Abdul", "Yasin"];

  // possible random last names
  const lastname = ["Browne", "Black", "Smith", "Yendt",
                    "Wei", "Fang", "Patel", "Lee",
                    "Abaza", "Shadid", "Hatem", "Hassin"];

  // random generation of tuition
  const tuition = getRandom(7956, 2800);

  // random generation of a student id
  const studentid =
    "0" + getRandom(0, 9) + getRandom(0,9) + getRandom(0,9) + getRandom(0,9) +
    getRandom(0,9) + getRandom(0,9) + getRandom(0,9) + getRandom(0,9);

  // possible payment methods
  const paymentmethods = ["Credit", "Debit", "Bitcoin"];

  // create random student based on arrays, randomness
  const student =
    {
      "firstname" : firstname[getRandom(0, (firstname.length - 1))],
      "lastname" : lastname[getRandom(0, (lastname.length - 1))],
      "tuition" : tuition,
      "studentid" : studentid,
      "method" : paymentmethods[getRandom(0, (paymentmethods.length - 1))]
    };

  // send the json data as the response
  res.json(student);

});
//-----------------Log file--------------------------

app.get('/log.txt', function(req,res){
  res.sendFile(__dirname + "/log.txt");
});

//-----------------submit----------------------------
app.get("/submit", function(req , res) {

  var results = {"firstname" : "",
                  "lastname" : "",
                  "studentid" : "",
                  "error" : "",
                  "success" : 0 };

    if (req.query.firstname != ""){
      if (req.query.firstname.length < 2) {
     results["firstname"]  ="<li>" +  "Fisrt name must be 2 or more characters in length" + "</li>";
     results["success"]= 0;
       }
       else {results["success"]= 1;}
     }
    else
    {
      results["firstname"]  ="<li>" +  "Fisrt name must be 2 or more characters in length" + "</li>";
      results["success"]= 0;
    }


   //---------------lastname------------------------
  if (req.query.lastname != "") {
    if ((req.query.lastname.length < 3) || (req.query.lastname.length > 12)) {
      results["lastname"] = "<li>"+"Last name must be between 3 and 12 characters in length" + "</li>";
      results["success"]= 0;
     }
     else {results["success"]= 2;}
   }
  else
  {
    results["lastname"] = "<li>"+"Last name must be between 3 and 12 characters in length" + "</li>";
    results["success"]= 0;
  }


  //------Studentid------------

  if (req.query.studentid != "") {
    if ((req.query.studentid.length < 9) || (req.query.studentid.length > 9)) {
      results["studentid"] = "<li>"+"Student id must be exacty 9 characters in length" + "</li>";
      results["success"]= 0;
     }
     else {results["success"]= 3;}
   }
  else
  {
    results["studentid"] = "<li>"+"Student id must be exacty 9 characters in length" + "</li>";
    results["success"]= 0;
  }

  //-----Tuition------------

  if (req.query.tuition != "") {
   if ((req.query.tuition < 2000) || (req.query.tuition > 10000)) {
     results["tuition"] = "<li>"+"Tuition must be between 2000 and 10000" + "</li>";
     results["success"]= 0;
    }
    else {results["success"]= 4;}
  }
  else
  {
    results["tuition"] = "<li>"+"Tuition must be between 2000 and 10000" + "</li>";
    results["success"]= 0;
  }
  //------------Appending---------
  if(results["success"]!=0)
  {
    fs.appendFile("log.txt", req.query.firstname + ',' + req.query.lastname + "," + req.query.studentid + "," + req.query.tuition + "," + req.query.paymentmethods + "\n", (err) => {
        if (err) throw err;
        console.log("Data Appended");});
  }
  //---------------------
  res.json(results);
});
//------------------

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//---end-----------------
/*
results += "<li role=\"alert\">" + "Fisrt Name must be 2 or more characters in length" + "</li>";
results += "<li role=\"alert\">" + "Last Name must be between 3 and 12 characters in length" + "</li>";

*/
