import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Bottom.css';

import parchment from '../imgs/parchment.jpg';

import { handle_intro } from '../actions/index.js';

import PopUp from './PopUp';

var parchmentBackground = {
  backgroundImage: `url(${parchment})`,
};

class Bottom extends Component {
  state = {
    objects: this.props.currentRoom.objects,
    popups: [],
    mouseX: null,
    mouseY: null,
  };

  componentDidMount = () => {
    this.handleInitial();
    this.getObjectsXY();
    window.addEventListener('resize', this.getObjectsXY.bind(this));
  };

  render() {
    document.addEventListener('click', this.mousePosition);
    return (
      <div id="Container" style={parchmentBackground} className="BottomContainer">
        {this.props.intro ? (
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
        ) : (
          this.state.objects.map(item => {
            if (item.visible === true) {
              return (
                <img
                  id={item.id}
                  key={item.name}
                  className={item.clicked ? 'Clickable' : ''}
                  src={item.image}
                  style={{ position: 'absolute', left: item.x, top: item.y, zIndex: item.z }}
                  onClick={this.handlePopup}
                />
              );
            }
          })
        )}
        {this.state.popups.map(object => {
          if (object.clicked.show) {
            return (
              <div>
                <PopUp
                  item={object}
                  func={this.handlePopup}
                  x={this.state.mouseX}
                  y={this.state.mouseY}
                />
              </div>
            );
          }
        })}
      </div>
    );
  }

  // Probably a better way to do this, but this is where
  // I make sure that no matter someone's screen size, the objects are placed correctly.
  getObjectsXY = () => {
    let updatedObjects = this.state.objects.map(obj => {
      if (typeof obj.x !== 'number') {
        let updateClickable = this.state.objects.filter(object => {
          return object.name === obj.x[0];
        })[0];
        if (updateClickable.related.type === 'single') {
          return {
            ...obj,
            x: updateClickable.related.x1 + updateClickable.x,
            y: updateClickable.related.y1 + updateClickable.y,
          };
        } else {
          let xKey = 'x' + obj.x[1];
          let yKey = 'y' + obj.y[1];
          return {
            ...obj,
            x: updateClickable.related[xKey] + updateClickable.x,
            y: updateClickable.related[yKey] + updateClickable.y,
          };
        }
      } else {
        return { ...obj, x: (window.innerWidth - obj.width) / 2, y: obj.y };
      }
    });

    this.setState({ objects: updatedObjects });
  };

  handleInitial = () => {
    let popups = this.props.currentRoom.objects.filter(object => {
      if (object.clicked) {
        object.clicked.show = false;
        return object;
      }
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

  mousePosition = event => {
    this.setState({ mouseX: event.clientX, mouseY: event.clientY });
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
