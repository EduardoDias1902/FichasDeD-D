import React, { useState } from 'react';
import { Wand2, Search, Sparkles, Star, Check, Flame, ShieldAlert, Clock } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { SPELLS_DATA } from '../../data/spells';
import { CLASSES_DATA } from '../../data/classes';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SpellSchool } from '../../types/dnd5e';
import { RuleTooltip } from '../common/RuleTooltip';

const SCHOOLS: SpellSchool[] = [
  'Abjuração', 'Adivinhação', 'Invocação', 'Encantamento', 'Evocação', 'Ilusão', 'Necromancia', 'Transmutação'
];

export const StepSpells: React.FC = () => {
  const { activeCharacter, toggleKnownSpell, togglePreparedSpell } = useCharacterStore();
  const [query, setQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [selectedSchool, setSelectedSchool] = useState<SpellSchool | 'all'>('all');
  const [onlyConcentration, setOnlyConcentration] = useState(false);
  const [onlyRitual, setOnlyRitual] = useState(false);

  if (!activeCharacter) return null;

  const currentClass = CLASSES_DATA.find(c => c.id === activeCharacter.classId);
  const isSpellcaster = currentClass?.isSpellcaster;

  // Filter spells
  const filteredSpells = SPELLS_DATA.filter((spell) => {
    if (query.trim() && !spell.name.toLowerCase().includes(query.toLowerCase()) && !spell.description.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    if (selectedLevel !== 'all' && spell.level !== selectedLevel) return false;
    if (selectedSchool !== 'all' && spell.school !== selectedSchool) return false;
    if (onlyConcentration && !spell.concentration) return false;
    if (onlyRitual && !spell.ritual) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-amber-500/20 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-cinzel font-bold text-amber-300 flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-indigo-400" />
            Etapa 7: Grimório & Magias Conhecidas
          </h2>
          <p className="text-sm text-slate-400 font-sans mt-1">
            {isSpellcaster
              ? `Selecione truques e magias de nível 1 para a classe ${currentClass?.name}.`
              : `A classe ${currentClass?.name} não é conjuradora por padrão, mas você pode selecionar magias se possuir talentos ou traços raciais arcanos!`}
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <Card variant="gold" className="p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar magia por nome ou descrição..."
              className="w-full bg-slate-900/90 border border-amber-500/30 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">Todos os Níveis</option>
            <option value={0}>Truques (Nível 0)</option>
            <option value={1}>1º Nível</option>
            <option value={2}>2º Nível</option>
            <option value={3}>3º Nível</option>
          </select>

          {/* School Filter */}
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value as SpellSchool | 'all')}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">Todas as Escolas</option>
            {SCHOOLS.map(sch => <option key={sch} value={sch}>{sch}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={onlyConcentration}
              onChange={(e) => setOnlyConcentration(e.target.checked)}
              className="rounded accent-amber-500"
            />
            <RuleTooltip term="Concentração" definition="Exige manter a mente focada. Sofrer dano exige salvaguarda de CON para não perder a magia.">
              Apenas Concentração
            </RuleTooltip>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={onlyRitual}
              onChange={(e) => setOnlyRitual(e.target.checked)}
              className="rounded accent-amber-500"
            />
            <RuleTooltip term="Ritual" definition="Pode ser conjurada sem gastar espaço de magia adicionando 10 minutos ao tempo de conjuração.">
              Apenas Rituais
            </RuleTooltip>
          </label>
        </div>
      </Card>

      {/* Spells Grid & Known Spells Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSpells.map((spell) => {
            const isKnown = activeCharacter.spells.knownSpells.includes(spell.id);

            return (
              <Card
                key={spell.id}
                variant={isKnown ? 'arcane' : 'default'}
                glow={isKnown}
                className="p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-cinzel font-bold text-base text-indigo-300">{spell.name}</h4>
                      <p className="text-[11px] font-mono text-slate-400">
                        {spell.level === 0 ? 'Truque' : `${spell.level}º Nível`} • {spell.school}
                      </p>
                    </div>
                    {isKnown && <Badge variant="arcane">Conhecida</Badge>}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3 mb-3">
                    {spell.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3 text-[10px] font-mono">
                    <Badge variant="neutral">Alcance: {spell.range}</Badge>
                    <Badge variant="neutral">Tempo: {spell.castingTime}</Badge>
                    {spell.concentration && <Badge variant="crimson">Concentração</Badge>}
                    {spell.ritual && <Badge variant="gold">Ritual</Badge>}
                  </div>
                </div>

                <Button
                  variant={isKnown ? 'crimson' : 'gold'}
                  size="sm"
                  onClick={() => toggleKnownSpell(spell.id)}
                >
                  {isKnown ? 'Remover da Lista' : 'Aprender Magia'}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Selected Spells Sidebar */}
        <Card variant="gold" className="p-5 space-y-4 h-fit">
          <h3 className="font-cinzel font-bold text-lg text-amber-300 border-b border-amber-500/30 pb-2 flex items-center justify-between">
            <span>Grimório Conhecido</span>
            <Badge variant="gold">{activeCharacter.spells.knownSpells.length} Magias</Badge>
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {activeCharacter.spells.knownSpells.map((spellId) => {
              const spell = SPELLS_DATA.find(s => s.id === spellId);
              if (!spell) return null;

              return (
                <div key={spell.id} className="bg-slate-900/80 p-2.5 rounded-lg border border-indigo-500/30 flex items-center justify-between">
                  <div>
                    <h5 className="font-cinzel font-bold text-xs text-indigo-300">{spell.name}</h5>
                    <span className="text-[10px] font-mono text-slate-400">
                      {spell.level === 0 ? 'Truque' : `Nível ${spell.level}`} • {spell.school}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleKnownSpell(spell.id)}
                    className="text-xs text-red-400 hover:text-red-300 p-1"
                  >
                    Excluir
                  </button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
