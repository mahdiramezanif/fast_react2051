// frontend/src/components/ScoresPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ScoresPage.css';

function ScoresPage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('http://localhost:8000/players/top10/');
        setPlayers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchScores();
  }, []);

  return (
    <div className="container text-center" style={{ backgroundColor: 'purple', color: 'white', height: '100vh' }}>
      <h1>tic-tac-toe</h1>
      <div className="my-3">
        <h2>Score Table (Top 10)</h2>
        <table className="table table-borderless text-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.name}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScoresPage;
