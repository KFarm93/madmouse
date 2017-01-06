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



// audio files
var shock = new Audio("ESPARK1.wav");

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


// maze arrays
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
var maze2 = [ // Row A
              [{up: true, right: false, down: true, left: true, name: 'A1'}, {up: true, right: false, down: false, left: false, name: 'A2'}, {up: true, right: true, down: false, left: false, name: 'A3'}, {up: true, right: false, down: false, left: true, name: 'A4'}, {up: true, right: false, down: true, left: false, name: 'A5'}, {up: true, right: false, down: true, left: false, name: 'A6'}, {up: true, right: false, down: true, left: false, name: 'A7'}, {up: true, right: false, down: true, left: false, name: 'A8'}, {up: true, right: false, down: true, left: false, name: 'A9'}, {up: true, right: false, down: true, left: false, name: 'A10'}, {up: true, right: false, down: true, left: false, name: 'A11'}, {up: true, right: false, down: false, left: false, name: 'A12'}, {up: true, right: true, down: false, left: false, name: 'A13'}, {up: true, right: true, down: false, left: true, name: 'A14'}],
              // Row B
              [{up: true, right: false, down: false, left: true, name: 'B1'}, {up: false, right: true, down: true, left: false, name: 'B2'}, {up: false, right: true, down: true, left: true, name: 'B3'}, {up: false, right: true, down: false, left: true, name: 'B4'}, {up: true, right: false, down: false, left: true, name: 'B5'}, {up: true, right: true, down: false, left: false, name: 'B6'}, {up: true, right: false, down: false, left: true, name: 'B7'}, {up: true, right: true, down: false, left: false, name: 'B8'}, {up: true, right: false, down: false, left: true, name: 'B9'}, {up: true, right: true, down: false, left: false, name: 'B10'}, {up: true, right: false, down: false, left: true, name: 'B11'}, {up: false, right: true, down: true, left: false, name: 'B12'}, {up: false, right: false, down: true, left: true, name: 'B13'}, {up: false, right: true, down: true, left: false, name: 'B14'}],
              // Row C
              [{up: false, right: true, down: false, left: true, name: 'C1'}, {up: true, right: false, down: false, left: true, name: 'C2'}, {up: true, right: false, down: true, left: false, name: 'C3'}, {up: false, right: false, down: true, left: false, name: 'C4'}, {up: false, right: true, down: true, left: false, name: 'C5'}, {up: false, right: true, down: true, left: true, name: 'C6'}, {up: false, right: true, down: false, left: true, name: 'C7'}, {up: false, right: false, down: true, left: true, name: 'C8'}, {up: false, right: true, down: true, left: false, name: 'C9'}, {up: false, right: true, down: false, left: true, name: 'C10'}, {up: false, right: false, down: false, left: true, name: 'C11'}, {up: true, right: false, down: true, left: false, name: 'C12'}, {up: true, right: false, down: true, left: false, name: 'C13'}, {up: true, right: true, down: false, left: false, name: 'C14'}],
              // Row D
              [{up: false, right: true, down: false, left: true, name: 'D1'}, {up: false, right: true, down: false, left: true, name: 'D2'}, {up: true, right: false, down: false, left: true, name: 'D3'}, {up: true, right: true, down: false, left: false, name: 'D4'}, {up: true, right: false, down: false, left: true, name: 'D5'}, {up: true, right: true, down: false, left: false, name: 'D6'}, {up: false, right: false, down: true, left: true, name: 'D7'}, {up: true, right: true, down: false, left: false, name: 'D8'}, {up: true, right: false, down: false, left: true, name: 'D9'}, {up: false, right: true, down: true, left: false, name: 'D10'}, {up: false, right: true, down: false, left: true, name: 'D11'}, {up: true, right: false, down: false, left: true, name: 'D12'}, {up: true, right: false, down: true, left: false, name: 'D13'}, {up: false, right: true, down: false, left: false, name: 'D14'}],
              // Row E
              [{up: false, right: true, down: false, left: true, name: 'E1'}, {up: false, right: true, down: false, left: true, name: 'E2'}, {up: false, right: true, down: false, left: true, name: 'E3'}, {up: false, right: false, down: true, left: true, name: 'E4'}, {up: false, right: true, down: true, left: false, name: 'E5'}, {up: false, right: false, down: true, left: true, name: 'E6'}, {up: true, right: true, down: false, left: false, name: 'E7'}, {up: false, right: true, down: false, left: true, name: 'E8'}, {up: false, right: false, down: true, left: true, name: 'E9'}, {up: true, right: false, down: true, left: false, name: 'E10'}, {up: false, right: true, down: false, left: false, name: 'E11'}, {up: true, right: false, down: true, left: true, name: 'E12'}, {up: true, right: true, down: false, left: false, name: 'E13'}, {up: false, right: true, down: false, left: true, name: 'E14'}],
              // Row F
              [{up: false, right: true, down: false, left: true, name: 'F1'}, {up: false, right: true, down: false, left: true, name: 'F2'}, {up: false, right: true, down: false, left: true, name: 'F3'}, {up: true, right: false, down: true, left: true, name: 'F4'}, {up: true, right: false, down: false, left: false, name: 'F5'}, {up: true, right: true, down: false, left: false, name: 'F6'}, {up: false, right: true, down: false, left: true, name: 'F7'}, {up: false, right: true, down: false, left: true, name: 'F8'}, {up: true, right: true, down: false, left: true, name: 'F9'}, {up: true, right: false, down: false, left: true, name: 'F10'}, {up: false, right: true, down: true, left: false, name: 'F11'}, {up: true, right: false, down: false, left: true, name: 'F12'}, {up: false, right: true, down: true, left: false, name: 'F13'}, {up: false, right: true, down: false, left: true, name: 'F14'}],
              // Row G
              [{up: false, right: true, down: false, left: true, name: 'G1'}, {up: false, right: true, down: false, left: true, name: 'G2'}, {up: false, right: true, down: false, left: true, name: 'G3'}, {up: true, right: false, down: false, left: true, name: 'G4'}, {up: false, right: true, down: true, left: false, name: 'G5'}, {up: false, right: true, down: true, left: true, name: 'G6'}, {up: false, right: false, down: true, left: true, name: 'G7'}, {up: false, right: true, down: true, left: false, name: 'G8'}, {up: false, right: true, down: false, left: true, name: 'G9'}, {up: false, right: false, down: true, left: true, name: 'G10'}, {up: true, right: false, down: false, left: false, name: 'G11'}, {up: false, right: true, down: true, left: false, name: 'G12'}, {up: true, right: false, down: true, left: true, name: 'G13'}, {up: false, right: true, down: true, left: false, name: 'G14'}],
              // Row H
              [{up: false, right: false, down: true, left: true, name: 'H1'}, {up: false, right: true, down: true, left: false, name: 'H2'}, {up: false, right: true, down: false, left: true, name: 'H3'}, {up: false, right: false, down: true, left: true, name: 'H4'}, {up: true, right: true, down: false, left: false, name: 'H5'}, {up: true, right: false, down: false, left: true, name: 'H6'}, {up: true, right: false, down: true, left: false, name: 'H7'}, {up: true, right: false, down: true, left: false, name: 'H8'}, {up: false, right: true, down: false, left: true, name: 'H9'}, {up: true, right: false, down: false, left: true, name: 'H10'}, {up: false, right: true, down: true, left: false, name: 'H11'}, {up: true, right: false, down: false, left: true, name: 'H12'}, {up: true, right: false, down: true, left: false, name: 'H13'}, {up: true, right: true, down: false, left: false, name: 'H14'}],
              // Row I
              [{up: true, right: false, down: false, left: true, name: 'I1'}, {up: true, right: true, down: false, left: false, name: 'I2'}, {up: false, right: false, down: true, left: true, name: 'I3'}, {up: true, right: true, down: false, left: false, name: 'I4'}, {up: false, right: false, down: true, left: true, name: 'I5'}, {up: false, right: false, down: true, left: false, name: 'I6'}, {up: true, right: true, down: false, left: false, name: 'I7'}, {up: true, right: true, down: false, left: true, name: 'I8'}, {up: false, right: false, down: true, left: true, name: 'I9'}, {up: false, right: false, down: true, left: false, name: 'I10'}, {up: true, right: true, down: true, left: false, name: 'I11'}, {up: false, right: true, down: false, left: true, name: 'I12'}, {up: true, right: false, down: false, left: true, name: 'I13'}, {up: false, right: true, down: false, left: false, name: 'I14'}],
              // Row J
              [{up: false, right: true, down: false, left: true, name: 'J1'}, {up: false, right: false, down: true, left: true, name: 'J2'}, {up: true, right: true, down: false, left: false, name: 'J3'}, {up: false, right: false, down: true, left: true, name: 'J4'}, {up: true, right: false, down: true, left: false, name: 'J5'}, {up: true, right: true, down: false, left: false, name: 'J6'}, {up: false, right: false, down: true, left: true, name: 'J7'}, {up: false, right: false, down: true, left: false, name: 'J8'}, {up: true, right: false, down: true, left: false, name: 'J9'}, {up: true, right: true, down: false, left: false, name: 'J10'}, {up: true, right: false, down: false, left: true, name: 'J11'}, {up: false, right: true, down: true, left: false, name: 'J12'}, {up: false, right: true, down: false, left: true, name: 'J13'}, {up: false, right: true, down: false, left: true, name: 'J14'}],
              // Row K
              [{up: false, right: false, down: true, left: true, name: 'K1'}, {up: true, right: true, down: false, left: false, name: 'K2'}, {up: false, right: true, down: false, left: true, name: 'K3'}, {up: true, right: false, down: false, left: true, name: 'K4'}, {up: true, right: false, down: false, left: false, name: 'K5'}, {up: false, right: true, down: false, left: false, name: 'K6'}, {up: true, right: false, down: false, left: true, name: 'K7'}, {up: true, right: true, down: false, left: false, name: 'K8'}, {up: true, right: false, down: false, left: true, name: 'K9'}, {up: false, right: true, down: true, left: false, name: 'K10'}, {up: false, right: true, down: false, left: true, name: 'K11'}, {up: true, right: true, down: false, left: true, name: 'K12'}, {up: false, right: true, down: false, left: true, name: 'K13'}, {up: false, right: true, down: false, left: true, name: 'K14'}],
              // Row L
              [{up: true, right: false, down: false, left: true, name: 'L1'}, {up: false, right: true, down: true, left: false, name: 'L2'}, {up: false, right: false, down: true, left: true, name: 'L3'}, {up: false, right: true, down: true, left: false, name: 'L4'}, {up: false, right: true, down: true, left: true, name: 'L5'}, {up: true, right: false, down: false, left: true, name: 'L6'}, {up: false, right: true, down: true, left: false, name: 'L7'}, {up: false, right: true, down: false, left: true, name: 'L8'}, {up: false, right: true, down: false, left: true, name: 'L9'}, {up: true, right: false, down: false, left: true, name: 'L10'}, {up: false, right: true, down: true, left: false, name: 'L11'}, {up: false, right: true, down: false, left: true, name: 'L12'}, {up: false, right: true, down: false, left: true, name: 'L13'}, {up: false, right: true, down: false, left: true, name: 'L14'}],
              // Row M
              [{up: false, right: false, down: false, left: true, name: 'M1'}, {up: true, right: true, down: false, left: false, name: 'M2'}, {up: true, right: false, down: false, left: true, name: 'M3'}, {up: true, right: false, down: true, left: false, name: 'M4'}, {up: true, right: true, down: false, left: false, name: 'M5'}, {up: false, right: true, down: false, left: true, name: 'M6'}, {up: true, right: true, down: false, left: true, name: 'M7'}, {up: false, right: true, down: false, left: true, name: 'M8'}, {up: false, right: true, down: true, left: true, name: 'M9'}, {up: false, right: true, down: false, left: true, name: 'M10'}, {up: true, right: false, down: true, left: true, name: 'M11'}, {up: false, right: true, down: false, left: false, name: 'M12'}, {up: false, right: true, down: false, left: true, name: 'M13'}, {up: false, right: true, down: true, left: true, name: 'M14'}],
              // Row N
              [{up: false, right: true, down: true, left: true, name: 'N1'}, {up: false, right: false, down: true, left: true, name: 'N2'}, {up: false, right: false, down: true, left: false, name: 'N3'}, {up: true, right: true, down: true, left: false, name: 'N4'}, {up: false, right: false, down: true, left: true, name: 'N5'}, {up: false, right: false, down: true, left: false, name: 'N6'}, {up: false, right: true, down: true, left: false, name: 'N7'}, {up: false, right: false, down: true, left: true, name: 'N8'}, {up: true, right: false, down: true, left: false, name: 'N9'}, {up: false, right: false, down: true, left: false, name: 'N10'}, {up: true, right: false, down: true, left: false, name: 'N11'}, {up: false, right: true, down: true, left: false, name: 'N12'}, {up: false, right: false, down: true, left: true, name: 'N13'}, {up: true, right: true, down: true, left: false, name: 'N14'}]
            ];

