import React, { useState } from 'react';
import { Dices, Sparkles, Heart, Shield, Zap, RefreshCw, Star, Info } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { StatGenerationMethod } from '../../types/character';
import { ABILITY_SCORES, AbilityScore } from '../../types/dnd5e';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { calculateAbilityScores, calculateCombatStats, calculateModifier, formatModifier } from '../../services/rulesEngine';
import { getAbilityScoreRecommendation } from '../../services/recommendationEngine';
import { CLASSES_DATA } from '../../data/classes';

const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

const POINT_BUY_COSTS: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
};

export const StepAbilityScores: React.FC = () => {
  const { activeCharacter, updateDraftStatMethod, updateDraftBaseAbilityScores } = useCharacterStore();
  const [diceRolling, setDiceRolling] = useState(false);
  const [standardArrayAssignments, setStandardArrayAssignments] = useState<Record<AbilityScore, number>>({
    STR: 15, DEX: 14, CON: 13, INT: 12, WIS: 10, CHA: 8
  });

  if (!activeCharacter) return null;

  const { statMethod, baseAbilityScores, classId } = activeCharacter;
  const computedScores = calculateAbilityScores(activeCharacter);
  const combatStats = calculateCombatStats(activeCharacter);
  const currentClass = CLASSES_DATA.find(c => c.id === classId);

  // Point buy budget calculation
  const totalPointsUsed = Object.values(baseAbilityScores).reduce((acc, val) => acc + (POINT_BUY_COSTS[val] ?? 0), 0);
  const pointsRemaining = 27 - totalPointsUsed;

  // 4d6 Drop Lowest simulator
  const roll4d6DropLowest = () => {
    setDiceRolling(true);
    setTimeout(() => {
      const newScores: Record<AbilityScore, number> = { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 };
      ABILITY_SCORES.forEach(stat => {
        const rolls = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
        ].sort((a, b) => b - a);
        const sum = rolls[0] + rolls[1] + rolls[2]; // drop lowest
        newScores[stat.key] = sum;
      });
      updateDraftBaseAbilityScores(newScores);
      setDiceRolling(false);
    }, 400);
  };

  const handleScoreChange = (stat: AbilityScore, delta: number) => {
    const current = baseAbilityScores[stat] || 10;
    const next = Math.max(8, Math.min(15, current + delta));

    if (statMethod === 'pointbuy') {
      const costDiff = (POINT_BUY_COSTS[next] ?? 0) - (POINT_BUY_COSTS[current] ?? 0);
      if (pointsRemaining >= costDiff) {
        updateDraftBaseAbilityScores({
          ...baseAbilityScores,
          [stat]: next
        });
      }
    } else {
      updateDraftBaseAbilityScores({
        ...baseAbilityScores,
        [stat]: Math.max(1, Math.min(20, current + delta))
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-amber-500/20 pb-3">
        <h2 className="text-2xl font-cinzel font-bold text-amber-300 flex items-center gap-2">
          <Dices className="w-6 h-6 text-amber-400" />
          Etapa 4: Distribuição de Atributos & Cálculos em Tempo Real
        </h2>
        <p className="text-sm text-slate-400 font-sans mt-1">
          Escolha o método de geração e veja instantaneamente os modificadores, bônus raciais, PV, CA e ataques.
        </p>
      </div>

      {/* Generation Method Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'standard', label: 'Valores Padrão (Standard Array)' },
          { id: 'pointbuy', label: 'Compra por Pontos (Point Buy 27pts)' },
          { id: '4d6', label: 'Rolagem de Dados (4d6 Descarte Menor)' },
          { id: 'manual', label: 'Distribuição Manual / Mestre' },
        ].map((method) => (
          <button
            key={method.id}
            onClick={() => updateDraftStatMethod(method.id as StatGenerationMethod)}
            className={`px-4 py-2 rounded-lg font-cinzel text-xs font-semibold border transition-all ${
              statMethod === method.id
                ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-gold-glow'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {method.label}
          </button>
        ))}
      </div>

      {/* Method Instructions / Controls */}
      {statMethod === 'pointbuy' && (
        <Card variant="gold" className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-cinzel font-bold text-sm text-amber-300">Sistema Point Buy (27 Pontos)</h4>
              <p className="text-xs text-slate-300">Todos os atributos começam em 8. O custo aumenta conforme se aproxima de 15.</p>
            </div>
          </div>
          <Badge variant={pointsRemaining === 0 ? 'success' : pointsRemaining < 0 ? 'crimson' : 'gold'} className="text-sm px-3 py-1 font-mono">
            {pointsRemaining} pontos restantes
          </Badge>
        </Card>
      )}

      {statMethod === '4d6' && (
        <Card variant="gold" className="p-4 flex items-center justify-between">
          <div>
            <h4 className="font-cinzel font-bold text-sm text-amber-300">Rolagem 4d6 (Descarte o menor dado)</h4>
            <p className="text-xs text-slate-300">Rola 4 dados de 6 lados para cada atributo e soma os 3 maiores valores.</p>
          </div>
          <Button
            variant="gold"
            size="sm"
            disabled={diceRolling}
            icon={<RefreshCw className={`w-4 h-4 ${diceRolling ? 'animate-spin' : ''}`} />}
            onClick={roll4d6DropLowest}
          >
            Rolar Dados Novamente
          </Button>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ability Score Editors */}
        <div className="lg:col-span-2 space-y-3">
          {ABILITY_SCORES.map((stat) => {
            const baseVal = baseAbilityScores[stat.key] || 10;
            const racialVal = computedScores.racial[stat.key] || 0;
            const totalVal = computedScores.total[stat.key];
            const mod = computedScores.modifiers[stat.key];
            const rec = getAbilityScoreRecommendation(classId, stat.key, totalVal);
            const isPrimary = currentClass?.primaryAbility.includes(stat.key);

            return (
              <Card
                key={stat.key}
                variant={isPrimary ? 'gold' : 'default'}
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Stat Identity */}
                <div className="flex items-center gap-3 min-w-[200px]">
                  <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-amber-500/40 flex flex-col items-center justify-center shrink-0">
                    <span className="font-cinzel font-bold text-xs text-amber-400">{stat.shortName}</span>
                    <span className="font-mono text-sm font-black text-slate-100">{formatModifier(mod)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-cinzel font-bold text-sm text-amber-300">{stat.name}</h4>
                      {isPrimary && <Badge variant="crimson" className="text-[10px]">Principal</Badge>}
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans line-clamp-1">{stat.description}</p>
                  </div>
                </div>

                {/* Score Controls */}
                <div className="flex items-center gap-4">
                  {/* Point Buy / Manual Incrementor */}
                  {statMethod !== 'standard' ? (
                    <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
                      <button
                        onClick={() => handleScoreChange(stat.key, -1)}
                        className="w-7 h-7 rounded bg-slate-800 text-slate-200 hover:bg-amber-500/20 font-bold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-sm text-slate-100">{baseVal}</span>
                      <button
                        onClick={() => handleScoreChange(stat.key, 1)}
                        className="w-7 h-7 rounded bg-slate-800 text-slate-200 hover:bg-amber-500/20 font-bold"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    // Standard Array selector dropdown
                    <select
                      value={baseVal}
                      onChange={(e) => {
                        const newVal = Number(e.target.value);
                        updateDraftBaseAbilityScores({
                          ...baseAbilityScores,
                          [stat.key]: newVal
                        });
                      }}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-amber-300 font-mono focus:outline-none"
                    >
                      {STANDARD_ARRAY.map(val => (
                        <option key={val} value={val}>{val}</option>
                      ))}
                    </select>
                  )}

                  {/* Racial bonus & final score display */}
                  <div className="text-right font-mono text-xs">
                    <span className="text-slate-400">Racial: <strong className="text-amber-400">+{racialVal}</strong></span>
                    <div className="text-sm font-bold text-amber-300">Total: {totalVal}</div>
                  </div>
                </div>

                {/* Synergy Star Rating */}
                <div className="w-full md:w-auto text-right">
                  <StarRating rating={rec.stars} showText text={rec.title} size="sm" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Real-time Derived Combat Stats Sidebar */}
        <Card variant="gold" className="p-5 space-y-4 h-fit">
          <h3 className="font-cinzel font-bold text-lg text-amber-300 border-b border-amber-500/30 pb-2">
            Impactos em Tempo Real
          </h3>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-red-500" /> Pontos de Vida (PV)
              </span>
              <span className="text-lg font-bold text-red-400 block mt-1">{combatStats.maxHp} HP</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Classe de Armadura
              </span>
              <span className="text-lg font-bold text-amber-300 block mt-1">{combatStats.armorClass} CA</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Iniciativa
              </span>
              <span className="text-lg font-bold text-amber-200 block mt-1">
                {formatModifier(combatStats.initiative)}
              </span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400">Capacidade Carga</span>
              <span className="text-lg font-bold text-slate-200 block mt-1">{combatStats.carryingCapacity} lbs</span>
            </div>
          </div>

          <div className="border-t border-amber-500/20 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Percepção Passiva:</span>
              <strong className="text-amber-400 font-mono">{combatStats.passivePerception}</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>CD de Magia (Spell DC):</span>
              <strong className="text-indigo-400 font-mono">{combatStats.spellSaveDc}</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Bônus Ataque Mágico:</span>
              <strong className="text-indigo-400 font-mono">{formatModifier(combatStats.spellAttackBonus)}</strong>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
