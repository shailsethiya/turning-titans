import { apiUrls } from "../../api/ApiUrls"; // API endpoint routes
import { get, post , image , remove } from "../../api/index"; // API Types
import {loginData} from  './mock.json';

import * as types from "./Types"; // Redux actions payload types

const { LOGIN , LISTING_PROPOSALS , ADD_PROPOSALS ,LOGOUT ,DELETE_PROPOSAL , DOWNLOAD_PROPOSAL , PERVIEW_PROPOSAL } = apiUrls;

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

/** ******************
 @purpose : Used for list propsol 
 @Parameter : { loader, data }
 @Author : shailendra
 ******************/
 export const getListProposals = (loader) => (dispatch) => {
  return get(LISTING_PROPOSALS, loader).then((res) => {
    dispatch(setListingProp(res))
    return res;
  });
};
/** ******************
 @purpose : Used for set User token in redux 
 @Parameter : { data}
 @Author : shailendra
 ******************/
 export const setListingProp = (data) => ({
  type: types.SET_LISTING_PROPOSAL,
  data,
});
/** ******************
 @purpose : Used for add list propsol 
 @Parameter : { loader, data }
 @Author : shailendra
 ******************/
 export const addProposals = (data, loader) => () => {
  return image(ADD_PROPOSALS, data, loader).then((res) => {
    return res;
  });
};

/** ******************
 @purpose : Used for list propsol 
 @Parameter : { loader, data }
 @Author : shailendra
 ******************/
 export const downloadProposals = (data , loader) => () => {
  return get(DOWNLOAD_PROPOSAL + data?.id, loader).then((res) => {
    // dispatch(setListingProp(res))
    return res;
  });
};
/** ******************
 @purpose : Used for list propsol 
 @Parameter : { loader, data }
 @Author : shailendra
 ******************/
 export const perviewProposal = (data , loader) => () => {
  return get(PERVIEW_PROPOSAL + data?.id, loader).then((res) => {
    return res;
  });
};
/** ******************
 @purpose : Used for list propsol 
 @Parameter : { loader, data }
 @Author : shailendra
 ******************/
 export const deleteProposals = (data , loader) => () => {
  return remove(DELETE_PROPOSAL + data?.id, loader).then((res) => {
    return res;
  });
};
/** ******************
 @purpose : Used for login 
 @Parameter : { loader, data }
 @Author : shailendra
 ******************/
 export const logout = (loader) => (dispatch) => {
  return get(LOGOUT, loader).then((res) => {
    console.log("logout res", res);
    return res;
  });
};