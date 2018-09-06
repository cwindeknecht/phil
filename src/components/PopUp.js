import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handle_current_room, handle_object_visibility, handle_inventory_update, handle_talk } from '../actions/index';

import '../css/PopUp.css';

import Talk from './Talk';

class PopUp extends Component {
  render() {
    let item = this.props.item;
    return (
      <div
        className="PopUpContainer"
        style={{
          left: this.props.x,
          top: this.props.y,
          width: item.clicked.width < 50 ? '50%' : item.clicked.width + '%',
          height: item.clicked.height < 20 ? '20%' : item.clicked.height + '%',
        }}>
        {item.clickable === false ? item.unclickable : item.clicked.text}
        {item.clicked.options && item.clickable !== false ? this.populatePopup(item) : ''}
      </div>
    );
  }
  populatePopup = item => {
    return (
      <div className="PopUpOptions">
        {item.clicked.options.map((option, i) => {
          return (
            <button
              className="PopUpButton"
              key={i}
              data-option={option}
              id={item.id}
              onClick={this.handleChoice.bind(this, option.action, option.id)}>
              {option.text}
            </button>
          );
        })}
      </div>
    );
  };

  handleChoice = (action, id, event) => {
    if (action) {
      action.type.forEach((act, i) => {
        switch (act) {
          case 'transition':
            this.props.handle_current_room(action.location);
            break;
          case 'visible':
            this.props.handle_object_visibility(this.props.currentRoom, action.affects[i], action.topBar);
            break;
          case 'inventory':
            this.props.handle_inventory_update(
              this.props.character,
              this.props.currentRoom,
              action.affects[i],
              action.topBar,
              action.link,
            );
            break;
          case 'talk':
            this.props.handle_talk(Talk, this.props.currentRoom, id);
            break;
          default:
            break;
        }
      });
    }
    this.props.close(event);
  };
}

const mapStateToProps = state => {
  return {
    currentRoom: state.currentRoom,
    character: state.character,
  };
};

export default connect(
  mapStateToProps,
  { handle_current_room, handle_object_visibility, handle_inventory_update, handle_talk },
)(PopUp);
