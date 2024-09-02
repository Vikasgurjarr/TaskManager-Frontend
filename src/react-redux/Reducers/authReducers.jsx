// reducers/authReducer.js

import {
  SET_USER,
  CLEAR_USER,
  SET_TOKEN,
  CLEAR_TOKEN,
} from "../Actions/authActions";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case CLEAR_TOKEN:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
