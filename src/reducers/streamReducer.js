import _ from 'lodash'
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "../actions/types";

//because in our state every stream has it specific key so deleting a that key means deleting that stream
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:{
      return {...state,..._.mapKeys(action.payload,'id')} //this is done so later you can pick more easily and when
      //converting to array you will have no problem
    }
    case FETCH_STREAM: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case CREATE_STREAM: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case EDIT_STREAM: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case DELETE_STREAM: {
     return _.omit(state,action.payload)
    }
    default:
      return state;
  }
};
