import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

// Helper function to get JWT token from state or localStorage
const getAuthToken = (state) => state.auth.token; // Adjust as per your application's authentication setup

// Thunks
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { getState }) => {
  const token = getAuthToken(getState());
  try {
    const response = await api.get('/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message; // Adjust error handling as per your backend response structure
  }
});

export const addProject = createAsyncThunk('projects/addProject', async (newProject, { getState }) => {
  const token = getAuthToken(getState());
  try {
    const response = await api.post('/projects', newProject, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message; // Adjust error handling as per your backend response structure
  }
});

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ projectId, updatedProject }, { getState }) => {
    const token = getAuthToken(getState());
    try {
      const response = await api.put(`/projects/${projectId}`, updatedProject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data.message; // Adjust error handling as per your backend response structure
    }
  }
);

export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId, { getState }) => {
  const token = getAuthToken(getState());
  try {
    await api.delete(`/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return projectId;
  } catch (error) {
    throw error.response.data.message; // Adjust error handling as per your backend response structure
  }
});

// New Thunk for assigning users to a project
export const assignUsersToProject = createAsyncThunk(
  'projects/assignUsersToProject',
  async ({ projectId, userIds }, { getState }) => {
    const token = getAuthToken(getState());
    try {
      const response = await api.put(`/projects/${projectId}/assign-users`, { userIds }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data.message; // Adjust error handling as per your backend response structure
    }
  }
);

// Initial state
const initialState = {
  projects: [],
  loading: false,
  error: null,
  isModalOpen: false,
  snackbarOpen: false,
  snackbarMessage: '',
};

// Slice
const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setSnackbarOpen: (state, action) => {
      state.snackbarOpen = action.payload;
    },
    setSnackbarMessage: (state, action) => {
      state.snackbarMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Update error state with backend error message
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const updatedIndex = state.projects.findIndex((project) => project._id === action.payload._id);
        if (updatedIndex !== -1) {
          state.projects[updatedIndex] = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => project._id !== action.payload);
      })
      .addCase(assignUsersToProject.fulfilled, (state, action) => {
        const updatedIndex = state.projects.findIndex((project) => project._id === action.payload._id);
        if (updatedIndex !== -1) {
          state.projects[updatedIndex] = action.payload;
        }
      });
  },
});

// Export actions
export const { setIsModalOpen, setSnackbarOpen, setSnackbarMessage } = projectSlice.actions;

// Selectors
export const selectProjects = (state) => state.projects.projects;
export const selectLoading = (state) => state.projects.loading;
export const selectError = (state) => state.projects.error;

// Export reducer
export default projectSlice.reducer;
