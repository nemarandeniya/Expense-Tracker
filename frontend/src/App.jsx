import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Auth/Login"
import Signup from "./pages/Auth/Signup"
import Home from "./pages/Dashboard/Home"
import Income from "./pages/Dashboard/Income"
import Expense from "./pages/Dashboard/Expense"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App


const Root = () => {
  //chech if token exists in local storage
  const isAuthenticated = !!localStorage.getItem("token")//!!converts any value to a boolean

  //if authenticated redirectted to dashboard elso to login page
  return isAuthenticated
    ? (<Navigate to="/dashboard" />)
    : (<Navigate to="/login" />)
}