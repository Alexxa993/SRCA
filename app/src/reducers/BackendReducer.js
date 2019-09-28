import { BackendAction } from "../actions/BackendActions";

export const BackendReducer = (state = {}, action) => {
  switch (action.type) {
    case BackendAction.GET_COMPONENTS:
      return Object.assign({}, state, {
        components: action.payload.components,
        loggedInUser: action.payload.loggedInUser
      });
    case BackendAction.GET_COMPONENT:
      return Object.assign({}, state, {
        component: action.payload
      });
    default:
      return state;
  }
};
