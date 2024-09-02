// reducer.js
import * as actionTypes from "../Actions/taskActions";

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TASKS_REQUEST:
      return {
        ...state,
        status: "loading",
      };
    case actionTypes.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        tasks: action.payload,
      };
    case actionTypes.FETCH_TASKS_FAILURE:
      return {
        ...state,
        status: "failed",
        error: action.payload,
      };
    case actionTypes.CREATE_TASK_REQUEST:
      return {
        ...state,
        status: "loading",
      };
    case actionTypes.CREATE_TASK_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        tasks: [...state.tasks, action.payload],
      };
    case actionTypes.CREATE_TASK_FAILURE:
      return {
        ...state,
        status: "failed",
        error: action.payload,
      };
    case actionTypes.UPDATE_TASK_REQUEST:
      return {
        ...state,
        status: "loading",
      };
    case actionTypes.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case actionTypes.UPDATE_TASK_FAILURE:
      return {
        ...state,
        status: "failed",
        error: action.payload,
      };
    case actionTypes.DELETE_TASK_REQUEST:
      return {
        ...state,
        status: "loading",
      };
    case actionTypes.DELETE_TASK_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case actionTypes.DELETE_TASK_FAILURE:
      return {
        ...state,
        status: "failed",
        error: action.payload,
      };
    case actionTypes.ADD_COMMENT_REQUEST:
      return {
        ...state,
        status: "loading",
      };
    case actionTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        tasks: state.tasks.map((task) =>
          task._id === action.payload.taskId
            ? { ...task, comments: [...task.comments, action.payload.comment] }
            : task
        ),
      };
    case actionTypes.ADD_COMMENT_FAILURE:
      return {
        ...state,
        status: "failed",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tasksReducer;
