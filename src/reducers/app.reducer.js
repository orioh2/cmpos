import { APP_SAVE_FORCE_UPDATE } from "../constants";

const initialState = {
    appForceUpdate:null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case APP_SAVE_FORCE_UPDATE:
    return { ...state, appForceUpdate:payload }

  default:
    return state
  }
}
