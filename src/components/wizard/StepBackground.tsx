import React from 'react';
import { BookOpen, Sparkles, Check } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { BACKGROUNDS_DATA } from '../../data/backgrounds';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const StepBackground: React.FC = () => {
  const { activeCharacter, updateDraftBackground } = useCharacterStore();
  if (!activeCharacter) return null;

  const selectedBg = BACKGROUNDS_DATA.find(b => b.id === activeCharacter.backgroundId) || BACKGROUNDS_DATA[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-amber-500/20 pb-3">
        <h2 className="text-2xl font-cinzel font-bold text-amber-300 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-400" />
          Etapa 5: Seleção de Antecedente (Background)
        </h2>
        <p className="text-sm text-slate-400 font-sans mt-1">
          O antecedente define suas origens, perícias concedidas pela infância e conexões com o mundo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Background Cards List */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {BACKGROUNDS_DATA.map((bg) => {
            const isSelected = activeCharacter.backgroundId === bg.id;

            return (
              <Card
                key={bg.id}
                variant={isSelected ? 'gold' : 'default'}
                glow={isSelected}
                onClick={() => updateDraftBackground(bg.id)}
                className="p-4 cursor-pointer flex flex-col justify-between hover:scale-[1.01] transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-cinzel font-bold text-base text-amber-300">{bg.name}</h3>
                    {isSelected && <Badge variant="gold">Selecionado</Badge>}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-2 mb-3">
                    {bg.lore}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {bg.skillProficiencies.map((skill) => (
                      <Badge key={skill} variant="arcane" className="text-[10px]">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Selected Background Details Sidebar */}
        <Card variant="gold" className="p-5 space-y-4 h-fit">
          <div className="border-b border-amber-500/30 pb-3">
            <h3 className="font-cinzel font-bold text-xl text-amber-300">{selectedBg.name}</h3>
            <p className="text-xs text-slate-300 font-sans mt-1">{selectedBg.lore}</p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <h4 className="font-cinzel font-bold text-amber-400 mb-1">Perícias Concedidas:</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedBg.skillProficiencies.map((skill) => (
                  <Badge key={skill} variant="gold">{skill}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-cinzel font-bold text-amber-400 mb-1">Característica Especial:</h4>
              <div className="bg-slate-900/80 p-2.5 rounded border border-amber-500/20">
                <strong className="text-amber-300 font-cinzel block">{selectedBg.feature.name}</strong>
                <span className="text-slate-300 font-sans leading-snug">{selectedBg.feature.description}</span>
              </div>
            </div>

            <div>
              <h4 className="font-cinzel font-bold text-amber-400 mb-1">Equipamento Inicial do Antecedente:</h4>
              <p className="text-slate-300 font-mono text-[11px]">{selectedBg.startingEquipment.join(', ')}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
