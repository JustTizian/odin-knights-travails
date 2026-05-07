import knight from "./knight.js";

const chessboardContainer = document.querySelector(".chessboard-container");

const chessboardArray = createChessboard();

let firstCoords;
let secondCoords;

function createChessboard() {
  const chessboard = document.createElement("div");
  chessboard.classList.add("chessboard-container");
  const tiles = [];

  for (let y = 7; y >= 0; y--) {
    for (let x = 0; x <= 7; x++) {
      const tile = createTile(x, y);

      chessboard.append(tile);
      tiles.push(tile);
    }
  }

  chessboard.addEventListener("click", (e) => {
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    if (!firstCoords) {
      resetBoard();
      firstCoords = [x, y];
      chessboardArray[convertCoordsToFlatIndex(x, y)].classList.add("choosen");
    } else {
      secondCoords = [x, y];
      chessboardArray[convertCoordsToFlatIndex(x, y)].classList.add("goal");

      const moves = knight.knightMoves(firstCoords, secondCoords);
      console.log(moves);

      moves.forEach((coords) => {
        chessboardArray[
          convertCoordsToFlatIndex(coords[0], coords[1])
        ].classList.add("way");
      });

      firstCoords = "";
      secondCoords = "";
    }
  });

  chessboardContainer.replaceWith(chessboard);

  return tiles;
}

function createTile(x, y) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.dataset.x = x;
  tile.dataset.y = y;
  tile.textContent = `${x},${y}`;
  (x + y) % 2 === 0 ? tile.classList.add("white") : tile.classList.add("black");
  return tile;
}

function convertCoordsToFlatIndex(x, y) {
  return (7 - y) * 8 + x;
}

function chooseTile(x, y) {
  resetBoard();
  chessboardArray[convertCoordsToFlatIndex(x, y)].classList.add("choosen");
  markMultipleAsVisited(knight.validMoves([x, y]), "green");
}

function markAsVisited(x, y) {
  chessboardArray[convertCoordsToFlatIndex(x, y)].classList.add("reachable");
}

function markMultipleAsVisited(coordinatesArray) {
  coordinatesArray.forEach((coordinates) => {
    markAsVisited(coordinates[0], coordinates[1]);
  });
}

function resetBoard() {
  chessboardArray.forEach((tile) => {
    tile.classList.remove("choosen", "reachable", "goal", "way");
  });
}
