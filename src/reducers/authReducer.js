import {SIGN_OUT,SIGN_IN} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId:null
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId:action.payload.id.El //this was missing so it was showing the whole userId and when inputing it was show whole array
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId:null
      };
    default:
      return state;
  }
};


