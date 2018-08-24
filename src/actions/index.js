import create from './create';

export const HANDLE_ADVENTURE_START = 'HANDLE_ADVENTURE_START';
export const HANDLE_CHARACTER_ROLL = 'HANDLE_CHARACTER_ROLL';
export const HANDLE_CHARACTER_SAVE = 'HANDLE_CHARACTER_SAVE';
export const HANDLE_INTRO = 'HANDLE_INTRO';
export const HANDLE_TRANSITION = 'HANDLE_TRANSITION';

export const handle_adventure_start = () => {
  return {
    type: 'HANDLE_ADVENTURE_START',
    payload: { adventureStart: true },
  };
};

export const handle_character_roll = () => {
  let character = create();
  return {
    type: 'HANDLE_CHARACTER_ROLL',
    payload: { character: character, characterCreated: true },
  };
};

export const handle_character_save = () => {
  return {
    type: 'HANDLE_CHARACTER_SAVE',
    payload: true,
  };
};

export const handle_intro = () => {
  return {
    type: 'HANDLE_INTRO',
    payload: false,
  };
};

export const handle_transition = (component, stat = null) => {
  return {
    type: 'HANDLE_TRANSITION',
    payload: component,
  };
};
