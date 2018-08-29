import * as data from './data';

export default function create() {
  let level = 0;
  let xp = 0;
  let damageText = 'd4';
  // Damage set to 3, when "rolling", do math.random() * damage + 1
  let damage = 3;
  let armor = 0;
  // health 1-4
  let health = Math.floor(Math.random() * 3) + 1;
  // 1-2 for gender
  let gender = Math.random() > 0.5 ? 'Male' : 'Female';

  // 1-4 for ethnicity
  // 1-10 for human/dwarf/elf/halfling name
  let name = '';
  let hundred = Math.floor(Math.random() * 100);
  let ten = Math.floor(Math.random() * 10);
  let ethnicity = Math.floor(Math.random() * 4);
  switch (ethnicity) {
    case 0:
      ethnicity = 'Human';
      if (gender === 'Male') name = data.humanMale[hundred];
      else name = data.humanFemale[hundred];
      break;
    case 1:
      ethnicity = 'Elf';
      name = data.elfMale.split(',');
      if (gender === 'Male') name = data.elfMale.split(',')[ten];
      else name = data.elfFemale.split(',')[ten];
      break;
    case 2:
      ethnicity = 'Dwarf';
      if (gender === 'Male') name = data.dwarfMale.split(',')[ten];
      else name = data.dwarfFemale.split(',')[ten];
      break;
    case 3:
      ethnicity = 'Halfling';
      if (gender === 'Male') name = data.halflingMale.split(',')[ten];
      else name = data.halflingFemale.split(',')[ten];
      break;
    default:
      ethnicity = 'Human';
      gender = 'Female';
      name = 'Coco';
  }

  // 1-100 for gear
  let gear = data.equipment[Math.floor(Math.random() * 100)].split(',');
  gear.forEach((piece) => {
    if (piece.includes('+1 Damage')) {
      damage = 4;
      damageText = 'd4 + 1';
    }
    if (piece.includes('+1 Armor')) {
      armor = 1;
    }
  });

  // 1-100 for personality trait
  let personalityTraits = data.personalityTraits.split(',');
  let personality = personalityTraits[Math.floor(Math.random() * personalityTraits.length)];

  // 1-100 for physical trait
  // put all male only traits at the start of the array
  let physical = '';
  let traits = [];
  if (gender === 'Male') {
    traits = data.malePhysicalTraits.split(',');
    let num = Math.floor(Math.random() * traits.length);
    physical = traits[num];
  } else {
    traits = data.femalePhysicalTraits.split(',');
    let num = Math.floor(Math.random() * traits.length);
    physical = traits[num];
  }

  return {
    name,
    ethnicity,
    physical,
    gender,
    personality,
    gear,
    damageText,
    damage,
    armor,
    health,
    level,
    xp,
  };
}
