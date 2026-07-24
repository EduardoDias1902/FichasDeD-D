import React, { useState } from 'react';
import { Shield, Sparkles, Heart, Sword, BookOpen, Check, Star, Table } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { CLASSES_DATA } from '../../data/classes';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { SkillName } from '../../types/dnd5e';
import { getSkillRecommendation } from '../../services/recommendationEngine';
import { RuleTooltip } from '../common/RuleTooltip';

export const StepClass: React.FC = () => {
  const { activeCharacter, updateDraftClass, updateDraftClassSkills } = useCharacterStore();
  const [showProgressionTable, setShowProgressionTable] = useState(false);

  if (!activeCharacter) return null;

  const selectedClass = CLASSES_DATA.find(c => c.id === activeCharacter.classId) || CLASSES_DATA[0];

  const handleSkillToggle = (skillName: SkillName) => {
    const current = activeCharacter.selectedClassSkills || [];
    const isSelected = current.includes(skillName);

    if (isSelected) {
      updateDraftClassSkills(current.filter(s => s !== skillName));
    } else {
      if (current.length < selectedClass.skillChoiceCount) {
        updateDraftClassSkills([...current, skillName]);
      }
    }
  };

  const selectedSkillsCount = (activeCharacter.selectedClassSkills || []).length;
  const isSkillLimitReached = selectedSkillsCount >= selectedClass.skillChoiceCount;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-amber-500/20 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-cinzel font-bold text-amber-300 flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-400" />
            Etapa 3: Seleção de Classe & Perícias Proficientes
          </h2>
          <p className="text-sm text-slate-400 font-sans mt-1">
            Escolha o caminho de combate do seu herói e suas perícias de classe. O sistema mostra recomendações, mas você escolhe qualquer combinação!
          </p>
        </div>

        <button
          onClick={() => setShowProgressionTable(!showProgressionTable)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-cinzel hover:bg-amber-500/20 transition-all self-start md:self-auto"
        >
          <Table className="w-4 h-4 text-amber-400" />
          {showProgressionTable ? 'Ocultar Tabela 1-20' : 'Ver Tabela Completa (Nível 1-20)'}
        </button>
      </div>

      {/* Level 1-20 Progression Table Modal/Collapse */}
      {showProgressionTable && (
        <Card variant="gold" className="p-5 animate-in fade-in duration-200">
          <h3 className="font-cinzel font-bold text-lg text-amber-300 mb-3 flex items-center gap-2">
            <Table className="w-5 h-5 text-amber-400" />
            Tabela de Progressão de Nível 1 a 20 — {selectedClass.name}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-amber-500/40 text-amber-400 bg-amber-950/40">
                  <th className="p-2 font-cinzel">Nível</th>
                  <th className="p-2 font-cinzel">Bônus Proficiência</th>
                  <th className="p-2 font-cinzel">Características Ganhas</th>
                  {selectedClass.isSpellcaster && <th className="p-2 font-cinzel">Truques Conhecidos</th>}
                  {selectedClass.isSpellcaster && <th className="p-2 font-cinzel">Espaços de Magia (1º a 9º Nível)</th>}
                </tr>
              </thead>
              <tbody>
                {selectedClass.progressionTable.map((row) => (
                  <tr key={row.level} className="border-b border-slate-800/80 hover:bg-slate-800/40">
                    <td className="p-2 font-bold text-amber-300">Nível {row.level}</td>
                    <td className="p-2 text-slate-300">+{row.proficiencyBonus}</td>
                    <td className="p-2 text-slate-200">{row.features.join(', ')}</td>
                    {selectedClass.isSpellcaster && (
                      <td className="p-2 text-indigo-300">{row.cantripsKnown || '-'}</td>
                    )}
                    {selectedClass.isSpellcaster && (
                      <td className="p-2 text-amber-300">{row.spellSlots ? row.spellSlots.join(' / ') : '-'}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Selection Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {CLASSES_DATA.map((cls) => {
            const isSelected = activeCharacter.classId === cls.id;

            return (
              <Card
                key={cls.id}
                variant={isSelected ? 'gold' : 'default'}
                glow={isSelected}
                onClick={() => updateDraftClass(cls.id)}
                className="p-4 cursor-pointer flex flex-col justify-between hover:scale-[1.01] transition-transform"
              >
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={cls.image}
                      alt={cls.name}
                      className="w-14 h-14 rounded-lg object-cover border border-amber-500/40 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-cinzel font-bold text-base text-amber-300">{cls.name}</h3>
                        {isSelected && <Badge variant="gold">Selecionada</Badge>}
                      </div>
                      <p className="text-xs text-amber-400/80 font-mono mt-0.5">
                        Dado de Vida: d{cls.hitDie} • {cls.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-2 mb-3">
                    {cls.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <Badge variant="crimson" className="text-[10px]">
                      Atributos: {cls.primaryAbility.join('/')}
                    </Badge>
                    <Badge variant="neutral" className="text-[10px]">
                      Dificuldade: {cls.difficulty}
                    </Badge>
                    {cls.isSpellcaster && (
                      <Badge variant="arcane" className="text-[10px]">
                        Conjurador ({cls.spellcastingAbility})
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Class Details & Skill Selection Sidebar */}
        <div className="space-y-6">
          <Card variant="gold" className="p-5 space-y-4">
            <div className="flex items-center gap-3 border-b border-amber-500/30 pb-3">
              <img
                src={selectedClass.image}
                alt={selectedClass.name}
                className="w-16 h-16 rounded-lg object-cover border border-amber-400"
              />
              <div>
                <h3 className="font-cinzel font-bold text-xl text-amber-300">{selectedClass.name}</h3>
                <p className="text-xs text-amber-400 font-mono">Dado de Vida: 1d{selectedClass.hitDie}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-cinzel font-bold text-amber-400 mb-1">
                  Proficiências de Armadura & Armas:
                </h4>
                <p className="text-slate-300">{selectedClass.armorProficiencies.join(', ')}</p>
                <p className="text-slate-300 mt-1">{selectedClass.weaponProficiencies.join(', ')}</p>
              </div>

              <div>
                <h4 className="font-cinzel font-bold text-amber-400 mb-1">
                  Salvaguardas (Saving Throws):
                </h4>
                <div className="flex gap-2">
                  {selectedClass.savingThrows.map((st) => (
                    <Badge key={st} variant="crimson">{st}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-cinzel font-bold text-amber-400 mb-1">Subclasses Disponíveis:</h4>
                <div className="space-y-1">
                  {selectedClass.subclasses.map((sub) => (
                    <div key={sub.id} className="bg-slate-900/80 p-2 rounded border border-amber-500/20">
                      <strong className="text-amber-300 font-cinzel block text-xs">{sub.name}</strong>
                      <span className="text-slate-300 text-[11px] leading-snug">{sub.lore}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Skill Selector Component */}
          <Card className="p-5 space-y-4 border-amber-500/40">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <div>
                <h3 className="font-cinzel font-bold text-base text-amber-300">
                  Perícias de Classe ({selectedSkillsCount}/{selectedClass.skillChoiceCount})
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Escolha {selectedClass.skillChoiceCount} perícias com as quais terá proficiência.
                </p>
              </div>
              <Badge variant={isSkillLimitReached ? 'gold' : 'neutral'}>
                {selectedSkillsCount}/{selectedClass.skillChoiceCount} selecionadas
              </Badge>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {selectedClass.skillOptions.map((skillName) => {
                const isSelected = (activeCharacter.selectedClassSkills || []).includes(skillName);
                const rec = getSkillRecommendation(selectedClass.id, skillName);
                const isDisabled = !isSelected && isSkillLimitReached;

                return (
                  <div
                    key={skillName}
                    onClick={() => !isDisabled && handleSkillToggle(skillName)}
                    className={`p-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-gold-glow'
                        : isDisabled
                        ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60 cursor-not-allowed'
                        : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-semibold font-sans">{skillName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <StarRating rating={rec.stars} size="sm" />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
