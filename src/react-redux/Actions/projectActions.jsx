// actions/projectActions.js

// actions/projectActionTypes.js
export const FETCH_PROJECTS_REQUEST = "FETCH_PROJECTS_REQUEST";
export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
export const FETCH_PROJECTS_FAILURE = "FETCH_PROJECTS_FAILURE";

export const ADD_PROJECT_SUCCESS = "ADD_PROJECT_SUCCESS";

export const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS";

export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";

export const ASSIGN_USERS_TO_PROJECT_SUCCESS =
  "ASSIGN_USERS_TO_PROJECT_SUCCESS";

export const SET_IS_MODAL_OPEN = "SET_IS_MODAL_OPEN";
export const SET_SNACKBAR_OPEN = "SET_SNACKBAR_OPEN";
export const SET_SNACKBAR_MESSAGE = "SET_SNACKBAR_MESSAGE";

//action creators
export const fetchProjectsRequest = () => ({
  type: FETCH_PROJECTS_REQUEST,
});

export const fetchProjectsSuccess = (projects) => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: projects,
});

export const fetchProjectsFailure = (error) => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: error,
});

export const addProjectSuccess = (project) => ({
  type: ADD_PROJECT_SUCCESS,
  payload: project,
});

export const updateProjectSuccess = (project) => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: project,
});

export const deleteProjectSuccess = (projectId) => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: projectId,
});

export const assignUsersToProjectSuccess = (project) => ({
  type: ASSIGN_USERS_TO_PROJECT_SUCCESS,
  payload: project,
});

export const setIsModalOpen = (isOpen) => ({
  type: SET_IS_MODAL_OPEN,
  payload: isOpen,
});

export const setSnackbarOpen = (isOpen) => ({
  type: SET_SNACKBAR_OPEN,
  payload: isOpen,
});

export const setSnackbarMessage = (message) => ({
  type: SET_SNACKBAR_MESSAGE,
  payload: message,
});
