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
let warriorHint = `https://www.earlymoderntexts.com/assets/pdfs/kant1785.pdf#page=25`;

export let outside = {
  name: 'outside',
  topBar: 'You approach the burial mound.  What do you do?',
  objects: [
    {
      id: 1,
      name: 'mound',
      image: mound,
      width: 80,
      height: 40,
      x: 10,
      y: 40,
      z: 0,
      clicked: null,
      visible: true,
    },
    {
      id: 2,
      name: 'doorway',
      image: doorway,
      width: 10,
      height: 17,
      x: 45,
      y: 56,
      z: 1,
      // what happens on click
      clicked: {
        show: false,
        text: 'Go inside?',
        width: 20,
        height: 15,
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
      width: 80,
      height: 40,
      x: 10,
      y: 40,
      z: 0,
      clicked: null,
      visible: true,
    },
    {
      id: 4,
      name: 'rightDoorway',
      image: rightDoorway,
      width: 11,
      height: 19,
      x: 62,
      y: 50,
      z: 1,
      clicked: {
        text: 'Go inside?',
        show: false,
        width: 25,
        height: 15,
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
      width: 7,
      height: 14,
      x: 43.5,
      y: 58,
      z: 1,
      // what happens on click
      clicked: {
        show: false,
        text: 'Take the Sword',
        width: 25,
        height: 15,
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
      width: 30,
      height: 15,
      x: 0,
      y: 80,
      z: 2,
      type: 'examine',
      text: 'Examine?',
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
      width: 80,
      height: 50,
      x: 10,
      // y position from top of container
      y: 20,
      z: 0,
      clicked: null,
      visible: true,
    },
    {
      id: 7,
      name: 'doorway',
      image: doorway,
      width: 10,
      height: 21,
      x: 45,
      y: 41,
      z: 1,
      // what happens on click
      clicked: {
        text: 'Go inside?',
        show: false,
        height: 14,
        x: 43.5,
        y: 58,
        z: 1,
        options: [
          {
            id: 7,
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
      width: 20,
      height: 33,
      x: 40,
      y: 35,
      z: 2,
      // what happens on click
      clicked: {
        show: false,
        text: 'Talk to the Golem?',
        width: 20,
        height: 10,
        options: [
          {
            id: 8,
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
                  value: 'The golem is muttering to himself "you shall not..." over and over',
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    '"Oh what\'s the use... Do you know my purpose, the whole reason I exist, is to stand in front of this doorway? What sort of life is that..."',
                },
                {
                  id: 1,
                  type: 'button',
                  className: 'talk__elements__button',
                  value:
                    "Tell him to do what he wants. It's his life, he should be able to end it if he wants to end it.",
                  next: 'second',
                },
                {
                  id: 2,
                  type: 'button',
                  className: 'talk__elements__button',
                  value: 'Tell him that suicide is never the answer.',
                  giveXP: 1,
                  next: 'second',
                },
                {
                  id: 10,
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
                  remove: [
                    { type: 'object', name: 'golem' },
                    { type: 'option', name: 'battle' },
                    { type: 'option', name: 'examine' },
                  ],
                  add: 'doorway',
                },
                {
                  id: 1,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: '"Thank you for understanding."',
                  remove: [
                    { type: 'object', name: 'golem' },
                    { type: 'option', name: 'battle' },
                    { type: 'option', name: 'examine' },
                  ],
                  add: 'doorway',
                },
                {
                  id: 1,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: 'Summoning the force of a thousand gods, he explodes into shards of splintered stone.',
                  remove: [
                    { type: 'object', name: 'golem' },
                    { type: 'option', name: 'battle' },
                    { type: 'option', name: 'examine' },
                  ],
                  add: 'doorway',
                },
                {
                  id: 2,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: 'The golem looks at you, his eyes blazing like two coals aflame.',
                  remove: [
                    { type: 'object', name: 'golem' },
                    { type: 'option', name: 'battle' },
                    { type: 'option', name: 'examine' },
                  ],
                  add: 'doorway',
                },
                {
                  id: 2,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: 'Begrudgingly, he says, "You shall...pass..."',
                  remove: [
                    { type: 'object', name: 'golem' },
                    { type: 'option', name: 'battle' },
                    { type: 'option', name: 'examine' },
                  ],
                  add: 'doorway',
                },
                {
                  id: 2,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: '<<< +1 XP >>>',
                  remove: [
                    { type: 'object', name: 'golem' },
                    { type: 'option', name: 'battle' },
                    { type: 'option', name: 'examine' },
                  ],
                  add: 'doorway',
                },
                {
                  id: 10,
                  type: 'button',
                  className: 'talk__elements__link',
                  value: 'Continue',
                  next: 'third',
                },
              ],
              third: [
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value: "Kant argues that suicide can't be universalized.",
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    'Basically, if we thank we are driven to suicide, we are wrong, because we are naturally driven toward the affirmation of life, not its destruction',
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    "Thus, we have a perfect duty to the self to not commit suicide.  Don't commit suicide --- ever.",
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    'Further consideration: do you think we have a natural drive toward life?  What about parents literally sacrificing themselves for their children?',
                },
                {
                  type: 'a',
                  className: 'talk__elements__link',
                  href: golemHint,
                  target: '_blank',
                  value: 'See p.24',
                },
                {
                  id: 10,
                  type: 'button',
                  className: 'talk__elements__link',
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
      width: 30,
      height: 15,
      x: 0,
      y: 80,
      z: 2,
      type: 'examine',
      text: 'Examine?',
      topBar:
        'You examine the room.  A golem stands in front of the doorway and looks lost, sad even.  Tears have eroded shallow channels beneath his eyes',
      link: null,
    },
    {
      visible: true,
      width: 30,
      height: 15,
      x: 70,
      y: 80,
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
  topBar:
    'You enter the room.  There is a door, blocked by a stone slab.  A kobold stands guard in front of a treasure chest.  What do you do?',
  objects: [
    {
      id: 6,
      name: 'koboldDoorway',
      image: corridorFacingRightBlocked,
      // x position from left of container
      width: 80,
      height: 50,
      x:10,
      // y position from top of container
      y: 20,
      z: 0,
      clicked: null,
      visible: true,
    },
    {
      id: 7,
      name: 'kobold',
      image: kobold,
      width: 30,
      height: 50,
      x: 20,
      y: 34,
      z: 3,
      // what happens on click
      clickable: true,
      clicked: {
        show: false,
        text: 'Talk to the Kobold?',
        width: 20,
        height: 15,
        options: [
          {
            id: 7,
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
                  value: '"Another adventurer..." he half sighs, half hisses at you.  "I suppose you want through?"',
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    '"As you can see", he gestures to the pile of treasure, "quite a few of you have come and gone."',
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    'He smiles and licks his lips.  "One hundred coins and I\'ll open the door for you."  What do you do?',
                },
                {
                  id: 1,
                  type: 'button',
                  className: 'talk__elements__button',
                  value: "Tell him that you don't have the coins and you probably never will.",
                  giveXP: 1,
                  next: 'second',
                },
                {
                  id: 2,
                  type: 'button',
                  className: 'talk__elements__button',
                  value:
                    "Tell him you'll pay him back, but you don't have the coins right now.  It's not you'll ever see him again.",
                  next: 'second',
                },
                {
                  id: 10,
                  type: 'a',
                  className: 'talk__elements__link',
                  href: golemHint,
                  target: '_blank',
                  value: 'See p.24-25',
                },
              ],
              second: [
                {
                  id: 1,
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    '"An honest adventurer?  Kurtalmak be praised.  Maybe I shouldn\' be so quick to judge your type."',
                  remove: [{ type: 'option', name: 'battle' }, { type: 'option', name: 'examine' }],
                  add: 'doorway',
                },
                {
                  id: 1,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: '"Perhaps you are worthy to wield the Categorical Imperative."',
                  remove: [{ type: 'option', name: 'battle' }, { type: 'option', name: 'examine' }],
                  add: 'doorway',
                },
                {
                  id: 1,
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    'The kobold points his spear toward the northern exit.  The spearhead gives off a light blue hue and the stone slab disappears.',
                  remove: [{ type: 'option', name: 'battle' }, { type: 'option', name: 'examine' }],
                  add: 'doorway',
                },
                {
                  id: 1,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: '<<< +1 XP >>>',
                  remove: [{ type: 'option', name: 'battle' }, { type: 'option', name: 'examine' }],
                  add: 'doorway',
                },
                {
                  id: 2,
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    '"Do I look dumb enough to trust the word of a lowly adventurer?  The only thing you care about is coin!"',
                  remove: [{ type: 'option', name: 'battle' }, { type: 'option', name: 'examine' }],
                  add: 'doorway',
                },
                {
                  id: 2,
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    'The kobold, disgusted by you, just wants you out of his sight and he points the spear at the door and the slab disappears.',
                  remove: [{ type: 'option', name: 'battle' }, { type: 'option', name: 'examine' }],
                  add: 'doorway',
                },
                {
                  id: 2,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: '"Leave my sight you plebe.  You disgust me."',
                  remove: [{ type: 'option', name: 'battle' }, { type: 'option', name: 'examine' }],
                  add: 'doorway',
                },
                {
                  id: 10,
                  type: 'button',
                  className: 'talk__elements__link',
                  value: 'Continue',
                  next: 'third',
                },
              ],
              third: [
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value: "Kant argues that lying-promises can't be universalized.",
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    'If basically everyone were allowed to make lying-promises, no one would trust anyone, which would undermine the very possibility of making lying-promises.',
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value: "Thus, we have a perfect duty to others not to lie.  Don't lie --- ever.",
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    "Further consideration: Do you think it's always wrong to lie?  What about lies that help others?",
                },
                {
                  type: 'a',
                  className: 'talk__elements__link',
                  href: golemHint,
                  target: '_blank',
                  value: 'See p.24-25',
                },
                {
                  id: 10,
                  type: 'button',
                  className: 'talk__elements__link',
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
    {
      id: 8,
      name: 'doorway',
      image: doorway,
      width: 10, 
      height: 20,
      x: 72.3,
      y: 31,
      z: 1,
      // what happens on click
      clickable: true,
      clicked: {
        text: 'Go inside?',
        show: false,
        width: 15,
        height: 10,
        options: [
          {
            text: 'Yes',
            action: {
              type: ['transition'],
              location: 'warriorRoom',
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
      id: 9,
      name: 'koboldSpear',
      image: koboldSpear,
      width: 6,
      height: 62,
      x: 44,
      y: 23,
      z: 2,
      clickable: false,
      // what happens on click
      unclickable: 'Keep you hands off my spear!',
      clicked: {
        show: false,
        text: 'Take the Spear',
        width: 25,
        height: 15,
        options: [
          {
            text: 'Yes',
            action: {
              //index is linked to what it affects
              // so in this instance, 0 would be visible, and it should alter sword and rightDoorway
              type: ['visible', 'inventory'],
              affects: [
                [{ name: 'koboldSpear', visible: false }, { name: 'doorway', visible: true }],
                [{ name: "Kobold's Spear", type: 'add' }],
              ],
              topBar:
                'You pick up the spear, and as you are waving it around, you notice the arrow head at the top turns blue.  You point it at the door and stone slab disappears.',
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
    {
      id: 10,
      name: 'koboldTreasure',
      image: koboldTreasure,
      width:28,
      height: 26,
      x: 5,
      y: 34,
      z: 1,
      // what happens on click
      clickable: false,
      unclickable: 'Keep you hands off my treasure!',
      clicked: {
        show: false,
        text: 'Take the Treasure',
        width: 25,
        height: 15,
        options: [
          {
            text: 'Yes',
            action: {
              //index is linked to what it affects
              // so in this instance, 0 would be visible, and it should alter sword and rightDoorway
              type: ['visible', 'inventory'],
              affects: [[{ name: 'koboldTreasure', visible: false }], [{ name: "Kobold's Treasure", type: 'add' }]],
              topBar:
                "You rifle through the treasure chest and find treasure beyond your wildest dreams.  Too bad you didn't find any xp.",
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
      width: 30,
      height: 15,
      x: 0,
      y: 85,
      z: 2,
      type: 'examine',
      text: 'Examine?',
      topBar: 'You examine the kobold.  He stares back at you, unsurprised by your entrance, his spear at the ready.',
      link: null,
    },
    {
      
      visible: true,
      width: 30,
      height: 15,
      x: 70,
      y: 85,
      z: 2,
      type: 'battle',
      text: 'Battle?',
      topBar: null,
      link: null,
      opponent: opponents.kobold,
    },
  ],
};

export let warriorRoom = {
  name: 'warriorRoom',
  topBar:
    'You enter the room.  There is a door blocked by a stone slab.  An elf sits in front of a tv eating potato chips.  What do you do?',
  objects: [
    {
      id: 6,
      name: 'warriorDoorway',
      image: corridorFacingRightBlocked,
      // x position from left of container
      width: 80,
      height: 50,
      x: 0,
      // y position from top of container
      y: 30,
      z: 0,
      clicked: null,
      visible: true,
    },
    {
      id: 7,
      name: 'doorway',
      image: doorway,
      width: 10, 
      height: 20,
      x: 62.3,
      y: 41,
      z: 1,
      // what happens on click
      clickable: true,
      clicked: {
        text: 'Go inside?',
        show: false,
        width: 15,
        height: 10,
        options: [
          {
            text: 'Yes',
            action: {
              type: ['transition'],
              location: 'warriorRoom',
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
      visible: true,
    },
    {
      id: 8,
      name: 'warrior',
      image: warrior,
      width: 40,
      height: 40,
      x: 0,
      y: 45,
      z: 1,
      // what happens on click
      clickable: true,
      clicked: {
        show: false,
        text: 'Talk to the Warrior?',
        width: 20,
        height: 10,
        options: [
          {
            id: 8,
            text: 'Yes',
            action: {
              type: ['talk'],
              affects: null,
              first: [
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    'You get the elf\'s attention during the commercial break.  "Hey", she says, spewing crumbs from her mouth.  She continues to shovel hands of chips into her mouth as she talks.',
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    "\"You questin'?\"  The crumbs continue to fall as she wipes her hands on her pants.  \"Me too, or I was until I found this tv and bottomless bag of chips.  Questin' is hard.  Watchin' tv, eatin' chips... way easier.",
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    'She scoots over, and looks back to the tv.  "Next episode of Stranger Dragons starts in five," she mumbles as she shoves some more chips in here mouth.  What do you do?',
                },
                {
                  id: 1,
                  type: 'button',
                  className: 'talk__elements__button',
                  value: "Sit down.  Watch tv.  Eat chips.  Questin' is hard.",
                  next: 'second',
                },
                {
                  id: 2,
                  type: 'button',
                  className: 'talk__elements__button',
                  value: 'Tell her that your village is relying on you to attain the Categorical Imperative.',
                  next: 'second',
                  giveXP: 1,
                },
                {
                  id: 10,
                  type: 'a',
                  className: 'talk__elements__link',
                  href: warriorHint,
                  target: '_blank',
                  value: 'See p.25',
                },
              ],
              second: [
                {
                  id: 1,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: 'You sit down next to the elv, watch some tv, eat some chips, never to quest again.',
                  remove: [{ type: 'option', name: 'battle' }, { type: 'option', name: 'examine' }],
                },
                {
                  id: 2,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: '"Suit yourself."',
                  remove: [{ type: 'option', name: 'battle' }, { type: 'option', name: 'examine' }],
                  add: 'doorway',
                },
                {
                  id: 2,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: "She clicks the 'exit' button on the tv remote and the stone slab disappears.",
                  remove: [{ type: 'option', name: 'battle' }, { type: 'option', name: 'examine' }],
                  add: 'doorway',
                },
                {
                  id: 2,
                  type: 'div',
                  className: 'talk__elements__text',
                  value: '<<< +1 XP >>>',
                  remove: [{ type: 'option', name: 'battle' }, { type: 'option', name: 'examine' }],
                  add: 'doorway',
                },
                {
                  id: 10,
                  type: 'button',
                  className: 'talk__elements__link',
                  value: 'Continue',
                  next: 'third',
                },
              ],
              third: [
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value: "Kant argues that being lazy can't be universalized.",
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    'As a rational being, we want our abilities to be developed.  It would be irrational to will that everyone should be lazy.  It creates a contradiction in willing those who have an imperfect duty to action to not be lazy.',
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value: "Thus, we have a perfect duty to be not be lazy.  Don't be lazy --- ever.",
                },
                {
                  type: 'div',
                  className: 'talk__elements__text',
                  value:
                    "Further consideration: Do you think it's morally wrong to be lazy?  What about just having fun and not working to better yourself?",
                },
                {
                  type: 'a',
                  className: 'talk__elements__link',
                  href: golemHint,
                  target: '_blank',
                  value: 'See p.24-25',
                },
                {
                  id: 11,
                  type: 'button',
                  className: 'talk__elements__link',
                  value: '...',
                  transition: 'battle',
                },
                {
                  id: 10,
                  type: 'button',
                  className: 'talk__elements__link',
                  value: 'Return',
                  action: 'return',
                  return: 'Main',
                }
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
      width: 30,
      height: 15,
      x: 0,
      y: 85,
      z: 2,
      type: 'examine',
      text: 'Examine?',
      topBar:
        "You examine the elf.  She doesn't look happy that her tv watching has been interrupted.",
      link: null,
    },
    {
      visible: true,
      width: 30,
      height: 15,
      x: 70,
      y: 85,
      z: 2,
      type: 'battle',
      text: 'Battle?',
      topBar: null,
      link: null,
      opponent: opponents.warrior,
    },
  ],
  bonusOpponent: opponents.bagOfChips,
};
