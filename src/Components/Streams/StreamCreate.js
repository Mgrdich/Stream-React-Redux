import React, { Component } from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends Component {
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };
  render() {
    // console.log(this.props);

    return (
      <>
        <h3 className="backk">Create Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </>
    );
  }
}

export default connect(
  null,
  { createStream }
)(StreamCreate);
