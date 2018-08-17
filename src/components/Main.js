import React, {Component} from 'react';
import {connect} from 'react-redux';

// import '../css/Main.css';

class Main extends Component {
    render() {
        return (
            <div className="MainContainer">
                <this.props.current />
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
