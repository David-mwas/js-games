let board;
let playero = "O";
let playerX = "X";
let currentPlayer = playero;
let GAMEOVER = false;
let win = document.getElementById("win");
window.addEventListener("load", () => {
  setGame();
});
let tile;
const setGame = () => {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      // <div></div>
      tile = document.createElement("div");
      tile.id = `${r.toString()}-${c.toString()}`;
      tile.classList.add("tile");
      if (r == 0 || r == 1) {
        tile.classList.add("horizontal-line");
      }
      if (c == 0 || c == 1) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", setTile);
      document.getElementById("board").append(tile);
    }
  }
};

function setTile() {
  if (GAMEOVER) {
    return;
  }
  let coordinates = this.id.split("-"); // 1-1->['1','1']
  let r = parseInt(coordinates[0]);
  let c = parseInt(coordinates[1]);
  if (board[r][c] !== "") {
    return;
  }
  board[r][c] = currentPlayer;
  this.innerText = currentPlayer;
  if (currentPlayer == playero) {
    currentPlayer = playerX;
  } else {
    currentPlayer = playero;
  }
  checkWinner();
}
const checkWinner = () => {
  // horizontal win
  for (let r = 0; r < 3; r++) {
    if (
      board[r][0] == board[r][1] &&
      board[r][1] == board[r][2] &&
      board[r][0] != ""
    ) {
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(`${r.toString()}-${i.toString()}`);
        tile.classList.add("winner");
        win.innerText = `"player ${tile.innerText}" wins`;
      }
      GAMEOVER = true;
      return;
    }
    //
  }
  // vertical win
  for (let c = 0; c < 3; c++) {
    if (
      board[0][c] == board[1][c] &&
      board[1][c] == board[2][c] &&
      board[0][c] != ""
    ) {
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(`${i.toString()}-${c.toString()}`);
        tile.classList.add("winner");
        win.innerText = `"player ${tile.innerText}" wins`;
      }

      GAMEOVER = true;
      return;
    }
  }
  // diagonal win
  if (
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2] &&
    board[0][0] != ""
  ) {
    for (let i = 0; i < 3; i++) {
      let tile = document.getElementById(`${i.toString()}-${i.toString()}`);
      tile.classList.add("winner");
    }
    win.innerText = `"player ${tile.innerText}" wins`;
    GAMEOVER = true;
    return;
  }
  // anti diagonal
  if (
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0] &&
    board[0][2] != ""
  ) {
    // 0-2
    let tile = document.getElementById(`0-2`);
    tile.classList.add("winner");
    // 1-1
    tile = document.getElementById(`1-1`);
    tile.classList.add("winner");
    // 2-0
    tile = document.getElementById(`2-0`);
    tile.classList.add("winner");
    win.innerText = `"player ${tile.innerText}" wins`;
    GAMEOVER = true;
    return;
  }
};
