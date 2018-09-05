import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Death.css';

class Death extends Component {
  render() {
    return (
      <div className="death">
        <div className="death__message">{this.props.deathMessage}</div>
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
