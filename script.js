const BOARD_SIZE = 8;
const HIGHLIGHT_COLOR = "highlight";
const VALID_MOVES_COLOR = "valid-move";

class CellPainter {
  constructor() {
    this.paintedCells = [];
  }

  paintCells(cells, colorClass) {
    if (!cells) {
      return;
    }
    cells.forEach((cell) => {
      this.paintedCells.push(cell);
      cell.classList.add(colorClass);
    });
  }

  cleanAllCells() {
    if (!this.paintedCells) {
      return;
    }
    for (const cell of this.paintedCells) {
      cell.classList.remove(HIGHLIGHT_COLOR);
      cell.classList.remove(VALID_MOVES_COLOR);
    }
    this.paintedCells = [];
  }
}

class Board {
  constructor(boardArr, HTMLtable) {
    this.boardArr = boardArr;
    this.length = boardArr.length;
    this.painter = new CellPainter();
    this.makeTable();
  }

  getCell(x, y) {
    return this.HTMLtable.rows[x].cells[y];
  }

  makePieceElement(imgPath) {
    let img = document.createElement("img");
    img.src = imgPath;
    img.className = "piece";
    return img;
  }

  makeTable() {
    this.HTMLtable = document.createElement("table");

    this.HTMLtable.className = "board";
    document.getElementsByTagName("body")[0].appendChild(this.HTMLtable);

    for (let i = 0; i < BOARD_SIZE; i++) {
      let row = document.createElement("tr");

      for (let j = 0; j < BOARD_SIZE; j++) {
        let td = document.createElement("td");
        td.onclick = (e) => {
          this.cellClick(e, board);
        };
        row.appendChild(td);
      }

      this.HTMLtable.appendChild(row);
    }
  }

  populateTable() {
    for (let i = 0; i < this.boardArr.length; i++) {
      for (let j = 0; j < this.boardArr[i].length; j++) {
        const element = this.boardArr[i][j];
        if (element === undefined) {
          continue;
        }
        this.getCell(i, j).appendChild(this.makePieceElement(element.imgPath));
      }
    }
  }

  cellClick(event) {
    this.painter.cleanAllCells();
    let cell = event.currentTarget;
    let pos = [cell.parentNode.rowIndex, cell.cellIndex];
    this.painter.paintCells([this.getCell(pos[0], pos[1])], HIGHLIGHT_COLOR);
    if (cell.childElementCount > 0) {
      this.painter.paintCells(
        this.positionsToCells(this.boardArr[pos[0]][pos[1]].validMoves(pos)),
        VALID_MOVES_COLOR
      );
    }
  }

  positionsToCells(positions) {
    let cells = [];
    positions.forEach((pos) => {
      cells.push(this.getCell(pos[0], pos[1]));
    });
    return cells;
  }
}

class chessPiece {
  constructor(pieceName, type, imgPath) {
    //type is boolean, dark is false white is true
    this.pieceName = pieceName;
    this.type = type;
    this.imgPath = imgPath;
  }

  validMoves(pos) {} //gets position and board array and returns an array of location the piece can move to

  filterMoves(moves, pos) {
    //filter impossible moves, and moves on current location
    for (let i = 0; i < moves.length; i++) {
      if (isOutOfBounds(moves[i]) || arrIsEqual(pos, moves[i])) {
        delete moves[i];
      }
    }
    return moves;
  }
}

