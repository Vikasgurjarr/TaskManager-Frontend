// reducers/projectReducer.js

import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  ADD_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  ASSIGN_USERS_TO_PROJECT_SUCCESS,
  SET_IS_MODAL_OPEN,
  SET_SNACKBAR_OPEN,
  SET_SNACKBAR_MESSAGE,
} from "../Actions/projectActions";

const initialState = {
  projects: [],
  loading: false,
  error: null,
  isModalOpen: false,
  snackbarOpen: false,
  snackbarMessage: "",
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };
    case FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        ),
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case ASSIGN_USERS_TO_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        ),
      };
    case SET_IS_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: action.payload,
      };
    case SET_SNACKBAR_OPEN:
      return {
        ...state,
        snackbarOpen: action.payload,
      };
    case SET_SNACKBAR_MESSAGE:
      return {
        ...state,
        snackbarMessage: action.payload,
      };
    default:
      return state;
  }
};

export default projectReducer;
