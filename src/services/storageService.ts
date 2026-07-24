import { Character } from '../types/character';

const STORAGE_KEY = 'dnd5e_dark_fantasy_characters_v1';
const ACTIVE_CHAR_KEY = 'dnd5e_dark_fantasy_active_id_v1';

export const loadSavedCharacters = (): Character[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Character[];
  } catch (err) {
    console.error('Erro ao carregar personagens do LocalStorage:', err);
    return [];
  }
};

export const saveCharacterToStorage = (character: Character): void => {
  try {
    const existing = loadSavedCharacters();
    const index = existing.findIndex(c => c.id === character.id);
    const updatedChar = { ...character, updatedAt: new Date().toISOString() };

    if (index >= 0) {
      existing[index] = updatedChar;
    } else {
      existing.unshift(updatedChar);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    localStorage.setItem(ACTIVE_CHAR_KEY, character.id);
  } catch (err) {
    console.error('Erro ao salvar personagem no LocalStorage:', err);
  }
};

export const deleteCharacterFromStorage = (id: string): Character[] => {
  try {
    const existing = loadSavedCharacters();
    const filtered = existing.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

    const activeId = localStorage.getItem(ACTIVE_CHAR_KEY);
    if (activeId === id) {
      localStorage.removeItem(ACTIVE_CHAR_KEY);
    }

    return filtered;
  } catch (err) {
    console.error('Erro ao deletar personagem:', err);
    return [];
  }
};

export const duplicateCharacterInStorage = (id: string): Character | null => {
  const existing = loadSavedCharacters();
  const target = existing.find(c => c.id === id);
  if (!target) return null;

  const clone: Character = JSON.parse(JSON.stringify(target));
  clone.id = `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  clone.identity.name = `${clone.identity.name} (Cópia)`;
  clone.createdAt = new Date().toISOString();
  clone.updatedAt = new Date().toISOString();

  saveCharacterToStorage(clone);
  return clone;
};

export const exportCharacterToJson = (character: Character): void => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(character, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `${character.identity.name || 'personagem'}_dnd5e.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const importCharacterFromJson = (jsonString: string): Character | null => {
  try {
    const parsed = JSON.parse(jsonString) as Character;
    if (!parsed.identity || !parsed.classId || !parsed.raceId) {
      throw new Error('Arquivo JSON inválido para personagem de D&D 5e.');
    }
    parsed.id = `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    parsed.updatedAt = new Date().toISOString();
    saveCharacterToStorage(parsed);
    return parsed;
  } catch (err) {
    console.error('Erro ao importar JSON:', err);
    return null;
  }
};
