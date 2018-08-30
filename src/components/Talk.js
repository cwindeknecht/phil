import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handle_character_update } from '../actions/index';

import '../css/Talk.css';

class Talk extends Component {
  state = {
    option: 'first',
    display: [],
  };
  componentDidMount = () => {
    this.initializeDisplay();
  };

  render() {
    return (
      <div className="talk">
        {this.state.display.map((element, i) => {
          return <div key={i}>{element}</div>;
        })}
      </div>
    );
  }

  elements = id => {
    let display = this.props.talk.action[this.state.option];
    display = display.filter(option => {
      if (id) {
        if (option.id === Number(id) || option.id === 0) {
          return option;
        }
      } else {
        return option;
      }
      return null;
    });
    return (
      <div className="talk__elements">
        {display.map((element, i) => {
          return (
            <element.type
              key={i}
              id={element.id}
              className={element.className}
              href={element.href}
              target={element.target}
              onClick={
                element.id
                  ? element.action === 'return'
                    ? this.handleReturn.bind(this, element)
                    : this.updateDisplay
                  : this.shit
              }>
              {console.log(element.action, element.value)}
              {element.remove ? this.handleRemove(element) : null}
              {element.hasOwnProperty('giveXP') ? this.handleCharacter() : null}
              {element.value}
            </element.type>
          );
        })}
      </div>
    );
  };
  shit = () => {
    console.log('shit happening')
  }

  initializeDisplay = () => {
    let elements = this.elements();
    let display = [elements];
    this.setState({ display, option: 'second' });
  };

  updateDisplay = event => {
    let elements = this.elements(event.target.id);
    let display = [elements];
    this.setState({ display, option: 'third' });
  };

  handleRemove = element => {
    console.log('remove', element.remove);
  };

  handleReturn = (element, event) => {
    console.log('return', element.return);
    if (element.xp === 1) this.handleCharacter();
  };

  handleCharacter = () => {
    let xp = this.props.character.xp + 1;
    let character = { ...this.props.character, xp };
    this.props.handle_character_update(character);
  };
}

const mapStateToProps = state => {
  return {
    character: state.character,
    currentRoom: state.currentRoom,
    talk: state.talk,
  };
};

export default connect(
  mapStateToProps,
  { handle_character_update },
)(Talk);
