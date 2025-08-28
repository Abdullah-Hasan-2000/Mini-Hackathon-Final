import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from './Slices/LoginSlice.jsx'

const store = configureStore({
  reducer: {
    Login: LoginReducer,
  },
})

export default store
