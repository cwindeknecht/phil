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
  };

  componentDidMount = () => {
    this.getObjectsXY();
    window.addEventListener('resize', this.getObjectsXY.bind(this));
  };

  render() {
    // Print the mouse coordinates
    function printMousePos(event) {
      console.log('clientX: ' + event.clientX + ' - clientY: ' + event.clientY);
    }
    document.addEventListener('click', printMousePos);
    return (
      <div id="Container" style={parchmentBackground} className="BottomContainer">
        {this.state.objects.map((item) => {
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
        })}
      </div>
    );
  }

  getObjectsXY = () => {
    let updatedObjects = this.state.objects.map((obj) => {
      if (typeof obj.x !== 'number') {
        let updateClickable = this.state.objects.filter((object) => {
          return object.name === obj.x[0];
        })[0];
        console.log(updateClickable);

        if (updateClickable.related.type === 'single') {
          return {
            ...obj,
            x: updateClickable.related.x1 + updateClickable.x,
            y: updateClickable.related.y1 + updateClickable.y,
          };
        } else {
          let xKey = 'x' + obj.x[1];
          let yKey = 'y' + obj.y[1];
          console.log(xKey);
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

  handleClick = (event) => {
    console.log(event.target.id);
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
