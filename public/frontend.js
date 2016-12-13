var angularApp = angular.module('madmouse', []);
var socket = io();

// var mouse = {
//   x: 3,
//   y: 27,
//   height: 33,
//   width: 33
// };


angularApp.controller("MainController", function($scope) {
  $scope.key = function($event) {
       if ($event.keyCode == 38 || $event.keyCode == 87) {
           console.log('up');
           $('#mouse').css('top', '-=40');
         }
       else if ($event.keyCode == 39 || $event.keyCode == 68) {
           console.log('right');
           $('#mouse').css('left', '+=40');
         }
       else if ($event.keyCode == 40 || $event.keyCode == 83) {
           console.log('down');
           $('#mouse').css('top', '+=40');

       }
       else if ($event.keyCode == 37 || $event.keyCode == 65) {
           console.log('left');
           $('#mouse').css('left', '-=40');
       }

   };
 });
