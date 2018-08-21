import React, { Component } from 'react';
import { connect } from 'react-redux';

import './css/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <this.props.current />
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
