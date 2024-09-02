import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/tasks', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating a task
export const createNewTask = createAsyncThunk(
  'tasks/createNewTask',
  async (newTaskData, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newTaskData),
      });
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (updatedTaskData, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/tasks/${updatedTaskData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedTaskData),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      return taskId; // Return the deleted taskId upon successful deletion
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a comment to a task
export const addComment = createAsyncThunk(
  'tasks/addComment',
  async ({ taskId, comment }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ comment }),
      });
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      const data = await response.json();
      return { taskId, comment: data }; // Assuming your API returns the updated task with the new comment
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Redux slice using createSlice builder pattern
const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Additional reducers can be added here for modifying tasks
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { taskId, comment } = action.payload;
        state.tasks = state.tasks.map((task) =>
          task._id === taskId ? { ...task, comments: [...task.comments, comment] } : task
        );
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectTasks = (state) => state.tasks.tasks;

export default taskSlice.reducer;
