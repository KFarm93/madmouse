var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var x = 20;
var y = 20;
var src = "images/mouse_down.png";
var coordX = 0;
var coordY = 0;
var isCounting = true;
// var runTimer = setInterval(timer, 1000);
// var time = 30;

app.use(express.static('public'));
io.emit('start');
// function timer() {
//     time--;
//     console.log(time);
//     io.emit('currentTime', time);
//     if (time === 0) {
//       clearInterval(runTimer);
//       io.emit('timeUp');
//     }
// }

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
  socket.on('beginTimer',function(data) {
    io.emit('start');
    isCounting = true;
    setTimeout(function() {
      if (isCounting === true) {
        io.emit('timeUp');
        console.log("Time's up");
      }
    }, 10000);
  });
  socket.on('reset', function() {
    coordX = 0;
    coordY = 0;
    x = 20;
    y = 20;
    io.emit('newGame');
  });
  socket.on('winEvent', function() {
    isCounting = false;
    io.emit('win');
  });
});

http.listen(5000, function() {
  console.log('listening on *:5000');
});
