import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Main.css';

import Top from './Top';
import Bottom from './Bottom';

import parchment from '../imgs/parchment.jpg';

var parchmentBackground = {
  backgroundImage: `url(${parchment})`,
};

class Main extends Component {
  render() {
    return (
      <div className="MainContainer" style={parchmentBackground}>
        {this.props.intro ? null : <Top />}
        <Bottom />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    intro: state.intro,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Main);
