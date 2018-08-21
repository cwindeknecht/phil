import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/StartScreen.css';

class StartScreen extends Component {
    render() {
        return (
            <div className="StartScreenContainer">
              Yup
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    current: state.current,
  };
};

export default connect(
  mapStateToProps,
  null,
)(StartScreen);
