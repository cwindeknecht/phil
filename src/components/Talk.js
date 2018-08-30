import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handle_character_update, handle_current_room, handle_transition } from '../actions/index';

import Main from './Main';

import '../css/Talk.css';

class Talk extends Component {
  state = {
    option: 'first',
    display: [],
    xp: 0,
    removed: [],
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
              // Everything in my gut tells me this is wrong, but it is working, so...
              onClick={
                element.id
                  ? element.id === 0
                    ? null
                    : this.updateDisplay.bind(this, element)
                  : this.handleReturn.bind(this, element)
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
  shit = (element, event) => {
    console.log('AND YET IT IS GOING TO SHIT', element);
  };

  initializeDisplay = () => {
    let elements = this.elements();
    let display = [elements];
    this.setState({ display, option: 'second' });
  };

  updateDisplay = (element, event) => {
    let xp = this.state.xp;
    if (element.giveXP) xp += 1;
    let elements = this.elements(event.target.id);
    let display = [elements];
    this.setState({ display, option: 'third', xp });
  };

  handleRemove = element => {
    let currentRoom = this.props.currentRoom;
    let removed = this.state.removed;
    let objects = this.props.currentRoom;
    let options = this.props.currentRoom;
    element.remove.forEach(rem => {
      console.log("REM",rem)
      if (!removed.includes(rem)) {
        removed.push(rem);
        if (rem.type === 'option') {
          options = currentRoom.options.filter(option => {
            return option.type !== rem.name
          })
        }
        else {
          objects = currentRoom.objects.filter(object => {
            return object.name !== rem.name;
          }).map(obj => {
            return obj.name === element.add ? {...obj, visible: true} : obj; 
          });
        }
      }
    })
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
  { handle_character_update, handle_current_room, handle_transition },
)(Talk);
