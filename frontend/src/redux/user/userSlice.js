import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null, // Change from false to null for better error handling
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null; // Reset error on start
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error payload
    },
    updateUserStart: (state) =>{
      state.loading = true
    },
    updateUserSuccess: (state,action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error payload
    },

    deleteUserStart: (state) =>{
      state.loading = true
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error payload
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    }
  },
});

export const { signInFailure, signInStart, signInSuccess, updateUserFailure, updateUserStart, updateUserSuccess, deleteUserFailure,
deleteUserStart, deleteUserSuccess, signOut } = userSlice.actions;

export default userSlice.reducer;
