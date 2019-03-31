import React from "react";
import ReactDOM from "react-dom";
// import history from '../History'

//remember that we made an reuseable
const Modal = props => {
  return ReactDOM.createPortal(
      <div onClick={props.onDismiss} className="ui dimmer modals visible active fontify">
      <div onClick={(e)=>e.stopPropagation()} className="ui standard visible active w-25 h-25">
          <div className="card">
              <div className="card-header fontifyr">
                  {props.title}
              </div>
              <div className="card-body">
                  <p className="card-text">{props.content}</p>
                  {props.actions}
              </div>
          </div>
      </div>
  </div>
      , document.getElementById("modal"));
};

export default Modal;

