import React from 'react';
import { X, User, Trash2, Copy, Play, Plus, Download } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { useUIStore } from '../../store/useUIStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { RACES_DATA } from '../../data/races';
import { CLASSES_DATA } from '../../data/classes';
import { exportCharacterToJson } from '../../services/storageService';

export const SavedCharactersModal: React.FC = () => {
  const { characters, activeCharacter, loadCharacter, deleteCharacter, duplicateCharacter, startNewCharacterWizard } = useCharacterStore();
  const { isSavedCharactersModalOpen, toggleSavedCharactersModal } = useUIStore();

  if (!isSavedCharactersModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#10111a] border border-amber-500/40 rounded-xl shadow-gold-glow-lg overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#161726]/90">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-amber-400" />
            <h2 className="font-cinzel font-bold text-lg text-slate-100">Meus Personagens Salvos</h2>
          </div>
          <button
            onClick={() => toggleSavedCharactersModal(false)}
            className="text-slate-400 hover:text-amber-400 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {characters.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500">
              <User className="w-16 h-16 mx-auto mb-3 text-slate-700" />
              <p className="font-cinzel text-base text-slate-400">Nenhum personagem salvo ainda.</p>
              <p className="text-xs text-slate-500 mt-1">Crie o seu primeiro herói usando o assistente de criação!</p>
              <Button
                variant="gold"
                size="md"
                className="mt-4"
                icon={<Plus className="w-4 h-4 text-slate-950" />}
                onClick={() => {
                  toggleSavedCharactersModal(false);
                  startNewCharacterWizard();
                }}
              >
                Criar Novo Herói
              </Button>
            </div>
          ) : (
            characters.map((char) => {
              const race = RACES_DATA.find(r => r.id === char.raceId);
              const dndClass = CLASSES_DATA.find(c => c.id === char.classId);
              const isActive = activeCharacter?.id === char.id;

              return (
                <Card
                  key={char.id}
                  variant={isActive ? 'gold' : 'default'}
                  glow={isActive}
                  className="p-4 flex flex-col justify-between"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={char.identity.avatarUrl}
                      alt={char.identity.name}
                      className="w-16 h-16 rounded-lg object-cover border border-amber-500/40 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-cinzel font-bold text-base text-amber-300 truncate">
                          {char.identity.name || 'Sem Nome'}
                        </h3>
                        {isActive && <Badge variant="gold">Ativo</Badge>}
                      </div>
                      <p className="text-xs text-slate-300 font-medium mt-0.5">
                        Nível {char.level} • {race?.name || char.raceId} {dndClass?.name || char.classId}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-1">
                        Atualizado: {new Date(char.updatedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-slate-800/80 pt-3 mt-4">
                    <Button
                      variant={isActive ? 'gold' : 'secondary'}
                      size="sm"
                      icon={<Play className="w-3.5 h-3.5" />}
                      onClick={() => {
                        loadCharacter(char.id);
                        toggleSavedCharactersModal(false);
                      }}
                    >
                      {isActive ? 'Ver Ficha' : 'Carregar'}
                    </Button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => exportCharacterToJson(char)}
                        title="Exportar JSON"
                        className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => duplicateCharacter(char.id)}
                        title="Duplicar"
                        className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteCharacter(char.id)}
                        title="Excluir"
                        className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
