import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk"; // redux middle-ware

import reducers from "./reducers"; // import reducer

const initialState = {};
/** ***************** 
@Purpose : Used for create redux store
@Parameter : persistedReducer , composeEnhancers
@Author : shailendra
******************/
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
export default createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
