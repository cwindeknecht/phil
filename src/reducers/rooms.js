import mound from '../imgs/BurialMound.png';
// import corridorFacing from '../imgs/CorridorFacing.png';
// import doorway from '../imgs/clickables/NormalDoorway.png';

import threeDoors from '../imgs/ThreeDoors.png';
import sword from '../imgs/clickables/ThreeDoorSword.png';
import rightDoorway from '../imgs/clickables/RightDoorway.png';

import golem from '../imgs/clickables/RockGolem.png';
import corridorFacing from '../imgs/CorridorFacing.png';
// import doorway from '../imgs/clickables/NormalDoorway.png';

import kobold from '../imgs/clickables/Kobold.png';
import koboldSpear from '../imgs/clickables/KoboldSpear.png';
import koboldTreasure from '../imgs/clickables/KoboldTreasure.png';
import corridorFacingRightBlocked from '../imgs/CorridorFacingRightBlocked.png';
// import doorway from '../imgs/clickables/NormalDoorway.png';

import warrior from '../imgs/clickables/DefeatedWarrior.png';
// import corridorFacingRightBlocked from '../imgs/CorridorFacingRight.png';
import doorway from '../imgs/clickables/NormalDoorway.png';

export let outside = {
  name: 'outside',
  topBar: 'You approach the burial mound.  What do you do?',
  objects: [
    {
      id: 1,
      name: 'mound',
      image: mound,
      width: 1200,
      height: 700,
      // x position from left of container
      x: (window.innerWidth - 1200) / 2 < 0 ? 0 : (window.innerWidth - 1200) / 2,
      // y position from top of container
      y: 200,
      z: 0,
      clicked: null,
      visible: true,
    },
    {
      id: 2,
      name: 'doorway',
      image: doorway,
      x: 690,
      y: 420,
      z: 1,
      // what happens on click
      clicked: {
        show: false,
        text: 'Go inside?',
        width: '15rem',
        height: '5rem',
        options: [
          {
            text: 'Yes',
            action: {
              type: ['transition'],
              location: 'threeDoorsRoom',
            },
          },
          {
            text: 'No',
            action: null,
          },
        ],
      },
      related: null,
      visible: true,
    },
  ],
};

export let threeDoorsRoom = {
  name: 'threeDoorsRoom',
  topBar:
    'You enter the room.  There are three doors, each blocked by a stone slab.  A sword is buried in a stone in the center of the room.  What do you do?',
  objects: [
    {
      id: 3,
      name: 'threeDoors',
      image: threeDoors,
      // x position from left of container
      width: 1200,
      height: 700,
      x: (window.innerWidth - 1200) / 2 < 0 ? 0 : (window.innerWidth - 1200) / 2,
      // y position from top of container
      y: 200,
      z: 0,
      clicked: null,
      visible: true,
    },
    {
      id: 4,
      name: 'rightDoorway',
      image: rightDoorway,
      x: 951,
      y: 313,
      z: 1,
      clicked: {
        text: 'Go inside?',
        show: false,
        width: '15rem',
        height: '5rem',
        options: [
          {
            text: 'Yes',
            action: {
              type: ['transition'],
              location: 'golemRoom',
            },
          },
          {
            text: 'No',
            action: null,
          },
        ],
      },
      related: null,
      visible: false,
    },
    {
      id: 5,
      name: 'sword',
      image: sword,
      x: 675,
      y: 440,
      z: 2,
      // what happens on click
      clicked: {
        show: false,
        text: 'Take the Sword',
        width: '20rem',
        height: '5rem',
        options: [
          {
            text: 'Yes',
            action: {
              //index is linked to what it affects
              // so in this instance, 0 would be visible, and it should alter sword and rightDoorway
              type: ['visible', 'inventory'],
              affects: [
                [{ name: 'sword', visible: false }, { name: 'rightDoorway', visible: true }],
                [{ name:'Formula of Universal Law', type: 'add'}],
              ],
              topBar:
                'You take the half-sword.The Formula of Universal Law has been added to your gear.  The stone slab to the east moves from the doorway.',
            },
          },
          {
            text: 'No',
            action: null,
          },
        ],
      },
      related: null,
      visible: true,
    },
  ],
  options: [
    {
      type: 'examine',
      topBar:
        'You examine the sword, or rather half-sword.  An inscription on the blade reads, "act as though the maxim of your action were to become, through your will, a universal law of nature. Further reading page 24"',
    },
  ],
};

