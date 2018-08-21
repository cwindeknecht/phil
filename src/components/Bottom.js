import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Bottom.css';

import parchment from '../imgs/parchment.jpg';

var parchmentBackground = {
  backgroundImage: `url(${parchment})`
};

class Bottom extends Component {
  render() {
    return (
      <div style={ parchmentBackground } className="BottomContainer">
        {this.props.currentRoom.name}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.current,
    currentRoom: state.currentRoom,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Bottom);
