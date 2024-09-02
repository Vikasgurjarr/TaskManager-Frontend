import { combineReducers } from "redux";
import usersReducer from "./Reducers/usersReducers";
import authReducer from "./Reducers/authReducers";
import projectReducer from "./Reducers/projectReducers";
import taskReducer from "./Reducers/taskReducers";

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  projects: projectReducer,
  tasks: taskReducer,
});

export default rootReducer;
