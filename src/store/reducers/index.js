import { combineReducers } from "redux";

// Import all reducer
import auth from "./Auth";
import ui from "./Ui";

/** ***************** 
@purpose : Combine Reducer
@Parameter : {ui, user}
@Author : shailendra
******************/
const appReducer = combineReducers({
  ui,
  auth,
});

export default appReducer;
