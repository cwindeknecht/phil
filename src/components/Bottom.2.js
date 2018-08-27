import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Bottom.css';

import * as rooms from '../reducers/rooms';

import { handle_intro, handle_object_update } from '../actions/index.js';

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
    this.getObjectsXY();
    window.addEventListener('resize', this.getObjectsXY.bind(this));
  };

  componentDidUpdate = prevState => {
    if (this.state.objects !== this.props.currentRoom.objects && !this.props.intro) {
      this.setState({ objects: this.props.currentRoom.objects });
    }
  };

  render() {
    document.addEventListener('click', this.mousePosition);
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

  // Probably a better way to do this, but this is where
  // I make sure that no matter someone's screen size, the objects are placed correctly.
  getObjectsXY = () => {
    let roomKeys = Object.keys(rooms);
    let roomArray = roomKeys
      .map(key => {
        return rooms[key];
      })
      .map(room => {
        let updatedObjects = room.objects.map(obj => {
          if (typeof obj.x !== 'number') {
            let updateClickable = room.objects.filter(object => {
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
        return {...room, objects:updatedObjects};
      });
    // let updatedObjects = this.props.currentRoom.objects.map(obj => {
    //   if (typeof obj.x !== 'number') {
    //     let updateClickable = this.props.currentRoom.objects.filter(object => {
    //       return object.name === obj.x[0];
    //     })[0];
    //     if (updateClickable.related.type === 'single') {
    //       return {
    //         ...obj,
    //         x: updateClickable.related.x1 + updateClickable.x,
    //         y: updateClickable.related.y1 + updateClickable.y,
    //       };
    //     } else {
    //       let xKey = 'x' + obj.x[1];
    //       let yKey = 'y' + obj.y[1];
    //       return {
    //         ...obj,
    //         x: updateClickable.related[xKey] + updateClickable.x,
    //         y: updateClickable.related[yKey] + updateClickable.y,
    //       };
    //     }
    //   } else {
    //     return { ...obj, x: (window.innerWidth - obj.width) / 2, y: obj.y };
    //   }
    // });
    console.log('roomarray', roomArray)
    // this.props.handle_object_update(updatedObjects, this.props.currentRoom);
    this.props.handle_object_update(rooms);
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
  { handle_intro, handle_object_update },
)(Bottom);
