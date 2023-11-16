import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreatePost from './components/CreatePost'
import Dashboard from './pages/dashboard/Dashboard'
import Chessgame from './components/Chess/Chessgame'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chessgame />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
