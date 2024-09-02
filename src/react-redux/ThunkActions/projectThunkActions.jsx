// api/projectThunks.js

import {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  addProjectSuccess,
  updateProjectSuccess,
  deleteProjectSuccess,
  assignUsersToProjectSuccess,
} from "../Actions/projectActions";
import {
  fetchProjectsApi,
  addProjectApi,
  updateProjectApi,
  deleteProjectApi,
  assignUsersToProjectApi,
} from "../Api/projectApi";

const getAuthToken = (state) => state.auth.token;

export const fetchProjects = () => {
  return async (dispatch, getState) => {
    dispatch(fetchProjectsRequest());
    const token = getAuthToken(getState());
    try {
      const projects = await fetchProjectsApi(token);
      dispatch(fetchProjectsSuccess(projects));
    } catch (error) {
      dispatch(fetchProjectsFailure(error));
    }
  };
};

export const addProject = (newProject) => {
  return async (dispatch, getState) => {
    const token = getAuthToken(getState());
    try {
      const project = await addProjectApi(token, newProject);
      dispatch(addProjectSuccess(project));
    } catch (error) {
      dispatch(fetchProjectsFailure(error));
    }
  };
};

export const updateProject = (projectId, updatedProject) => {
  return async (dispatch, getState) => {
    const token = getAuthToken(getState());
    try {
      const project = await updateProjectApi(token, projectId, updatedProject);
      dispatch(updateProjectSuccess(project));
    } catch (error) {
      dispatch(fetchProjectsFailure(error));
    }
  };
};

export const deleteProject = (projectId) => {
  return async (dispatch, getState) => {
    const token = getAuthToken(getState());
    try {
      await deleteProjectApi(token, projectId);
      dispatch(deleteProjectSuccess(projectId));
    } catch (error) {
      dispatch(fetchProjectsFailure(error));
    }
  };
};

export const assignUsersToProject = (projectId, userIds) => {
  return async (dispatch, getState) => {
    const token = getAuthToken(getState());
    try {
      const project = await assignUsersToProjectApi(token, projectId, userIds);
      dispatch(assignUsersToProjectSuccess(project));
    } catch (error) {
      dispatch(fetchProjectsFailure(error));
    }
  };
};



export const selectProjects = (state) => state.projects.projects;
export const selectLoading = (state) => state.projects.loading;
export const selectError = (state) => state.projects.error;
