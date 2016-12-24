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
var frontClock;
var isCounting = false;
var shock = new Audio("ESPARK1.wav");

$(document).ready(function() {
  $('body').append(cheese);
  $('body').append(mouse);
  frontClock = new FlipClock($('.timer'), 120, {
    clockFace: 'MinuteCounter',
    autoStart: false,
    countdown: true
  });
});



ctx.strokeStyle = 'black';
ctx.lineWidth = 5;
ctx.beginPath();

// // Default grid (14X14)


// // vertical
// ctx.moveTo(50, 0);
// ctx.lineTo(50, 700);
// ctx.stroke();
// ctx.moveTo(100, 0);
// ctx.lineTo(100, 700);
// ctx.stroke();
// ctx.moveTo(150, 0);
// ctx.lineTo(150, 700);
// ctx.stroke();
// ctx.moveTo(200, 0);
// ctx.lineTo(200, 700);
// ctx.stroke();
// ctx.moveTo(250, 0);
// ctx.lineTo(250, 700);
// ctx.stroke();
// ctx.moveTo(300, 0);
// ctx.lineTo(300, 700);
// ctx.stroke();
// ctx.moveTo(350, 0);
// ctx.lineTo(350, 700);
// ctx.stroke();
// ctx.moveTo(400, 0);
// ctx.lineTo(400, 700);
// ctx.stroke();
// ctx.moveTo(450, 0);
// ctx.lineTo(450, 700);
// ctx.stroke();
// ctx.moveTo(500, 0);
// ctx.lineTo(500, 700);
// ctx.stroke();
// ctx.moveTo(550, 0);
// ctx.lineTo(550, 700);
// ctx.stroke();
// ctx.moveTo(600, 0);
// ctx.lineTo(600, 700);
// ctx.stroke();
// ctx.moveTo(650, 0);
// ctx.lineTo(650, 700);
//
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



//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------




// Maze 1

// vertical
// <Column 1>
ctx.moveTo(50, 100);
ctx.lineTo(50, 350);
ctx.stroke();
ctx.moveTo(50, 400);
ctx.lineTo(50, 450);
ctx.stroke();
// </Column 1>


// <Column 2>
ctx.moveTo(100, 0);
ctx.lineTo(100, 50);
ctx.stroke();
ctx.moveTo(100, 200);
ctx.lineTo(100, 400);
ctx.stroke();
ctx.moveTo(100, 450);
ctx.lineTo(100, 650);
ctx.stroke();
// </Column 2>

// <Column 3>
ctx.moveTo(150, 50);
ctx.lineTo(150, 200);
ctx.stroke();
ctx.moveTo(150, 350);
ctx.lineTo(150, 450);
ctx.stroke();
// </Column 3>

// <Column 4>
ctx.moveTo(200, 0);
ctx.lineTo(200, 100);
ctx.stroke();
ctx.moveTo(200, 200);
ctx.lineTo(200, 250);
ctx.stroke();
ctx.moveTo(200, 400);
ctx.lineTo(200, 500);
ctx.stroke();
ctx.moveTo(150, 550);
ctx.lineTo(150, 650);
ctx.stroke();
// </Column 4>

// <Column 5>
ctx.moveTo(250, 250);
ctx.lineTo(250, 450);
ctx.stroke();
ctx.moveTo(250, 500);
ctx.lineTo(250, 550);
ctx.stroke();
// </Column 5>

// <Column 6>
ctx.moveTo(300, 50);
ctx.lineTo(300, 100);
ctx.stroke();
ctx.moveTo(300, 200);
ctx.lineTo(300, 350);
ctx.stroke();
ctx.moveTo(300, 450);
ctx.lineTo(300, 500);
ctx.stroke();
ctx.moveTo(300, 550);
ctx.lineTo(300, 650);
ctx.stroke();
// </Column 6>

