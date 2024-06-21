import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Signup from './components/pages/Signup'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import Login from './components/pages/Login'
import Transaction from './components/pages/Transaction'

function App() {

  return (
    <>
    <Router>
      <h1 className='bg-yellow-400'>Expense tracker with GraphQL</h1>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path="/transaction/:id" element={<Transaction/>} />
        <Route exact path='*' element={<NotFound/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
