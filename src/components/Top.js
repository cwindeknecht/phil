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
    console.log('yup', this.props.pageNumber);
    let philosophyText = `https://www.earlymoderntexts.com/assets/pdfs/kant1785.pdf#page=${this.props.pageNumber}`;
    return (
      <div className="TopContainer">
        <div className="TopText">
          {this.props.currentRoom.topBar}
          <br />
          {this.props.link ? (
            <a href={philosophyText} target="_blank">
              See p.
              {this.props.pageNumber}
            </a>
          ) : (
            ''
          )}
        </div>
        <div style={sheet} className="TopSheet" onClick={this.handleCharacterView} />
      </div>
    );
  }
  // handlePage = () => {
  //   document.getElementById('page-indicator').style.top('317.741')
  // }

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
