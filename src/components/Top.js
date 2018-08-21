import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Top.css';

class Top extends Component {
  render() {
    return (
      <div className="TopContainer">
        Top
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
)(Top);
