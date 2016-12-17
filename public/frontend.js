var angularApp = angular.module('madmouse', []);
var socket = io();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.strokeStyle = 'black';
ctx.lineWidth = 5;

// Maze
ctx.beginPath();
//
// Debugger grid (14X14)
// // vertical
// ctx.moveTo(50, 0);
// ctx.lineTo(50, 700);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(100, 0);
// ctx.lineTo(100, 700);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(150, 0);
// ctx.lineTo(150, 700);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(200, 0);
// ctx.lineTo(200, 700);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(250, 0);
// ctx.lineTo(250, 700);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(300, 0);
// ctx.lineTo(300, 700);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(350, 0);
// ctx.lineTo(350, 700);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(400, 0);
// ctx.lineTo(400, 700);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(450, 0);
// ctx.lineTo(450, 700);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(500, 0);
// ctx.lineTo(500, 700);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(550, 0);
// ctx.lineTo(550, 700);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(600, 0);
// ctx.lineTo(600, 700);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(650, 0);
// ctx.lineTo(650, 700);
// ctx.closePath();
//
// // horizontal
// ctx.stroke();
// ctx.moveTo(0, 50);
// ctx.lineTo(700, 50);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(0, 100);
// ctx.lineTo(700, 100);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(0, 150);
// ctx.lineTo(700, 150);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(0, 200);
// ctx.lineTo(700, 200);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(0, 250);
// ctx.lineTo(700, 250);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(0, 300);
// ctx.lineTo(700, 300);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(0, 350);
// ctx.lineTo(700, 350);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(0, 400);
// ctx.lineTo(700, 400);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(0, 450);
// ctx.lineTo(700, 450);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(0, 500);
// ctx.lineTo(700, 500);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(0, 550);
// ctx.lineTo(700, 550);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(0, 600);
// ctx.lineTo(700, 600);
// ctx.closePath();
// ctx.stroke();
// ctx.moveTo(0, 650);
// ctx.lineTo(700, 650);
// ctx.closePath();
// ctx.stroke();


socket.on('replicate', function(data) {
  $('#mouse').css('top', data[1]);
  $('#mouse').css('left', data[0]);
  console.log("replicate");
});

angularApp.controller("MainController", function($scope) {
  $scope.key = function($event) {
    if ($event.keyCode == 38 || $event.keyCode == 87) {
        $event.preventDefault();
        socket.emit('keypress', ['top', '-=50']);
      }
   else if ($event.keyCode == 39 || $event.keyCode == 68) {
        $event.preventDefault();
        socket.emit('keypress', ['left', '+=55']);

      }
    else if ($event.keyCode == 40 || $event.keyCode == 83) {
        $event.preventDefault();
        socket.emit('keypress', ['top', '+=50']);

    }
    else if ($event.keyCode == 37 || $event.keyCode == 65) {
        $event.preventDefault();
        socket.emit('keypress', ['left', '-=55']);
    }
   };
 });
