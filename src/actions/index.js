import {
  SIGN_OUT,
  SIGN_IN,
  CREATE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS
} from "./types";
import history from '../History'
import streams from "../apis/streams";

export const SignIn = GoogleId => {
  return {
    type: SIGN_IN,
    payload: {
      //remeber in video is different
      id: GoogleId
    }
  };
};
export const SignOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => {
  return async (dispatch, getState) => {
    const { userId } = getState().authReducer;
    const response = await streams.post("/streams", { ...formValues, userId }); //giving the form values so in order the
    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/');//to change it
    //after succesful input navigate
  };
};

export const fetchStreams = () => {
  return async dispatch => {
    //the async action creator
    const response = await streams.get("/streams"); //to get the array

    dispatch({ type: FETCH_STREAMS, payload: response.data });
  };
};

export const fetchStream = id => {
  return async dispatch => {
    const response = await streams.get(`/streams/${id}`); //to get the array
    dispatch({ type: FETCH_STREAM, payload: response.data });
  };
};

export const editStream = (id, formValues) => {
  return async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
  };
};

export const deleteStream = id => {
  return async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id });
 //   history.push('/');
  };
};
