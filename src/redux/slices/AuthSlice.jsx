// // features/auth/authSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null, // Initial user state is null or empty object
//   token: localStorage.getItem('token') || null, // Example: If managing token
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     clearUser: (state) => {
//       state.user = null;
//     },
//     setToken: (state, action) => {
//       state.token = action.payload;
//     },
//     clearToken: (state) => {
//       state.token = null;
//     },
//   },
// });

// export const { setUser, clearUser, setToken, clearToken } = authSlice.actions;

// export default authSlice.reducer;
