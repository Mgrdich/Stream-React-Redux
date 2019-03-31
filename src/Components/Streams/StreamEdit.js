import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

class StreamEdit extends Component {
  componentDidMount() {
    //this component fetchStream works for local state
    this.props.fetchStream(this.props.match.params.id);
  }
  onSubmit = formValues => {
   // console.log(formValues);
    this.props.editStream(this.props.match.params.id, formValues);
  };
  render() {
    // console.log(this.props);
    if (!this.props.SelectedStream) return <div>Loading...</div>;
    const { SelectedStream } = this.props;
    return (
      <>
        <h3 className="backk">Edit Stream</h3>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(SelectedStream, "title", "description")} //which will look to the names
        />
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  return {
    //because of the fetch stream above that is way it is always outputing
    //since it will always update the STream state to pur desired one
    SelectedStream: state.STreams[ownProps.match.params.id]
  };
};
export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
