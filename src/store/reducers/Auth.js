import * as types from "../actions/Types";

/** ***************** 
@purpose : Intital user reducer data
@Author : shailendra
******************/
const initialState = {
  userToken: {},
  userInfo: {},
};
/** ***************** 
@purpose : ui reducer
@Parameter : {userInitData, action}
@Author : shailendra
******************/
const user = (userInitData = initialState, action = {}) => {
  switch (action.type) {
    // Set user authorized token
    case types.SET_TOKEN:
      return Object.assign({}, userInitData, {
        token: action.tokens?.access,
        refresh_token: action?.tokens?.refresh,
      });
    // Remove user authorized token
    case types.LOGOUT_USER:
      return Object.assign({}, userInitData, {
        token: false,
        refresh_token: false,
      });
    // Set login user information
    case types.SET_USER_INFO:
      return Object.assign({}, userInitData, {
        userInfo: { ...userInitData.data, ...action.data },
      });
    default:
      return userInitData;
  }
};

export default user;
