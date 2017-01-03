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
var runTimer = setInterval(timer, 1000);
var realTime = 120;
var minutes;
var seconds = 60;

app.use(express.static('public'));
io.emit('start');

// timer
function timer() {
    realTime--;
    seconds--;

    // adds '0' before seconds to read as '09', '08', etc.
    if (seconds <= 9) {
      seconds = "0" + seconds;
    }
    // makes sure seconds is equal to 59 to signify a new minute, as realtime in this case will be either 119 or 59
    if (realTime === 119 || realTime === 59) {
      seconds = 59;
    }
    console.log("realTime: ", realTime, "seconds: ", seconds);

    // checks if there are at least 2 minutes remaining
    if (realTime < 180 && realTime >= 120) {
      minutes = 2;
    }
    // checks if there is at least 1 minute
    else if (realTime <= 119 && realTime >= 60) {
      minutes = 1;
    }
    // checks if there is less than 1 minute remaining
    else if (realTime <=59) {
      minutes = 0;
    }
    // checks if time is up
    if (realTime === 0) {
      console.log('Time is up! Line 47');
      console.log('runTimer: ', runTimer);
      clearInterval(runTimer);
      io.emit('timeUp');
    }
    // updates timer on frontend
    io.emit('currentTime', [minutes, seconds]);
}

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

  socket.on('reset', function() {
    coordX = 0;
    coordY = 0;
    x = 20;
    y = 20;

    // realTime is reset here:
    realTime = 120;
    seconds = 60;
    runTimer = setInterval(timer, 1000);
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
