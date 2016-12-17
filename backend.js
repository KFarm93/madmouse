var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var x = 16;
var y = 90;

app.use(express.static('public'));

io.on('connection', function(socket){
  console.log("You connected");
  socket.emit('replicate', [x, y]);

  socket.on('keypress', function(data) {
    if (data[0] === 'top') {
      if (data[1] === '-=50' && y >= 140) {
        y -= 50;
      }
      else if (data[1] === '+=50' && y <= 690) {
        y += 50;
      }
    }
    if (data[0] === 'left') {
      if (data[1] === '-=55' && x >= 65.5) {
        x -= 50.5;
      }
      else if (data[1] === '+=55' && x <= 622) {
        x += 50.5;
        console.log(x);
      }
    }
    io.emit('replicate', [x, y]);
  });
});

http.listen(5000, function() {
  console.log('listening on *:5000');
});
