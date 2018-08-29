import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Death.css';

class Death extends Component {
  render() {
    return (
      <div className="DeathContainer">
        <div className="DeathMessage">{this.props.deathMessage}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deathMessage: state.deathMessage,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Death);
