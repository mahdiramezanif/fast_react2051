// frontend/src/components/HomePage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  return (
    <div className="container text-center" style={{ backgroundColor: 'purple', color: 'white', height: '100vh' }}>
      <h1>tic-tac-toe</h1>
      <div className="my-5">
        <Link to="/login" className="btn btn-warning btn-lg">Start</Link>
      </div>
      <div className="my-3">
        <Link to="/scores" className="text-white">Scores</Link>
      </div>
      <div className="mt-5">
        <p>Proud by Mehdi Ramezani 2012</p>
      </div>
    </div>
  )
}

export default HomePage