// <Column 7>
ctx.moveTo(350, 100);
ctx.lineTo(350, 150);
ctx.stroke();
ctx.moveTo(350, 250);
ctx.lineTo(350, 300);
ctx.stroke();
ctx.moveTo(350, 350);
ctx.lineTo(350, 550);
ctx.stroke();
ctx.moveTo(350, 650);
ctx.lineTo(350, 700);
ctx.stroke();
// </Column 7>

// <Column 8>
ctx.moveTo(400, 50);
ctx.lineTo(400, 150);
ctx.stroke();
ctx.moveTo(400, 200);
ctx.lineTo(400, 250);
ctx.stroke();
ctx.moveTo(400, 600);
ctx.lineTo(400, 650);
ctx.stroke();
// </Column 8>

// <Column 9>
ctx.moveTo(450, 0);
ctx.lineTo(450, 100);
ctx.stroke();
ctx.moveTo(450, 150);
ctx.lineTo(450, 300);
ctx.stroke();
ctx.moveTo(450, 350);
ctx.lineTo(450, 500);
ctx.stroke();
ctx.moveTo(450, 600);
ctx.lineTo(450, 700);
ctx.stroke();
// </Column 9>

// <Column 10>
ctx.moveTo(500, 150);
ctx.lineTo(500, 200);
ctx.stroke();
ctx.moveTo(500, 250);
ctx.lineTo(500, 300);
ctx.stroke();
ctx.moveTo(500, 350);
ctx.lineTo(500, 400);
ctx.stroke();
ctx.moveTo(500, 500);
ctx.lineTo(500, 650);
ctx.stroke();
// </Column 10>

// <Column 11>
ctx.moveTo(550, 200);
ctx.lineTo(550, 250);
ctx.stroke();
ctx.moveTo(550, 550);
ctx.lineTo(550, 650);
ctx.stroke();
// </Column 11>

// <Column 12>
ctx.moveTo(600, 50);
ctx.lineTo(600, 100);
ctx.stroke();
ctx.moveTo(600, 250);
ctx.lineTo(600, 300);
ctx.stroke();
ctx.moveTo(600, 650);
ctx.lineTo(600, 700);
ctx.stroke();
// </Column 12>

// <Column 13>
ctx.moveTo(650, 100);
ctx.lineTo(650, 250);
ctx.stroke();
ctx.moveTo(650, 300);
ctx.lineTo(650, 500);
ctx.stroke();
ctx.moveTo(650, 600);
ctx.lineTo(650, 650);
ctx.stroke();
// </Column 13>


//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------


// horizontal
// <Row A>
ctx.moveTo(50, 50);
ctx.lineTo(100, 50);
ctx.stroke();
ctx.moveTo(250, 50);
ctx.lineTo(400, 50);
ctx.stroke();
ctx.moveTo(500, 50);
ctx.lineTo(700, 50);
ctx.stroke();
// </Row A>

// <Row B>
ctx.moveTo(100, 100);
ctx.lineTo(150, 100);
ctx.stroke();
ctx.moveTo(200, 100);
ctx.lineTo(250, 100);
ctx.stroke();
ctx.moveTo(450, 100);
ctx.lineTo(550, 100);
ctx.stroke();
// </Row B>

// <Row C>
ctx.moveTo(50, 150);
ctx.lineTo(100, 150);
ctx.stroke();
ctx.moveTo(150, 150);
ctx.lineTo(450, 150);
ctx.stroke();
ctx.moveTo(500, 150);
ctx.lineTo(600, 150);
ctx.stroke();
// </Row C>

// <Row D>
ctx.moveTo(150, 200);
ctx.lineTo(400, 200);
ctx.stroke();
ctx.moveTo(550, 200);
ctx.lineTo(650, 200);
ctx.stroke();
// </Row D>

// <Row E>
ctx.moveTo(100, 250);
ctx.lineTo(150, 250);
ctx.stroke();
ctx.moveTo(650, 250);
ctx.lineTo(700, 250);
ctx.stroke();
// </Row E>

