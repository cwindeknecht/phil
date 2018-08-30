import create from './create';
import * as rooms from '../reducers/rooms';

export const HANDLE_ADVENTURE_START = 'HANDLE_ADVENTURE_START';
export const HANDLE_BATTLE = 'HANDLE_BATTLE';
export const HANDLE_CHARACTER_ROLL = 'HANDLE_CHARACTER_ROLL';
export const HANDLE_CHARACTER_SAVE = 'HANDLE_CHARACTER_SAVE';
export const HANDLE_CHARACTER_UPDATE = 'HANDLE_CHARACTER_UPDATE';
export const HANDLE_VICTORY = 'HANDLE_VICTORY';
export const HANDLE_CHARACTER_VIEW = 'HANDLE_CHARACTER_VIEW';
export const HANDLE_CURRENT_ROOM = 'HANDLE_CURRENT_ROOM';
export const HANDLE_DEATH = 'HANDLE_DEATH';
export const HANDLE_EXAMINE = 'HANDLE_EXAMINE';
export const HANDLE_INTRO = 'HANDLE_INTRO';
export const HANDLE_INVENTORY_UPDATE = 'HANDLE_INVENTORY_UPDATE';
export const HANDLE_OBJECT_VISIBILITY = 'HANDLE_OBJECT_VISIBILITY';
export const HANDLE_TALK = 'HANDLE_TALK';
export const HANDLE_TRANSITION = 'HANDLE_TRANSITION';

export const handle_adventure_start = () => {
  return {
    type: 'HANDLE_ADVENTURE_START',
    payload: { adventureStart: true },
  };
};

export const handle_battle = (component, opponent) => {
  return {
    type: 'HANDLE_BATTLE',
    payload: { current: component, opponent },
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

export const handle_character_update = (character) => {
  return {
    type: 'HANDLE_CHARACTER_UPDATE',
    payload: character,
  }
}

export const handle_victory = (current,character, currentRoom) => {
  let objects = currentRoom.objects.map(object => {
    if(object.clickable === false) object.clickable = true;
    return object;
  })
  currentRoom = {...currentRoom, objects};
  return {
    type: 'HANDLE_VICTORY',
    payload: { current, character, currentRoom },
  };
};

export const handle_character_view = (current, returnTo) => {
  return {
    type: 'HANDLE_CHARACTER_VIEW',
    payload: { current, returnTo },
  };
};

export const handle_current_room = currentRoom => {
  let payload = {};
  if (typeof currentRoom === 'string') payload = rooms[currentRoom];
  else payload = currentRoom;
  return {
    type: 'HANDLE_CURRENT_ROOM',
    payload: payload,
  };
};

export const handle_intro = () => {
  return {
    type: 'HANDLE_INTRO',
    payload: false,
  };
};

export const handle_death = (deathMessage) => {

  return {
    type: 'HANDLE_DEATH',
    payload: deathMessage,
  };
};

export const handle_examine = (currentRoom, option) => {
  let options = currentRoom.options.map(opt => {
    if (opt.type === option.type) {
      return { ...opt, visible: false };
    }
    return option;
  });
  let payload = currentRoom;
  payload['currentRoom'] = { ...currentRoom, options, topBar: option.topBar };
  if (option.link !== null) {
    payload['link'] = option.link.show;
    payload['pageNumber'] = option.link.page;
  } else {
    payload['link'] = false;
    payload['pageNumber'] = 0;
  }
  return {
    type: 'HANDLE_EXAMINE',
    payload,
  };
};

export const handle_inventory_update = (character, currentRoom, items, topBar, link = null) => {
  let inventory = character.gear;
  let payload = {};
  items.forEach(item => {
    if (item.type === 'add') {
      inventory.push(item.name);
    } else {
      let index = inventory.indexOf(item.name);
      inventory.splice(index, 1);
    }
  });
  if (link !== null) {
    payload['link'] = link.show;
    payload['pageNumber'] = link.page;
  } else {
    payload['link'] = false;
    payload['pageNumber'] = 0;
  }
  payload['character'] = { ...character, gear: inventory };
  payload['currentRoom'] = { ...currentRoom, topBar };
  return {
    type: 'HANDLE_INVENTORY_UPDATE',
    payload,
  };
};

export const handle_object_visibility = (currentRoom, affects, topBar) => {
  let updatedObjects = currentRoom.objects.map(object => {
    for (let i = 0; i < affects.length; i++) {
      if (object.name === affects[i].name) object.visible = affects[i].visible;
    }
    return object;
  });
  currentRoom = { ...currentRoom, objects: updatedObjects, topBar };
  return {
    type: 'HANDLE_OBJECT_VISIBILITY',
    payload: currentRoom,
  };
};

export const handle_talk = (current, currentRoom, id) => {
  let talk = currentRoom.objects.filter(object => {
    return object.id === id;
  })[0].clicked.options[0];
  return {
    type: 'HANDLE_TALK',
    payload: { current, talk },
  };
};

export const handle_transition = component => {
  return {
    type: 'HANDLE_TRANSITION',
    payload: component,
  };
};
