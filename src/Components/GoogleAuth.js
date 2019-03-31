import React, { Component } from "react";
import { connect } from "react-redux";
import { SignIn, SignOut } from "../actions";

class GoogleAuth extends Component {
  /* state = {
    isSignedIn: null
    //here only the isSignedIn only the GoogleAuth knows
    //if we give it to redux so other components
  };
*/
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1074752245020-5agc6singu9cg9d40menfc3h6elo8mbu.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = IsSign => {
    if (IsSign) {
      //by signing in he will give us his google id
      this.props.SignIn(this.auth.currentUser.get());
    } else {
      this.props.SignOut();
    }
  };
  handleSignIn = () => {
    this.auth.signIn();
  };
  handleSignOut = () => {
    this.auth.signOut();
  };
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return <i className="fas fa-spinner" />;
    } else if (this.props.isSignedIn)
      return (
        <button className="btn btn-danger" onClick={this.handleSignOut}>
          <i className="fab fa-google" /> Sign Out
        </button>
      );
    else
      return (
        <button
          className="btn btn-danger btn-large"
          onClick={this.handleSignIn}
        >
          <i className="fab fa-google" /> Sign In
        </button>
      );
  }
  render() {
    //console.log(this.props);
    return <div>{this.renderAuthButton()}</div>;
  }
}
const mapStateToProps = state => {
  return { isSignedIn: state.authReducer.isSignedIn };
};

export default connect(
  mapStateToProps,
  { SignIn, SignOut }
)(GoogleAuth);
