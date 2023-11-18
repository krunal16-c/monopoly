// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkWinner = (board) => {
  for (let line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

app.post('/api/move', (req, res) => {
  const board = req.body.board;
  const winner = checkWinner(board);
  if (winner) {
    res.json({ winner });
  } else {
    // Implement your move logic here
    res.json({ board });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));