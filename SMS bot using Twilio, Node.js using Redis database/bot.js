const https = require('https');
var redis = require("redis");

client =
  redis.createClient(
     {url: "redis://redis-13305.c100.us-east-1-4.ec2.cloud.redislabs.com:13305"
     ,password: "FxnUC879cUwyB8fqWs0wUmBhjrAYDYfl"
     }
  );


function reqapi(message)
{
    var options = {
        port: "443",
        method: "GET",
        hostname: "financialmodelingprep.com",
        path: "/api/v3/company/profile/"+ message
    }

    return new Promise(function(resolve) {

       callback = function(response)
       {
           var str = "";
           response.on("data", function(chunk) { str+=chunk });
           response.on("end", function() {
              resolve(str);
           });
       }

       https.request(options, callback).end();
    });

}


// does a get command on a redis database...
function reqRedisGet()
{
    return new Promise(function(resolve) {
       function callback(err, reply)
       {
           resolve(reply);
       }
       client.get("some string", callback);
    });
}

// does a set command on a redis database...
function reqRedisSet(data)
{

    return new Promise(function(resolve) {
       function callback(err, reply)
       {
           resolve(reply);
       }
       client.set("some string", data , callback);
    });

}


exports.handler = async function(context, event, callback) {

	let twiml = new Twilio.twiml.MessagingResponse();
    var commandparts = event.Body.split(" ");
    var i = commandparts[1];
    var j = commandparts[2];
    var redisSet = await reqRedisSet(j);
    var redisGet = await reqRedisGet();

// Find stock price e.g Stockprice AAPL
    if (commandparts[0] == "Stockprice")
    {
        var apiResponse = await reqapi(i);
        var apiobj = JSON.parse(apiResponse);
        twiml.message("\n" + apiobj.profile.companyName + " Stock Price is "+ "$"+ apiobj.profile.price );
    }
// Find Stock company info e.g Info AAPL
      else if (commandparts[0] == "Info")
    {
        var apiResponse = await reqapi(i);
        var apiobj = JSON.parse(apiResponse);
        twiml.message("Discription: " + apiobj.profile.description );
    }
// Save data to redis database e.g Save emplyeeid 1122
    else if (commandparts[0] == "Save")
    {

        twiml.message( "\n" + commandparts[2]  + " is assigned to " + commandparts[1] + "\n\n" );

    }
// Read data from redis database e.g Read emplyeeid
   else if (commandparts[0] == "Read")
    {
    twiml.message("\n" + commandparts[1] + " is " + redisGet + " reading from redis database" + "\n\n" );

    }
// let user know how the bot works
    else if (commandparts[0] == "About")
    {
    twiml.message( "\n\n" + "This sms bot allows a user to check any stock latest price." + "\n" +
    "This bot also allows to save any specific value to redis database and let user retrieve saved value from redis database" + "\n" );

    }

	callback(null, twiml);
};
