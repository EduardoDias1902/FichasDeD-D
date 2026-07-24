import React from 'react';
import { Shield, Heart, Zap, Eye, Search, BookOpen, Check, Award } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { calculateCombatStats, calculateAbilityScores, calculateSkillBonuses, formatModifier } from '../../services/rulesEngine';
import { CLASSES_DATA } from '../../data/classes';
import { RACES_DATA } from '../../data/races';
import { AbilityScore } from '../../types/dnd5e';

export const TabSummary: React.FC = () => {
  const { activeCharacter } = useCharacterStore();
  if (!activeCharacter) return null;

  const combatStats = calculateCombatStats(activeCharacter);
  const scores = calculateAbilityScores(activeCharacter);
  const skillBonuses = calculateSkillBonuses(activeCharacter);

  const dndClass = CLASSES_DATA.find(c => c.id === activeCharacter.classId);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {Object.entries(scores.total).map(([stat, val]) => {
          const statKey = stat as AbilityScore;
          const mod = scores.modifiers[statKey];
          const isProficientSave = dndClass?.savingThrows.includes(statKey);
          const saveBonus = mod + (isProficientSave ? combatStats.proficiencyBonus : 0);

          return (
            <Card key={stat} variant={isProficientSave ? 'gold' : 'default'} className="p-3 text-center">
              <span className="font-cinzel font-bold text-xs text-amber-400 block">{stat}</span>
              <span className="text-xl font-bold font-mono text-slate-100 block my-1">{formatModifier(mod)}</span>
              <span className="text-[11px] font-mono text-slate-400 block">Valor: {val}</span>
              <div className="mt-2 pt-1 border-t border-slate-800 text-[10px] font-mono text-slate-300">
                Salvação: <strong className="text-amber-300">{formatModifier(saveBonus)}</strong>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Skill Checks List */}
        <Card className="lg:col-span-2 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
            <h3 className="font-cinzel font-bold text-base text-amber-300 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Perícias & Testes de Habilidade
            </h3>
            <Badge variant="gold">Bônus de Proficiência: +{combatStats.proficiencyBonus}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-sans">
            {skillBonuses.map((skill) => (
              <div
                key={skill.name}
                className={`p-2 rounded-lg border flex items-center justify-between transition-all ${
                  skill.isProficient
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-200 shadow-gold-glow'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    skill.isProficient ? 'bg-amber-400 border-amber-300 text-slate-950' : 'border-slate-600'
                  }`}>
                    {skill.isProficient && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">({skill.ability})</span>
                </div>

                <span className="font-mono font-bold text-amber-300 text-sm">
                  {formatModifier(skill.totalBonus)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Column: Passives & Sensoriais */}
        <div className="space-y-4">
          <Card variant="gold" className="p-5 space-y-4">
            <h3 className="font-cinzel font-bold text-base text-amber-300 border-b border-amber-500/30 pb-2">
              Percepções Passivas
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded border border-slate-800">
                <span className="text-slate-300 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" /> Percepção Passiva:
                </span>
                <strong className="text-base text-amber-300">{combatStats.passivePerception}</strong>
              </div>

              <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded border border-slate-800">
                <span className="text-slate-300 flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-400" /> Investigação Passiva:
                </span>
                <strong className="text-base text-amber-300">{combatStats.passiveInvestigation}</strong>
              </div>

              <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded border border-slate-800">
                <span className="text-slate-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" /> Intuição Passiva:
                </span>
                <strong className="text-base text-amber-300">{combatStats.passiveInsight}</strong>
              </div>
            </div>
          </Card>

          {/* Languages & Proficiencies */}
          <Card className="p-5 space-y-3 text-xs">
            <h4 className="font-cinzel font-bold text-amber-400">Idiomas Conhecidos:</h4>
            <p className="text-slate-300 font-mono">{activeCharacter.identity.languages.join(', ')}</p>

            <h4 className="font-cinzel font-bold text-amber-400 pt-2">Proficiências de Armadura & Armas:</h4>
            <p className="text-slate-300">{dndClass?.armorProficiencies.join(', ')}</p>
            <p className="text-slate-300 mt-1">{dndClass?.weaponProficiencies.join(', ')}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};
