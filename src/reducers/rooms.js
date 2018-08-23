import mound from '../imgs/BurialMound.png';
// import corridorFacingCenter from '../imgs/CorridorFacing.png';
// import doorway from '../imgs/clickables/NormalDoorway.png';

import golem from '../imgs/clickables/RockGolem.png';
import corridorFacingCenter from '../imgs/CorridorFacing.png';
// import doorway from '../imgs/clickables/NormalDoorway.png';

import kobold from '../imgs/clickables/Kobold.png';
import koboldSpear from '../imgs/clickables/KoboldSpear.png';
import koboldTreasure from '../imgs/clickables/KoboldTreasure.png';
// import corridorFacingRight from '../imgs/CorridorFacingRight.png';
// import doorway from '../imgs/clickables/NormalDoorway.png';

import warrior from '../imgs/clickables/DefeatedWarrior.png';
import corridorFacingRight from '../imgs/CorridorFacingRight.png';
import doorway from '../imgs/clickables/NormalDoorway.png';

export let room1 = {
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

export let room2 = {
  name: 'threeDoors',
};

export let room3 = {
  name: 'golem',
  initialTopBar: 'You enter the room.  There is a door, blocked by a stone golem.  What do you do?',
  objects: [
    {
      id: 3,
      name: 'golemDoorway',
      image: corridorFacingCenter,
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
      id: 4,
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
      id: 5,
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
