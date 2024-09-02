// utils/token.js
import { setToken, clearToken } from "../react-redux/Actions/authActions";
import store from "../react-redux/store";

export const storeTokenInLS = (token) => {
  store.dispatch(setToken(token));
  localStorage.setItem("token", token);
};

export const clearTokenFromLS = () => {
  store.dispatch(clearToken());
  localStorage.removeItem("token");
};
