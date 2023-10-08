import fetch from "isomorphic-unfetch";

import { API_URL } from "../config/index"; // project configuration file
import store from "../store"; // Access redux store data
import { toggleLoader } from "../store/actions";
import { alertDialogue, getLocalStorage } from "../utils/index";
import axios from "axios";
const getToken = () => {
  return getLocalStorage("accessToken");
};

/** *****************
 @purpose : Convert Responce to JSON
 @Parameter : {response, status}
 @Author : shailendra
 ******************/
const makeJson = async (response, status) => {
  const json = response.json
    ? await response.json()
    : (await response?.response?.data) || (await response);
  return Promise.resolve({ ...json, statusCode: status });
};
/** *****************
 @purpose : API Responce Handler
 @Parameter : {loader}
 @Author : shailendra
 ******************/
const responseHandler = (loader) => (res) => {
  const promise = makeJson(res, res.status || res?.response?.status);
  promise
    .then((response) => {
      loader && store.dispatch(toggleLoader(false, loader));
      return response;
    })
    .catch(() => {
      // alertDialogue("Something Went Wrong ...");
    });
  return promise;
};
/** *****************
 @purpose : API Request Header Types
 @Parameter : {}
 @Author : shailendra
 ******************/
const getHeader = () => ({
  "Content-Type": "application/json",
  "access-control-allow-origin": "*"

  // Authorization: "Bearer " + getToken(),
});

/** *****************
 @purpose : Fetch Get API
 @Parameter : {data}
 @Author : shailendra
 ******************/
export const get = (...data) => {
  const [url, loader = "page"] = data;
  loader && store.dispatch(toggleLoader(true, loader));
  return fetch(`${API_URL}/${url}`, {
    method: "get",
    headers: getHeader(),
    credentials: 'include' 
  })
    .then(responseHandler(loader))
    .catch(responseHandler(loader));
};
/** *****************
 @purpose : Fetch Post API
 @Parameter : {data}
 @Author : shailendra
 ******************/
export const post = (...data) => {
  const [url, body, loader = "page"] = data;
  loader && store.dispatch(toggleLoader(true, loader));
  return fetch(`${API_URL}/${url}`, {
    method: "POST",
    headers: getHeader(),
    body: JSON.stringify(body),
  })
    .then(responseHandler(loader))
    .catch(responseHandler(loader));
};
/** *****************
 @purpose : Fetch Put API
 @Parameter : {data}
 @Author : shailendra
 ******************/
export const put = (...data) => {
  const [url, body, loader = "page"] = data;
  loader && store.dispatch(toggleLoader(true, loader));
  return fetch(`${API_URL}/${url}`, {
    method: "put",
    headers: getHeader(),
    body: JSON.stringify(body),
  })
    .then(responseHandler(loader))
    .catch(responseHandler(loader));
};
/** *****************
 @purpose : Fetch Delete API
 @Parameter : {data}
 @Author : shailendra
 ******************/
export const remove = (...data) => {
  const [url, body, loader = "page"] = data;
  loader && store.dispatch(toggleLoader(true, loader));
  return fetch(`${API_URL}/${url}`, {
    method: "delete",
    headers: getHeader(),
    body: JSON.stringify(body),
  })
    .then(responseHandler(loader))
    .catch(responseHandler(loader));
};
/** *****************
 @purpose : Fetch Patch API
 @Parameter : {data}
 @Author : shailendra
 ******************/
export const patch = (...data) => {
  const [url, body, loader = "page"] = data;
  return fetch(`${API_URL}/${url}`, {
    method: "patch",
    headers: getHeader(),
    body: JSON.stringify(body),
  })
    .then(responseHandler(loader))
    .catch(responseHandler(loader));
};
/** *****************
 @purpose : Fetch Patch API
 @Parameter : {data}
 @Author : shailendra
 ******************/
export const image = (...data) => {
  const [url, body, loader = "page"] = data;
  loader && store.dispatch(toggleLoader(true, loader));

  return axios.post(`${API_URL}/${url}`, body, {
    // headers: getHeader(),
    headers: {'Content-Type': 'multipart/form-data'}
    // body: JSON.stringify(body),
  })
    .then(responseHandler(loader))
    .catch(responseHandler(loader));
};
