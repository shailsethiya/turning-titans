import { apiUrls } from "../../api/ApiUrls"; // API endpoint routes
import { post } from "../../api/index"; // API Types
import {loginData} from  './mock.json';

import * as types from "./Types"; // Redux actions payload types

const { LOGIN } = apiUrls;

/** ******************
 @purpose : Used for login 
 @Parameter : { loader, data }
 @Author : shailendra
 ******************/
export const login = (data, loader) => (dispatch) => {
  return post(LOGIN, data, loader).then((res) => {
    dispatch(setUserToken(res));
    return res;
  });
};

/** ******************
 @purpose : Used for set User token in redux 
 @Parameter : { data}
 @Author : shailendra
 ******************/
export const setUserToken = (data) => ({
  type: types.SET_TOKEN,
  data,
});
