import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Battle.css';

import Main from './Main';
import Death from './Death';

import { handle_transition } from '../actions/index';

import parchment from '../imgs/parchment.jpg';

import one from '../imgs/DiceOne.png';
import two from '../imgs/DiceTwo.png';
import three from '../imgs/DiceThree.png';
import four from '../imgs/DiceFour.png';
import five from '../imgs/DiceFive.png';
import six from '../imgs/DiceSix.png';

let parchmentBackground = {
  backgroundImage: `url(${parchment})`,
};

class Battle extends Component {
  state = {
    character: this.props.character,
    opponent: this.props.opponent,
    rolls: [],
    neverMind: true,
    battleText: this.props.opponent.initialText,
    won: false,
    roll: false,
  };

  render() {
    // If I have time, make a villager character that looks puny
    // have the opponent on one side, the villager on the other side
    console.log('this.props in battle', this.props);
    return (
      <div className="BattleContainer" style={parchmentBackground}>
        <div className="BattleHeader">
          {/* have this be a modal that pops up */}
          {/* <img className="BattleExplanation"> */}
          {!this.state.roll ? (
            <div>
              <img alt="dice1" className="BattleDice" style={{ opacity: '0' }} />{' '}
              <img alt="dice2" className="BattleDice" style={{ opacity: '0' }} />{' '}
            </div>
          ) : (
            <div>
              <img alt="dice1" src={this.state.rolls[0].image} className="BattleDice" style={{ opacity: '0' }} />{' '}
              <img alt="dice2" src={this.state.rolls[1].image} className="BattleDice" style={{ opacity: '0' }} />{' '}
            </div>
          )}
          <button onClick={this.handleRoll}> Roll </button>
          {this.state.neverMind ? (
            <button className="BattleButton" onClick={this.handleTransition}>
              Nevermind
            </button>
          ) : (
            <button className="BattleButton" style={{ opacity: '0' }} />
          )}
          <div> {this.state.opponent.initialText}</div>
        </div>
        {this.state.rolls.map(roll => {
          return (
            <div>
              {' '}
              {this.state.battleText}
              {roll.num}{' '}
            </div>
          );
        })}
      </div>
    );
  }
  handleTransition = () => {
    this.props.handle_transition(Main);
  };
  // change nevermind to false after the first roll
  handleRoll = () => {
    let rolls = this.state.rolls;
    let opponent = this.state.opponent;
    let character = this.state.character;
    let battleText = '';
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    let diceArray = [dice1, dice2].map(dice => {
      switch (dice) {
        case 1:
          return { num: 1, image: one };
        case 2:
          return { num: 2, image: two };
        case 3:
          return { num: 3, image: three };
        case 4:
          return { num: 4, image: four };
        case 5:
          return { num: 5, image: five };
        case 6:
          return { num: 6, image: six };
        default:
          return { num: 1, image: one };
      }
    });
    rolls.push(diceArray);
    let dam = diceArray[0].num + diceArray[1].num - opponent.detriment;
    // damage to opponent
    if (dam === opponent.crit) {
      let opponentDamage = Math.floor(Math.random() * character.damage) + 1 - opponent.detriment;
      if (opponentDamage < 0) opponentDamage = 0;
      opponent.health -= opponentDamage;
      battleText = opponent.critText;
    }
    // damage to both
    else if (dam <= opponent.tradeHigh && dam >= opponent.tradeLow) {
      let opponentDamage = Math.floor(Math.random() * character.damage) + 1 - opponent.detriment;
      let characterDamage = Math.floor(Math.random() * opponent.tradeDamageGive) + 1;
      character.health -= characterDamage;
      opponent.health -= opponentDamage;
      battleText = opponent.tradeText;
    }
    // damage to player
    else if (dam === 0) {
      battleText = opponent.dodgeText;
    } else {
      let characterDamage = Math.floor(Math.random() * opponent.tradeDamageGive) + 1;
      character.health -= characterDamage;
      battleText = opponent.hitText;
    }
    if (character.health <= 0) this.props.handle_transition(Death);
    if (opponent.health <= 0) this.handleCharacterUpdate();
    this.setState({ rolls, character, opponent, battleText, roll: true });
  };
  // this is for if the character actually beats the opponent
  // go back to main
  // update the character in the store
  // update the visibility of the creature
  // update the topbar text with the victory text
  // since the warrior is connected to the tv/bag, just say in the midst of battle you destroy the tv set and bag of holding.
  // update the clickables on the screen (doors, chest, spear, etc)
  handleCharacterUpdate = () => {
    console.log('fuck');
  };
}

const mapStateToProps = state => {
  return {
    character: state.character,
    opponent: state.opponent,
  };
};

export default connect(
  mapStateToProps,
  { handle_transition },
)(Battle);
