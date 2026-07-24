import { create } from 'zustand';

export type SheetTab = 'summary' | 'combat' | 'spells' | 'inventory' | 'features' | 'bio' | 'notes';

interface TooltipData {
  title: string;
  description: string;
  category?: string;
  x: number;
  y: number;
}

interface UIStoreState {
  activeSheetTab: SheetTab;
  isSearchOpen: boolean;
  isLevelUpOpen: boolean;
  isSavedCharactersModalOpen: boolean;
  activeTooltip: TooltipData | null;

  setActiveSheetTab: (tab: SheetTab) => void;
  toggleSearchModal: (open?: boolean) => void;
  toggleLevelUpModal: (open?: boolean) => void;
  toggleSavedCharactersModal: (open?: boolean) => void;
  showTooltip: (data: TooltipData) => void;
  hideTooltip: () => void;
}

export const useUIStore = create<UIStoreState>((set) => ({
  activeSheetTab: 'summary',
  isSearchOpen: false,
  isLevelUpOpen: false,
  isSavedCharactersModalOpen: false,
  activeTooltip: null,

  setActiveSheetTab: (tab) => set({ activeSheetTab: tab }),
  toggleSearchModal: (open) => set(state => ({ isSearchOpen: open !== undefined ? open : !state.isSearchOpen })),
  toggleLevelUpModal: (open) => set(state => ({ isLevelUpOpen: open !== undefined ? open : !state.isLevelUpOpen })),
  toggleSavedCharactersModal: (open) => set(state => ({ isSavedCharactersModalOpen: open !== undefined ? open : !state.isSavedCharactersModalOpen })),
  showTooltip: (data) => set({ activeTooltip: data }),
  hideTooltip: () => set({ activeTooltip: null }),
}));
