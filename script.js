const BOARD_SIZE = 8;
const HIGHLIGHT_COLOR = '#fdff6f'
var prevCell;
var prevColor;

function makeTable() {
    let board = document.createElement('table');

    board.className = "board"
    document.getElementsByTagName('body')[0].appendChild(board);

    for (let i = 0; i < BOARD_SIZE; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < BOARD_SIZE; j++) {
            let td = document.createElement('td');
            td.onclick = cellClick;
            row.appendChild(td);
        }

        board.appendChild(row);
    }

    return board;
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
        for (let j = 0; j < board.length; j++) {
            const element = board[i][j];
            if (element === undefined) {
                continue;
            }
            getCell(i,j).appendChild(makePiece(element.imgPath));
        }
    }
}

function cellClick(event) {
    let cell = event.currentTarget;
    if (prevCell !== undefined) {
        prevCell.style.background = prevColor;
    }
    prevCell = cell;
    prevColor = cell.style.background;
    cell.style.background = HIGHLIGHT_COLOR;

}

class chessPiece {
    constructor(pieceName, type, imgPath) { //type is boolean, dark is false white is true
        this.pieceName = pieceName;
        this.type = type;
        this.imgPath = imgPath;
    }
}

class Rook extends chessPiece { }
class Knight extends chessPiece { }
class Bishop extends chessPiece { }
class Queen extends chessPiece { }
class King extends chessPiece { }
class Pawn extends chessPiece { }

let table = makeTable();

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

populateTable(table, board);