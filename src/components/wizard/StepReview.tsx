import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, Shield, Heart, Dices, UserCheck, Package, Wand2 } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { RACES_DATA } from '../../data/races';
import { CLASSES_DATA } from '../../data/classes';
import { BACKGROUNDS_DATA } from '../../data/backgrounds';
import { calculateCombatStats, calculateAbilityScores, formatModifier } from '../../services/rulesEngine';
import { AbilityScore } from '../../types/dnd5e';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const StepReview: React.FC = () => {
  const { activeCharacter, finalizeCharacterCreation } = useCharacterStore();
  if (!activeCharacter) return null;

  const race = RACES_DATA.find(r => r.id === activeCharacter.raceId);
  const dndClass = CLASSES_DATA.find(c => c.id === activeCharacter.classId);
  const background = BACKGROUNDS_DATA.find(b => b.id === activeCharacter.backgroundId);

  const combatStats = calculateCombatStats(activeCharacter);
  const scores = calculateAbilityScores(activeCharacter);

  const handleFinalize = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    finalizeCharacterCreation();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-amber-500/20 pb-3 text-center">
        <h2 className="text-3xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 flex items-center justify-center gap-2">
          <Sparkles className="w-7 h-7 text-amber-400" />
          Etapa 8: Revisão Final & Forja Concluída
        </h2>
        <p className="text-sm text-slate-300 font-sans mt-1">
          Revise todos os aspectos do seu herói antes de adentrar aos reinos de D&D 5ª Edição!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Character Card Hero View */}
        <Card variant="gold" glow className="p-6 text-center flex flex-col items-center justify-between space-y-4">
          <img
            src={activeCharacter.identity.avatarUrl}
            alt={activeCharacter.identity.name}
            className="w-36 h-36 rounded-2xl object-cover border-2 border-amber-400 shadow-gold-glow-lg"
          />
          <div>
            <h3 className="text-2xl font-cinzel font-bold text-amber-300">
              {activeCharacter.identity.name || 'Herói Sem Nome'}
            </h3>
            <p className="text-sm text-amber-400 font-mono mt-1">
              Nível {activeCharacter.level} • {race?.name} {dndClass?.name}
            </p>
            <Badge variant="gold" className="mt-2">{activeCharacter.identity.alignment}</Badge>
          </div>

          <div className="w-full grid grid-cols-3 gap-2 font-mono text-xs pt-2 border-t border-amber-500/30">
            <div className="bg-slate-900/80 p-2 rounded">
              <span className="text-slate-400 block text-[10px]">Pontos Vida</span>
              <strong className="text-red-400 text-sm">{combatStats.maxHp} HP</strong>
            </div>
            <div className="bg-slate-900/80 p-2 rounded">
              <span className="text-slate-400 block text-[10px]">Armadura</span>
              <strong className="text-amber-300 text-sm">{combatStats.armorClass} CA</strong>
            </div>
            <div className="bg-slate-900/80 p-2 rounded">
              <span className="text-slate-400 block text-[10px]">Iniciativa</span>
              <strong className="text-amber-200 text-sm">{formatModifier(combatStats.initiative)}</strong>
            </div>
          </div>
        </Card>

        {/* Detailed Breakdown */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-5 space-y-3">
            <h4 className="font-cinzel font-bold text-base text-amber-300 border-b border-slate-800 pb-2">
              Resumo dos Valores de Habilidade
            </h4>
            <div className="grid grid-cols-6 gap-2 text-center font-mono">
              {Object.entries(scores.total).map(([stat, val]) => (
                <div key={stat} className="bg-slate-900/90 p-2 rounded-lg border border-amber-500/30">
                  <span className="text-[10px] text-amber-400 font-bold block">{stat}</span>
                  <span className="text-sm font-bold text-slate-100">{val}</span>
                  <span className="text-xs text-amber-300 block">{formatModifier(scores.modifiers[stat as AbilityScore])}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 space-y-3">
            <h4 className="font-cinzel font-bold text-base text-amber-300 border-b border-slate-800 pb-2">
              Proficiências & Perícias Escolhidas
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(activeCharacter.selectedClassSkills || []).map((skill) => (
                <Badge key={skill} variant="gold">{skill}</Badge>
              ))}
            </div>
          </Card>

          {/* Action Trigger */}
          <div className="pt-4 flex justify-end">
            <Button
              variant="gold"
              size="lg"
              className="w-full md:w-auto"
              icon={<CheckCircle2 className="w-5 h-5 text-slate-950" />}
              onClick={handleFinalize}
            >
              Concluir & Abrir Ficha Digital
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
