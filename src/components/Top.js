import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Top.css';

import character from '../imgs/clickables/CharacterSheet.png'

import { handle_transition } from '../actions/index';

import CharacterSheet from './CharacterSheet';

let sheet = {
  backgroundImage: `url(${character})`,
};

class Top extends Component {
  render() {
    return (
      <div className="TopContainer">
        <div className="TopText">{this.props.currentRoom.initialTopBar}</div>
        <div style={sheet} className="TopSheet" onClick={this.handleCharacterView} />
      </div>
    );
  }
  handleCharacterView = () => {
    this.props.handle_transition(CharacterSheet);
  }
}

const mapStateToProps = state => {
  return {
    currentRoom: state.currentRoom,
  };
};

export default connect(
  mapStateToProps,
  { handle_transition },
)(Top);
