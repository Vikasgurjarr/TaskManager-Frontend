import axios from "axios";
import {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  addProjectSuccess,
  updateProjectSuccess,
  deleteProjectSuccess,
  assignUsersToProjectSuccess,
} from "../Actions/projectActions";

const api = axios.create({
  baseURL: "https://taskyoubackend.netlify.app/.netlify/functions/server/api",
});

const getAuthToken = (state) => state.auth.token;

export const fetchProjects = () => {
  return async (dispatch, getState) => {
    dispatch(fetchProjectsRequest());
    const token = getAuthToken(getState());
    try {
      const response = await api.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchProjectsSuccess(response.data));
    } catch (error) {
      dispatch(fetchProjectsFailure(error.response.data.message));
    }
  };
};

export const addProject = (newProject) => {
  return async (dispatch, getState) => {
    const token = getAuthToken(getState());
    try {
      const response = await api.post("/projects", newProject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addProjectSuccess(response.data));
    } catch (error) {
      dispatch(fetchProjectsFailure(error.response.data.message));
    }
  };
};

export const updateProject = (projectId, updatedProject) => {
  return async (dispatch, getState) => {
    const token = getAuthToken(getState());
    try {
      const response = await api.put(`/projects/${projectId}`, updatedProject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateProjectSuccess(response.data));
    } catch (error) {
      dispatch(fetchProjectsFailure(error.response.data.message));
    }
  };
};

export const deleteProject = (projectId) => {
  return async (dispatch, getState) => {
    const token = getAuthToken(getState());
    try {
      await api.delete(`/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteProjectSuccess(projectId));
    } catch (error) {
      dispatch(fetchProjectsFailure(error.response.data.message));
    }
  };
};

export const assignUsersToProject = ({ projectId, userIds }) => {
  return async (dispatch, getState) => {
    const token = getAuthToken(getState());
    console.log("assignUsersToProject thunk - projectId:", projectId);
    console.log("assignUsersToProject thunk - userIds:", userIds);
    try {
      const response = await api.put(
        `/projects/${projectId}/assign-users`,
        { userIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(assignUsersToProjectSuccess(response.data));
    } catch (error) {
      dispatch(fetchProjectsFailure(error.response.data.message));
    }
  };
};

export const selectProjects = (state) => state.projects.projects;
export const selectLoading = (state) => state.projects.loading;
export const selectError = (state) => state.projects.error;
