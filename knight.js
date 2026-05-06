function validMoves(startPos) {
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
    const newX = startPos[0] + movesOffsets[i][0];
    const newY = startPos[1] + movesOffsets[i][1];

    if (isOnBoard(newX, newY)) {
      validMoves.push([newX, newY]);
    }
  }

  /* validMoves.push([startPos[0] + 1, startPos[1] + 2]);
  validMoves.push([startPos[0] + 1, startPos[1] - 2]);
  validMoves.push([startPos[0] + 2, startPos[1] + 1]);
  validMoves.push([startPos[0] + 2, startPos[1] - 1]);

  validMoves.push([startPos[0] - 1, startPos[1] + 2]);
  validMoves.push([startPos[0] - 1, startPos[1] - 2]);
  validMoves.push([startPos[0] - 2, startPos[1] + 1]);
  validMoves.push([startPos[0] - 2, startPos[1] - 1]); */

  return validMoves;
}

function isOnBoard(x, y) {
  return (x <= 7 && x >= 0) && (y <= 7 && y >= 0);
}

console.log(validMoves([7, 7]));
