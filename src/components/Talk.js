import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handle_character_update, handle_current_room, handle_transition, handle_battle } from '../actions/index';

import Main from './Main';
import Battle from './Battle';

import '../css/Talk.css';

class Talk extends Component {
  state = {
    option: 'first',
    display: [],
    xp: 0,
    removed: [],
    options: [],
    objects: [],
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

  elements = (id = null, next = this.state.option) => {
    let display = this.props.talk.action[next];
    let index = -1;
    let flag = false;
    display = display.filter((option, i) => {
      console.log(option, option.id, option.id === 11);
      if (id) {
        if (option.id === 11) {
          flag = true;
          return option;
        } else if (option.id === Number(id) || option.id === 10 || Number(id) === 10) {
          if (option.id === 10) index = i;
          return option;
        }
        return null;
      } else {
        return option;
      }
    });
    console.log(index);
    console.log(display);
    if (index > -1 && flag === true) {
      display.splice(index, 1);
    }
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
                    : this.updateDisplay.bind(this, element)
                  : null
              }>
              {element.remove ? this.handleRemove(element) : null}
              {element.hasOwnProperty('giveXP') ? this.handleCharacter() : null}
              {element.value}
            </element.type>
          );
        })}
      </div>
    );
  };

  initializeDisplay = () => {
    let elements = this.elements();
    let display = [elements];
    this.setState({ display, option: 'second' });
  };

  updateDisplay = (element, event) => {
    let xp = this.state.xp;
    if (element.giveXP) xp += 1;
    this.setState({ option: element.next });
    let elements = this.elements(event.target.id, element.next);
    let display = [elements];
    this.setState({ display, option: element.next, xp });
    if (element.transition) this.props.handle_battle(Battle, this.props.currentRoom.bonusOpponent);
  };

  handleRemove = element => {
    let currentRoom = this.props.currentRoom;
    let objects = currentRoom.objects;
    let options = currentRoom.options;
    element.remove.forEach(remove => {
      if (remove.type === 'option') {
        options = options.filter(option => {
          return option.type !== remove.name;
        });
      } else {
        objects = objects.filter(object => {
          return object.name !== remove.name;
        });
      }
    });
    objects.map(object => {
      if (object.name === element.add) {
        object.visible = true;
        return object;
      }
      return object;
    });
    this.props.handle_current_room({ ...currentRoom, objects, options });
  };

  handleReturn = (element, event) => {
    this.handleCharacter();
    this.props.handle_transition(Main);
  };

  handleCharacter = () => {
    let xp = this.props.character.xp + this.state.xp;
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
  { handle_character_update, handle_current_room, handle_transition, handle_battle },
)(Talk);
