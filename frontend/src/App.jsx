import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from '../src/pages/About'
import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import Signup from '../src/pages/Signup'
import Profile from '../src/pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App