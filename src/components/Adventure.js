import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  handle_current,
  handle_room_pickup,
  handle_room_travel,
  handle_room_visible,
} from '../actions';

import '../css/Adventure.css';

var BreakException = {};

class Adventure extends Component {
  state = {
    coords: { x: 0, y: 0 },
  };
  // instead of doing the map of the objects based on the room and whether or not
  // they are visible, have a function that loads the objects visible in the state?

  componentDidMount() {
    this.handleSetup();
  }

  render() {
    return (
      <div className="AdventureContainer" onResize={this.handleSetup}>
        >
        <div className="AdventureBody">
          {/* This is where health, inventory, etc. will be shown. */}
          <div className="AdventureLeft">
            <div>Name</div>
            <div>{this.props.player.name}</div>
            <div>Points</div>
            <div>{this.props.player.points}</div>
            <div>Inventory</div>
            <div>
              {this.props.player.inventory.length
                ? this.props.player.inventory.map((item) => {
                    return <li key={item.name}>{item}</li>;
                  })
                : 'Empty'}
            </div>
          </div>
          <div className="AdventureCenter">
            <div>{this.props.room.name}</div>
            <div
              id="PNC"
              className="AdventurePNC"
              // Do a mixin for this later
              style={{ backgroundImage: `url(${this.props.room.background})` }}>
              {this.props.room.objects
                .filter((object) => {
                  // Do a mixin for the X and y and whatever else later
                  return object.visible === true;
                })
                .map((visible) => {
                  return (
                    <img
                      key={visible.name}
                      id={visible.name}
                      alt={visible.name}
                      data-message={visible.message}
                      src={visible.image}
                      onClick={this.handleObjectClick}
                      style={{
                        position: 'absolute',
                        left: visible.x + this.state.coords.x,
                        top: visible.y + this.state.coords.y,
                      }}
                    />
                  );
                })}
            </div>
          </div>

          {/* This is where interactions will be shown. */}
          <div className="AdventureRight">Yup</div>
        </div>
        {/* This is where movement will occur. */}
        {/* If a room can go east, the room needs to have an east key and a value that it leads to.
        Each button needs to have an id that is affilated with that value, so it can be loaded
        upon moving to that room. */}
        <div className="AdventureFooter" />
      </div>
    );
  }

  handleSetup = (visible) => {
    let coords = document.getElementById('PNC').getBoundingClientRect();
    this.setState({ coords: { x: coords.x, y: coords.y } });
  };

  handleObjectClick = (e) => {
    let clicked = document.getElementById(e.target.id);
    window.alert(clicked.dataset.message);
    // In general this could be handled better, definetly refactor this.
    //
    // If nothing else, have functions for each one, but I'm pretty
    // sure if I just thought about it a different way it could be better.
    // Also, instead of using a foreach, do a forloop to get rid of the janky
    // way I had to break this.

    this.props.room.objects.forEach((object) => {
      // Check if this is related to things appearing upon search
      // or if something falls out of a golems mouth or whatever

      /*
      This first conditional will be pointless later on, each object will have every field 
      that every other object has if its in a db
      */
      if (Object.keys(object).includes('visiblerelated')) {
        if (object.visiblerelated === e.target.id) {
          // Maybe have each item have a unique ID instead of passing object name
          // Not sure this will make anything better, but seems like what should be done
          // Similarly, the event id should be the unique ID of the object
          this.props.handle_room_visible(object.name);
          throw BreakException;
        }
      }
      // Check if the object is a door / chest / etc.
      if (Object.keys(object).includes('unlockRequires')) {
        if (this.props.player.inventory.includes(object.unlockRequires)) {
          if (Object.keys(object).includes('leadsTo')) {
            this.props.handle_room_travel(object.leadsTo);
            throw BreakException;
          }
          // Figure this part of out for chests or whatever
          // return this.props.handle_room_unlock(e.target.id)
        }
      }
      if (Object.keys(object).includes('pickUp') && object.name === e.target.id) {
        this.props.handle_room_pickup(e.target.id);
        throw BreakException;
      }
    });
  };
}

const mapStateToProps = (state) => {
  return {
    current: state.current,
    room: state.room,
    player: state.player,
  };
};

export default connect(
  mapStateToProps,
  {
    handle_current,
    handle_room_pickup,
    handle_room_travel,
    handle_room_visible,
  },
)(Adventure);
