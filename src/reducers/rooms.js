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
  initialTopBar: 'You approach the burial mound.  What do you do?',
  objects: [
    {
      id: 1,
      name: 'mound',
      image: mound,
      // x position from left of container
      width: 1200,
      height: 700,
      x: (window.innerWidth - 1200) / 2,
      // y position from top of container
      y: 200,
      z: 0,
      clicked: null,
      related: {
        x1: 525,
        y1: 216,
      },
      visible: true,
    },
    {
      id: 2,
      name: 'doorway',
      image: doorway,
      x: ['mound', 1],
      y: ['mound', 1],
      z: 1,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new "modal" is rendered from the left of the container.
        x: 525,
        // Where the new "modal" is rendered from the top of the container.
        y: 600,
        width: "15rem",
        height: "5rem",
        options: [
          {
            text: 'Yes',
            action: {
              type: 'transition',
              location: 'threeDoorsRoom',
            }
          },
          {
            text: 'No',
            action: null
          }
        ],
      },
      related: null,
      visible: true,
    },
  ],
};

export let threeDoorsRoom = {
  name: 'threedoors',
  initialTopBar:
    'You enter the room.  There are three doors, each blocked by a stone slab.  A sword is buried in a stone in the center of the room.  What do you do?',
  objects: [
    {
      id: 3,
      name: 'threeDoors',
      image: threeDoors,
      // x position from left of container
      width: 1200,
      height: 700,
      x: (window.innerWidth - 1200) / 2,
      // y position from top of container
      y: 200,
      z: 0,
      clicked: null,
      related: {
        x1: 781,
        y1: 113,
        x2: 505,
        y2: 235,
      },
      visible: true,
    },
    {
      id: 4,
      name: 'rightDoorway',
      image: rightDoorway,
      x: ['threeDoors', 1],
      y: ['threeDoors', 1],
      z: 1,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new "modal" is rendered from the left of the container.
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
      visible: false,
    },
    {
      id: 5,
      name: 'sword',
      image: sword,
      x: ['threeDoors', 2],
      y: ['threeDoors', 2],
      z: 2,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new "modal" is rendered from the left of the container.
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

export let golemRoom = {
  name: 'golem',
  initialTopBar: 'You enter the room.  There is a door, blocked by a stone golem.  What do you do?',
  objects: [
    {
      id: 6,
      name: 'golemDoorway',
      image: corridorFacing,
      // x position from left of container
      width: 1200,
      height: 700,
      x: (window.innerWidth - 1200) / 2,
      // y position from top of container
      y: 200,
      z: 0,
      clicked: null,
      related: {
        x1: 525,
        y1: 216,
        x2: 435,
        y2: 160,
      },
      visible: true,
    },
    {
      id: 7,
      name: 'doorway',
      image: doorway,
      x: ['golemDoorway', 1],
      y: ['golemDoorway', 1],
      z: 1,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new "modal" is rendered from the left of the container.
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
    {
      id: 8,
      name: 'golem',
      image: golem,
      x: ['golemDoorway', 2],
      y: ['golemDoorway', 2],
      z: 2,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new "modal" is rendered from the left of the container.
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

export let koboldRoom = {
  name: 'kobold',
  initialTopBar: 'You enter the room.  There is a door, blocked by a stone golem.  What do you do?',
  objects: [
    {
      id: 6,
      name: 'koboldDoorway',
      image: corridorFacingRightBlocked,
      // x position from left of container
      width: 1200,
      height: 700,
      x: (window.innerWidth - 1200) / 2,
      // y position from top of container
      y: 200,
      z: 0,
      clicked: null,
      related: {
        x1: 100,
        y1: 0,
        x2: 934,
        y2: 113,
        x3: 370,
        y3: 0,
        x4: 270,
        y4: 200,
      },
      visible: true,
    },
    {
      id: 7,
      name: 'kobold',
      image: kobold,
      x: ['koboldDoorway', 1],
      y: ['koboldDoorway', 1],
      z: 3,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new "modal" is rendered from the left of the container.
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
    {
      id: 7,
      name: 'doorway',
      image: doorway,
      x: ['koboldDoorway', 2],
      y: ['koboldDoorway', 2],
      z: 3,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new "modal" is rendered from the left of the container.
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
    {
      id: 8,
      name: 'koboldSpear',
      image: koboldSpear,
      x: ['koboldDoorway', 3],
      y: ['koboldDoorway', 3],
      z: 2,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new "modal" is rendered from the left of the container.
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
    {
      id: 9,
      name: 'koboldTreasure',
      image: koboldTreasure,
      x: ['koboldDoorway', 4],
      y: ['koboldDoorway', 4],
      z: 1,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new "modal" is rendered from the left of the container.
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

export let warriorRoom = {
  name: 'warrior',
  initialTopBar: 'You enter the room.  There is a door, blocked by a stone golem.  What do you do?',
  objects: [
    {
      id: 6,
      name: 'warriorDoorway',
      image: corridorFacingRightBlocked,
      // x position from left of container
      width: 1200,
      height: 700,
      x: (window.innerWidth - 1200) / 2,
      // y position from top of container
      y: 200,
      z: 0,
      clicked: null,
      related: {
        x1: 934,
        y1: 113,
        x2: 100,
        y2: 115,
      },
      visible: true,
    },
    {
      id: 7,
      name: 'doorway',
      image: doorway,
      x: ['warriorDoorway', 1],
      y: ['warriorDoorway', 1],
      z: 1,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new "modal" is rendered from the left of the container.
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
    {
      id: 8,
      name: 'warrior',
      image: warrior,
      x: ['warriorDoorway', 2],
      y: ['warriorDoorway', 2],
      z: 2,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        // Where the new "modal" is rendered from the left of the container.
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
