import create from './create';
import * as rooms from '../reducers/rooms';

export const HANDLE_ADVENTURE_START = 'HANDLE_ADVENTURE_START';
export const HANDLE_CHARACTER_ROLL = 'HANDLE_CHARACTER_ROLL';
export const HANDLE_CHARACTER_SAVE = 'HANDLE_CHARACTER_SAVE';
export const HANDLE_CHARACTER_VIEW = 'HANDLE_CHARACTER_VIEW';
export const HANDLE_CURRENT_ROOM = 'HANDLE_CURRENT_ROOM';
export const HANDLE_INTRO = 'HANDLE_INTRO';
export const HANDLE_INVENTORY_UPDATE = 'HANDLE_INVENTORY_UPDATE';
export const HANDLE_OBJECT_VISIBILITY = 'HANDLE_OBJECT_VISIBILITY';
export const HANDLE_ROOM_OPTIONS = 'HANDLE_ROOM_OPTIONS';
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

export const handle_character_view = (current, returnTo) => {
  return {
    type: 'HANDLE_CHARACTER_VIEW',
    payload: { current, returnTo },
  };
};

export const handle_current_room = currentRoom => {
  return {
    type: 'HANDLE_CURRENT_ROOM',
    payload: rooms[currentRoom],
  };
};

export const handle_intro = () => {
  return {
    type: 'HANDLE_INTRO',
    payload: false,
  };
};

export const handle_inventory_update = (character, currentRoom, items, topBar, link=null) => {
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
  if(link !== null) {
    payload['link'] = link.show;
    payload['pageNumber'] = link.page;
  }
  else {
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

export const handle_room_options = (currentRoom, option) => {
  let options = currentRoom.options.map(opt => {
    if(opt.type === option.type) {
      return {...opt, visible: false};
    }
    return opt;
  })
  let payload = currentRoom;
  switch(option.type){
    case 'examine':
      payload = {...currentRoom, options, topBar:option.topBar};
      break;
    default:
      console.log('nope');
  }
  if(option.link !== null) {
    payload['link'] = option.link.show;
    payload['pageNumber'] = option.link.page;
  }
  else {
    payload['link'] = false;
    payload['pageNumber'] = 0;
  }
  return {
    type: 'HANDLE_ROOM_OPTIONS',
    payload,
  }
} 

export const handle_transition = (component, stat = null) => {
  return {
    type: 'HANDLE_TRANSITION',
    payload: component,
  };
};
