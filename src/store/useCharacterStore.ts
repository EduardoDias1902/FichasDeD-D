import { create } from 'zustand';
import { Character, StatGenerationMethod } from '../types/character';
import { AbilityScore, SkillName, Item } from '../types/dnd5e';
import {
  loadSavedCharacters,
  saveCharacterToStorage,
  deleteCharacterFromStorage,
  duplicateCharacterInStorage
} from '../services/storageService';
import { EQUIPMENT_DATA } from '../data/equipment';

const DEFAULT_NEW_CHARACTER: Character = {
  id: '',
  createdAt: '',
  updatedAt: '',
  identity: {
    name: '',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    gender: 'Não especificado',
    age: '25',
    height: '1.75m',
    weight: '70kg',
    eyes: 'Castanhos',
    hair: 'Pretos',
    skin: 'Morena',
    physicalFeatures: 'Cicatriz leve no ombro esquerdo',
    voice: 'Grave e calma',
    alignment: 'Neutro e Bom',
    religion: 'Nenhuma / Divindade local',
    languages: ['Comum'],
    personalityTraits: 'Sempre mantenho a calma em momentos de perigo.',
    ideals: 'Liberdade: Todos devem ser livres para traçar seu próprio destino.',
    bonds: 'Minha família e meus companheiros são meu maior tesouro.',
    flaws: 'Às vezes arrisco minha vida de forma imprudente para proteger inocentes.',
    backstory: 'Cresci em uma pequena vila na fronteira dos reinos, aprendendo cedo o valor da sobrevivência e da honra.',
    alliesAndOrganizations: 'Guilda de Aventureiros Local',
    notes: 'Anotações sobre a campanha e tesouros descobertos.'
  },
  level: 1,
  raceId: 'human',
  subraceId: 'human-standard',
  classId: 'fighter',
  backgroundId: 'soldier',
  statMethod: 'standard',
  baseAbilityScores: {
    STR: 15, DEX: 14, CON: 13, INT: 12, WIS: 10, CHA: 8
  },
  statBoostsFromAsi: {
    STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0
  },
  selectedFeats: [],
  selectedClassSkills: ['Atletismo', 'Intimidação'],
  selectedBackgroundSkills: ['Percepção'],
  customSkillProficiencies: [],
  customToolProficiencies: [],
  customLanguages: [],
  combat: {
    currentHp: 12,
    maxHpBonus: 0,
    tempHp: 0,
    usedHitDice: 0,
    deathSaves: { successes: 0, failures: 0 },
    customAcBonus: 0,
    customInitiativeBonus: 0,
    customSpeedBonus: 0
  },
  spells: {
    knownSpells: [],
    preparedSpells: [],
    spellSlotsUsed: {}
  },
  inventory: [
    { ...EQUIPMENT_DATA[0], equipped: true, quantity: 1 }, // Espada Longa
    { ...EQUIPMENT_DATA[6], equipped: true, quantity: 1 }, // Couro Batido
    { ...EQUIPMENT_DATA[10], equipped: false, quantity: 2 }, // Poções de cura
  ],
  currency: { cp: 0, sp: 0, ep: 0, gp: 15, pp: 0 },
  levelUpHistory: []
};

interface CharacterStoreState {
  characters: Character[];
  activeCharacter: Character | null;
  wizardStep: number;
  isWizardActive: boolean;
  
  // Wizard actions
  startNewCharacterWizard: () => void;
  setWizardStep: (step: number) => void;
  nextWizardStep: () => void;
  prevWizardStep: () => void;
  updateDraftIdentity: (identityPartial: Partial<Character['identity']>) => void;
  updateDraftRace: (raceId: string, subraceId?: string) => void;
  updateDraftClass: (classId: string, subclassId?: string) => void;
  updateDraftStatMethod: (method: StatGenerationMethod) => void;
  updateDraftBaseAbilityScores: (scores: Record<AbilityScore, number>) => void;
  updateDraftBackground: (backgroundId: string) => void;
  updateDraftClassSkills: (skills: SkillName[]) => void;
  finalizeCharacterCreation: () => void;

  // Active character actions
  loadCharacter: (id: string) => void;
  updateActiveCharacter: (characterPartial: Partial<Character>) => void;
  deleteCharacter: (id: string) => void;
  duplicateCharacter: (id: string) => void;
  
  // Combat & Vitality actions
  modifyHp: (delta: number) => void;
  setTempHp: (hp: number) => void;
  updateDeathSaves: (successes: number, failures: number) => void;
  performShortRest: () => void;
  performLongRest: () => void;

  // Inventory & Equipment actions
  toggleEquipItem: (itemId: string) => void;
  addItemToInventory: (item: Item) => void;
  removeItemFromInventory: (itemId: string) => void;
  updateCurrency: (currency: Character['currency']) => void;

