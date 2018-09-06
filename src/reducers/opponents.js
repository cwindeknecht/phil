export let golem = {
  name: 'golem',
  health: 8,
  initialText: 'The golem towers over you.  Larger than a doorway, dwarfing your tiny human body.',
  // how much their roll/damage is affected
  detriment: 2,
  // what character has to roll to hit
  // subtract detriment
  crit: 10,
  // max damage a character can deal, 1-2
  // subtrack detriment
  critDamage: 4,
  // what is displayed on a crit
  critText: 'You masterfully strike the golem and dodge out of the way when he attempts to attack',
  // maximum they have to roll to trade blows
  tradeHigh: 9,
  // minimum they have to roll to trade blows
  tradeLow: 6,
  // max damage the golem can do on a trade
  tradeDamageGive: 4,
  // what is displayed on a trade
  tradeText: 'You strike the golem but fail to get out of the way of his blow.',
  hitText: 'You fail to hit the golem, but he has no problem tagging you.',
  // what they have to roll to dodge
  dodge: 0,
  dodgeText: 'You both suck.  You strike aimlessley, the golem is mesmerised by your flailing movement.',
  victory: 'You destroyed the golem.',
  deathMessage: 'You were obliterated by the golem',
};

export let kobold = {
  name: 'kobold',
  health: 5,
  initialText:
    "Always ready for a fight, you would be wise to not think yourself at an advantage because of the kobold's stature.",
  // how much their roll/damage is affected
  detriment: 1,
  // what character has to roll to hit
  // subtract detriment
  crit: 9,
  // max damage a character can deal, 1-2
  // subtrack detriment
  critDamage: 5,
  // what is displayed on a crit
  critText: "The kobold's agility is no match for your quick strike.",
  // maximum they have to roll to trade blows
  tradeHigh: 8,
  // minimum they have to roll to trade blows
  tradeLow: 5,
  // max damage the golem can do on a trade
  tradeDamageGive: 2,
  // what is displayed on a trade
  tradeText: 'The both of you strike each other in the blink of an eye.',
  hitText: 'The kobold dances around you and you can do nothing but get tagged by his spear.',
  // what they have to roll to dodge
  dodge: 0,
  dodgeText:
    "You can't hit the kobold due to his frantic movements, but the kobold is too tired to put forth the effort required to strike back.",
  victory: "The kobold's tiny body lays at your feet.",
  deathMessage: 'You were stabbed to death by the kobold.',
};

export let warrior = {
  name: 'warrior',
  health: 7,
  initialText:
    "She may not care, but she was once a great warrior.",
  // how much their roll/damage is affected
  detriment: 1,
  // what character has to roll to hit
  // subtract detriment
  crit: 8,
  // max damage a character can deal, 1-2
  // subtrack detriment
  critDamage: 4,
  // what is displayed on a crit
  critText: "The warrior doesn't even care that you swung at her.",
  // maximum they have to roll to trade blows
  tradeHigh: 7,
  // minimum they have to roll to trade blows
  tradeLow: 4,
  // max damage the golem can do on a trade
  tradeDamageGive: 3,
  // what is displayed on a trade
  tradeText: 'You strike the warrior.  She strikes you with all the fury she could muster, mainly because you distracted her from her tv.',
  hitText: 'The tv goes to commercial and in a fit of rage of seeing another sword commercial she swings with might and knocks you back.',
  // what they have to roll to dodge
  dodge: 0,
  dodgeText:
    "You somehow miss the lackadaisical warrior, and she doesn't bother striking back.",
  victory: "The warrior lays dead on the ground.  She doesn't look much different.  You destroy her belongings to ensure no one else falls victim to their sloth enducing powers.  You grab the remote and hit 'exit' and the stone slab opens.",
  deathMessage: 'The warrior bludgeoned you carefully with her tv.',
};

export let bagOfChips = {
  name: 'bagOfChips',
  health: 1000,
  initialText:
    "Your greatest foe.  Your own sloth and gluttony in etheral form... the bag of potato chips sits there, mocking you.",
  // how much their roll/damage is affected
  detriment: 0,
  // what character has to roll to hit
  // subtract detriment
  crit: 10,
  // max damage a character can deal, 1-2
  // subtrack detriment
  critDamage: 4,
  // what is displayed on a crit
  critText: "You eat chips and don't feel any more full.",
  // maximum they have to roll to trade blows
  tradeHigh: 7,
  // minimum they have to roll to trade blows
  tradeLow: 4,
  // max damage the golem can do on a trade
  tradeDamageGive: 2,
  // what is displayed on a trade
  tradeText: 'You eat some chips and you can feel your arteries clogging.',
  hitText: 'You begin developing diabetes.',
  // what they have to roll to dodge
  dodge: 0,
  dodgeText:
    "You regurgitate into the bag.  More chips, yay!",
  victory: "You finished the whole bag and didn't die.  Awesome.",
  deathMessage: 'Your foot falls off, so you grab more chips and watch Stranger Dragons.',
};