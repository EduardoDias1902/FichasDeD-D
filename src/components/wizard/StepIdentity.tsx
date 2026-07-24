import React from 'react';
import { User, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { Card } from '../ui/Card';
import { Alignment } from '../../types/dnd5e';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
];

const ALIGNMENTS: Alignment[] = [
  'Leal e Bom', 'Neutro e Bom', 'Caótico e Bom',
  'Leal e Neutro', 'Neutro', 'Caótico e Neutro',
  'Leal e Mau', 'Neutro e Mau', 'Caótico e Mau'
];

export const StepIdentity: React.FC = () => {
  const { activeCharacter, updateDraftIdentity } = useCharacterStore();
  if (!activeCharacter) return null;

  const { identity } = activeCharacter;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-amber-500/20 pb-3">
        <h2 className="text-2xl font-cinzel font-bold text-amber-300 flex items-center gap-2">
          <User className="w-6 h-6 text-amber-400" />
          Etapa 1: Identidade & Narrativa do Herói
        </h2>
        <p className="text-sm text-slate-400 font-sans mt-1">
          Defina o nome, aparência visual, traços físicos, alinhamento moral e personalidade do seu personagem.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Image */}
        <Card variant="gold" className="p-5 space-y-4">
          <h3 className="font-cinzel font-bold text-base text-amber-300 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            Retrato do Personagem
          </h3>

          <div className="flex flex-col items-center">
            <img
              src={identity.avatarUrl}
              alt="Avatar do Personagem"
              className="w-40 h-40 rounded-xl object-cover border-2 border-amber-500/50 shadow-gold-glow mb-3"
            />
            <label className="text-xs text-slate-400 mb-1 w-full font-mono">URL da Imagem / Avatar:</label>
            <input
              type="text"
              value={identity.avatarUrl}
              onChange={(e) => updateDraftIdentity({ avatarUrl: e.target.value })}
              className="w-full bg-slate-900/90 border border-amber-500/30 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-2 block font-mono">Presets de Avatar:</label>
            <div className="grid grid-cols-3 gap-2">
              {AVATAR_PRESETS.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => updateDraftIdentity({ avatarUrl: url })}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    identity.avatarUrl === url ? 'border-amber-400 scale-105 shadow-gold-glow' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-14 object-cover" />
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Center & Right Column: Physical & Narrative inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identity Core */}
          <Card className="p-5 space-y-4">
            <h3 className="font-cinzel font-bold text-base text-amber-300">Dados Básicos & Físicos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 mb-1 block font-mono">Nome do Personagem *</label>
                <input
                  type="text"
                  value={identity.name}
                  onChange={(e) => updateDraftIdentity({ name: e.target.value })}
                  placeholder="Ex: Valen Shadowblade"
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block font-mono">Alinhamento Moral *</label>
                <select
                  value={identity.alignment}
                  onChange={(e) => updateDraftIdentity({ alignment: e.target.value as Alignment })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                >
                  {ALIGNMENTS.map((align) => (
                    <option key={align} value={align}>{align}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block font-mono">Gênero / Sexo</label>
                <input
                  type="text"
                  value={identity.gender}
                  onChange={(e) => updateDraftIdentity({ gender: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block font-mono">Idade</label>
                <input
                  type="text"
                  value={identity.age}
                  onChange={(e) => updateDraftIdentity({ age: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block font-mono">Altura / Peso</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={identity.height}
                    onChange={(e) => updateDraftIdentity({ height: e.target.value })}
                    placeholder="1.80m"
                    className="w-1/2 bg-slate-900/90 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    value={identity.weight}
                    onChange={(e) => updateDraftIdentity({ weight: e.target.value })}
                    placeholder="75kg"
                    className="w-1/2 bg-slate-900/90 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block font-mono">Olhos / Cabelos / Pele</label>
                <input
                  type="text"
                  value={`${identity.eyes} • ${identity.hair} • ${identity.skin}`}
                  onChange={(e) => {
                    const parts = e.target.value.split('•');
                    updateDraftIdentity({
                      eyes: parts[0]?.trim() || identity.eyes,
                      hair: parts[1]?.trim() || identity.hair,
                      skin: parts[2]?.trim() || identity.skin,
                    });
                  }}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </Card>

          {/* Personality & Narrative details */}
          <Card className="p-5 space-y-4">
            <h3 className="font-cinzel font-bold text-base text-amber-300">Personalidade & História</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 mb-1 block font-mono">Traços de Personalidade</label>
                <textarea
                  rows={2}
                  value={identity.personalityTraits}
                  onChange={(e) => updateDraftIdentity({ personalityTraits: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block font-mono">Ideais Morales</label>
                <textarea
                  rows={2}
                  value={identity.ideals}
                  onChange={(e) => updateDraftIdentity({ ideals: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block font-mono">Vínculos & Afetos</label>
                <textarea
                  rows={2}
                  value={identity.bonds}
                  onChange={(e) => updateDraftIdentity({ bonds: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block font-mono">Defeitos & Fraquezas</label>
                <textarea
                  rows={2}
                  value={identity.flaws}
                  onChange={(e) => updateDraftIdentity({ flaws: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block font-mono">História de Origem (Backstory)</label>
              <textarea
                rows={3}
                value={identity.backstory}
                onChange={(e) => updateDraftIdentity({ backstory: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                placeholder="Escreva a lenda do nascimento e das aventuras anteriores do seu personagem..."
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
