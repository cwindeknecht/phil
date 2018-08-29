import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Top.css';

import character from '../imgs/clickables/CharacterSheet.png';

import { handle_transition } from '../actions/index';
import CharacterSheet from './CharacterSheet';

let sheet = {
  backgroundImage: `url(${character})`,
};

class Top extends Component {
  render() {
    let philosophyText = `https://www.earlymoderntexts.com/assets/pdfs/kant1785.pdf#page=${this.props.pageNumber}`;
    return (
      <div className="TopContainer">
        <div className="TopText">{this.props.currentRoom.topBar}</div>
        {this.props.link ? (
          <a href={philosophyText} target="_blank" className="TopLink">
            See p.
            {this.props.pageNumber}
          </a>
        ) : (
          <div className="TopLink" style={{ opacity: '0' }} />
        )}
        <div style={sheet} className="TopSheet" onClick={this.handleCharacterView} />
      </div>
    );
  }

  handleCharacterView = () => {
    this.props.handle_transition(CharacterSheet);
  };
}

const mapStateToProps = state => {
  return {
    currentRoom: state.currentRoom,
    link: state.link,
    pageNumber: state.pageNumber,
  };
};

export default connect(
  mapStateToProps,
  { handle_transition },
)(Top);
