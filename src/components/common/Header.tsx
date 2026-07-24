import React from 'react';
import { Shield, Sparkles, Plus, Search, FolderOpen, Download, FileText, ArrowUpCircle, Copy } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { useUIStore } from '../../store/useUIStore';
import { Button } from '../ui/Button';
import { exportCharacterToJson } from '../../services/storageService';
import { exportSheetToPdf } from '../../services/pdfExporter';

export const Header: React.FC = () => {
  const { activeCharacter, startNewCharacterWizard, isWizardActive, duplicateCharacter } = useCharacterStore();
  const { toggleSearchModal, toggleLevelUpModal, toggleSavedCharactersModal } = useUIStore();

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-amber-600/30 px-4 py-3 shadow-glass">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-700 to-amber-900 flex items-center justify-center border border-amber-400/50 shadow-gold-glow">
            <Shield className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-cinzel font-black text-lg md:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
              FORJA DE HERÓIS
            </h1>
            <p className="text-[10px] uppercase font-mono tracking-widest text-amber-400/70">
              Character Builder D&D 5ª Edição
            </p>
          </div>
        </div>

        {/* Quick Search & Actions */}
        <div className="flex items-center gap-2">
          {/* Search Trigger */}
          <button
            onClick={() => toggleSearchModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-amber-300 hover:border-amber-500/50 text-xs font-mono transition-all"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Pesquisar regras...</span>
            <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-400">Ctrl+K</kbd>
          </button>

          {activeCharacter && !isWizardActive && (
            <>
              {/* Level Up Button */}
              <Button
                variant="gold"
                size="sm"
                icon={<ArrowUpCircle className="w-4 h-4 text-slate-950" />}
                onClick={() => toggleLevelUpModal(true)}
              >
                Subir Nível ({activeCharacter.level})
              </Button>

              {/* Duplicate */}
              <button
                onClick={() => duplicateCharacter(activeCharacter.id)}
                title="Duplicar Personagem"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/50 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>

              {/* JSON Export */}
              <button
                onClick={() => exportCharacterToJson(activeCharacter)}
                title="Exportar JSON"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/50 transition-colors"
              >
                <FileText className="w-4 h-4" />
              </button>

              {/* PDF Export */}
              <button
                onClick={() => exportSheetToPdf('character-sheet-printable', activeCharacter.identity.name || 'ficha_dnd5e')}
                title="Exportar PDF Bonito"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/50 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            </>
          )}

          {/* My Saved Characters */}
          <Button
            variant="secondary"
            size="sm"
            icon={<FolderOpen className="w-4 h-4 text-amber-400" />}
            onClick={() => toggleSavedCharactersModal(true)}
          >
            Personagens
          </Button>

          {/* New Character Wizard */}
          <Button
            variant="gold"
            size="sm"
            icon={<Plus className="w-4 h-4 text-slate-950" />}
            onClick={startNewCharacterWizard}
          >
            Novo Herói
          </Button>
        </div>
      </div>
    </header>
  );
};
