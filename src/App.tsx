import React from 'react';
import { useCharacterStore } from './store/useCharacterStore';
import { Header } from './components/common/Header';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { SavedCharactersModal } from './components/common/SavedCharactersModal';
import { GlobalTooltipContainer } from './components/common/RuleTooltip';
import { WizardContainer } from './components/wizard/WizardContainer';
import { SheetDashboard } from './components/sheet/SheetDashboard';

export const App: React.FC = () => {
  const { isWizardActive } = useCharacterStore();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 font-sans pb-12 selection:bg-amber-500/30 selection:text-amber-200">
      <Header />

      <main className="pt-4">
        {isWizardActive ? <WizardContainer /> : <SheetDashboard />}
      </main>

      {/* Global Modals & Tooltips */}
      <GlobalSearchModal />
      <SavedCharactersModal />
      <GlobalTooltipContainer />
    </div>
  );
};

export default App;
