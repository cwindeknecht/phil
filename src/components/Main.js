import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/Main.css';

import Top from './Top';
import Bottom from './Bottom';

class Main extends Component {
    render() {
        return (
            <div className="MainContainer">
                <Top />
                <Bottom />
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
)(Main);
