import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginScreen from './screens/authScreens/LoginScreen.jsx'
import UserDashboard from './screens/UserScreens/UserDashboard.jsx'
import AdminDashboard from './screens/AdminScreens/AdminDashboard.jsx'
import SignUpScreen from './screens/authScreens/SignUpScreen.jsx'
import ManagerDashboard from './screens/ManagerScreens/ManagerDashboard.jsx'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/user-dashboard' element={<UserDashboard />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/signup' element={<SignUpScreen />} />
        <Route path='/manager-dashboard' element={<ManagerDashboard />} />
      </Routes>
    </>
  )
}

export default App
