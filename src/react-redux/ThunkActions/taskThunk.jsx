// thunks.js
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
} from "../Actions/taskActions";

export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const authToken = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/api/tasks", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    dispatch(fetchTasksSuccess(data));
  } catch (error) {
    dispatch(fetchTasksFailure(error.message));
  }
};

export const createNewTask = (newTaskData) => async (dispatch) => {
  dispatch(createTaskRequest());
  try {
    const authToken = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(newTaskData),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    const data = await response.json();
    dispatch(createTaskSuccess(data));
  } catch (error) {
    dispatch(createTaskFailure(error.message));
  }
};

export const updateTask = (updatedTaskData) => async (dispatch) => {
  dispatch(updateTaskRequest());
  try {
    const authToken = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/api/tasks/${updatedTaskData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedTaskData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    const data = await response.json();
    dispatch(updateTaskSuccess(data));
  } catch (error) {
    dispatch(updateTaskFailure(error.message));
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch(deleteTaskRequest());
  try {
    const authToken = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    dispatch(deleteTaskSuccess(taskId));
  } catch (error) {
    dispatch(deleteTaskFailure(error.message));
  }
};

export const addComment =
  ({ taskId, comment }) =>
  async (dispatch) => {
    dispatch(addCommentRequest());
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/tasks/${taskId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ comment }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      const data = await response.json();
      dispatch(addCommentSuccess(taskId, data));
    } catch (error) {
      dispatch(addCommentFailure(error.message));
    }
  };

// selectors.js
export const selectTasks = (state) => state.tasks.tasks;
