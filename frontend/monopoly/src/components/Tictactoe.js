// TicTacToe.js
import React, { useState, useEffect } from 'react';
import './Tictactoe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

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

  useEffect(() => {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
      }
    }

    if (!board.includes(null) && !winner) {
      setIsDraw(true);
    }
  }, [board, winner]);

  const handleClick = async (i) => {
    if (board[i] || winner) return;
    const boardCopy = [...board];
    boardCopy[i] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      {board[i]}
    </button>
  );

  return (
    <div>
      <div className="board">
        {Array(9).fill(null).map((_, i) => renderSquare(i))}
      </div>
      {winner && <div className="winner">Winner: {winner}</div>}
      {!winner && isDraw && <div className="draw">Game is a draw</div>}
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;