import React, { useState } from 'react';
import { Package, Plus, Trash2, Shield, Sword, Sparkles, DollarSign } from 'lucide-react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { EQUIPMENT_DATA } from '../../data/equipment';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ItemCategory, Item } from '../../types/dnd5e';
import { calculateCombatStats } from '../../services/rulesEngine';

const CATEGORIES: ItemCategory[] = ['Armas', 'Armaduras', 'Poções', 'Pergaminhos', 'Ferramentas', 'Itens Mágicos', 'Diversos'];

export const StepEquipment: React.FC = () => {
  const { activeCharacter, toggleEquipItem, addItemToInventory, removeItemFromInventory, updateCurrency } = useCharacterStore();
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('Armas');
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');

  if (!activeCharacter) return null;

  const combatStats = calculateCombatStats(activeCharacter);
  const totalWeight = activeCharacter.inventory.reduce((acc, item) => acc + (item.weight * (item.quantity || 1)), 0);
  const encumbrancePct = Math.min(100, Math.round((totalWeight / combatStats.carryingCapacity) * 100));

  const availableItems = EQUIPMENT_DATA.filter(i => i.category === selectedCategory);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-amber-500/20 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-cinzel font-bold text-amber-300 flex items-center gap-2">
            <Package className="w-6 h-6 text-amber-400" />
            Etapa 6: Equipamentos & Inventário Inicial
          </h2>
          <p className="text-sm text-slate-400 font-sans mt-1">
            Escolha o equipamento padrão de classe ou compre item por item usando seu orçamento de moedas de ouro.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setMode('auto')}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel border transition-all ${
              mode === 'auto'
                ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-gold-glow'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            Modo Oficial Automático
          </button>
          <button
            onClick={() => setMode('manual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel border transition-all ${
              mode === 'manual'
                ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-gold-glow'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            Modo Compra Manual (Loja)
          </button>
        </div>
      </div>

      {/* Weight & Encumbrance Meter */}
      <Card variant="gold" className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-slate-300">Carga & Capacidade de Transporte:</span>
            <span className="text-amber-300 font-bold">{totalWeight.toFixed(1)} / {combatStats.carryingCapacity} lbs ({encumbrancePct}%)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-300 ${
                encumbrancePct > 90 ? 'bg-red-500 shadow-crimson-glow' : 'bg-gradient-to-r from-amber-500 to-amber-300 shadow-gold-glow'
              }`}
              style={{ width: `${encumbrancePct}%` }}
            />
          </div>
        </div>

        {/* Currency Display */}
        <div className="flex items-center gap-3 bg-slate-900/90 p-2 rounded-lg border border-amber-500/30">
          <DollarSign className="w-4 h-4 text-amber-400" />
          <div className="flex gap-2 text-xs font-mono">
            <span><strong className="text-amber-300">{activeCharacter.currency.gp}</strong> po</span>
            <span><strong className="text-slate-300">{activeCharacter.currency.sp}</strong> ps</span>
            <span><strong className="text-amber-600">{activeCharacter.currency.cp}</strong> pc</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Store / Available items list */}
        <div className="lg:col-span-2 space-y-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-800 pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-xs font-cinzel transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableItems.map((item) => (
              <Card key={item.id} className="p-3 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-cinzel font-bold text-sm text-amber-300">{item.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.description}</p>
                  <div className="flex gap-2 text-[10px] font-mono text-amber-400/80 mt-1">
                    <span>{item.costInGp} po</span>
                    <span>•</span>
                    <span>{item.weight} lbs</span>
                    {item.damage && <span>• Dano: {item.damage}</span>}
                    {item.armorClassBonus && <span>• CA: +{item.armorClassBonus}</span>}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  icon={<Plus className="w-3.5 h-3.5" />}
                  onClick={() => addItemToInventory({ ...item, equipped: false, quantity: 1 })}
                >
                  Adicionar
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Character Inventory list */}
        <Card variant="gold" className="p-5 space-y-4 h-fit">
          <h3 className="font-cinzel font-bold text-lg text-amber-300 border-b border-amber-500/30 pb-2 flex items-center justify-between">
            <span>Inventário Atual</span>
            <Badge variant="gold">{activeCharacter.inventory.length} Itens</Badge>
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {activeCharacter.inventory.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between gap-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel font-bold text-xs text-slate-200 truncate">{item.name}</span>
                    {item.equipped && <Badge variant="gold" className="text-[9px]">Equipado</Badge>}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.weight} lbs • {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {(item.category === 'Armaduras' || item.category === 'Armas') && (
                    <button
                      onClick={() => toggleEquipItem(item.id)}
                      className={`px-2 py-1 rounded text-[10px] font-mono border ${
                        item.equipped ? 'bg-amber-500/20 border-amber-400 text-amber-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {item.equipped ? 'Desequipar' : 'Equipar'}
                    </button>
                  )}
                  <button
                    onClick={() => removeItemFromInventory(item.id)}
                    className="p-1 rounded text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
