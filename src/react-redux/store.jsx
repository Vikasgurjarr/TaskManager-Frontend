import { createStore, applyMiddleware } from "redux";
import  thunk  from "redux-thunk"; // Importing thunk correctly
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer"; // Replace with your actual root reducer path

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
