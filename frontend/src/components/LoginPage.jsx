// frontend/src/components/LoginPage.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './LoginPage.css'

function LoginPage() {
  const [playerOne, setPlayerOne] = useState('')
  const [playerTwo, setPlayerTwo] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/players/', { name: playerOne })
      await axios.post('http://localhost:8000/players/', { name: playerTwo })
      navigate('/game', { state: { playerOne, playerTwo } })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container text-center" style={{ backgroundColor: 'purple', color: 'white', height: '100vh' }}>
      <h1>tic-tac-toe</h1>
      <form onSubmit={handleSubmit} className="my-5">
        <h2>fill the Form</h2>
        <div className="form-group my-3">
          <input type="text" className="form-control" placeholder="Enter Player One" value={playerOne} onChange={(e) => setPlayerOne(e.target.value)} required />
        </div>
        <div className="form-group my-3">
          <input type="text" className="form-control" placeholder="Enter Player Two" value={playerTwo} onChange={(e) => setPlayerTwo(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-warning btn-lg">Start Game</button>
      </form>
      <div className="mt-5">
        <p>Proud by Mehdi Ramezani 2012</p>
      </div>
    </div>
  )
}

export default LoginPage
