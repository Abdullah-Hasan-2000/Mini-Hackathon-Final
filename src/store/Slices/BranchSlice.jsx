import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    branches: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
}

export const BranchSlice = createSlice({
    name: 'BranchSlice',
    initialState,
    reducers: {
        resetBranchState: (state) => {
            state.branches = [];
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBranches.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(fetchBranches.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.branches = action.payload;
            })
            .addCase(fetchBranches.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.errorMessage = action.payload;
            });
    }
})

export const fetchBranches = createAsyncThunk('branches/fetch', async (_,thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:3000/branches');
        const data = response.data;
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const createBranch = createAsyncThunk('branches/create', async (branchData, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3000/branches', branchData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export default BranchSlice.reducer;
export const { resetBranchState } = BranchSlice.actions;