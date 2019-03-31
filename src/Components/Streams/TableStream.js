import React, { Component } from "react";
import Table from "../Reusable/Table";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";
import Pagination from "../Reusable/Pagination";
import { paginate } from "../../utility/paginate";
import SearchBar from "../Reusable/SearchBar";
import {SimplifyByReg} from "../../utility/SearchRegExp";

class TableStream extends Component {
  //this table stream will come with pagination
  state = {
    PageSize: 4,
    currentpage: 1,
    search: ""
  };

  componentDidMount() {
    this.props.fetchStreams();
  }
  renderCreateStreamB() {
    if (this.props.isSignedIn) {
      return (
        <Link to="streams/new">
          <button className="btn btn-dark btn-lg m-5">Create Stream</button>
        </Link>
      );
    }
  }
  columns = [
    {
      label: "Title",
      key: "Link",
      content: stream => (
        <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
      )
    },
    { path: "description", label: "Description" },
    {
      key: "Buttons",
      content: stream => {
        if (stream.userId === this.props.currentUserId)
          return (
            <Link to={`/streams/delete/${stream.id}`}>
              <button className="btn btn-danger btn-sm">Delete</button>
            </Link>
          );
      }
    },
    {
      key: "Buttons1",
      content: stream => {
        if (stream.userId === this.props.currentUserId)
          return (
            <Link to={`/streams/edit/${stream.id}`}>
              <button className="btn btn-dark btn-sm">Edit</button>
            </Link>
          );
      }
    }
  ];
  handlePageChange = page => {
    this.setState({ currentpage: page });
  };

  GetPageData() {
    //the ultimate function for what we are giving to our table to render on the table
    const { search } = this.state;
    const { streams } = this.props;
    const { currentpage, PageSize } = this.state;
    if (!search) {
      return paginate(streams, currentpage, PageSize);
    }
    else {
      const RecievedArray = SimplifyByReg(streams,search);
      //console.log("i am finally arrived");
      return RecievedArray;
    }
  }
  handleSearchChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value});
  };
  render() {
  //  console.log(this.state.search); //this proves that we already fetched the data from rhe rest API
    const { streams } = this.props;
    this.GetPageData();
    return (
      <div className="container">
        <SearchBar onChange={this.handleSearchChange}/>
        <Table columns={this.columns} data={this.GetPageData()} />
        <Pagination
          itemsCount={streams.length}
          PageSize={this.state.PageSize}
          onPageChange={this.handlePageChange}
          currentPage={this.state.currentpage}
        />
        {this.renderCreateStreamB()}
      </div>
    );
  }
}


const mapStatetoProps = state => {
  return {
    streams: Object.values(state.STreams), //converting the object to array
    isSignedIn: state.authReducer.isSignedIn,
    currentUserId: state.authReducer.userId
  };
};
export default connect(
  mapStatetoProps,
  { fetchStreams }
)(TableStream);
