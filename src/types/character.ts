import { AbilityScore, Alignment, SkillName, Item } from './dnd5e';

export type StatGenerationMethod = 'standard' | 'pointbuy' | '4d6' | 'manual';

export interface CharacterIdentity {
  name: string;
  avatarUrl: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  eyes: string;
  hair: string;
  skin: string;
  physicalFeatures: string;
  voice: string;
  alignment: Alignment;
  religion: string;
  languages: string[];
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;
  alliesAndOrganizations: string;
  notes: string;
}

export interface CharacterSpellState {
  knownSpells: string[]; // spell IDs
  preparedSpells: string[]; // spell IDs
  spellSlotsUsed: Record<number, number>; // level -> used count
}

export interface CharacterCombatState {
  currentHp: number;
  maxHpBonus: number; // custom adjustments
  tempHp: number;
  usedHitDice: number;
  deathSaves: {
    successes: number; // 0..3
    failures: number; // 0..3
  };
  customAcBonus: number;
  customInitiativeBonus: number;
  customSpeedBonus: number;
}

export interface CharacterCurrency {
  cp: number;
  sp: number;
  ep: number;
  gp: number;
  pp: number;
}

export interface Character {
  id: string;
  createdAt: string;
  updatedAt: string;
  
  // Identity & Narrative
  identity: CharacterIdentity;
  
  // Level & Core
  level: number;
  raceId: string;
  subraceId?: string;
  classId: string;
  subclassId?: string;
  backgroundId: string;

  // Ability Scores
  statMethod: StatGenerationMethod;
  baseAbilityScores: Record<AbilityScore, number>;
  statBoostsFromAsi: Record<AbilityScore, number>;
  selectedFeats: string[];

  // Proficiencies
  selectedClassSkills: SkillName[];
  selectedBackgroundSkills: SkillName[];
  customSkillProficiencies: SkillName[];
  customToolProficiencies: string[];
  customLanguages: string[];

  // Combat & Vitality
  combat: CharacterCombatState;

  // Spells
  spells: CharacterSpellState;

  // Equipment & Inventory
  inventory: Item[];
  currency: CharacterCurrency;

  // Level Up Log / Choices
  levelUpHistory: Array<{
    level: number;
    hpGain: number;
    hpChoice: 'average' | 'roll';
    subclassChosen?: string;
    asiChosen?: {
      type: 'asi' | 'feat';
      stats?: Partial<Record<AbilityScore, number>>;
      featId?: string;
    };
    spellsLearned?: string[];
  }>;
}
