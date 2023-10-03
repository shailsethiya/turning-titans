import * as types from "../actions/Types";

/** ***************** 
@purpose : Intital ui reducer data
@Author : shailendra
******************/
const initialState = {
  isLoad: false,
  loaders: {
    page: false,
  },
  messages: [],
  modals: {
    form_modal: false,
    add_section:false
  },
};

/** ***************** 
@purpose : UI Reducer
@Parameter : {uiInitData, action}
@Author : shailendra
******************/
export default function ui(uiInitData = initialState, action = {}) {
  switch (action.type) {
    // Set Various Custom Redux Key Data /
    case types.SET_UI_KEY:
      return Object.assign({}, uiInitData, {
        [action.key]: action.data,
      });
    // Show Alert Notification .
    case types.SHOW_ALERT: {
      const tempMessages = Object.assign([], uiInitData.messages);
      tempMessages.push({
        text: action.text,
        level: action.level,
        timeout: action.timeout,
      });
      return Object.assign({}, uiInitData, {
        messages: tempMessages,
      });
    }
    // Remove Alert Notification
    case types.REMOVE_ALERT:
      return Object.assign({}, uiInitData, {
        messages: [],
      });
    // Set Page Loader
    case types.TOGGLE_LOADER: {
      const loaders = Object.assign({}, uiInitData.loaders);
      loaders[action.key] = action.value;
      return Object.assign({}, uiInitData, {
        loaders,
      });
    }
    // Open/Close Modal
    case types.TOGGLE_MODAL: {
      const modals = Object.assign({}, uiInitData.modals);
      modals[action.key] = action.value;
      return Object.assign({}, uiInitData, {
        modals,
      });
    }
    default:
      return uiInitData;
  }
}
