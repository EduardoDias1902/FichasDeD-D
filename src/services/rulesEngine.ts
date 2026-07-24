import { AbilityScore, SkillName, SKILL_DEFINITIONS } from '../types/dnd5e';
import { Character } from '../types/character';
import { RACES_DATA } from '../data/races';
import { CLASSES_DATA } from '../data/classes';

export const calculateModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

export const formatModifier = (mod: number): string => {
  return mod >= 0 ? `+${mod}` : `${mod}`;
};

export const calculateProficiencyBonus = (level: number): number => {
  return Math.ceil(1 + level / 4);
};

export interface FinalAbilityScores {
  base: Record<AbilityScore, number>;
  racial: Record<AbilityScore, number>;
  asi: Record<AbilityScore, number>;
  total: Record<AbilityScore, number>;
  modifiers: Record<AbilityScore, number>;
}

export const calculateAbilityScores = (character: Partial<Character>): FinalAbilityScores => {
  const base: Record<AbilityScore, number> = character.baseAbilityScores || {
    STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10
  };

  const racial: Record<AbilityScore, number> = {
    STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0
  };

  // Find Race & Subrace
  if (character.raceId) {
    const race = RACES_DATA.find(r => r.id === character.raceId);
    if (race) {
      Object.entries(race.abilityScoreBonus).forEach(([stat, val]) => {
        if (val) racial[stat as AbilityScore] += val;
      });

      if (character.subraceId && race.subraces) {
        const subrace = race.subraces.find(s => s.id === character.subraceId);
        if (subrace) {
          Object.entries(subrace.abilityScoreBonus).forEach(([stat, val]) => {
            if (val) racial[stat as AbilityScore] += val;
          });
        }
      }
    }
  }

  const asi: Record<AbilityScore, number> = character.statBoostsFromAsi || {
    STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0
  };

  const total: Record<AbilityScore, number> = {
    STR: base.STR + racial.STR + asi.STR,
    DEX: base.DEX + racial.DEX + asi.DEX,
    CON: base.CON + racial.CON + asi.CON,
    INT: base.INT + racial.INT + asi.INT,
    WIS: base.WIS + racial.WIS + asi.WIS,
    CHA: base.CHA + racial.CHA + asi.CHA,
  };

  const modifiers: Record<AbilityScore, number> = {
    STR: calculateModifier(total.STR),
    DEX: calculateModifier(total.DEX),
    CON: calculateModifier(total.CON),
    INT: calculateModifier(total.INT),
    WIS: calculateModifier(total.WIS),
    CHA: calculateModifier(total.CHA),
  };

  return { base, racial, asi, total, modifiers };
};

export interface CalculatedCombatStats {
  maxHp: number;
  armorClass: number;
  initiative: number;
  speed: number;
  passivePerception: number;
  passiveInvestigation: number;
  passiveInsight: number;
  carryingCapacity: number;
  spellSaveDc: number;
  spellAttackBonus: number;
  proficiencyBonus: number;
}

