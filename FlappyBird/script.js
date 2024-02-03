// board
let board;
let context;
const boardWidth = 360;
const boardHeight = 640;
let birdImage;
let sound_point = new Audio("sounds effect/point.mp3");
let sound_die = new Audio("sounds effect/die.mp3");

// bird width/height ratio=408/128=17/12
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
const bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

// pipes
let pipeArray = [];
let pipeWidth = 64; //width/height ratio =384/3072=1/8
let pipeHeight = 512;
let pipeX = 512;
let pipeY = 0;

// physics
let veloityX = -2; // pipes moving left speed
let velocityY = 0; // bird jump
let gravity = 0.4;
let topPipeImage;
let bottomPipeImage;
let GAMEOVER = false;
let score = 0;
window.addEventListener("load", () => {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d"); //used for board drawing

  // draw flappy bird
  //   context.fillRect(bird.x, bird.y, bird.width, bird.height);

  // load birdImage
  birdImage = new Image();
  birdImage.src = "/img/Bird.png";
  birdImage.addEventListener("load", () => {
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
  });
  topPipeImage = new Image();
  topPipeImage.src = "/img/toppipe.png";
  bottomPipeImage = new Image();
  bottomPipeImage.src = "/img/bottompipe.png";
  requestAnimationFrame(update);
  setInterval(placePipes, 1500);
  document.addEventListener("keydown", moveBird);
});

// animation loop
const update = () => {
  requestAnimationFrame(update);
  if (GAMEOVER) {
    return;
  }
  context.clearRect(0, 0, boardWidth, boardHeight);

  // bird
  velocityY += gravity;
  //   bird.y += velocityY;
  bird.y = Math.max(bird.y + velocityY, 0); //apply gravity to current bird.y
  context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
  if (bird.y > board.height) {
    GAMEOVER = true;
  }

  // pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += veloityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      sound_point.play();
      score += 0.5; //for 2 pipes 0.5*2
      pipe.passed = true;
    }
    if (detectCollitions(bird, pipe)) {
      sound_die.play();
      GAMEOVER = true;
    }
  }
  // clear pipes
  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift(); //removes array 1st elements
  }
  // score
  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);
  if (GAMEOVER) {
    sound_die.play();
    context.fillText("GAME OVER", 4, 90);
  }
};

const placePipes = () => {
  if (GAMEOVER) {
    return;
  }
  let randomPipeOne = pipeY - pipeHeight / 4 - (Math.random() * pipeHeight) / 2;
  let openingSpace = board.height / 4;
  let topPipe = {
    img: topPipeImage,
    x: pipeX,
    y: randomPipeOne,
    width: pipeWidth,
    height: pipeHeight,
  };
  pipeArray.push(topPipe);
  let bottomPipe = {
    img: bottomPipeImage,
    x: pipeX,
    y: randomPipeOne + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(bottomPipe);
};

const moveBird = (e) => {
  document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowUp" || e.key == " ") {
      birdImage.src = "/img/Bird-2.png";
      // jump
      velocityY = -6;
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.key == "ArrowUp" || e.key == " ") {
      birdImage.src = "img/Bird.png";
    }
  });
  if (GAMEOVER) {
    bird.y = birdY;
    pipeArray = [];
    score = 0;
    GAMEOVER = false;
  }
};

// collitions
const detectCollitions = (a, b) => {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
};
