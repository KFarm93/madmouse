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
var loggedIn = false;
var username;


// audio files
var move = new Audio("move.wav");
var win = new Audio("win.wav");


// on dom ready:
$(document).ready(function() {

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
  console.log("loggedIn is: ", loggedIn);
  $('body').append(cheese);
  $('body').append(mouse);
  if (loggedIn === false) {
    $('div').css('filter', 'blur(3px)');
    $('#mouse').css('filter', 'blur(3px)');
    $('#cheese').css('filter', 'blur(3px)');
    $('#login').submit(function(event) {
      username = $('#loginText').val();
      if (username === '') {
        alert("Please enter a nickname");
        event.preventDefault();
      }
      else {
        $('#login').toggle();
        $('div').css('filter', 'none');
        $('#mouse').css('filter', 'none');
        $('#cheese').css('filter', 'none');
        loggedIn = true;
        event.preventDefault();
      }
    });
  }
});





angularApp.controller("MainController", function($scope) {
  $('#messageForm').submit(function(){
    console.log("submitting");
    socket.emit('chat message', [$('#messageForm input').val(), username]);
    $('#messageForm input').val('');
    return false;
  });
  socket.on('recieved message', function(data) {
    console.log("appending");
    $('#messageDiv').append("<span class='names'>" + data[1] + ": </span>" + data[0] + "<br>");
    // $('#messages').append($('<p class="names">').text(username + ':'));
    // $('#messages').append($('<p>').text(msg));
    var div = $("#messageDiv");
    div.scrollTop(div.prop('scrollHeight'));
  });




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
    // $event.preventDefault();
    if ($scope.isCounting === true && loggedIn === true) {
      // move up
      if ($event.keyCode == 38) {
        socket.emit('keypress', ['top', 'up', $('#mouse').offset(), -1, 0]);
        if (volume === "on") {
          move.play();
        }
        else {
          // don't play sound
        }
      }
      else if ($event.keyCode == 39) {
        $event.preventDefault();
        // move right
        socket.emit('keypress', ['left', 'right', $('#mouse').offset(), 0, 1]);
        if (volume === "on") {
          move.play();
        }
        else {
        // don't play sound
        }
      }
      else if ($event.keyCode == 40) {
        $event.preventDefault();
        // move down
        socket.emit('keypress', ['top', 'down', $('#mouse').offset(), 1, 0]);
        if (volume === "on") {
          move.play();
        }
        else {
          // don't play sound
        }
      }
      else if ($event.keyCode == 37) {
        $event.preventDefault();
        // move left
        socket.emit('keypress', ['left', 'left', $('#mouse').offset(), 0, -1]);
        if (volume === "on") {
          move.play();
        }
        else {
          // don't play sound
        }
      }
    }
  };

  $scope.upArrow = function() {
    if ($scope.isCounting === true) {
      socket.emit('keypress', ['top', 'up', $('#mouse').offset(), -1, 0]);
      if (volume === "on") {
        move.play();
      }
      else {
        // don't play sound
      }
    }
  };
  $scope.rightArrow = function() {
    if ($scope.isCounting === true) {
      socket.emit('keypress', ['left', 'right', $('#mouse').offset(), 0, 1]);
      if (volume === "on") {
        move.play();
      }
      else {
      // don't play sound
      }
    }
  };
  $scope.downArrow = function() {
    if ($scope.isCounting === true) {
      socket.emit('keypress', ['top', 'down', $('#mouse').offset(), 1, 0]);
      if (volume === "on") {
        move.play();
      }
      else {
        // don't play sound
      }
    }
  };
  $scope.leftArrow = function() {
    console.log("left arrow clicked");
    if ($scope.isCounting === true) {
      // move left
      socket.emit('keypress', ['left', 'left', $('#mouse').offset(), 0, -1]);
      if (volume === "on") {
        move.play();
      }
      else {
        // don't play sound
      }
    }
  };
   socket.on('login', function() {

   });
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
