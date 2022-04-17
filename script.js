const BOARD_SIZE = 8;
const HIGHLIGHT_COLOR = '#fdff6f'
var prevCell;
var prevColor;

function makeBoard() {
    let board = document.createElement('table');

    board.className = "board"
    document.getElementsByTagName('body')[0].appendChild(board);

    for (let i = 0; i < BOARD_SIZE; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < BOARD_SIZE; j++) {
            let td = document.createElement('td');
            td.onclick = (td) => { cellClick(td) };
            row.appendChild(td);
        }

        board.appendChild(row);
    }

    return board;
}

function populateBoard(board) {
    getCell = (x, y) => {
        return board.rows[x].cells[y];
    }

    makePiece = (name) => {
        let img = document.createElement('img');
        img.src = "pieces/" + name + ".svg";
        img.className = "piece";
        return img;
    }

    getCell(0, 0).appendChild(makePiece('Chess_rdt45'));
    getCell(0, 1).appendChild(makePiece('Chess_ndt45'));
    getCell(0, 2).appendChild(makePiece('Chess_bdt45'));
    getCell(0, 3).appendChild(makePiece('Chess_qdt45'));
    getCell(0, 4).appendChild(makePiece('Chess_kdt45'));
    getCell(0, 5).appendChild(makePiece('Chess_bdt45'));
    getCell(0, 6).appendChild(makePiece('Chess_ndt45'));
    getCell(0, 7).appendChild(makePiece('Chess_rdt45'));

    for (let i = 0; i < BOARD_SIZE; i++) {
        getCell(1, i).appendChild(makePiece('Chess_pdt45'));
    }

    for (let i = 0; i < BOARD_SIZE; i++) {
        getCell(6, i).appendChild(makePiece('Chess_plt45'));
    }

    getCell(7, 0).appendChild(makePiece('Chess_rlt45'));
    getCell(7, 1).appendChild(makePiece('Chess_nlt45'));
    getCell(7, 2).appendChild(makePiece('Chess_blt45'));
    getCell(7, 3).appendChild(makePiece('Chess_qlt45'));
    getCell(7, 4).appendChild(makePiece('Chess_klt45'));
    getCell(7, 5).appendChild(makePiece('Chess_blt45'));
    getCell(7, 6).appendChild(makePiece('Chess_nlt45'));
    getCell(7, 7).appendChild(makePiece('Chess_rlt45'));
}

function cellClick(event) {
    let cell = event.target;
    if (cell.tagName !== 'TD') {
        cell = cell.parentElement
    }
    if (prevCell !== undefined) {
        prevCell.style.background = prevColor;
    }
    prevCell = cell;
    prevColor = cell.style.background;
    cell.style.background = HIGHLIGHT_COLOR;

}

let board = makeBoard();
populateBoard(board);

