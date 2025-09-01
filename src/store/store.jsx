import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from './Slices/LoginSlice.jsx'
import BranchReducer from './Slices/BranchSlice.jsx'

const store = configureStore({
  reducer: {
    Login: LoginReducer,
    Branch: BranchReducer,
  },
})

export default store
