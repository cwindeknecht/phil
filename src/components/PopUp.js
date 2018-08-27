import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handle_current_room, handle_object_visibility } from '../actions/index';

import '../css/PopUp.css';

class PopUp extends Component {
  render() {
    let item = this.props.item;
    return (
      <div
        className="PopUpContainer"
        style={{
          left: this.props.x,
          top: this.props.y,
          width: item.clicked.width,
          height: item.clicked.height,
        }}>
        {item.clicked.text}
        {item.clicked.options ? this.populatePopup(item) : ''}
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
              onClick={this.handleChoice.bind(this, option.action)}>
              {option.text}
            </button>
          );
        })}
      </div>
    );
  };

  handleChoice = (action, event) => {
    if (action) {
      action.type.forEach((act, i) => {
        switch (act) {
          case 'transition':
            this.props.handle_current_room(action.location);
            break;
          case 'visible':
            // figure this shit out
            this.props.handle_object_visibility(this.props.currentRoom, action.affects[i], action.topBar);
            break;
          // case 'inventory':
          //   // figure this shit out
          //   this.props.handle_inventory_update();
          //   break;
          default:
            console.log('nope');
        }
      });
    }
    this.props.close(event);
  };
}

const mapStateToProps = state => {
  return {
    currentRoom: state.currentRoom,
  };
};

export default connect(
  mapStateToProps,
  { handle_current_room, handle_object_visibility },
)(PopUp);
