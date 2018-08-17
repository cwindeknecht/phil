import * as actions from '../actions/index.js';

import Home from '../components/Home';

import PhilKant from '../imgs/Kant.jpg';
import Doorknob from '../imgs/objects/DoorKnob.png';

// Eventually this will be in a database.  Should be free if just doing a couple of classes
// but might have to pay 15 a month.

// Figure out how to store photos in mongo via GridFS, photobucket can eat a dick.
let Kant = {
  navBarImage: PhilKant,
  room1: {
    name: 'room1',
    background:
      'http://i1248.photobucket.com/albums/hh490/idontreallygiveashitwhatthefuckthisisfuckoff/Cave_zpssjo6lzor.png',
    // If lit is false, do some css magic to make it darker
    lit: true,
    // Total points of the room
    maxpoints: 15,
    // Current points achieved in the room
    currentPoints: 0,
    // Objects to be placed / interacted with in the room
    objects: [
      {
        // Object name
        name: 'table',
        // Message when clicked
        message: 'You search the table and find a key.',
        // Image link to display
        image:
          'http://i1248.photobucket.com/albums/hh490/idontreallygiveashitwhatthefuckthisisfuckoff/Table_zps3kngenva.png',
        // x-axis of the object from the left
        x: 400,
        // y-axis of the object from the top
        y: 400,
        // Objects can have things on them that aren't visible until they are searched
        searched: false,
        // Whether or not the item can be seen
        visible: true,
      },
      {
        /*For any useable item, it should have autoremove on use*/
        name: 'Silver Key',
        message: 'Silver Key',
        options: ['Pick Up'],
        image:
          'http://i1248.photobucket.com/albums/hh490/idontreallygiveashitwhatthefuckthisisfuckoff/Key_zpsc3fxrko7.png',
        x: 450,
        y: 450,
        visible: false,
        pickUp: true,
        // use this to toggle if it can be seen; when the table is clicked (i.e. searched) for instance, have
        // the onclick function go through the objects list and see if any items have a visiblerelated key,
        // and if they do, change visible to true
        /* Similarly, if a golems arm needs to pulled to have something drop on the floor*/

        visiblerelated: 'table',
        // Have this appear beneath the room description and be tied to visible
        // HAve it tied to visible because if they pick it up, have this disappear from the desciption
        // Similarly, visible will be set to false
        newlyvisibleMessage: 'You see a silver key',
        // Still need to make it so things are checked if they are removed on use somehow
        removedOnUse: false,
      },
      {
        name: 'doorknob',
        message: 'doorknob',
        options: ['Unlock', 'Open'],
        image: Doorknob,
        x: 450,
        y: 250,
        visible: true,
        unlocked: false,
        unlockRequires: 'Silver Key',
        leadsTo: 'room2',
      },
    ],
  },
  room2: {
    name: 'room2',
    background:
      'http://i1248.photobucket.com/albums/hh490/idontreallygiveashitwhatthefuckthisisfuckoff/Cave_zpssjo6lzor.png',
    // If lit is false, do some css magic to make it darker
    lit: true,
    // Total points of the room
    maxpoints: 15,
    // Current points achieved in the room
    currentPoints: 0,
    // Objects to be placed / interacted with in the room
    objects: [],
  },
};

const initialState = {
  // What the current page is
  current: Home,
  // Whether to show the UTK logo or Philosopher's Picture
  showUTK: true,
  navBarImage: Kant.navBarImage,
  // Set this to true when they are in the middle of the adventure.  I am sure I could
  // figure out a way to make it persist so that if they went to their profile everything would be saved,
  // but that is for later on.
  hideNavBarOptions: false,
  // What room of the adventure they are on.  This would be better titled to something like "Laboratory"
  // and the like, but for now, this works.
  room: Kant.room1,
  player: {
    name: 'Shit McGinty',
    inventory: [],
    points: 0,
  },
};

// I was told doing all this shit in the reducers is a bad idea.
// Pretty sure it doesn't affect performance, it is just the
// incorrect way to do it.
export default (state = initialState, action) => {
  let room = state.room;
  switch (action.type) {
    case actions.HANDLE_CURRENT:
      return { ...state, current: action.payload };
    case actions.HANDLE_ROOM_PICKUP:
      let updatedRoomObjects = state.room.objects.map((object) => {
        if (object.name === action.payload) {
          object.visible = false;
        }
        return object;
      });
      let updatedInventory = state.player.inventory;
      updatedInventory.push(action.payload);
      let player = state.player;
      player = { ...player, inventory: updatedInventory };
      room = { ...room, objects: updatedRoomObjects };
      return { ...state, room, player };
    case actions.HANDLE_ROOM_TRAVEL:
      return { ...state, room: Kant[action.payload] };
    case actions.HANDLE_ROOM_VISIBLE:
      let visibleObjects = room.objects.map((obj) => {
        if (obj.name === action.payload.name) {
          let change = !obj.visible;
          return { ...obj, visible: change };
        }
        return obj;
      });
      room = { ...room, objects: visibleObjects };
      return { ...state, room };
    default:
      return state;
  }
};
