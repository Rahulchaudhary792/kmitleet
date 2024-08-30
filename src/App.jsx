import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './Home'
import Problem from './Problem'
import Admin from './Admin'
function App() {
  return (
    <>
      <Router>
      <div className="App">
        <div className="main">
              <Routes>
                 <Route path='/' element={<Signup/>} />
                 <Route path='/login' element={<Login/>} />
                 <Route path='/home' element={<Home/>} />
                 <Route path='/problem/:id' element={<Problem/>} />
                 <Route path='/admin' element={<Admin/>} />
              </Routes>
        </div>
      </div>
      </Router>
    </>
  )
}
export default App