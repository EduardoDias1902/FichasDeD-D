import React from 'react';
import { User, Shield, Heart, Sword, Wand2, Package, Award, BookOpen, ArrowUpCircle, Sparkles } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { useUIStore, SheetTab } from '../../store/useUIStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { calculateCombatStats, formatModifier } from '../../services/rulesEngine';
import { RACES_DATA } from '../../data/races';
import { CLASSES_DATA } from '../../data/classes';
import { TabSummary } from './TabSummary';
import { TabCombat } from './TabCombat';
import { TabSpells } from './TabSpells';
import { TabInventory } from './TabInventory';
import { TabFeatures } from './TabFeatures';
import { TabBio } from './TabBio';
import { LevelUpModal } from './LevelUpModal';

const TABS: { id: SheetTab; label: string; icon: React.ReactNode }[] = [
  { id: 'summary', label: 'Resumo', icon: <User className="w-4 h-4" /> },
  { id: 'combat', label: 'Combate', icon: <Sword className="w-4 h-4" /> },
  { id: 'spells', label: 'Magias', icon: <Wand2 className="w-4 h-4" /> },
  { id: 'inventory', label: 'Inventário', icon: <Package className="w-4 h-4" /> },
  { id: 'features', label: 'Características', icon: <Award className="w-4 h-4" /> },
  { id: 'bio', label: 'História & Notas', icon: <BookOpen className="w-4 h-4" /> },
];

export const SheetDashboard: React.FC = () => {
  const { activeCharacter, startNewCharacterWizard } = useCharacterStore();
  const { activeSheetTab, setActiveSheetTab, toggleLevelUpModal } = useUIStore();

  if (!activeCharacter) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center py-20">
        <Card variant="gold" className="p-8 max-w-md mx-auto space-y-4">
          <Shield className="w-16 h-16 text-amber-400 mx-auto" />
          <h2 className="text-2xl font-cinzel font-bold text-amber-300">Nenhum Herói Ativo</h2>
          <p className="text-sm text-slate-300">Crie seu primeiro personagem de D&D 5e ou carregue uma ficha salva para começar!</p>
          <Button variant="gold" size="lg" className="w-full" onClick={startNewCharacterWizard}>
            Iniciar Forja de Heróis
          </Button>
        </Card>
      </div>
    );
  }

  const combatStats = calculateCombatStats(activeCharacter);
  const race = RACES_DATA.find(r => r.id === activeCharacter.raceId);
  const dndClass = CLASSES_DATA.find(c => c.id === activeCharacter.classId);

  const renderActiveTabContent = () => {
    switch (activeSheetTab) {
      case 'summary': return <TabSummary />;
      case 'combat': return <TabCombat />;
      case 'spells': return <TabSpells />;
      case 'inventory': return <TabInventory />;
      case 'features': return <TabFeatures />;
      case 'bio': return <TabBio />;
      default: return <TabSummary />;
    }
  };

  return (
    <div id="character-sheet-printable" className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Hero Header Banner */}
      <Card variant="gold" glow className="p-5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 w-full md:w-auto">
          <img
            src={activeCharacter.identity.avatarUrl}
            alt={activeCharacter.identity.name}
            className="w-24 h-24 rounded-xl object-cover border-2 border-amber-400 shadow-gold-glow shrink-0"
          />
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-cinzel font-bold text-amber-300 truncate">
                {activeCharacter.identity.name || 'Herói Sem Nome'}
              </h2>
              <Badge variant="gold">Nível {activeCharacter.level}</Badge>
              <Badge variant="neutral">{activeCharacter.identity.alignment}</Badge>
            </div>
            <p className="text-xs text-amber-400 font-mono">
              {race?.name} {dndClass?.name} {activeCharacter.subclassId ? `(${dndClass?.subclasses.find(s => s.id === activeCharacter.subclassId)?.name})` : ''} • {activeCharacter.backgroundId}
            </p>
            <p className="text-xs text-slate-400 line-clamp-1 font-sans">
              "{activeCharacter.identity.personalityTraits}"
            </p>
          </div>
        </div>

        {/* Core Quick Combat Stats Widget */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end font-mono text-xs">
          <div className="bg-slate-900/90 p-2.5 rounded-lg border border-red-900/50 text-center min-w-[70px]">
            <span className="text-slate-400 block text-[10px]">HP</span>
            <strong className="text-red-400 text-sm">{activeCharacter.combat.currentHp}/{combatStats.maxHp}</strong>
          </div>

          <div className="bg-slate-900/90 p-2.5 rounded-lg border border-amber-500/30 text-center min-w-[70px]">
            <span className="text-slate-400 block text-[10px]">CA</span>
            <strong className="text-amber-300 text-sm">{combatStats.armorClass}</strong>
          </div>

          <div className="bg-slate-900/90 p-2.5 rounded-lg border border-amber-500/30 text-center min-w-[70px]">
            <span className="text-slate-400 block text-[10px]">Iniciativa</span>
            <strong className="text-amber-200 text-sm">{formatModifier(combatStats.initiative)}</strong>
          </div>

          <div className="bg-slate-900/90 p-2.5 rounded-lg border border-amber-500/30 text-center min-w-[70px]">
            <span className="text-slate-400 block text-[10px]">Deslocamento</span>
            <strong className="text-slate-200 text-sm">{combatStats.speed}ft</strong>
          </div>
        </div>
      </Card>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-amber-500/30 pb-2">
        {TABS.map((tab) => {
          const isActive = activeSheetTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveSheetTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-cinzel text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-gold-glow'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content */}
      <div className="min-h-[450px]">
        {renderActiveTabContent()}
      </div>

      {/* Modals */}
      <LevelUpModal />
    </div>
  );
};
