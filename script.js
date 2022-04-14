window.addEventListener('load', () => {
    let board = document.createElement('table');
    board.className = "board"
    document.getElementById("board").appendChild(board);
    for (let i = 0; i < 8; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 8; j++) {
            row.appendChild(document.createElement('td'))
        }
        board.appendChild(row)
    }
})