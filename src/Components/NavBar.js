import React from "react";
import { NavLink } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand fontify" to="/">
          MgoStream
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item nav">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/streams/picture">
              Pictures
            </NavLink>
          </li>
          </ul>
          <span className="navbar-text">
            <NavLink className="nav-link" to="/">
              <GoogleAuth/>
            </NavLink>
          </span>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
