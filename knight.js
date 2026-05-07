class Tile {
  constructor(coordinates) {
    this.coordinates = coordinates;
    this.reachableCoordinates = validMoves(coordinates);
  }
}

function validMoves(coordinate) {
  const validMoves = [];
  const movesOffsets = [
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  for (let i = 0; i < movesOffsets.length; i++) {
    const newX = coordinate[0] + movesOffsets[i][0];
    const newY = coordinate[1] + movesOffsets[i][1];

    if (isOnBoard(newX, newY)) {
      validMoves.push([newX, newY]);
    }
  }

  return validMoves;
}

function isOnBoard(x, y) {
  return x <= 7 && x >= 0 && y <= 7 && y >= 0;
}

function knightMoves(startPos, endPos) {
  const queue = [[new Tile(startPos), []]];

  const visitedTiles = [];

  while (queue.length) {
    const tilePlusHistory = queue.shift();
    const tile = tilePlusHistory[0];
    const history = tilePlusHistory[1];
    history.push(tile.coordinates);
    visitedTiles.push(tile.coordinates);
    if (
      tile.coordinates[0] === endPos[0] &&
      tile.coordinates[1] === endPos[1]
    ) {
      return formatOutput(history);
    }

    tile.reachableCoordinates.forEach((coordinates) => {
      if (
        !visitedTiles.some((visited) => {
          return visited[0] === coordinates[0] && visited[1] === coordinates[1];
        })
      ) {
        queue.push([new Tile(coordinates), [...history]]);
      }
    });
  }
}

function formatOutput(history){
  let path = ""
  history.forEach(coordinate => {
    console.log(coordinate)
    path += ("[" + coordinate + "]" + "\n")
  })
  
  
  return `You made it in ${history.length-1} moves! Here's your path: \n${path}`
}

console.log(knightMoves([3, 3], [4, 3]));

/* const chessboardContainer = document.querySelector(".chessboard-container");
const chessboardArray = [];

function createSquare() {
  const square = document.createElement("div");
  square.classList.add("square");
  return square;
}

function createRow() {
  const row = document.createElement("div");
  row.classList.add("row");

  const rowArray = [];

  for (let i = 0; i < 8; i++) {
    const square = createSquare();
    row.appendChild(square);
    rowArray.push(square);
  }

  chessboardArray.unshift(rowArray);
  return row;
}

function createChessboard() {
  for (let i = 0; i < 8; i++) {
    chessboardContainer.appendChild(createRow());
  }
}

createChessboard();

for (let i = 0; i < chessboardArray.length; i++) {
  for (let j = 0; j < 8; j++) {
    const square = chessboardArray[i][j];
    square.textContent = `${i},${j}`;
    square.dataset.x = i;
    square.dataset.y = j;
  }
}

function markMultipleAsVisited(coordinatesArray, color) {
  coordinatesArray.forEach((coordinates) => {
    markAsVisited(coordinates[0], coordinates[1], color);
  });
}

function markAsVisited(x, y, color) {
  chessboardArray[x][y].style = `background-color: ${color}`;
}

chessboardContainer.addEventListener("click", (e) => {
  const x = parseInt(e.target.dataset.x);
  const y = parseInt(e.target.dataset.y);
  
  console.log(x, y);
  chooseSquare(x, y);
});

function chooseSquare(x, y) {
  chessboardArray[x][y].style = "color: red";
  console.log(validMoves(x,y))
  markMultipleAsVisited(validMoves(x, y), "lime");
}  */
