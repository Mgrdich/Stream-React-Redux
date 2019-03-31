import React from "react";
//import { connect } from "react-redux";
//import { fetchStreams } from "../../actions";
//import { Link } from "react-router-dom";
import TableStream from "./TableStream";

class StreamList extends React.Component {
 /* componentDidMount() {
    this.props.fetchStreams(); //in the action creator which will give us an array of fetched data
  }*/
  /*renderAdminB(stream) {
    //console.log("this.props",this.props.currentUserId);
    if (stream.userId === this.props.currentUserId)
      //this props is coming from from the signned in user
      return (
        <div className="right floated content">
          <Link to={`/streams/delete/${stream.id}`}>
            <button className="btn btn-danger btn-md m-1">Delete</button>
          </Link>
          <Link to={`/streams/edit/${stream.id}`}>
            <button className="btn btn-dark btn-md">Edit</button>
          </Link>
        </div>
      );
  }
  renderStream() {

    const { streams } = this.props;
    //  console.log(streams);
    return streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdminB(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }
  renderCreateStreamB() {
    if (this.props.isSignedIn) {
      return (
        <Link to="streams/new">
          <button className="btn btn-dark btn-lg m-5">Create Stream</button>
        </Link>
      );
    }
  }*/

  render() {
    return (
      <>
          <TableStream/>
      </>
    );
  }
}
/*const mapStatetoProps = state => {
  return {
    streams: Object.values(state.STreams), //converting the object  values to array
    currentUserId: state.authReducer.userId,
    isSignedIn: state.authReducer.isSignedIn
  };
};*/
export default StreamList;