// <Row F>
ctx.moveTo(150, 300);
ctx.lineTo(250, 300);
ctx.stroke();
ctx.moveTo(350, 300);
ctx.lineTo(450, 300);
ctx.stroke();
ctx.moveTo(500, 300);
ctx.lineTo(650, 300);
ctx.stroke();
// </Row F>


// <Row G>
ctx.moveTo(100, 350);
ctx.lineTo(250, 350);
ctx.stroke();
ctx.moveTo(350, 350);
ctx.lineTo(450, 350);
ctx.stroke();
ctx.moveTo(500, 350);
ctx.lineTo(600, 350);
ctx.stroke();
// </Row G>

// <Row H>
ctx.moveTo(250, 400);
ctx.lineTo(300, 400);
ctx.stroke();
ctx.moveTo(350, 400);
ctx.lineTo(400, 400);
ctx.stroke();
ctx.moveTo(500, 400);
ctx.lineTo(650, 400);
ctx.stroke();
// </Row H>


// <Row I>
ctx.moveTo(50, 450);
ctx.lineTo(150, 450);
ctx.stroke();
ctx.moveTo(200, 450);
ctx.lineTo(250, 450);
ctx.stroke();
ctx.moveTo(400, 450);
ctx.lineTo(600, 450);
ctx.stroke();
// </Row I>

// <Row J>
ctx.moveTo(0, 500);
ctx.lineTo(50, 500);
ctx.stroke();
ctx.moveTo(150, 500);
ctx.lineTo(200, 500);
ctx.stroke();
ctx.moveTo(250, 500);
ctx.lineTo(300, 500);
ctx.stroke();
ctx.moveTo(350, 500);
ctx.lineTo(400, 500);
ctx.stroke();
ctx.moveTo(500, 500);
ctx.lineTo(700, 500);
ctx.stroke();
// </Rox J>

// <Row K>
ctx.moveTo(50, 550);
ctx.lineTo(100, 550);
ctx.stroke();
ctx.moveTo(150, 550);
ctx.lineTo(250, 550);
ctx.stroke();
ctx.moveTo(300, 550);
ctx.lineTo(450, 550);
ctx.stroke();
ctx.moveTo(550, 550);
ctx.lineTo(650, 550);
ctx.stroke();
// </Row K>

// <Row L>
ctx.moveTo(0, 600);
ctx.lineTo(50, 600);
ctx.stroke();
ctx.moveTo(200, 600);
ctx.lineTo(450, 600);
ctx.stroke();
ctx.moveTo(600, 600);
ctx.lineTo(700, 600);
ctx.stroke();
// </Row L>

// <Row M>
ctx.moveTo(50, 650);
ctx.lineTo(100, 650);
ctx.stroke();
ctx.moveTo(150, 650);
ctx.lineTo(250, 650);
ctx.stroke();
ctx.moveTo(550, 650);
ctx.lineTo(600, 650);
ctx.stroke();
// </Row M>



//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------


