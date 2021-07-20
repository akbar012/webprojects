// Required packages
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Return the teacher page
app.get('/auction', function(req,res){
  res.sendFile(__dirname + '/auction.html');
});

// Return the student page
app.get('/bidder', function(req,res){
  res.sendFile(__dirname + '/bidder.html');
});

// Variable for storing the actual correct answer
// If we have a connection....
var item = {newbid:""};

io.on('connection', function(socket){
  socket.on("submitAuction", function(quesdata)
  {
    item.newbid = parseInt(quesdata.startingbid);
    //item.description = quesdata.description;
    // Make sure we've received the question OK
    console.log("Auction info submitted: " + JSON.stringify(quesdata));
    // send descrption to bidder page from auction page
    socket.broadcast.emit('deliverDescription', quesdata.description);
    // Description shown on auction page
    io.emit('deliverItemDescription', quesdata.itemdescription);
    //
    socket.broadcast.emit("deliverbid", quesdata.startingbid);

  });

  socket.on('submitBidderName', function(msg)
  {
    if((item.newbid) < (msg.newbid))
    {
      io.emit('submitBidderName', msg.bidder);
      io.emit('submitNewbid', msg.newbid);
      socket.broadcast.emit('submitBidderName', msg.bidder);
      socket.broadcast.emit('submitNewbid', msg.newbid);
    }
    else{
    console.log("bidding info: " + JSON.stringify(msg));
     }
  });
});

// Start the server

http.listen(3000, function(){
  console.log('listening on server:3000');
});
