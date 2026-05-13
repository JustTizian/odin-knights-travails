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
      return history;
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

function formatOutput(history) {
  let path = "";
  history.forEach((coordinate) => {
    path += "[" + coordinate + "]" + "\n";
  });
  return `You made it in ${history.length - 1} moves! Here's your path: \n${path}`;
}

export default{
  validMoves,
  knightMoves
}
