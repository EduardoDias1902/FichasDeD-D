export type AbilityScore = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export interface AbilityScoreInfo {
  key: AbilityScore;
  name: string;
  shortName: string;
  description: string;
}

export const ABILITY_SCORES: AbilityScoreInfo[] = [
  { key: 'STR', name: 'Força', shortName: 'FOR', description: 'Mede a força física, atletismo e capacidade de carga.' },
  { key: 'DEX', name: 'Destreza', shortName: 'DES', description: 'Mede agilidade, reflexos, equilíbrio e Furtividade.' },
  { key: 'CON', name: 'Constituição', shortName: 'CON', description: 'Mede a saúde, resistência física e pontos de vida.' },
  { key: 'INT', name: 'Inteligência', shortName: 'INT', description: 'Mede raciocínio lógico, memória, Arcanismo e conhecimento.' },
  { key: 'WIS', name: 'Sabedoria', shortName: 'SAB', description: 'Mede percepção, intuição, percepção do ambiente e Medicina.' },
  { key: 'CHA', name: 'Carisma', shortName: 'CAR', description: 'Mede a força de personalidade, persuasão e liderança.' },
];

export type SkillName =
  | 'Atletismo'
  | 'Acrobacia'
  | 'Prestidigitação'
  | 'Furtividade'
  | 'Arcanismo'
  | 'História'
  | 'Investigação'
  | 'Natureza'
  | 'Religião'
  | 'Lidar com Animais'
  | 'Intuição'
  | 'Medicina'
  | 'Percepção'
  | 'Sobrevivência'
  | 'Atuação'
  | 'Enganação'
  | 'Intimidação'
  | 'Persuasão';

export interface SkillDefinition {
  name: SkillName;
  ability: AbilityScore;
  description: string;
}

export const SKILL_DEFINITIONS: Record<SkillName, SkillDefinition> = {
  Atletismo: { name: 'Atletismo', ability: 'STR', description: 'Escalar, saltar, nadar e empurrar objetos pesados.' },
  Acrobacia: { name: 'Acrobacia', ability: 'DEX', description: 'Manter o equilíbrio em superfícies estreitas e manobras ágeis.' },
  Prestidigitação: { name: 'Prestidigitação', ability: 'DEX', description: 'Bater carteiras, ocultar objetos pequenos e truques com as mãos.' },
  Furtividade: { name: 'Furtividade', ability: 'DEX', description: 'Mover-se em silêncio e esconder-se das vistas inimigas.' },
  Arcanismo: { name: 'Arcanismo', ability: 'INT', description: 'Conhecimento sobre magia, planos de existência e itens mágicos.' },
  História: { name: 'História', ability: 'INT', description: 'Conhecimento sobre eventos históricos, reinos antigos e guerras.' },
  Investigação: { name: 'Investigação', ability: 'INT', description: 'Procurar pistas, deduzir informações e examinar objetos minuciosamente.' },
  Natureza: { name: 'Natureza', ability: 'INT', description: 'Conhecimento sobre terrenos, plantas, animais e clima.' },
  Religião: { name: 'Religião', ability: 'INT', description: 'Conhecimento sobre deuses, rituais sagrados, cultos e símbolos.' },
  'Lidar com Animais': { name: 'Lidar com Animais', ability: 'WIS', description: 'Acalmar feras, adestrar montarias e intuir intenções de animais.' },
  Intuição: { name: 'Intuição', ability: 'WIS', description: 'Detectar mentiras, prever ações de outros e sentir intenções.' },
  Medicina: { name: 'Medicina', ability: 'WIS', description: 'Estabilizar aliados moribundos e diagnosticar doenças e venenos.' },
  Percepção: { name: 'Percepção', ability: 'WIS', description: 'Notar detalhes ao redor, ouvir ruídos e detectar emboscadas.' },
  Sobrevivência: { name: 'Sobrevivência', ability: 'WIS', description: 'Rastrear criaturas, caçar, encontrar água e evitar perigos naturais.' },
  Atuação: { name: 'Atuação', ability: 'CHA', description: 'Dançar, cantar, atuar e entreter um público.' },
  Enganação: { name: 'Enganação', ability: 'CHA', description: 'Mentar convincentemente, disfarçar intenções e blefar.' },
  Intimidação: { name: 'Intimidação', ability: 'CHA', description: 'Ameaçar, coagir e impor presença assustadora.' },
  Persuasão: { name: 'Persuasão', ability: 'CHA', description: 'Convencer outros com diplomacia, charme e argumentação.' },
};

