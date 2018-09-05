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

  componentDidUpdate = () => {
    if (this.state.battleText !== []) {
      this.scrollBottom();
    }
  };

  render() {
    return (
      <div className="battle">
        <div className="battle__header">
          <div className="battle__header__title"> {this.state.opponent.initialText}</div>
          {this.state.roll ? (
            <div className="battle__header__diceContainer">
              <img alt="dice1" src={this.state.rolls[0][0].image} className="battle__header__diceContainer__dice" />
              <img alt="dice2" src={this.state.rolls[0][1].image} className="battle__header__diceContainer__dice" />
            </div>
          ) : (
            <div className="battle__header__diceContainer">
              <img alt="dice1" className="battle__header__diceContainer__dice" style={{ opacity: '0' }} />
              <img alt="dice2" className="battle__header__diceContainer__dice" style={{ opacity: '0' }} />
            </div>
          )}
          {this.state.victory ? (
            <button className="battle__header__button " onClick={this.handleCharacterUpdate}>
              Victory!
            </button>
          ) : (
            <button className="battle__header__button " onClick={this.handleRoll}>
              Roll
            </button>
          )}
        </div>
        <div id="scroll" className="battle__textContainer">
          {this.state.battleText.map((text, i) => {
            return (
              <li className="battle__textContainer__text" key={i}>
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

  scrollBottom = () => {
    let scroll = document.getElementById('scroll');
    scroll.scrollTop = scroll.scrollHeight;
  };

  handleRoll = () => {
    let text = '';
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
      let opponentDamage = Math.floor(Math.random() * character.damage) + 1 - opponent.detriment;
      opponentDamage = opponentDamage > 0 ? opponentDamage : 1;
      opponent.health -= opponentDamage;
      if (opponentDamage > 0) {
        text += opponent.critText + `You deal ${opponentDamage} damage.`;
      } else {
        text += opponent.critText + `You deal ${opponentDamage} damage.  Good job.`;
      }
    }
    // damage to both
    else if (dam <= opponent.tradeHigh && dam >= opponent.tradeLow) {
      let opponentDamage = Math.floor(Math.random() * character.damage) + 1 - opponent.detriment;
      opponentDamage = opponentDamage > 0 ? opponentDamage : 0;
      let characterDamage = Math.floor(Math.random() * opponent.tradeDamageGive) + 1;
      character.health -= characterDamage - character.armor;
      opponent.health -= opponentDamage;
      if (opponentDamage > 0) {
        text +=
          opponent.tradeText +
          `The ${opponent.name} deals ${characterDamage} to you.  You deal ${opponentDamage} damage.`;
      } else {
        text +=
          opponent.tradeText +
          `The ${opponent.name} deals ${characterDamage} to you.  You deal ${opponentDamage} damage.  Nice work.`;
      }
    }
    // damage to player
    else if (dam === 0) {
      text += opponent.dodgeText;
    } else {
      let characterDamage = Math.floor(Math.random() * opponent.tradeDamageGive) + 1;
      character.health -= characterDamage - character.armor;
      text += opponent.hitText + `The ${opponent.name} does ${characterDamage} to you.`;
    }
    if (character.health <= 0) {
      this.props.handle_death(this.props.opponent.deathMessage);
      this.props.handle_transition(Death);
      return;
    }
    if (opponent.health <= 0) this.handleVictory(this.props.currentRoom);
    battleText.push(text);
    this.setState({ rolls, character, opponent, battleText, roll: true });
  };

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
