import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import NavBar from './components/Navbar.js';
import Main from './components/Main.js';
import Adventure from './components/Adventure.js';

class App extends Component {
  render() {
    return (
      <div>
      <NavBar />
      {/* <Main /> */}
      <Adventure />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.current,
  };
};

export default connect(
  mapStateToProps,
  null,
)(App);
