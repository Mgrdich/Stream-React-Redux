import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel'
import pic1 from './02explication-01-01.jpg'
import {connect} from "react-redux";
import {fetchStream} from "../../actions";



class Pics extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    if (this.props.isSignedIn) {
      const {index, direction} = this.state;

      return (
          <div style={{width: 800, height: 1000}} className="container">
            <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
            >
              <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={pic1}
                    alt="First slide"
                />

              </Carousel.Item>
              <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={pic1}
                    alt="Third slide"
                />


              </Carousel.Item>
              <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={pic1}
                    alt="Third slide"
                />

              </Carousel.Item>
            </Carousel>
          </div>
      );
    } else return(<div>Sign in to see the Picture</div>);
  }


}
const mapStatetoProps = (state ) => {
  return {
    isSignedIn: state.authReducer.isSignedIn
  }
};
export default connect(mapStatetoProps)(Pics) ;

