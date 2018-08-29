export let golem = {
  name: 'golem',
  health: 8,
  initialText: 'The golem towers over you.  Larger than a doorway, he dwarfs your tiny human body.',
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
  tradeText: 'You are struck by the golem but fail to get out of the way of his blow.',
  hitText: 'You fail to hit the golem, but he has no problem tagging you.',
  // what they have to roll to dodge
  dodge: 0,
  dodgeText: 'You both suck.  You strike aimlessley, the golem is mesmerised by your flailing movement.',
  victory: 'You destroyed the golem.'
};
