import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/CharacterSheet.css';

import damageIcon from '../imgs/Damage.png';
import armorIcon from '../imgs/Armor.png';
import healthIcon from '../imgs/Health.png';
import parchment from '../imgs/parchment.jpg';

import Main from './Main.js';

import {
  handle_adventure_start,
  handle_character_save,
  handle_character_roll,
  handle_transition,
} from '../actions/index';

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
    let character = this.props.character;
    let gear = character.gear;
    let index = gear.indexOf('');
    if (index > -1) {
      gear.splice(index, 1);
    }
    gear.length % 2 === 1 ? gear.push('') : (gear = character.gear);
    return (
      <div style={parchmentBackground} className="character">
        <div className="character__title"> Villager </div>
        <div className="character__statsContainer">
          <div className="character__statsContainer__half">
            <div className="character__statsContainer__half__stat">
              Name: <div className="character__statsContainer__half__stat__value">{character.name}</div>
            </div>
            <div className="character__statsContainer__half__stat">
              Ethnicity: <div className="character__statsContainer__half__stat__value">{character.ethnicity}</div>
            </div>
            <div className="character__statsContainer__half__stat">
              Physical:<div className="character__statsContainer__half__stat__value">{character.physical}</div>
            </div>
          </div>
          <div className="character__statsContainer__half">
            <div id="levelxp">
              <div id="levelxp__interior--left" className="character__statsContainer__half__stat">
                Level:
                <div id="levelxp__interior--left" className="character__statsContainer__half__stat__value">
                  {character.level}
                </div>
              </div>
              <div id="levelxp__interior--right" className="character__statsContainer__half__stat">
                XP:
                <div id="levelxp__interior--right" className="character__statsContainer__half__stat__value">
                  {character.xp}
                </div>
              </div>
            </div>
            <div className="character__statsContainer__half__stat">
              Gender: <div className="character__statsContainer__half__stat__value">{character.gender}</div>
            </div>
            <div className="character__statsContainer__half__stat">
              Personality:
              <div className="character__statsContainer__half__stat__value">{character.personality} </div>
            </div>
          </div>
        </div>
        <div className="character__symbols">
          <div style={damage} className="character__symbols__symbol">
            <div className="character__symbols__symbol__stat">{character.damageText}</div>
          </div>
          <div style={armor} className="character__symbols__symbol">
            <div className="character__symbols__symbol__stat">{character.armor}</div>
          </div>
          <div style={health} className="character__symbols__symbol">
            <div className="character__symbols__symbol__stat">{character.health}</div>
          </div>
        </div>
        <div className="character__gear">
          <div className="character__gear__title"> Gear </div>
          <div className="character__gear__items">
            {gear.map((item, i) => {
              return (
                <li key={i} className="character__gear__items__item" style={item === '' ? { opacity: '0' } : { opacity: '1' }}>
                  {item}
                </li>
              );
            })}
          </div>
        </div>
        <div className="character__options">
          {this.props.characterSaved ? (
            <button className="character__options__buttons" style={{ opacity: '0' }} />
          ) : (
            <button className="character__options__buttons" onClick={this.createCharacter}>
              {character.name !== '' ? 'Reroll' : 'Roll'}
            </button>
          )}
          {this.props.characterCreated && !this.props.adventureStarted ? (
            <button id="choose" className="character__options__buttons" onClick={this.saveCharacter}>
              Choose This Character
            </button>
          ) : (
            <button className="character__options__buttons" style={{ opacity: '0' }} />
          )}
          {this.props.characterCreated && this.props.characterSaved ? (
            this.props.adventureStarted ? (
              <button className="character__options__buttons" onClick={this.handleTransition}>
                Return to Adventure
              </button>
            ) : (
              <button className="character__options__buttons" onClick={this.handleTransition}>
                Begin Adventure
              </button>
            )
          ) : (
            <button className="character__options__buttons" style={{ opacity: '0' }} />
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
    let element = document.getElementById('choose');
    element.style.opacity = 0;
  };

  handleTransition = () => {
    if (this.props.character.name !== '---') {
      this.props.handle_adventure_start();
      this.props.handle_transition(Main);
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
