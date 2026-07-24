import React from 'react';
import { BookOpen, User, Scroll, Shield } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { Card } from '../ui/Card';

export const TabBio: React.FC = () => {
  const { activeCharacter, updateDraftIdentity } = useCharacterStore();
  if (!activeCharacter) return null;

  const { identity } = activeCharacter;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personality Details */}
        <Card variant="gold" className="p-5 space-y-4">
          <h3 className="font-cinzel font-bold text-lg text-amber-300 border-b border-amber-500/30 pb-2">
            Personalidade & Ideais
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <strong className="text-amber-400 font-cinzel block mb-1">Traços de Personalidade:</strong>
              <p className="text-slate-300 bg-slate-900/80 p-2.5 rounded border border-slate-800 leading-relaxed font-sans">
                {identity.personalityTraits || 'Nenhum traço definido.'}
              </p>
            </div>

            <div>
              <strong className="text-amber-400 font-cinzel block mb-1">Ideais Morales:</strong>
              <p className="text-slate-300 bg-slate-900/80 p-2.5 rounded border border-slate-800 leading-relaxed font-sans">
                {identity.ideals || 'Nenhum ideal definido.'}
              </p>
            </div>

            <div>
              <strong className="text-amber-400 font-cinzel block mb-1">Vínculos & Afetos:</strong>
              <p className="text-slate-300 bg-slate-900/80 p-2.5 rounded border border-slate-800 leading-relaxed font-sans">
                {identity.bonds || 'Nenhum vínculo definido.'}
              </p>
            </div>

            <div>
              <strong className="text-amber-400 font-cinzel block mb-1">Defeitos & Fraquezas:</strong>
              <p className="text-slate-300 bg-slate-900/80 p-2.5 rounded border border-slate-800 leading-relaxed font-sans">
                {identity.flaws || 'Nenhum defeito definido.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Physical Description & Voice */}
        <Card className="p-5 space-y-4">
          <h3 className="font-cinzel font-bold text-lg text-amber-300 border-b border-slate-800 pb-2">
            Aparência & Descrição Física
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Idade / Sexo:</span>
              <strong className="text-slate-200">{identity.age} • {identity.gender}</strong>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Altura / Peso:</span>
              <strong className="text-slate-200">{identity.height} • {identity.weight}</strong>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800 col-span-2">
              <span className="text-slate-400 block text-[10px]">Olhos / Cabelos / Pele:</span>
              <strong className="text-slate-200">{identity.eyes} • {identity.hair} • {identity.skin}</strong>
            </div>
          </div>

          <div>
            <strong className="text-amber-400 font-cinzel text-xs block mb-1">Tom de Voz & Maneirismos:</strong>
            <p className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded border border-slate-800 font-sans">
              {identity.voice || 'Voz não especificada.'}
            </p>
          </div>
        </Card>
      </div>

      {/* Backstory & Campaign Notes */}
      <Card variant="gold" className="p-5 space-y-4">
        <h3 className="font-cinzel font-bold text-lg text-amber-300 border-b border-amber-500/30 pb-2 flex items-center justify-between">
          <span>História de Origem (Backstory) & Anotações de Campanha</span>
        </h3>

        <div>
          <label className="text-xs font-mono text-amber-400 block mb-1">História de Origem:</label>
          <textarea
            rows={4}
            value={identity.backstory}
            onChange={(e) => updateDraftIdentity({ backstory: e.target.value })}
            className="w-full bg-slate-900/90 border border-amber-500/30 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="text-xs font-mono text-amber-400 block mb-1">Diário de Missões & Notas da Campanha:</label>
          <textarea
            rows={4}
            value={identity.notes}
            onChange={(e) => updateDraftIdentity({ notes: e.target.value })}
            className="w-full bg-slate-900/90 border border-amber-500/30 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
            placeholder="Anotações sobre NPCs, vilões, tesouros, profecias e locais explorados..."
          />
        </div>
      </Card>
    </div>
  );
};