var maze3 = [ // Row A
              [{up: true, right: false, down: false, left: true, name: 'A1'}, {up: true, right: false, down: true, left: false, name: 'A2'}, {up: true, right: false, down: true, left: false, name: 'A3'}, {up: true, right: false, down: true, left: false, name: 'A4'}, {up: true, right: false, down: true, left: false, name: 'A5'}, {up: true, right: true, down: false, left: false, name: 'A6'}, {up: true, right: false, down: true, left: true, name: 'A7'}, {up: true, right: false, down: true, left: false, name: 'A8'}, {up: true, right: false, down: false, left: false, name: 'A9'}, {up: true, right: false, down: false, left: false, name: 'A10'}, {up: true, right: true, down: true, left: false, name: 'A11'}, {up: true, right: false, down: false, left: true, name: 'A12'}, {up: true, right: false, down: true, left: false, name: 'A13'}, {up: true, right: true, down: false, left: false, name: 'A14'}],
              // Row B
              [{up: false, right: true, down: false, left: true, name: 'B1'}, {up: true, right: false, down: false, left: true, name: 'B2'}, {up: true, right: false, down: true, left: false, name: 'B3'}, {up: true, right: true, down: false, left: false, name: 'B4'}, {up: true, right: true, down: false, left: true, name: 'B5'}, {up: false, right: true, down: false, left: true, name: 'B6'}, {up: true, right: false, down: false, left: true, name: 'B7'}, {up: true, right: false, down: true, left: false, name: 'B8'}, {up: false, right: true, down: true, left: false, name: 'B9'}, {up: false, right: false, down: true, left: true, name: 'B10'}, {up: true, right: true, down: false, left: false, name: 'B11'}, {up: false, right: true, down: false, left: true, name: 'B12'}, {up: true, right: false, down: false, left: true, name: 'B13'}, {up: false, right: true, down: true, left: false, name: 'B14'}],
              // Row C
              [{up: false, right: true, down: true, left: true, name: 'C1'}, {up: false, right: true, down: false, left: true, name: 'C2'}, {up: true, right: true, down: false, left: true, name: 'C3'}, {up: false, right: false, down: true, left: true, name: 'C4'}, {up: false, right: true, down: false, left: false, name: 'C5'}, {up: false, right: false, down: false, left: true, name: 'C6'}, {up: false, right: true, down: true, left: false, name: 'C7'}, {up: true, right: true, down: false, left: true, name: 'C8'}, {up: true, right: false, down: false, left: true, name: 'C9'}, {up: true, right: true, down: false, left: false, name: 'C10'}, {up: false, right: true, down: false, left: true, name: 'C11'}, {up: false, right: true, down: true, left: true, name: 'C12'}, {up: false, right: false, down: true, left: true, name: 'C13'}, {up: true, right: true, down: false, left: false, name: 'C14'}],
              // Row D
              [{up: true, right: false, down: false, left: true, name: 'D1'}, {up: false, right: true, down: false, left: false, name: 'D2'}, {up: false, right: true, down: false, left: true, name: 'D3'}, {up: true, right: false, down: false, left: true, name: 'D4'}, {up: false, right: true, down: false, left: false, name: 'D5'}, {up: false, right: true, down: false, left: true, name: 'D6'}, {up: true, right: true, down: false, left: true, name: 'D7'}, {up: false, right: false, down: false, left: true, name: 'D8'}, {up: false, right: true, down: true, left: false, name: 'D9'}, {up: false, right: false, down: true, left: true, name: 'D10'}, {up: false, right: false, down: false, left: false, name: 'D11'}, {up: true, right: true, down: false, left: false, name: 'D12'}, {up: true, right: false, down: false, left: true, name: 'D13'}, {up: false, right: true, down: false, left: false, name: 'D14'}],
              // Row E
              [{up: false, right: true, down: false, left: true, name: 'E1'}, {up: false, right: true, down: true, left: true, name: 'E2'}, {up: false, right: true, down: false, left: true, name: 'E3'}, {up: false, right: true, down: false, left: true, name: 'E4'}, {up: false, right: true, down: false, left: true, name: 'E5'}, {up: false, right: false, down: false, left: true, name: 'E6'}, {up: false, right: true, down: false, left: false, name: 'E7'}, {up: false, right: false, down: false, left: true, name: 'E8'}, {up: true, right: false, down: true, left: false, name: 'E9'}, {up: true, right: true, down: false, left: false, name: 'E10'}, {up: false, right: true, down: false, left: true, name: 'E11'}, {up: false, right: false, down: true, left: true, name: 'E12'}, {up: false, right: true, down: true, left: false, name: 'E13'}, {up: false, right: true, down: false, left: true, name: 'E14'}],
              // Row F
              [{up: false, right: false, down: false, left: true, name: 'F1'}, {up: true, right: false, down: true, left: false, name: 'F2'}, {up: false, right: true, down: true, left: false, name: 'F3'}, {up: false, right: true, down: true, left: true, name: 'F4'}, {up: false, right: false, down: true, left: true, name: 'F5'}, {up: false, right: true, down: true, left: false, name: 'F6'}, {up: false, right: true, down: true, left: true, name: 'F7'}, {up: false, right: true, down: false, left: true, name: 'F8'}, {up: true, right: false, down: false, left: true, name: 'F9'}, {up: false, right: true, down: true, left: false, name: 'F10'}, {up: false, right: true, down: true, left: true, name: 'F11'}, {up: true, right: false, down: false, left: true, name: 'F12'}, {up: true, right: false, down: true, left: false, name: 'F13'}, {up: false, right: true, down: true, left: false, name: 'F14'}],
              // Row G
              [{up: false, right: false, down: false, left: true, name: 'G1'}, {up: true, right: true, down: false, left: false, name: 'G2'}, {up: true, right: false, down: false, left: true, name: 'G3'}, {up: true, right: false, down: true, left: false, name: 'G4'}, {up: true, right: false, down: true, left: false, name: 'G5'}, {up: true, right: false, down: true, left: false, name: 'G6'}, {up: true, right: false, down: true, left: false, name: 'G7'}, {up: false, right: true, down: true, left: false, name: 'G8'}, {up: false, right: true, down: false, left: true, name: 'G9'}, {up: true, right: false, down: false, left: true, name: 'G10'}, {up: true, right: true, down: false, left: false, name: 'G11'}, {up: false, right: true, down: false, left: true, name: 'G12'}, {up: true, right: false, down: false, left: true, name: 'G13'}, {up: true, right: true, down: false, left: false, name: 'G14'}],
              // Row H
              [{up: false, right: true, down: true, left: true, name: 'H1'}, {up: false, right: true, down: false, left: true, name: 'H2'}, {up: false, right: true, down: false, left: true, name: 'H3'}, {up: true, right: false, down: false, left: true, name: 'H4'}, {up: true, right: false, down: true, left: false, name: 'H5'}, {up: true, right: false, down: true, left: false, name: 'H6'}, {up: true, right: true, down: true, left: false, name: 'H7'}, {up: true, right: false, down: false, left: true, name: 'H8'}, {up: false, right: true, down: true, left: false, name: 'H9'}, {up: false, right: true, down: true, left: true, name: 'H10'}, {up: false, right: true, down: false, left: true, name: 'H11'}, {up: false, right: true, down: false, left: true, name: 'H12'}, {up: false, right: true, down: false, left: true, name: 'H13'}, {up: false, right: true, down: false, left: true, name: 'H14'}],
              // Row I
              [{up: true, right: false, down: false, left: true, name: 'I1'}, {up: false, right: true, down: false, left: false, name: 'I2'}, {up: false, right: false, down: true, left: true, name: 'I3'}, {up: false, right: true, down: true, left: false, name: 'I4'}, {up: true, right: false, down: false, left: true, name: 'I5'}, {up: true, right: false, down: true, left: false, name: 'I6'}, {up: true, right: false, down: true, left: false, name: 'I7'}, {up: false, right: true, down: true, left: false, name: 'I8'}, {up: true, right: false, down: false, left: true, name: 'I9'}, {up: true, right: false, down: true, left: false, name: 'I10'}, {up: false, right: false, down: false, left: false, name: 'I11'}, {up: false, right: true, down: false, left: false, name: 'I12'}, {up: false, right: true, down: false, left: true, name: 'I13'}, {up: false, right: true, down: false, left: true, name: 'I14'}],
              // Row J
              [{up: false, right: true, down: false, left: true, name: 'J1'}, {up: false, right: false, down: true, left: true, name: 'J2'}, {up: true, right: true, down: true, left: false, name: 'J3'}, {up: true, right: false, down: false, left: true, name: 'J4'}, {up: false, right: true, down: true, left: false, name: 'J5'}, {up: true, right: true, down: false, left: true, name: 'J6'}, {up: true, right: false, down: false, left: true, name: 'J7'}, {up: true, right: false, down: true, left: false, name: 'J8'}, {up: true, right: true, down: false, left: false, name: 'J9'}, {up: true, right: true, down: false, left: false, name: 'J10'}, {up: false, right: true, down: false, left: true, name: 'J11'}, {up: false, right: true, down: true, left: true, name: 'J12'}, {up: false, right: true, down: false, left: true, name: 'J13'}, {up: false, right: true, down: false, left: true, name: 'J14'}],
              // Row K
              [{up: false, right: true, down: false, left: true, name: 'K1'}, {up: true, right: false, down: false, left: true, name: 'K2'}, {up: true, right: false, down: true, left: false, name: 'K3'}, {up: false, right: true, down: false, left: false, name: 'K4'}, {up: true, right: false, down: true, left: true, name: 'K5'}, {up: false, right: false, down: true, left: false, name: 'K6'}, {up: false, right: true, down: true, left: false, name: 'K7'}, {up: true, right: false, down: false, left: true, name: 'K8'}, {up: true, right: true, down: false, left: false, name: 'K9'}, {up: false, right: true, down: true, left: true, name: 'K10'}, {up: false, right: false, down: false, left: true, name: 'K11'}, {up: true, right: false, down: true, left: false, name: 'K12'}, {up: false, right: true, down: true, left: false, name: 'K13'}, {up: false, right: true, down: false, left: true, name: 'K14'}],
              // Row L
              [{up: false, right: true, down: false, left: true, name: 'L1'}, {up: false, right: false, down: true, left: true, name: 'L2'}, {up: true, right: true, down: false, left: false, name: 'L3'}, {up: false, right: true, down: false, left: true, name: 'L4'}, {up: true, right: false, down: false, left: true, name: 'L5'}, {up: true, right: false, down: true, left: false, name: 'L6'}, {up: true, right: true, down: false, left: false, name: 'L7'}, {up: false, right: true, down: false, left: true, name: 'L8'}, {up: false, right: false, down: true, left: true, name: 'L9'}, {up: true, right: false, down: true, left: false, name: 'L10'}, {up: false, right: true, down: true, left: false, name: 'L11'}, {up: true, right: false, down: true, left: true, name: 'L12'}, {up: true, right: false, down: true, left: false, name: 'L13'}, {up: false, right: true, down: true, left: false, name: 'L14'}],
              // Row M
              [{up: false, right: true, down: false, left: true, name: 'M1'}, {up: true, right: true, down: false, left: true, name: 'M2'}, {up: false, right: true, down: false, left: true, name: 'M3'}, {up: false, right: false, down: true, left: true, name: 'M4'}, {up: false, right: true, down: true, left: false, name: 'M5'}, {up: true, right: false, down: false, left: true, name: 'M6'}, {up: false, right: true, down: true, left: false, name: 'M7'}, {up: false, right: false, down: true, left: true, name: 'M8'}, {up: true, right: true, down: false, left: false, name: 'M9'}, {up: true, right: false, down: false, left: true, name: 'M10'}, {up: true, right: false, down: false, left: false, name: 'M11'}, {up: true, right: false, down: true, left: false, name: 'M12'}, {up: true, right: true, down: true, left: false, name: 'M13'}, {up: true, right: true, down: false, left: true, name: 'M14'}],
              // Row N
              [{up: false, right: false, down: true, left: true, name: 'N1'}, {up: false, right: true, down: true, left: false, name: 'N2'}, {up: false, right: false, down: true, left: true, name: 'N3'}, {up: true, right: false, down: true, left: false, name: 'N4'}, {up: true, right: true, down: true, left: false, name: 'N5'}, {up: false, right: false, down: true, left: true, name: 'N6'}, {up: true, right: false, down: true, left: false, name: 'N7'}, {up: true, right: true, down: true, left: false, name: 'N8'}, {up: false, right: false, down: true, left: true, name: 'N9'}, {up: false, right: true, down: true, left: false, name: 'N10'}, {up: false, right: false, down: true, left: true, name: 'N11'}, {up: true, right: false, down: true, left: false, name: 'N12'}, {up: true, right: false, down: true, left: false, name: 'N13'}, {up: false, right: true, down: true, left: false, name: 'N14'}]
            ];







