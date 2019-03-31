import React from "react";
import Modal from "../Modal";
import history from "../../History";
import { fetchStream, deleteStream } from "../../actions";
import { connect } from "react-redux";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  actions = () => {
    //the cancel navigation can be done by link tag also
    const { id } = this.props.match.params;
    return (
      <>
        <button
          className="btn btn-sm btn-danger m-1"
          onClick={() => this.props.deleteStream(id)}
        >
          Delete
        </button>
        <button
          className="btn btn-sm btn-dark"
          onClick={() => history.push("/")}
        >
          Cancel
        </button>
      </>
    );
  };

  render() {
    if (!this.props.select) return <i className="fas fa-spinner" />;
    else {
      const st = `Are you sure you want to Delete (${
        this.props.select.title
      })?`;
      return (
        <>
          <Modal
            title="Delete Stream"
            content={st}
            actions={this.actions()}
            onDismiss={() => history.push("/")}
          />
        </>
      );
    }
  }
}
const mapStateToProps = (state, ownProps) => {
 // console.log(state.STreams);
  return {
    select: state.STreams[ownProps.match.params.id]
  };
};
export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
