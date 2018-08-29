import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Battle.css';

import { handle_transition } from '../actions/index';

import deathBackdrop from '../imgs/DeathBackdrop.png';

let death = {
  backgroundImage: `url(${deathBackdrop})`,
};

class Death extends Component {
  render() {
    return (
      <div className="Death Container" style={death}>
        You've Died. Good Job {this.props.deathMessage}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  };
};

export default connect(
  mapStateToProps,
  { handle_transition },
)(Death);