export const calculateCombatStats = (character: Partial<Character>): CalculatedCombatStats => {
  const level = character.level || 1;
  const pb = calculateProficiencyBonus(level);
  const scores = calculateAbilityScores(character);
  const conMod = scores.modifiers.CON;
  const dexMod = scores.modifiers.DEX;
  const wisMod = scores.modifiers.WIS;
  const intMod = scores.modifiers.INT;
  const strMod = scores.modifiers.STR;

  const dndClass = CLASSES_DATA.find(c => c.id === character.classId);
  const race = RACES_DATA.find(r => r.id === character.raceId);

  // 1. HP Calculation
  const hitDie = dndClass ? dndClass.hitDie : 8;
  let baseHp = hitDie + conMod;
  
  // Extra levels (avg hp per level = hitDie / 2 + 1)
  if (level > 1) {
    if (character.levelUpHistory && character.levelUpHistory.length > 0) {
      const extraGain = character.levelUpHistory.reduce((acc, curr) => acc + (curr.hpGain || Math.floor(hitDie / 2) + 1 + conMod), 0);
      baseHp += extraGain;
    } else {
      const avgGain = (Math.floor(hitDie / 2) + 1 + conMod) * (level - 1);
      baseHp += avgGain;
    }
  }

  // Hill Dwarf tenacity (+1 HP per lvl)
  if (character.subraceId === 'hill-dwarf') {
    baseHp += level;
  }
  // Draconic Sorcerer (+1 HP per lvl)
  if (character.subclassId === 'draconic-bloodline') {
    baseHp += level;
  }

  const maxHp = Math.max(1, baseHp + (character.combat?.maxHpBonus || 0));

  // 2. Armor Class (AC)
  let ac = 10 + dexMod;

  // Check equipped armor in inventory
  const equippedArmor = character.inventory?.find(i => i.category === 'Armaduras' && i.equipped && i.armorClassBonus && i.armorClassBonus > 5);
  const equippedShield = character.inventory?.find(i => i.name.toLowerCase().includes('escudo') && i.equipped);

  if (equippedArmor) {
    // Heavy armor vs Light vs Medium
    if (equippedArmor.id === 'plate-armor') {
      ac = 18;
    } else if (equippedArmor.id === 'chain-shirt') {
      ac = 13 + Math.min(2, dexMod);
    } else if (equippedArmor.id === 'studded-leather') {
      ac = 12 + dexMod;
    } else if (equippedArmor.id === 'leather-armor') {
      ac = 11 + dexMod;
    } else {
      ac = (equippedArmor.armorClassBonus || 10) + dexMod;
    }
  } else {
    // Unarmored Defenses
    if (character.classId === 'barbarian') {
      ac = 10 + dexMod + conMod;
    } else if (character.classId === 'monk') {
      ac = 10 + dexMod + wisMod;
    } else if (character.subclassId === 'draconic-bloodline') {
      ac = 13 + dexMod;
    }
  }

  if (equippedShield) {
    ac += 2;
  }

  ac += character.combat?.customAcBonus || 0;

  // 3. Speed
  let speed = race ? race.speed : 30;
  if (character.subraceId === 'wood-elf') speed += 5;
  speed += character.combat?.customSpeedBonus || 0;

  // 4. Initiative
  const initiative = dexMod + (character.combat?.customInitiativeBonus || 0);

  // 5. Passives & Skills Proficiencies
  const proficiencies = new Set<SkillName>([
    ...(character.selectedClassSkills || []),
    ...(character.selectedBackgroundSkills || []),
    ...(character.customSkillProficiencies || [])
  ]);

  if (race?.skillProficiencies) {
    race.skillProficiencies.forEach(s => proficiencies.add(s));
  }

  const passivePerception = 10 + wisMod + (proficiencies.has('Percepção') ? pb : 0);
  const passiveInvestigation = 10 + intMod + (proficiencies.has('Investigação') ? pb : 0);
  const passiveInsight = 10 + wisMod + (proficiencies.has('Intuição') ? pb : 0);

  // 6. Carrying Capacity
  const carryingCapacity = scores.total.STR * 15;

  // 7. Spellcasting
  let spellcastingAbility = dndClass?.spellcastingAbility;
  if (character.subclassId === 'eldritch-knight' || character.subclassId === 'arcane-trickster') {
    spellcastingAbility = 'INT';
  }

  let spellSaveDc = 8 + pb;
  let spellAttackBonus = pb;

  if (spellcastingAbility) {
    const casterMod = scores.modifiers[spellcastingAbility];
    spellSaveDc += casterMod;
    spellAttackBonus += casterMod;
  }

  return {
    maxHp,
    armorClass: ac,
    initiative,
    speed,
    passivePerception,
    passiveInvestigation,
    passiveInsight,
    carryingCapacity,
    spellSaveDc,
    spellAttackBonus,
    proficiencyBonus: pb
  };
};

export interface CalculatedSkillBonus {
  name: SkillName;
  ability: AbilityScore;
  modifier: number;
  isProficient: boolean;
  totalBonus: number;
}

export const calculateSkillBonuses = (character: Partial<Character>): CalculatedSkillBonus[] => {
  const pb = calculateProficiencyBonus(character.level || 1);
  const scores = calculateAbilityScores(character);
  const race = RACES_DATA.find(r => r.id === character.raceId);

  const proficiencies = new Set<SkillName>([
    ...(character.selectedClassSkills || []),
    ...(character.selectedBackgroundSkills || []),
    ...(character.customSkillProficiencies || [])
  ]);

  if (race?.skillProficiencies) {
    race.skillProficiencies.forEach(s => proficiencies.add(s));
  }

  return Object.values(SKILL_DEFINITIONS).map(skillDef => {
    const isProf = proficiencies.has(skillDef.name);
    const statMod = scores.modifiers[skillDef.ability];
    const totalBonus = statMod + (isProf ? pb : 0);

    return {
      name: skillDef.name,
      ability: skillDef.ability,
      modifier: statMod,
      isProficient: isProf,
      totalBonus
    };
  });
};