//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
socket.on('init', function(data) {
  console.log("test: ", data);
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

socket.on('replicate', function(data) {
  console.log("data: ", data);
  $('#mouse').offset({ top: data[1], left: data[0] });
  $('#mouse').attr('src', data[2]);
  coordx = data[3];
  coordy = data[4];
  // Check win
  if (coordx === 13 && coordy === 12) {
    setTimeout(function() {
      socket.emit('winEvent');
    }, 500);
  }
});



angularApp.controller("MainController", function($scope) {
  $scope.isCounting = true;
  $scope.ready = true;
  $scope.delay = false;
  $scope.timeup = false;

  socket.on('newGame', function(data) {
    $scope.resetShow = false;
    $scope.victory = false;
    $scope.ready = true;
    if (data === 1) {
      maze = maze1;
    }
    else if (data === 2) {
      maze = maze2;
    }
    else if (data === 3) {
      maze = maze3;
    }
    function drawIt() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      window.location.reload();
      $scope.apply();
    }
    drawIt();
   //  maze = data;
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
    if ($scope.isCounting === true && $scope.delay === false) {
      if ($event.keyCode == 38 || $event.keyCode == 87) {
        // socket.emit('moveUp', [coordx, coordy]);
          // if (maze[coordy][coordx].up === false) {
            socket.emit('keypress', ['top', 'up', $('#mouse').offset(), -1, 0]);
            shock.play();
            $scope.delay = true;
            setTimeout(function() {
              $scope.delay = false;
            }, 1000);
          // }
          // else {
          //   // blocked
          // }

        }
     else if ($event.keyCode == 39 || $event.keyCode == 68 && $scope.delay === false) {
          $event.preventDefault();
          // socket.emit('moveRight', [coordx, coordy]);
          // if (maze[coordy][coordx].right === false) {
            socket.emit('keypress', ['left', 'right', $('#mouse').offset(), 0, 1]);
            shock.play();
            $scope.delay = true;
            setTimeout(function() {
              $scope.delay = false;
            }, 1000);
          // }
          // else {
          //   // blocked
          // }
        }
      else if ($event.keyCode == 40 || $event.keyCode == 83 && $scope.delay === false) {
          $event.preventDefault();
          // socket.emit('moveDown', [coordx, coordy]);
          // if (maze[coordy][coordx].down === false) {
            socket.emit('keypress', ['top', 'down', $('#mouse').offset(), 1, 0]);
            shock.play();
            $scope.delay = true;
            setTimeout(function() {
              $scope.delay = false;
            }, 1000);
          // }
          // else {
          //   // blocked
          // }
        }
      else if ($event.keyCode == 37 || $event.keyCode == 65 && $scope.delay === false) {
          $event.preventDefault();
          // socket.emit('moveLeft', [coordx, coordy]);
          // if (maze[coordy][coordx].left === false) {
            socket.emit('keypress', ['left', 'left', $('#mouse').offset(), 0, -1]);
            shock.play();
            $scope.delay = true;
            setTimeout(function() {
              $scope.delay = false;
            }, 1000);
          // }
          // else {
          //   // blocked
          // }
        }
      }
   };
   socket.on('start', function() {
     $scope.ready = false;
     $scope.isCounting = true;
     $scope.$apply();
   });
   socket.on('timeUp', function() {
     $scope.timeup = true;
     $scope.isCounting = false;
     $scope.resetShow = true;
     setTimeout(function(){
       socket.emit('reset');
       $scope.timeup = false;
       $scope.isCounting = true;
       $scope.resetShow = false;
     }, 5000);
     $scope.$apply();
   });
   socket.on('win', function() {
     $scope.isCounting = false;
     $scope.victory = true;
     $scope.resetShow = true;
     setTimeout(function() {
       $scope.timeup = false;
       $scope.isCounting = true;
       $scope.resetShow = false;
       socket.emit('reset');
     }, 5000);
    //  var start = new Date().getTime();
    //  var runCountdown = setInterval(countdown, 1000);
    //  function countdown() {
    //    newTime = new Date().getTime();
    //    $scope.reloadCount = seconds;
    //    seconds--;
    //    console.log(seconds);
    //    $scope.$apply();
    //    if (newTime - start >= 5000) {
    //      $scope.timeup = false;
    //      $scope.isCounting = true;
    //      $scope.resetShow = false;
    //      socket.emit('reset');
    //      seconds = 5;
    //      $scope.$apply();
    //    }
    //  }
     $scope.$apply();
   });
   socket.on('currentTime', function(data) {
     $scope.minutes = data[0];
     $scope.seconds = data[1];
     $scope.$apply();
   });
 });
