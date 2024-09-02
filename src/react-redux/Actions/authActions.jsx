
export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";
export const SET_TOKEN = "SET_TOKEN";
export const CLEAR_TOKEN = "CLEAR_TOKEN";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const clearToken = () => ({
  type: CLEAR_TOKEN,
});
