import * as types from "./Types"; // Redux actions payload types

/** ****************** 
@purpose : Used for store user info 
@Parameter : { }
@Author : shailendra
******************/
export const setUserInfo = (data) => ({
  type: types.SET_USER_INFO,
  data,
});
