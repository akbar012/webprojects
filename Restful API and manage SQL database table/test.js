// Test script

const axios = require('axios');
var http = require('http');

async function test()
{
  try {

	// make a request to our server, send JSON data in the request
  const response1 = await axios.put('http://localhost:3000/api',
	                               {"item" : "Bird",
                                 "description" : "Has feathers",
                                 "price" : "900"});
	 // response body is JSON object .data
	 console.log(response1.data);

   // send another request
   const response2 = await axios.put('http://localhost:3000/api',
                                  {"item" : "Rabbit",
                                  "description" : "Likes to eat carrots",
                                  "price" : "50"});
   // response body is JSON object .data
   console.log(response2.data);

   // send another request
   const response3 = await axios.put('http://localhost:3000/api',
                                  {"item" : "Hamster",
                                  "description" : "Likes to eat lettuce",
                                  "price" : "55"});
   // response body is JSON object .data
   console.log(response3.data);

   // send another request
   const response4 = await axios.put('http://localhost:3000/api/1',
                                  {"item" : "Hourse",
                                  "description" : "Likes to run",
                                  "price" : "950"});
   // response body is JSON object .data
   console.log(response4.data);

   // make a request to our server, send JSON data in the request
   const response5 = await axios.post('http://localhost:3000/api',
                                   {"item" : "Dog",
                                   "description" : "Wags tail when happy",
                                   "price" : "250"});
   // response body is JSON object .data
   console.log(response5.data);

   // Delete a specific item
   const response6 = await axios.delete('http://localhost:3000/api/2');
   console.log(response6.data);

   // make a get request to server
   const response8 = await axios.get('http://localhost:3000/api');
   console.log(response8.data);

      // make a Delete request to our server
   const response7 = await axios.delete('http://localhost:3000/api');
   console.log(response7.data);

  }
   catch (error) {
   console.error(error);
  }
}

// call our test function
test();
