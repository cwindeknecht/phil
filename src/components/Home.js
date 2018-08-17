import React, {Component} from 'react';
import {connect} from 'react-redux';

// import '../css/Home.css';

import PhilKant from '../imgs/Kant.jpg';

class Home extends Component {
    render() {
        return (
            <div className="HomeContainer">
               Choose your adventure
               <button id="Kant" onClick={this.handleAdventure}> Kant </button>
               <img alt="Kant" src={PhilKant} style={{width:"1rem", height:"1rem"}}/>
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
)(Home);
