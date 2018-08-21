import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Bottom.css';

import parchment from '../imgs/parchment.jpg';

var parchmentBackground = {
  backgroundImage: `url(${parchment})`,
};

class Bottom extends Component {
  state = {
    objects: this.props.currentRoom.objects,
    coords: {
      x: 0,
      y: 0,
    },
    width: 0,
  };

  componentDidMount = () => {
    this.handleSetup();
    window.addEventListener('resize', this.handleSetup.bind(this));

    this.getObjectsXY();
  };

  render() {
    // Print the mouse coordinates
    // function printMousePos(event) {
    //   console.log('clientX: ' + event.clientX + ' - clientY: ' + event.clientY);
    // }
    // document.addEventListener('click', printMousePos);
    return (
      <div id="Container" style={parchmentBackground} className="BottomContainer">
        {this.state.objects.map((item) => {
          return (
            <img
              key={item.id}
              src={item.image}
              style={{ position: 'absolute', left: item.x, top: item.y}}
            />
          );
        })}
      </div>
    );
  }

  getObjectsXY = () => {
    let main
    let objects = this.state.objects.map((obj) => {
      if (typeof obj.x !== 'number') {
        let update = this.state.objects.filter((object) => {
          return object.name === obj.x;
        })[0];
        return { ...obj, x: update.related.x, y: update.related.y + this.state.coords.y};
      }
      return obj;
    });
    this.setState({ objects });
  };

  handleSetup = (visible) => {
    let coords = document.getElementById('Container').getBoundingClientRect();
    this.setState({ coords: { x: coords.x, y: coords.y }, width: coords.width });
  };
}

const mapStateToProps = (state) => {
  return {
    current: state.current,
    currentRoom: state.currentRoom,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Bottom);
