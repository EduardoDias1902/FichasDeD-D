import React from 'react';
import { UserCheck, Sparkles, Eye, Zap, BookOpen } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { RACES_DATA } from '../../data/races';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { getRaceClassSynergy } from '../../services/recommendationEngine';
import { RuleTooltip } from '../common/RuleTooltip';

export const StepRace: React.FC = () => {
  const { activeCharacter, updateDraftRace } = useCharacterStore();
  if (!activeCharacter) return null;

  const selectedRace = RACES_DATA.find(r => r.id === activeCharacter.raceId) || RACES_DATA[0];
  const selectedSubrace = selectedRace.subraces?.find(s => s.id === activeCharacter.subraceId);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-amber-500/20 pb-3">
        <h2 className="text-2xl font-cinzel font-bold text-amber-300 flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-amber-400" />
          Etapa 2: Seleção de Raça & Sub-Raça
        </h2>
        <p className="text-sm text-slate-400 font-sans mt-1">
          Escolha a herança biológica do seu herói. Qualquer combinação com sua classe é 100% permitida!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Race Cards Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {RACES_DATA.map((race) => {
            const isSelected = activeCharacter.raceId === race.id;
            const synergy = getRaceClassSynergy(race.id, activeCharacter.classId);

            return (
              <Card
                key={race.id}
                variant={isSelected ? 'gold' : 'default'}
                glow={isSelected}
                onClick={() => {
                  const defaultSub = race.subraces && race.subraces.length > 0 ? race.subraces[0].id : undefined;
                  updateDraftRace(race.id, defaultSub);
                }}
                className="p-4 cursor-pointer flex flex-col justify-between hover:scale-[1.01] transition-transform"
              >
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={race.image}
                      alt={race.name}
                      className="w-14 h-14 rounded-lg object-cover border border-amber-500/40 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-cinzel font-bold text-base text-amber-300">{race.name}</h3>
                        {isSelected && <Badge variant="gold">Selecionada</Badge>}
                      </div>
                      <div className="mt-1">
                        <StarRating rating={synergy.stars} showText text={synergy.title} size="sm" />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-2 mb-3">
                    {race.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {Object.entries(race.abilityScoreBonus).map(([stat, val]) => (
                      <Badge key={stat} variant="arcane" className="text-[10px]">
                        +{val} {stat}
                      </Badge>
                    ))}
                    <Badge variant="neutral" className="text-[10px]">
                      <Zap className="w-3 h-3 mr-1 inline" />
                      {race.speed}ft
                    </Badge>
                    {race.darkvision > 0 && (
                      <Badge variant="neutral" className="text-[10px]">
                        <Eye className="w-3 h-3 mr-1 inline" />
                        <RuleTooltip term="Visão no Escuro" definition={`Permite enxergar no escuro até ${race.darkvision} pés como se estivesse na meia-luz.`}>
                          {race.darkvision}ft Visão Noturna
                        </RuleTooltip>
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Subraces if available */}
                {race.subraces && race.subraces.length > 0 && isSelected && (
                  <div className="border-t border-amber-500/30 pt-3 mt-3 space-y-2">
                    <label className="text-xs font-mono text-amber-300 block">Escolha a Sub-raça:</label>
                    <div className="grid grid-cols-1 gap-1.5">
                      {race.subraces.map((sub) => (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateDraftRace(race.id, sub.id);
                          }}
                          className={`w-full text-left p-2 rounded text-xs transition-all flex items-center justify-between border ${
                            activeCharacter.subraceId === sub.id
                              ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span>{sub.name}</span>
                          <span className="text-[10px] font-mono text-amber-400">
                            {Object.entries(sub.abilityScoreBonus).map(([s, v]) => `+${v} ${s}`).join(', ')}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Selected Race Details Sidebar */}
        <Card variant="gold" className="p-5 space-y-4 h-fit">
          <div className="flex items-center gap-3 border-b border-amber-500/30 pb-3">
            <img
              src={selectedRace.image}
              alt={selectedRace.name}
              className="w-16 h-16 rounded-lg object-cover border border-amber-400"
            />
            <div>
              <h3 className="font-cinzel font-bold text-xl text-amber-300">{selectedRace.name}</h3>
              {selectedSubrace && (
                <p className="text-xs text-amber-400 font-mono">Sub-raça: {selectedSubrace.name}</p>
              )}
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <h4 className="font-cinzel font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Lore & História
              </h4>
              <p className="text-slate-300 leading-relaxed font-sans">{selectedRace.lore}</p>
            </div>

            <div>
              <h4 className="font-cinzel font-bold text-amber-400 mb-1">Traços Raciais Especiais:</h4>
              <ul className="space-y-2">
                {selectedRace.traits.map((trait, idx) => (
                  <li key={idx} className="bg-slate-900/80 p-2.5 rounded border border-amber-500/20">
                    <strong className="text-amber-300 font-cinzel block">{trait.name}</strong>
                    <span className="text-slate-300 font-sans leading-snug">{trait.description}</span>
                  </li>
                ))}

                {selectedSubrace?.traits.map((trait, idx) => (
                  <li key={`sub_${idx}`} className="bg-amber-950/40 p-2.5 rounded border border-amber-400/40">
                    <strong className="text-amber-300 font-cinzel block">{trait.name} (Sub-raça)</strong>
                    <span className="text-slate-300 font-sans leading-snug">{trait.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-cinzel font-bold text-amber-400 mb-1">Idiomas Natos:</h4>
              <p className="text-slate-300">{selectedRace.languages.join(', ')}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
