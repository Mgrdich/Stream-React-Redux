/*
import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter} from "mdbreact";

const FooterPage = () => {
  return (
      <MDBFooter color="stylish-color-dark" className="font-small pt-4  bg-dark fontifyw">
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow>
            <MDBCol >
              <p>
                Happy Browsing :)
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Mgrdich Minasain
          </MDBContainer>
        </div>
      </MDBFooter>
  );
};

export default FooterPage;*/

import React from "react";

const Footer = () => {
  return (

      <footer className="footer bg-dark">
        Happy Browsing :)
          <br/>
          <i className="fas fa-bezier-curve fa-1x"/>
        <div>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/Mgrdich">
                <i className="fab fa-github m-1 fa-2x" />
              </a>
            </li>
          </ul>
            <p>{new Date().getFullYear()} Mgrdich Minasain</p>
        </div>
      </footer>

  );
};

export default Footer;