var maze1 = [ // Row A
              [{up: true, right: false, down: false, left: true, name: 'A1'}, {up: true, right: true, down: true, left: false, name: 'A2'}, {up: true, right: false, down: false, left: true, name: 'A3'}, {up: true, right: true, down: false, left: false, name: 'A4'}, {up: true, right: false, down: false, left: true, name: 'A5'}, {up: true, right: false, down: true, left: false, name: 'A6'}, {up: true, right: false, down: true, left: false, name: 'A7'}, {up: true, right: false, down: true, left: false, name: 'A8'}, {up: true, right: true, down: false, left: false, name: 'A9'}, {up: true, right: false, down: false, left: true, name: 'A10'}, {up: true, right: false, down: true, left: false, name: 'A11'}, {up: true, right: false, down: true, left: false, name: 'A12'}, {up: true, right: false, down: true, left: false, name: 'A13'}, {up: true, right: true, down: true, left: false, name: 'A14'}],
              // Row B
              [{up: false, right: false, down: false, left: true, name: 'B1'}, {up: true, right: false, down: false, left: false, name: 'B2'}, {up: false, right: true, down: true, left: false, name: 'B3'}, {up: false, right: true, down: false, left: true, name: 'B4'}, {up: false, right: false, down: true, left: true, name: 'B5'}, {up: true, right: true, down: false, left: false, name: 'B6'}, {up: true, right: false, down: false, left: true, name: 'B7'}, {up: true, right: true, down: false, left: false, name: 'B8'}, {up: false, right: true, down: false, left: true, name: 'B9'}, {up: false, right: false, down: true, left: true, name: 'B10'}, {up: true, right: false, down: true, left: false, name: 'B11'}, {up: true, right: true, down: false, left: false, name: 'B12'}, {up: true, right: false, down: false, left: true, name: 'B13'}, {up: true, right: true, down: false, left: false, name: 'B14'}],
              // Row C
              [{up: false, right: true, down: false, left: true, name: 'C1'}, {up: false, right: false, down: true, left: true, name: 'C2'}, {up: true, right: true, down: false, left: false, name: 'C3'}, {up: false, right: false, down: true, left: true, name: 'C4'}, {up: true, right: false, down: true, left: false, name: 'C5'}, {up: false, right: false, down: true, left: false, name: 'C6'}, {up: false, right: true, down: true, left: false, name: 'C7'}, {up: false, right: true, down: true, left: true, name: 'C8'}, {up: false, right: false, down: true, left: true, name: 'C9'}, {up: true, right: false, down: false, left: false, name: 'C10'}, {up: true, right: false, down: true, left: false, name: 'C11'}, {up: false, right: false, down: true, left: false, name: 'C12'}, {up: false, right: true, down: false, left: false, name: 'C13'}, {up: false, right: true, down: false, left: true, name: 'C14'}],
              // Row D
              [{up: false, right: true, down: false, left: true, name: 'D1'}, {up: true, right: false, down: false, left: true, name: 'D2'}, {up: false, right: true, down: false, left: false, name: 'D3'}, {up: true, right: false, down: true, left: true, name: 'D4'}, {up: true, right: false, down: true, left: false, name: 'D5'}, {up: true, right: false, down: true, left: false, name: 'D6'}, {up: true, right: false, down: true, left: false, name: 'D7'}, {up: true, right: false, down: true, left: false, name: 'D8'}, {up: true, right: true, down: false, left: false, name: 'D9'}, {up: false, right: true, down: false, left: true, name: 'D10'}, {up: true, right: false, down: false, left: true, name: 'D11'}, {up: true, right: false, down: true, left: false, name: 'D12'}, {up: false, right: true, down: true, left: false, name: 'D13'}, {up: false, right: true, down: false, left: true, name: 'D14'}],
              // Row E
              [{up: false, right: true, down: false, left: true, name: 'E1'}, {up: false, right: true, down: false, left: true, name: 'E2'}, {up: false, right: false, down: true, left: true, name: 'E3'}, {up: true, right: true, down: false, left: false, name: 'E4'}, {up: true, right: false, down: false, left: true, name: 'E5'}, {up: true, right: true, down: false, left: false, name: 'E6'}, {up: true, right: false, down: false, left: true, name: 'E7'}, {up: true, right: true, down: false, left: false, name: 'E8'}, {up: false, right: true, down: false, left: true, name: 'E9'}, {up: false, right: false, down: false, left: true, name: 'E10'}, {up: false, right: true, down: false, left: false, name: 'E11'}, {up: true, right: false, down: false, left: true, name: 'E12'}, {up: true, right: true, down: false, left: false, name: 'E13'}, {up: false, right: true, down: true, left: true, name: 'E14'}],
              // Row F
              [{up: false, right: true, down: false, left: true, name: 'F1'}, {up: false, right: true, down: false, left: true, name: 'F2'}, {up: true, right: false, down: false, left: true, name: 'F3'}, {up: false, right: false, down: true, left: false, name: 'F4'}, {up: false, right: true, down: true, left: false, name: 'F5'}, {up: false, right: true, down: false, left: true, name: 'F6'}, {up: false, right: true, down: false, left: true, name: 'F7'}, {up: false, right: false, down: true, left: true, name: 'F8'}, {up: false, right: true, down: true, left: false, name: 'F9'}, {up: false, right: true, down: false, left: true, name: 'F10'}, {up: false, right: false, down: true, left: true, name: 'F11'}, {up: false, right: true, down: true, left: false, name: 'F12'}, {up: false, right: false, down: true, left: true, name: 'F13'}, {up: true, right: true, down: false, left: false, name: 'F14'}],
              // Row G
              [{up: false, right: true, down: false, left: true, name: 'G1'}, {up: false, right: true, down: false, left: true, name: 'G2'}, {up: false, right: false, down: true, left: true, name: 'G3'}, {up: true, right: false, down: true, left: false, name: 'G4'}, {up: true, right: true, down: true, left: false, name: 'G5'}, {up: false, right: true, down: false, left: true, name: 'G6'}, {up: false, right: false, down: false, left: true, name: 'G7'}, {up: true, right: false, down: true, left: false, name: 'G8'}, {up: true, right: false, down: true, left: false, name: 'G9'}, {up: false, right: false, down: false, left: false, name: 'G10'}, {up: true, right: false, down: true, left: false, name: 'G11'}, {up: true, right: false, down: true, left: false, name: 'G12'}, {up: true, right: true, down: false, left: false, name: 'G13'}, {up: false, right: true, down: false, left: true, name: 'G14'}],
              // Row H
              [{up: false, right: false, down: false, left: true, name: 'H1'}, {up: false, right: true, down: false, left: false, name: 'H2'}, {up: true, right: true, down: false, left: true, name: 'H3'}, {up: true, right: false, down: false, left: true, name: 'H4'}, {up: true, right: true, down: false, left: false, name: 'H5'}, {up: false, right: false, down: true, left: true, name: 'H6'}, {up: false, right: true, down: false, left: false, name: 'H7'}, {up: true, right: false, down: true, left: true, name: 'H8'}, {up: true, right: true, down: false, left: false, name: 'H9'}, {up: false, right: true, down: false, left: true, name: 'H10'}, {up: true, right: false, down: true, left: true, name: 'H11'}, {up: true, right: false, down: true, left: false, name: 'H12'}, {up: false, right: true, down: true, left: false, name: 'H13'}, {up: false, right: true, down: false, left: true, name: 'H14'}],
              // Row I
              [{up: false, right: true, down: false, left: true, name: 'I1'}, {up: false, right: false, down: true, left: true, name: 'I2'}, {up: false, right: true, down: true, left: false, name: 'I3'}, {up: false, right: true, down: false, left: true, name: 'I4'}, {up: false, right: true, down: true, left: true, name: 'I5'}, {up: true, right: false, down: false, left: true, name: 'I6'}, {up: false, right: true, down: false, left: false, name: 'I7'}, {up: true, right: false, down: false, left: true, name: 'I8'}, {up: false, right: true, down: true, left: false, name: 'I9'}, {up: false, right: false, down: true, left: true, name: 'I10'}, {up: true, right: false, down: true, left: false, name: 'I11'}, {up: true, right: false, down: true, left: false, name: 'I12'}, {up: true, right: true, down: false, left: false, name: 'I13'}, {up: false, right: true, down: false, left: true, name: 'I14'}],
              // Row J
              [{up: false, right: false, down: true, left: true, name: 'J1'}, {up: true, right: true, down: false, left: false, name: 'J2'}, {up: true, right: false, down: false, left: true, name: 'J3'}, {up: false, right: true, down: true, left: false, name: 'J4'}, {up: true, right: false, down: false, left: true, name: 'J5'}, {up: false, right: true, down: true, left: false, name: 'J6'}, {up: false, right: true, down: false, left: true, name: 'J7'}, {up: false, right: false, down: true, left: true, name: 'J8'}, {up: true, right: true, down: false, left: false, name: 'J9'}, {up: true, right: false, down: false, left: true, name: 'J10'}, {up: true, right: false, down: true, left: false, name: 'J11'}, {up: true, right: false, down: true, left: false, name: 'J12'}, {up: false, right: true, down: true, left: false, name: 'J13'}, {up: false, right: true, down: true, left: true, name: 'J14'}],
              // Row K
              [{up: true, right: false, down: false, left: true, name: 'K1'}, {up: false, right: true, down: true, left: false, name: 'K2'}, {up: false, right: false, down: false, left: true, name: 'K3'}, {up: true, right: false, down: true, left: false, name: 'K4'}, {up: false, right: true, down: true, left: false, name: 'K5'}, {up: true, right: false, down: false, left: true, name: 'K6'}, {up: false, right: true, down: true, left: false, name: 'K7'}, {up: true, right: false, down: true, left: true, name: 'K8'}, {up: false, right: false, down: true, left: false, name: 'K9'}, {up: false, right: true, down: false, left: false, name: 'K10'}, {up: true, right: false, down: false, left: true, name: 'K11'}, {up: true, right: false, down: true, left: false, name: 'K12'}, {up: true, right: false, down: true, left: false, name: 'K13'}, {up: true, right: true, down: false, left: false, name: 'K14'}],
              // Row L
              [{up: false, right: false, down: true, left: true, name: 'L1'}, {up: true, right: true, down: false, left: false, name: 'L2'}, {up: false, right: true, down: false, left: true, name: 'L3'}, {up: true, right: false, down: false, left: true, name: 'L4'}, {up: true, right: false, down: true, left: false, name: 'L5'}, {up: false, right: true, down: true, left: false, name: 'L6'}, {up: true, right: false, down: true, left: true, name: 'L7'}, {up: true, right: false, down: true, left: false, name: 'L8'}, {up: true, right: false, down: true, left: false, name: 'L9'}, {up: false, right: true, down: false, left: false, name: 'L10'}, {up: false, right: true, down: false, left: true, name: 'L11'}, {up: true, right: false, down: false, left: true, name: 'L12'}, {up: true, right: false, down: true, left: false, name: 'L13'}, {up: false, right: true, down: true, left: false, name: 'L14'}],
              // Row M
              [{up: true, right: false, down: false, left: true, name: 'M1'}, {up: false, right: true, down: true, left: false, name: 'M2'}, {up: false, right: true, down: false, left: true, name: 'M3'}, {up: false, right: false, down: true, left: true, name: 'M4'}, {up: true, right: false, down: true, left: false, name: 'M5'}, {up: true, right: true, down: false, left: false, name: 'M6'}, {up: true, right: false, down: false, left: true, name: 'M7'}, {up: true, right: true, down: false, left: false, name: 'M8'}, {up: true, right: true, down: false, left: true, name: 'M9'}, {up: false, right: true, down: false, left: true, name: 'M10'}, {up: false, right: true, down: false, left: true, name: 'M11'}, {up: false, right: false, down: true, left: true, name: 'M12'}, {up: true, right: true, down: false, left: false, name: 'M13'}, {up: true, right: true, down: false, left: true, name: 'M14'}],
              // Row N
              [{up: false, right: false, down: true, left: true, name: 'N1'}, {up: true, right: false, down: true, left: false, name: 'N2'}, {up: false, right: false, down: true, left: false, name: 'N3'}, {up: true, right: false, down: true, left: false, name: 'N4'}, {up: true, right: false, down: true, left: false, name: 'N5'}, {up: false, right: false, down: true, left: false, name: 'N6'}, {up: false, right: true, down: true, left: false, name: 'N7'}, {up: false, right: false, down: true, left: true, name: 'N8'}, {up: false, right: true, down: true, left: false, name: 'N9'}, {up: false, right: false, down: true, left: true, name: 'N10'}, {up: false, right: false, down: true, left: false, name: 'N11'}, {up: true, right: true, down: true, left: false, name: 'N12'}, {up: false, right: false, down: true, left: true, name: 'N13'}, {up: false, right: true, down: true, left: false, name: 'N14'}]
            ];