  // Spellcasting actions
  toggleKnownSpell: (spellId: string) => void;
  togglePreparedSpell: (spellId: string) => void;
  useSpellSlot: (level: number) => void;
  restoreSpellSlot: (level: number) => void;

  // Leveling up
  levelUpActiveCharacter: (hpGain: number, subclassId?: string, asiBoost?: Partial<Record<AbilityScore, number>>, featId?: string) => void;
}

export const useCharacterStore = create<CharacterStoreState>((set, get) => ({
  characters: loadSavedCharacters(),
  activeCharacter: loadSavedCharacters()[0] || null,
  wizardStep: 1,
  isWizardActive: false,

  startNewCharacterWizard: () => {
    const newChar: Character = {
      ...DEFAULT_NEW_CHARACTER,
      id: `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set({
      activeCharacter: newChar,
      wizardStep: 1,
      isWizardActive: true
    });
  },

  setWizardStep: (step) => set({ wizardStep: Math.max(1, Math.min(8, step)) }),
  nextWizardStep: () => set(state => ({ wizardStep: Math.min(8, state.wizardStep + 1) })),
  prevWizardStep: () => set(state => ({ wizardStep: Math.max(1, state.wizardStep - 1) })),

  updateDraftIdentity: (identityPartial) => {
    const { activeCharacter } = get();
    if (!activeCharacter) return;

    set({
      activeCharacter: {
        ...activeCharacter,
        identity: { ...activeCharacter.identity, ...identityPartial }
      }
    });
  },

  updateDraftRace: (raceId, subraceId) => {
    const { activeCharacter } = get();
    if (!activeCharacter) return;

    set({
      activeCharacter: {
        ...activeCharacter,
        raceId,
        subraceId: subraceId || undefined
      }
    });
  },

  updateDraftClass: (classId, subclassId) => {
    const { activeCharacter } = get();
    if (!activeCharacter) return;

    set({
      activeCharacter: {
        ...activeCharacter,
        classId,
        subclassId: subclassId || undefined
      }
    });
  },

  updateDraftStatMethod: (method) => {
    const { activeCharacter } = get();
    if (!activeCharacter) return;

    set({
      activeCharacter: {
        ...activeCharacter,
        statMethod: method
      }
    });
  },

  updateDraftBaseAbilityScores: (scores) => {
    const { activeCharacter } = get();
    if (!activeCharacter) return;

    set({
      activeCharacter: {
        ...activeCharacter,
        baseAbilityScores: scores
      }
    });
  },

  updateDraftBackground: (backgroundId) => {
    const { activeCharacter } = get();
    if (!activeCharacter) return;

    set({
      activeCharacter: {
        ...activeCharacter,
        backgroundId
      }
    });
  },

  updateDraftClassSkills: (skills) => {
    const { activeCharacter } = get();
    if (!activeCharacter) return;

    set({
      activeCharacter: {
        ...activeCharacter,
        selectedClassSkills: skills
      }
    });
  },

  finalizeCharacterCreation: () => {
    const { activeCharacter, characters } = get();
    if (!activeCharacter) return;

    saveCharacterToStorage(activeCharacter);
    const updatedList = loadSavedCharacters();

    set({
      characters: updatedList,
      activeCharacter: activeCharacter,
      isWizardActive: false
    });
  },

  loadCharacter: (id) => {
    const { characters } = get();
    const target = characters.find(c => c.id === id);
    if (target) {
      set({ activeCharacter: target, isWizardActive: false });
    }
  },

  updateActiveCharacter: (characterPartial) => {
    const { activeCharacter } = get();
    if (!activeCharacter) return;

    const updated = { ...activeCharacter, ...characterPartial, updatedAt: new Date().toISOString() };
    saveCharacterToStorage(updated);

    set(state => ({
      activeCharacter: updated,
      characters: state.characters.map(c => c.id === updated.id ? updated : c)
    }));
  },

  deleteCharacter: (id) => {
    const remaining = deleteCharacterFromStorage(id);
    set({
      characters: remaining,
      activeCharacter: remaining[0] || null
    });
  },

  duplicateCharacter: (id) => {
    const clone = duplicateCharacterInStorage(id);
    if (clone) {
      const updatedList = loadSavedCharacters();
      set({
        characters: updatedList,
        activeCharacter: clone
      });
    }
  },

  modifyHp: (delta) => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter) return;

    let newCurrent = activeCharacter.combat.currentHp + delta;
    // Calculate max hp dynamically
    const maxHp = 30; // placeholder boundary
    newCurrent = Math.max(0, Math.min(maxHp, newCurrent));

    updateActiveCharacter({
      combat: {
        ...activeCharacter.combat,
        currentHp: newCurrent
      }
    });
  },

  setTempHp: (hp) => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter) return;

    updateActiveCharacter({
      combat: {
        ...activeCharacter.combat,
        tempHp: Math.max(0, hp)
      }
    });
  },

  updateDeathSaves: (successes, failures) => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter) return;

    updateActiveCharacter({
      combat: {
        ...activeCharacter.combat,
        deathSaves: { successes, failures }
      }
    });
  },

  performShortRest: () => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter) return;

    // Reset short rest spell slots (Warlock) or features
    const slots = { ...activeCharacter.spells.spellSlotsUsed };
    if (activeCharacter.classId === 'warlock') {
      Object.keys(slots).forEach(k => { slots[Number(k)] = 0; });
    }

    updateActiveCharacter({
      spells: {
        ...activeCharacter.spells,
        spellSlotsUsed: slots
      }
    });
  },

  performLongRest: () => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter) return;

    // Full HP restore, resets spell slots, death saves, hit dice
    updateActiveCharacter({
      combat: {
        ...activeCharacter.combat,
        currentHp: 999, // Max will be bounded by combat stats calculation
        tempHp: 0,
        usedHitDice: 0,
        deathSaves: { successes: 0, failures: 0 }
      },
      spells: {
        ...activeCharacter.spells,
        spellSlotsUsed: {}
      }
    });
  },

  toggleEquipItem: (itemId) => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter) return;

    const updatedInv = activeCharacter.inventory.map(item => {
      if (item.id === itemId) {
        return { ...item, equipped: !item.equipped };
      }
      return item;
    });

    updateActiveCharacter({ inventory: updatedInv });
  },

  addItemToInventory: (item) => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter) return;

    updateActiveCharacter({
      inventory: [...activeCharacter.inventory, item]
    });
  },

  removeItemFromInventory: (itemId) => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter) return;

    updateActiveCharacter({
      inventory: activeCharacter.inventory.filter(i => i.id !== itemId)
    });
  },

  updateCurrency: (currency) => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter) return;

    updateActiveCharacter({ currency });
  },

  toggleKnownSpell: (spellId) => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter) return;

    const known = activeCharacter.spells.knownSpells.includes(spellId)
      ? activeCharacter.spells.knownSpells.filter(id => id !== spellId)
      : [...activeCharacter.spells.knownSpells, spellId];

    updateActiveCharacter({
      spells: { ...activeCharacter.spells, knownSpells: known }
    });
  },

  togglePreparedSpell: (spellId) => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter) return;

    const prepared = activeCharacter.spells.preparedSpells.includes(spellId)
      ? activeCharacter.spells.preparedSpells.filter(id => id !== spellId)
      : [...activeCharacter.spells.preparedSpells, spellId];

    updateActiveCharacter({
      spells: { ...activeCharacter.spells, preparedSpells: prepared }
    });
  },

  useSpellSlot: (level) => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter) return;

    const currentUsed = activeCharacter.spells.spellSlotsUsed[level] || 0;
    updateActiveCharacter({
      spells: {
        ...activeCharacter.spells,
        spellSlotsUsed: {
          ...activeCharacter.spells.spellSlotsUsed,
          [level]: currentUsed + 1
        }
      }
    });
  },

  restoreSpellSlot: (level) => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter) return;

    const currentUsed = activeCharacter.spells.spellSlotsUsed[level] || 0;
    updateActiveCharacter({
      spells: {
        ...activeCharacter.spells,
        spellSlotsUsed: {
          ...activeCharacter.spells.spellSlotsUsed,
          [level]: Math.max(0, currentUsed - 1)
        }
      }
    });
  },

  levelUpActiveCharacter: (hpGain, subclassId, asiBoost, featId) => {
    const { activeCharacter, updateActiveCharacter } = get();
    if (!activeCharacter || activeCharacter.level >= 20) return;

    const newLevel = activeCharacter.level + 1;
    const newHistory = [
      ...activeCharacter.levelUpHistory,
      {
        level: newLevel,
        hpGain,
        hpChoice: 'average' as const,
        subclassChosen: subclassId,
        asiChosen: asiBoost ? { type: 'asi' as const, stats: asiBoost } : featId ? { type: 'feat' as const, featId } : undefined
      }
    ];

    const updatedAsiBoosts = { ...activeCharacter.statBoostsFromAsi };
    if (asiBoost) {
      Object.entries(asiBoost).forEach(([st, val]) => {
        if (val) updatedAsiBoosts[st as AbilityScore] += val;
      });
    }

    const selectedFeats = featId ? [...activeCharacter.selectedFeats, featId] : activeCharacter.selectedFeats;

    updateActiveCharacter({
      level: newLevel,
      subclassId: subclassId || activeCharacter.subclassId,
      statBoostsFromAsi: updatedAsiBoosts,
      selectedFeats,
      levelUpHistory: newHistory
    });
  }
}));
