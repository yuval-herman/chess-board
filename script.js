const BOARD_SIZE = 8;
const HIGHLIGHT_COLOR = 'highlight'
const VALID_MOVES_COLOR = 'valid-move'
const cellPainter = {
    paintedCells: [],
    paintCells: (cellsPos, colorClass) => {
        if (!cellsPos) { return }
        cellsPos.forEach(p => {
            cellPainter.paintedCells.push(p)
            getCell(p[0], p[1]).classList.add(colorClass);
        });
    },
    cleanAllCells: () => {
        if (!cellPainter.paintedCells) { return }
        for (const p of cellPainter.paintedCells) {
            getCell(p[0], p[1]).classList.remove(HIGHLIGHT_COLOR);
            getCell(p[0], p[1]).classList.remove(VALID_MOVES_COLOR);
        }
        cellPainter.paintedCells = [];
    }
}

function arrIsEqual(arr1, arr2) { //check if arrays are equal
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function isOutOfBounds(pos) {
    return pos[0] >= BOARD_SIZE || pos[1] >= BOARD_SIZE || pos[0] < 0 || pos[1] < 0;
}

function makeTable() {
    let table = document.createElement('table');

    table.className = "board"
    document.getElementsByTagName('body')[0].appendChild(table);

    for (let i = 0; i < BOARD_SIZE; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < BOARD_SIZE; j++) {
            let td = document.createElement('td');
            td.onclick = (e) => { cellClick(e, board) };
            row.appendChild(td);
        }

        table.appendChild(row);
    }

    return table;
}

function getCell(x, y) {
    return table.rows[x].cells[y];
}

function makePiece(path) {
    let img = document.createElement('img');
    img.src = path;
    img.className = "piece";
    return img;
}

function populateTable() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const element = board[i][j];
            if (element === undefined) {
                continue;
            }
            getCell(i, j).appendChild(makePiece(element.imgPath));
        }
    }
}

function cellClick(event) {
    cellPainter.cleanAllCells();
    let cell = event.currentTarget;
    let pos = [cell.parentNode.rowIndex, cell.cellIndex]
    cellPainter.paintCells([pos], HIGHLIGHT_COLOR)
    if (cell.childElementCount > 0) {
        cellPainter.paintCells(board[pos[0]][pos[1]].validMoves(pos), VALID_MOVES_COLOR);
    }
}

class chessPiece {
    constructor(pieceName, type, imgPath) { //type is boolean, dark is false white is true
        this.pieceName = pieceName;
        this.type = type;
        this.imgPath = imgPath;
    }

    validMoves(pos) { }; //gets position and board array and returns an array of location the piece can move to
}

class Rook extends chessPiece {
    //the rook can move in horizontal or vertical axes,
    //he can move as many spaces as possible before hitting a wall or another piece
    validMoves(pos) {
        let possMov = [];
        for (let i = 0; i < board.length; i++) {
            let m1 = [pos[0], i]; //first all of the current row
            if (!arrIsEqual(m1, pos)) { //not current position
                possMov.push(m1);
            }
            let m2 = [i, pos[1]]; //first all of the current row
            if (!arrIsEqual(m2, pos)) { //not current position
                possMov.push(m2);
            }
        }
        return possMov;
    }
}
class Knight extends chessPiece {
    //the knight can move two spaces in one axis and another in the other axis
    //knight always have a max of 8 moves, this can be hard coded
    validMoves(pos) {
        let possMov = [];
        possMov.push([pos[0] + 2, pos[1] + 1]);
        possMov.push([pos[0] - 2, pos[1] + 1]);
        possMov.push([pos[0] + 2, pos[1] - 1]);
        possMov.push([pos[0] - 2, pos[1] - 1]);
        possMov.push([pos[0] + 1, pos[1] + 2]);
        possMov.push([pos[0] - 1, pos[1] + 2]);
        possMov.push([pos[0] + 1, pos[1] - 2]);
        possMov.push([pos[0] - 1, pos[1] - 2]);
        for (let i = 0; i < possMov.length; i++) {
            if (isOutOfBounds(possMov[i])) {
                delete possMov[i];
            }
        }
        return possMov;
    }
}
class Bishop extends chessPiece {
    //the bishops movement is similar to the rook but rotated 45 degress.
    //this can be utilized.
    validMoves(pos) {
        let possMov = [];
        for (let i = 0; i < board.length; i++) {
            possMov.push([pos[0]+i, pos[1]+i]);
            possMov.push([pos[0]-i, pos[1]-i]);
            possMov.push([pos[0]-i, pos[1]+i]);
            possMov.push([pos[0]+i, pos[1]-i]);
        }
        for (let i = 0; i < possMov.length; i++) {
            if (isOutOfBounds(possMov[i]) || arrIsEqual(pos, possMov[i])) {
                delete possMov[i];
            }
        }
        return possMov;
    }
}
class Queen extends chessPiece { }
class King extends chessPiece { }
class Pawn extends chessPiece { }

const board = [
    [new Rook('rook', false, 'pieces/Chess_rdt45.svg'),
    new Knight('knight', false, 'pieces/Chess_ndt45.svg'),
    new Bishop('bishop', false, 'pieces/Chess_bdt45.svg'),
    new Queen('queen', false, 'pieces/Chess_qdt45.svg'),
    new King('king', false, 'pieces/Chess_kdt45.svg'),
    new Bishop('bishop', false, 'pieces/Chess_bdt45.svg'),
    new Knight('knight', false, 'pieces/Chess_ndt45.svg'),
    new Rook('rook', false, 'pieces/Chess_rdt45.svg')],
    [new Pawn('pawn', false, 'pieces/Chess_pdt45.svg'),
    new Pawn('pawn', false, 'pieces/Chess_pdt45.svg'),
    new Pawn('pawn', false, 'pieces/Chess_pdt45.svg'),
    new Pawn('pawn', false, 'pieces/Chess_pdt45.svg'),
    new Pawn('pawn', false, 'pieces/Chess_pdt45.svg'),
    new Pawn('pawn', false, 'pieces/Chess_pdt45.svg'),
    new Pawn('pawn', false, 'pieces/Chess_pdt45.svg'),
    new Pawn('pawn', false, 'pieces/Chess_pdt45.svg')],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [new Pawn('pawn', true, 'pieces/Chess_plt45.svg'),
    new Pawn('pawn', true, 'pieces/Chess_plt45.svg'),
    new Pawn('pawn', true, 'pieces/Chess_plt45.svg'),
    new Pawn('pawn', true, 'pieces/Chess_plt45.svg'),
    new Pawn('pawn', true, 'pieces/Chess_plt45.svg'),
    new Pawn('pawn', true, 'pieces/Chess_plt45.svg'),
    new Pawn('pawn', true, 'pieces/Chess_plt45.svg'),
    new Pawn('pawn', true, 'pieces/Chess_plt45.svg')],
    [new Rook('rook', true, 'pieces/Chess_rlt45.svg'),
    new Knight('knight', true, 'pieces/Chess_nlt45.svg'),
    new Bishop('bishop', true, 'pieces/Chess_blt45.svg'),
    new Queen('queen', true, 'pieces/Chess_qlt45.svg'),
    new King('king', true, 'pieces/Chess_klt45.svg'),
    new Bishop('bishop', true, 'pieces/Chess_blt45.svg'),
    new Knight('knight', true, 'pieces/Chess_nlt45.svg'),
    new Rook('rook', true, 'pieces/Chess_rlt45.svg')]];

let table = makeTable();

populateTable(board);