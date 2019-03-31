import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
      if(!this.props.SelectedStream){
          return <i className="fas fa-spinner" />
      }
    return (
        <>
            <div className="card mt-5 col-3">
                    <div className="card-body">
                        <div className="card-title font-weight-bold">{this.props.SelectedStream.title}</div>
                        <p className="card-text">{this.props.SelectedStream.description}</p>
                    </div>
            </div>
        </>
    );
  }
}
const mapStatetoProps = (state , ownProps) => {
  return {
        SelectedStream:state.STreams[ownProps.match.params.id]
  }
};
export default connect(mapStatetoProps,{ fetchStream })(StreamShow);