class Rook extends chessPiece {
  //the rook can move in horizontal or vertical axes,
  //he can move as many spaces as possible before hitting a wall or another piece
  validMoves(pos) {
    let possMov = [];
    for (let i = 0; i < board.length; i++) {
      possMov.push([pos[0], i]);
      possMov.push([i, pos[1]]);
    }
    return this.filterMoves(possMov, pos);
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
    return this.filterMoves(possMov, pos);
  }
}
class Bishop extends chessPiece {
  //the bishop's movement is similar to the rook but rotated 45 degress.
  validMoves(pos) {
    let possMov = [];
    for (let i = 0; i < board.length; i++) {
      possMov.push([pos[0] + i, pos[1] + i]);
      possMov.push([pos[0] - i, pos[1] - i]);
      possMov.push([pos[0] - i, pos[1] + i]);
      possMov.push([pos[0] + i, pos[1] - i]);
    }
    return this.filterMoves(possMov, pos);
  }
}
class Queen extends chessPiece {
  //the Queen's movement is a combination of the rook and the bishop
  //this can be utilized.
  validMoves(pos) {
    let possMov = [];
    for (let i = 0; i < board.length; i++) {
      possMov.push([pos[0] + i, pos[1] + i]);
      possMov.push([pos[0] - i, pos[1] - i]);
      possMov.push([pos[0] - i, pos[1] + i]);
      possMov.push([pos[0] + i, pos[1] - i]);
      possMov.push([pos[0], i]);
      possMov.push([i, pos[1]]);
    }
    return this.filterMoves(possMov, pos);
  }
}
class King extends chessPiece {
  //king movement is only more complicated then the pawn. basically, really simple
  validMoves(pos) {
    let possMov = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        possMov.push([pos[0] + i, pos[1] + j]);
      }
    }
    return this.filterMoves(possMov, pos);
  }
}

class Pawn extends chessPiece {
  //pawn is simple. there is one caveat, however,
  //in contrast to every other piece in the game, the pawn can only move foreward. still, easy.
  validMoves(pos) {
    let possMov = [];
    if (this.type) {
      possMov.push([pos[0] - 1, pos[1]]);
    } else {
      possMov.push([pos[0] + 1, pos[1]]);
    }
    return this.filterMoves(possMov, pos);
  }
}

function arrIsEqual(arr1, arr2) {
  //check if arrays are equal
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
  return (
    pos[0] >= BOARD_SIZE || pos[1] >= BOARD_SIZE || pos[0] < 0 || pos[1] < 0
  );
}

function makeBoardArray() {
  let arr = [
    [
      new Rook("rook", false, "pieces/Chess_rdt45.svg"),
      new Knight("knight", false, "pieces/Chess_ndt45.svg"),
      new Bishop("bishop", false, "pieces/Chess_bdt45.svg"),
      new Queen("queen", false, "pieces/Chess_qdt45.svg"),
      new King("king", false, "pieces/Chess_kdt45.svg"),
      new Bishop("bishop", false, "pieces/Chess_bdt45.svg"),
      new Knight("knight", false, "pieces/Chess_ndt45.svg"),
      new Rook("rook", false, "pieces/Chess_rdt45.svg"),
    ],
    [],
  ];

  for (let i = 0; i < BOARD_SIZE; i++) {
    arr[1].push(new Pawn("pawn", false, "pieces/Chess_pdt45.svg"));
  }

  for (let i = 0; i < 4; i++) {
    arr.push([]);
    for (let j = 0; j < BOARD_SIZE; j++) {
      arr[i].push(undefined);
    }
  }

  arr.push([]);

  for (let i = 0; i < BOARD_SIZE; i++) {
    arr[6].push(new Pawn("pawn", true, "pieces/Chess_plt45.svg"));
  }
  arr.push([
    new Rook("rook", true, "pieces/Chess_rlt45.svg"),
    new Knight("knight", true, "pieces/Chess_nlt45.svg"),
    new Bishop("bishop", true, "pieces/Chess_blt45.svg"),
    new Queen("queen", true, "pieces/Chess_qlt45.svg"),
    new King("king", true, "pieces/Chess_klt45.svg"),
    new Bishop("bishop", true, "pieces/Chess_blt45.svg"),
    new Knight("knight", true, "pieces/Chess_nlt45.svg"),
    new Rook("rook", true, "pieces/Chess_rlt45.svg"),
  ]);
  return arr;
}

const board = new Board(makeBoardArray());

const cellPainter = new CellPainter();
board.populateTable();
