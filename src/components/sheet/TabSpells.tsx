import React from 'react';
import { Wand2, Zap, Flame, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { SPELLS_DATA } from '../../data/spells';
import { CLASSES_DATA } from '../../data/classes';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { calculateCombatStats, calculateAbilityScores, formatModifier } from '../../services/rulesEngine';

export const TabSpells: React.FC = () => {
  const { activeCharacter, useSpellSlot, restoreSpellSlot, togglePreparedSpell } = useCharacterStore();
  if (!activeCharacter) return null;

  const combatStats = calculateCombatStats(activeCharacter);
  const dndClass = CLASSES_DATA.find(c => c.id === activeCharacter.classId);

  const knownSpellObjects = activeCharacter.spells.knownSpells
    .map(id => SPELLS_DATA.find(s => s.id === id))
    .filter(Boolean);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Spellcasting Core Banner */}
      <Card variant="arcane" glow className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-cinzel font-bold text-xl text-indigo-200 flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-indigo-400" />
            Estatísticas de Conjuração Divina & Arcana
          </h3>
          <p className="text-xs text-slate-300 font-mono mt-1">
            Habilidade de Conjuração: {dndClass?.spellcastingAbility || 'INT'} • Atributo Base
          </p>
        </div>

        <div className="flex gap-4 font-mono text-xs">
          <div className="bg-slate-950/80 p-3 rounded-lg border border-indigo-500/30 text-center">
            <span className="text-slate-400 block text-[10px]">CD de Resistência</span>
            <strong className="text-xl font-bold text-indigo-300">{combatStats.spellSaveDc}</strong>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-lg border border-indigo-500/30 text-center">
            <span className="text-slate-400 block text-[10px]">Bônus de Ataque</span>
            <strong className="text-xl font-bold text-indigo-300">{formatModifier(combatStats.spellAttackBonus)}</strong>
          </div>
        </div>
      </Card>

      {/* Spell Slots Tracker */}
      <Card className="p-5 space-y-3">
        <h4 className="font-cinzel font-bold text-base text-amber-300 border-b border-slate-800 pb-2">
          Espaços de Magia (Spell Slots)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          {[1, 2, 3].map((lvl) => {
            const maxSlots = lvl === 1 ? 4 : lvl === 2 ? 3 : 2;
            const used = activeCharacter.spells.spellSlotsUsed[lvl] || 0;
            const available = Math.max(0, maxSlots - used);

            return (
              <div key={lvl} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-amber-400 font-bold block">{lvl}º Nível</span>
                  <span className="text-slate-300">{available} / {maxSlots} disponíveis</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => useSpellSlot(lvl)}
                    disabled={available <= 0}
                    className="px-2 py-1 bg-indigo-950 border border-indigo-500/50 text-indigo-300 rounded hover:bg-indigo-900 disabled:opacity-40"
                  >
                    Gastar
                  </button>
                  <button
                    onClick={() => restoreSpellSlot(lvl)}
                    disabled={used <= 0}
                    className="px-2 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded hover:bg-slate-700 disabled:opacity-40"
                  >
                    Recuperar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Known & Prepared Spells Grid */}
      <div className="space-y-4">
        <h4 className="font-cinzel font-bold text-lg text-amber-300">Magias no Grimório</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {knownSpellObjects.length === 0 ? (
            <Card className="col-span-full p-6 text-center text-slate-500">
              <Wand2 className="w-10 h-10 mx-auto mb-2 text-slate-700" />
              <p className="font-cinzel text-sm">Nenhuma magia aprendida ainda.</p>
              <p className="text-xs text-slate-500">Aprenda novas magias durante a criação do personagem ou ao subir de nível!</p>
            </Card>
          ) : (
            knownSpellObjects.map((spell) => {
              if (!spell) return null;
              const isPrepared = activeCharacter.spells.preparedSpells.includes(spell.id);

              return (
                <Card key={spell.id} variant={isPrepared ? 'arcane' : 'default'} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-cinzel font-bold text-base text-indigo-300">{spell.name}</h5>
                      <span className="text-[11px] font-mono text-slate-400">
                        {spell.level === 0 ? 'Truque' : `${spell.level}º Nível`} • {spell.school}
                      </span>
                    </div>
                    {spell.level > 0 && (
                      <button
                        onClick={() => togglePreparedSpell(spell.id)}
                        className={`px-2.5 py-1 rounded text-xs font-mono border transition-all ${
                          isPrepared ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {isPrepared ? 'Preparada' : 'Preparar'}
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{spell.description}</p>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
