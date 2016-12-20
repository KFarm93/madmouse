coordy = 0;
coordx = 1;
var maze1 = [ // Row A
              [{up: true, right: false, down: false, left: true, name: 'A1'}, {up: true, right: true, down: true, left: false, name: 'A2'}, {up: true, right: false, down: false, left: true, name: 'A3'}, {up: true, right: true, down: false, left: false, name: 'A4'}, {up: true, right: false, down: false, left: true, name: 'A5'}, {up: true, right: false, down: true, left: false, name: 'A6'}, {up: true, right: false, down: true, left: false, name: 'A7'}, {up: true, right: false, down: true, left: false, name: 'A8'}, {up: true, right: true, down: false, left: false, name: 'A9'}, {up: true, right: false, down: false, left: true, name: 'A10'}, {up: true, right: false, down: true, left: false, name: 'A11'}, {up: true, right: false, down: true, left: false, name: 'A12'}, {up: true, right: false, down: true, left: false, name: 'A13'}, {up: true, right: false, down: true, left: false, name: 'A14'}],
              // Row B
              [{up: false, right: false, down: false, left: true, name: 'B1'}, {up: true, right: false, down: false, left: false, name: 'B2'}, {up: false, right: true, down: true, left: false, name: 'B3'}, {up: false, right: true, down: false, left: true, name: 'B4'}, {up: false, right: false, down: true, left: true, name: 'B5'}, {up: true, right: true, down: false, left: false, name: 'B6'}, {up: true, right: false, down: false, left: true, name: 'B7'}, {up: true, right: true, down: false, left: false, name: 'B8'}, {up: false, right: true, down: false, left: true, name: 'B9'}, {up: false, right: false, down: true, left: true, name: 'B10'}, {up: true, right: false, down: true, left: false, name: 'B11'}, {up: true, right: true, down: false, left: false, name: 'B12'}, {up: true, right: false, down: false, left: true, name: 'B13'}, {up: true, right: true, down: false, left: false, name: 'B14'}],
              // Row C
              [{up: false, right: true, down: false, left: true, name: 'C1'}, {up: false, right: false, down: true, left: true, name: 'C2'}, {up: true, right: true, down: false, left: false, name: 'C3'}, {up: false, right: false, down: true, left: true, name: 'C4'}, {up: true, right: false, down: true, left: false, name: 'C5'}, {up: false, right: false, down: true, left: false, name: 'C6'}, {up: false, right: true, down: true, left: false, name: 'C7'}, {up: false, right: true, down: true, left: true, name: 'C8'}, {up: false, right: false, down: true, left: true, name: 'C9'}, {up: true, right: false, down: false, left: false, name: 'C10'}, {up: true, right: true, down: true, left: false, name: 'C11'}, {up: false, right: false, down: true, left: true, name: 'C12'}, {up: false, right: true, down: false, left: false, name: 'C13'}, {up: false, right: true, down: false, left: true, name: 'C14'}],
              // Row D
              [{up: false, right: true, down: false, left: true, name: 'D1'}, {up: true, right: false, down: false, left: true, name: 'D2'}, {up: false, right: true, down: false, left: false, name: 'D3'}, {up: true, right: false, down: true, left: true, name: 'D4'}, {up: true, right: false, down: true, left: false, name: 'D5'}, {up: true, right: false, down: true, left: false, name: 'D6'}, {up: true, right: false, down: true, left: false, name: 'D7'}, {up: true, right: false, down: true, left: false, name: 'D8'}, {up: true, right: true, down: false, left: false, name: 'D9'}, {up: false, right: true, down: false, left: true, name: 'D10'}, {up: true, right: false, down: false, left: true, name: 'D11'}, {up: true, right: false, down: true, left: false, name: 'D12'}, {up: false, right: true, down: true, left: false, name: 'D13'}, {up: false, right: true, down: false, left: true, name: 'D14'}],
              // Row E
              [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
              // Row F
              [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
              // Row G
              [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
              // Row H
              [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
              // Row I
              [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
              // Row J
              [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
              // Row K
              [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
              // Row L
              [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
              // Row M
              [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
              // Row N
              [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
            ];
coordy++;
coordx--;
console.log(maze1[2][0].right);
console.log(coordy);
console.log(coordx);
