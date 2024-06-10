// frontend/src/components/GamePage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GamePage.css';

function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerOne, playerTwo } = location.state;
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('O');
  const [winner, setWinner] = useState(null);
  const [result, setResult] = useState('');

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = async (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setResult(`${gameWinner === 'O' ? playerOne : playerTwo} wins!`);
      try {
        await axios.put('http://localhost:8000/players/', {
          name: gameWinner === 'O' ? playerOne : playerTwo,
          score: gameWinner === 'O' ? 1 : -1,
        });
      } catch (error) {
        console.error(error);
      }
    } else if (newBoard.every(cell => cell)) {
      setResult('Draw!');
    } else {
      setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O');
    }
  };

  return (
    <div className="container text-center" style={{ backgroundColor: 'purple', color: 'white', height: '100vh' }}>
      <h1>tic-tac-toe</h1>
      <div className="d-flex justify-content-between my-3">
        <div>
          <h2>{playerOne}</h2>
          <h3 style={{ color: 'red' }}>O</h3>
        </div>
        <div>
          <h2>{playerTwo}</h2>
          <h3 style={{ color: 'red' }}>X</h3>
        </div>
      </div>
      <div className="game-board d-flex flex-wrap justify-content-center">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'black',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
              margin: '5px',
              fontSize: '2rem',
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="mt-3">
        <h3>{result}</h3>
      </div>
      <div className="mt-5">
        <button className="btn btn-warning btn-lg" onClick={() => navigate('/')}>
          Home
        </button>
      </div>
    </div>
  );
}

export default GamePage;
