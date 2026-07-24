import React from 'react';
import { Sparkles, BookOpen, Shield } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { CLASSES_DATA } from '../../data/classes';
import { RACES_DATA } from '../../data/races';
import { BACKGROUNDS_DATA } from '../../data/backgrounds';
import { FEATS_DATA } from '../../data/feats';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const TabFeatures: React.FC = () => {
  const { activeCharacter } = useCharacterStore();
  if (!activeCharacter) return null;

  const dndClass = CLASSES_DATA.find(c => c.id === activeCharacter.classId);
  const race = RACES_DATA.find(r => r.id === activeCharacter.raceId);
  const subrace = race?.subraces?.find(s => s.id === activeCharacter.subraceId);
  const background = BACKGROUNDS_DATA.find(b => b.id === activeCharacter.backgroundId);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Class Features Section */}
      <Card variant="gold" className="p-5 space-y-4">
        <h3 className="font-cinzel font-bold text-lg text-amber-300 border-b border-amber-500/30 pb-2 flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          Características de Classe — {dndClass?.name} (Nível {activeCharacter.level})
        </h3>

        <div className="space-y-3">
          {dndClass?.level1Features.map((trait, idx) => (
            <div key={idx} className="bg-slate-900/80 p-3 rounded-lg border border-amber-500/20">
              <h4 className="font-cinzel font-bold text-sm text-amber-300">{trait.name}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">{trait.description}</p>
            </div>
          ))}

          {activeCharacter.subclassId && (
            <div className="bg-amber-950/40 p-3 rounded-lg border border-amber-400/40">
              <Badge variant="gold" className="mb-1">Subclasse Selecionada</Badge>
              <h4 className="font-cinzel font-bold text-sm text-amber-200">
                {dndClass?.subclasses.find(s => s.id === activeCharacter.subclassId)?.name}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">
                {dndClass?.subclasses.find(s => s.id === activeCharacter.subclassId)?.lore}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Racial Traits */}
      <Card className="p-5 space-y-4">
        <h3 className="font-cinzel font-bold text-lg text-amber-300 border-b border-slate-800 pb-2">
          Traços Raciais — {race?.name}
        </h3>

        <div className="space-y-3">
          {race?.traits.map((trait, idx) => (
            <div key={idx} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <h4 className="font-cinzel font-bold text-sm text-slate-200">{trait.name}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">{trait.description}</p>
            </div>
          ))}

          {subrace?.traits.map((trait, idx) => (
            <div key={`sub_${idx}`} className="bg-slate-900/80 p-3 rounded-lg border border-amber-500/20">
              <h4 className="font-cinzel font-bold text-sm text-amber-300">{trait.name} (Sub-raça)</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">{trait.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Background Feature */}
      {background && (
        <Card className="p-5 space-y-3">
          <h3 className="font-cinzel font-bold text-lg text-amber-300 border-b border-slate-800 pb-2">
            Característica de Antecedente — {background.name}
          </h3>

          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            <h4 className="font-cinzel font-bold text-sm text-slate-200">{background.feature.name}</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">{background.feature.description}</p>
          </div>
        </Card>
      )}
    </div>
  );
};
