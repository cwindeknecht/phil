import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Start.css';

import { handle_transition } from '../actions/index';

import parchment from '../imgs/parchment.jpg';

import CharacterSheet from '../components/CharacterSheet'

var parchmentBackground = {
  backgroundImage: `url(${parchment})`,
};

class Start extends Component {
  render() {
    return (
      <div style={parchmentBackground} className="start">
        <div className="start__body">
          <div className="start__body__title">Kant, the Paladin</div>
          <button className="start__body__button" onClick={this.handleTransition}>
            Start
          </button>
        </div>
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
