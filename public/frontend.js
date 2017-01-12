var angularApp = angular.module('madmouse', []);
var socket = io();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var cheese = new Image();
cheese.src = "images/cheese.png";
cheese.id = 'cheese';
var mouse = new Image();
mouse.src = 'images/mouse_down.png';
mouse.id = 'mouse';
coordy = 0;
coordx = 0;
var isCounting = false;
var maze;
var playersConnected;
var volume;


// audio files
var shock = new Audio("ESPARK1.wav");
var win = new Audio("win.wav");


// on dom ready:
$(document).ready(function() {
  $('body').append(cheese);
  $('body').append(mouse);
});


// readying canvas lines
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;
ctx.beginPath();


//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
socket.on('init', function(data) {
  maze = data;
  var drawHorizontal = function(maze, row) {
    for (xcoord = 0; xcoord < 14; xcoord++) {
      if (maze[row][xcoord].down === true) {
        ctx.moveTo(xcoord * 50, (row + 1) * 50);
        ctx.lineTo(xcoord * 50 + 50, (row + 1) * 50);
        ctx.stroke();
      }
    }
  };

  var drawVertical = function(maze, row) {
    for (xcoord = 0; xcoord < 14; xcoord++) {
      if (maze[row][xcoord].left === true) {
        ctx.moveTo(xcoord * 50, (row + 1) * 50);
        ctx.lineTo(xcoord * 50, (row + 1) * 50 - 50);
        ctx.stroke();
      }
    }
  };
  for (i=0;i<14;i++) {
    drawHorizontal(maze, i);
    drawVertical(maze, i);
  }
});





angularApp.controller("MainController", function($scope) {
  volume = "on";
  $scope.isCounting = true;
  $scope.ready = true;
  $scope.timeup = false;
  $scope.volumeChange = function() {
    if (volume === "on") {
      $('#volume').removeClass("fa-volume-up");
      $('#volume').addClass("fa-volume-off");
      volume = "off";
    }
    else if (volume === "off") {
      $('#volume').removeClass("fa-volume-off");
      $('#volume').addClass("fa-volume-up");
      volume = "on";
    }
  };
  socket.on('replicate', function(data) {
    $('#mouse').offset({ top: data[1], left: data[0] });
    $('#mouse').attr('src', data[2]);
    coordx = data[3];
    coordy = data[4];
    $scope.playersConnected = data[5];
    $scope.$apply();
  });

  socket.on('newGame', function(data) {
    maze = data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $scope.resetShow = false;
    $scope.victory = false;
    $scope.ready = true;
    function drawIt() {
      ctx.beginPath();
      var drawHorizontal = function(maze, row) {
        for (xcoord = 0; xcoord < 14; xcoord++) {
          if (maze[row][xcoord].down === true) {
            ctx.moveTo(xcoord * 50, (row + 1) * 50);
            ctx.lineTo(xcoord * 50 + 50, (row + 1) * 50);
            ctx.stroke();
          }
        }
      };

      var drawVertical = function(maze, row) {
        for (xcoord = 0; xcoord < 14; xcoord++) {
          if (maze[row][xcoord].left === true) {
            ctx.moveTo(xcoord * 50, (row + 1) * 50);
            ctx.lineTo(xcoord * 50, (row + 1) * 50 - 50);
            ctx.stroke();
          }
        }
      };
      for (i=0;i<14;i++) {
        drawHorizontal(maze, i);
        drawVertical(maze, i);
      }
    }
    drawIt();
    coordx = 0;
    coordy = 0;
    $('#mouse').css({top: '20px', left: '20px'});
    $('#mouse').attr('src', 'images/mouse_down.png');
    $scope.minutes = 2;
    $scope.seconds = '00';
    $scope.$apply();
  });
  $scope.key = function($event) {
    $event.preventDefault();
    if ($scope.isCounting === true) {
      if ($event.keyCode == 38 || $event.keyCode == 87) {
        socket.emit('keypress', ['top', 'up', $('#mouse').offset(), -1, 0]);
        if (volume === "on") {
          shock.play();
        }
        else {
          // don't play sound
        }
      }
      else if ($event.keyCode == 39 || $event.keyCode == 68) {
        $event.preventDefault();
        socket.emit('keypress', ['left', 'right', $('#mouse').offset(), 0, 1]);
        if (volume === "on") {
          shock.play();
        }
        else {
        // don't play sound
        }
      }
      else if ($event.keyCode == 40 || $event.keyCode == 83) {
        $event.preventDefault();
        socket.emit('keypress', ['top', 'down', $('#mouse').offset(), 1, 0]);
        if (volume === "on") {
          shock.play();
        }
        else {
          // don't play sound
        }
      }
      else if ($event.keyCode == 37 || $event.keyCode == 65) {
        $event.preventDefault();
        socket.emit('keypress', ['left', 'left', $('#mouse').offset(), 0, -1]);
        if (volume === "on") {
          shock.play();
        }
        else {
          // don't play sound
        }
      }
    }
  };

   socket.on('start', function() {
     $scope.ready = false;
     $scope.isCounting = true;
     $scope.$apply();
   });
   socket.on('timeUp', function() {
     console.log("Time's up!");
     $scope.timeup = true;
     $scope.isCounting = false;
     $scope.resetShow = true;
     setTimeout(function() {
       $scope.timeup = false;
       $scope.isCounting = true;
       $scope.resetShow = false;
     }, 5000);
     $scope.$apply();
   });
   socket.on('winEvent', function() {
     if (volume === "on") {
       win.play();
     }
     $scope.isCounting = false;
     $scope.victory = true;
     $scope.resetShow = true;
     setTimeout(function() {
       $scope.timeup = false;
       $scope.isCounting = true;
       $scope.resetShow = false;
     }, 5000);
     $scope.$apply();
   });
   socket.on('currentTime', function(data) {
     $scope.minutes = data[0];
     $scope.seconds = data[1];
     $scope.playersConnected = data[2];
     $scope.$apply();
   });
 });
