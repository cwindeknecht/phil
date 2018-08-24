import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Start.css';

import { handle_transition } from '../actions/index';

import CharacterSheet from '../components/CharacterSheet';

import parchment from '../imgs/parchment.jpg';

var parchmentBackground = {
  backgroundImage: `url(${parchment})`,
};

class Start extends Component {
  render() {
    return (
      <div style={parchmentBackground} className="StartContainer">
        <div className="StartBody">
          <div className="StartTitle">Kant, the Paladin</div>
          <button className="StartButton" onClick={this.handleTransition}>
            Start
          </button>
        </div>
        <div className="StartFooter">v 1.0 </div>
      </div>
    );
  }
  handleTransition = () => {
    this.props.handle_transition(CharacterSheet);
  };
}

const mapStateToProps = (state) => {
  return {
    current: state.current,
    currentRoom: state.currentRoom,
  };
};

export default connect(
  mapStateToProps,
  { handle_transition },
)(Start);
