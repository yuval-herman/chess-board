const BOARD_SIZE = 8;
const HIGHLIGHT_COLOR = '#fdff6f'
const VALID_MOVES_COLOR = '#74d77a'
var prevCell;
var prevColor;

function makeTable(board) {
    let table = document.createElement('table');

    table.className = "board"
    document.getElementsByTagName('body')[0].appendChild(table);

    for (let i = 0; i < BOARD_SIZE; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < BOARD_SIZE; j++) {
            let td = document.createElement('td');
            td.onclick = (e) => {cellClick(e, board)};
            row.appendChild(td);
        }

        table.appendChild(row);
    }

    return table;
}

function populateTable(table, board) {
    getCell = (x, y) => {
        return table.rows[x].cells[y];
    }

    makePiece = (path) => {
        let img = document.createElement('img');
        img.src = path;
        img.className = "piece";
        return img;
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const element = board[i][j];
            if (element === undefined) {
                continue;
            }
            getCell(i,j).appendChild(makePiece(element.imgPath));
        }
    }
}

function cellClick(event, board) {
    let cell = event.currentTarget;
    if (prevCell !== undefined) {
        prevCell.style.background = prevColor;
    }
    prevCell = cell;
    prevColor = cell.style.background;
    cell.style.background = HIGHLIGHT_COLOR;
    if (cell.childElementCount > 0 ) {
        let pos = [cell.parentNode.rowIndex, cell.cellIndex]
        paintMoves(board, board[pos[0]][pos[1]].validMoves(pos, board));
    }
}

function paintMoves(board, movArr) {
    movArr.forEach(p => {
        getCell(p[0], p[1]).style.background = VALID_MOVES_COLOR;
    });
}

class chessPiece {
    constructor(pieceName, type, imgPath) { //type is boolean, dark is false white is true
        this.pieceName = pieceName;
        this.type = type;
        this.imgPath = imgPath;
    }

    validMoves(pos, board){}; //gets position and board array and returns an array of location the piece can move to
}

class Rook extends chessPiece {
    //the rook can move in horizontal or vertical axes,
    //he can move as many spaces as possible before hitting a wall or another piece
    validMoves(pos, board) {
        let possMov = [];
        for (let i = 0; i < board.length; i++) {
            let m1 = [pos[0], i]; //first all of the current row
            if (m1[0] !== pos[0] || m1[1] !== pos[1]) { //not current position
                possMov.push(m1);
            }
            let m2 = [i, pos[1]]; //first all of the current row
            if (m2[0] !== pos[0] || m2[1] !== pos[1]) { //not current position
                possMov.push(m2);
            }
        }
        return possMov;
    }
}
class Knight extends chessPiece { }
class Bishop extends chessPiece { }
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

let table = makeTable(board);

populateTable(table, board);