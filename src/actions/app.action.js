import {
    APP_SAVE_FORCE_UPDATE
  } from "../constants";
  
  
  const setStateToAppForceUpdate = payload => ({
    type: APP_SAVE_FORCE_UPDATE,
    payload: payload
  });
  
  
  export const appForceUpdate = (callback) => {
    return dispatch => {
      dispatch(setStateToAppForceUpdate(callback));  
    };
  };