import * as actions from '../actions/index';

import Start from '../components/Start';

import * as rooms from './rooms';

const initialState = {
  // start, character sheet, main, battle
  current: Start,
  currentRoom: rooms.room1,
  intro: true,
  character: {
    name: '',
    ethnicity: '',
    phsyical: '',
    level: '',
    xp: '',
    gender: '',
    personality: '',
    damage: '',
    damageText: '',
    armor: '',
    health: '',
    gear: [],
  },
  characterCreated: false,
  characterSaved: false,
  adventureStarted: false,
  returnTo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.HANDLE_ADVENTURE_START:
      return { ...state, adventureStarted: action.payload };
    case actions.HANDLE_CHARACTER_ROLL:
      return {
        ...state,
        character: action.payload.character,
        characterCreated: action.payload.characterCreated,
      };
    case actions.HANDLE_CHARACTER_SAVE:
      return { ...state, characterSaved: action.payload };
    case actions.HANDLE_CHARACTER_VIEW:
      return { ...state, current: action.payload.current, returnTo: action.payload.returnTo };
    case actions.HANDLE_INTRO:
      return { ...state, intro: action.payload };
    case actions.HANDLE_TRANSITION:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};
