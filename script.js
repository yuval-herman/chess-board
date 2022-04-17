const BOARD_SIZE = 8;

function makeBoard() {
    let board = document.createElement('table');

    board.className = "board"
    document.getElementsByTagName('body')[0].appendChild(board);

    for (let i = 0; i < BOARD_SIZE; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < BOARD_SIZE; j++) {
            row.appendChild(document.createElement('td'));
        }

        board.appendChild(row);
    }
}

makeBoard()