export let golemRoom = {
  name: 'golemRoom',
  topBar: 'You enter the room.  There is a door, blocked by a stone golem.  What do you do?',
  objects: [
    {
      id: 6,
      name: 'golemDoorway',
      image: corridorFacing,
      // x position from left of container
      width: 1200,
      height: 700,
      x: (window.innerWidth - 1200) / 2 < 0 ? 0 : (window.innerWidth - 1200) / 2,
      // y position from top of container
      y: 200,
      z: 0,
      clicked: null,
      visible: true,
    },
    {
      id: 7,
      name: 'doorway',
      image: doorway,
      x: 525,
      y: 216,
      z: 1,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new popup is rendered from the left of the container.
        x: 525,
        // Where the new popup is rendered from the top of the container.
        y: 600,
        yes: {
          travel: true,
          location: 'threeDoors',
        },
        no: null,
      },
      related: null,
      visible: true,
    },
    {
      id: 8,
      name: 'golem',
      image: golem,
      x: 525,
      y: 216,
      z: 2,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new popup is rendered from the left of the container.
        x: 525,
        // Where the new popup is rendered from the top of the container.
        y: 600,
        yes: {
          travel: true,
          location: 'threeDoors',
        },
        no: null,
      },
      related: null,
      visible: true,
    },
  ],
};

export let koboldRoom = {
  name: 'koboldRoom',
  topBar: 'You enter the room.  There is a door, blocked by a stone golem.  What do you do?',
  objects: [
    {
      id: 6,
      name: 'koboldDoorway',
      image: corridorFacingRightBlocked,
      // x position from left of container
      width: 1200,
      height: 700,
      x: (window.innerWidth - 1200) / 2 < 0 ? 0 : (window.innerWidth - 1200) / 2,
      // y position from top of container
      y: 200,
      z: 0,
      clicked: null,
      visible: true,
    },
    {
      id: 7,
      name: 'kobold',
      image: kobold,
      x: 525,
      y: 216,
      z: 3,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new popup is rendered from the left of the container.
        x: 525,
        // Where the new popup is rendered from the top of the container.
        y: 600,
        yes: {
          travel: true,
          location: 'threeDoors',
        },
        no: null,
      },
      related: null,
      visible: true,
    },
    {
      id: 7,
      name: 'doorway',
      image: doorway,
      x: 525,
      y: 216,
      z: 3,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new popup is rendered from the left of the container.
        x: 525,
        // Where the new popup is rendered from the top of the container.
        y: 600,
        yes: {
          travel: true,
          location: 'threeDoors',
        },
        no: null,
      },
      related: null,
      visible: true,
    },
    {
      id: 8,
      name: 'koboldSpear',
      image: koboldSpear,
      x: 525,
      y: 216,
      z: 2,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new popup is rendered from the left of the container.
        x: 525,
        // Where the new popup is rendered from the top of the container.
        y: 600,
        yes: {
          travel: true,
          location: 'threeDoors',
        },
        no: null,
      },
      related: null,
      visible: true,
    },
    {
      id: 9,
      name: 'koboldTreasure',
      image: koboldTreasure,
      x: 525,
      y: 216,
      z: 1,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new popup is rendered from the left of the container.
        x: 525,
        // Where the new popup is rendered from the top of the container.
        y: 600,
        yes: {
          travel: true,
          location: 'threeDoors',
        },
        no: null,
      },
      related: null,
      visible: true,
    },
  ],
};

export let warriorRoom = {
  name: 'warriorRoom',
  topBar: 'You enter the room.  There is a door, blocked by a stone golem.  What do you do?',
  objects: [
    {
      id: 6,
      name: 'warriorDoorway',
      image: corridorFacingRightBlocked,
      // x position from left of container
      width: 1200,
      height: 700,
      x: (window.innerWidth - 1200) / 2 < 0 ? 0 : (window.innerWidth - 1200) / 2,
      // y position from top of container
      y: 200,
      z: 0,
      clicked: null,
      visible: true,
    },
    {
      id: 7,
      name: 'doorway',
      image: doorway,
      x: 525,
      y: 216,
      z: 1,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new popup is rendered from the left of the container.
        x: 525,
        // Where the new popup is rendered from the top of the container.
        y: 600,
        yes: {
          travel: true,
          location: 'threeDoors',
        },
        no: null,
      },
      related: null,
      visible: true,
    },
    {
      id: 8,
      name: 'warrior',
      image: warrior,
      x: 525,
      y: 216,
      z: 2,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new popup is rendered from the left of the container.
        x: 525,
        // Where the new "modal" is rendered from the top of the container.
        y: 600,
        yes: {
          travel: true,
          location: 'threeDoors',
        },
        no: null,
      },
      related: null,
      visible: true,
    },
  ],
};

// module.exports =  ({outside, threeDoorsRoom, golemRoom, koboldRoom, warriorRoom})
