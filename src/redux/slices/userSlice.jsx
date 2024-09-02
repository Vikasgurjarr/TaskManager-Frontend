import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/auth'; // Adjust URL as per your API endpoint

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data; // Assuming your API returns data in a certain format
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// // Async thunk for deleting a user
// export const deleteUser = createAsyncThunk(
//   'users/deleteUser',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const authToken = localStorage.getItem('token');
//       await axios.delete(`${BASE_URL}/users/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       return userId; // Return userId upon successful deletion
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// Initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Slice definition and reducers
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(deleteUser.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(deleteUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.error = null;
      //   // Remove the deleted user from state
      //   state.users = state.users.filter(user => user._id !== action.payload);
      // })
      // .addCase(deleteUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
  },
});

// Export actions and reducer
export const selectUsers = (state) => state.users.users;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;

export default userSlice.reducer;
