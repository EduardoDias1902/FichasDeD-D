import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowUpCircle, X, Sparkles, Heart, Shield, Award, Check } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { useUIStore } from '../../store/useUIStore';
import { CLASSES_DATA } from '../../data/classes';
import { FEATS_DATA } from '../../data/feats';
import { AbilityScore } from '../../types/dnd5e';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { calculateCombatStats, calculateModifier } from '../../services/rulesEngine';

export const LevelUpModal: React.FC = () => {
  const { activeCharacter, levelUpActiveCharacter } = useCharacterStore();
  const { isLevelUpOpen, toggleLevelUpModal } = useUIStore();

  const [hpChoice, setHpChoice] = useState<'average' | 'roll'>('average');
  const [selectedSubclass, setSelectedSubclass] = useState<string>('');
  const [selectedAsiType, setSelectedAsiType] = useState<'asi' | 'feat'>('asi');
  const [asiStats, setAsiStats] = useState<Partial<Record<AbilityScore, number>>>({ STR: 2 });
  const [selectedFeat, setSelectedFeat] = useState<string>(FEATS_DATA[0].id);

  if (!isLevelUpOpen || !activeCharacter) return null;

  const currentLevel = activeCharacter.level;
  const targetLevel = Math.min(20, currentLevel + 1);
  const dndClass = CLASSES_DATA.find(c => c.id === activeCharacter.classId);

  // HP gain calculation
  const hitDie = dndClass ? dndClass.hitDie : 8;
  const conMod = calculateModifier(activeCharacter.baseAbilityScores.CON);
  const avgHpGain = Math.floor(hitDie / 2) + 1 + conMod;

  const needsSubclass = dndClass && dndClass.subclassUnlockLevel === targetLevel && !activeCharacter.subclassId;
  const isAsiLevel = [4, 8, 12, 16, 19].includes(targetLevel);

  const handleConfirmLevelUp = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 }
    });

    levelUpActiveCharacter(
      avgHpGain,
      needsSubclass ? selectedSubclass : undefined,
      isAsiLevel && selectedAsiType === 'asi' ? asiStats : undefined,
      isAsiLevel && selectedAsiType === 'feat' ? selectedFeat : undefined
    );

    toggleLevelUpModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#10111a] border border-amber-500/40 rounded-xl shadow-gold-glow-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#161726]/90">
          <div className="flex items-center gap-2">
            <ArrowUpCircle className="w-6 h-6 text-amber-400" />
            <h2 className="font-cinzel font-bold text-xl text-amber-300">
              Evolução de Nível — Avançar para o Nível {targetLevel}
            </h2>
          </div>
          <button
            onClick={() => toggleLevelUpModal(false)}
            className="text-slate-400 hover:text-amber-400 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Step 1: HP Gain Choice */}
          <Card variant="gold" className="p-4 space-y-3">
            <h3 className="font-cinzel font-bold text-base text-amber-300 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Ganho de Pontos de Vida (HP)
            </h3>
            <p className="text-xs text-slate-300 font-sans">
              No Nível {targetLevel}, sua classe ({dndClass?.name}) concede 1d{hitDie} + Mod. Constituição ({conMod >= 0 ? `+${conMod}` : conMod}).
            </p>
            <div className="bg-slate-900/90 p-3 rounded-lg border border-amber-500/30 font-mono text-sm text-amber-300 font-bold">
              Ganho Médio Fixo: +{avgHpGain} HP
            </div>
          </Card>

          {/* Subclass Selection if unlocked at target level */}
          {needsSubclass && (
            <Card variant="gold" className="p-4 space-y-3">
              <h3 className="font-cinzel font-bold text-base text-amber-300 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Desbloqueio de Arquétipo de Subclasse
              </h3>
              <p className="text-xs text-slate-300">Escolha sua especialização de classe para abrir novos poderes:</p>
              <div className="space-y-2">
                {dndClass?.subclasses.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubclass(sub.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedSubclass === sub.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-gold-glow'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <strong className="font-cinzel font-bold block text-sm">{sub.name}</strong>
                    <span className="text-xs font-sans text-slate-400 mt-0.5 block">{sub.lore}</span>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* ASI / Feat selection at key levels */}
          {isAsiLevel && (
            <Card variant="gold" className="p-4 space-y-4">
              <h3 className="font-cinzel font-bold text-base text-amber-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Aumento no Valor de Atributo (ASI) ou Talento
              </h3>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedAsiType('asi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-cinzel border transition-all ${
                    selectedAsiType === 'asi' ? 'bg-amber-500/20 border-amber-400 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  +2 em Atributos (ASI)
                </button>
                <button
                  onClick={() => setSelectedAsiType('feat')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-cinzel border transition-all ${
                    selectedAsiType === 'feat' ? 'bg-amber-500/20 border-amber-400 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  Selecionar um Talento (Feat)
                </button>
              </div>

              {selectedAsiType === 'feat' && (
                <select
                  value={selectedFeat}
                  onChange={(e) => setSelectedFeat(e.target.value)}
                  className="w-full bg-slate-900 border border-amber-500/30 rounded-lg p-2.5 text-xs text-amber-300"
                >
                  {FEATS_DATA.map(f => (
                    <option key={f.id} value={f.id}>{f.name} — {f.description.substring(0, 60)}...</option>
                  ))}
                </select>
              )}
            </Card>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end gap-3 bg-[#161726]/90">
          <Button variant="secondary" size="md" onClick={() => toggleLevelUpModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="gold"
            size="md"
            icon={<Check className="w-4 h-4 text-slate-950" />}
            onClick={handleConfirmLevelUp}
          >
            Confirmar Evolução para Nível {targetLevel}
          </Button>
        </div>
      </div>
    </div>
  );
};
