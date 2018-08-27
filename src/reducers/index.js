import * as actions from '../actions/index';

import Start from '../components/Start';

import * as rooms from './rooms';

const initialState = {
  // start, character sheet, main, battle
  current: Start,
  currentRoom: rooms.outside,
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
  link: false,
  pageNumber: 0,
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
    case actions.HANDLE_CURRENT_ROOM:
      return { ...state, currentRoom: action.payload };
    case actions.HANDLE_INTRO:
      return { ...state, intro: action.payload };
    case actions.HANDLE_INVENTORY_UPDATE:
      console.log('payload', action.payload.pageNumber);
      if ('link' in action.payload) {
        console.log('Yup');
        return {
          ...state,
          character: action.payload.character,
          currentRoom: action.payload.currentRoom,
          link: action.payload.link,
          pageNumber: action.payload.pageNumber,
        };
      }
      return {
        ...state,
        character: action.payload.character,
        currentRoom: action.payload.currentRoom,
      };
    case actions.HANDLE_OBJECT_VISIBILITY:
      return { ...state, currentRoom: action.payload };
    case actions.HANDLE_TRANSITION:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};
