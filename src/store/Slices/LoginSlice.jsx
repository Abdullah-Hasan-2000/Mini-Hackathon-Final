import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {auth} from '../../config/firebase.jsx'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {doc , getDoc, setDoc} from "firebase/firestore";
import { db } from "../../config/firebase.jsx";

const initialState = {
    userType: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isSignOut: false,
}

export const loginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state.isSignOut = false;
            state.userType = null;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
        },
        signOutState: (state) => {
            state.isSignOut = true;
            state.userType = null;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.userType = null;
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userType = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.userType = action.payload;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(signupUser.pending, (state) => {
                state.userType = null;
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.userType = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.userType = action.payload;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(signOutUser.pending, (state) => {
                state.isLoading = true;
                state.isSignOut = false;
            })
            .addCase(signOutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isSignOut = true;
                state.userType = null;
            })
            .addCase(signOutUser.rejected, (state) => {
                state.isLoading = false;
                state.isSignOut = false;
            });
}})


export const loginUser = createAsyncThunk('login/loginUser', async ({email,password}, thunkAPI) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential.user.uid);
        localStorage.setItem("userId", userCredential.user.uid);
        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        const userData = await docSnap.data().type; 
        console.log("User type is:", userData);
        return userData;
        

    } catch (error) {
        console.log("Login error:", error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const signupUser = createAsyncThunk('signup/signupUser', async ({email, password}, thunkAPI) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential.user.uid);
        localStorage.setItem("userId", userCredential.user.uid);
        const docRef = doc(db, "users", userCredential.user.uid);
        await setDoc(docRef, { email, type: "user" });
    } catch (error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

import { signOut } from "firebase/auth";
export const signOutUser = createAsyncThunk('signOut/signOutUser', async(_, thunkAPI) => {
    try {
        await signOut(auth);
        localStorage.removeItem("userId");
        return true;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export default loginSlice.reducer;
export const { resetAuthState, signOutState } = loginSlice.actions;
