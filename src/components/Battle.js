import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/Battle.css';

import Main from './Main';
import Death from './Death';

import { handle_transition, handle_death, handle_victory } from '../actions/index';

import one from '../imgs/DiceOne.png';
import two from '../imgs/DiceTwo.png';
import three from '../imgs/DiceThree.png';
import four from '../imgs/DiceFour.png';
import five from '../imgs/DiceFive.png';
import six from '../imgs/DiceSix.png';

class Battle extends Component {
  state = {
    character: this.props.character,
    opponent: this.props.opponent,
    rolls: [],
    neverMind: true,
    battleText: [],
    victory: false,
    roll: false,
  };

  render() {
    // If I have time, make a villager character that looks puny
    // have the opponent on one side, the villager on the other side
    return (
      <div className="BattleContainer">
        <div className="BattleHeader">
          {/* have this be a modal that pops up */}
          {/* <img className="BattleExplanation"> */}
          <div className="BattleTitle"> {this.state.opponent.initialText}</div>
          {this.state.roll ? (
            <div className="BattleDiceContainer">
              <img alt="dice1" src={this.state.rolls[0][0].image} className="BattleDice" />
              <img alt="dice2" src={this.state.rolls[0][1].image} className="BattleDice" />
            </div>
          ) : (
            <div className="BattleDiceContainer">
              <img alt="dice1" className="BattleDice" style={{ opacity: '0' }} />
              <img alt="dice2" className="BattleDice" style={{ opacity: '0' }} />
            </div>
          )}
          {this.state.roll ? (
            <button className="BattleButton" style={{ opacity: '0' }} />
          ) : (
            <button className="BattleButton" onClick={this.handleTransition}>
              Nevermind
            </button>
          )}
          {this.state.victory ? (
            <button className="BattleButton" onClick={this.handleCharacterUpdate}>
              Victory!
            </button>
          ) : (
            <button className="BattleButton" onClick={this.handleRoll}>
              Roll
            </button>
          )}
        </div>
        <div className="BattleTextContainer">
          {this.state.battleText.map((text, i) => {
            return (
              <li className="BattleText" key={i}>
                {text}
              </li>
            );
          })}
        </div>
      </div>
    );
  }
  handleTransition = () => {
    this.props.handle_transition(Main);
  };
  // I NEED TO MAKE IT SO IT ROLLS A D4 FOR THIS SHIT TOO IF THEY LAND A HIT
  // EVEN THOUGH THAT BASICALLY NEVER HAPPENS
  // BUT THEN AGAIN NEITHER WILL FUCKING BATTLE
  handleRoll = () => {
    let rolls = [];
    let opponent = this.state.opponent;
    let character = this.state.character;
    let battleText = this.state.battleText;
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
    if (dam >= opponent.crit) {
      let opponentDamage = (Math.floor(Math.random() * character.damage) + 1) - opponent.detriment;
      if (opponentDamage < 0) opponentDamage = 0;
      // opponent.health -= opponentDamage;
      opponent.health -= 8;
      if (opponentDamage > 0) {
        battleText.push(opponent.critText + `You deal ${opponentDamage} damage.  `);
      } else {
        battleText.push(
          opponent.critText +
            `You deal ${opponentDamage} damage.  Attacking a ${this.props.opponent.name} was a terrible idea.`,
        );
      }
    }
    // damage to both
    else if (dam <= opponent.tradeHigh && dam >= opponent.tradeLow) {
      let opponentDamage = (Math.floor(Math.random() * character.damage) + 1) - opponent.detriment;
      let characterDamage = Math.floor(Math.random() * opponent.tradeDamageGive) + 1;
      character.health -= characterDamage - character.armor;
      opponent.health -= opponentDamage;
      if (opponentDamage > 0) {
        battleText.push(opponent.tradeText, `The ${opponent.name} deals ${characterDamage} to you.  You deal ${opponentDamage} damage.  `);
      } else {
        battleText.push(
          opponent.tradeText,
            `The ${opponent.name} deals ${characterDamage} to you.  You deal ${opponentDamage} damage.  Attacking a ${this.props.opponent.name} was a terrible idea.`,
        );
      }
    }
    // damage to player
    else if (dam === 0) {
      battleText.push(opponent.dodgeText);
    } else {
      let characterDamage = Math.floor(Math.random() * opponent.tradeDamageGive) + 1;
      character.health -= characterDamage - character.armor;
      battleText.push(opponent.hitText, `The ${opponent.name} does ${characterDamage} to you.`);
    }
    if (character.health <= 0) {
      this.props.handle_death(this.props.opponent.deathMessage);
      this.props.handle_transition(Death);
      return;
    }
    if (opponent.health <= 0) this.handleVictory(this.props.currentRoom);
    this.setState({ rolls, character, opponent, battleText, roll: true });
  };
  // this is for if the character actually beats the opponent
  // go back to main
  // update the character in the store
  // update the visibility of the creature
  // update the topbar text with the victory text
  // since the warrior is connected to the tv/bag, just say in the midst of battle you destroy the tv set and bag of holding.
  // update the clickables on the screen (doors, chest, spear, etc)
  handleVictory = () => {
    this.setState({ victory: true });
  };

  handleCharacterUpdate = () => {
    let objects = this.props.currentRoom.objects.map(object => {
      if (object.name === this.props.opponent.name) {
        object.visible = false;
      }
      if (object.name === 'doorway') {
        object.visible = true;
      }
      if (object.clickable === false) {
        object.clickable = true;
      }
      return object;
    });
    let currentRoom = { ...this.props.currentRoom, topBar: this.props.opponent.victory, objects };
    this.props.handle_victory(Main, this.state.character, currentRoom);
  };
}

const mapStateToProps = state => {
  return {
    character: state.character,
    opponent: state.opponent,
    currentRoom: state.currentRoom,
  };
};

export default connect(
  mapStateToProps,
  { handle_transition, handle_death, handle_victory },
)(Battle);
