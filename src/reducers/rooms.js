import mound from '../imgs/BurialMound.png';
import doorway from '../imgs/clickables/NormalDoorway.png';

export let room1 = {
  name: 'outside',
  initialTopBar: 'You approach the burial mound.  What do you do?',
  objects: [
    {
      id: 1,
      name: 'mound',
      image: mound,
      background: true,
      // x position from left of container
      x: 0,
      // y position from top of container
      y: 0,
      clicked: null,
      related: {
        x: 525,
        y: 377,
      },
    },
    {
      id: 2,
      name: 'doorway',
      image: doorway,
      background: false,
      x: 'mound',
      y: 'mound',
      // what happens on click
      clicked: {
        text: 'Go inside?',
        yes: {
          travel: true,
          location: 'golem',
        },
        no: null,
      },
      related: null,
    },
  ],
};

let room2 = {
  name: 'golem',
};
