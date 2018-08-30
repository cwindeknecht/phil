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

import * as opponents from './opponents';

let golemHint = `https://www.earlymoderntexts.com/assets/pdfs/kant1785.pdf#page=24`;

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
            link: {
              show: false,
              page: 0,
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
  options: [],
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
              link: {
                show: false,
                page: 0,
              },
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
                [{ name: 'Formula of Universal Law', type: 'add' }],
              ],
              topBar:
                'You take the half-sword.The Formula of Universal Law has been added to your gear.  The stone slab to the east moves from the doorway.',
              link: null,
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
      visible: true,
      x: 400,
      y: 600,
      z: 2,
      type: 'examine',
      text: 'Examine Room?',
      topBar:
        'You examine the sword, or rather half-sword.  An inscription on the blade reads, "act as though the maxim of your action were to become, through your will, a universal law of nature."',
      link: {
        show: true,
        page: 24,
      },
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
      x: 690,
      y: 410,
      z: 1,
      // what happens on click
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
              location: 'koboldRoom',
              link: {
                show: false,
                page: 0,
              },
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
      id: 8,
      name: 'golem',
      image: golem,
      x: 600,
      y: 350,
      z: 2,
      // what happens on click
      clicked: {
        show: false,
        text: 'Talk to the Golem?',
        width: '25rem',
        height: '5rem',
        options: [
          {
            text: 'Yes',
            action: {
              //index is linked to what it affects
              // so in this instance, 0 would be visible, and it should alter sword and rightDoorway
              type: ['talk'],
              affects: null,
              first: [
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value: '*The golem is muttering to himself "you shall not..." over and over*',
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    "Oh what's the use... Do you know my purpose, the whole reason I exist, is to stand in front of this doorway? What sort of life is that...",
                },
                {
                  id: 1,
                  type: 'button',
                  className: 'talk__elements__button',
                  value:
                    "Tell him to do what he wants. It's his life, he should be able to end it if he wants to end it.",
                },
                {
                  id: 2,
                  type: 'button',
                  className: 'talk__elements__button',
                  value: 'Tell him that suicide is never the answer.',
                  giveXP: 1,
                },
                {
                  type: 'a',
                  className: 'talk__elements__link',
                  href: golemHint,
                  target: '_blank',
                  value: 'See p.24',
                },
              ],
              second: [
                {
                  id: 1,
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    'The golem looks at you, tears running down the channels beneath his eyes.  His expression is incredulous because of what you just said.',
                  remove: [{type:'object', name:'golem'},{type:'option',name:'battle'}],
                  add: 'doorway',
                },
                {
                  id: 1,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: '"Thank you for understanding."',
                  remove: [{type:'object', name:'golem'},{type:'option',name:'battle'}],
                  add: 'doorway',
                },
                {
                  id: 1,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: 'Summoning the force of a thousand gods, he explodes shards of splintered stone.',
                  remove: [{type:'object', name:'golem'},{type:'option',name:'battle'}],
                  add: 'doorway',
                },
                {
                  id: 2,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: 'The golem looks at you, his eyes blazing like two coals aflame.',
                  remove: [{type:'object', name:'golem'},{type:'option',name:'battle'}],
                  add: 'doorway',
                },
                {
                  id: 2,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: 'Begrudgingly, he says, "You shall...pass..." <<< +1 XP >>>',
                  remove: [{type:'object', name:'golem'},{type:'option',name:'battle'}],
                  add: 'doorway',
                },
                {
                  id: 0,
                  type: 'button',
                  className: 'talk__elements__button',
                  value: 'Return',
                  action: 'return',
                  return: 'Main',
                },
              ],
              link: null,
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
      visible: true,
      x: 350,
      y: 600,
      z: 2,
      type: 'examine',
      text: 'Examine Room?',
      topBar:
        'You examine the room.  A golem stands in front of the doorway and looks lost, sad even.  Tears have eroded shallow channels beneath his eyes',
      link: null,
    },
    {
      visible: true,
      x: 925,
      y: 600,
      z: 2,
      type: 'battle',
      text: 'Battle?',
      topBar: null,
      link: null,
      opponent: opponents.golem,
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
