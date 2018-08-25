import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handle_current_room } from '../actions/index';

import * as rooms from '../reducers/rooms';

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
        {item.clicked.options ? (
          <div className="PopUpOptions">
            {item.clicked.options.map((option, i) => {
              return (
                <button
                  className="PopUpButton"
                  key={i}
                  data-option={option}
                  id={item.id}
                  onClick={this.handleChoice.bind(this, option)}>
                  {option.text}
                </button>
              );
            })}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
  handleChoice = (option, event) => {
      console.log("option",option)
      console.log("location",option.action.location)
    if ('action' in option) {
      switch (option.action.type) {
        case 'transition':
          this.props.handle_current_room(rooms[option.action.location]);
          break;
        default:
          console.log('nope');
      }
    }
    this.props.close(event);
  };
}

const mapStateToProps = state => {
  return { state };
};

export default connect(
  mapStateToProps,
  { handle_current_room },
)(PopUp);
