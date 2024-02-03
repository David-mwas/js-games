let currentMoleTile;
let currentPlantTile;
let score = 0;
let gameOver = false;

window.addEventListener("load", () => {
  setGame();
});

const setGame = () => {
  // set the grid for game board in html

  for (let i = 0; i < 9; i++) {
    // i goes from 0 to 8, and stops at 9
    //   creating tile divs inside the board element
    //   <div id="0-8"></div>

    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }
  setInterval(setMole, 1000);
  setInterval(setPlant, 1000);
};

const getRandomTile = () => {
  let randNum = Math.floor(Math.random() * 9);
  return randNum.toString();
};

const setMole = () => {
  if (gameOver) {
    return;
  }
  if (currentMoleTile) {
    currentMoleTile.innerHTML = "";
  }
  let mole = document.createElement("img");
  mole.src = "./assets/images/monty-mole.png";

  let num = getRandomTile();
  if (currentPlantTile && currentPlantTile.id == num) {
    return;
  }
  currentMoleTile = document.getElementById(num);
  currentMoleTile?.appendChild(mole);
};

const setPlant = () => {
  if (gameOver) {
    return;
  }
  if (currentPlantTile) {
    currentPlantTile.innerHTML = "";
  }
  let plant = document.createElement("img");
  plant.src = "./assets/images/piranha-plant.png";

  let num = getRandomTile();
  if (currentMoleTile && currentMoleTile.id == num) {
    return;
  }

  currentPlantTile = document.getElementById(num);
  currentPlantTile.appendChild(plant);
};

function selectTile() {
  if (gameOver) {
    return;
  }
  if (this == currentMoleTile) {
    score += 10;
    document.getElementById("score").innerText = score.toString(); //update score html
  } else if (this == currentPlantTile) {
    document.getElementById("score").innerText =
      "GAME OVER: " + score.toString(); //update score html
    gameOver = true;
  }
}
