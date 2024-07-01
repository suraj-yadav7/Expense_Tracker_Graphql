import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import Signup from './components/pages/Signup'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import Login from './components/pages/Login'
import Transaction from './components/pages/Transaction'
import TransactionFormSkeleton from './components/TransactionFormSkelton'
import toast, {Toaster} from 'react-hot-toast'
import { useQuery } from '@apollo/client'
import { GET_USER_AUTHENTICATION } from './graphql/queries/user.query'

function App() {
// useQuery automatically call inside function when component is mounted
  const {loading, data, error}=useQuery(GET_USER_AUTHENTICATION,
    {
      fetchPolicy: 'network-only',  // Ensure fresh data is fetched
  }
  )


  if(loading) return <h3>User is loading</h3>
  return (
    <>
    
    <Router>
      <Routes>
        <Route exact path="/" element={data.authUser? <Home/> : <Navigate to='/signup'/>}/>
        <Route exact path="/signup" element={!data?.authUser? <Signup/>: <Navigate to='/'/>} />
        <Route exact path='/login' element={!data?.authUser? <Login/>:<Navigate to='/' />} />
        <Route exact path="/transaction/:id" element={data?.authUser? <Transaction/> :<Navigate to="/" />} />
        <Route exact path='*' element={<NotFound/>} />
      </Routes>
      <Toaster/>
    </Router>
    </>
  )
}

export default App;
