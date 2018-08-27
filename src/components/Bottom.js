import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Bottom.css';

import { handle_intro } from '../actions/index.js';

import PopUp from './PopUp';

class Bottom extends Component {
  state = {
    objects: this.props.currentRoom.objects,
    popups: [],
    // make another component for sedentary objects like examine/talk/etc.
    roomOptions: [],
    mouseX: null,
    mouseY: null,
  };

  componentDidMount = () => {
    this.handleInitial();
  };

  componentDidUpdate = prevState => {
    if (this.state.objects !== this.props.currentRoom.objects && !this.props.intro) {
      this.setState({ objects: this.props.currentRoom.objects });
      this.handleInitial();
    }
  };

  render() {
    document.addEventListener('click', this.mousePosition);
    console.log("this.props.currentRoom",this.props.currentRoom)
    return (
      <div id="Container" className="BottomContainer">
        {this.props.intro ? this.getIntro() : this.getBottom()}
      </div>
    );
  }

  getIntro = () => {
    return (
      <div className="BottomIntro">
        <div className="BottomIntroTitle">Intro</div>
        <div className="BottomIntroBody">
          {' '}
          You are a villager and your village is under attack.
          <br />
          <br />
          To help defend it, you have left in search of an ancient artifact --- the Categorical
          Imperative.
          <br />
          <br />
          Your search has brought you to the resting place of a great hero: Kant, the Paladin.
        </div>
        <button className="BottomIntroButton" onClick={this.handleIntro}>
          Continue
        </button>
      </div>
    );
  };

  getBottom = () => {
    return (
      <div>
        {this.props.currentRoom.objects.map(item => {
          if (item.visible === true) {
            {console.log("item in map",item)}
            return (
              <img
                alt={item.name}
                id={item.id}
                key={item.name}
                className={item.clicked ? 'Clickable' : ''}
                src={item.image}
                style={{ position: 'absolute', left: item.x, top: item.y, zIndex: item.z }}
                onClick={this.handlePopup}
              />
            );
          }
          return null;
        })}
        {this.state.popups.map(object => {
          if (object.clicked.show) {
            return (
              <div key={object.name}>
                <PopUp
                  item={object}
                  close={this.closePopUp}
                  x={this.state.mouseX}
                  y={this.state.mouseY}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  handleInitial = () => {
    let popups = this.props.currentRoom.objects.filter(object => {
      if (object.clicked) {
        object.clicked.show = false;
        return object;
      }
      return null;
    });
    this.setState({ popups });
  };

  handleIntro = () => {
    this.props.handle_intro();
  };

  handlePopup = event => {
    let popups = this.state.popups.map(object => {
      if (object.id === Number(event.target.id)) {
        object.clicked.show = true;
        return object;
      }
      return object;
    });
    this.mousePosition(event);
    this.setState({ popups });
  };

  closePopUp = event => {
    let popups = this.state.popups.map(object => {
      if (object.id === Number(event.target.id)) {
        object.clicked.show = false;
        return object;
      }
      return object;
    });
    this.setState({ popups });
  };

  mousePosition = event => {
    this.setState({ mouseX: event.clientX, mouseY: event.clientY });

    //figure out all the object coords that are clickable, then call closepopup if not in those coords.
  };
}

const mapStateToProps = state => {
  return {
    current: state.current,
    currentRoom: state.currentRoom,
    intro: state.intro,
  };
};

export default connect(
  mapStateToProps,
  { handle_intro },
)(Bottom);