//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------


socket.on('replicate', function(data) {
  $('#mouse').offset({ top: data[1], left: data[0] });
  $('#mouse').attr('src', data[2]);
  coordx = data[3];
  coordy = data[4];
  console.log("x:", data[3]);
  console.log("y:", data[4]);
  // Check win
  if (coordx === 13 && coordy === 12) {
    setTimeout(function() {
      socket.emit('winEvent');
    }, 500);
  }
});



angularApp.controller("MainController", function($scope) {
  $scope.ready = true;
  $scope.delay = false;
  $scope.key = function($event) {
    $event.preventDefault();
    if ($scope.isCounting === true && $scope.delay === false) {
      if ($event.keyCode == 38 || $event.keyCode == 87) {
          if (maze1[coordy][coordx].up === false) {
            socket.emit('keypress', ['top', 'up', $('#mouse').offset(), -1, 0]);
            shock.play();
            // $scope.delay = true;
            setTimeout(function() {
              $scope.delay = false;
              console.log('delay');
            }, 1000);
          }
          else {
            // blocked
          }

        }
     else if ($event.keyCode == 39 || $event.keyCode == 68 && $scope.delay === false) {
          $event.preventDefault();
          if (maze1[coordy][coordx].right === false) {
            socket.emit('keypress', ['left', 'right', $('#mouse').offset(), 0, 1]);
            shock.play();
            // $scope.delay = true;
            setTimeout(function() {
              $scope.delay = false;
              console.log('delay');
            }, 1000);
          }
          else {
            // blocked
          }
        }
      else if ($event.keyCode == 40 || $event.keyCode == 83 && $scope.delay === false) {
          $event.preventDefault();
          console.log(coordy);
          if (maze1[coordy][coordx].down === false) {
            socket.emit('keypress', ['top', 'down', $('#mouse').offset(), 1, 0]);
            shock.play();
            // $scope.delay = true;
            setTimeout(function() {
              $scope.delay = false;
              console.log('delay');
            }, 1000);
          }
          else {
            // blocked
          }
        }
      else if ($event.keyCode == 37 || $event.keyCode == 65 && $scope.delay === false) {
          $event.preventDefault();
          if (maze1[coordy][coordx].left === false) {
            socket.emit('keypress', ['left', 'left', $('#mouse').offset(), 0, -1]);
            shock.play();
            // $scope.delay = true;
            setTimeout(function() {
              $scope.delay = false;
              console.log('delay');
            }, 1000);
          }
          else {
            // blocked
          }
        }
      }
      // $scope.delay = true;
      // setTimeout(function() {
      //   $scope.delay = false;
      //   console.log('delay');
      // }, 3000);
   };
   $scope.startTimer = function() {
     socket.emit('beginTimer');
   };
   socket.on('start', function() {
     frontClock.start();
     $scope.ready = false;
     $scope.isCounting = true;
     $scope.$apply();
   });
   socket.on('timeUp', function() {
     console.log('Time\'s up!');
     $scope.isCounting = false;
     $scope.resetShow = true;
     $scope.$apply();
   });
   $scope.reset = function() {
     socket.emit('reset');
   };
   socket.on('delayOver', function() {
     $scope.delay = false;
     console.log("delay over");
   });
   socket.on('newGame', function() {
     $scope.resetShow = false;
     $scope.ready = true;
     frontClock.setTime(120);
     coordx = 0;
     coordy = 0;
     $('#mouse').css({top: '20px', left: '20px'});
     $('#mouse').attr('src', 'images/mouse_down.png');
     $scope.$apply();
   });
   socket.on('win', function() {
     $scope.isCounting = false;
     $scope.resetShow = true;
     frontClock.stop();
     $scope.$apply();
   });
 });
