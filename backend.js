var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', function(socket){
  console.log("You connected");

  socket.on('left', function(data) {
    console.log('POOP', data);
  });
});

http.listen(5000, function() {
  console.log('listening on *:5000');
});
