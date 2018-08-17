import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Navbar.css';

import Home from '../imgs/Home.png';
import Profile from '../imgs/Profile.png';
import Admin from '../imgs/Admin.png';
import UTK from '../imgs/UTK.jpg';

class Navbar extends Component {
  render() {
    return (
      <div className="NavbarContainer">
        <div className="NavbarLeft">
          <img alt="Logo" className="NavbarLogo" src={this.props.showUTK ? UTK : this.props.navBarImage} />
        </div>
        <div className="NavbarRight">
          <div className="NavbarIcon">
            <img alt="Home" className="NavbarImages" src={Home} />
            <div className="NavbarText">Home</div>
          </div>
          {/* Keep track of Name, UTK ID, and grades on each adventure? */}
          <div className="NavbarIcon">
            <img alt="Profile" className="NavbarImages" src={Profile} />
            <div className="NavbarText">Profile</div>
          </div>
          <div className="NavbarIcon">
            <img alt="Admin" className="NavbarImages" src={Admin} />
            <div className="NavbarText"> Admin </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.current,
    showUTK: state.showUTK,
    navBarImage: state.navBarImage,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Navbar);
