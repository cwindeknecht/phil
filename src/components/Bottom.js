import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Bottom.css';

import parchment from '../imgs/parchment.jpg';

import { handle_intro } from '../actions/index.js';

var parchmentBackground = {
  backgroundImage: `url(${parchment})`,
};

class Bottom extends Component {
  state = {
    objects: this.props.currentRoom.objects,
  };

  componentDidMount = () => {
    this.getObjectsXY();
    window.addEventListener('resize', this.getObjectsXY.bind(this));
  };

  render() {
    // Print the mouse coordinates
    // function printMousePos(event) {
    //   console.log('clientX: ' + event.clientX + ' - clientY: ' + event.clientY);
    // }
    // document.addEventListener('click', printMousePos);
    console.log(this.props.intro);
    return (
      <div id="Container" style={parchmentBackground} className="BottomContainer">
        {this.props.intro ? (
          <div className="BottomIntro">
            <div className="BottomIntroTitle">Intro</div>
            <div className="BottomIntroBody">
              {' '}
              You are a villager and your village is under attack.<br/><br/>To help defend it, you have left
              in search of an ancient artifact --- the Categorical Imperative.<br/><br/>Your search has
              brought you to the resting place of a great hero: Kant, the Paladin.
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
                  id={item.name}
                  key={item.id}
                  className={item.clicked ? 'Clickable' : ''}
                  src={item.image}
                  style={{ position: 'absolute', left: item.x, top: item.y, zIndex: item.z }}
                  onClick={this.handleClick}
                />
              );
            }
          })
        )}
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

  handleIntro = () => {
    this.props.handle_intro();
  };

  handleClick = event => {
    console.log(event.target.id);
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
