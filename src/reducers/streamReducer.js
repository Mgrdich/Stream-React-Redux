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
     return Object.assign({...state
      },ArraykeyID(action.payload.data, "id")); //this is done so later you can pick more easily and when
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
     return DeleteProperty(state,action.payload);//since it will give us the id from the action Creator
    }
    default:
      return state;
  }
};
//it is also recommended to put this functions in the utility functions.
function ArraykeyID(array, key) {
  return array.reduce((acc, cur) => {
    acc[cur[key]] = cur;
    return acc;
  }, {});
}
function DeleteProperty(obj, key) { //it is like omit it deletes
  let ob = { ...obj };
  delete ob[key];
  return ob;
}
