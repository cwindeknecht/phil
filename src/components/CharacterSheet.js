import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/CharacterSheet.css';

import damageIcon from '../imgs/Damage.png';
import armorIcon from '../imgs/Armor.png';
import healthIcon from '../imgs/Health.png';

import {
  handle_adventure_start,
  handle_character_save,
  handle_character_roll,
  handle_transition,
} from '../actions/index';

import parchment from '../imgs/parchment.jpg';

let parchmentBackground = {
  backgroundImage: `url(${parchment})`,
};
let damage = {
  backgroundImage: `url(${damageIcon})`,
};
let armor = {
  backgroundImage: `url(${armorIcon})`,
};
let health = {
  backgroundImage: `url(${healthIcon})`,
};

class CharacterSheet extends Component {
  render() {
    let gear = this.props.character.gear;
    gear.length % 2 === 1 ? gear.push('') : null;
    console.log('Character Created', this.props.characterCreated);
    console.log('Character Saved', this.props.characterSaved);
    console.log('Adventure Started', this.props.adventureStarted);
    return (
      <div style={parchmentBackground} className="CSContainer">
        <div className="CSTitle"> Villager </div>
        <div className="CSStats">
          <div className="CSStatsHalf">
            <div className="CSStat">
              Name: <div className="CSStats">{this.props.character.name}</div>
            </div>
            <div className="CSStat">
              Ethnicity: <div className="CSStats">{this.props.character.ethnicity}</div>
            </div>
            <div className="CSStat">
              Physical Trait: <div className="CSStats">{this.props.character.physical}</div>
            </div>
          </div>
          <div className="CSStatsHalf">
            <div id="CSLevel">
              <div className="CSStat">
                Level: <div className="CSStats">{this.props.character.level}</div> XP:{' '}
                <div className="CSStats">{this.props.character.xp}</div>
              </div>
            </div>
            <div className="CSStat">
              Gender: <div className="CSStats">{this.props.character.gender}</div>{' '}
            </div>
            <div className="CSStat">
              Personality Trait: <div className="CSStats">{this.props.character.personality} </div>
            </div>
          </div>
        </div>
        <div className="CSSymbols">
          <div style={damage} className="CSSymbol">
            <div className="CSSymbolStat">{this.props.character.damageText}</div>
          </div>
          <div style={armor} className="CSSymbol">
            <div className="CSSymbolStat">{this.props.character.armor}</div>
          </div>
          <div style={health} className="CSSymbol">
            <div className="CSSymbolStat">{this.props.character.health}</div>
          </div>
        </div>
        <div className="CSGear">
          <div className="CSGearTitle"> Gear </div>
          <div className="CSGearItems">
            {gear.map((item, i) => {
              return (
                <li
                  key={i}
                  className="CSGearItem"
                  style={item === '' ? { opacity: '0' } : { opacity: '1' }}>
                  {item}
                </li>
              );
            })}
          </div>
        </div>
        <div className="CSOptions">
          {this.props.characterSaved ? (
            <button className="CSButtonRoll" style={{ opacity: '0' }} />
          ) : (
            <button className="CSButtonRoll" onClick={this.createCharacter}>
              {' '}
              {this.props.character.name !== '---' ? 'Reroll' : 'Roll'}
            </button>
          )}
          {this.props.characterCreated ? (
            <button id="choose" className="CSButtonChoose" onClick={this.saveCharacter}>
              Choose This Character
            </button>
          ) : (
            <button className="CSButtonChoose" style={{ opacity: '0' }} />
          )}
          {this.props.characterCreated && this.props.characterSaved ? (
            this.props.adventureStarted ? (
              <button className="CSButtonAdv" onClick={this.handleTransition}>
                {' '}
                Return to Adventure{' '}
              </button>
            ) : (
              <button className="CSButtonAdv" onClick={this.handleTransition}>
                {' '}
                Begin Adventure{' '}
              </button>
            )
          ) : (
            <button className="CSButtonAdv" style={{ opacity: '0' }} />
          )}
        </div>
      </div>
    );
  }
  createCharacter = () => {
    this.props.handle_character_roll();
  };

  saveCharacter = () => {
    this.props.handle_character_save();
    let element =document.getElementById('choose');
    element.style.opacity = 0;
  };

  handleTransition = () => {
    if (this.props.character.name !== '---') {
      this.props.handle_adventure_start();
      // this needs to be changed to a different component (the starter text of the adventure)
      this.props.handle_transition(CharacterSheet);
    }
  };
}

const mapStateToProps = state => {
  return {
    current: state.current,
    character: state.character,
    characterCreated: state.characterCreated,
    characterSaved: state.characterSaved,
    adventureStarted: state.adventureStarted,
  };
};

export default connect(
  mapStateToProps,
  {
    handle_adventure_start,
    handle_character_roll,
    handle_character_save,
    handle_transition,
  },
)(CharacterSheet);
