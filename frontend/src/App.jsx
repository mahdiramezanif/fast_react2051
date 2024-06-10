// frontend/src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import GamePage from './components/GamePage'
import ScoresPage from './components/ScoresPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/scores" element={<ScoresPage />} />
      </Routes>
    </Router>
  )
}

export default App
