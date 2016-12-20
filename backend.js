var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var x = 20;
var y = 20;
var src = "images/mouse_down.png";
var coordX = 0;
var coordY = 0;

app.use(express.static('public'));

io.on('connection', function(socket){
  console.log("You connected");
  socket.emit('replicate', [x, y, src, coordX, coordY]);

  socket.on('keypress', function(data) {
    if (data[0] === 'top') {
      if (data[1] === 'up') {
        y -= 50;
        coordY += data[3];
        console.log('coordY: ', coordY);
        coordX += data[4];
        console.log('coordX: ', coordX);
        src = 'images/mouse_up.png';
        console.log("up");
      }
      else if (data[1] === 'down') {
        y += 50;
        coordY += data[3];
        coordX += data[4];
        src = 'images/mouse_down.png';
        console.log("down");
      }
    }
    if (data[0] === 'left') {
      if (data[1] === 'left') {
        x -= 50;
        coordY += data[3];
        coordX += data[4];
        src = 'images/mouse_left.png';
        console.log("left");
      }
      else if (data[1] === 'right') {
        x += 50;
        coordY += data[3];
        coordX += data[4];
        src = 'images/mouse_right.png';
        console.log("right");
      }
    }
    io.emit('replicate', [x, y, src, coordX, coordY]);
  });
});

http.listen(5000, function() {
  console.log('listening on *:5000');
});
