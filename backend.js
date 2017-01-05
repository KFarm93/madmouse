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
var start = new Date().getTime();
var newTime;
var minutes = 2;
var stop = false;
var seconds = 60;
var minutesPassed = 0;
var maze;

app.use(express.static('public'));
io.emit('start');

// random int generator to determine which maze
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function whichMaze() {
  var num = getRandomInt(1,4);
  if (num === 1) {
    console.log("Provided maze1");
  }
  else if (num === 2) {
    console.log("Provided maze2");
  }
  else if (num === 3) {
    console.log("Provided maze3");
  }
  return num;
}

maze = whichMaze();

// timer
function timer() {
    newTime = new Date().getTime();
    realMinutes = (newTime - start) / 60000;
    realTime--;
    // console.log("minutesPassed:", minutesPassed);
    // console.log("stop: ", stop);
    // console.log("minutes: ", minutes);
    // console.log("Seconds: ", seconds);
    // makes sure seconds is at least one when decrementing and sets stop back to false
    if (seconds >= 1) {
      seconds--;
    }
    // makes sure seconds gets set back to 59 after a minute has passed
    else if (seconds === "00" && minutesPassed === 0) {
      seconds = 59;
      minutesPassed++;
      console.log("1 line #39");
    }

    else if (seconds === "00" && minutesPassed > 0) {
      stop = true;
      seconds = "00";
      console.log("2 line #45");
    }

    // adds '0' before seconds to read as '09', '08', etc.
    if (seconds <= 9 && stop === false) {
      seconds = "0" + seconds;
    }

    // checks if there is at least 1 minute
    if (realMinutes <= 1.01) {
      minutes = 1;
    }
    // checks if there is less than 1 minute remaining
    else if (realMinutes > 1.01) {
      minutes = 0;
    }
    // checks if time is up
    if (newTime - start >= 120000 && newTime - start < 120999) {
      io.emit('timeUp');
    }
    if (isCounting === true) {
      io.emit('currentTime', [minutes, seconds]);
    }
    else if (isCounting === false) {
      // pass
    }

    // updates timer on frontend

}

io.on('connection', function(socket){
  console.log("You connected");
  socket.emit('init', maze);
  socket.emit('replicate', [x, y, src, coordX, coordY, maze]);

  socket.on('keypress', function(data) {
    if (data[0] === 'top') {
      if (data[1] === 'up') {
        y -= 50;
        coordY += data[3];
        console.log('coordY: ', coordY);
        coordX += data[4];
        console.log('coordX: ', coordX);
        src = 'images/mouse_up.png';
      }
      else if (data[1] === 'down') {
        y += 50;
        coordY += data[3];
        coordX += data[4];
        src = 'images/mouse_down.png';
      }
    }
    if (data[0] === 'left') {
      if (data[1] === 'left') {
        x -= 50;
        coordY += data[3];
        coordX += data[4];
        src = 'images/mouse_left.png';
      }
      else if (data[1] === 'right') {
        x += 50;
        coordY += data[3];
        coordX += data[4];
        src = 'images/mouse_right.png';
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
    start = new Date().getTime();
    stop = false;
    minutesPassed = 0;
    minutes = 2;
    isCounting = true;
    maze = whichMaze();
    console.log("provided maze ", maze);
    io.emit('newGame', maze);
  });
  socket.on('winEvent', function() {
    isCounting = false;
    io.emit('win');
  });
});

http.listen(5000, function() {
  console.log('listening on *:5000');
});
