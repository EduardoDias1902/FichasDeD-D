import React, { useState } from 'react';
import { Heart, Shield, Zap, Skull, Moon, Sun, Crosshair, Sword, Plus, Minus, RefreshCw } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { calculateCombatStats, calculateAbilityScores, formatModifier } from '../../services/rulesEngine';
import { CLASSES_DATA } from '../../data/classes';

export const TabCombat: React.FC = () => {
  const { activeCharacter, modifyHp, setTempHp, updateDeathSaves, performShortRest, performLongRest } = useCharacterStore();
  const [hpDelta, setHpDelta] = useState<number>(5);

  if (!activeCharacter) return null;

  const combatStats = calculateCombatStats(activeCharacter);
  const scores = calculateAbilityScores(activeCharacter);
  const dndClass = CLASSES_DATA.find(c => c.id === activeCharacter.classId);

  // Equipped weapons for attack cards
  const equippedWeapons = activeCharacter.inventory.filter(i => i.category === 'Armas' && i.equipped);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Vitality Banner: HP Tracker & Rest buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* HP Tracker Card */}
        <Card variant="crimson" glow className="p-5 space-y-4 md:col-span-2">
          <div className="flex items-center justify-between border-b border-red-500/30 pb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse" />
              <h3 className="font-cinzel font-bold text-lg text-red-200">Pontos de Vida (HP)</h3>
            </div>
            <div className="flex items-center gap-2">
              {activeCharacter.combat.tempHp > 0 && (
                <Badge variant="arcane" className="text-xs">
                  +{activeCharacter.combat.tempHp} PV Temp
                </Badge>
              )}
              <Badge variant="crimson" className="text-sm font-mono px-3 py-1">
                {activeCharacter.combat.currentHp} / {combatStats.maxHp} HP
              </Badge>
            </div>
          </div>

          {/* Health Bar */}
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-red-900/50">
            <div
              className="h-full bg-gradient-to-r from-red-700 via-red-500 to-emerald-500 transition-all duration-300 shadow-crimson-glow"
              style={{ width: `${Math.min(100, Math.max(0, (activeCharacter.combat.currentHp / combatStats.maxHp) * 100))}%` }}
            />
          </div>

          {/* Quick HP Adjust Controls */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-2">
              <Button variant="crimson" size="sm" onClick={() => modifyHp(-hpDelta)}>
                Dano -{hpDelta}
              </Button>
              <Button variant="gold" size="sm" onClick={() => modifyHp(hpDelta)}>
                Cura +{hpDelta}
              </Button>
            </div>

            {/* Rest Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" icon={<Moon className="w-3.5 h-3.5 text-indigo-400" />} onClick={performShortRest}>
                Descanso Curto
              </Button>
              <Button variant="secondary" size="sm" icon={<Sun className="w-3.5 h-3.5 text-amber-400" />} onClick={performLongRest}>
                Descanso Longo
              </Button>
            </div>
          </div>
        </Card>

        {/* Death Saves Card */}
        <Card variant="default" className="p-5 space-y-4">
          <h3 className="font-cinzel font-bold text-base text-amber-300 flex items-center gap-2 border-b border-slate-800 pb-2">
            <Skull className="w-5 h-5 text-amber-400" />
            Testes contra Morte
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <span className="text-emerald-400 block mb-1">Sucessos (0/3):</span>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <button
                    key={`succ_${i}`}
                    onClick={() => updateDeathSaves(
                      activeCharacter.combat.deathSaves.successes === i ? i - 1 : i,
                      activeCharacter.combat.deathSaves.failures
                    )}
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-sm transition-all ${
                      i <= activeCharacter.combat.deathSaves.successes
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-gold-glow'
                        : 'bg-slate-900 border-slate-800 text-slate-600'
                    }`}
                  >
                    ✓
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-red-400 block mb-1">Falhas (0/3):</span>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <button
                    key={`fail_${i}`}
                    onClick={() => updateDeathSaves(
                      activeCharacter.combat.deathSaves.successes,
                      activeCharacter.combat.deathSaves.failures === i ? i - 1 : i
                    )}
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-sm transition-all ${
                      i <= activeCharacter.combat.deathSaves.failures
                        ? 'bg-red-500/20 border-red-500 text-red-400 shadow-crimson-glow'
                        : 'bg-slate-900 border-slate-800 text-slate-600'
                    }`}
                  >
                    ✗
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Attacks & Actions Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-cinzel font-bold text-amber-300 flex items-center gap-2">
          <Sword className="w-5 h-5 text-amber-400" />
          Ataques & Ações de Combate
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equippedWeapons.length === 0 ? (
            <Card className="col-span-full p-6 text-center text-slate-500">
              <Sword className="w-10 h-10 mx-auto mb-2 text-slate-700" />
              <p className="font-cinzel text-sm">Nenhuma arma equipada no inventário.</p>
              <p className="text-xs text-slate-500">Vá até a aba Inventário e marque suas armas como "Equipada".</p>
            </Card>
          ) : (
            equippedWeapons.map((weapon) => {
              const isFinesse = weapon.properties?.includes('Acuidade');
              const isRanged = weapon.properties?.some(p => p.includes('distância') || p.includes('Munição'));
              const statMod = (isFinesse || isRanged) ? Math.max(scores.modifiers.STR, scores.modifiers.DEX) : scores.modifiers.STR;
              const attackBonus = combatStats.proficiencyBonus + statMod;
              const damageBonus = statMod;

              return (
                <Card key={weapon.id} variant="gold" className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-cinzel font-bold text-base text-amber-300">{weapon.name}</h4>
                      <p className="text-xs font-mono text-slate-400">{weapon.properties?.join(' • ')}</p>
                    </div>
                    <Badge variant="gold" className="font-mono text-sm px-2.5 py-1">
                      {formatModifier(attackBonus)} para acertar
                    </Badge>
                  </div>

                  <div className="bg-slate-900/90 p-3 rounded-lg border border-amber-500/30 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Dano: <strong className="text-amber-300 text-sm">{weapon.damage} {formatModifier(damageBonus)}</strong></span>
                    <span className="text-amber-400">{weapon.damageType}</span>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
