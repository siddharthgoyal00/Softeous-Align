import { useState } from 'react'

import './App.css'
import { Home } from './pages/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/AdminAuth/Signup/Signup'
import { Login } from './pages/AdminAuth/Login/Login'
import { Navbar } from './components/Navbar'
import { AdminDashboard } from './pages/AdminDashboard/AdminDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <BrowserRouter>
   <Navbar></Navbar>
      <Routes>
        <Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