export type Alignment =
  | 'Leal e Bom'
  | 'Neutro e Bom'
  | 'Caótico e Bom'
  | 'Leal e Neutro'
  | 'Neutro'
  | 'Caótico e Neutro'
  | 'Leal e Mau'
  | 'Neutro e Mau'
  | 'Caótico e Mau';

export interface Trait {
  name: string;
  description: string;
  levelGranted?: number;
}

export interface Subrace {
  id: string;
  name: string;
  lore: string;
  abilityScoreBonus: Partial<Record<AbilityScore, number>>;
  traits: Trait[];
}

export interface Race {
  id: string;
  name: string;
  image: string;
  lore: string;
  summary: string;
  speed: number;
  size: 'Pequeno' | 'Médio' | 'Grande';
  darkvision: number; // in feet
  abilityScoreBonus: Partial<Record<AbilityScore, number>>;
  languages: string[];
  traits: Trait[];
  skillProficiencies?: SkillName[];
  weaponProficiencies?: string[];
  toolProficiencies?: string[];
  subraces?: Subrace[];
  recommendedClasses: string[];
}

export interface ClassLevelProgression {
  level: number;
  proficiencyBonus: number;
  features: string[];
  cantripsKnown?: number;
  spellsKnown?: number;
  spellSlots?: number[]; // [lvl1, lvl2, lvl3, ...]
  customCol1?: { label: string; value: string };
  customCol2?: { label: string; value: string };
}

export interface Subclass {
  id: string;
  name: string;
  lore: string;
  features: Trait[];
}

export interface DndClass {
  id: string;
  name: string;
  image: string;
  description: string;
  lore: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  playstyle: string;
  role: string;
  hitDie: number; // e.g. 8, 10, 12
  primaryAbility: AbilityScore[];
  savingThrows: AbilityScore[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  toolProficiencies: string[];
  skillChoiceCount: number;
  skillOptions: SkillName[];
  level1Features: Trait[];
  progressionTable: ClassLevelProgression[];
  subclasses: Subclass[];
  subclassUnlockLevel: number;
  isSpellcaster: boolean;
  spellcastingAbility?: AbilityScore;
}

export interface Background {
  id: string;
  name: string;
  lore: string;
  skillProficiencies: SkillName[];
  toolProficiencies: string[];
  languageCount: number;
  startingEquipment: string[];
  feature: Trait;
  suggestedTraits: string[];
  suggestedIdeals: string[];
  suggestedBonds: string[];
  suggestedFlaws: string[];
}

export type SpellSchool =
  | 'Abjuração'
  | 'Adivinhação'
  | 'Invocação'
  | 'Encantamento'
  | 'Evocação'
  | 'Ilusão'
  | 'Necromancia'
  | 'Transmutação';

export interface Spell {
  id: string;
  name: string;
  level: number; // 0 for cantrip
  school: SpellSchool;
  castingTime: string;
  range: string;
  components: {
    verbal?: boolean;
    somatic?: boolean;
    material?: boolean;
    materialDetails?: string;
  };
  duration: string;
  concentration: boolean;
  ritual: boolean;
  damageType?: string;
  description: string;
  higherLevels?: string;
  classes: string[]; // class IDs
}

export type ItemCategory =
  | 'Armas'
  | 'Armaduras'
  | 'Poções'
  | 'Pergaminhos'
  | 'Ferramentas'
  | 'Itens Mágicos'
  | 'Munições'
  | 'Tesouros'
  | 'Diversos';

export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  costInGp: number;
  weight: number; // lbs
  description: string;
  equipped?: boolean;
  quantity?: number;
  properties?: string[];
  damage?: string;
  damageType?: string;
  armorClassBonus?: number;
  stealthDisadvantage?: boolean;
}

export interface Feat {
  id: string;
  name: string;
  prerequisite?: string;
  description: string;
  abilityBonus?: Partial<Record<AbilityScore, number>>;
}

export interface RuleCondition {
  id: string;
  name: string;
  description: string;
}

export interface SynergyRating {
  stars: 1 | 2 | 3 | 4 | 5;
  title: string;
  reason: string;
}
