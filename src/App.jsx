import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginScreen from './screens/authScreens/LoginScreen.jsx'
import UserDashboard from './screens/UserScreens/UserDashboard.jsx'
import AdminDashboard from './screens/AdminScreens/AdminDashboard.jsx'

import BranchList from './screens/AdminScreens/BranchList.jsx'
import SignUpScreen from './screens/authScreens/SignUpScreen.jsx'
import ManagerDashboard from './screens/ManagerScreens/ManagerDashboard.jsx'
import { ToastContainer, Bounce } from 'react-toastify'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/user-dashboard' element={<UserDashboard />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/branch-list' element={<BranchList />} />
        <Route path='/signup' element={<SignUpScreen />} />
        <Route path='/manager-dashboard' element={<ManagerDashboard />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
